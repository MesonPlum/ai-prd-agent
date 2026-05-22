# OpenAPI 清洗与三源比对执行方案

## Context

`openapi/*.yaml` 当前 5 个文件、103 paths 的内容主要来自 `assets/opendoc`（对外文档，覆盖 100% / 置信中），但还有两份未充分利用的真值源：对接技术人员维护的 postman（139 requests，覆盖 70% / 置信中）和测试维护的 postman+apifox（约 30% / 置信高）。

目标是用这三份原始数据系统性比对 yaml，把"path/method 错误、参数必填性/类型/枚举值、字段缺失/多余、错误码/业务规则"四类差异挖出来，由 PM 决策后落地修订 yaml，让对外发布的 OpenAPI 规范跟工程实际一致。

**已对齐的方案参数**：
- 真值优先级：测试覆盖区域 `测试 > 对接Postman > opendoc`；未覆盖区域退化为 `对接Postman > opendoc`
- 协作粒度：按 yaml 模块文件分批，从 auth-api 起步
- 实跑兜底：仅当三源冲突且无法判断时由 PM 提供 appkey 走 newman 实跑（预计 <10 endpoints）
- 修改方式：直接原地修改 yaml，依赖 git 历史回溯
- 差异焦点：文案类（example/default/description）本轮不纳入重心

**⚠️ 待补真值源**：
- **F003 签署相关 测试 postman 文件**（PM 后续补充） — 对应 `sign-api.yaml` 的 36 paths，是测试侧高置信源的关键补全
- 影响：sign-api 模块**在 F003 测试文件到位前不启动 Phase 2 清洗**；其他模块（auth / member / seal / file-template）不受影响，可先行推进

---

## 总体策略

**核心瓶颈是 token，不是工作量**。三份原始数据合计约 21MB，不可全量进上下文。Phase 0 用一次性脚本把原始数据"索引化"为可按 endpoint 切片读取的 JSON 中间产物；后续每轮对话只载入"1 个 yaml + 该 yaml 内 endpoints 对应的切片"。

工作流：Phase 0 一次性预处理 → Phase 1 全局对齐表 → Phase 2-4 按模块循环（auth → member → seal → file-template → sign）→ Phase 5 按需触发实跑。

---

## Phase 0：一次性预处理（产出可切片的中间数据）

**输入**：三份原始数据原文件 + **待补 F003 签署测试 postman**

**动作**：交付 3 个独立解析脚本（下一轮交付草稿），PM 本地跑：

1. **opendoc 解析器** → `outputs/openapi-cleanup/_index/opendoc.json`
   每条记录：`{file, title, path, method, params:[{name,type,required,location,desc}], response:[...], errorCodes:[...]}`。语雀 md 结构高度规整（固定锚点 `### 接口地址&请求方法` / `### 请求参数` / `### 响应参数` / `### 错误码`），表格按 `|` 切列，正则去 `<font>` / `**` HTML。
2. **postman 解析器**（对接 + 测试 各一份） → `postman-docking.json` + `postman-test.json`
   递归 `item[]` 抽叶子：`{folder_path, name, method, url(去 {{url}} 前缀), headers, query, body(raw 解析为 JSON), example_response}`。
   - **F003 签署 postman 到位后增量并入 `postman-test.json`**，无需修改脚本，重跑一次即可
3. **apifox 解析器** → `apifox.json`
   apifox 导出 JSON 已结构化，直接抽 `path/method/parameters/requestBody/responses`。

**输出**：`outputs/openapi-cleanup/_index/` 下 4 个 JSON，每个 < 2MB，可 grep 按 path 检索；解析失败项归入 `_unparsed.jsonl`。

**输入清单核对（Phase 0 启动前）**：

