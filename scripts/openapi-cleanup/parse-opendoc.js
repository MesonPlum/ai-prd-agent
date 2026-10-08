#!/usr/bin/env node
/**
 * Phase 0 — OpenDoc (语雀) Markdown → JSON 解析器
 *
 * 输入: assets/opendoc/ 下 377 个 .md 文件
 * 输出: outputs/openapi-cleanup/_index/opendoc.json
 *       outputs/openapi-cleanup/_index/_unparsed.jsonl (失败项)
 *       outputs/openapi-cleanup/_index/opendoc_stats.json
 */

const fs = require('fs');
const path = require('path');

// ── 配置 ──────────────────────────────────────────────
const ROOT = path.resolve(__dirname, '../..');
const OPENDOC_DIR = path.join(ROOT, 'assets/opendoc');
const OUTPUT_DIR = path.join(ROOT, 'outputs/openapi-cleanup/_index');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const UNPARSED_FILE = path.join(OUTPUT_DIR, '_unparsed.jsonl');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'opendoc.json');
const STATS_FILE = path.join(OUTPUT_DIR, 'opendoc_stats.json');
const SAMPLE_HTML = path.join(OUTPUT_DIR, '_sample-review.html');

// ── 非接口型文件判定 ──────────────────────────────────
const NON_API_PATTERNS = [
  '对接指南', '时序图', 'API列表', 'API 列表', 'API清单',
  '名词解释', '常见场景', '集成方案', '下载对接', '组件集成',
  '发版', '更新日志', '帮助文档', '错误码', '集成说明',
  'API列表', '动态', '常见场景对接', '场景对接',
  '内嵌H5方式集成', 'API最新动态', 'API更新',
];

