# F-002 文件&流程模板管理 变更日志

## v1.1 — 2026-05-20（BR-01 规则修正）

**变更类型**：逻辑修改

**变更内容**：BR-01 规则修正，官网模板不可通过 API 编辑/复制/删除，**但可以通过 API 预览和填写**

**影响范围**：§5.3 BR-01 规则定义及相关引用

## v0.1 — 2022-02-22（原始导入）

- 原始内容已归档至 `archive/original-v0.1.md`
- 来源：Epic E-001 §F-002 章节 + assets/opendoc/{pdf-sign3, file-and-template3}/*.md 关键模板接口文档
- 录入日期：2026-05-20
- 关联需求 ID：未匹配（iteration-requirement-list.md 为空模板）

## v1.0 — 2026-05-20

- 基于原始内容（v0.1）重构为标准 Feature PRD 格式，由 AI 生成
- 跨域归属处理：feature-area frontmatter 跟随 Epic v1.4 + feature-map.md TPL 域填 `file-and-template3`；§7 / §8 中逐接口标注实际 opendoc 域（T1 文件模板归属 pdf-sign3，T2 流程模板归属 file-and-template3）
- §1~§3 元数据 / 修订记录 / 需求概要：从 Epic E-001 业务说明 + opendoc 关键 warning 区提炼，对齐 P3/P5/P4/P2 用户画像
- §4 概念模型：建立 14 项本 PRD 新引入术语 / 枚举（docTemplateType / fillTaskStatus / signTemplateStatus / participantSetMode / participateBizType / sealTypes / willingnessAuthModes / hiddenOriginComponents / basicComponentsType / uneditableFields / copyToExternalOrg 等）
- §4.1 文件模板控件类型完整枚举表（16 种 componentType + 类型特有属性），源自 pdf-sign3/aoq509
- §5.1 / §5.2：功能结构图与端到端业务流程图，与 feature-map.md TPL 域 T1-T5 子节点完全同构
- §5.3 业务规则：从 opendoc 提炼 BR-01~BR-13 共 13 条跨功能规则，含：
  - BR-01 接口模板与 SaaS 官网模板隔离
  - BR-02 沙箱与正式环境不互通
  - **BR-03 控件组双套问题归并**：经对比 pdf-sign3/pupwutihq20wss04 与 file-and-template3/crxfb1zzefbt5166 内容完全一致，确认为同一套接口的镜像入口（OQ-1 待官方文档明确）
  - BR-04 流程模板编辑前置（停用→编辑→启用）
  - BR-05 模板管理权限链路
  - BR-06 PDF vs HTML 模板差异
  - BR-07/08 各类链接有效期
  - BR-09 componentId vs componentKey 二选一
  - BR-10 跨企业复制规则
  - BR-11 4 种 participantSetMode 决定后续发起时 participants 是否必传
  - BR-12 删除不可逆
  - BR-13 Action 兼容性原则
- §6 用户故事：6 个 Feature 级 Gherkin AC，覆盖服务端填充路径 + 页面填写路径 + 流程模板搭建 + 编辑生命周期 + 跨企业复制 + 回调订阅
- §7 功能清单：定义 TPL 前缀 + 5 个 CATEGORY（DOC / SIGN / CG / CC / CB），共 24 项已展开 + ~10 项占位
- §8 功能需求说明书：
  - **T1 文件模板（10 项已展开）**：对照 pdf-sign3/{mghz1g, aoq509, xagpot, lgb2go, le6t3e7fbsrdmtx6, ub4ncy, ovhittqcf7cooxxv, mv8a3i, hgcwhl, iwtpf3} 全量抽取请求/响应字段、异常处理、状态流转、数据字典
  - **T2 流程模板（9 项已展开）**：对照 file-and-template3/{al59g6n5oo75sl19, pfzut7ho9obc7c5r, ukznvprry5qvlxh3, fifg4ked5cqk6vgt, gyo1p6cg3yk1rv2g, ohk7cno35ozby9qt, lm10qsdrrag3wyyp, wylnqp3e9l61px5p, qul915livl97eh6n} 全量抽取
  - **T5 模板回调（5 项已展开）**：EDIT_DOCTEMPLATE / FILL_DOCTEMPLATE / FILL_DOCTEMPLATE_FAIL / CREATE_SIGN_TEMPLATE / DRAFT_MISSON_COMPLETE，每个含载荷字段说明 + 异常处理 + 幂等要求
  - **T3 / T4 占位**：在 §7 列出 ~10 项功能编号 + opendoc 镜像入口对照，§8 待后续轮次抓取（BR-03 / OQ-1 / OQ-9 联动确认归并方案）
- §8.10 对外 OpenAPI 变更说明：标记 24 个 V3 新增接口 + 5 个 V3 新增回调事件类型，均设"是否影响对外文档=是"（原 Epic 标注"待定/二期"的接口在本 PRD 一次性补齐字段定义）
- §9 非功能性需求：性能指标（PDF / HTML 模板填充按规模分档）、安全要求（含 HTML XSS 转义）、可访问性、多端兼容性、数据统计事件
- §10 验收检查清单：从 §6 Gherkin AC 提炼 14 条 AC
- §11 范围外：明确 7 项不在本期范围（重点：T3/T4 §8 详细字段、跨环境同步、HTML 样式精确保留、模板版本管理、批量操作）
- §12 开放问题：列出 9 个待澄清项，重点：
  - OQ-1 控件组镜像入口的官方归并方案（影响 T3 §8 抓取节奏）
  - OQ-2/3 删除模板时被进行中任务/流程引用的处理
  - OQ-4 FILL_DOCTEMPLATE_FAIL 载荷字段
  - OQ-5 详情响应是否返回 docTemplateType
  - OQ-6 跨企业复制后的授权传递
  - OQ-7 填充失败的错误码列表
  - OQ-8 componentDefaultValue 的语义
  - OQ-9 T3/T4 §8 镜像入口归并节奏

### 与 context 的一致性确认

- **feature-map.md**：F-002 §5.1 Mermaid 与 TPL 域 T1-T5 子节点完全同构；功能编号 TPL-DOC / TPL-SIGN / TPL-CG / TPL-CC / TPL-CB 已纳入 product-feature-map.md TPL 模块的 CATEGORY 命名规范
- **business-glossary.md**：本 PRD 引用 glossary 已有的 14 项术语，§4 仅定义本 PRD 新引入的 14 项；后续移入正式区时建议数据飞轮提议将本 PRD 新引入的核心术语（docTemplateType / participantSetMode / participateBizType / sealTypes / willingnessAuthModes）追加到 glossary
- **product-feature-map.md 回调 Action 表**：本 PRD §8 涉及的 5 个 Action（EDIT_DOCTEMPLATE / FILL_DOCTEMPLATE / FILL_DOCTEMPLATE_FAIL / CREATE_SIGN_TEMPLATE / DRAFT_MISSON_COMPLETE）中，glossary 已收录前 4 个；建议数据飞轮提议追加 FILL_DOCTEMPLATE_FAIL
- **permission-model.md**：F-002 中流程模板管理操作（创建/编辑/停用/启用/删除/复制）均依赖 F-001 已定义的 manage_org_resource / manage_org_template / use_org_template scope；本 PRD 未引入新 scope，BR-05 直接引用 permission-model.md
- **platform-support.md**：§9.4 端清单对齐 10 端标识符；本 PRD 区分制作/编辑/预览/填写四类页面的端兼容差异