| 真值源 | 路径 | 状态 |
|---|---|---|
| opendoc | `assets/opendoc/` | ✅ 已就位（377 md） |
| 对接 postman | `assets/对接技术人员提供的完整postman文件/SaaS_API_V3版系列产品.postman_collection.json` | ✅ 已就位（139 requests） |
| 测试 postman — 实名 | `assets/测试提供的postman和apifox文件/实名常用.postman_collection.json` | ✅ 已就位（86 requests） |
| 测试 apifox — 流程模板+文件模板 | `assets/测试提供的postman和apifox文件/流程模板+文件模板.apifox.json` | ✅ 已就位 |
| **测试 postman — F003 签署** | 待 PM 补充至 `assets/测试提供的postman和apifox文件/` | ⏳ **缺失** |

**验收**：4 个 JSON 总记录数 ≈ 377 + 139 + 86 + F003 + N；随机抽 3 条 opendoc 比对解析结果无字段遗漏。

---

## Phase 0.5：解析器防错与自检（关键防污染层）

**为什么单设一节**：解析器错误会"静默污染"后续所有 Phase——AI 看到的差异其实是解析 bug，PM 浪费 14+ 轮对话修不存在的问题。基于对 opendoc / Postman / ApiFox 的真实抽样（已识别 BLOCKER/MAJOR/MINOR 共 9 类失败模式），下面是必做防御。

### 真实失败模式（抽样确认，非臆测）

**opendoc**：
- `<font color="...">`、`<br>`、`[text](url)` 嵌入参数说明列（auth3 模块密集出现，例：`kcbdu7-获取机构认证&授权页面链接.md` 行 31/40/51）
- 嵌套对象用表格缩进列表达，3-4 层深易错（例：`orgAuthConfig.orgInfo.legalRepInfo.psnIDCardType` 在同文件行 28-58）
- 参数表被 `:::warning` callout 块打断（例：`gd1tsb-上传印章图片.md` 行 83-86）
- 多个响应示例（企业/个人双例，例：`hlrs7s-查询认证授权流程详情.md` 行 76-129）
- 路径参数占位符 `{authFlowId}` 嵌在 URL 里需与参数表交叉验证
- 非接口型 md（名词解释、对接指南、场景说明）会被误解析

**Postman**：
- `request.url` 字符串和对象两种格式混用（同一 collection 内）
- `query` 数组里有 `"disabled": true` 的备选参数，不应作为真参数
- 大部分 request 的 `response: []` 为空

**ApiFox**：
- 自有格式（`apifoxProject`），不是 OpenAPI 兼容，schema 推断需谨慎
- 目录嵌套 5+ 层
- mock 配置和真实定义混在一起（`preProcessors` 等字段）

### Top-3 必做防御（拒绝过度工程化）

#### 防御 1：富文本清洗管线（成本 2h，opendoc 专用）

参数描述列提取后，强制过清洗：
- 去除 `<font>...</font>` / `<br>` / `<div>...</div>` / 其他 HTML 标签
- `[text](url)` → 保留 text，url 抽到独立 `references` 字段
- 保留 `**bold**` / `` `code` `` 等合理 markdown 标记
- 自检：清洗后字段内**禁止**残留 `<` / `>` 字符；命中即报错入 `_unparsed.jsonl`

#### 防御 2：嵌套参数树深度校验（成本 4h，opendoc 专用）

参数表解析时按列计算缩进深度（前导空白 `|` 列数），构建 parent-child 树：
- 规则：当前行的 parent = 前一行如果 `depth(prev) == depth(curr) - 1`
- **深度跳跃检测**：若 depth 从 1 直接跳到 3（中间缺层），整条接口标记 `tree-jump` 警告，进 `_unparsed.jsonl`，必须 PM 人工复验
- **宽度上限**：同级字段 > 30 个报警（八成是解析错了）
- **深度上限**：> 8 层报警

#### 防御 3：路径参数 + 多响应示例识别器（成本 3h，opendoc 专用）