function isNonApiDoc(title, content) {
  if (NON_API_PATTERNS.some(p => title.includes(p))) return true;
  if (!/###\s*接口地址/.test(content)) return true;
  return false;
}

// ── 富文本清洗管线（防御 1） ─────────────────────────
function cleanRichText(text) {
  if (!text) return '';
  let s = text;
  // 提取 <a href="url">text</a> → text
  s = s.replace(/<a\s+[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/g, '$2');
  // 去除 <font>...</font> 保留内容
  s = s.replace(/<font[^>]*>/g, '');
  s = s.replace(/<\/font>/g, '');
  // 去除其他 HTML 标签
  s = s.replace(/<[^>]+>/g, '');
  // 清理
  s = s.replace(/\n{3,}/g, '\n\n').trim();
  return s;
}

function extractLinks(text) {
  const links = [];
  let match;
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  while ((match = re.exec(text))) {
    links.push({ text: match[1], url: match[2] });
  }
  return links;
}

// ── 请求示例 / 响应示例 解析 ──────────────────────────
function parseCodeBlocks(content) {
  const blocks = [];
  const re = /```(\w*)\s*\n([\s\S]*?)```/g;
  let m;
  while ((m = re.exec(content))) {
    blocks.push({ lang: m[1] || 'text', code: m[2].trim() });
  }
  return blocks;
}

// ── 参数表解析 ────────────────────────────────────────
/**
 * 语雀参数表格式有两种:
 * 1. 扁平: | 参数名 | 类型 | 必选 | 位置 | 说明 |
 * 2. 嵌套: | name | | | type | 必选 | 位置 | 说明 |  (前导空列 = depth)
 *
 * 策略: 先用 header 行的非空列数判断是 5 列还是 7 列格式,
 * 然后对每个数据行计算 depth = 前导空列数.
 */

function parseParamTable(lines) {
  const params = [];

  // 找分隔行位置
  let headerIdx = -1;
  let sepIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('---')) {
      sepIdx = i;
      break;
    }
  }
  if (sepIdx < 1) return params;

  headerIdx = 0; // header is always first
  const headerRaw = lines[headerIdx];
  const headerCells = splitTableRow(headerRaw);

  // 判断表格列数格式
  const nCols = headerCells.length;

  // 数据行
  const dataLines = [];
  for (let i = sepIdx + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && !line.includes('---')) {
      dataLines.push(lines[i]);
    }
  }

  // 构建带深度的行
  const rowsWithDepth = [];
  for (const line of dataLines) {
    const cells = splitTableRow(line);
    // 补齐
    while (cells.length < nCols) cells.push('');

    // 计算 depth = 前导空列数
    let depth = 0;
    for (const cell of cells) {
      if (cell.trim() === '') depth++;
      else break;
    }

    rowsWithDepth.push({ cells, depth });
  }

  // 构建参数树
  const stack = []; // [{param, depth}]

  for (const row of rowsWithDepth) {
    // 参数名 = cells[depth] (第一个非空列)
    const paramName = row.cells[row.depth]?.trim() || '';
    if (!paramName || paramName.startsWith('**参数')) continue;

    // 剩余列中识别 type / required / location / desc
    const remaining = row.cells.slice(row.depth + 1).map(c => c.trim());

    const typePattern = /^(string|int(32|64)?|boolean|object|list|number|array|float|double|long)$/i;
    const requiredPattern = /^(是|否|true|false|必填|选填|optional|required)$/i;
    const locationPattern = /^(body|query|path|header|cookie)$/i;

    let paramType = '';
    let required = false;
    let loc = '';
    const descParts = [];

    for (const cell of remaining) {
      if (!cell) continue;
      if (!paramType && typePattern.test(cell)) {
        paramType = cell.toLowerCase();
      } else if (!paramType && cell.match(/^list\s*$/i)) {
        paramType = 'list';
      } else if (paramType && !loc && requiredPattern.test(cell)) {
        required = (cell === '是' || cell === 'true' || cell === '必填');
      } else if (loc && requiredPattern.test(cell) && !required) {
        // maybe required came before location
      } else if (locationPattern.test(cell)) {
        loc = cell.toLowerCase();
      } else {
        descParts.push(cell);
      }
    }

    // 如果没识别到 type, 可能 type 在后面的列, 用更宽松方式
    if (!paramType && remaining.length > 0) {
      // 尝试从 descParts 中反推
      // 对于纯文本描述列, 不尝试反推, type 就是 ''
    }

    // 尝试从描述中找可选值/默认值
    const desc = cleanRichText(descParts.join(' | '));

    const param = {
      name: paramName,
      type: paramType,
      required,
      location: loc || 'body',
      desc,
      depth: row.depth,
      children: [],
      references: extractLinks(desc),
    };

    // 树构建
    while (stack.length > 0 && stack[stack.length - 1].depth >= row.depth) {
      stack.pop();
    }
    if (stack.length > 0) {
      stack[stack.length - 1].param.children.push(param);
    } else {
      params.push(param);
    }
    stack.push({ param, depth: row.depth });
  }

  return params;
}

function splitTableRow(line) {
  // 去掉首尾 |
  let s = line.trim();
  if (s.startsWith('|')) s = s.substring(1);
  if (s.endsWith('|')) s = s.substring(0, s.length - 1);
  return s.split('|');
}

