#!/usr/bin/env node
/**
 * sign-api Phase 2 — 全量 41 endpoints，多源共识差异策略
 *
 * 策略: 只报告"至少2个数据源都有，但yaml可能缺少的"参数。
 * 单源独有参数不报告（opendoc/test/docking深度不同是常态）。
 */
const fs = require('fs');
const opendoc = JSON.parse(fs.readFileSync('outputs/openapi-cleanup/_index/opendoc.json','utf-8'));
const docking = JSON.parse(fs.readFileSync('outputs/openapi-cleanup/_index/postman-docking.json','utf-8'));
const testPM = JSON.parse(fs.readFileSync('outputs/openapi-cleanup/_index/postman-test.json','utf-8'));
const apifox = JSON.parse(fs.readFileSync('outputs/openapi-cleanup/_index/apifox.json','utf-8'));
const testCombined = [...testPM, ...apifox];

function normPath(p) {
  let s = p.replace(/\*\*/g,'').replace(/<[^>]+>/g,'').replace(/\?.*$/,'').trim();
  if (s && !s.startsWith('/')) s = '/' + s;
  s = s.replace(/\{\{[^}]+\}\}/g, '{xxx}');
  s = s.replace(/\/[0-9a-fA-F]{6,}/g, '/{xxx}');
  s = s.replace(/\/\d+/g, '/{xxx}');
  s = s.replace(/\{[a-zA-Z_]\w*\}/g, '{xxx}');
  return s;
}
function buildIndex(items) {
  const idx = {};
  for (const rec of items) {
    const rawP = rec.path || rec.url || '';
    const norm = normPath(rawP);
    const m = (rec.method || '').toUpperCase();
    const key = norm + '|' + m;
    if (!idx[key]) idx[key] = [];
    idx[key].push(rec);
  }
  return idx;
}
function cleanPN(text) {
  if (!text) return '';
  let s = text.replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/g, '$2');
  s = s.replace(/<font[^>]*>/g,'').replace(/<\/font>/g,'').replace(/<[^>]+>/g,'').replace(/\*\*/g,'');
  s = s.replace(/[（(]点击[^）)]*[）)]/g, '').trim();
  return s;
}
function flattenParams(params, prefix) {
  const result = [];
  if (!params) return result;
  for (const p of params) {
    const n = cleanPN(p.name);
    if (!n) continue;
    const fn = prefix ? prefix + '.' + n : n;
    result.push({ name: fn, type: (p.type||'').toLowerCase(), required: p.required === true, location: p.location || 'body' });
    if (p.children && p.children.length > 0) {
      const pt = (p.type||'').toLowerCase();
      if (pt !== 'list' && pt !== 'array') result.push(...flattenParams(p.children, fn));
    }
  }
  return result;
}

const odIdx = buildIndex(opendoc);
const dkIdx = buildIndex(docking);
const tIdx = buildIndex(testCombined);

