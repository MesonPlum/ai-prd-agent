#!/usr/bin/env node
/**
 * Phase 2 — auth-api 差异比对报告生成（重构版）
 *
 * 逐 endpoint 比对 yaml vs opendoc / docking / test
 * 输出: outputs/openapi-cleanup/auth-api-diff-report.md
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const INDEX_DIR = path.join(ROOT, 'outputs/openapi-cleanup/_index');
const OUTPUT_DIR = path.join(ROOT, 'outputs/openapi-cleanup');

// ── Path normalization ──────────────────────────────────
function normalizePath(p) {
  let s = p.replace(/\*\*/g, '').replace(/<[^>]+>/g, '').replace(/\?.*$/, '').trim();
  if (s && !s.startsWith('/')) s = '/' + s;
  s = s.replace(/\{\{[^}]+\}\}/g, '{xxx}');
  s = s.replace(/\/[0-9a-fA-F]{6,}/g, '/{xxx}');
  s = s.replace(/\/\d+/g, '/{xxx}');
  s = s.replace(/\{[a-zA-Z_]\w*\}/g, '{xxx}');
  return s;
}

// ── Rich text cleaning (aggressive for param names) ─────
function cleanParamName(text) {
  if (!text) return '';
  let s = text;
  s = s.replace(/<a\s+[^>]*href="([^"]*)"[^>]*>([^<]*)<\/a>/g, '$2');
  s = s.replace(/<font[^>]*>/g, '');
  s = s.replace(/<\/font>/g, '');
  s = s.replace(/<[^>]+>/g, '');
  s = s.replace(/\*\*/g, '');
  // Remove "（点击"+"展开详情）" and similar UI text
  s = s.replace(/[（(]点击[^）)]*[）)]/g, '');
  s = s.trim();
  return s;
}

// ── Load data ───────────────────────────────────────────
const opendoc = JSON.parse(fs.readFileSync(path.join(INDEX_DIR, 'opendoc.json'), 'utf-8'));
const docking = JSON.parse(fs.readFileSync(path.join(INDEX_DIR, 'postman-docking.json'), 'utf-8'));
const testPM = JSON.parse(fs.readFileSync(path.join(INDEX_DIR, 'postman-test.json'), 'utf-8'));
const apifox = JSON.parse(fs.readFileSync(path.join(INDEX_DIR, 'apifox.json'), 'utf-8'));
const testCombined = [...testPM, ...apifox];

// ── Build index ─────────────────────────────────────────
function buildIndex(items) {
  const idx = {};
  for (const rec of items) {
    const rawP = rec.path || rec.url || '';
    const norm = normalizePath(rawP);
    const m = (rec.method || '').toUpperCase();
    const key = norm + '|' + m;
    if (!idx[key]) idx[key] = [];
    idx[key].push(rec);
  }
  return idx;
}

const opendocIdx = buildIndex(opendoc);
const dockingIdx = buildIndex(docking);
const testIdx = buildIndex(testCombined);

// ── Auth endpoints ──────────────────────────────────────
const authEndpoints = [
  { path: '/v3/psn-auth-url', method: 'POST', summary: '获取个人认证&授权页面链接' },
  { path: '/v3/org-auth-url', method: 'POST', summary: '获取机构认证&授权页面链接' },
  { path: '/v3/persons/identity-info', method: 'GET', summary: '查询个人认证信息' },
  { path: '/v3/persons/{psnId}/authorized-info', method: 'GET', summary: '查询个人授权信息' },
  { path: '/v3/organizations/identity-info', method: 'GET', summary: '查询机构认证信息' },
  { path: '/v3/organizations/{orgId}/authorized-info', method: 'GET', summary: '查询机构授权信息' },
  { path: '/v3/auth-flow/{authFlowId}', method: 'GET', summary: '查询认证授权流程详情' },
];

