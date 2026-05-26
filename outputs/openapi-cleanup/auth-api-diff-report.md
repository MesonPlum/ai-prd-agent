# auth-api 差异报告

> 生成时间: 2026-05-25

| 模块 | yaml 路径 | endpoints | 差异行数 | BLOCKER | MAJOR | MINOR |
|---|---|---|---|---|---|---|
| auth-api | openapi/auth-api.yaml | 7 | 4 | 0 | 4 | 0 |

## PM 决策说明

- **A** = 采纳 AI 推荐
- **K** = 保持 yaml 原状
- **R** = 需实跑验证
- **C:<value>** = 自定义值

## 差异明细表

| # | API名 | path | method | 层 | 差异类型 | opendoc值 | 对接Postman值 | 测试值 | AI推荐 | 置信度 | 测试覆盖 | 严重度 | PM决策 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 获取机构认证&授权页面链接 | /v3/org-auth-url | POST | L2 | param-missing | absent | absent | present | VERIFY — single source | ★★☆☆☆ | ✅ | MAJOR | | source top-level param "changeOrgAdmin" not in yaml |
| 2 | 获取机构认证&授权页面链接 | /v3/org-auth-url | POST | L2 | param-missing | absent | absent | present | VERIFY — single source | ★★☆☆☆ | ✅ | MAJOR | | source top-level param "noticeTypes" not in yaml |
| 3 | 获取机构认证&授权页面链接 | /v3/org-auth-url | POST | L2 | param-missing | absent | absent | present | VERIFY | ★★☆☆☆ | ✅ | MAJOR | | source nested param "orgAuthConfig.orgId1" not in yaml |
| 4 | 查询个人授权信息 | /v3/persons/{psnId}/authorized-info | GET | L3 | required-flip | required: false | — | — | required: true (yaml) | ★★★☆☆ | ❌ | MAJOR | | "psnId" required: yaml=true, opendoc=false |

## 摘要

- yaml endpoints: 7
- 总差异: 4
- BLOCKER (L1 path/method): 0
- MAJOR (L2 param / L3 required/type): 4
- MINOR (L4 errorCodes): 0
- 测试覆盖: 3/7

## 各端点概览

- `POST /v3/psn-auth-url` — 获取个人认证&授权页面链接 | 差异 0 | 测试 ✅
- `POST /v3/org-auth-url` — 获取机构认证&授权页面链接 | 差异 3 | 测试 ✅
- `GET /v3/persons/identity-info` — 查询个人认证信息 | 差异 0 | 测试 ❌
- `GET /v3/persons/{psnId}/authorized-info` — 查询个人授权信息 | 差异 1 | 测试 ❌
- `GET /v3/organizations/identity-info` — 查询机构认证信息 | 差异 0 | 测试 ✅
- `GET /v3/organizations/{orgId}/authorized-info` — 查询机构授权信息 | 差异 0 | 测试 ❌
- `GET /v3/auth-flow/{authFlowId}` — 查询认证授权流程详情 | 差异 0 | 测试 ❌