- URL 扫描 `\{[a-zA-Z_]\w*\}` 占位符；与参数表"参数位置=path"的行**交叉验证**，不匹配则警告
- 响应示例区扫描所有 ` ```json ` 代码块；若 > 1，全量保留并标场景标签（不删减）
- JSON 示例如有 `// comment` 类污染，先 strip 再 `JSON.parse`，失败入 `_unparsed.jsonl`

### Postman / ApiFox 必做的轻量防御（成本 <2h 合计）

Postman：
- `url` 类型分支处理：`typeof === 'string'` 时先转 object（拆 host/path/query），再统一提取
- 只取 `disabled !== true` 的 query 参数
- folder_path 用 `/` 连接所有上级 `name`，深度不限

ApiFox：
- 通过有无 `items` 字段区分目录/接口（无 items 才是 leaf API）
- 跳过 `preProcessors` / `postProcessors` / mock 相关字段，只取 API 定义本体
- schema 版本检查：仅认 `apifoxProject: 1.0.0`，其他版本报错并停

### 解析器统一自检指标（每个解析器跑完输出 `_stats.json`）

| 指标 | opendoc 阈值 | Postman 阈值 | ApiFox 阈值 | 异常处理 |
|---|---|---|---|---|
| 总输入文件/记录数 | 377 | 139 | (按实际) | 不达数即报错 |
| 成功解析率 | ≥ 90% | ≥ 95% | ≥ 95% | < 阈值阻断 |
| `path` 字段非空率（接口型记录） | 100% | 100% | 100% | 任意一条空必报 |
| `method` 字段非空率 | 100% | 100% | 100% | 同上 |
| 参数表行平均字段数 | 4-5 | — | — | 偏离即怀疑解析错位 |
| 警告条目数（深度跳跃 / URL 不匹配 等） | < 20 | < 10 | < 10 | 超阈值人工复验 |
| `_unparsed.jsonl` 行数占比 | < 10% | < 5% | < 5% | 超阈值阻断 Phase 1 |

**阻断规则**：任一指标越红线，Phase 1 不启动，回到 Phase 0 修脚本。

### PM 抽样核验流程（Phase 0 完成后必做）

1. 解析器输出 `_index/_sample-review.html`：左边 md 原文截图、右边解析后 JSON，**分层抽样**：
   - 每个 opendoc 子目录抽 1 条（共 24 条）
   - 嵌套深度 ≥ 3 层的接口抽 5 条（覆盖最易错的场景）
   - `_unparsed.jsonl` 的失败项**全量**展示（不抽样）
2. PM 在 HTML 里逐条标 ✅ / ❌（点击勾选，导出为 `review-result.json`）
3. 若 ❌ 占比 > 10% → 解析器有系统性 bug，回炉重写
4. 若 ❌ < 10% 但有共性问题 → AI 下一轮针对性修，重跑
5. 若 ❌ < 5% 且分布零散 → 进 Phase 1，零散失败由 master endpoint index 的 `coverage` 列降级标注

### Golden 样本回归测试

PM 在抽样核验中**手工修正** 5-10 条 ❌ 记录 → 这些成为 `_index/_golden/*.json` 样本。后续每次解析器代码变更（修 bug、加防御），重跑前先对 golden 样本跑回归，**确保已修过的不会被新改动破坏**。这是低成本（一次性建立）+ 高保险的"回归网"。

### 验收升级

Phase 0 完成的判定条件（在原"4 个 JSON 总记录数 ≈ ..."基础上追加）：
- ✅ 三个解析器各自的 `_stats.json` 所有指标在阈值内
- ✅ PM 抽样核验 ❌ < 5%
- ✅ Golden 样本回归 100% 通过
- ✅ `_unparsed.jsonl` 内每条都有明确 `reason` 字段（不能是"unknown error"兜底）

---

## Phase 1：建立 master endpoint index（全局对齐表）

**输入**：Phase 0 的 4 个 JSON + 5 个 yaml

**输出**：`outputs/openapi-cleanup/_index/master-endpoint-index.md`，一张总表：

| yaml_module | yaml_operationId | path | method | opendoc_file | docking_postman_path | test_postman_path | apifox_path | coverage |