// 从 yaml 提取所有端点
const yaml = fs.readFileSync('openapi/sign-api.yaml','utf-8');
const yamlEpList = [];
let inPaths = false, currentPath = '';
const yamlLines = yaml.split('\n');
for (let i = 0; i < yamlLines.length; i++) {
  const line = yamlLines[i];
  if (line.match(/^paths:/)) { inPaths = true; continue; }
  if (line.match(/^webhooks:/) || line.match(/^x-error-codes:/)) { inPaths = false; continue; }
  if (inPaths && line.match(/^[a-zA-Z]/) && !line.startsWith('/')) { inPaths = false; continue; }
  if (inPaths) {
    const pathMatch = line.match(/^  (\/[^:]+):\s*$/);
    if (pathMatch) { currentPath = pathMatch[1]; continue; }
    if (currentPath) {
      const methodMatch = line.match(/^    (get|post|put|delete|patch):\s*$/i);
      if (methodMatch) {
        const method = methodMatch[1].toUpperCase();
        let summary = '';
        for (let j = i + 1; j < yamlLines.length; j++) {
          const nl = yamlLines[j];
          if (nl.match(/^  (\/[^:]+):\s*$/)) break;
          if (nl.match(/^    (get|post|put|delete|patch):\s*$/i)) break;
          const sm = nl.match(/^\s+summary:\s*(.+)$/);
          if (sm) summary = sm[1].trim().replace(/['"]/g, '');
        }
        yamlEpList.push({ path: currentPath, method, summary });
      }
    }
  }
}

console.log('=== sign-api: ' + yamlEpList.length + ' yaml endpoints ===\n');

const diffs = [];
const esc = (s) => (s || '').replace(/\|/g, '\\|');

for (const ep of yamlEpList) {
  const key = normPath(ep.path) + '|' + ep.method;
  const od = odIdx[key] || [];
  const dk = dkIdx[key] || [];
  const tt = tIdx[key] || [];
  const testCovered = tt.length > 0;

  // Source params
  const odParams = new Set();
  for (const r of od) {
    const flat = flattenParams(r.params);
    for (const p of flat) odParams.add(p.name);
  }
  const dkParams = new Set();
  for (const r of dk) {
    if (r.body && r.body.structure) {
      for (const s of r.body.structure) dkParams.add(s.path);
    }
    if (r.query) {
      for (const q of r.query) { if (q.key && q.key !== 'undefined') dkParams.add(q.key); }
    }
    for (const pk of ['signFlowId','fileId','approvalFlowId','orgId']) {
      if (ep.path.includes('{'+pk+'}') && !dkParams.has(pk)) dkParams.add(pk);
    }
  }
  const tParams = new Set();
  for (const r of tt) {
    if (r.body && r.body.structure) {
      for (const s of r.body.structure) tParams.add(s.path);
    }
    if (r.params) {
      for (const p of r.params) {
        if (p.location === 'body' || p.location === 'query' || p.location === 'path') tParams.add(p.name);
      }
    }
    for (const pk of ['signFlowId','fileId','approvalFlowId','orgId']) {
      if (ep.path.includes('{'+pk+'}') && !tParams.has(pk)) tParams.add(pk);
    }
  }

  console.log(ep.method + ' ' + ep.path + ': od=' + od.length + ' dk=' + dk.length + ' test=' + tt.length + ' | params od=' + odParams.size + ' dk=' + dkParams.size + ' test=' + tParams.size);

  // Ghost check
  if (od.length === 0 && dk.length === 0 && tt.length === 0) {
    diffs.push({
      apiName: ep.summary, path: ep.path, method: ep.method,
      layer: 'L1', diffType: 'ghost-endpoint',
      opendocVal: 'absent', dockingVal: 'absent', testVal: 'absent',
      aiRec: 'VERIFY - 三源全无，考虑从 yaml 删除',
      confidence: 5, testCovered, severity: 'MINOR',
      note: 'yaml 有但三源全无',
    });
    continue;
  }

  // Multi-source consensus: params in 2+ sources but only 1 has them
  const allParams = new Set([...odParams, ...dkParams, ...tParams]);
  for (const pn of allParams) {
    const hasOd = odParams.has(pn);
    const hasDk = dkParams.has(pn);
    const hasT = tParams.has(pn);
    const presentCount = (hasOd?1:0) + (hasDk?1:0) + (hasT?1:0);
    const sourceCount = (od.length > 0?1:0) + (dk.length > 0?1:0) + (tt.length > 0?1:0);

    // Only flag if present in 2+ sources AND at least 2 sources exist for this endpoint
    const absentSources = [];
    if (!hasOd && od.length > 0) absentSources.push('opendoc');
    if (!hasDk && dk.length > 0) absentSources.push('docking');
    if (!hasT && tt.length > 0) absentSources.push('test');

    if (presentCount >= 2 && absentSources.length > 0) {
      diffs.push({
        apiName: ep.summary, path: ep.path, method: ep.method,
        layer: 'L2', diffType: 'param-missing',
        opendocVal: hasOd ? 'present' : 'absent',
        dockingVal: hasDk ? 'present' : 'absent',
        testVal: hasT ? 'present' : 'absent',
        aiRec: 'ADD to missing sources',
        confidence: presentCount >= 3 ? 5 : 4,
        testCovered, severity: 'MAJOR',
        note: '"' + pn + '" in ' + presentCount + ' sources, missing from ' + absentSources.join(', '),
      });
    }
  }
}

// Write report
console.log('\nTotal diffs:', diffs.length);
const byEp = {};
for (const d of diffs) {
  const k = d.method + ' ' + d.path;
  if (!byEp[k]) byEp[k] = [];
  byEp[k].push(d);
}
for (const [k, dd] of Object.entries(byEp).sort((a,b) => b[1].length - a[1].length).slice(0, 10)) {
  console.log('\n' + k + ': ' + dd.length + ' diffs');
  for (const d of dd.slice(0, 5)) {
    console.log('  ' + d.diffType + ' | ' + d.note + ' | od:' + d.opendocVal + ' dk:' + d.dockingVal + ' test:' + d.testVal);
  }
  if (dd.length > 5) console.log('  ... +' + (dd.length-5) + ' more');
}

let md = '# sign-api 差异报告\n\n';
md += '> 生成时间: ' + new Date().toISOString().split('T')[0] + '\n';
md += '> 策略: 仅报告"2+源共识但某源缺失"的参数，忽略单源独有参数\n\n';
const majors = diffs.filter(d => d.severity === 'MAJOR').length;
const minors = diffs.filter(d => d.severity === 'MINOR').length;
md += '| 模块 | yaml 路径 | endpoints | 差异行数 | BLOCKER | MAJOR | MINOR |\n';
md += '|---|---|---|---|---|---|---|\n';
md += '| sign-api | openapi/sign-api.yaml | ' + yamlEpList.length + ' | ' + diffs.length + ' | 0 | ' + majors + ' | ' + minors + ' |\n\n';
md += '## PM 决策说明\n\n- A = 采纳 AI 推荐\n- K = 保持 yaml 原状\n- R = 需实跑验证\n- C:<value> = 自定义值\n\n';
md += '## 差异明细表\n\n';
md += '| # | API名 | path | method | 层 | 差异类型 | opendoc值 | 对接Postman值 | 测试值 | AI推荐 | 置信度 | 测试覆盖 | 严重度 | PM决策 | 备注 |\n';
md += '|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|\n';
let id = 0;
for (const d of diffs) {
  id++;
  const stars = '★'.repeat(d.confidence) + '☆'.repeat(5 - d.confidence);
  md += '| ' + id + ' | ' + esc(d.apiName) + ' | ' + d.path + ' | ' + d.method + ' | ' + d.layer + ' | ' + d.diffType + ' | ' + esc(d.opendocVal) + ' | ' + esc(d.dockingVal) + ' | ' + esc(d.testVal) + ' | ' + esc(d.aiRec) + ' | ' + stars + ' | ' + (d.testCovered ? '✅' : '❌') + ' | ' + d.severity + ' | | ' + esc(d.note) + ' |\n';
}

const tcCount = yamlEpList.filter(ep => {
  const k = normPath(ep.path) + '|' + ep.method;
  return (tIdx[k] || []).length > 0;
}).length;

md += '\n## 摘要\n\n';
md += '- yaml endpoints: ' + yamlEpList.length + '\n';
md += '- 总差异: ' + diffs.length + '\n';
md += '- 幽灵端点: ' + minors + '\n';
md += '- 测试覆盖: ' + tcCount + '/' + yamlEpList.length + '\n';

md += '\n## 各端点概览\n\n';
for (const ep of yamlEpList) {
  const k = normPath(ep.path) + '|' + ep.method;
  const od = (odIdx[k] || []).length;
  const dk = (dkIdx[k] || []).length;
  const tt = (tIdx[k] || []).length;
  const epDiffs = (byEp[ep.method + ' ' + ep.path] || []).length;
  md += '- `' + ep.method + ' ' + ep.path + '` | od:' + od + ' dk:' + dk + ' test:' + tt + ' | 差异 ' + epDiffs + ' | ' + (tt > 0 ? '✅' : '❌') + '\n';
}

fs.writeFileSync('outputs/openapi-cleanup/sign-api-diff-report.md', md, 'utf-8');
console.log('\nWrote sign-api-diff-report.md');
