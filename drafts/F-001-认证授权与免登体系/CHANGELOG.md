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