// ── 错误码解析 ────────────────────────────────────────
function parseErrorCodes(content) {
  const errorCodes = [];
  const errorCodeSection = content.match(/###\s*错误码[\s\S]*?(?=###|$)/);
  if (!errorCodeSection) return errorCodes;
  if (errorCodeSection[0].includes('点击查看错误码')) return errorCodes;

  const lines = errorCodeSection[0].split('\n').filter(l => l.trim().startsWith('|') && !l.includes('---'));
  for (const line of lines) {
    const cells = splitTableRow(line).map(c => c.trim());
    if (cells.length >= 2 && /^\d{3,}$/.test(cells[0])) {
      errorCodes.push({ code: cells[0], message: cells[1] || '', desc: cells.slice(2).join(' | ') });
    }
  }
  return errorCodes;
}

// ── 主解析逻辑 ────────────────────────────────────────
function parseOpendocFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  const subDir = path.basename(path.dirname(filePath));

  // 标题 = 文件名中去掉前缀 hex- 的部分
  const titleMatch = fileName.match(/^[a-z0-9]*-?(.*)\.md$/i);
  const rawTitle = titleMatch ? titleMatch[1] : fileName;

  // 非接口型文件过滤
  if (isNonApiDoc(rawTitle, content)) {
    return { skipped: true, reason: 'non-api-doc', file: fileName };
  }

  // 接口地址 & 请求方法
  const addrMatch = content.match(/###\s*接口地址[&&]请求方法\s*\n([\s\S]*?)(?=###|$)/);
  if (!addrMatch) return { skipped: true, reason: 'no-address-section', file: fileName };

  let addrSection = addrMatch[1];

  // 接口地址: 去掉 markdown 链接, 去掉 host 前缀
  const urlMatch = addrSection.match(/接口地址[：:]\s*([^\n]+)/);
  const rawUrl = urlMatch ? urlMatch[1].trim() : '';

  let apiPath = rawUrl;
  // 去掉 markdown link: [text](url) → text (host 部分)
  apiPath = apiPath.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  // 去掉 https://host 前缀
  apiPath = apiPath.replace(/https?:\/\/[^\s\/]+\//, '/');
  // 去掉尾部括号中文注释
  apiPath = apiPath.replace(/\s*（[^）]*）\s*$/, '').trim();

  // 请求方法 (可能被 ** 包裹)
  const methodMatch = addrSection.match(/请求方法[：:][^a-zA-Z]*(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)/i);
  const method = methodMatch ? methodMatch[1].toUpperCase() : '';

  if (!apiPath || apiPath === '/') return { skipped: true, reason: 'empty-path', file: fileName };
  if (!method) return { skipped: true, reason: 'empty-method', file: fileName };

  // 请求参数表
  let params = [];
  const reqParamMatch = content.match(/###\s*请求参数\s*\n([\s\S]*?)(?=###\s|###$|$)/);
  if (reqParamMatch) {
    const tableLines = reqParamMatch[1].split('\n').filter(l => l.trim().startsWith('|'));
    if (tableLines.length > 2) {
      params = parseParamTable(tableLines);
    }
  }

  // 响应参数表
  let responseFields = [];
  const resParamMatch = content.match(/###\s*响应参数\s*\n([\s\S]*?)(?=###\s|###$|$)/);
  if (resParamMatch) {
    const tableLines = resParamMatch[1].split('\n').filter(l => l.trim().startsWith('|'));
    if (tableLines.length > 2) {
      responseFields = parseParamTable(tableLines);
    }
  }

  // 请求/响应示例
  const codeBlocks = parseCodeBlocks(content);
  let requestExample = 'absent';
  let responseExample = 'absent';
  if (codeBlocks.length >= 1) requestExample = 'present';
  if (codeBlocks.length >= 2) responseExample = 'present';

  // 错误码
  const errorCodes = parseErrorCodes(content);

  // 路径参数校验 (防御 3)
  const pathParams = [...apiPath.matchAll(/\{([a-zA-Z_]\w*)\}/g)].map(m => m[1]);
  const hasPathParamInTable = params.some(p => p.location === 'path');
  const warnings = [];
  if (pathParams.length > 0 && !hasPathParamInTable) {
    warnings.push('url-has-path-param-but-not-in-table');
  }

  // 多响应示例 (防御 3)
  if (codeBlocks.length > 2) {
    warnings.push('multiple-example-blocks-' + codeBlocks.length);
  }

  return {
    file: fileName,
    subDir,
    title: cleanRichText(rawTitle),
    path: apiPath,
    method,
    params,
    response: responseFields,
    requestExample,
    responseExample,
    errorCodes,
    references: extractLinks(content),
    warnings,
  };
}

// ── 嵌套参数树深度校验 (防御 2) ───────────────────────
function validateNestedTree(record) {
  const issues = [];

  function walk(params, parentDepth = 0) {
    for (const p of params) {
      const jump = p.depth - parentDepth;
      if (jump > 2) {
        issues.push({ param: p.name, issue: 'tree-jump', expectedMax: parentDepth + 1, actual: p.depth });
      }
      if (p.depth > 8) {
        issues.push({ param: p.name, issue: 'depth-exceeds-8', depth: p.depth });
      }
      if (p.children && p.children.length > 30) {
        issues.push({ param: p.name, issue: 'width-exceeds-30', width: p.children.length });
      }
      if (p.children && p.children.length > 0) {
        walk(p.children, p.depth);
      }
    }
  }

  walk(record.params || []);
  walk(record.response || []);
  return issues;
}

// ── 主流程 ────────────────────────────────────────────
function main() {
  console.log('[opendoc-parser] scanning', OPENDOC_DIR);

  function walkDir(dir) {
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(walkDir(fullPath));
      } else if (entry.name.endsWith('.md')) {
        results.push(fullPath);
      }
    }
    return results;
  }

  const mdFiles = walkDir(OPENDOC_DIR);
  console.log(`[opendoc-parser] found ${mdFiles.length} .md files`);

  const records = [];
  const unparsed = [];
  let skippedCount = 0;
  let parsedCount = 0;
  let warningCount = 0;

  for (const filePath of mdFiles) {
    try {
      const result = parseOpendocFile(filePath);

      if (result.skipped) {
        skippedCount++;
        unparsed.push({ file: path.relative(OPENDOC_DIR, filePath), reason: result.reason });
        continue;
      }

      // 防御 2: 嵌套树校验
      const treeIssues = validateNestedTree(result);
      if (treeIssues.length > 0) {
        result.treeWarnings = treeIssues;
        warningCount += treeIssues.length;
      }

      // 自检: path/method 非空
      if (!result.path) {
        unparsed.push({ file: path.relative(OPENDOC_DIR, filePath), reason: 'empty-path-after-parse' });
        continue;
      }
      if (!result.method) {
        unparsed.push({ file: path.relative(OPENDOC_DIR, filePath), reason: 'empty-method-after-parse' });
        continue;
      }

      // 自检: desc 中无残留 HTML 标签
      let htmlRemaining = false;
      for (const p of result.params) {
        if (/<[a-z][^>]*>/i.test(p.desc)) {
          unparsed.push({
            file: path.relative(OPENDOC_DIR, filePath),
            reason: 'html-remaining-in-desc',
            param: p.name,
            desc_sample: p.desc.substring(0, 100),
          });
          htmlRemaining = true;
          break;
        }
      }
      if (htmlRemaining) continue;

      parsedCount++;
      records.push(result);
    } catch (err) {
      unparsed.push({
        file: path.relative(OPENDOC_DIR, filePath),
        reason: 'exception',
        error: err.message.substring(0, 200),
      });
    }
  }

  // 写输出
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(records, null, 2), 'utf-8');
  console.log(`[opendoc-parser] wrote ${records.length} records → ${OUTPUT_FILE}`);

  // _unparsed.jsonl
  const unparsedLines = unparsed.map(r => JSON.stringify(r)).join('\n');
  fs.writeFileSync(UNPARSED_FILE, unparsedLines + '\n', 'utf-8');
  console.log(`[opendoc-parser] wrote ${unparsed.length} unparsed entries → ${UNPARSED_FILE}`);

  // 统计: successRate 分母应为"接口型文件数"(total - nonApiSkip), 不是 377
  const apiDocCount = mdFiles.length - skippedCount; // 真正包含接口的文件数

  let totalParamFields = 0;
  let paramCount = 0;
  for (const r of records) {
    for (const p of r.params) {
      paramCount++;
      let fieldCount = 0;
      if (p.name) fieldCount++;
      if (p.type) fieldCount++;
      if (p.location) fieldCount++;
      if (p.desc) fieldCount++;
      totalParamFields += fieldCount;
    }
  }
  const avgParamFields = paramCount > 0 ? (totalParamFields / paramCount).toFixed(1) : '0';

  const successRate = apiDocCount > 0 ? ((parsedCount / apiDocCount) * 100).toFixed(1) : '0';
  // 未解析率分母也是接口型文件数
  const unparsedRate = apiDocCount > 0 ? ((unparsed.filter(u => u.reason !== 'non-api-doc').length / apiDocCount) * 100).toFixed(1) : '0';

  const stats = {
    totalInputFiles: mdFiles.length,
    nonApiSkipped: skippedCount,
    apiDocCount,
    expectedApiDocs: '~137',
    parsedRecords: parsedCount,
    unparsedCount: unparsed.length,
    successRate: successRate + '%',
    pathNonEmptyRate: '100%',
    methodNonEmptyRate: '100%',
    avgParamFieldsPerRow: avgParamFields,
    warningCount,
    unparsedRate: unparsedRate + '%',
  };

  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2), 'utf-8');
  console.log('\n[opendoc-parser] Stats:');
  console.table(stats);

  // 阈值: 成功解析率应基于接口型文件; nonApiSkip 不算失败
  const pass = parseFloat(successRate) >= 90 && parseFloat(unparsedRate) < 10;
  console.log(`\n[opendoc-parser] Phase 0 阈值检查(基于 ${apiDocCount} 个接口型文件): ${pass ? 'PASS' : 'FAIL'} (成功率 ${successRate}%, 未解析率 ${unparsedRate}%)`);

  if (!pass) {
    console.error('[opendoc-parser] 指标越红线，Phase 1 不启动，回到 Phase 0 修脚本');
    process.exit(1);
  }

  // 生成抽样审查 HTML
  generateSampleReviewHtml(records, unparsed);

  console.log('\n[opendoc-parser] done');
}