// ── Flatten opendoc params recursively ──────────────────
function flattenOpendocParams(params, prefix = '') {
  const result = [];
  for (const p of params) {
    const rawName = cleanParamName(p.name);
    if (!rawName) continue;
    const fullName = prefix ? prefix + '.' + rawName : rawName;
    result.push({
      name: fullName,
      type: (p.type || '').toLowerCase() || '',
      required: p.required === true,
      location: p.location || 'body',
    });
    if (p.children && p.children.length > 0) {
      // If parent is array/list type, children are enum value descriptions, not real params
      const parentType = (p.type || '').toLowerCase();
      if (parentType === 'list' || parentType === 'array') continue;
      // authorizedScopes children are enum descriptions even when type is empty
      if (rawName === 'authorizedScopes') continue;
      result.push(...flattenOpendocParams(p.children, fullName));
    }
  }
  return result;
}


// ── Diff accumulator ────────────────────────────────────
const diffs = [];
let diffId = 0;

function addDiff({ apiName, path, method, layer, diffType, opendocVal, dockingVal, testVal, aiRec, confidence, testCovered, severity, note }) {
  diffId++;
  diffs.push({ id: diffId, apiName, path, method, layer, diffType, opendocVal: opendocVal || '', dockingVal: dockingVal || '', testVal: testVal || '', aiRec, confidence, testCovered, severity, note });
}

