#!/usr/bin/env node
/**
 * seal-api 快速参数比对
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

function cleanParamName(text) {
  if (!text) return '';
  let s = text.replace(/<a[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/g, '$2');
  s = s.replace(/<font[^>]*>/g, '').replace(/<\/font>/g, '');
  s = s.replace(/<[^>]+>/g, '').replace(/\*\*/g, '');
  s = s.replace(/[（(]点击[^）)]*[）)]/g, '');
  return s.trim();
}

function flattenParams(params, prefix) {
  const result = [];
  if (!params) return result;
  for (const p of params) {
    const n = cleanParamName(p.name);
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

const sealEndpoints = [
  {path:'/v3/seals/psn-seal-create-url', method:'POST', summary:'获取创建个人印章页面链接'},
  {path:'/v3/seals/psn-seals-manage-url', method:'POST', summary:'获取管理个人印章页面链接'},
  {path:'/v3/seals/psn-seals/create-by-template', method:'POST', summary:'创建个人模板印章'},
  {path:'/v3/seals/psn-seals/create-by-image', method:'POST', summary:'创建个人图片印章'},
  {path:'/v3/seals/psn-seal', method:'DELETE', summary:'删除个人印章'},
  {path:'/v3/seals/psn-seal-info', method:'GET', summary:'查询指定印章详情（个人）'},
  {path:'/v3/seals/psn-seal-list', method:'GET', summary:'查询个人印章列表'},
  {path:'/v3/seals/psn-seals/set-default-seal', method:'POST', summary:'设置个人默认印章'},
  {path:'/v3/seals/org-seal-create-url', method:'POST', summary:'获取创建机构印章页面链接'},
  {path:'/v3/seals/legal-rep-seal-create-url', method:'POST', summary:'获取创建法定代表人印章页面链接'},
  {path:'/v3/seals/org-seals-manage-url', method:'POST', summary:'获取管理机构印章页面链接'},
  {path:'/v3/seals/org-seals/create-by-template', method:'POST', summary:'创建机构模板印章'},
  {path:'/v3/seals/org-seals/create-by-image', method:'POST', summary:'创建机构图片印章'},
  {path:'/v3/seals/org-seal', method:'DELETE', summary:'删除机构印章'},
  {path:'/v3/seals/org-seal-info', method:'GET', summary:'查询企业指定印章详情'},
  {path:'/v3/seals/org-own-seal-list', method:'GET', summary:'查询企业内部印章'},
  {path:'/v3/seals/org-seals/enable-seal', method:'POST', summary:'启用机构印章'},
  {path:'/v3/seals/org-seals/disable-seal', method:'POST', summary:'停用机构印章'},
  {path:'/v3/seals/org-seals/set-default-seal', method:'POST', summary:'设置机构默认印章'},
  {path:'/v3/files/file-key', method:'POST', summary:'上传印章图片'},
  {path:'/v3/seals/org-seals/internal-auth', method:'POST', summary:'内部成员印章授权'},
  {path:'/v3/seals/org-seals/internal-auth', method:'GET', summary:'查询对内部成员印章授权详情'},
  {path:'/v3/seals/org-seals/external-auth', method:'POST', summary:'跨企业印章授权'},
  {path:'/v3/seals/org-seals/external-auth', method:'GET', summary:'查询对外部企业授权详情'},
  {path:'/v3/seals/org-seals/reauthorization', method:'POST', summary:'修改印章授权期限'},
  {path:'/v3/seals/org-seals/auth-delete', method:'POST', summary:'解除印章授权'},
  {path:'/v3/seals/org-seals/authorization-sign-url', method:'GET', summary:'查询印章授权书签署链接'},
  {path:'/v3/seals/org-authorized-seal-list', method:'GET', summary:'查询被外部企业授权印章'},
];

// YAML params manually extracted from reading seal-api.yaml
const yamlParams = {
  'POST /v3/seals/psn-seal-create-url': {
    path: ['psnId'],
    body: ['sealName', 'sealCreateMode', 'sealTemplateStyle', 'sealSize', 'sealColor', 'sealSuffix', 'sealOpacity', 'customBizNum', 'redirectUrl', 'uneditableFields'],
  },
  'POST /v3/seals/psn-seals-manage-url': { path: ['psnId'] },
  'POST /v3/seals/psn-seals/create-by-template': {
    path: ['psnId'],
    body: ['sealName', 'sealTemplateStyle', 'sealSize', 'sealColor', 'sealSuffix', 'sealOpacity', 'sealOldStyle'],
  },
  'POST /v3/seals/psn-seals/create-by-image': {
    path: ['psnId'],
    body: ['sealImageFileKey', 'sealName', 'sealWidth', 'sealHeight', 'sealColor', 'manualAudit', 'sealFilingMaterials'],
  },
  'DELETE /v3/seals/psn-seal': { path: ['psnId', 'sealId'] },
  'GET /v3/seals/psn-seal-info': { path: ['psnId', 'sealId'] },
  'GET /v3/seals/psn-seal-list': { path: ['psnId'], query: ['pageNum', 'pageSize'] },
  'POST /v3/seals/psn-seals/set-default-seal': { path: ['psnId', 'sealId'] },
  'POST /v3/seals/org-seal-create-url': {
    path: ['orgId', 'transactorPsnId'],
    body: ['sealName', 'sealCreateMode', 'sealTemplateStyle', 'sealSize', 'sealColor', 'sealSuffix', 'sealOpacity', 'sealHorizontalText', 'sealBottomText', 'sealOutsideSurroundText', 'customBizNum', 'redirectUrl', 'uneditableFields'],
  },
  'POST /v3/seals/legal-rep-seal-create-url': {
    path: ['orgId', 'transactorPsnId'],
    body: ['sealName', 'sealCreateMode', 'sealTemplateStyle', 'sealSize', 'sealColor', 'sealOpacity', 'customBizNum', 'redirectUrl', 'uneditableFields'],
  },
  'POST /v3/seals/org-seals-manage-url': { path: ['orgId', 'transactorPsnId'] },
  'POST /v3/seals/org-seals/create-by-template': {
    path: ['orgId'],
    body: ['sealName', 'sealTemplateStyle', 'sealSize', 'sealColor', 'sealOpacity', 'sealOldStyle', 'sealHorizontalText', 'sealBottomText', 'sealOutsideSurroundText'],
  },
  'POST /v3/seals/org-seals/create-by-image': {
    path: ['orgId'],
    body: ['sealImageFileKey', 'sealName', 'sealWidth', 'sealHeight', 'sealColor', 'sealBizType', 'imageProcess', 'manualAudit', 'sealFilingMaterials'],
  },
  'DELETE /v3/seals/org-seal': { path: ['orgId', 'sealId'] },
  'GET /v3/seals/org-seal-info': { path: ['orgId', 'sealId'] },
  'GET /v3/seals/org-own-seal-list': { path: ['orgId'], query: ['pageNum', 'pageSize', 'sealBizTypes', 'revocationSeal'] },
  'POST /v3/seals/org-seals/enable-seal': { path: ['orgId', 'sealId'] },
  'POST /v3/seals/org-seals/disable-seal': { path: ['orgId', 'sealId'] },
  'POST /v3/seals/org-seals/set-default-seal': { path: ['orgId', 'sealId'] },
  'POST /v3/files/file-key': { body: ['contentMd5', 'contentType', 'fileName', 'fileSize'] },
  'POST /v3/seals/org-seals/internal-auth': {
    path: ['orgId'],
    body: ['sealId', 'authorizedPsnIds', 'sealRole', 'transactorPsnId', 'sealAuthScope', 'sealAuthScope.templateIds', 'sealAuthScope.applicationsIds', 'autoSign', 'longTermEffective', 'effectiveTime', 'expireTime', 'authConfirmMethod', 'redirectUrl', 'appScheme', 'customBizNum'],
  },
  'GET /v3/seals/org-seals/internal-auth': { path: ['orgId', 'sealId'], query: ['authorizedPsnId', 'pageNum', 'pageSize'] },
  'POST /v3/seals/org-seals/external-auth': {
    path: ['orgId'],
    body: ['sealIds', 'sealId', 'transactorPsnId', 'authorizedOrgInfo', 'authorizedOrgInfo.orgName', 'authorizedOrgInfo.orgIDCardNum', 'longTermEffective', 'effectiveTime', 'expireTime', 'authorizedType', 'applicationsId', 'redirectUrl', 'appScheme', 'autoSign', 'customBizNum'],
  },
  'GET /v3/seals/org-seals/external-auth': { path: ['orgId', 'sealAuthBizId'] },
  'POST /v3/seals/org-seals/reauthorization': {
    path: ['orgId'],
    body: ['sealAuthBizId', 'transactorPsnId', 'effectiveTime', 'expireTime', 'redirectUrl'],
  },
  'POST /v3/seals/org-seals/auth-delete': { path: ['orgId'], body: ['deleteType', 'sealIds', 'sealAuthBizIds'] },
  'GET /v3/seals/org-seals/authorization-sign-url': { path: ['orgId', 'sealAuthBizId'] },
  'GET /v3/seals/org-authorized-seal-list': { path: ['orgId'], query: ['authorizerOrgId', 'pageNum', 'pageSize'] },
};

const noise = new Set(['url', 'method', 'name', 'folder_path', 'transactorPsnId-']);
const diffs = [];

for (const ep of sealEndpoints) {
  const key = normPath(ep.path) + '|' + ep.method;
  const methodKey = ep.method + ' ' + ep.path;
  const od = odIdx[key] || [];
  const dk = dkIdx[key] || [];
  const tt = tIdx[key] || [];
  const testCovered = tt.length > 0;

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
    // Postman has path params embedded in URL
    for (const pathKey of ['psnId', 'orgId', 'sealId', 'sealAuthBizId']) {
      if (ep.path.includes('{' + pathKey + '}') && !dkParams.has(pathKey)) {
        dkParams.set(pathKey, { type: 'string', location: 'path' });
      }
    }
  }

  const tParams = new Map();
  for (const r of tt) {
    if (r.body && r.body.structure) {
      for (const s of r.body.structure) tParams.set(s.path, { type: s.type, location: 'body' });
    }
    if (r.params) {
      for (const p of r.params) {
        if (p.location === 'body' || p.location === 'query' || p.location === 'path') {
          tParams.set(p.name, { type: (p.type||'string').toLowerCase(), location: p.location });
        }
      }
    }
    for (const pathKey of ['psnId', 'orgId', 'sealId', 'sealAuthBizId']) {
      if (ep.path.includes('{' + pathKey + '}') && !tParams.has(pathKey)) {
        tParams.set(pathKey, { type: 'string', location: 'path' });
      }
    }
  }

  const yp = yamlParams[methodKey] || {};
  const yamlAll = new Set([...(yp.path||[]), ...(yp.body||[]), ...(yp.query||[])]);

  // Merge source params
  const allSource = new Map();
  for (const [n] of odParams) allSource.set(n, { od: true, dk: dkParams.has(n), test: tParams.has(n) });
  for (const [n] of dkParams) { if (!allSource.has(n)) allSource.set(n, { od: false, dk: true, test: tParams.has(n) }); }
  for (const [n] of tParams) { if (!allSource.has(n)) allSource.set(n, { od: false, dk: false, test: true }); }

  // Source -> yaml missing
  for (const [sn, sc] of allSource) {
    if (noise.has(sn)) continue;
    // Skip children of yaml params that are containers
    const isChild = [...yamlAll].some(yn => sn.startsWith(yn + '.') && !sn.includes('.'));
    if (isChild) continue;

    if (!yamlAll.has(sn)) {
      const count = (sc.od?1:0) + (sc.dk?1:0) + (sc.test?1:0);
      diffs.push({
        apiName: ep.summary, path: ep.path, method: ep.method,
        layer: 'L2', diffType: 'param-missing',
        opendocVal: sc.od ? 'present' : 'absent',
        dockingVal: sc.dk ? 'present' : 'absent',
        testVal: sc.test ? 'present' : 'absent',
        aiRec: count >= 2 ? 'ADD to yaml' : 'VERIFY',
        confidence: count >= 2 ? 4 : 2,
        testCovered, severity: 'MAJOR',
        note: 'source param "' + sn + '" not in yaml',
      });
    }
  }

  // YAML -> source missing
  for (const yn of yamlAll) {
    const odHas = odParams.has(yn);
    const dkHas = dkParams.has(yn);
    const tHas = tParams.has(yn);
    if (!odHas && !dkHas && !tHas) {
      diffs.push({
        apiName: ep.summary, path: ep.path, method: ep.method,
        layer: 'L2', diffType: 'param-extra',
        opendocVal: 'absent', dockingVal: 'absent', testVal: 'absent',
        aiRec: 'KEEP — yaml-only', confidence: 2, testCovered, severity: 'MAJOR',
        note: 'yaml param "' + yn + '" not in any source',
      });
    }
  }
}

// Output summary
console.log('Total diffs:', diffs.length);
const byEp = {};
for (const d of diffs) {
  const k = d.method + ' ' + d.path;
  if (!byEp[k]) byEp[k] = [];
  byEp[k].push(d);
}
for (const [k, dd] of Object.entries(byEp)) {
  console.log('\n' + k + ': ' + dd.length + ' diffs');
  for (const d of dd) {
    console.log('  ' + d.diffType + ' | ' + d.note + ' | od:' + d.opendocVal + ' dk:' + d.dockingVal + ' test:' + d.testVal + ' | conf:' + d.confidence);
  }
}

// Write report
const esc = (s) => (s || '').replace(/\|/g, '\\|');
const blockers = 0, majors = diffs.length, minors = 0;
let md = '# seal-api 差异报告\n\n';
md += '> 生成时间: ' + new Date().toISOString().split('T')[0] + '\n\n';
md += '| 模块 | yaml 路径 | endpoints | 差异行数 | BLOCKER | MAJOR | MINOR |\n';
md += '|---|---|---|---|---|---|---|\n';
md += '| seal-api | openapi/seal-api.yaml | ' + sealEndpoints.length + ' | ' + diffs.length + ' | ' + blockers + ' | ' + majors + ' | ' + minors + ' |\n\n';
md += '## PM 决策说明\n\n- **A** = 采纳 AI 推荐\n- **K** = 保持 yaml 原状\n- **R** = 需实跑验证\n- **C:<value>** = 自定义值\n\n';
md += '## 差异明细表\n\n';
md += '| # | API名 | path | method | 层 | 差异类型 | opendoc值 | 对接Postman值 | 测试值 | AI推荐 | 置信度 | 测试覆盖 | 严重度 | PM决策 | 备注 |\n';
md += '|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|\n';
let id = 0;
for (const d of diffs) {
  id++;
  const stars = '★'.repeat(d.confidence) + '☆'.repeat(5 - d.confidence);
  md += '| ' + id + ' | ' + esc(d.apiName) + ' | ' + d.path + ' | ' + d.method + ' | ' + d.layer + ' | ' + d.diffType + ' | ' + esc(d.opendocVal) + ' | ' + esc(d.dockingVal) + ' | ' + esc(d.testVal) + ' | ' + esc(d.aiRec) + ' | ' + stars + ' | ' + (d.testCovered ? '✅' : '❌') + ' | ' + d.severity + ' | | ' + esc(d.note) + ' |\n';
}

const coveredCount = sealEndpoints.filter(ep => {
  const k = normPath(ep.path) + '|' + ep.method;
  return (tIdx[k] || []).length > 0;
}).length;

md += '\n## 摘要\n\n';
md += '- yaml endpoints: ' + sealEndpoints.length + '\n';
md += '- 总差异: ' + diffs.length + '\n';
md += '- MAJOR (L2 param list): ' + majors + '\n';
md += '- 测试覆盖: ' + coveredCount + '/' + sealEndpoints.length + '\n';
md += '\n## 各端点概览\n\n';
for (const ep of sealEndpoints) {
  const k = normPath(ep.path) + '|' + ep.method;
  const epDiffs = diffs.filter(d => d.path === ep.path && d.method === ep.method);
  const tc = (tIdx[k] || []).length > 0;
  md += '- `' + ep.method + ' ' + ep.path + '` — ' + ep.summary + ' | 差异 ' + epDiffs.length + ' | 测试 ' + (tc ? '✅' : '❌') + '\n';
}

fs.writeFileSync('outputs/openapi-cleanup/seal-api-diff-report.md', md, 'utf-8');
console.log('\nWrote seal-api-diff-report.md');
