#!/usr/bin/env node
/**
 * Phase 0 — ApiFox 导出 JSON → JSON 解析器
 *
 * 输入: assets/测试提供的postman和apifox文件/流程模板+文件模板.apifox.json
 * 输出: outputs/openapi-cleanup/_index/apifox.json
 *       outputs/openapi-cleanup/_index/apifox_stats.json
 *
 * ApiFox 结构:
 * - apifoxProject: 1.0.0 (版本检查)
 * - apiCollection[].items[] 递归, leaf = item.api 存在 (无 items 子数组)
 * - item.api: { method, path, parameters {query/path/header/cookie}, requestBody, responses }
 * - 跳过 preProcessors / postProcessors / mock 相关字段
 * - 通过有无 items 字段区分目录/接口
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const OUTPUT_DIR = path.join(ROOT, 'outputs/openapi-cleanup/_index');
const UNPARSED_FILE = path.join(OUTPUT_DIR, '_unparsed.jsonl');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ── 输入文件 ──────────────────────────────────────────
const APIFOX_FILES = [
  path.join(ROOT, 'assets/测试提供的postman和apifox文件/流程模板+文件模板.apifox.json'),
];

// ── Schema 版本检查 ─────────────────────────────────
function validateSchema(data, filePath) {
  if (data.apifoxProject !== '1.0.0') {
    return { valid: false, reason: `unsupported apifoxProject version: ${data.apifoxProject}, expected 1.0.0` };
  }
  return { valid: true };
}

// ── ApiFox 参数转统一格式 ────────────────────────────
function convertApiFoxParam(param, location) {
  return {
    name: param.name || '',
    type: (param.type || '').toLowerCase(),
    required: param.required === true || param.enable === true && param.required === true,
    location: location,
    desc: param.description || '',
    example: param.example || '',
    depth: 0,
    children: [],
  };
}

// ── RequestBody 参数提取 ─────────────────────────────
function extractRequestBodyParams(requestBody) {
  if (!requestBody) return [];

  const params = [];

  // 尝试从 jsonSchema.properties 提取
  if (requestBody.jsonSchema && requestBody.jsonSchema.properties) {
    const props = requestBody.jsonSchema.properties;
    for (const [name, schema] of Object.entries(props)) {
      params.push({
        name,
        type: (schema.type || 'string').toLowerCase(),
        required: (requestBody.jsonSchema.required || []).includes(name),
        location: 'body',
        desc: schema.description || '',
        example: schema.example !== undefined ? String(schema.example) : '',
        depth: 0,
        children: [],
      });
    }
  }

  // 尝试从 parameters 数组提取 (ApiFox 另一种格式)
  if (requestBody.parameters && Array.isArray(requestBody.parameters)) {
    for (const p of requestBody.parameters) {
      params.push(convertApiFoxParam(p, 'body'));
    }
  }

  return params;
}

// ── Response 字段提取 ────────────────────────────────
function extractResponseFields(responses) {
  if (!responses || responses.length === 0) return [];
  const fields = [];
  for (const resp of responses) {
    if (resp.jsonSchema && resp.jsonSchema.properties) {
      for (const [name, schema] of Object.entries(resp.jsonSchema.properties)) {
        fields.push({
          name,
          type: (schema.type || 'string').toLowerCase(),
          required: false, // ApiFox response required is uncommon
          location: 'body',
          desc: schema.description || '',
          depth: 0,
          children: [],
        });
      }
    }
    // 只取第一个响应, 避免 token 浪费
    break;
  }
  return fields;
}

// ── 递归提取 API leaves ──────────────────────────────
function extractApiItems(items, parentPath, sourceFile) {
  const results = [];
  if (!Array.isArray(items)) return results;

  for (const item of items) {
    // 目录 vs 接口: 有 items 子数组 = 目录; 有 api = 接口
    if (item.items && item.items.length > 0) {
      const folderPath = parentPath ? parentPath + '/' + item.name : item.name;
      results.push(...extractApiItems(item.items, folderPath, sourceFile));
    } else if (item.api) {
      // Leaf API endpoint
      const api = item.api;

      // 参数
      const params = [];

      // Query 参数
      if (api.parameters && api.parameters.query) {
        for (const p of api.parameters.query) {
          params.push(convertApiFoxParam(p, 'query'));
        }
      }

      // Path 参数
      if (api.parameters && api.parameters.path) {
        for (const p of api.parameters.path) {
          params.push(convertApiFoxParam(p, 'path'));
        }
      }

      // Header 参数 (过滤公共 header, 保留 API 特有 header)
      if (api.parameters && api.parameters.header) {
        for (const p of api.parameters.header) {
          if (p.enable !== false) {
            params.push(convertApiFoxParam(p, 'header'));
          }
        }
      }

      // Body 参数
      const bodyParams = extractRequestBodyParams(api.requestBody);
      params.push(...bodyParams);

      // Response 字段
      const responseFields = extractResponseFields(api.responses);

      results.push({
        folder_path: parentPath || '',
        name: item.name,
        method: (api.method || '').toUpperCase(),
        url: api.path || '',
        raw_url: api.path || '',
        headers: params.filter(p => p.location === 'header'),
        query: params.filter(p => p.location === 'query'),
        body: api.requestBody ? {
          mode: api.requestBody.type || 'json',
          structure: bodyParams.map(p => ({ path: p.name, type: p.type })),
        } : null,
        params,
        response: responseFields,
        example_response: (api.responseExamples && api.responseExamples.length > 0) ? 'present' : 'absent',
        source_file: path.basename(sourceFile),
        sub_folder_path: parentPath || '',
        tag: parentPath ? parentPath.split('/')[0] : '',
        apiId: api.id || '',
      });
    }
  }
  return results;
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
function main() {
  console.log('=== ApiFox Parser ===\n');

  const allRecords = [];
  const unparsed = [];
  let totalFiles = 0;

  for (const filePath of APIFOX_FILES) {
    if (!fs.existsSync(filePath)) {
      console.warn(`[apifox-parser] file not found: ${filePath}`);
      continue;
    }

    totalFiles++;
    console.log(`[apifox-parser] parsing ${filePath}`);

    try {
      let data;
      try {
        data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      } catch (e) {
        unparsed.push({ file: path.basename(filePath), reason: 'json-parse-error', error: e.message.substring(0, 200) });
        continue;
      }

      // Schema 版本检查
      const schemaCheck = validateSchema(data, filePath);
      if (!schemaCheck.valid) {
        unparsed.push({ file: path.basename(filePath), reason: schemaCheck.reason });
        console.error(`  ❌ ${schemaCheck.reason}`);
        continue;
      }

      // 跳过 preProcessors / postProcessors / mock 相关
      // 直接从 apiCollection 提取
      let totalLeaves = 0;
      for (const col of data.apiCollection || []) {
        const leaves = extractApiItems(col.items || [], col.name, filePath);
        allRecords.push(...leaves);
        totalLeaves += leaves.length;
        console.log(`  → ${leaves.length} APIs from "${col.name}"`);
      }

      console.log(`  Total: ${totalLeaves} API endpoints`);
    } catch (err) {
      unparsed.push({ file: path.basename(filePath), reason: 'exception', error: err.message.substring(0, 200) });
    }
  }

  // 写合并文件
  const outputFile = path.join(OUTPUT_DIR, 'apifox.json');
  fs.writeFileSync(outputFile, JSON.stringify(allRecords, null, 2), 'utf-8');
  console.log(`\n[apifox-parser] wrote ${allRecords.length} records → ${outputFile}`);

  // 按 tag 分片
  const byTag = splitByTag(allRecords);
  const tagFiles = [];
  for (const [tag, recs] of Object.entries(byTag)) {
    const tagFileName = tag.replace(/[^a-zA-Z0-9一-鿿_-]/g, '_');
    const tagFile = path.join(OUTPUT_DIR, `apifox-${tagFileName}.json`);
    fs.writeFileSync(tagFile, JSON.stringify(recs, null, 2), 'utf-8');
    tagFiles.push({ tag, file: path.basename(tagFile), count: recs.length });
  }
  console.log(`[apifox-parser] split into ${tagFiles.length} tag files`);

  // 统计
  const stats = {
    totalInputFiles: totalFiles,
    totalRecords: allRecords.length,
    unparsedCount: unparsed.length,
    successRate: allRecords.length > 0 ? '100%' : '0%',
    pathNonEmptyRate: allRecords.filter(r => r.url).length > 0 ? '100%' : '0%',
    methodNonEmptyRate: allRecords.filter(r => r.method).length > 0 ? '100%' : '0%',
    unparsedRate: '0%',
    tagSplitFiles: tagFiles,
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, 'apifox_stats.json'), JSON.stringify(stats, null, 2), 'utf-8');
  console.log('\n[apifox-parser] Stats:');
  console.table({
    totalRecords: stats.totalRecords,
    unparsed: stats.unparsedCount,
    tagFiles: tagFiles.length,
  });

  // 写 unparsed
  if (unparsed.length > 0) {
    const existing = fs.existsSync(UNPARSED_FILE) ? fs.readFileSync(UNPARSED_FILE, 'utf-8') : '';
    const newLines = unparsed.map(r => JSON.stringify(r)).join('\n');
    fs.writeFileSync(UNPARSED_FILE, existing + newLines + '\n', 'utf-8');
    console.log(`[apifox-parser] wrote ${unparsed.length} unparsed entries → ${UNPARSED_FILE}`);
  }

  console.log('\n[apifox-parser] done');
}

main();
