<!-- 原始导入内容 v0.1 — 录入日期：2026-05-20，来源：Epic E-001 §F-002 章节 + assets/opendoc/file-and-template3/*.md + assets/opendoc/pdf-sign3/*-模板相关 -->

# F-002 文件&流程模板管理（原始内容）

## 来源 1：Epic E-001 §F-002 业务说明

- **文件模板（docTemplateId / 原文称 fileTemplateId）**：包含文件底稿 + 控件，用于填充生成待签文件，由开发者/平台方创建管理
- **流程模板（signTemplateId）**：包含文件底稿 + 控件 + 签署方等完整配置，可直接发起签署流程

### Epic 中的接口清单

**文件模板**（属 pdf-sign3 域，原表中"待补充对应文件路径"的实际归属）：

| 接口 | V3 对应 opendoc | 状态 |
|---|---|---|
| 查询文件模板列表 | pdf-sign3/mghz1g | ✅ 已上线 |
| 查询文件模板详情（含控件） | pdf-sign3/aoq509 | ✅ 已上线 |
| 获取制作文件模板页面 | pdf-sign3/xagpot | ✅ 已上线 |
| 获取编辑文件模板页面 | pdf-sign3/lgb2go | ✅ 已上线 |
| 获取预览文件模板页面 | pdf-sign3/le6t3e7fbsrdmtx6 | ✅ 已上线 |
| 获取填写文件模板页面 | pdf-sign3/ub4ncy | ✅ 已上线 |
| 查询填写模板任务结果 | pdf-sign3/ovhittqcf7cooxxv | ✅ 已上线 |
| 填写模板生成文件 | pdf-sign3/mv8a3i | ✅ 已上线 |
| 复制文件模板 | pdf-sign3/hgcwhl | ✅ 已上线 |
| 删除文件模板 | pdf-sign3/iwtpf3 | ✅ 已上线 |
| 回调：EDIT_DOCTEMPLATE / FILL_DOCTEMPLATE / FILL_DOCTEMPLATE_FAIL | pdf-sign3/mcm1c9487grz0ynt | ✅ 已上线 |

**流程模板**（file-and-template3 域）：

| 接口 | V3 对应 opendoc | 状态 |
|---|---|---|
| 查询流程模板列表 | file-and-template3/al59g6n5oo75sl19 | ✅ 已上线 |
| 查询流程模板详情 | file-and-template3/pfzut7ho9obc7c5r | ✅ 已上线 |
| 获取创建流程模板页面链接 | file-and-template3/ukznvprry5qvlxh3 | ✅ 已上线 |
| 获取编辑流程模板页面链接 | file-and-template3/fifg4ked5cqk6vgt | ✅ 已上线 |
| 停用流程模板 | file-and-template3/gyo1p6cg3yk1rv2g | ✅ 已上线 |
| 开启流程模板 | file-and-template3/ohk7cno35ozby9qt | ✅ 已上线 |
| 删除流程模板 | file-and-template3/lm10qsdrrag3wyyp | ✅ 已上线 |
| 复制流程模板 | file-and-template3/wylnqp3e9l61px5p | ✅ 已上线 |
| 查询用户对模板的编辑/使用权限 | file-and-template3/qul915livl97eh6n | ✅ 已上线 |
| 回调：CREATE_SIGN_TEMPLATE / DRAFT_MISSON_COMPLETE | file-and-template3/nmg5r9a2szi5fsza | ✅ 已上线 |

### V3 演变说明

原文档"获取《模板管理》页面链接（待定）"在 V3 拆分为独立的创建/编辑页面链接接口，无统一模板管理入口页。

## 来源 2：opendoc 关键业务点摘录

### PDF vs HTML 模板差异（xagpot / mv8a3i）

- PDF 模板：表格固定行；可选 `requiredCheck=false` 跳过必填校验
- HTML 模板：表格可动态增行；强制校验必填；行数 ≤ 2000（性能限制）；填充完样式可能产生变化，不能保证完全一致

### 接口模板与 SaaS 官网模板不互通（xagpot / lgb2go 等）

接口制作的合同模板**无法同步到 e签宝 SaaS 官网**，且沙箱环境和正式环境不互通，需要分别制作。

### 链接有效期

- 制作模板页面链接：24 小时（短链 / 长链同）
- 编辑模板页面链接：24 小时
- 预览模板页面链接：30 分钟（过期可重新获取）
- 填写模板页面链接：30 天
- 填写任务过期：fillTaskStatus=3（超过 30 天未填写）

### 流程模板编辑前置（fifg4ked5cqk6vgt）

1. 必须授权 `manage_org_resource`（或更细的 `manage_org_template`）
2. 模板需先停用（gyo1p6cg3yk1rv2g）才能进入编辑页面
3. 编辑完成后需重新调用启用（ohk7cno35ozby9qt）

### 流程模板复制规则（wylnqp3e9l61px5p）

- 复制到同企业：自动加"_副本"后缀
- 复制到外部企业：不加"_副本"，需提前授权 `manage_org_template`
- 跨企业复制需 `copyToExternalOrg=true` + `externalOrgId` + `externalTransactorPsnId`

### 控件组双套问题（重要）

`pdf-sign3/pupwutihq20wss04` 和 `file-and-template3/crxfb1zzefbt5166` 两个 opendoc 文件**内容完全相同**：
- URL 均为 `POST /v3/custom-component-group/create`
- 请求参数、响应参数、错误码（1430002 / 1430722 / 1430012）完全一致
- 注意事项（appId 下最多 1000 个控件组，2024-03-28 起放开名称唯一性校验）一致

结论：**控件组是同一套接口，opendoc 只是在两个域下做了镜像入口**，便于开发者从文件模板域或流程模板域都能查到对应文档。控件组数据归属 appId 级（非 fileTemplateId / signTemplateId 级）。

## 备注

T1 文件模板 + T2 流程模板 + T5 回调本轮在 §8 全量抽取详细字段；T3 控件与控件组 + T4 自定义业务控件本轮仅在 §7 列出占位，§8 待后续轮次抓取（T3/T4 涉及 ~12 个接口）。