**匹配算法（三级回退）**：
1. **精确**：`path + method` 完全相同 → 命中
2. **变量归一化**：把 postman 里 `{{var}}` 和 hex/id 段统一替换为 `{xxx}` 后再比对（例：`/v3/persons/7ffca.../authorized-info` → `/v3/persons/{xxx}/authorized-info`）
3. **语义兜底**：`yaml.summary` vs `postman.name` / `opendoc.title` 字符串相似度 > 0.7 时标 `?suspect`，PM 人工裁决

**孤儿端点**（原始数据有 / yaml 无）和**幽灵端点**（yaml 有 / 三源全无）单独列两节，PM 决定补入或删除。

**验收**：103 paths 全部有一行；每行至少一个原始数据列非空；PM 通读确认后才进 Phase 2。

---

## Phase 2：单模块清洗循环（按 yaml 文件）

**输入**：1 个 yaml + Phase 0 JSON 对应切片

**动作**：对 yaml 内每个 operation，按 4 层逐层比对：

| 层 | 比对内容 | 真值序列（测试覆盖） | 真值序列（测试未覆盖） |
|---|---|---|---|
| L1 | `path` + `method` | 测试 > 对接 > opendoc | 对接 > opendoc |
| L2 | 参数清单（query/path/header/body 各位置） | 同上 | 同上 |
| L3 | 每参数的 required / type / enum | 同上 | 同上 |
| L4 | 响应字段集合 + errorCodes | 同上 | 同上 |

**差异分级**：
- L1 错 = `BLOCKER`
- L2-L3 = `MAJOR`
- L4 = `MINOR`
- 三源一致但 yaml 不同 = `HIGH-CONF`（强烈建议）
- 三源冲突 = `CONFLICT`（默认进 Phase 5 候选池）

---

## Phase 3：diff-report.md 精确结构

每模块一份 `outputs/openapi-cleanup/[module]-diff-report.md`。

**表头**：

```
| # | API名 | path | method | 差异层级 | 差异类型 | opendoc值 | 对接Postman值 | 测试值 | AI推荐值 | 置信度 | 测试覆盖 | PM决策 | 备注 |
```

**差异类型枚举**：`path-mismatch` / `method-mismatch` / `param-missing` / `param-extra` / `required-flip` / `type-mismatch` / `enum-mismatch` / `response-field-missing` / `errcode-missing`

**置信度（★1-5）**：
- ★★★★★ 三源一致且与 yaml 冲突 — 闭眼改
- ★★★★ 测试覆盖 + 测试与对接一致
- ★★★ 仅测试一源，或 对接+opendoc 一致
- ★★ 仅 opendoc
- ★ 三源冲突

**测试覆盖列**：`✅` / `❌`（未覆盖时整行置信度降一级）

**PM 决策列**（在表格里手填单字符）：
- `A` = 采纳 AI 推荐
- `K` = 保持 yaml 原状
- `R` = 需实跑（进 Phase 5）
- `C:<value>` = 自定义值

**表前置块**：模块名 / yaml 路径 / ops 总数 / 差异行数 / BLOCKER:x MAJOR:y MINOR:z / 决策栏说明。

---

## Phase 4：落地修改 yaml

**输入**：PM 填好"决策"列的 diff-report.md

**动作**：
1. **预校验基线**：`npx @redocly/cli lint openapi/[module].yaml`，记录基线告警数（yaml 头已写"多处不合规项"，预期有告警，只看是否新增）
2. **解析 diff-report**：简易脚本读 markdown 表格，抽 `决策 ∈ {A, C:...}` 的行（K/R 跳过）
3. **修改 yaml**：原地编辑，不留 `# CHANGED` 注释（依赖 git diff）；强约束：一次只改一个 module
4. **后校验**：`npx @redocly/cli lint` + `bundle`，告警数不超基线
5. **Closeout**：`git add openapi/[module].yaml outputs/openapi-cleanup/[module]-diff-report.md` → commit `chore(openapi): clean [module]-api against 3 sources` → 在 `outputs/openapi-cleanup/CHANGELOG.md` 追加 `[module] | N 项 | A:x K:y C:z R:w | <sha>`

