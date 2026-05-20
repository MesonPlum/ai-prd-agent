# F-001 认证授权与免登体系 变更日志

## v0.1 — 2022-02-22（原始导入）

- 原始内容已归档至 `archive/original-v0.1.md`
- 来源：Epic E-001 §F-001 章节 + assets/opendoc/auth3/ 全量接口文档抽取
- 录入日期：2026-05-19
- 关联需求 ID：未匹配（iteration-requirement-list.md 为空模板）

## v1.0 — 2026-05-19

- 基于原始内容（v0.1）重构为标准 Feature PRD 格式，由 AI 生成
- §1~§3 元数据 / 修订记录 / 需求概要：从 Epic E-001 业务说明 + opendoc auth3/lmfokx 场景介绍提炼
- §4 需求对象与概念模型：建立核心术语表（psnId / orgId / authFlowId / authorizedScopes 等）+ §4.1 完整 authorizedScopes 取值清单（含版本约束、2024-09-12 / 2025-09-22 / 2026-01-22 多次扩展记录）
- §5.1 / §5.2：补充功能结构 Mermaid 图与端到端业务流程图
- §5.3 业务规则：从 opendoc 提炼 BR-01~BR-10 共 10 条跨功能规则
- §6 用户故事：基于 Epic 粗用户故事拆分为 5 个 Feature 级 Gherkin AC
- §7 功能清单：定义 AUTH 前缀 + 5 个 CATEGORY（URL / AUTHZ / IDENT / FLOW / CB），共 10 个功能项
- §8 功能需求说明书：对照 opendoc auth3/{rx8igf, kcbdu7, nurtvw, ytn2tt, vssvtu, xxz4tc, hlrs7s, uozx98z5qom8ce5d} 全量抽取请求/响应字段、异常处理、状态流转、权限矩阵、边界条件
- §8.10 对外 OpenAPI 变更说明：标记 7 个 V3 新增接口 + 3 个 V3 新增回调事件类型，均设"是否影响对外文档=是"
- §9 非功能性需求：性能指标、安全要求、可访问性、多端兼容性、数据统计事件
- §10 验收检查清单：从 §6 Gherkin AC 提炼 12 条 AC
- §11 范围外：明确 6 项不在本期范围
- §12 开放问题：列出 7 个待澄清项（流程数据保留期、变更回调字段明细、审批未通过的回调事件类型、营业执照 OCR 开通流程、回调验签算法、iframe + 人脸冲突的兜底策略、推送顺序约束）

## v1.1 — 2026-05-20（与 context 维护后的一致性同步）

- §3.2 目标用户：对齐 context/user-persona.md，按 P3 / P6 / P2 编号体系标注核心 / 次级 / 间接用户
- §4 概念模型：business-glossary.md 已收录 psnId / orgId / authFlowId / authorizedScopes / 实名认证 / 意愿认证 / 经办人 / appId / V3 API，本节移除重复定义，仅保留本 PRD 新引入的 realnameStatus / authorizedStatus / 授权认证模式 / 实名认证模式 4 项枚举
- §4.1 authorizedScopes 完整取值清单：保留作为本 PRD 对 glossary "授权范围"术语的明细扩展（含 2024-09-12 / 2025-09-22 / 2026-01-22 三次版本扩展）
- §5.3 BR-01：补充对 context/permission-model.md §校验规则的引用
- §9.4 兼容性要求：端标识符对齐 context/platform-support.md（web / ios / android / harmonyos / h5 / wechat_miniapp / alipay_miniapp / dingtalk / feishu / wecom），补充原表缺失的支付宝小程序 / 钉钉 / 飞书 / 企微 4 端，并明确「触发端无差异 / 签署端差异」的层次说明
- 与 Epic v1.4 拆分（F-004 废弃，新增 F-007 console / F-008 account_3）一致性确认：F-001 接口范围（auth3 域内的 8 个接口）未发生变化，无需调整

## v1.2 — 2026-05-20（与 feature-map AUTH 域 A1-A4 子节点对齐）

**背景**：feature-map.md AUTH 子节点按「主体维度」划分为 A1 个人 / A2 机构 / A3 信息查询 / A4 回调，而 v1.1 PRD §7 按「动作类型」划分为 URL/AUTHZ/IDENT/FLOW/CB，两套维度对查询类接口（个人/机构的认证/授权信息查询）产生归属歧义。本版本统一对齐 feature-map 维度。

**功能 ID 重命名映射**：

| v1.1 编号 | v1.2 编号 | 归属 feature-map | 接口 |
|---|---|---|---|
| AUTH-URL-001 | **AUTH-PSN-001** | A1 个人认证与授权 | 获取个人认证&授权页面链接 |
| AUTH-AUTHZ-001 | **AUTH-PSN-002** | A1 | 查询个人授权信息 |
| AUTH-IDENT-001 | **AUTH-PSN-003** | A1 | 查询个人认证信息 |
| AUTH-URL-002 | **AUTH-ORG-001** | A2 机构认证与授权 | 获取机构认证&授权页面链接 |
| AUTH-AUTHZ-002 | **AUTH-ORG-002** | A2 | 查询机构授权信息 |
| AUTH-IDENT-002 | **AUTH-ORG-003** | A2 | 查询机构认证信息 |
| AUTH-FLOW-001 | AUTH-FLOW-001 | A3 认证授权信息查询 | 不变 |
| AUTH-CB-001/002/003 | 不变 | A4 授权变更回调 | 不变 |

**修订内容**：

- §3.3 方案概述：从「3 类接口」改为按 A1-A4 子节点组织的「4 类接口」描述
- §5.1 功能结构图（Mermaid）：上层引用 feature-map.md A1-A4 作为锚点，下层挂载本 PRD 10 个功能项，与 feature-map 完全同构
- §7 功能清单：新增「feature-map 归属」列，明确每个功能项对应的 A1-A4；CATEGORY 编号规则更新为 PSN/ORG/FLOW/CB
- §8 各小节标题：6 个子节标题中的「入口/查询」改为「个人/机构」
- §8 内部交叉引用：全文 6 个 ID 替换（含 §AUTH-AUTHZ-002 "参见 AUTH-AUTHZ-001" 等所有交叉引用）
- §8.x.9 PRD-页面规格卡映射表：表内功能编号同步替换