// ── Per-endpoint comparison ─────────────────────────────
for (const ep of authEndpoints) {
  const key = normalizePath(ep.path) + '|' + ep.method;
  const methodKey = `${ep.method} ${ep.path}`;
  const sliceOpendoc = opendocIdx[key] || [];
  const sliceDocking = dockingIdx[key] || [];
  const sliceTest = testIdx[key] || [];
  const testCovered = sliceTest.length > 0;

  console.log(`\n${methodKey}:`);
  console.log(`  opendoc=${sliceOpendoc.length}, docking=${sliceDocking.length}, test=${sliceTest.length}`);

  // ═══════════════════════════════════════════════════════
  // GET endpoints: query/path params
  // ═══════════════════════════════════════════════════════
  if (ep.method === 'GET') {
    // Get opendoc params (clean names, filter query/path)
    const odParams = new Map();
    for (const od of sliceOpendoc) {
      if (od.params) {
        for (const p of od.params) {
          const name = cleanParamName(p.name);
          if (!name) continue;
          const loc = p.location || (p.location === 'path' ? 'path' : 'query');
          // opendoc marks GET params as "body" sometimes — check from context
          const actualLoc = name.includes(ep.path.split('/').pop().replace('{','').replace('}','')) || ep.path.includes('{' + name + '}') ? 'path' : loc;
          odParams.set(name, {
            type: (p.type || 'string').toLowerCase(),
            required: p.required === true,
            location: actualLoc,
          });
        }
      }
    }

    // Docking query params exist but don't expose explicit param names

    // Get test query params (apifox has structured params)
    const testParams = new Map();
    for (const t of sliceTest) {
      if (t.query) {
        for (const q of t.query) {
          if (q.name && q.location === 'query') {
            testParams.set(q.name, { type: (q.type || 'string').toLowerCase(), required: q.required === true });
          }
        }
      }
      if (t.params) {
        for (const p of t.params) {
          if (p.location === 'query' || p.location === 'path') {
            testParams.set(p.name, { type: (p.type || 'string').toLowerCase(), required: p.required === true, location: p.location });
          }
        }
      }
    }

    // YAML params for GET endpoints (from reading auth-api.yaml)
    const yamlGETParams = {
      'GET /v3/persons/identity-info': {
        'psnId': { type: 'string', required: false, location: 'query' },
        'psnAccount': { type: 'string', required: false, location: 'query' },
        'psnIDCardNum': { type: 'string', required: false, location: 'query' },
        'psnIDCardType': { type: 'string', required: false, location: 'query' },
      },
      'GET /v3/persons/{psnId}/authorized-info': {
        'psnId': { type: 'string', required: true, location: 'path' },
      },
      'GET /v3/organizations/identity-info': {
        'orgId': { type: 'string', required: false, location: 'query' },
        'orgName': { type: 'string', required: false, location: 'query' },
        'orgIDCardNum': { type: 'string', required: false, location: 'query' },
        'orgIDCardType': { type: 'string', required: false, location: 'query' },
      },
      'GET /v3/organizations/{orgId}/authorized-info': {
        'orgId': { type: 'string', required: true, location: 'path' },
      },
      'GET /v3/auth-flow/{authFlowId}': {
        'authFlowId': { type: 'string', required: true, location: 'path' },
      },
    };

    const yamlParams = yamlGETParams[methodKey] || {};
    const yamlParamNames = Object.keys(yamlParams);

    // Check: yaml param not in opendoc (opendoc should have full param tables)
    for (const yn of yamlParamNames) {
      if (!odParams.has(yn)) {
        addDiff({
          apiName: ep.summary,
          path: ep.path, method: ep.method,
          layer: 'L2', diffType: 'param-extra',
          opendocVal: 'absent',
          dockingVal: '—',
          testVal: testCovered ? (testParams.has(yn) ? 'present' : 'absent') : '—',
          aiRec: 'KEEP — verify with PM, opendoc may have missed it',
          confidence: 2,
          testCovered,
          severity: 'MAJOR',
          note: `yaml param "${yn}" not in opendoc param table`,
        });
      }
    }

    // Check: opendoc param not in yaml (shouldn't happen for GET — opendoc should be subset)
    for (const [on, oi] of odParams) {
      if (!yamlParamNames.includes(on)) {
        // Skip if it's just a location mismatch (opendoc says body but it's query)
        addDiff({
          apiName: ep.summary,
          path: ep.path, method: ep.method,
          layer: 'L2', diffType: 'param-missing',
          opendocVal: `present (loc: ${oi.location}, type: ${oi.type}, req: ${oi.required})`,
          dockingVal: '—',
          testVal: testParams.has(on) ? 'present' : 'absent',
          aiRec: `ADD to yaml (name: ${on}, type: ${oi.type || 'string'}, loc: ${oi.location})`,
          confidence: 4,
          testCovered,
          severity: 'MAJOR',
          note: `opendoc has param "${on}" not in yaml`,
        });
      }
    }

    // L3: required/type mismatch
    for (const yn of yamlParamNames) {
      if (odParams.has(yn)) {
        const yp = yamlParams[yn];
        const op = odParams.get(yn);
        if (yp.required !== op.required) {
          addDiff({
            apiName: ep.summary,
            path: ep.path, method: ep.method,
            layer: 'L3', diffType: 'required-flip',
            opendocVal: `required: ${op.required}`,
            dockingVal: '—',
            testVal: '—',
            aiRec: yp.required ? 'required: true (yaml)' : 'required: false (yaml)',
            confidence: 3,
            testCovered,
            severity: 'MAJOR',
            note: `"${yn}" required: yaml=${yp.required}, opendoc=${op.required}`,
          });
        }
        if (yp.type !== op.type && op.type !== '' && op.type !== 'string' && yp.type !== 'string') {
          // Only flag if both have non-string types that differ
          addDiff({
            apiName: ep.summary,
            path: ep.path, method: ep.method,
            layer: 'L3', diffType: 'type-mismatch',
            opendocVal: `type: ${op.type}`,
            dockingVal: '—', testVal: '—',
            aiRec: `type: ${yp.type} (yaml authoritative)`,
            confidence: 3,
            testCovered, severity: 'MAJOR',
            note: `"${yn}" type: yaml=${yp.type}, opendoc=${op.type}`,
          });
        }
      }
    }
  }

  // ═══════════════════════════════════════════════════════
  // POST endpoints: body params
  // ═══════════════════════════════════════════════════════
  if (ep.method === 'POST') {
    // Opendoc flattened body params
    const odFlat = new Map();
    for (const od of sliceOpendoc) {
      if (od.params) {
        const flat = flattenOpendocParams(od.params);
        for (const p of flat) {
          if (!odFlat.has(p.name)) {
            odFlat.set(p.name, { type: p.type, required: p.required });
          }
        }
      }
    }

    // Docking body structure (dotted paths)
    const dkFlat = new Map();
    for (const dk of sliceDocking) {
      if (dk.body && dk.body.structure) {
        for (const s of dk.body.structure) {
          if (!dkFlat.has(s.path)) {
            dkFlat.set(s.path, { type: s.type || 'string' });
          }
        }
      }
    }

    // Test body params
    const testFlat = new Map();
    for (const t of sliceTest) {
      // Skip header params — only body
      if (t.body && t.body.structure) {
        for (const s of t.body.structure) {
          if (!testFlat.has(s.path)) {
            testFlat.set(s.path, { type: s.type || 'string' });
          }
        }
      }
      if (t.params) {
        for (const p of t.params) {
          if (p.location === 'body' && !testFlat.has(p.name)) {
            testFlat.set(p.name, { type: p.type || 'string' });
          }
        }
      }
    }

    // YAML body params (from reading auth-api.yaml manually)
    const yamlPOSTParams = {
      'POST /v3/psn-auth-url': {
        top: new Set(['psnAuthConfig', 'authorizeConfig', 'redirectConfig', 'notifyUrl', 'clientType', 'appScheme']),
        nested: {
          'psnAuthConfig.psnAccount': { type: 'string' },
          'psnAuthConfig.psnId': { type: 'string' },
          'psnAuthConfig.psnInfo': { type: 'object' },
          'psnAuthConfig.psnInfo.psnName': { type: 'string' },
          'psnAuthConfig.psnInfo.psnIDCardNum': { type: 'string' },
          'psnAuthConfig.psnInfo.psnIDCardType': { type: 'string' },
          'psnAuthConfig.psnInfo.psnMobile': { type: 'string' },
          'psnAuthConfig.psnInfo.bankCardNum': { type: 'string' },
          'psnAuthConfig.psnInfo.psnIdentityVerify': { type: 'boolean' },
          'psnAuthConfig.psnAuthPageConfig': { type: 'object' },
          'psnAuthConfig.psnAuthPageConfig.psnDefaultAuthMode': { type: 'string' },
          'psnAuthConfig.psnAuthPageConfig.psnAvailableAuthModes': { type: 'array' },
          'psnAuthConfig.psnAuthPageConfig.advancedVersion': { type: 'array' },
          'psnAuthConfig.psnAuthPageConfig.psnEditableFields': { type: 'array' },
          'authorizeConfig.authorizedScopes': { type: 'array' },
          'redirectConfig.redirectUrl': { type: 'string' },
          'redirectConfig.redirectDelayTime': { type: 'string' },
        },
      },
      'POST /v3/org-auth-url': {
        top: new Set(['orgAuthConfig', 'authorizeConfig', 'redirectConfig', 'transactorUseSeal', 'clientType', 'notifyUrl', 'appScheme', 'orgIdentityVerify']),
        nested: {
          'orgAuthConfig.orgName': { type: 'string' },
          'orgAuthConfig.orgId': { type: 'string' },
          'orgAuthConfig.orgInfo': { type: 'object' },
          'orgAuthConfig.orgInfo.orgIDCardNum': { type: 'string' },
          'orgAuthConfig.orgInfo.orgIDCardType': { type: 'string' },
          'orgAuthConfig.orgInfo.legalRepName': { type: 'string' },
          'orgAuthConfig.orgInfo.legalRepIDCardNum': { type: 'string' },
          'orgAuthConfig.orgInfo.legalRepIDCardType': { type: 'string' },
          'orgAuthConfig.orgInfo.orgBankAccountNum': { type: 'string' },
          'orgAuthConfig.orgAuthPageConfig': { type: 'object' },
          'orgAuthConfig.orgAuthPageConfig.orgDefaultAuthMode': { type: 'string' },
          'orgAuthConfig.orgAuthPageConfig.orgAvailableAuthModes': { type: 'array' },
          'orgAuthConfig.orgAuthPageConfig.orgEditableFields': { type: 'array' },
          'orgAuthConfig.orgAuthPageConfig.legalRepAvailableAuthModes': { type: 'array' },
          'orgAuthConfig.transactorInfo': { type: 'object' },
          'orgAuthConfig.transactorInfo.psnId': { type: 'string' },
          'orgAuthConfig.transactorInfo.psnAccount': { type: 'string' },
          'orgAuthConfig.transactorInfo.psnInfo': { type: 'object' },
          'orgAuthConfig.transactorInfo.psnInfo.psnName': { type: 'string' },
          'orgAuthConfig.transactorInfo.psnInfo.psnIDCardNum': { type: 'string' },
          'orgAuthConfig.transactorInfo.psnInfo.psnIDCardType': { type: 'string' },
          'orgAuthConfig.transactorInfo.psnInfo.bankCardNum': { type: 'string' },
          'orgAuthConfig.transactorInfo.psnInfo.psnMobile': { type: 'string' },
          'orgAuthConfig.transactorInfo.psnInfo.psnIdentityVerify': { type: 'boolean' },
          'orgAuthConfig.transactorAuthPageConfig': { type: 'object' },
          'orgAuthConfig.transactorAuthPageConfig.psnDefaultAuthMode': { type: 'string' },
          'orgAuthConfig.transactorAuthPageConfig.psnAvailableAuthModes': { type: 'array' },
          'orgAuthConfig.transactorAuthPageConfig.advancedVersion': { type: 'array' },
          'orgAuthConfig.transactorAuthPageConfig.psnEditableFields': { type: 'array' },
          'authorizeConfig.authorizedScopes': { type: 'array' },
          'redirectConfig.redirectUrl': { type: 'string' },
          'redirectConfig.redirectDelayTime': { type: 'string' },
        },
      },
    };

    const yamlInfo = yamlPOSTParams[methodKey];
    if (!yamlInfo) {
      console.log(`  WARNING: no yaml body param info for ${methodKey}`);
      continue;
    }

    const yamlTopNames = yamlInfo.top;
    const yamlNestedNames = Object.keys(yamlInfo.nested);
    const allSourceNames = new Set([...odFlat.keys(), ...dkFlat.keys(), ...testFlat.keys()]);

    // ── Filter out noise from source data ──────────────
    // Known non-param fields from postman/apifox:
    const NOISE_FIELDS = new Set([
      'url', 'raw_url', 'method', 'name', 'folder_path', 'source_file',
      'X-Tsign-Open-App-Id', 'X-Tsign-Open-Auth-Mode', 'X-Tsign-Open-App-Secret',
      'Content-Type', 'repeatableRealName', // test-specific additions
    ]);

    // ── Source top-level params not in yaml top ─────────
    for (const srcName of allSourceNames) {
      if (NOISE_FIELDS.has(srcName)) continue;

      // Check if it's a top-level source param (no dots)
      if (!srcName.includes('.')) {
        if (!yamlTopNames.has(srcName)) {
          // Check if it's a nested child without parent prefix
          const isNestedChild = yamlNestedNames.some(n => n.endsWith('.' + srcName));
          if (!isNestedChild) {
            const srcCount = getSourcePresence(srcName, odFlat, dkFlat, testFlat);
            addDiff({
              apiName: ep.summary,
              path: ep.path, method: ep.method,
              layer: 'L2', diffType: 'param-missing',
              opendocVal: odFlat.has(srcName) ? 'present' : 'absent',
              dockingVal: dkFlat.has(srcName) ? 'present' : 'absent',
              testVal: testFlat.has(srcName) ? 'present' : 'absent',
              aiRec: srcCount >= 2 ? `ADD to yaml` : `VERIFY — single source`,
              confidence: srcCount >= 2 ? 4 : 2,
              testCovered: testFlat.has(srcName),
              severity: 'MAJOR',
              note: `source top-level param "${srcName}" not in yaml`,
            });
          }
        }
      }

      // Nested params (has dots)
      if (srcName.includes('.')) {
        if (!yamlNestedNames.includes(srcName)) {
          // Check if parent is a yaml top param
          const parentName = srcName.split('.')[0];
          if (yamlTopNames.has(parentName)) {
            const srcCount = getSourcePresence(srcName, odFlat, dkFlat, testFlat);
            addDiff({
              apiName: ep.summary,
              path: ep.path, method: ep.method,
              layer: 'L2', diffType: 'param-missing',
              opendocVal: odFlat.has(srcName) ? 'present' : 'absent',
              dockingVal: dkFlat.has(srcName) ? 'present' : 'absent',
              testVal: testFlat.has(srcName) ? 'present' : 'absent',
              aiRec: srcCount >= 2 ? `EXPAND yaml schema` : `VERIFY`,
              confidence: srcCount >= 2 ? 4 : 2,
              testCovered: testFlat.has(srcName),
              severity: 'MAJOR',
              note: `source nested param "${srcName}" not in yaml`,
            });
          }
        }
      }
    }

    // ── YAML nested params not in any source ────────────
    // (expected for undocumented fields)
    for (const yn of yamlNestedNames) {
      const odHas = odFlat.has(yn);
      // opendoc flatten may use different names due to rich text — try fuzzy match
      const odFuzzy = fuzzyMatchOpendoc(yn, odFlat);

      const dkHas = dkFlat.has(yn);
      const testHas = testFlat.has(yn);

      if (!odHas && !odFuzzy && !dkHas && !testHas) {
        // Only report if it's not a trivial sub-object that opendoc would have as container
        const yamlType = yamlInfo.nested[yn].type;
        if (yamlType === 'object') {
          // Container objects may not be explicitly listed in opendoc — check for children
          const hasChildInOpendoc = yamlNestedNames.some(cn => cn.startsWith(yn + '.') && (odFlat.has(cn) || fuzzyMatchOpendoc(cn, odFlat)));
          if (hasChildInOpendoc) continue; // parent exists via children
        }
        addDiff({
          apiName: ep.summary,
          path: ep.path, method: ep.method,
          layer: 'L2', diffType: 'param-extra',
          opendocVal: 'absent',
          dockingVal: 'absent',
          testVal: 'absent',
          aiRec: 'KEEP — yaml-only param, verify with PM',
          confidence: 2,
          testCovered,
          severity: 'MAJOR',
          note: `yaml nested param "${yn}" not in any source`,
        });
      }
    }
  }
}

