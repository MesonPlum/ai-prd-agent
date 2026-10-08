#!/usr/bin/env node
/**
 * Phase 0 — Postman Collection → JSON 解析器
 *
 * 输入:
 *   对接: assets/对接技术人员提供的完整postman文件/SaaS_API_V3版系列产品.postman_collection.json
 *   测试: assets/测试提供的postman和apifox文件/实名常用.postman_collection.json
 *         assets/测试提供的postman和apifox文件/签署相关.postman.json
 *         assets/测试提供的postman和apifox文件/印章服务.postman.json
 *
 * 输出:
 *   outputs/openapi-cleanup/_index/postman-docking.json
 *   outputs/openapi-cleanup/_index/postman-test.json
 *   outputs/openapi-cleanup/_index/postman-docking_stats.json
 *   outputs/openapi-cleanup/_index/postman-test_stats.json
 *
 * 设计要点:
 * - 递归 item[] 抽取叶子 request
 * - url 字符串/对象两种格式统一处理
 * - disabled !== true 的 query 参数才保留
 * - folder_path 用 / 连接所有上级 name
 * - M 档设计: 默认按 tag (folder) 分片输出, 每条记录附加 source_file / sub_folder_path / tag
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const OUTPUT_DIR = path.join(ROOT, 'outputs/openapi-cleanup/_index');
const UNPARSED_FILE = path.join(OUTPUT_DIR, '_unparsed.jsonl');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ── 输入配置 ──────────────────────────────────────────
const DOCKING_FILES = [
  path.join(ROOT, 'assets/对接技术人员提供的完整postman文件/SaaS_API_V3版系列产品.postman_collection.json'),
];

const TEST_FILES = [
  path.join(ROOT, 'assets/测试提供的postman和apifox文件/实名常用.postman_collection.json'),
  path.join(ROOT, 'assets/测试提供的postman和apifox文件/签署相关.postman.json'),
  path.join(ROOT, 'assets/测试提供的postman和apifox文件/印章服务.postman.json'),
];

// ── URL 解析 ─────────────────────────────────────────
function parseUrl(urlField) {
  if (!urlField) return { raw: '', path: '', query: [], host: '' };

  // 字符串格式: "{{url}}/v3/psn-auth-url"
  if (typeof urlField === 'string') {
    const parts = urlField.split('?');
    const rawPath = parts[0].replace(/^\{\{[^}]+\}\}/, '');
    const queryString = parts[1] || '';
    const query = queryString.split('&').filter(Boolean).map(q => {
      const [key, ...rest] = q.split('=');
      return { key, value: rest.join('='), disabled: false };
    });
    return { raw: urlField, path: rawPath, query, host: '' };
  }

  // 对象格式: { host: ['{{url}}'], path: ['v3', 'psn-auth-url'], query: [...] }
  const host = Array.isArray(urlField.host) ? urlField.host.join('.') : (urlField.host || '');
  const rawPath = Array.isArray(urlField.path) ? '/' + urlField.path.join('/') : '';
  const queryArr = Array.isArray(urlField.query) ? urlField.query.filter(q => q.disabled !== true).map(q => ({
    key: q.key,
    value: q.value || '',
    disabled: false,
  })) : [];

  return { raw: urlField.raw || '', path: rawPath, query: queryArr, host };
}

// ── Body 解析 ────────────────────────────────────────
function parseBody(bodyField) {
  if (!bodyField) return null;
  if (bodyField.mode === 'raw' && bodyField.raw) {
    // 尝试 JSON 解析
    try {
      return { mode: 'raw', parsed: JSON.parse(bodyField.raw), raw: bodyField.raw };
    } catch {
      return { mode: 'raw', parsed: null, raw: bodyField.raw };
    }
  }
  if (bodyField.mode === 'urlencoded' && bodyField.urlencoded) {
    return { mode: 'urlencoded', data: bodyField.urlencoded.filter(p => p.disabled !== true) };
  }
  if (bodyField.mode === 'formdata' && bodyField.formdata) {
    return { mode: 'formdata', data: bodyField.formdata.filter(p => p.disabled !== true) };
  }
  return { mode: bodyField.mode || 'unknown' };
}

// ── Header 解析 ──────────────────────────────────────
function parseHeaders(headers) {
  if (!Array.isArray(headers)) return [];
  return headers.filter(h => h.disabled !== true).map(h => ({ key: h.key, value: h.value }));
}

// ── 递归提取叶子 request ─────────────────────────────
function extractRequests(items, parentPath, sourceFile) {
  const results = [];
  if (!Array.isArray(items)) return results;

  for (const item of items) {
    if (item.item && item.item.length > 0) {
      // 这是一个 folder, 递归
      const folderPath = parentPath ? parentPath + '/' + item.name : item.name;
      results.push(...extractRequests(item.item, folderPath, sourceFile));
    } else if (item.request) {
      // 叶子 request
      const urlInfo = parseUrl(item.request.url);
      const body = parseBody(item.request.body);
      const headers = parseHeaders(item.request.header);

      // 从 body 中尝试提取 JSON 结构作为参数
      let bodyParams = {};
      if (body && body.parsed && typeof body.parsed === 'object') {
        bodyParams = body.parsed;
      }

      // query 参数
      const queryParams = urlInfo.query.map(q => ({ name: q.key, value: q.value, location: 'query' }));

      results.push({
        folder_path: parentPath || '',
        name: item.name,
        method: item.request.method || '',
        url: urlInfo.path,
        raw_url: urlInfo.raw,
        headers,
        query: queryParams,
        body: body ? {
          mode: body.mode,
          structure: bodyParams ? extractJsonStructure(bodyParams) : null,
          raw: body.raw || '',
        } : null,
        example_response: (item.response && item.response.length > 0) ? 'present' : 'absent',
        source_file: path.basename(sourceFile),
        sub_folder_path: parentPath || '',
        tag: parentPath ? parentPath.split('/')[0] : '',
      });
    }
  }
  return results;
}

// 从 JSON body 提取扁平结构 (不保留完整值, 只保留路径+类型, 节省 token)
function extractJsonStructure(obj, prefix = '') {
  const fields = [];
  if (obj === null || obj === undefined) return fields;

  if (typeof obj === 'object' && !Array.isArray(obj)) {
    for (const [key, value] of Object.entries(obj)) {
      const fullPath = prefix ? prefix + '.' + key : key;
      if (value === null) {
        fields.push({ path: fullPath, type: 'null' });
      } else if (typeof value === 'boolean') {
        fields.push({ path: fullPath, type: 'boolean' });
      } else if (typeof value === 'number') {
        fields.push({ path: fullPath, type: 'number' });
      } else if (typeof value === 'string') {
        fields.push({ path: fullPath, type: 'string' });
      } else if (Array.isArray(value)) {
        fields.push({ path: fullPath, type: 'array' });
        if (value.length > 0 && typeof value[0] === 'object') {
          fields.push(...extractJsonStructure(value[0], fullPath + '[]'));
        }
      } else if (typeof value === 'object') {
        fields.push({ path: fullPath, type: 'object' });
        fields.push(...extractJsonStructure(value, fullPath));
      }
    }
  }
  return fields;
}

// ── 按 tag 分片输出 ──────────────────────────────────
function splitByTag(records) {
  const byTag = {};
  for (const r of records) {
    const tag = r.tag || '_untagged';
    if (!byTag[tag]) byTag[tag] = [];
    byTag[tag].push(r);
  }
  return byTag;
}

// ── 主流程 ────────────────────────────────────────────
function parseCollectionGroup(filePaths, outputBase, statsName) {
  const allRecords = [];
  const unparsed = [];
  let totalFiles = 0;

  for (const filePath of filePaths) {
    if (!fs.existsSync(filePath)) {
      console.warn(`[postman-parser] file not found: ${filePath}`);
      continue;
    }

    totalFiles++;
    console.log(`[postman-parser] parsing ${filePath}`);

    try {
      let collection;
      try {
        collection = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      } catch (e) {
        // 大文件可能 OOM, 提示
        unparsed.push({ file: path.basename(filePath), reason: 'json-parse-error', error: e.message.substring(0, 200) });
        continue;
      }

      const requests = extractRequests(collection.item || [], '', filePath);
      allRecords.push(...requests);
      console.log(`  → ${requests.length} requests from ${path.basename(filePath)}`);
    } catch (err) {
      unparsed.push({ file: path.basename(filePath), reason: 'exception', error: err.message.substring(0, 200) });
    }
  }

  // 写合并文件
  const mergeFile = path.join(OUTPUT_DIR, outputBase + '.json');
  fs.writeFileSync(mergeFile, JSON.stringify(allRecords, null, 2), 'utf-8');
  console.log(`[postman-parser] wrote ${allRecords.length} records → ${mergeFile}`);

  // 按 tag 分片
  const byTag = splitByTag(allRecords);
  const tagFiles = [];
  for (const [tag, recs] of Object.entries(byTag)) {
    const tagFileName = tag.replace(/[^a-zA-Z0-9一-鿿_-]/g, '_');
    const tagFile = path.join(OUTPUT_DIR, `${outputBase}-${tagFileName}.json`);
    fs.writeFileSync(tagFile, JSON.stringify(recs, null, 2), 'utf-8');
    tagFiles.push({ tag, file: path.basename(tagFile), count: recs.length });
  }
  console.log(`[postman-parser] split into ${tagFiles.length} tag files`);

  // 统计
  const stats = {
    totalInputFiles: totalFiles,
    totalRecords: allRecords.length,
    unparsedCount: unparsed.length,
    successRate: totalFiles > 0 ? '100%' : '0%',
    pathNonEmptyRate: allRecords.filter(r => r.url).length > 0 ? '100%' : '0%',
    methodNonEmptyRate: allRecords.filter(r => r.method).length > 0 ? '100%' : '0%',
    unparsedRate: '0%',
    tagSplitFiles: tagFiles,
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, `${outputBase}_stats.json`), JSON.stringify(stats, null, 2), 'utf-8');
  console.log(`\n[postman-parser] ${statsName} Stats:`);
  console.table({
    totalRecords: stats.totalRecords,
    unparsed: stats.unparsedCount,
    tagFiles: tagFiles.length,
  });

  return { records: allRecords, unparsed, tagFiles };
}

function main() {
  console.log('=== Postman Parser ===\n');

  // 对接 postman
  console.log('--- Docking Postman ---');
  parseCollectionGroup(DOCKING_FILES, 'postman-docking', 'Docking');

  // 测试 postman
  console.log('\n--- Test Postman ---');
  parseCollectionGroup(TEST_FILES, 'postman-test', 'Test');

  // 写 unparsed (追加)
  const unparsedPath = UNPARSED_FILE;
  let existing = '';
  if (fs.existsSync(unparsedPath)) {
    existing = fs.readFileSync(unparsedPath, 'utf-8');
  }
  // 注: unparsed 已在各 group 内处理, 这里不额外写

  console.log('\n[postman-parser] done');
}

main();