---

## Phase 5：实跑兜底（按需触发）

**触发**：diff-report 决策列出现 `R`（预计 <10 endpoints）

**环境前置**（2026-05-22 已检测）：
- ✅ Node 24.14 / npm 11.9 / npx 11.9 已就位
- ❌ newman 未安装（全局包仅 claude-code / github copilot / pnpm）
- **决策：推迟安装**，Phase 5 真正触发时用 `npx newman run ...` 临时拉取，避免现在做用不上的环境配置
- 若 Phase 5 内调用 ≥ 3 次，再考虑 `npm install -g newman` 加速

**动作**：
1. PM 在 `outputs/openapi-cleanup/_runtime/.env` 提供 sandbox appkey
2. 用 **newman**（postman cli）跑对接 postman 对应 request：`npx newman run docking.postman_collection.json --folder "<request-name>" -e sandbox.env`
3. response 抓到 `outputs/openapi-cleanup/_runtime/[module]-[opId].json`
4. 在 diff-report 临时加 `runtime 值` 列，PM 重新决策 `A/C:`

**为什么选 newman 而非 curl**：对接 postman 已有 body 模板和 header，newman 直接复用，省去手写 curl 转义。

---

## 关键决策点（已敲定）

1. **opendoc 解析方式**：PM 跑一次性 Node 脚本（AI 下一轮交付草稿）。377 md × 5k token ≈ 200 万 token，AI 直读必爆；md 结构规整，正则 + 表格切分 < 200 行搞定
2. **Postman collection 解析**：直接读 JSON，Phase 0 解析器输出即切片化 JSON
3. **起步模块**：**auth-api**（7 paths，包含 GET+POST + path/query/body 三种参数位置，覆盖度最广，学习价值最高）
4. **大模块拆批**：sign-api（36 paths）按 tag 分 2-3 sub-batch（发起签署 / 查询 / 抄送）

**总工作量预估**：
- Phase 0（脚本交付 + PM 跑 + 抽样验证）→ 1-2 轮
- **Phase 0.5（防错与自检）→ 已合入 Phase 0，脚本设计阶段同步交付，不额外占轮次**
- Phase 1（对齐表）→ 1-2 轮
- Phase 2-4：auth(2) + member(2) + seal(3) + file-template(3) + sign(4) ≈ **14 轮**
- Phase 5 实跑 → 1-2 轮
- **总计约 18-22 轮对话**

**模块排期与 F003 依赖**：

| 顺序 | 模块 | paths | F003 依赖 | 何时启动 |
|---|---|---|---|---|
| 1 | auth-api | 7 | 无 | Phase 0/1 后立即 |
| 2 | member-api | 8 | 无 | auth 完成后 |
| 3 | seal-api | 26 | 无 | member 完成后 |
| 4 | file-template-api | 26 | 无 | seal 完成后 |
| 5 | **sign-api** | **36** | **强依赖 F003 测试 postman** | **F003 到位后，按 tag 拆 2-3 sub-batch** |

如果 F003 到 sign-api 启动前仍未到位，可选两种降级路径：
- **A 推迟**：等 F003 补齐再做 sign-api（推荐，保证清洗质量一致）
- **B 降级跑**：sign-api 全模块按"测试未覆盖"分支处理（`对接Postman > opendoc`），同时在 diff-report 顶部标"⚠️ F003 缺失，本批次未启用测试源仲裁，建议 F003 到位后做二次复核"

**上下文容量自检**：
- auth-api：7 ep × 3 源 × 1KB = 21KB ≈ 6k token + yaml 20k = 26k（安全）
- sign-api：单批 60k token 仍在 200k 之内，但建议 sub-batch