// ── Helpers ─────────────────────────────────────────────
function getSourcePresence(name, odFlat, dkFlat, testFlat) {
  let c = 0;
  if (odFlat.has(name)) c++;
  if (dkFlat.has(name)) c++;
  if (testFlat.has(name)) c++;
  return c;
}

function fuzzyMatchOpendoc(yamlName, odFlat) {
  // Try matching with different name variations
  // e.g., "authorizeConfig.authorizedScopes" vs "authorizedScopes" (child under parent)
  const parts = yamlName.split('.');
  const lastName = parts[parts.length - 1];
  for (const [odName] of odFlat) {
    if (odName.endsWith('.' + lastName) || odName === lastName) return true;
  }
  return false;
}

// ── L4: errorCodes ──────────────────────────────────────
const yamlErrorCodes = {
  'POST /v3/psn-auth-url': ['1450001','1450002','1450003','1450004','1450005','1450901','1450903','1450904','1450905','1435203'],
  'POST /v3/org-auth-url': ['1450001','1450002','1450003','1450004','1450006','1450902','1450903','1450904','1450905','1435203'],
  'GET /v3/persons/identity-info': ['1450001','1450002','1450003','1450008','1435203'],
  'GET /v3/persons/{psnId}/authorized-info': ['1435203','1450910'],
  'GET /v3/organizations/identity-info': ['1450001','1450002','1450003','1450008','1435203'],
  'GET /v3/organizations/{orgId}/authorized-info': ['1435203','1450909'],
  'GET /v3/auth-flow/{authFlowId}': ['1450007','1435203'],
};

