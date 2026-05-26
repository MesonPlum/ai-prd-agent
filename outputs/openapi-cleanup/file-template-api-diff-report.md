# file-template-api 差异报告

> 生成时间: 2026-05-26

| 模块 | yaml 路径 | endpoints | 差异行数 | BLOCKER | MAJOR | MINOR |
|---|---|---|---|---|---|---|
| file-template-api | openapi/file-template-api.yaml | 26 | 2 | 0 | 0 | 2 |

## PM 决策说明

- A = 采纳 AI 推荐
- K = 保持 yaml 原状
- R = 需实跑验证
- C:<value> = 自定义值

## 差异明细表

| # | API名 | path | method | 层 | 差异类型 | opendoc值 | 对接Postman值 | 测试值 | AI推荐 | 置信度 | 测试覆盖 | 严重度 | PM决策 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | /v3/custom-component-group/detail | /v3/custom-component-group/detail | GET | L1 | ghost-endpoint | absent | absent | absent | VERIFY - 三源全无，考虑从 yaml 删除 | ★★★★★ | ❌ | MINOR | | yaml 有但三源全无 |
| 2 | /v3/custom-component-group/add-component | /v3/custom-component-group/add-component | POST | L1 | ghost-endpoint | absent | absent | absent | VERIFY - 三源全无，考虑从 yaml 删除 | ★★★★★ | ❌ | MINOR | | yaml 有但三源全无 |

## 摘要

- yaml endpoints: 26
- 总差异: 2
- 幽灵端点: 2
- 测试覆盖: 17/26

## 各端点概览

- `POST /v3/sign-templates/sign-template-create-url` | od:1 dk:1 test:18 | ✅
- `POST /v3/sign-templates/enable` | od:1 dk:1 test:3 | ✅
- `POST /v3/sign-templates/disable` | od:1 dk:1 test:4 | ✅
- `POST /v3/sign-templates/{signTemplateId}/sign-template-edit-url` | od:1 dk:1 test:8 | ✅
- `GET /v3/sign-templates/detail` | od:1 dk:1 test:8 | ✅
- `GET /v3/sign-templates` | od:1 dk:1 test:7 | ✅
- `GET /v3/sign-templates/permission` | od:1 dk:1 test:2 | ✅
- `POST /v3/sign-templates/delete` | od:0 dk:1 test:4 | ✅
- `POST /v3/sign-templates/copy` | od:0 dk:1 test:5 | ✅
- `POST /v3/sign-flow/create-by-sign-template` | od:1 dk:1 test:48 | ✅
- `POST /v3/sign-flow/{signFlowId}/draft-url` | od:1 dk:1 test:8 | ✅
- `GET /v3/sign-flow/{signFlowId}/draft-detail` | od:1 dk:1 test:2 | ✅
- `POST /v3/sign-flow/list` | od:1 dk:1 test:3 | ✅
- `GET /v3/sign-flow/{signFlowId}/status` | od:1 dk:1 test:0 | ❌
- `POST /v3/sign-flow/{signFlowId}/rescind` | od:1 dk:1 test:0 | ❌
- `POST /v3/sign-flow/{signFlowId}/urge-filling` | od:1 dk:1 test:0 | ❌
- `POST /v3/custom-components/create` | od:1 dk:2 test:4 | ✅
- `POST /v3/custom-components/rename` | od:2 dk:2 test:0 | ❌
- `POST /v3/custom-components/delete` | od:2 dk:2 test:0 | ❌
- `POST /v3/custom-components/get-list` | od:2 dk:2 test:0 | ❌
- `POST /v3/custom-component-group/create` | od:2 dk:2 test:1 | ✅
- `POST /v3/custom-component-group/rename` | od:2 dk:2 test:1 | ✅
- `POST /v3/custom-component-group/delete` | od:2 dk:2 test:0 | ❌
- `POST /v3/custom-component-group/get-list` | od:2 dk:2 test:1 | ✅
- `GET /v3/custom-component-group/detail` | od:0 dk:0 test:0 | ❌
- `POST /v3/custom-component-group/add-component` | od:0 dk:0 test:0 | ❌
