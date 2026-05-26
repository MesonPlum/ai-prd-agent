# OpenAPI 三源比对差异分析总结报告

> 生成时间: 2026-05-26
> 执行依据: `docs/openapi-cleanup-plan.md`
> 比对源: opendoc 在线文档 / 对接 Postman / 测试 Postman + Apifox

---

## 1 执行概览

| 模块 | endpoints | 差异行数 | yaml 变更 | 变更状态 |
|---|---|---|---|---|
| auth-api | 7 | 4 | +1 参数 | ✅ 已落地 |
| member-api | 9 | 0 | 无变更 | ✅ |
| seal-api | 28 | 4 | +6 参数 | ✅ 已落地 |
| file-template-api | 26 | 2 (幽灵端点) | -2 端点 | ✅ 已落地 |
| sign-api | 41 | 58 (53 param-missing + 5 ghost) | 0 (yaml 已完整) | ✅ |
| **合计** | **111** | **68** | **+7 / -2 端点** | |

**结论**: 所有 yaml 变更已完成落地。`sign-api.yaml` 的 41 个 endpoint 是 5 个模块中覆盖度最高的规范文件。

---

## 2 全局统计

| 指标 | 值 |
|---|---|
| yaml 总 endpoints | 111 |
| 测试覆盖 endpoints | 43/111 (38.7%) |
| 三源全无幽灵端点 | 7 (5 sign-api K 保留 + 2 file-template-api 已删除) |
| L1 路径/方法级差异 | 0 |
| L2 参数级差异 | 61 |
| L3 必填/类型差异 | 1 (auth-api psnId) |
| L4 响应/错误码差异 | 0 (暂未扫描) |

---

## 3 各模块差异分析

### 3.1 auth-api

**文件**: `openapi/auth-api.yaml` | 7 endpoints | 测试覆盖 3/7

| # | 端点 | 层 | 差异类型 | 描述 | AI推荐 | PM决策 | 状态 |
|---|---|---|---|---|---|---|---|
| 1 | `POST /v3/org-auth-url` | L2 | param-missing | `changeOrgAdmin` 在 opendoc + docking 均有 | ADD | A | ✅ 已新增 |
| 2 | `POST /v3/org-auth-url` | L2 | param-missing | `noticeTypes` 仅测试有 | 单源不采纳 | — | 忽略 |
| 3 | `POST /v3/org-auth-url` | L2 | param-missing | `orgAuthConfig.orgId1` 仅测试有 | 单源不采纳 | — | 忽略 |
| 4 | `GET /v3/persons/{psnId}/authorized-info` | L3 | required-flip | `psnId` yaml required=true, opendoc required=false | yaml 正确 | A | ✅ 保持不变 |

**PM 确认**：
- `changeOrgAdmin` → **A 采纳**，已添加到 `requestBody` schema
- `noticeTypes` / `orgId1` → **单源独有**，不采纳（测试数据特有）
- `psnId` 必填 → **yaml 正确**，保持不变

### 3.2 member-api

**文件**: `openapi/member-api.yaml` | 9 endpoints | 测试覆盖 0/9

- **0 差异**：member-api 是最干净的模块，多源比对未发现任何参数级差异
- **注意**：0/9 测试覆盖率，该模块缺乏 Postman/Apifox 测试覆盖

### 3.3 seal-api

**文件**: `openapi/seal-api.yaml` | 28 endpoints | 测试覆盖 18/28

| # | 端点 | 层 | 差异类型 | 描述 | AI推荐 | PM决策 | 状态 |
|---|---|---|---|---|---|---|---|
| 1 | `POST /v3/seals/org-seal-create-url` | L2 | param-missing | `hiddenFields` 仅测试有 | 单源不采纳 | A（标记不对外） | ✅ 已新增 |
| 2 | `POST /v3/seals/org-seals/internal-auth` | L2 | param-missing | `customBizNum` opendoc 有，yaml 缺 | ADD | A | ✅ 已新增 |
| 3 | `POST /v3/seals/org-seals/external-auth` | L2 | param-extra | `autoSign` yaml 有但源无 | 保留 | K（确认存在） | ✅ 已新增到 InternalSealAuthRequest |
| 4 | `GET /v3/seals/org-seals/external-auth` | L2 | param-missing | `sealId` / `authorizedOrgId` yaml 定义了但 opendoc 未列出 | yaml 正确 | K | ✅ 保持不变 |

**PM 确认**：
- `hiddenFields` → **A 采纳**，描述中标记"（不对外，内部字段）"
- `sealSuffix` / `sealHorizontalText` / `sealBottomText` / `sealOutsideSurroundText` → **修正确认**，opendoc 有，初始脚本提取遗漏，已补充到 yaml
- `customBizNum` → **A 采纳**，已添加到 InternalSealAuthRequest 和 ExternalSealAuthRequest
- `autoSign` → **K 保留**，确认确实存在，已补充到 InternalSealAuthRequest（原只在 ExternalSealAuthRequest）
- `sealId` / `authorizedOrgId` → **yaml 正确**

### 3.4 file-template-api

**文件**: `openapi/file-template-api.yaml` | 26 endpoints | 测试覆盖 17/26

