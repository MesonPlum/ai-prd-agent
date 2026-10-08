# F-004 国内站 OpenAPI × ePaaS 迁移 — M-1 产品需求范围

# F-004 国内站 OpenAPI × ePaaS 迁移 — M-1 产品需求范围

| 字段 | 值 |
| --- | --- |
| 文档 ID | F-004 |
| 标题 | 国内站 OpenAPI × ePaaS 迁移 — M-1 产品需求范围 |
| 状态 | draft |
| 创建日期 | 2026-06-02 |
| 作者 | — |
| 关联设计文档 | `openapi/docs/openapi-epaas-migration-design.md` |
| 关联接口规范 | `openapi/sign-api.yaml`、`openapi/auth-api.yaml`、`openapi/file-template-api.yaml` |
| 关联配置知识库 | `assets/appid-config.md` |

---

## 目录

1.  [背景与目标](#1-%E8%83%8C%E6%99%AF%E4%B8%8E%E7%9B%AE%E6%A0%87)
    
2.  [M-1 范围总览](#2-m-1-%E8%8C%83%E5%9B%B4%E6%80%BB%E8%A7%88)
    
3.  [全链路上线配套需求（C-1 ～ C-7）](#3-%E5%85%A8%E9%93%BE%E8%B7%AF%E4%B8%8A%E7%BA%BF%E9%85%8D%E5%A5%97%E9%9C%80%E6%B1%82c-1--c-7)
    
4.  [M-1 接口范围](#4-m-1-%E6%8E%A5%E5%8F%A3%E8%8C%83%E5%9B%B4)
    
    *   4.1 接口清单
        
    *   4.2 参数规格分级说明（L1 ～ L4）
        
    *   4.3 各接口参数范围（初步，待细化）
        
5.  [APPID 配置支持范围](#5-appid-%E9%85%8D%E7%BD%AE%E6%94%AF%E6%8C%81%E8%8C%83%E5%9B%B4)
    
    *   5.1 分类原则
        
    *   5.2 分类结果总览
        
    *   5.3 P0 配置（10 项）
        
    *   5.4 P1 配置（70 项）
        
    *   5.5 P2 配置（45 项）
        
    *   5.6 内部/不适用配置（15 项）
        
6.  [开放问题](#6-%E5%BC%80%E6%94%BE%E9%97%AE%E9%A2%98)
    

---

## 1. 背景与目标

### 1.1 背景

国内站 OpenAPI 当前运行在旧签署系统（pdf-sign3 域）上。ePaaS（电子签 PaaS 平台）已完成基础签署能力建设，需要将 OpenAPI 流量逐步迁移至 ePaaS，以统一平台架构、降低双系统维护成本。

迁移采用**灰度渐进策略**，分两个阶段：

*   **M-1（内测验证集）**：7 个核心 REST 接口 + 1 个 Webhook，覆盖简单双方签署的完整链路。在内部测试账号上完成端到端验证后，才对外开始灰度。
    
*   **M-2（外部灰度集）**：在 M-1 基础上追加后操作接口（撤销、催签、延期、列表查询），向选定客户灰度放量。
    

### 1.2 迁移约束（硬性）

> 来源：`openapi-epaas-migration-design.md`

*   V3 接口地址、请求/响应格式、错误码**必须与旧系统保持完全一致**；任何差异由 ePaaS 网关代理层吸收，客户代码零改动。
    
*   签署过程中（sign-url 已下发后）不得切换系统路由。
    
*   Webhook 回调的字段结构和枚举值必须与旧系统一致。
    

### 1.3 目标

本文档描述 **M-1 阶段**的产品需求范围，包含三个维度：

1.  全链路上线所需的配套工程能力（C-1 ～ C-7 兼容性验证）
    
2.  M-1 涉及的接口清单及参数支持范围
    
3.  APPID 配置在 M-1 阶段的支持范围与分类结论
    

---

## 2. M-1 范围总览

```plaintext
M-1 需求范围
├── 配套工程能力（C-1～C-7）      → § 3
│   ├── C-1 接口地址透传
│   ├── C-2 请求/响应格式兼容
│   ├── C-3 错误码映射
│   ├── C-4 认证鉴权透传
│   ├── C-5 文件服务依赖适配
│   ├── C-6 signFlowId 归属路由
│   └── C-7 Webhook 回调兼容
├── 接口范围（7 REST + 1 Webhook）→ § 4
│   ├── POST /v3/files/file-upload-url
│   ├── POST /v3/sign-flow/create-by-file
│   ├── POST /v3/sign-flow/{id}/start
│   ├── POST /v3/sign-flow/{id}/sign-url
│   ├── GET  /v3/sign-flow/{id}/detail
│   ├── POST /v3/sign-flow/{id}/finish
│   ├── POST /v3/sign-flow/{id}/file-download-url
│   └── Webhook: SIGN_FLOW_COMPLETE
└── APPID 配置支持范围             → § 5
    ├── P0（10 项）必须 M-1 支持
    ├── P1（70 项）灰度前必须支持
    ├── P2（45 项）灰度路由兜底可迭代
    └── 内部/不适用（15 项）不纳入
```

**与灰度系统的边界**：灰度系统（流量路由、配置感知、百分比控制、异常回切、归属路由等能力）是独立系统改造项目，不在本文档范围内。本文档只描述 ePaaS 签署服务侧需要具备的能力。

---

## 3. 全链路上线配套需求（C-1 ～ C-7）

M-1 上线前，需通过以下 7 项兼容性验证。每项均需在内部测试 APPID 上跑通，无差异后才能推进外部灰度。

### C-1：接口地址透传

*   ePaaS 网关代理层对外暴露与旧系统完全相同的 V3 路径（`/v3/sign-flow/*`、`/v3/files/*`）
    
*   客户现有的 Base URL 配置无需修改
    

### C-2：请求 / 响应格式兼容

*   请求体字段名、类型、必填规则与旧系统保持一致
    
*   响应体结构（`code`、`message`、`data` 层级）及各字段与旧系统保持一致
    
*   差异处由网关代理层做字段映射，不下沉到核心服务
    

### C-3：错误码映射

*   ePaaS 内部错误码必须映射为旧系统对外暴露的 V3 错误码
    
*   新增错误场景的错误码需对齐旧系统的错误码设计规范
    
*   需覆盖 M-1 接口的全量错误码；错误码资料来源已补充，逐接口映射表仍需研发按旧系统返回行为校验（见 § 6 开放问题）
    

#### C-3.1 错误码资料来源

> 来源：`D:\AI coding\esign\ai-prd-agent\assets\opendoc\pdf-sign3\nx6lc2cfnhk4qaxt-错误码与帮助文档.md`

M-1 错误码兼容性验证需同时参考以下旧系统开放文档：

| 类型 | 资料 | 用途 |
| --- | --- | --- |
| 文件和模板模块错误码 | [文件和模板模块相关错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/px5yvgqf9glbs7o6) | 覆盖 `POST /v3/files/file-upload-url` 及 create-by-file 中依赖文件服务的错误返回 |
| 合同签署模块错误码 | [合同签署模块相关错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy) | 覆盖签署流程创建、开启、签署链接、详情、完结、下载等签署链路错误返回 |

#### C-3.2 错误码兼容性要求

*   ePaaS 对外响应的 `code`、`message`、HTTP 状态语义、错误触发条件需与旧系统 V3 保持一致；不得将内部错误码直接暴露给开发者。
    
*   文件上传、文件下载、文件解析、文件类型/大小/MD5 校验等错误优先按文件和模板模块错误码映射。
    
*   signFlow 创建、开启、签署链接生成、流程详情、完结、签署完成回调等错误优先按合同签署模块错误码映射。
    
*   同一错误场景在旧系统中存在既有错误码时，ePaaS 必须复用旧错误码，不新增同义错误码。
    
*   ePaaS 新增但旧系统不存在的错误场景，需在对外前完成错误码评审，并确认是否由网关代理层降级为旧系统可识别的通用错误码。
    

#### C-3.3 帮助文档入口

以下帮助文档用于研发自测、QA 排查和灰度客户问题定位；不改变接口行为，但需作为 M-1 验证资料随 PRD 保留。

| 场景 | 帮助文档 |
| --- | --- |
| 开放平台应用管理、错误码查询、签署流程查询、实名测试数据、短信/邮件通知记录、回调推送日志查询 | [带你了解e签宝开放平台](https://qianxiaoxia.yuque.com/opendoc/helper/ge7uhn) |
| 401 报错排查 | [SaaS API接口报错401排查流程](https://qianxiaoxia.yuque.com/opendoc/helper/krgcgauz4akfivia) |
| 签署位置坐标计算 | [印章图片尺寸和坐标](https://qianxiaoxia.yuque.com/opendoc/helper/pqzqnf) |
| 文件 Content-MD5 计算 | [如何计算文件的Content-MD5值](https://qianxiaoxia.yuque.com/opendoc/helper/wdrh4b) |
| OSS 文件上传报错 | [文件上传常见报错及解决方法](https://qianxiaoxia.yuque.com/opendoc/helper/aw4g7hrxebahoq97) |
| 支持上传的文件类型 | [关于上传到e签宝服务端的文件类型描述](https://qianxiaoxia.yuque.com/opendoc/helper/wg8quq) |
| 用户侧签署操作流程 | [电子签名SaaS API用户签署操作手册](https://qianxiaoxia.yuque.com/opendoc/helper/toh8ph) |
| 沙箱实名测试企业 | [沙箱环境实名-测试企业使用](https://qianxiaoxia.yuque.com/opendoc/helper/df28tzmhi67ng32z) |
| 跨企业印章授权与自动签署 | [跨企业印章授权与自动签署流程](https://qianxiaoxia.yuque.com/opendoc/helper/ryllt4y4x6bemr7b) |
| 获取用户签署链接 | [获取用户签署链接（借助e签宝开放平台）](https://qianxiaoxia.yuque.com/opendoc/helper/ux4f5oahnk4gna3m) |
| 企业签署用印审批 | [企业签署用印审批的触发与流程](https://qianxiaoxia.yuque.com/opendoc/helper/qi453w) |
| 账号信息不一致 | [账号信息不一致解决方案](https://qianxiaoxia.yuque.com/opendoc/helper/grgbyrlppkt2dgnp) |
| 平台方企业 orgId 获取 | [平台方企业orgId获取方式](https://qianxiaoxia.yuque.com/opendoc/helper/wcs358yp0g1uwoq9) |
| 账号注销与重新注册 | [注销账号流程](https://qianxiaoxia.yuque.com/opendoc/helper/ykrqp5kcvi9hw370) |

### C-4：认证鉴权透传

*   旧系统的 AppID + AppSecret 签名鉴权方案在 ePaaS 入口继续生效
    
*   鉴权由网关/代理层处理，ePaaS 核心服务不感知鉴权细节
    
*   依赖服务：auth3（认证授权服务）接口调用路径不变
    

### C-5：文件服务依赖适配

*   `POST /v3/files/file-upload-url` 和 `GET /v3/files/{fileId}` 实际由 **file-and-template3** 服务（旧文件服务）提供
    
*   ePaaS 签署服务在 create-by-file 流程中调用旧文件服务完成文件信息获取
    
*   需确认：ePaaS 内网调用旧文件服务的连通性及响应字段兼容性（见 § 6）
    

### C-6：signFlowId 归属路由

*   后操作接口（撤销、催签等，M-2 范围）不携带 APPID，需按 signFlowId 判断归属（旧系统创建的还是 ePaaS 创建的）
    
*   M-1 阶段仅包含创建-签署-归档正向链路，signFlowId 由 ePaaS 创建，归属明确
    
*   **M-1 不强依赖此项能力**，但 M-2 上线前必须就绪
    

### C-7：Webhook 回调兼容

*   `SIGN_FLOW_COMPLETE` 回调的字段结构、枚举值、推送时机与旧系统一致
    
*   必需字段：`action`、`timestamp`、`signFlowId`、`signFlowTitle`、`signFlowStatus`（2/3/5/7）、`statusDescription`、`signFlowCreateTime`、`signFlowStartTime`、`signFlowFinishTime`
    
*   客户侧回调地址配置逻辑不变
    

---
---

## 4. M-1 接口范围

### 4.1 接口清单

| # | 方法 | 路径 | 用途 | 类型 |
| --- | --- | --- | --- | --- |
| 1 | POST | `/v3/files/file-upload-url` | 获取文件上传 URL | REST |
| 2 | POST | `/v3/sign-flow/create-by-file` | 创建签署流程（含参与方） | REST |
| 3 | POST | `/v3/sign-flow/{signFlowId}/start` | 启动流程（autoStart=false 时调用） | REST |
| 4 | POST | `/v3/sign-flow/{signFlowId}/sign-url` | 获取签署 URL | REST |
| 5 | GET | `/v3/sign-flow/{signFlowId}/detail` | 查询流程详情 | REST |
| 6 | POST | `/v3/sign-flow/{signFlowId}/finish` | 完结流程（autoFinish=false 时调用） | REST |
| 7 | POST | `/v3/sign-flow/{signFlowId}/file-download-url` | 获取已签文件下载 URL | REST |
| 8 | — | `SIGN_FLOW_COMPLETE` | 流程状态变更回调 | Webhook |

> **M-2 接口（不在 M-1 范围）**：撤销 `/revoke`、催签 `/urge`、延期 `/delay`、流程列表 `/sign-flow-list`、企业流程列表 `/organizations/sign-flow-list`、预览文件下载 `/preview-file-download-url`

### 4.2 参数规格分级说明（L1 ～ L4）

M-1 仅要求通过 **L1（简单双方签署）** 规格的端到端验证。L2 ～ L4 为后续迭代目标。

| 规格级别 | 覆盖场景 | M-1 要求 |
| --- | --- | --- |
| **L1** | 简单双方签署：无审批流、无解约、非批量、标准签名域 | **必须支持** |
| L2 | 在 L1 基础上：addSigners（追加签署方）、transferSign（转交签署） | M-2 迭代 |
| L3 | 在 L2 基础上：approvalInfo（合同审批流） | 后续迭代 |
| L4 | 在 L3 基础上：batchSign（批量签署）、rescissionInfo（解约） | 后续迭代 |

**L1 核心约束**：

*   签署方：1 ～ 2 个（发起方 + 签署方，或纯签署方）
    
*   文件：单份合同文件，无附件
    
*   签名域：指定位置签署，标准印章
    
*   认证：支持短信验证码 / 免认证（L1 最简路径）
    
*   流程控制：`autoStart=true`（可选 false + 手动 start）、`autoFinish=true`（可选 false + 手动 finish）
    

### 4.3 各接口参数范围（初步，待细化）

> **说明**：以下为基于 `sign-api.yaml` 初步整理的参数分级，L1 必须支持的参数已标注。详细的参数逐字段分级（含 L2/L3/L4 排除标注）待下一步补充。

#### 接口 1：POST `/v3/files/file-upload-url`

获取文件上传预签名 URL，由旧文件服务（file-and-template3）提供，ePaaS 签署服务依赖调用。

**L1 必须支持参数**：

| 参数 | 位置 | 类型 | 必填 | L1 要求 |
| --- | --- | --- | --- | --- |
| `contentMd5` | body | string | 是 | 必须支持 |
| `contentType` | body | string | 是 | 必须支持 |
| `fileName` | body | string | 是 | 必须支持 |
| `fileSize` | body | long | 是 | 必须支持 |
| `convertToPDF` | body | boolean | 否 | 必须支持（Word 文件需转 PDF） |
| `convertToHTML` | body | boolean | 否 | 暂可不支持 |
| `convertToOFD` | body | boolean | 否 | 暂可不支持 |
| `dedicatedCloudId` | body | string | 否 | 暂可不支持（专属云） |

> **兼容性说明**：此接口实际由旧文件服务处理，ePaaS 网关代理层转发。需验证 ePaaS 调用旧文件服务的连通性及响应字段兼容。

---

#### 接口 2：POST `/v3/sign-flow/create-by-file`

创建签署流程（含参与方、签名域配置），是 M-1 最复杂的接口。以下为基于 `sign-api.yaml` 整理的逐字段 L1/L2/L3/L4 分级。

**顶层字段**

| 字段 | 类型 | L 级别 | 说明 |
| --- | --- | --- | --- |
| `docs` | array | **L1** | 文件列表（L1 限 1 份） |
| `signers` | array | **L1** | 签署方列表（L1 限 1 ～ 2 个） |
| `signFlowConfig` | object | **L1** | 流程配置（嵌套，见下） |
| `signFlowInitiator` | object | **L1** | 发起方信息（可选） |
| `copiers` | array | L2+ | 抄送方，L1 不要求 |

**signFlowConfig（SignFlowConfigRequest）**

| 字段 | 类型 | L 级别 | 说明 |
| --- | --- | --- | --- |
| `signFlowTitle` | string | **L1** | 流程标题，必填 |
| `signFlowExpireTime` | string | **L1** | 签署截止时间 |
| `autoStart` | boolean | **L1** | 自动启动，默认 true |
| `autoFinish` | boolean | **L1** | 自动归档，默认 true |
| `identityVerify` | boolean | **L1** | 是否校验签署方身份 |
| `notifyUrl` | string | **L1** | Webhook 回调地址 |
| `redirectConfig` | object | **L1** | 签署完成跳转配置 |
| `signConfig` | object | **L1** | 流程级签署配置（嵌套，见下） |
| `noticeConfig` | object | **L1** | 通知配置（嵌套，见下） |
| `authConfig` | object | **L1** | 认证配置（嵌套，见下） |
| `contractConfig` | object | **L1** | 合同配置（嵌套，见下） |
| `docsViewLimited` | boolean | **L1** | 是否限制文件预览 |
| `contractGroupIds` | array | **L2+** | 合同组 ID，非空触发 L2 检测 |

**signFlowConfig.signConfig（FlowSignConfig）**

| 字段 | 类型 | L 级别 | 说明 |
| --- | --- | --- | --- |
| `availableSignClientTypes` | array | **L1** | 允许的签署客户端类型 |
| `showBatchDropSealButton` | boolean | **L1** | 是否展示批量落章按钮 |
| `signTipsTitle` | string | **L1** | 签署提示标题 |
| `signTipsContent` | string | **L1** | 签署提示内容 |
| `signMode` | string | L1(`NORMAL`) / L2(`GLOBAL`) | `GLOBAL` 触发 L2 检测 |
| `dedicatedCloudId` | string | **L2+** | 专属云 ID，非空触发 L2 |
| `signType` | string | L1(null) / L2(`FDAType`) | `FDAType`\=FDA 签名样式，触发 L2 检测；默认空值为 L1 |
| `fdaLanguageMode` | string | L1(`CHINESE`) / L2(`ENGLISH`) | `ENGLISH` 触发 L2 检测；仅在 signType=FDAType 时生效 |
| `fdaSigningReason` | string | **L2+** | FDA 签署原因；仅在 signType=FDAType 时生效，非空触发 L2 |

**signFlowConfig.noticeConfig（NoticeConfig）**

| 字段 | 类型 | L 级别 | 说明 |
| --- | --- | --- | --- |
| `noticeTypes` | array<string> | **L1（全值域）** | 1-短信/2-邮件/3-钉钉/5-微信/6-企微/7-飞书，通知服务已兼容 |
| `examineNotice` | boolean | **L1** | 审批结果通知 |

**signFlowConfig.authConfig（AuthConfig）**

| 字段 | 类型 | L 级别 | 说明 |
| --- | --- | --- | --- |
| `willingnessAuthModes` | array | L1 / L2 / L3 | 枚举分级见下表 |
| `psnAvailableAuthModes` | array | **L2+** | 非空触发 L2 |
| `psnAuthAdvancedEnabled` | boolean | **L2+** | 非空/非 false 触发 L2 |
| `orgAvailableAuthModes` | array | **L2+** | 非空触发 L2 |
| `globalWillingness` | boolean | N/A (L2 前置) | 仅 signMode=GLOBAL 时有效，GLOBAL 已触发 L2 |
| `globalAuthModes` | string | N/A (L2 前置) | 仅 signMode=GLOBAL 时有效 |
| `globalAccessCode` | string | N/A (L2 前置) | 仅 signMode=GLOBAL 时有效 |
| `audioVideoTemplateId` | string | **L3+** | 非空触发 L3 |
| `audioVideoActiveField` | string | **L3+** | 非空触发 L3 |
| `uneditableFields` | array | **L2+** | 非空触发 L2 |

`**willingnessAuthModes**` **枚举分级**

| 枚举值 | 含义 | L 级别 |
| --- | --- | --- |
| `CODE_SMS` | 短信验证码 | **L1** |
| `SIGN_PWD` | 签署密码 | **L1** |
| `PSN_FACE_ALIPAY` | 支付宝人脸识别 | L2 |
| `PSN_FACE_ESIGN` | e签宝人脸识别 | L2 |
| `PSN_FACE_WECHAT` | 微信人脸识别 | L2 |
| `PSN_FACE_TECENT` | 腾讯人脸识别 | L2 |
| `PSN_MOBILE_FACE_AUTH` | 移动端人脸认证 | L2 |
| `PSN_AUDIO_VIDEO_ESIGN` | e签宝音视频核身 | L3 |
| `PSN_AUDIO_VIDEO_ALIPAY` | 支付宝音视频核身 | L3 |
| `PSN_AUDIO_VIDEO_WECHAT` | 微信音视频核身 | L3 |

**signFlowConfig.contractConfig（ContractConfig）**

| 字段 | 类型 | L 级别 | 说明 |
| --- | --- | --- | --- |
| `contractSecrecy` | int | **L1** | 1=不保密（默认），2=全部保密 |
| `allowToRescind` | boolean | **L1** | 是否允许发起解约，**默认 true**；解约操作是独立接口（M-2），由灰度归属路由按 signFlowId 判断，无需请求体检测 |
| `contractExpirationDate` | string | **L1** | 合同有效期 |

**signFlowInitiator（SignFlowInitiatorRequest）**

| 字段 | 类型 | L 级别 | 说明 |
| --- | --- | --- | --- |
| `orgInitiator.orgId` | string | **L1** | 企业发起方 ID |
| `orgInitiator.transactor.psnId` | string | **L1** | 经办人 ID |
| `psnInitiator.psnId` | string | **L1** | 个人发起方 ID |
| `initialRemarks` | string | **L1** | 发起备注 |

**docs\[ \]（DocFile）**

| 字段 | 类型 | L 级别 | 说明 |
| --- | --- | --- | --- |
| `fileId` | string | **L1** | 文件 ID（必填，来自 file-upload-url 响应） |
| `fileName` | string | **L1** | 文件展示名称 |
| `neededPwd` | boolean | **L1** | 是否需要输入 PDF 密码 |
| `fileEditPwd` | string | **L1** | PDF 编辑密码 |
| `contractBizTypeId` | string | **L1** | 合同业务类型 ID |
| `order` | integer | **L1** | 文件顺序 |

| `signFields[ ]` | array | **L1** | 签名域配置（必填，指定签署位置） |

**signers\[ \]（Signer 顶层）**

| 字段 | 类型 | L 级别 | 说明 |
| --- | --- | --- | --- |
| `signerType` | integer | L1(0/1/3) / L2(2) | 0-个人 / 1-企业 / 3-经办人 = L1；2-法定代表人 = L2 |
| `signerRole` | string | **L1** | 签署方角色标识 |
| `orgSignerInfo` | object | **L1** | 企业签署方信息 |
| `psnSignerInfo` | object | **L1** | 个人签署方信息 |

| `signFields[ ]` | array | **L1** | 签名域（可在 signer 或 doc 层指定） |

| _(追加签署方)_ | — | **L2+** | 通过独立接口「追加签署区」实现，不在 create-by-file 参数内 | | _(转交签署)_ | — | **L2+** | 独立接口，不在 create-by-file 参数内 | | _(审批流)_ | — | **L3+** | 独立接口，不在 create-by-file 参数内 | | _(批量签署)_ | — | **L4+** | 独立接口或独立流程模式，不在 create-by-file 参数内 |

**signers\[ \].signConfig（SignerSignConfig）**

| 字段 | 类型 | L 级别 | 说明 |
| --- | --- | --- | --- |
| `signOrder` | integer | **L1** | 签署顺序 |
| `forcedReadingTime` | integer | **L1** | 强制阅读时间（秒） |
| `fileForcedReadingTime` | integer | **L1** | 按文件强制阅读时间 |
| `agreeSkipWillingness` | boolean | **L1** | 协议授权跳过意愿认证 |
| `signTaskType` | integer | **L1** | 0-会签 / 1-或签 |
| `signTipsTitle` | string | **L1** | 签署提示标题 |
| `signTipsContent` | string | **L1** | 签署提示内容 |
| `signTipsFileId` | string | **L1** | 签署提示文件 ID |
| `uploadFiles` | array | **L2+** | 需上传附件列表，非空触发 L2 |
| `docsViewType` | integer | L1(1) / L2(2) | `2` 触发 L2 检测 |
| `viewableFileIds` | array | **L2+** | 可见文件列表，非空触发 L2 |

**signers\[ \].authConfig / signers\[ \].noticeConfig**

规则与 `signFlowConfig.authConfig` / `signFlowConfig.noticeConfig` 一致（签署方级别覆盖），适用同一 L 级别判定。

---

**灰度路由请求体参数检测规则（L2/L3/L4 触发条件）**

> 灰度路由系统在 APPID 配置检测基础上，额外支持请求体参数值检测。以下任一条件命中时，整体请求路由回旧系统。

| 检测字段 | 触发值 | 路由级别 |
| --- | --- | --- |
| `signFlowConfig.contractGroupIds` | 数组非空 | L2，→ 旧系统 |
| `signFlowConfig.signConfig.signMode` | `GLOBAL` | L2，→ 旧系统 |
| `signFlowConfig.signConfig.dedicatedCloudId` | 非空字符串 | L2，→ 旧系统 |
| `signFlowConfig.signConfig.fdaLanguageMode` | `ENGLISH` | L2，→ 旧系统 |
| `signFlowConfig.signConfig.signType` | `FDAType` | L2，→ 旧系统 |
| `signFlowConfig.signConfig.fdaSigningReason` | 非空字符串 | L2，→ 旧系统 |
| `signFlowConfig.authConfig.willingnessAuthModes` | 包含 `PSN_FACE_*` 或 `PSN_MOBILE_FACE_AUTH` | L2，→ 旧系统 |
| `signFlowConfig.authConfig.willingnessAuthModes` | 包含 `PSN_AUDIO_VIDEO_*` | L3，→ 旧系统 |
| `signFlowConfig.authConfig.psnAvailableAuthModes` | 数组非空 | L2，→ 旧系统 |
| `signFlowConfig.authConfig.orgAvailableAuthModes` | 数组非空 | L2，→ 旧系统 |
| `signFlowConfig.authConfig.psnAuthAdvancedEnabled` | 非空/非 false | L2，→ 旧系统 |
| `signFlowConfig.authConfig.audioVideoTemplateId` | 非空字符串 | L3，→ 旧系统 |
| `signFlowConfig.authConfig.audioVideoActiveField` | 非空字符串 | L3，→ 旧系统 |
| `signFlowConfig.authConfig.uneditableFields` | 数组非空 | L2，→ 旧系统 |
| `signFlowConfig.contractConfig.allowToRescind` | _(独立接口，M-2，灰度归属路由)_ | _非请求体检测_ |

| `signers[ ].signerType`（任一元素） | `2`（法定代表人） | L2，→ 旧系统 |

| `signers[ ].signConfig.uploadFiles` | 数组非空 | L2，→ 旧系统 |

| `signers[ ].signConfig.docsViewType` | `2` | L2，→ 旧系统 |

| `signers[ ].signConfig.viewableFileIds` | 数组非空 | L2，→ 旧系统 |

**待确认项**（不影响 L1 通路验证）：

*   `addSigners` / `transferSign` / `approvalInfo` / `batchSign`：均为独立接口实现，不在 create-by-file 请求体内，对应接口路径待内部规范确认
    

---

#### 接口 3：POST `/v3/sign-flow/{signFlowId}/start`

启动流程，仅在 `autoStart=false` 时调用。参数只有路径参数 `signFlowId`，无 body。

L1 要求：完整支持。

---

#### 接口 4：POST `/v3/sign-flow/{signFlowId}/sign-url`

获取签署 URL，供客户跳转至 ePaaS 签署页。

**L1 必须支持参数**：

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `signFlowId` | path | 是 | — |
| `operator` | object | 是 | 操作方信息 |
| `operator.psnAccount` | string | 条件必填 | 与 psnId 二选一 |
| `operator.psnId` | string | 条件必填 | 与 psnAccount 二选一 |
| `needLogin` | boolean | 否 | 是否需要登录 |
| `urlType` | string | 否 | URL 类型（H5/PC） |
| `redirectConfig` | object | 否 | 签署完成后跳转配置 |
| `clientType` | string | 否 | 客户端类型 |

**L1 暂不支持**：

| 参数 | 排除原因 |
| --- | --- |
| `organization` | 企业代签场景，L1 外 |
| `appScheme` | App 跳转专用，L1 外 |

---

#### 接口 5：GET `/v3/sign-flow/{signFlowId}/detail`

查询流程详情，路径参数 `signFlowId`，无 body。

**响应关键字段（L1 必须返回）**：

| 字段 | 说明 |
| --- | --- |
| `signFlowStatus` | 流程状态（1 草稿/2 签署中/3 已完成/5 已撤销/7 已过期） |
| `signers` | 签署方列表及各方签署状态 |
| `docs` | 文件列表 |

L1 要求：完整支持所有响应字段，字段缺失视为兼容性缺口。

---

#### 接口 6：POST `/v3/sign-flow/{signFlowId}/finish`

完结流程，仅在 `autoFinish=false` 时调用。路径参数 `signFlowId`，无 body。

L1 要求：完整支持。

---

#### 接口 7：POST `/v3/sign-flow/{signFlowId}/file-download-url`

获取已签文件下载 URL，归档完成后可调用。

**L1 必须支持参数**：

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `signFlowId` | path | 是 | — |
| `urlAvailableDate` | string | 否 | URL 有效期（默认 1 天） |

**L1 暂不支持**：

| 参数 | 排除原因 |
| --- | --- |
| `internalUrl` | 内部下载，非对外场景 |
| `aesEncrypt` / `rsaSecret` / `rsaSecretKey` | 加密下载，L1 外 |

---

#### 接口 8：Webhook `SIGN_FLOW_COMPLETE`

流程状态变更时由 ePaaS 主动推送。

**L1 必须包含字段**：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `action` | string | 固定值 `SIGN_FLOW_COMPLETE` |
| `timestamp` | long | 推送时间戳（毫秒） |
| `signFlowId` | string | 流程 ID |
| `signFlowTitle` | string | 流程标题 |
| `signFlowStatus` | int | 2 签署中 / 3 完成 / 5 撤销 / 7 过期 |
| `statusDescription` | string | 状态描述 |
| `signFlowCreateTime` | string | 创建时间 |
| `signFlowStartTime` | string | 启动时间 |
| `signFlowFinishTime` | string | 完成/结束时间 |

---

## 5. APPID 配置支持范围

### 5.1 分类原则

ePaaS 签署服务迁移阶段，需对 APPID 配置的支持范围做优先级分级。分级依据如下：

#### 分类维度一：配置读取时机

| 时机 | 说明 | 对迁移的影响 |
| --- | --- | --- |
| **签署页加载 / 签署执行时** | 签署 URL 下发后，用户打开签署页时读取；或在签署提交前实时生效 | 无灰度路由兜底，ePaaS **必须原生支持** |
| **流程创建 / 发起时** | `create-by-file` / `start` 调用时读取，用于参数校验或行为控制 | 灰度路由可检测不支持的配置，**自动回旧系统** |
| **归档 / 通知 / 文件处理时** | 流程完成后的存证、计费、文件生成等 | 同上，灰度路由可兜底 |

#### 分类维度二：用户可修改性（对外展示）

APPID 配置系统中标记 `对外展示=是` 的配置项，客户可通过运营平台或接口自行调整，需优先保证支持，避免客户感知异常。

#### 三级分类结论

| 优先级 | 判定标准 | 迁移策略 |
| --- | --- | --- |
| **P0** | `对外展示=是`（客户可自改）+ 签署页直接使用 | M-1 阶段必须支持，无法妥协 |
| **P1** | 签署页加载 / 签署执行时读取 | 灰度放量前（M-2 前）必须全部支持，灰度路由无法兜底 |
| **P2** | 仅在流程创建时 / 归档时 / 通知时读取 | 灰度路由可检测并回旧系统，可按优先级迭代支持 |
| **内部/不适用** | 内部计费配置、天印专用、V1 接口专用、海外版 | 不纳入 ePaaS 签署服务实现范围 |

#### 关键说明：灰度路由配置感知能力的覆盖边界

灰度路由系统的配置感知能力：流量进入灰度路由时，读取该 APPID 的配置集合，与 ePaaS 已支持的配置集合对比。**若 APPID 存在 ePaaS 不支持的 P2 配置（值为非默认值），则整体路由回旧系统**。

灰度路由覆盖的配置范围：仅限 **P2** 配置。P1 配置在签署 URL 下发后才读取，此时流量路由已完成，无法再切换系统，因此 P1 必须由 ePaaS 原生支持。

---

### 5.2 分类结果总览

| 分类 | 数量 | 迁移策略 |
| --- | --- | --- |
| P0（用户可配，必须支持） | 10 | M-1 阶段必须支持 |
| P1（签署执行时读取，必须支持） | 70 | 灰度放量前必须全部支持 |
| P2（发起时/归档时，灰度路由可兜底） | 45 | 按优先级迭代，灰度路由兜底过渡 |
| 内部/不适用 | 15 | 不纳入实现范围 |
| **合计（签署服务）** | **140** | — |

---

### 5.3 P0 配置（10 项）

> 客户可通过运营平台自行修改，签署页直接使用，M-1 必须支持。

| id | code | 名称 | 配置类别 |
| --- | --- | --- | --- |
| 5314 | `propOpenColor` | 签署页/签署按钮颜色 | 页面样式 |
| 5315 | `propOpenLogo` | 签署页 logo | 页面样式 |
| 5573 | `oneClick` | 一键落章类型 | 签署行为 |
| 5729 | `countdown` | 签署页提交按钮倒计时 | 签署行为 |
| 5750 | `showBlockChainLogo` | 签署完成 logo 是否展示 | 结果页样式 |
| 5802 | `realNameBeforeSignpage` | 签署页前先展示实名页 | 签署行为 |
| 5807 | `forceRead` | 是否强制阅读到底部 | 签署行为 |
| 5816 | `showTransferButton` | 是否显示手动转交按钮 | 签署行为 |
| 5969 | `showInitiatorName` | 是否展示合同发起方姓名 | 签署页显示 |
| 5998 | `signSchemeButtonColor` | 签署按钮主题色 | 页面样式 |

---

### 5.4 P1 配置（70 项）

> 签署页加载 / 签署执行时读取，灰度放量前（M-2 前）必须全部支持，灰度路由无法兜底。

| id | code | 名称 | 读取时机 |
| --- | --- | --- | --- |
| 5422 | `propSealPreview` | 预览印章是否带水印 | 签署页印章列表加载时 |
| 5532 | `propOpenAboutButton` | 签署页功能按钮配置 | 签署页加载（auth.ts mixin） |
| 5554 | `showSignButton` | 签署预览页功能按钮 | 签署预览页加载 |
| 5555 | `signRemind` | 签署法律风险提示文案 | 签署页显示 |
| 5568 | `propOpenResultButton` | 签署审批结果页功能按钮 | 结果页加载 |
| 5630 | `noAccessShowBackButton` | 无权访问页"返回"按钮 | 无权访问页加载 |
| 5631 | `fullSignerInfoShowConfirmPage` | 身份信息确认页（信息完整时） | 签署页入口 |
| 5632 | `lackSignerInfoShowConfirmPage` | 身份信息补全页 | 签署页入口 |
| 5633 | `showAssignedSignerInfo` | 身份确认页是否展示发起方指定信息 | 签署页入口 |
| 5634 | `otherSceneShowConfirmPage` | 身份信息确认页（其他场景） | 签署页入口 |
| 5648 | `sealUseAccessCheckSwitch` | 企业用印权限校验 | 签署时用印审批触发 |
| 5649 | `propWillingnessSwitch` | 是否需要意愿认证 | 流程发起时读取并落库快照（签署页执行时取快照值，不受后续 APPID 变更影响） |
| 5665 | `defaultSealStamp` | 指定位置未指定印章 ID 时自动落章 | 签署页进入时 |
| 5681 | `batchDropSeal` | 一键批量落章是否默认勾选 | 签署页加载 |
| 5684 | `propOpenHandDrawnColor` | 手绘颜色配置 | 签署页手绘弹窗 |
| 5694 | `propOpenHandDrawnWay` | 手写板方式 | 签署页手绘弹窗 |
| 5724 | `defaultPlatform` | 签署平台默认项（H5/支付宝） | 签署入口路由 |
| 5728 | `topBarColor` | 签署页顶栏颜色 | 签署页加载 |
| 5735 | `coerciveWill` | 强制意愿是否开启 | 签署页意愿认证前置 |
| 5737 | `signPageTipsImg` | 签署风险提示页图片 | 签署页加载 |
| 5738 | `signPageTipsBgcolor` | 签署风险提示框颜色 | 签署页加载 |
| 5739 | `signPageTipsButtoncolor` | 意愿认证按钮颜色 | 签署页加载 |
| 5740 | `blockChainLogo` | 区块链标识（签署完成页） | 结果页加载 |
| 5748 | `showBlockChainText` | 页面标题是否显示区块链 | 签署页加载 |
| 5749 | `signPageBannerImg` | 页面加载底图 | 签署页加载 |
| 5777 | `showRating` | 签署完成页是否展示评分 | 结果页加载 |
| 5784 | `defaultStampColor` | 个人印章创建默认颜色 | 签署页印章操作 |
| 5795 | `h5RedirectUrlType` | H5 签署页重定向地址来源 | 签署完成跳转 |
| 5796 | `pcRedirectUrlType` | PC 签署页重定向地址来源 | 签署完成跳转 |
| 5808 | `showSignConfirmTips` | 是否展示签署确认提示 | 签署提交前 |
| 5822 | `showEdgeSignway` | 是否允许骑缝章 | 签署页印章选项 |
| 5823 | `noWillingnoSealSign` | 无意愿区块链签署（协议云） | 签署执行时 |
| 5824 | `showTaskDetail` | 是否展示任务详情（协议云） | 签署页加载 |
| 5825 | `signingDownload` | 签署中文件是否允许下载 | 签署页按钮 |
| 5836 | `allowRemarkSign` | 是否允许签署备注区 | 签署页加载 |
| 5843 | `checkFreeSignfield` | 校验自由签署区 | 签署提交前校验 |
| 5865 | `h5RedirectWay` | H5 签署页默认跳转方式 | 签署完成跳转 |
| 5868 | `noWillingnoSealSignShowInWeb` | 无意愿无印章签署 | 签署页加载 |
| 5870 | `subOrganizeCheckSwitch` | 关联企业授权校验 | 签署时授权校验 |
| 5883 | `wechatMiniSwitch` | 签署中间是否开放微信小程序入口 | 签署页加载 |
| 5902 | `SignerInfoCompareNotice` | 签署人信息不一致通知 | 签署时身份核对 |
| 5929 | `autoJumpToSign` | api 填写完成后是否自动跳转到签署页 | 填写完成后跳转 |
| 5934 | `signingDownloadSeal` | 签署中文件下载是否带章 | 签署页下载行为 |
| 5937 | `showApplyUseSealAuthorization` | 企业未实名是否展示申请用印权限入口 | 签署页加载 |
| 5939 | `notRedirectFromSAAS` | 官网打开开放服务签署是否不跳转 | 签署页跳转逻辑 |
| 5952 | `showPsnSealColor` | 签署页展示哪些颜色的个人章 | 签署页印章列表 |
| 5953 | `signPageReviewSealColor` | 签署页预览章颜色 | 签署页印章预览 |
| 5954 | `showTechSupText` | 是否展示签署页技术支持文案 | 签署页加载 |
| 5965 | `openSkipWillingness` | 是否开启授权免意愿 | 签署时意愿校验 |
| 5966 | `skipWillingnessValidityDays` | 授权免意愿有效期 | 与 5965 配套 |
| 5977 | `sealApprovalClientTypes` | 审批中间页终端类型 | 签署页审批流 |
| 5978 | `noWillingSignSwitch` | 是否允许使用非标无意愿签 | 签署执行时 |
| 6018 | `signerInfoCheckTwice` | 签署信息二次校验 | 签署提交时 |
| 6031 | `organSilence` | 企业静默授权开关 | 签署授权流程 |
| 6032 | `psnSilence` | 个人静默授权开关 | 签署授权流程 |
| 6033 | `signingDocAddWaterMark` | 签署中文件添加水印 | 签署执行中 |
| 6035 | `jumpToRedirectUrl` | 签署完成后再次打开直接跳转 | 签署页重入 |
| 6043 | `signPageShowContract` | 专属云签署详情页是否降级 | 签署页加载 |
| 6048 | `signUrlHideButtons` | 签署页隐藏按钮 | 签署页加载 |
| 6049 | `defaultAddSealToFile` | 进入签署页默认全部落章 | 签署页加载时 |
| 6050 | `batchSignForceRead` | 批量签强制阅读是否取单流程和 appid 配置 | 批量签署页 |
| 6052 | `redirectUrlDecode` | 是否对重定向地址进行解码 | 签署完成跳转 |
| 6055 | `onePageContractHideAcrossPage` | 单页合同自由签禁用骑缝章 | 签署页印章选项 |
| 6076 | `forcedReadTwiceConfirm` | 强制阅读到底二次确认文案 | 签署页 forceRead 交互 |
| 6078 | `infoDiffPageShowReturnButton` | 小程序信息不一致页面返回按钮 | 签署页信息核验页 |
| 6089 | `orgTransactorAuthVerify` | 非标校验企业经办人授权 | 签署时经办人校验 |
| 6097 | `remarkSignMustSignSkip` | 备注签选签校验跳过 | 签署提交校验 |
| 6107 | `showSignerIpLocation` | 签署方展示 IP 所属城市 | 签署页加载 |
| 6114 | `legalSignSkipWillingness` | 法人签署企业实名后免意愿 | 签署时意愿判断 |
| 6126 | `signingDetailsPageWithout2C` | 签署详情页在 2C 小程序展示 | 签署页加载 |

---

### 5.5 P2 配置（45 项）

> 仅在流程创建时 / 归档时 / 通知时读取，灰度路由可兜底（检测到不支持的 P2 配置时，整体路由回旧系统）。

| id | code | 名称 | 读取时机 |
| --- | --- | --- | --- |
| 512 | `chargeForPreserve` | 签名存证是否单独计费 | 归档/计费时 |
| 5312 | `propRealNameCert` | 强制实名认证 | 流程发起校验 |
| 5313 | `propAutoPreserve` | 归档自动存证 | 归档时 |
| 5320 | `sendSlientAuthNotify` | 发送静默授权通知 | 流程发起/授权时 |
| 5420 | `personAccountIsolation` | 个人账号互通 | 签署方账号查找时 |
| 5421 | `organizeAccountIsolation` | 企业账号互通 | 签署方账号查找时 |
| 5551 | `signNotaryDocType` | 签名存证-公证处存证类型 | 归档时 |
| 5567 | `silenceSignNotify` | 平台用户静默盖章通知类型 | 通知发送时 |
| 5710 | `shortlinkValidaty` | 签署短连接时效 | sign-url 生成时 |
| 5714 | `showPlatformNameInMsg` | 签署通知里是否显示平台名称 | 通知发送时 |
| 5721 | `noSealSign` | 归档使用天谷证书签名 | 归档时 |
| 5722 | `voucherQr` | 加盖验签二维码 | 归档/文件生成时 |
| 5723 | `voucherQrPos` | 验签二维码位置 | 归档/文件生成时 |
| 5763 | `signBillingWay` | 签署计费时机 | 流程发起/归档时 |
| 5801 | `batchSignPageUrl` | 天印批量签署界面 url | 批量签发起时 |
| 5804 | `largeFileInvalidTime` | 大文件响应时间 | 文件处理时 |
| 5838 | `showContractOnOtherApp` | 是否在 e 签宝各端展示合同 | 合同可见性配置 |
| 5845 | `allowQuerySealImage` | 是否允许查询并获取印章图片 | 接口权限控制 |
| 5885 | `batchSignLimit` | 批量签署接口流程限制数 | 批量签发起时 |
| 5914 | `autoSignMode` | 自动签签署模式 | 自动签触发时 |
| 5918 | `contractDefaultTransactorV3` | V3 是否必须指定企业签署经办人 | 流程创建校验 |
| 5962 | `signNoticeMessageWithExpireTime` | v3 签署通知是否带有效期 | 通知发送时 |
| 5993 | `minSignAge` | 签署年龄限制-年龄下限 | 流程创建/发起校验 |
| 5994 | `maxSignAge` | 签署年龄限制-年龄上限 | 流程创建/发起校验 |
| 5999 | `originalDocQrPos` | 原文核验二维码位置 | 归档/文件生成时 |
| 6000 | `originalDocQrWidth` | 原文核验二维码宽度 | 归档/文件生成时 |
| 6005 | `mustSignerName` | v3 强制个人和企业经办人姓名 | 流程创建校验 |
| 6008 | `maxSignerNumber` | 签署方个数上限 | 流程创建校验 |
| 6010 | `allowEnternalSealAutoSign` | 允许低版本跨企业印章自动签 | 自动签触发时 |
| 6016 | `signTemplateMiniAppSendMessage` | 填写+签署流程在小程序中是否发消息 | 消息通知时 |
| 6019 | `signFlowOnlyOneDoc` | 签署流程限制一份文件 | 流程创建校验 |
| 6036 | `openAutoSign` | 是否开启个人授权静默签 | 自动签授权时 |
| 6037 | `autoSignValidityDays` | 个人授权静默签有效期 | 与 6036 配套 |
| 6038 | `realnameEvidencePoint` | 是否允许使用实名证据点 | 归档/存证时 |
| 6039 | `newVersionCreateCert` | 是否使用新版发证逻辑 | 证书签发时 |
| 6042 | `identityVerifyHoverUnrealname` | 签署流程校验个人信息是否覆盖未实名账号 | 流程创建时 |
| 6071 | `oldAutoSignAuthRecordAvailable` | 旧版非标静默签授权记录是否生效 | 静默签触发时 |
| 6082 | `signAttachmentsRetainDays` | 签署附件保留天数 | 文件存储配置 |
| 6083 | `signFinalRetainDays` | 签署完成文件保留天数 | 文件存储配置 |
| 6084 | `signInitialRetainDays` | 签署初始文件保留天数 | 文件存储配置 |
| 6085 | `signProcessRetainDays` | 签署过程文件保留天数 | 文件存储配置 |
| 6091 | `flowExpireTime` | 签署截止时间最大值 | 流程创建校验 |
| 6095 | `signatureVerifyReportDeduplication` | 验签报告签名是否去重 | 归档/验签时 |
| 6115 | `exceptionAccountSupport` | 是否支持异常账号查询 | 接口权限控制 |
| 6125 | `esSign` | es 等级签署 | 流程创建时签署方式 |

---

### 5.6 内部/不适用配置（15 项）

> ePaaS 签署服务不需要实现；计费由计费服务处理，天印/V1 专用配置与 OpenAPI V3 路径无关。

| id | code | 名称 | 排除原因 |
| --- | --- | --- | --- |
| 5311 | `propSaleScheme` | 售卖方案 | 内部计费配置 |
| 5501 | `propOpenBillingPolicy` | 扣费策略 | 内部计费路由 |
| 5644 | `hashSignPid` | 摘要签扣费校验（手机盾） | 内部计费，手机盾专用 |
| 5646 | `v1createOrgLogic` | V1 创建个人/企业逻辑 | V1 接口专用 |
| 5647 | `propSignPlatform` | 使用的签约账号平台 | 内部 PaaS/SaaS 账号路由 |
| 5856 | `overseasSign` | 是否海外版签署 | M-1 仅国内站 |
| 5898 | `TySignBillingWay` | 天印签署计费时机 | 天印专用 |
| 5910 | `nonstandardWhiteList` | 非标合同白名单列表 | 内部非标配置 |
| 5911 | `TyBillingPolicy` | 天印内部收费模式 | 天印专用 |
| 5995 | `billingPackageType` | 扣费套餐类型（天印见证专用） | 天印专用 |
| 6006 | `allowInitiatorPaySplitOrder` | 发起方付费允许使用分项套餐 | 内部计费配置 |
| 6034 | `v1DownloadSigningDoc` | v1 下载流程文档接口支持签署中 | V1 接口专用 |
| 6051 | `billingByAppidUnderInitiatorPay` | 发起方付费下是否遵循 appid 计费方式 | 内部计费配置 |
| 6061 | `signerPaysCommodity` | 签署方付费扣费产品 | 内部计费配置 |
| 6128 | `ty53_counterparty_compliance_sign` | 天印 5.3 相对方合规签署 | 天印专用 |

---

## 6. 开放问题

| # | 问题 | 影响范围 | 负责方 | 状态 |
| --- | --- | --- | --- | --- |
| OQ-1 | `create-by-file` 逐字段分级已完成。L2+ 功能（追加签署方/转交/审批流/批量签署）均为独立接口，不在 create-by-file 请求体内；对应接口路径待内部规范确认 | § 4.3 灰度路由检测规则 | PM + 研发 | 部分完成，4 项待确认 |
| OQ-2 | M-1 全量错误码清单：错误码与帮助文档资料来源已补充至 § 3 C-3，仍需研发基于旧系统实际返回整理 M-1 接口逐场景映射表 | § 3 C-3 | PM + 研发 | 资料来源已补充，待逐接口校验 |
| OQ-3 | ePaaS 调用旧文件服务的连通性确认：内网路由是否通、响应字段是否与 sign-api.yaml 描述一致 | § 3 C-5 | 研发 | 待确认 |
| OQ-4 | `propSignPlatform` (5647) PaaS 账号模式：若有客户使用，可能需升级为 P2（灰度路由兜底）而非直接排除 | § 5.6 | PM | 待确认 |
| OQ-5 | `personAccountIsolation` / `organizeAccountIsolation` (5420/5421)：账号互通逻辑是否与 ePaaS 账号体系兼容，是否需升为更高优先级 | § 5.5 | 研发 | 待确认 |
| OQ-6 | P1 配置（70 项）中 ePaaS 已支持 vs 存在缺口的逐项确认，确定灰度前需补齐的实现工作量 | § 5.4 全部 | 研发 | 待排查 |

---

_文档状态：draft — create-by-file 参数分级已完成（OQ-1 部分完成）；3 项待确认字段（signType / 钉钉通知 / L2 字段名）和错误码逐接口映射表（OQ-2）确认后升版。_