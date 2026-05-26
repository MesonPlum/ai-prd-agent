# OpenAPI Cleanup CHANGELOG

> 基于 Phase 2 三源比对（opendoc / docking postman / test postman+apifox）的 yaml 规范清洗记录。
> 生成时间: 2026-05-26

## 概览

| 模块 | endpoints | 差异行数 | yaml 变更 | 变更状态 |
|---|---|---|---|---|
| auth-api | 7 | 4 | 1 处新增 | ✅ 已落地 |
| member-api | 9 | 0 | 无 | ✅ |
| seal-api | 28 | 4 | 6 处新增/标记 | ✅ 已落地 |
| file-template-api | 26 | 2 (幽灵端点) | 2 处删除 | ✅ 已落地 |
| sign-api | 41 | 58 (53 param-missing + 5 ghost) | 0 (yaml 已完整) | ✅ |
| **合计** | **111** | **68** | **9** | |

## auth-api — 变更

### `/v3/org-auth-url` POST — 新增参数

- **path**: `requestBody.content.application/json.schema.properties.changeOrgAdmin`
- **来源**: opendoc 和 docking 均有，测试无
- **内容**: `boolean`，默认 `false`
- **决策**: A（采纳 AI 推荐）
- **文件**: `openapi/auth-api.yaml`

## seal-api — 变更

### `OrgSealCreateUrlRequest` — 新增内部字段（标记"不对外"）

| 字段 | 类型 | 说明 |
|---|---|---|
| `sealSuffix` | string | 印章后缀（不对外，内部字段） |
| `sealHorizontalText` | string | 印章横排文字（不对外，内部字段） |
| `sealBottomText` | string | 印章底部文字（不对外，内部字段） |
| `sealOutsideSurroundText` | string | 印章外圈环绕文字（不对外，内部字段） |

### `InternalSealAuthRequest` — 新增参数

| 字段 | 类型 | 说明 |
|---|---|---|
| `customBizNum` | string | 自定义业务编号 |
| `autoSign` | boolean | 印章自动落章 |

### `ExternalSealAuthRequest` — 新增参数

| 字段 | 类型 | 说明 |
|---|---|---|
| `customBizNum` | string | 自定义业务编号 |
| `autoSign` | boolean | 印章自动落章（仅限授权全部企业成员且指定具体模板编号时使用） |

**文件**: `openapi/seal-api.yaml`

## file-template-api — 变更

### 删除幽灵端点

| endpoint | 原因 |
|---|---|
| `GET /v3/custom-component-group/detail` | yaml 有但三源全无 |
| `POST /v3/custom-component-group/add-component` | yaml 有但三源全无 |

**文件**: `openapi/file-template-api.yaml`

## sign-api — 无变更

- 53 条 param-missing 差异：经逐一验证，全部参数**已存在于** `openapi/sign-api.yaml`，差异来自 truth sources 覆盖不全
- 5 个 ghost endpoints（标记 K 保留）：
  - `GET /v3/files/{fileId}/keyword-positions`
  - `POST /v3/sign-flow/{signFlowId}/file-download-url`
  - `POST /v3/sign-flow/{signFlowId}/revoke`
  - `POST /v3/files/verify-result`
  - `POST /v3/files/merge-ofd-files`

## 策略说明

- **sign-api** 采用"多源共识"策略：只报告"2+ 源共识但某源缺失"的参数，忽略单源独有参数，避免噪声
- 其他模块采用标准比对策略：报告所有参数差异
