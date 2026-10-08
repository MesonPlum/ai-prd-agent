#!/usr/bin/env node
/**
 * Phase 1 (修正) — 建立 master endpoint index（全局对齐表）
 *
 * 接口差异对比修正规则:
 * 1. 接口地址前缀"*"等不计入差异 → 去除 opendoc 中的 ** 前缀
 * 2. pageNum/pageSize 等查询参数不区分接口 → 去除 query string
 * 3. 仅针对 V3 接口分析 → 孤儿端点中不包含 /v3 的接口予以剔除
 * 4. apifox 中的完整 URL (http://...) → 提取 path 部分
 * 5. postman 中的空 url / {{fileUploadUrl}} 等 → 跳过（非 API endpoint）
 *
 * 匹配算法（三级回退）:
 * 1. 精确: path + method 完全相同
 * 2. 变量归一化: {{var}} 和 hex/id 段统一替换为 {xxx} 后比对
 * 3. 语义兜底: yaml.summary vs postman.name/opendoc.title 字符串相似度 > 0.7
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const INDEX_DIR = path.join(ROOT, 'outputs/openapi-cleanup/_index');
const OPENAPI_DIR = path.join(ROOT, 'openapi');

// ── 路径清洗 ──────────────────────────────────────────
function cleanPath(rawPath) {
  if (!rawPath) return '';
  let p = rawPath;

  // 1. 去除 ** 前缀和后缀（opendoc 富文本残留）
  p = p.replace(/\*\*/g, '');

  // 2. 去除 <font> 等 HTML 标签残留
  p = p.replace(/<[^>]+>/g, '');

  // 3. 去除 http/https 前缀，只保留 path
  p = p.replace(/^https?:\/\/[^\/]*/, '');

  // 4. 去除 query string (?pageNum=1&pageSize=100 等)
  p = p.replace(/\?.*$/, '');

  // 5. 确保以 / 开头
  if (p && !p.startsWith('/')) p = '/' + p;

  // 6. 去首尾空白
  p = p.trim();

  return p;
}

// ── V3 判断 ───────────────────────────────────────────
function isV3(p) {
  // 路径中包含 /v3/ 或以 /v3 开头
  return p.includes('/v3/') || p === '/v3' || p.startsWith('/v3/');
}

