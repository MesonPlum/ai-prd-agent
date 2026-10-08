#!/usr/bin/env node
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

// Sign-api endpoints from master index
const signEndpoints = [
  {path:'/v3/sign-flow/create-by-file', method:'POST', summary:'通过文件创建签署流程'},
  {path:'/v3/sign-flow/{signFlowId}/add-signers', method:'POST', summary:'添加签署人'},
  {path:'/v3/sign-flow/{signFlowId}/sign-url', method:'POST', summary:'获取签署链接'},
  {path:'/v3/sign-flow/{signFlowId}/sign-detail', method:'GET', summary:'查询签署详情'},
  {path:'/v3/sign-flow/{signFlowId}/urge', method:'POST', summary:'催签'},
  {path:'/v3/sign-flow/{signFlowId}/withdraw', method:'POST', summary:'撤销签署'},
  {path:'/v3/sign-flow/{signFlowId}/terminate', method:'POST', summary:'终止签署'},
  {path:'/v3/sign-flow/{signFlowId}/reject', method:'POST', summary:'拒签'},
  {path:'/v3/sign-files/upload-url', method:'POST', summary:'获取文件上传地址'},
  {path:'/v3/sign-files/{fileId}/download-url', method:'GET', summary:'获取文件下载链接'},
  {path:'/v3/sign-files/{fileId}/merge-url', method:'GET', summary:'获取合并文件下载链接'},
  {path:'/v3/sign-files/{fileId}/seal-url', method:'POST', summary:'文件签章'},
  {path:'/v3/sign-files/{fileId}/watermark', method:'POST', summary:'文件水印'},
  {path:'/v3/sign-files/{fileId}/password', method:'POST', summary:'文件密码'},
  {path:'/v3/certificates/create', method:'POST', summary:'创建证书'},
  {path:'/v3/certificates/{certId}/download-url', method:'GET', summary:'获取证书下载链接'},
  {path:'/v3/certificates/{certId}/verify', method:'GET', summary:'验证证书'},
  {path:'/v3/certificates/batch-verify', method:'POST', summary:'批量验证证书'},
];

// Actually let me read the yaml to get real endpoints
const yaml = fs.readFileSync('openapi/sign-api.yaml','utf-8');
const yamlEndpoints = [];
let inPaths = false, currentPath = '', inWebhooks = false;
const lines = yaml.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.match(/^paths:/)) { inPaths = true; continue; }
  if (line.match(/^webhooks:/)) { inWebhooks = true; inPaths = false; continue; }
  if (line.match(/^x-error-codes:/)) { inPaths = false; continue; }
  if (inPaths && line.match(/^[a-zA-Z]/) && !line.startsWith('/')) { inPaths = false; continue; }
  if (inPaths) {
    const pathMatch = line.match(/^  (\/[^:]+):\s*$/);
    if (pathMatch) { currentPath = pathMatch[1]; continue; }
    if (currentPath) {
      const methodMatch = line.match(/^    (get|post|put|delete|patch):\s*$/i);
      if (methodMatch) {
        const method = methodMatch[1].toUpperCase();
        let summary = '';
        for (let j = i + 1; j < lines.length; j++) {
          const nl = lines[j];
          if (nl.match(/^  (\/[^:]+):\s*$/)) break;
          if (nl.match(/^    (get|post|put|delete|patch):\s*$/i)) break;
          const sm = nl.match(/^\s+summary:\s*(.+)$/);
          if (sm) summary = sm[1].trim().replace(/['"]/g, '');
        }
        yamlEndpoints.push({ path: currentPath, method, summary, line: i + 1 });
      }
    }
  }
}

console.log('=== sign-api yaml endpoints: ' + yamlEndpoints.length + ' ===\n');
for (const ep of yamlEndpoints) {
  const key = normPath(ep.path) + '|' + ep.method;
  const od = odIdx[key] || [];
  const dk = dkIdx[key] || [];
  const tt = tIdx[key] || [];
  console.log(ep.method + ' ' + ep.path + ': od=' + od.length + ' dk=' + dk.length + ' test=' + tt.length);
  for (const r of od.slice(0,1)) console.log('  od:', r.file);
  if (od.length > 1) console.log('  od: ... +' + (od.length-1));
  for (const r of dk.slice(0,1)) console.log('  dk:', r.folder_path + '/' + r.name);
  if (dk.length > 1) console.log('  dk: ... +' + (dk.length-1) + ' more');
  for (const r of tt.slice(0,2)) console.log('  test:', (r.folder_path||'') + '/' + r.name);
  if (tt.length > 2) console.log('  test: ... +' + (tt.length-2) + ' more');
}

// Count test coverage
let tcCount = 0;
for (const ep of yamlEndpoints) {
  const key = normPath(ep.path) + '|' + ep.method;
  if ((tIdx[key] || []).length > 0) tcCount++;
}
console.log('\nTest covered: ' + tcCount + '/' + yamlEndpoints.length);