---

## F003 体量分级应对方案（应对未到位的签署测试 postman）

### 关键发现（实测，非估算）

抽样 `实名常用.postman_collection.json`（19MB / 86 req）测真实 token 密度：

- **每 request 解析后 ~20 token**（仅保留 method/url/headers/query/body/example_response），86 req 全量切片仅 **1.6k token**
- 19MB 体积主要来源：base64 附件、多次响应快照、postman GUI 元数据——这些都不进切片
- 对照 SaaS_V3 对接 postman 的"合同文件签署服务API"folder：64 requests / 291KB（4.5KB/req），切片后更小

**结论**：F003 的真正瓶颈**不是上下文 token**，而是：
1. 解析器 `JSON.parse` 大文件可能 OOM（Node 默认堆 1.7GB，理论能扛 200MB+ 但 GC 卡顿）
2. git 提交时单文件 > 50MB 触发 warning，> 100MB 直接 reject
3. PM 难以人工抽查（编辑器打开慢、search/replace 卡）

### sign-api.yaml 内部结构（已实测）

36 paths / 62 endpoints（含回调），分 4 个业务阶段：
- **业务发起类** 20 ep：签署发起(4) / 文件操作(8) / 流程操作(4) / 其他(4)
- **查询类** 8 ep：流程查询(3) / 审批查询(2) / 下载(3)
- **证照类** 6 ep：出证(4) / 验签(2)
- **回调类** 19 ep：签署回调(12) / 审批回调(5) / 其他(2)

这给 sub-batch 提供了天然切分边界。

### 三档分级方案

| 维度 | S 档 (<30MB) | M 档 (30-80MB) | L 档 (>80MB) |
|---|---|---|---|
| **预估 F003 req 数** | <100 | 100-200 | >200 |
| **文件预切** | 否 | 否 | 按 sub-folder 切 4-8 份 |
| **解析器策略** | `JSON.parse` 一把梭 | `JSON.parse` + 解析后按 tag 输出多文件 | **流式解析**（`stream-json` 或 `oboe.js`），避免一次性 load |
| **postman-test.json 输出** | 单文件 < 2MB | 单文件 2-5MB（仍可 grep） | **按 tag 拆 4-8 个**：`postman-test-sign-launch.json` / `postman-test-sign-query.json` / ... |
| **Phase 2 sub-batch 数** | 1（整 sign-api 一次过） | 4（业务/查询/证照/回调） | 8（每 sub-folder 一批） |
| **每 sub-batch 上下文** | ~60k token（按原方案） | ~15k token | ~8k token |
| **对话轮数** | 4 轮 | 4-5 轮 | 8-10 轮 |
| **git 提交策略** | 整 yaml 一次提交 | 按 sub-batch 提交 4 次 | 按 sub-batch 提交 8 次 + F003 文件用 Git LFS |
| **新增开发成本** | 0 | +1-2h（vs S 档） | +半天（流式解析 + 预切脚本） |

### 快速估容动作（PM 拿到 F003 后 5 分钟判定）

PowerShell 一句话判档位：

```powershell
$mb = [int]((Get-Item 'F003路径').Length / 1MB)
$file = Get-Content -Raw 'F003路径' | ConvertFrom-Json
$reqs = ($file.item | Measure-Object).Count  # 顶层 folder/req 计数，需递归才精准
Write-Host "Size: ${mb}MB"
if ($mb -lt 30) { 'S档：原方案直接用' }
elseif ($mb -lt 80) { 'M档：解析器加 tag 分片输出' }
else { 'L档：解析器改流式 + 预切文件' }
```

如果 `ConvertFrom-Json` 自身就 OOM 或耗时 > 30s → 直接判 L 档，不用看大小。

### 预防性建议（不等 F003 也能做）