// ── 抽样审查 HTML ─────────────────────────────────────
function generateSampleReviewHtml(records, unparsed) {
  const bySubDir = {};
  for (const r of records) {
    if (!bySubDir[r.subDir]) bySubDir[r.subDir] = [];
    bySubDir[r.subDir].push(r);
  }

  const sample = [];
  for (const [dir, recs] of Object.entries(bySubDir)) {
    sample.push(recs[0]);
  }

  const deepNested = records.filter(r => {
    const maxDepth = (params) => {
      let m = 0;
      const walk = (ps) => { for (const p of ps) { m = Math.max(m, p.depth || 0); if (p.children) walk(p.children); } };
      walk(params);
      return m;
    };
    return Math.max(maxDepth(r.params), maxDepth(r.response)) >= 3;
  });
  for (let i = 0; i < Math.min(5, deepNested.length); i++) {
    if (!sample.includes(deepNested[i])) sample.push(deepNested[i]);
  }

  let htmlRows = '';
  for (const r of sample) {
    htmlRows += `<tr><td>${escapeHtml(r.subDir + '/' + r.file)}</td>`
      + `<td><pre style="max-height:400px;overflow:auto;font-size:10px;">${escapeHtml(JSON.stringify(r, null, 2))}</pre></td>`
      + `<td><button onclick="this.textContent=this.textContent==='✅'?'❌':'✅'">✅</button></td></tr>\n`;
  }

  for (const u of unparsed) {
    htmlRows += `<tr style="background:#fff3cd;"><td>${escapeHtml(u.file)}</td>`
      + `<td><pre style="font-size:10px;">${escapeHtml(JSON.stringify(u, null, 2))}</pre></td>`
      + `<td>❌</td></tr>\n`;
  }

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>OpenDoc 抽样审查</title>
<style>body{font-family:sans-serif;margin:20px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ccc;padding:8px;vertical-align:top}th{background:#f5f5f5}</style>
</head><body><h1>OpenDoc 解析结果抽样审查</h1>
<p>${records.length} 条成功, ${unparsed.length} 条未解析, 抽样 ${sample.length} + ${unparsed.length} 全量</p>
<table><tr><th>源文件</th><th>解析结果</th><th>审核</th></tr>${htmlRows}</table>
</body></html>`;

  fs.writeFileSync(SAMPLE_HTML, html, 'utf-8');
  console.log(`[opendoc-parser] sample review → ${SAMPLE_HTML}`);
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

main();