// Re-scan for error codes (need to re-iterate)
for (const ep of authEndpoints) {
  const key = normalizePath(ep.path) + '|' + ep.method;
  const methodKey = `${ep.method} ${ep.path}`;
  const sliceOpendoc = opendocIdx[key] || [];
  const sliceTest = testIdx[key] || [];
  const testCovered = sliceTest.length > 0;
  const yamlEC = yamlErrorCodes[methodKey] || [];

  for (const od of sliceOpendoc) {
    if (od.errorCodes && od.errorCodes.length > 0) {
      for (const ec of od.errorCodes) {
        if (!yamlEC.includes(String(ec.code))) {
          diffId++;
          diffs.push({
            id: diffId,
            apiName: ep.summary,
            path: ep.path, method: ep.method,
            layer: 'L4', diffType: 'errcode-missing',
            opendocVal: `code ${ec.code}: ${ec.message}`,
            dockingVal: 'n/a', testVal: 'n/a',
            aiRec: 'ADD to x-error-codes',
            confidence: 4, testCovered, severity: 'MINOR',
            note: `opendoc error code ${ec.code} not in yaml`,
          });
        }
      }
    }
  }
}

// ── Generate report ─────────────────────────────────────
const blockers = diffs.filter(d => d.severity === 'BLOCKER').length;
const majors = diffs.filter(d => d.severity === 'MAJOR').length;
const minors = diffs.filter(d => d.severity === 'MINOR').length;

