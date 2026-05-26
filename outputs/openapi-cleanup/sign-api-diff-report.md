# sign-api 差异报告

> 生成时间: 2026-05-26
> 策略: 仅报告"2+源共识但某源缺失"的参数，忽略单源独有参数

| 模块 | yaml 路径 | endpoints | 差异行数 | BLOCKER | MAJOR | MINOR |
|---|---|---|---|---|---|---|
| sign-api | openapi/sign-api.yaml | 41 | 58 | 0 | 53 | 5 |

## PM 决策说明

- A = 采纳 AI 推荐
- K = 保持 yaml 原状
- R = 需实跑验证
- C:<value> = 自定义值

## 差异明细表

| # | API名 | path | method | 层 | 差异类型 | opendoc值 | 对接Postman值 | 测试值 | AI推荐 | 置信度 | 测试覆盖 | 严重度 | PM决策 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signFlowConfig.signFlowExpireTime" in 2 sources, missing from docking |
| 2 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signFlowConfig.noticeConfig.examineNotice" in 2 sources, missing from docking |
| 3 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signFlowConfig.identityVerify" in 2 sources, missing from docking |
| 4 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signFlowConfig.redirectConfig.redirectDelayTime" in 2 sources, missing from docking |
| 5 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signFlowConfig.signConfig.showBatchDropSealButton" in 2 sources, missing from docking |
| 6 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signFlowConfig.authConfig" in 2 sources, missing from docking |
| 7 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signFlowConfig.authConfig.willingnessAuthModes" in 2 sources, missing from docking |
| 8 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signFlowConfig.authConfig.orgAvailableAuthModes" in 2 sources, missing from docking |
| 9 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signFlowConfig.authConfig.audioVideoTemplateId" in 2 sources, missing from docking |
| 10 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signFlowConfig.authConfig.uneditableFields" in 2 sources, missing from docking |
| 11 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signFlowConfig.contractConfig" in 2 sources, missing from docking |
| 12 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signFlowConfig.contractConfig.contractSecrecy" in 2 sources, missing from docking |
| 13 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signFlowConfig.contractConfig.allowToRescind" in 2 sources, missing from docking |
| 14 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signFlowConfig.contractGroupIds" in 2 sources, missing from docking |
| 15 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "docs[].fileId" in 2 sources, missing from opendoc |
| 16 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "docs[].fileName" in 2 sources, missing from opendoc |
| 17 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signers[].signerType" in 2 sources, missing from opendoc |
| 18 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signers[].signFields" in 2 sources, missing from opendoc |
| 19 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signers[].signFields[].customBizNum" in 2 sources, missing from opendoc |
| 20 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signers[].signFields[].fileId" in 2 sources, missing from opendoc |
| 21 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signers[].signFields[].normalSignFieldConfig" in 2 sources, missing from opendoc |
| 22 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signers[].signFields[].normalSignFieldConfig.autoSign" in 2 sources, missing from opendoc |
| 23 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signers[].signFields[].normalSignFieldConfig.signFieldPosition" in 2 sources, missing from opendoc |
| 24 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signers[].signFields[].normalSignFieldConfig.signFieldPosition.positionPage" in 2 sources, missing from opendoc |
| 25 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signers[].signFields[].normalSignFieldConfig.signFieldPosition.positionX" in 2 sources, missing from opendoc |
| 26 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signers[].signFields[].normalSignFieldConfig.signFieldPosition.positionY" in 2 sources, missing from opendoc |
| 27 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signers[].signFields[].normalSignFieldConfig.signFieldStyle" in 2 sources, missing from opendoc |
| 28 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signers[].signConfig" in 2 sources, missing from opendoc |
| 29 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signers[].signConfig.signOrder" in 2 sources, missing from opendoc |
| 30 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signers[].psnSignerInfo" in 2 sources, missing from opendoc |
| 31 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signers[].psnSignerInfo.psnAccount" in 2 sources, missing from opendoc |
| 33 |  | /v3/sign-flow/create-by-file | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signers[].signFields[].signFieldType" in 2 sources, missing from opendoc |
| 34 |  | /v3/sign-flow/sign-flow-initiate-url/by-file | POST | L2 | param-missing | present | present | absent | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "initiatePageConfig.customBizNum" in 2 sources, missing from test |
| 35 |  | /v3/sign-flow/sign-flow-initiate-url/by-file | POST | L2 | param-missing | present | present | absent | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "initiatePageConfig.initiateButtons" in 2 sources, missing from test |
| 36 |  | /v3/sign-flow/sign-flow-initiate-url/by-file | POST | L2 | param-missing | present | present | absent | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "initiatePageConfig.redirectUrl" in 2 sources, missing from test |
| 37 |  | /v3/sign-flow/sign-flow-initiate-url/by-file | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "initiatePageConfig.uneditableFields" in 2 sources, missing from docking |
| 38 |  | /v3/sign-flow/sign-flow-initiate-url/by-file | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signFlowConfig.autoFinish" in 2 sources, missing from docking |
| 39 |  | /v3/sign-flow/sign-flow-initiate-url/by-file | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signFlowConfig.noticeConfig" in 2 sources, missing from docking |
| 40 |  | /v3/sign-flow/sign-flow-initiate-url/by-file | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signFlowConfig.noticeConfig.noticeTypes" in 2 sources, missing from docking |
| 41 |  | /v3/sign-flow/sign-flow-initiate-url/by-file | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signers" in 2 sources, missing from docking |
| 42 |  | /v3/sign-flow/sign-flow-initiate-url/by-file | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "docs[].fileId" in 2 sources, missing from opendoc |
| 43 |  | /v3/sign-flow/sign-flow-initiate-url/by-file | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "docs[].fileName" in 2 sources, missing from opendoc |
| 44 |  | /v3/files/{fileId}/keyword-positions | GET | L1 | ghost-endpoint | absent | absent | absent | VERIFY - 三源全无，考虑从 yaml 删除 | ★★★★★ | ❌ | MINOR | | yaml 有但三源全无 |
| 45 |  | /v3/sign-flow/{signFlowId}/sign-url | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | | "needLogin" in 2 sources, missing from docking |
| 46 |  | /v3/sign-flow/{signFlowId}/sign-url | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | | "urlType" in 2 sources, missing from docking |
| 47 |  | /v3/sign-flow/{signFlowId}/sign-url | POST | L2 | param-missing | present | absent | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | | "clientType" in 2 sources, missing from docking |
| 48 |  | /v3/sign-flow/sign-flow-list | POST | L2 | param-missing | present | present | absent | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | | "signFlowStatus" in 2 sources, missing from test |
| 49 |  | /v3/sign-flow/sign-flow-list | POST | L2 | param-missing | present | present | absent | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | | "operator.psnId" in 2 sources, missing from test |
| 50 |  | /v3/sign-flow/{signFlowId}/file-download-url | POST | L1 | ghost-endpoint | absent | absent | absent | VERIFY - 三源全无，考虑从 yaml 删除 | ★★★★★ | ❌ | MINOR | K | yaml 有但三源全无 |
| 51 |  | /v3/sign-flow/{signFlowId}/urge | POST | L2 | param-missing | present | present | absent | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "noticeTypes" in 2 sources, missing from test |
| 52 |  | /v3/sign-flow/{signFlowId}/urge | POST | L2 | param-missing | present | present | absent | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "urgedOperator" in 2 sources, missing from test |
| 53 |  | /v3/sign-flow/{signFlowId}/urge | POST | L2 | param-missing | present | present | absent | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "urgedOperator.psnAccount" in 2 sources, missing from test |
| 54 |  | /v3/sign-flow/{signFlowId}/delay | POST | L2 | param-missing | present | present | absent | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "signFlowExpireTime" in 2 sources, missing from test |
| 55 |  | /v3/sign-flow/{signFlowId}/revoke | POST | L1 | ghost-endpoint | absent | absent | absent | VERIFY - 三源全无，考虑从 yaml 删除 | ★★★★★ | ❌ | MINOR | K | yaml 有但三源全无 |
| 56 |  | /v3/files/verify-result | POST | L1 | ghost-endpoint | absent | absent | absent | VERIFY - 三源全无，考虑从 yaml 删除 | ★★★★★ | ❌ | MINOR | K | yaml 有但三源全无 |
| 57 |  | /v3/files/create-by-doc-template | POST | L2 | param-missing | absent | present | present | ADD to missing sources | ★★★★☆ | ✅ | MAJOR | A | "components[].componentValue" in 2 sources, missing from opendoc |
| 58 |  | /v3/files/merge-ofd-files | POST | L1 | ghost-endpoint | absent | absent | absent | VERIFY - 三源全无，考虑从 yaml 删除 | ★★★★★ | ❌ | MINOR | K | yaml 有但三源全无 |