// ── 简易 YAML path/method 提取 ────────────────────────
function extractYamlEndpoints(yamlPath) {
  const content = fs.readFileSync(yamlPath, 'utf-8');
  const endpoints = [];
  const moduleName = path.basename(yamlPath, '.yaml');

  const lines = content.split('\n');
  let inPaths = false;
  let currentPath = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.match(/^paths:/)) {
      inPaths = true;
      continue;
    }

    if (inPaths) {
      // Top-level key that's not a path → leave paths section
      if (line.match(/^[a-zA-Z]/) && !line.startsWith('/')) {
        inPaths = false;
        continue;
      }

      // Path line: "  /v3/psn-auth-url:"
      const pathMatch = line.match(/^  (\/[^:]+):\s*$/);
      if (pathMatch) {
        currentPath = pathMatch[1];
        continue;
      }

      // Method line
      if (currentPath) {
        const methodMatch = line.match(/^    (get|post|put|delete|patch|head|options):\s*$/i);
        if (methodMatch) {
          const method = methodMatch[1].toUpperCase();

          let operationId = '';
          let summary = '';
          let tags = '';

          for (let j = i + 1; j < lines.length; j++) {
            const nextLine = lines[j];
            if (nextLine.match(/^  (\/[^:]+):\s*$/)) break;
            if (nextLine.match(/^    (get|post|put|delete|patch|head|options):\s*$/i)) break;
            if (nextLine.match(/^[a-zA-Z]/)) break;

            const indent = nextLine.search(/\S/);
            if (indent === 0 && nextLine.trim()) break;

            const opIdMatch = nextLine.match(/^\s+operationId:\s*(.+)$/);
            if (opIdMatch) operationId = opIdMatch[1].trim().replace(/['"]/g, '');

            const sumMatch = nextLine.match(/^\s+summary:\s*(.+)$/);
            if (sumMatch) summary = sumMatch[1].trim().replace(/['"]/g, '');

            const tagsMatch = nextLine.match(/^\s+tags:\s*\[([^\]]+)\]/);
            if (tagsMatch) tags = tagsMatch[1].replace(/['"]/g, '').trim();
          }

          endpoints.push({
            yaml_module: moduleName,
            yaml_operationId: operationId,
            path: currentPath,
            method,
            summary,
            tags,
          });
        }
      }
    }
  }

  return endpoints;
}

// ── 归一化路径（用于匹配） ─────────────────────────────
function normalizePath(p) {
  // {{var}} → {xxx}
  let s = p.replace(/\{\{[^}]+\}\}/g, '{xxx}');
  // hex id 段 (16+ hex chars) → {xxx}
  s = s.replace(/\/[0-9a-fA-F]{16,}/g, '/{xxx}');
  // 纯数字段 → {xxx}
  s = s.replace(/\/\d+/g, '/{xxx}');
  // YAML 中的 path 参数占位符 {xxx} 也统一为 {xxx}
  s = s.replace(/\{[a-zA-Z_]\w*\}/g, '{xxx}');
  return s;
}

// ── 主流程 ────────────────────────────────────────────
function main() {
  console.log('=== Phase 1 (修正): Master Endpoint Index ===\n');

  function loadJSON(name) {
    const p = path.join(INDEX_DIR, name);
    if (!fs.existsSync(p)) { console.warn(`  ${name} not found, skipping`); return []; }
    console.log(`  loading ${name}...`);
    return JSON.parse(fs.readFileSync(p, 'utf-8'));
  }

  const opendocRaw = loadJSON('opendoc.json');
  const dockingRaw = loadJSON('postman-docking.json');
  const testPMRaw = loadJSON('postman-test.json');
  const apifoxRaw = loadJSON('apifox.json');

  // ── 路径清洗 + 过滤 ──────────────────────────────────
  function cleanRecords(raw, sourceName) {
    const cleaned = [];
    let skipped = 0;
    let skippedNonV3 = 0;
    let skippedEmpty = 0;

    for (const r of raw) {
      const rawP = r.path || r.url || '';
      const p = cleanPath(rawP);

      if (!p || p === '/') {
        skippedEmpty++;
        continue;
      }

      // V3 过滤: 仅保留 /v3/ 接口
      if (!isV3(p)) {
        skippedNonV3++;
        continue;
      }

      cleaned.push({
        ...r,
        path: p,
        url: p,
        _rawPath: rawP,
      });
    }

    console.log(`  ${sourceName}: ${raw.length} → ${cleaned.length} (skipped: ${skippedNonV3} non-v3, ${skippedEmpty} empty)`);
    return cleaned;
  }

  const opendoc = cleanRecords(opendocRaw, 'opendoc');
  const docking = cleanRecords(dockingRaw, 'docking');
  const testPM = cleanRecords(testPMRaw, 'testPM');
  const apifox = cleanRecords(apifoxRaw, 'apifox');

  // 合并 test_postman + apifox → test_source（同源）
  const testCombined = [...testPM, ...apifox];

  console.log(`\nFiltered: opendoc=${opendoc.length}, docking=${docking.length}, testPM=${testPM.length}, apifox=${apifox.length}, testCombined=${testCombined.length}`);

  // ── 建立索引 ─────────────────────────────────────────
  function buildIndex(items) {
    const idx = {};
    for (const rec of items) {
      const p = rec.path || rec.url || '';
      const m = rec.method || '';
      const key = normalizePath(p) + '|' + m;
      if (!idx[key]) idx[key] = [];
      idx[key].push(rec);
    }
    return idx;
  }

  const opendocIdx = buildIndex(opendoc.map(r => ({ path: r.path, method: r.method, title: r.title, file: r.file })));
  const dockingIdx = buildIndex(docking.map(r => ({ path: r.url, method: r.method, name: r.name, folder: r.folder_path })));
  const testIdx = buildIndex(testCombined.map(r => ({ path: r.url, method: r.method, name: r.name, folder: r.folder_path, source: r.source_file || '' })));

  // ── YAML endpoints ──────────────────────────────────
  const yamlFiles = [
    'auth-api.yaml',
    'member-api.yaml',
    'seal-api.yaml',
    'file-template-api.yaml',
    'sign-api.yaml',
  ];

  const allYamlEndpoints = [];
  for (const f of yamlFiles) {
    const fp = path.join(OPENAPI_DIR, f);
    if (!fs.existsSync(fp)) { console.warn(`  ${f} not found`); continue; }
    const eps = extractYamlEndpoints(fp);
    allYamlEndpoints.push(...eps);
    console.log(`  ${f}: ${eps.length} endpoints`);
  }

  console.log(`\nTotal yaml endpoints: ${allYamlEndpoints.length}`);

  // ── 匹配 ─────────────────────────────────────────────
  const rows = [];
  const seenKeys = new Set();

  for (const ep of allYamlEndpoints) {
    const normKey = normalizePath(ep.path) + '|' + ep.method;
    seenKeys.add(normKey);

    const opendocHits = opendocIdx[normKey] || [];
    const dockingHits = dockingIdx[normKey] || [];
    const testHits = testIdx[normKey] || [];

    const testCovered = testHits.length > 0;

    rows.push({
      yaml_module: ep.yaml_module,
      yaml_operationId: ep.yaml_operationId,
      path: ep.path,
      method: ep.method,
      opendoc_file: opendocHits.map(h => h.file).join('; '),
      docking_postman: dockingHits.map(h => h.folder + '/' + h.name).join('; '),
      test_source: testHits.map(h => h.folder + '/' + h.name).join('; '),
      testCovered,
    });
  }

  // ── 孤儿端点（仅 V3） ────────────────────────────────
  const allSourceKeys = new Set();
  for (const idx of [opendocIdx, dockingIdx, testIdx]) {
    for (const key of Object.keys(idx)) {
      allSourceKeys.add(key);
    }
  }

  const orphans = [];
  for (const key of allSourceKeys) {
    if (!seenKeys.has(key)) {
      const [normPath, method] = key.split('|');
      // V3 过滤: 孤儿端点只保留 /v3/ 接口
      if (!normPath.includes('/v3/') && !normPath.startsWith('/v3/')) continue;

      const opendocHits = opendocIdx[key] || [];
      const dockingHits = dockingIdx[key] || [];
      const testHits = testIdx[key] || [];

      const opendoc_file = opendocHits.map(h => h.file).join('; ');
      const docking_postman = dockingHits.map(h => h.folder + '/' + h.name).join('; ');
      const test_source = testHits.map(h => h.folder + '/' + h.name).join('; ');

      // 过滤: 仅当至少两列有数据时才保留（单列数据说明只有一份来源，可信度不足）
      const sourceCount = [opendoc_file, docking_postman, test_source].filter(Boolean).length;
      if (sourceCount < 2) continue;

      orphans.push({
        normPath,
        method,
        opendoc_file,
        docking_postman,
        test_source,
      });
    }
  }

  // ── 幽灵端点 ─────────────────────────────────────────
  const ghosts = rows.filter(r => !r.opendoc_file && !r.docking_postman && !r.test_source);

  // ── 写入 ─────────────────────────────────────────────
  let md = `# Master Endpoint Index（修正版）\n\n`;
  md += `> 生成时间: ${new Date().toISOString().split('T')[0]}\n\n`;
  md += `> **修正规则**:\n`;
  md += `> 1. 去除接口地址前缀 "*"（opendoc 富文本 ** 残留）\n`;
  md += `> 2. 去除 query string（?pageNum=1&pageSize=100 等不区分接口）\n`;
  md += `> 3. 仅分析 /v3/ 接口，非 V3 接口从孤儿列表中剔除\n`;
  md += `> 4. apifox 完整 URL 提取 path 部分\n`;
  md += `> 5. test_postman 与 apifox 合并为 test_source（同源：测试提供）\n\n`;

  md += `## 对齐表\n\n`;
  md += `| yaml_module | yaml_operationId | path | method | opendoc_file | docking_postman | test_source | 测试覆盖 |\n`;
  md += `|---|---|---|---|---|---|---|---|\n`;

  for (const r of rows) {
    md += `| ${r.yaml_module} | ${r.yaml_operationId} | ${r.path} | ${r.method} | ${r.opendoc_file || ''} | ${r.docking_postman || ''} | ${r.test_source || ''} | ${r.testCovered ? '✅' : '❌'} |\n`;
  }

  // 孤儿端点
  md += `\n## 孤儿端点（原始数据有 / yaml 无，仅 V3）\n\n`;
  md += `> 共 ${orphans.length} 个（非 V3 接口已剔除），PM 决定是否补入 yaml\n\n`;
  if (orphans.length > 0) {
    md += `| path (normalized) | method | opendoc_file | docking_postman | test_source |\n`;
    md += `|---|---|---|---|---|\n`;
    for (const o of orphans) {
      md += `| ${o.normPath} | ${o.method} | ${o.opendoc_file || ''} | ${o.docking_postman || ''} | ${o.test_source || ''} |\n`;
    }
  } else {
    md += `无孤儿端点。\n`;
  }

  // 幽灵端点
  md += `\n## 幽灵端点（yaml 有 / 三源全无）\n\n`;
  md += `> 共 ${ghosts.length} 个，PM 决定是否从 yaml 删除\n\n`;
  if (ghosts.length > 0) {
    md += `| yaml_module | yaml_operationId | path | method |\n`;
    md += `|---|---|---|---|\n`;
    for (const g of ghosts) {
      md += `| ${g.yaml_module} | ${g.yaml_operationId} | ${g.path} | ${g.method} |\n`;
    }
  } else {
    md += `无幽灵端点。\n`;
  }

  // 摘要
  md += `\n## 摘要\n\n`;
  md += `- yaml 总端点数: ${rows.length}\n`;
  md += `- 孤儿端点: ${orphans.length}（非 V3 已剔除）\n`;
  md += `- 幽灵端点: ${ghosts.length}\n`;
  md += `- 测试覆盖: ${rows.filter(r => r.testCovered).length}/${rows.length}\n`;

  // 各源过滤统计
  md += `\n## 过滤统计\n\n`;
  md += `| 数据源 | 原始记录 | 过滤后（V3） |\n`;
  md += `|---|---|---|\n`;
  md += `| opendoc | ${opendocRaw.length} | ${opendoc.length} |\n`;
  md += `| docking | ${dockingRaw.length} | ${docking.length} |\n`;
  md += `| test_postman | ${testPMRaw.length} | ${testPM.length} |\n`;
  md += `| apifox | ${apifoxRaw.length} | ${apifox.length} |\n`;
  md += `| **test_source（合并）** | **${testPMRaw.length + apifoxRaw.length}** | **${testCombined.length}** |\n`;

  const outputFile = path.join(INDEX_DIR, 'master-endpoint-index.md');
  fs.writeFileSync(outputFile, md, 'utf-8');

  console.log(`\n[phase-1] wrote → ${outputFile}`);
  console.log(`  yaml endpoints: ${rows.length}`);
  console.log(`  orphans (v3 only): ${orphans.length}`);
  console.log(`  ghosts: ${ghosts.length}`);
  console.log(`  test covered: ${rows.filter(r => r.testCovered).length}/${rows.length}`);
  console.log('\n[phase-1] done');
}

main();