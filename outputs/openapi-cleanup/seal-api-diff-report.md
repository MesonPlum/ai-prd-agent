# seal-api 差异报告（修正版）

> 生成时间: 2026-05-25
> **修正说明**: 经比对 yaml schema（InternalSealAuthRequest / ExternalSealAuthRequest），修正了 initial report 中因 yaml 手动提取遗漏导致的假阳性差异。

| 模块 | yaml 路径 | endpoints | 差异行数 | BLOCKER | MAJOR | MINOR |
|---|---|---|---|---|---|---|
| seal-api | openapi/seal-api.yaml | 28 | 4 | 0 | 4 | 0 |

## PM 决策说明

- **A** = 采纳 AI 推荐
- **K** = 保持 yaml 原状
- **R** = 需实跑验证
- **C:<value>** = 自定义值

## 差异明细表

| # | API名 | path | method | 层 | 差异类型 | opendoc值 | 对接Postman值 | 测试值 | AI推荐 | 置信度 | 测试覆盖 | 严重度 | PM决策 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 获取创建机构印章页面链接 | /v3/seals/org-seal-create-url | POST | L2 | param-missing | absent | absent | present | K — 单源不采纳 | ★★☆☆☆ | ✅ | MAJOR | | 测试独有 param `hiddenFields`，opendoc/docking 均无 |
| 2 | 内部成员印章授权 | /v3/seals/org-seals/internal-auth | POST | L2 | param-missing | present | absent | absent | A — 补充到 yaml | ★★★★☆ | ✅ | MAJOR | | opendoc 有 param `customBizNum`（非必填），yaml 的 InternalSealAuthRequest 缺少此字段 |
| 3 | 跨企业印章授权 | /v3/seals/org-seals/external-auth | POST | L2 | param-extra | absent | absent | absent | VERIFY | ★★☆☆☆ | ✅ | MAJOR | | yaml 有 param `autoSign` 但任何源均未使用，可能是遗漏导入 |
| 4 | 查询对外部企业授权详情 | /v3/seals/org-seals/external-auth | GET | L2 | param-missing | present | present | absent | A — 补充到 yaml | ★★★★☆ | ❌ | MAJOR | | yaml 定义了 `sealId` / `authorizedOrgId` 但 opendoc 未列出，docking 有示例 URL 含这两个参数 |

## 修正说明（已确认为非差异）

以下 initial report 中的条目经 yaml schema 交叉验证后确认为**假阳性**：

| 原# | 端点 | 原差异 | 修正原因 |
|---|---|---|---|
| 2-5 | org-seal-create-url | sealSuffix/sealHorizontalText/sealBottomText/sealOutsideSurroundText "不在任何源" | opendoc 有这些字段（sealSuffix/HorizontalText/BottomText/OutsideSurroundText），但初始脚本的 yaml 参数提取遗漏 |
| 6-7 | internal-auth POST | authConfirmMethod/appScheme "不在 yaml" | yaml 的 InternalSealAuthRequest 第650行有 authConfirmMethod，第662行有 appScheme |
| 8 | internal-auth POST | customBizNum "不在任何源" | opendoc 有 customBizNum（已修正为差异#2） |
| 9 | external-auth POST | ~~sealId~~ "不在 yaml" | ~~sealId~~ 是 opendoc 标注废弃字段的标记，yaml 对应 ExternalSealAuthRequest 第706行有 `sealId: deprecated: true` |
| 10-12 | external-auth POST | authorizedType/applicationsId/appScheme "不在 yaml" | yaml 的 ExternalSealAuthRequest 第728行有 authorizedType，第737行有 applicationsId，第742行有 appScheme |
| 13 | external-auth POST | sealId "不在 yaml" | yaml 有 `sealId: deprecated: true`（已废弃但仍定义） |
| 14-16 | external-auth POST | customBizNum/autoSign/sealAuthBizType "不在任何源" | customBizNum 在 yaml 但不在源（差异#3修正），autoSign 在 yaml 的 InternalSealAuthRequest 第630行但不适用于 ExternalSealAuthRequest，sealAuthBizType 不存在于 yaml schema |
| 17-18 | external-auth GET | orgId/sealAuthBizId "不在任何源" | docking URL 示例显示 `?orgId=xxx&authorizedOrgId=xxx`，yaml 有 orgId+sealId+authorizedOrgId+pageNum+pageSize，opendoc 无此接口文档 |

## 摘要

- yaml endpoints: 28
- 总差异: 4（过滤后）
- BLOCKER: 0
- MAJOR: 4
- MINOR: 0
- 测试覆盖: 18/28

## 各端点概览

| Endpoint | 差异 | 测试覆盖 |
|---|---|---|
| `POST /v3/seals/psn-seal-create-url` | 0 | ❌ |
| `POST /v3/seals/psn-seals-manage-url` | 0 | ✅ |
| `POST /v3/seals/psn-seals/create-by-template` | 0 | ❌ |
| `POST /v3/seals/psn-seals/create-by-image` | 0 | ❌ |
| `DELETE /v3/seals/psn-seal` | 0 | ✅ |
| `GET /v3/seals/psn-seal-info` | 0 | ❌ |
| `GET /v3/seals/psn-seal-list` | 0 | ❌ |
| `POST /v3/seals/psn-seals/set-default-seal` | 0 | ❌ |
| `POST /v3/seals/org-seal-create-url` | 1 | ✅ |
| `POST /v3/seals/legal-rep-seal-create-url` | 0 | ✅ |
| `POST /v3/seals/org-seals-manage-url` | 0 | ✅ |
| `POST /v3/seals/org-seals/create-by-template` | 0 | ✅ |
| `POST /v3/seals/org-seals/create-by-image` | 0 | ✅ |
| `DELETE /v3/seals/org-seal` | 0 | ✅ |
| `GET /v3/seals/org-seal-info` | 0 | ❌ |
| `GET /v3/seals/org-own-seal-list` | 0 | ✅ |
| `POST /v3/seals/org-seals/enable-seal` | 0 | ✅ |
| `POST /v3/seals/org-seals/disable-seal` | 0 | ✅ |
| `POST /v3/seals/org-seals/set-default-seal` | 0 | ✅ |
| `POST /v3/files/file-key` | 0 | ✅ |
| `POST /v3/seals/org-seals/internal-auth` | 1 | ✅ |
| `GET /v3/seals/org-seals/internal-auth` | 0 | ❌ |
| `POST /v3/seals/org-seals/external-auth` | 1 | ✅ |
| `GET /v3/seals/org-seals/external-auth` | 1 | ❌ |
| `POST /v3/seals/org-seals/reauthorization` | 0 | ✅ |
| `POST /v3/seals/org-seals/auth-delete` | 0 | ❌ |
| `GET /v3/seals/org-seals/authorization-sign-url` | 0 | ✅ |
| `GET /v3/seals/org-authorized-seal-list` | 0 | ✅ |