| # | 端点 | 层 | 差异类型 | 描述 | AI推荐 | PM决策 | 状态 |
|---|---|---|---|---|---|---|---|
| 1 | `GET /v3/custom-component-group/detail` | L1 | ghost-endpoint | yaml 有但三源全无 | VERIFY 删除 | A | ✅ 已删除 |
| 2 | `POST /v3/custom-component-group/add-component` | L1 | ghost-endpoint | yaml 有但三源全无 | VERIFY 删除 | A | ✅ 已删除 |

- **0 参数级差异**：file-template-api 是唯一无参数差异的模块
- **2 幽灵端点**：三源全无，经 PM 确认后已从 yaml 删除

### 3.5 sign-api

**文件**: `openapi/sign-api.yaml` | 41 endpoints | 测试覆盖 14/41

**策略**: 多源共识 — 仅报告"2+ 源共识但某源缺失"的参数，忽略单源独有参数。

| 指标 | 值 |
|---|---|
| 53 条 param-missing | 全部参数**已存在于 yaml**，差异来自 truth sources 覆盖不全 |
| 5 个 ghost endpoints | PM 标记 **K 保留**（可能是边缘/内部接口） |

**ghost endpoints (K 保留)**：
| endpoint | 说明 |
|---|---|
| `GET /v3/files/{fileId}/keyword-positions` | 关键字坐标查询 |
| `POST /v3/sign-flow/{signFlowId}/file-download-url` | 文件下载链接 |
| `POST /v3/sign-flow/{signFlowId}/revoke` | 撤销签署 |
| `POST /v3/files/verify-result` | 验证结果 |
| `POST /v3/files/merge-ofd-files` | OFD 文件合并 |

**结论**: sign-api yaml 规范完整度最高，无需任何修改。差异的本质是"yaml 比 truth sources 更完整"。

---

## 4 差异分类与处理策略

### 4.1 处理结果分布

| 类别 | 数量 | 处理方式 |
|---|---|---|
| 已落地变更 | 9 | yaml 新增/删除 |
| 确认 yaml 正确 | 3 | 保持不变 |
| 单源独有忽略 | ~300 | 不报告（opendoc/docking/test 深度差异是常态） |
| 幽灵端点保留 | 5 | K 保留，待后续验证 |

### 4.2 策略总结

| 模块 | 策略 | 原因 |
|---|---|---|
| auth-api / member-api / seal-api / file-template-api | 标准比对 | endpoints 较少（7-28），逐个审查可行 |
| sign-api | 多源共识 | 41 endpoints，参数嵌套深，单源独有参数量极大 |

---

## 5 测试覆盖分析

| 模块 | 覆盖率 | 风险评级 |
|---|---|---|
| member-api | 0/9 (0%) | 🟡 需补充测试 |
| auth-api | 3/7 (43%) | 🟡 需补充测试 |
| seal-api | 18/28 (64%) | 🟢 基本覆盖 |
| file-template-api | 17/26 (65%) | 🟢 基本覆盖 |
| sign-api | 14/41 (34%) | 🟡 核心端点覆盖率偏低 |
| **合计** | **52/111 (46.8%)** | |

---

## 6 经验教训

### 6.1 脚本优化

1. **Opendoc 参数扁平化**: 必须跳过 `list`/`array` 类型参数的 children（枚举说明文本），否则产生大量假阳性
2. **Yaml 参数提取**: 初始 seal-api 脚本手动提取遗漏了 schema 定义的部分字段，改为从 `components/schemas` 完整解析后消除 14 条假阳性
3. **多源共识策略**: 对于大模块（40+ endpoints），单源独有参数噪音极大，共识过滤是必要手段

### 6.2 规范维护

1. **幽灵端点不等于应删除**: sign-api 的 5 个 ghost endpoint 被 PM 标记 K 保留，它们可能是内部接口或边缘场景
2. **"单源独有"是常态**: opendoc（官方文档）和 Postman（实际调用）覆盖深度不同是正常的，不应追求完全一致
3. **Yaml 完整度可能高于 truth sources**: sign-api 是最典型案例 — yaml 的 53 个"缺失"参数实际全部存在，是 truth sources 未覆盖到

---

## 7 遗留问题与建议

| # | 问题 | 建议 | 优先级 |
|---|---|---|---|
| 1 | member-api 0% 测试覆盖 | 补充 Postman 测试用例 | 中 |
| 2 | sign-api 5 个 ghost endpoint | 找对接团队确认是否为活跃接口 | 低 |
| 3 | auth-api `noticeTypes`/`orgId1` | 标记为测试独有，不阻塞当前 | 低 |
| 4 | L4 响应/错误码差异未扫描 | 建议后续补充 response schema 比对 | 中 |

---

## 附录：变更文件清单

| 文件 | 变更类型 | 行数变化 |
|---|---|---|
| `openapi/auth-api.yaml` | 新增参数 | +6 行 |
| `openapi/seal-api.yaml` | 新增参数 + 标记 | +12 行 |
| `openapi/file-template-api.yaml` | 删除端点 | -4 端点 |
| `openapi/sign-api.yaml` | 无变更 | 0 |