## 摘要

- yaml endpoints: 41
- 总差异: 58
- 幽灵端点: 5
- 测试覆盖: 14/41

## 各端点概览

- `POST /v3/sign-flow/create-by-file` | od:2 dk:4 test:13 | 差异 33 | ✅
- `POST /v3/sign-flow/{signFlowId}/start` | od:1 dk:1 test:0 | 差异 0 | ❌
- `POST /v3/sign-flow/sign-flow-initiate-url/by-file` | od:1 dk:1 test:2 | 差异 10 | ✅
- `POST /v3/sign-flow/batch-sign-url` | od:0 dk:1 test:1 | 差异 0 | ✅
- `POST /v3/files/file-upload-url` | od:1 dk:1 test:3 | 差异 0 | ✅
- `GET /v3/files/{fileId}` | od:2 dk:2 test:6 | 差异 0 | ✅
- `POST /v3/sign-flow/{signFlowId}/unsigned-files` | od:1 dk:1 test:0 | 差异 0 | ❌
- `DELETE /v3/sign-flow/{signFlowId}/unsigned-files` | od:1 dk:1 test:0 | 差异 0 | ❌
- `POST /v3/sign-flow/{signFlowId}/attachments` | od:1 dk:1 test:0 | 差异 0 | ❌
- `DELETE /v3/sign-flow/{signFlowId}/attachments` | od:1 dk:1 test:0 | 差异 0 | ❌
- `POST /v3/files/{fileId}/keyword-positions` | od:0 dk:1 test:0 | 差异 0 | ❌
- `GET /v3/files/{fileId}/keyword-positions` | od:0 dk:0 test:0 | 差异 1 | ❌
- `POST /v3/sign-flow/{signFlowId}/signers/sign-fields` | od:1 dk:1 test:0 | 差异 0 | ❌
- `DELETE /v3/sign-flow/{signFlowId}/signers/sign-fields` | od:1 dk:1 test:0 | 差异 0 | ❌
- `POST /v3/files/get-seal-position-url` | od:0 dk:1 test:5 | 差异 0 | ✅
- `POST /v3/sign-flow/{signFlowId}/sign-url` | od:1 dk:1 test:9 | 差异 3 | ✅
- `POST /v3/approval/approval-url` | od:1 dk:1 test:0 | 差异 0 | ❌
- `GET /v3/sign-flow/{signFlowId}/detail` | od:1 dk:0 test:0 | 差异 0 | ❌
- `POST /v3/sign-flow/sign-flow-list` | od:1 dk:1 test:1 | 差异 2 | ✅
- `POST /v3/organizations/sign-flow-list` | od:1 dk:1 test:0 | 差异 0 | ❌
- `GET /v3/approval/{approvalFlowId}/detail` | od:1 dk:0 test:0 | 差异 0 | ❌
- `POST /v3/approval/approval-task-list` | od:1 dk:1 test:0 | 差异 0 | ❌
- `GET /v3/sign-flow/{signFlowId}/preview-file-download-url` | od:1 dk:1 test:0 | 差异 0 | ❌
- `POST /v3/sign-flow/{signFlowId}/file-download-url` | od:0 dk:0 test:0 | 差异 1 | ❌
- `GET /v3/sign-flow/{signFlowId}/file-download-url` | od:0 dk:1 test:0 | 差异 0 | ❌
- `GET /v3/files/{fileId}/detail` | od:1 dk:1 test:8 | 差异 0 | ✅
- `POST /v3/sign-flow/{signFlowId}/urge` | od:1 dk:1 test:1 | 差异 3 | ✅
- `POST /v3/sign-flow/{signFlowId}/delay` | od:1 dk:1 test:1 | 差异 1 | ✅
- `POST /v3/sign-flow/{signFlowId}/finish` | od:1 dk:0 test:0 | 差异 0 | ❌
- `POST /v3/sign-flow/{signFlowId}/revoke` | od:0 dk:0 test:0 | 差异 1 | ❌
- `POST /v3/evidence-report/apply` | od:1 dk:1 test:1 | 差异 0 | ✅
- `GET /v3/evidence-report/query` | od:1 dk:1 test:1 | 差异 0 | ✅
- `POST /v3/antchain-file-info` | od:0 dk:1 test:0 | 差异 0 | ❌
- `POST /v3/antchain-file-info/verify` | od:0 dk:1 test:0 | 差异 0 | ❌
- `POST /v3/files/{fileId}/verify` | od:0 dk:1 test:0 | 差异 0 | ❌
- `POST /v3/files/verify-result` | od:0 dk:0 test:0 | 差异 1 | ❌
- `POST /v3/sign-flow/{signFlowId}/initiate-rescission` | od:1 dk:1 test:0 | 差异 0 | ❌
- `POST /v3/sign-flow/{signFlowId}/rescission-url` | od:1 dk:1 test:0 | 差异 0 | ❌
- `POST /v3/files/create-by-doc-template` | od:1 dk:1 test:4 | 差异 1 | ✅
- `POST /v3/doc-templates/fill-task-result` | od:1 dk:1 test:0 | 差异 0 | ❌
- `POST /v3/files/merge-ofd-files` | od:0 dk:0 test:0 | 差异 1 | ❌