const esc = (s) => (s || '').replace(/\|/g, '\\|');

let md = `# auth-api 差异报告\n\n`;
md += `> 生成时间: ${new Date().toISOString().split('T')[0]}\n\n`;
md += `| 模块 | yaml 路径 | endpoints | 差异行数 | BLOCKER | MAJOR | MINOR |\n`;
md += `|---|---|---|---|---|---|---|\n`;
md += `| auth-api | openapi/auth-api.yaml | ${authEndpoints.length} | ${diffs.length} | ${blockers} | ${majors} | ${minors} |\n\n`;

md += `## PM 决策说明\n\n`;
md += `- **A** = 采纳 AI 推荐\n- **K** = 保持 yaml 原状\n- **R** = 需实跑验证\n- **C:<value>** = 自定义值\n\n`;

md += `## 差异明细表\n\n`;
md += `| # | API名 | path | method | 层 | 差异类型 | opendoc值 | 对接Postman值 | 测试值 | AI推荐 | 置信度 | 测试覆盖 | 严重度 | PM决策 | 备注 |\n`;
md += `|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|\n`;

for (const d of diffs) {
  const stars = '★'.repeat(d.confidence) + '☆'.repeat(5 - d.confidence);
  md += `| ${d.id} | ${esc(d.apiName)} | ${d.path} | ${d.method} | ${d.layer} | ${d.diffType} | ${esc(d.opendocVal)} | ${esc(d.dockingVal)} | ${esc(d.testVal)} | ${esc(d.aiRec)} | ${stars} | ${d.testCovered ? '✅' : '❌'} | ${d.severity} | | ${esc(d.note)} |\n`;
}