1. **Phase 0 解析器从一开始就按 M 档设计**（tag 分片输出能力默认开启，输出多文件而非单文件），这样 F003 来了 S/M 都直接吃下，只有 L 档才需升级
2. **postman 解析器输出格式预留扩展位**：每条记录加 `source_file`、`sub_folder_path` 字段，便于后期按维度过滤切片
3. **F003 文件不进 git**：先约定放 `assets/` 但加 `.gitignore` 排除（避免 push 失败），或预先准备 Git LFS 配置

### 决策（已敲定 2026-05-22）

**Phase 0 解析器按 M 档默认实现**：
- postman 解析器默认输出"按 tag 分片"的多 JSON 文件（如 `postman-test-sign-launch.json` / `postman-test-sign-query.json` / ...），而非单一大文件
- 每条记录附加 `source_file` / `sub_folder_path` / `tag` 字段，便于后期按维度过滤切片
- 开发成本 +1-2h（vs S 档），换 F003 到位后无需返工
- 若 F003 实际是 L 档（>80MB），仅需补"流式解析"层，分片输出逻辑可复用

---

## Critical Files

- `openapi/auth-api.yaml` — 起步模块，7 paths，参数位置最全
- `openapi/member-api.yaml` — 第二轮，8 paths，同质化高可批量
- `openapi/seal-api.yaml` — 26 paths
- `openapi/file-template-api.yaml` — 26 paths
- `openapi/sign-api.yaml` — 最大模块，36 paths，需 sub-batch
- `assets/opendoc/` — 377 md，Phase 0 解析重点
- `assets/对接技术人员提供的完整postman文件/SaaS_API_V3版系列产品.postman_collection.json` — 覆盖最广的中置信真值
- `assets/测试提供的postman和apifox文件/实名常用.postman_collection.json` — 86 requests，最高优先级（测试维护）
- `assets/测试提供的postman和apifox文件/流程模板+文件模板.apifox.json` — apifox 导出，1.3MB
- **`assets/测试提供的postman和apifox文件/[F003-签署测试文件]`** — ⏳ 待 PM 补充，sign-api 模块强依赖
- `outputs/openapi-cleanup/` — 本方案所有中间产物输出根目录（待建）

---

## Verification

**Phase 0 完成验证**：
```bash
ls outputs/openapi-cleanup/_index/
# 应有 opendoc.json / postman-docking.json / postman-test.json / apifox.json
wc -l outputs/openapi-cleanup/_index/_unparsed.jsonl  # 应 < 总数 5%
```

**Phase 1 完成验证**：手工通读 `master-endpoint-index.md`，确认 103 paths 全有一行；孤儿/幽灵端点章节 PM 已批注

**Phase 4 单模块完成验证**：
```bash
npx @redocly/cli lint openapi/[module].yaml  # 告警数不超基线
npx @redocly/cli bundle openapi/[module].yaml -o /tmp/test.yaml  # 能成功打包
git log --oneline openapi/[module].yaml  # 有 chore(openapi): clean [module] 提交
```

**全流程完成验证**：5 个 yaml 都有对应的 diff-report.md + commit；`outputs/openapi-cleanup/CHANGELOG.md` 5 行汇总；redocly lint 全部不增加告警

---

## 起步动作（下一步该做什么）

1. **本轮结束** → PM 退出 plan 模式确认方案
2. **下一轮** → 我交付 Phase 0 三个解析脚本草稿（opendoc / postman / apifox），PM review
   - 脚本设计支持 postman 解析器**幂等重跑**，F003 到位后只需 PM 把文件放进 `assets/测试提供的postman和apifox文件/` 重跑即可，无需等齐再启动
3. **PM 本地跑脚本**（不占对话） → 产出 `outputs/openapi-cleanup/_index/*.json`
4. **再下一轮** → 进入 Phase 1，产出 `master-endpoint-index.md`（缺 F003 时 sign-api 行的 `test_postman_path` 列留空，到位后补回）
5. **之后** → 按 auth → member → seal → file-template 顺序循环 Phase 2-4；sign-api 等 F003 就位后再启动（或走降级路径 B）
