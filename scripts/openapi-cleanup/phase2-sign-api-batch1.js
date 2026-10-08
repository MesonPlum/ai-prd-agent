#!/usr/bin/env node
/**
 * sign-api Phase 2 — Sub-batch 1: 签署发起类 (12 endpoints)
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

// Sub-batch 1: 签署发起类
const signEndpoints = [
  {path:'/v3/sign-flow/create-by-file', method:'POST', summary:'基于文件发起签署'},
  {path:'/v3/sign-flow/{signFlowId}/start', method:'POST', summary:'开启签署流程'},
  {path:'/v3/sign-flow/sign-flow-initiate-url/by-file', method:'POST', summary:'通过页面发起签署'},
  {path:'/v3/sign-flow/batch-sign-url', method:'POST', summary:'获取批量签页面链接'},
  {path:'/v3/files/file-upload-url', method:'POST', summary:'上传本地文件'},
  {path:'/v3/files/{fileId}', method:'GET', summary:'查询文件上传状态'},
  {path:'/v3/sign-flow/{signFlowId}/unsigned-files', method:'POST', summary:'追加待签文件'},
  {path:'/v3/sign-flow/{signFlowId}/unsigned-files', method:'DELETE', summary:'删除待签文件'},
  {path:'/v3/sign-flow/{signFlowId}/attachments', method:'POST', summary:'追加附属材料'},
  {path:'/v3/sign-flow/{signFlowId}/attachments', method:'DELETE', summary:'删除附属材料'},
  {path:'/v3/files/{fileId}/keyword-positions', method:'POST', summary:'检索文件关键字坐标'},
  {path:'/v3/files/{fileId}/keyword-positions', method:'GET', summary:'检索文件关键字坐标(GET)'},
];

const diffs = [];
const esc = (s) => (s || '').replace(/\|/g, '\\|');

for (const ep of signEndpoints) {
  const key = normPath(ep.path) + '|' + ep.method;
  const od = odIdx[key] || [];
  const dk = dkIdx[key] || [];
  const tt = tIdx[key] || [];
  const testCovered = tt.length > 0;

  console.log(ep.method + ' ' + ep.path + ': od=' + od.length + ' dk=' + dk.length + ' test=' + tt.length);

  // Source params
  const odParams = new Map();
  for (const r of od) {
    const flat = flattenParams(r.params);
    for (const p of flat) odParams.set(p.name, { type: p.type, required: p.required, location: p.location });
  }
  const dkParams = new Map();
  for (const r of dk) {
    if (r.body && r.body.structure) {
      for (const s of r.body.structure) dkParams.set(s.path, { type: s.type, location: 'body' });
    }
    if (r.query) {
      for (const q of r.query) { if (q.key && q.key !== 'undefined') dkParams.set(q.key, { type: 'string', location: 'query' }); }
    }
    for (const pk of ['signFlowId','fileId']) {
      if (ep.path.includes('{'+pk+'}') && !dkParams.has(pk)) dkParams.set(pk, { type: 'string', location: 'path' });
    }
  }
  const tParams = new Map();
  for (const r of tt) {
    if (r.body && r.body.structure) {
      for (const s of r.body.structure) tParams.set(s.path, { type: s.type, location: 'body' });
    }
    if (r.params) {
      for (const p of r.params) {
        if (p.location === 'body' || p.location === 'query' || p.location === 'path') tParams.set(p.name, { type: (p.type||'string').toLowerCase(), location: p.location });
      }
    }
    for (const pk of ['signFlowId','fileId']) {
      if (ep.path.includes('{'+pk+'}') && !tParams.has(pk)) tParams.set(pk, { type: 'string', location: 'path' });
    }
  }

  // Merge source
  const allSource = new Map();
  for (const [n] of odParams) allSource.set(n, { od: true, dk: dkParams.has(n), test: tParams.has(n) });
  for (const [n] of dkParams) { if (!allSource.has(n)) allSource.set(n, { od: false, dk: true, test: tParams.has(n) }); }
  for (const [n] of tParams) { if (!allSource.has(n)) allSource.set(n, { od: false, dk: false, test: true }); }

  // Print overview
  const odNames = [...odParams.keys()];
  const dkNames = [...dkParams.keys()];
  const tNames = [...tParams.keys()];
  console.log('  od params: ' + (odNames.slice(0,8).join(', ') || '(none)') + (odNames.length > 8 ? ' ...+'+(odNames.length-8) : ''));
  console.log('  dk params: ' + (dkNames.slice(0,8).join(', ') || '(none)') + (dkNames.length > 8 ? ' ...+'+(dkNames.length-8) : ''));
  console.log('  test params: ' + (tNames.slice(0,8).join(', ') || '(none)') + (tNames.length > 8 ? ' ...+'+(tNames.length-8) : ''));

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

  // Source param not in any other source (single-source items)
  for (const [sn, sc] of allSource) {
    const count = (sc.od?1:0) + (sc.dk?1:0) + (sc.test?1:0);
    if (count === 1) {
      // Only flag if 2+ sources exist and 2 say absent
      const presentSources = [];
      if (sc.od) presentSources.push('opendoc');
      if (sc.dk) presentSources.push('docking');
      if (sc.test) presentSources.push('test');
      const absentSources = [];
      if (!sc.od && od.length > 0) absentSources.push('opendoc');
      if (!sc.dk && dk.length > 0) absentSources.push('docking');
      if (!sc.test && tt.length > 0) absentSources.push('test');

      if (absentSources.length > 0) {
        diffs.push({
          apiName: ep.summary, path: ep.path, method: ep.method,
          layer: 'L2', diffType: 'param-missing',
          opendocVal: sc.od ? 'present' : 'absent',
          dockingVal: sc.dk ? 'present' : 'absent',
          testVal: sc.test ? 'present' : 'absent',
          aiRec: 'VERIFY — single source: ' + presentSources.join(', '),
          confidence: 2, testCovered, severity: 'MAJOR',
          note: 'source param "' + sn + '" only in ' + presentSources.join(','),
        });
      }
    }
  }
}

// Write report
console.log('\nTotal diffs:', diffs.length);

let md = '# sign-api 差异报告 (Sub-batch 1: 签署发起类)\n\n';
md += '> 生成时间: ' + new Date().toISOString().split('T')[0] + '\n\n';
md += '| 模块 | yaml 路径 | endpoints | 差异行数 | BLOCKER | MAJOR | MINOR |\n';
md += '|---|---|---|---|---|---|---|\n';
const majors = diffs.filter(d => d.severity === 'MAJOR').length;
const minors = diffs.filter(d => d.severity === 'MINOR').length;
md += '| sign-api | openapi/sign-api.yaml | ' + signEndpoints.length + ' | ' + diffs.length + ' | 0 | ' + majors + ' | ' + minors + ' |\n\n';
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

if (diffs.length === 0) md += '\n> 无差异。\n';

const tcCount = signEndpoints.filter(ep => {
  const k = normPath(ep.path) + '|' + ep.method;
  return (tIdx[k] || []).length > 0;
}).length;

md += '\n## 摘要\n\n';
md += '- yaml endpoints: ' + signEndpoints.length + '\n';
md += '- 总差异: ' + diffs.length + '\n';
md += '- 测试覆盖: ' + tcCount + '/' + signEndpoints.length + '\n';

md += '\n## 各端点概览\n\n';
for (const ep of signEndpoints) {
  const k = normPath(ep.path) + '|' + ep.method;
  const od = (odIdx[k] || []).length;
  const dk = (dkIdx[k] || []).length;
  const tt = (tIdx[k] || []).length;
  md += '- `' + ep.method + ' ' + ep.path + '` | od:' + od + ' dk:' + dk + ' test:' + tt + ' | ' + (tt > 0 ? '✅' : '❌') + '\n';
}

fs.writeFileSync('outputs/openapi-cleanup/sign-api-batch1-diff-report.md', md, 'utf-8');
console.log('Wrote sign-api-batch1-diff-report.md');