if (diffs.length === 0) {
  md += `\n> 无差异。\n`;
}

const coveredCount = authEndpoints.filter(ep => {
  const k = normalizePath(ep.path) + '|' + ep.method;
  return (testIdx[k] || []).length > 0;
}).length;

md += `\n## 摘要\n\n`;
md += `- yaml endpoints: ${authEndpoints.length}\n`;
md += `- 总差异: ${diffs.length}\n`;
md += `- BLOCKER (L1 path/method): ${blockers}\n`;
md += `- MAJOR (L2 param / L3 required/type): ${majors}\n`;
md += `- MINOR (L4 errorCodes): ${minors}\n`;
md += `- 测试覆盖: ${coveredCount}/${authEndpoints.length}\n`;

// Per-endpoint summary
md += `\n## 各端点概览\n\n`;
for (const ep of authEndpoints) {
  const k = normalizePath(ep.path) + '|' + ep.method;
  const epDiffs = diffs.filter(d => d.path === ep.path && d.method === ep.method);
  const tc = (testIdx[k] || []).length > 0;
  md += `- \`${ep.method} ${ep.path}\` — ${ep.summary} | 差异 ${epDiffs.length} | 测试 ${tc ? '✅' : '❌'}\n`;
}

const outputFile = path.join(OUTPUT_DIR, 'auth-api-diff-report.md');
fs.writeFileSync(outputFile, md, 'utf-8');

console.log(`\n[phase-2] wrote → ${outputFile}`);
console.log(`  diffs: ${diffs.length} (BLOCKER=${blockers} MAJOR=${majors} MINOR=${minors})`);
console.log(`  test covered: ${coveredCount}/${authEndpoints.length}`);