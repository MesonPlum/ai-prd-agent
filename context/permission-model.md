# 权限模型定义

> **AI 使用说明**：撰写 PRD 的"权限控制"章节时,以此文件为准。

---

## 权限模型类型

**当前产品采用**：ABAC(基于属性的访问控制)

授权和资源隔离基于多维属性组合判断,核心属性是 **appId**(集成方应用)和 **authorizedScopes**(用户授权范围)。

---

## 主体维度

| 主体类型 | 说明 |
|---|---|
| appId | 集成方应用,平台资源归属和权限校验的最小单位。每次 API 调用须携带 appId。 |
| 租户(企业) | appId 的归属方。同租户下可能有多个 appId,但 appId 之间默认资源隔离。 |
| 用户(psnId / orgId) | 被操作的资源主体,授权后允许特定 appId 访问其资源。 |

**主体关系**：

```
租户(企业)
  ├── appId A ────┐
  ├── appId B    ├── 跨 appId 资源隔离(默认)
  └── appId C ────┘

用户(psnId/orgId) ──授权──> appId
                              │
                              └── 通过 authorizedScopes 限定操作范围
```

---

## 资源授权(authorizedScopes)

通过 authorizedScopes 控制 appId 对用户资源的操作范围,授权关系由用户通过认证授权流程(authFlowId)显式同意。

**常见授权范围**：

| Scope 值 | 含义 |
|---|---|
| get_org_identity_info | 查询机构认证信息 |
| get_psn_identity_info | 查询个人认证信息 |
| org_initiate_sign | 代表机构发起签署 |
| psn_initiate_sign | 代表个人发起签署 |
| manage_org_seal | 管理机构印章 |
| manage_psn_seal | 管理个人印章 |
| ...... | 完整清单见 auth3 接口文档 |

> **授权有效期**:authFlowId 有效期 30 天,过期需重新引导用户走授权流程。

---

## 校验规则

| 规则 | 说明 |
|---|---|
| V3 接口强制校验 | 当 appId ≠ 7488 且接口路径含 `/v3/` 时,平台校验该 appId 是否具有目标用户资源对应的 authorizedScopes |
| 平台超管 appId | appId = 7488 跳过 authorizedScopes 校验(平台内部应用) |
| 跨 appId 资源隔离 | appId A 创建的签署流程/文件模板/流程模板/印章授权关系,默认 appId B 不可见、不可操作 |
| 多租户隔离 | 跨租户(跨企业)默认完全隔离,任何资源不可见 |

---

## 数据范围粒度

| 范围层级 | 说明 |
|---|---|
| 平台级 | appId = 7488(超管)可跨租户跨 appId 访问 |
| 租户级 | 同租户下的不同 appId 默认隔离(可通过特殊配置开放,如生态伙伴场景) |
| appId 级 | 资源(签署流程、模板、印章授权)默认归属创建它的 appId |
| 用户级 | 用户资源(认证信息、个人印章)由用户授权特定 appId 访问 |

---

## 业务流程角色

> 流程内角色(SEAL_EXAMINER、SEAL_USER、经办人、签署方、抄送方等)用于描述"在某个流程里谁负责哪一步",**不属于权限模型范畴**。
> 这些角色不影响 appId 是否能调用 API,只影响业务流程的状态机推进。
>
> 完整定义见 [business-glossary.md §参与方角色](business-glossary.md)。

---

## PRD 中引用方式

在 PRD 的"权限控制"章节,按以下格式填写：

```markdown
## 权限控制

权限模型:ABAC(参考 context/permission-model.md)

| 操作 | 校验条件 | 备注 |
|---|---|---|
| (具体接口或操作) | 需要 authorizedScopes 包含 [scope 值] | (说明) |
```

---

## 待补充事项

> 以下内容超出 E-001 录入范围,需后续 PRD 录入或 PM 主动补充时完善。

- 企业内部成员(employee)的角色矩阵:管理员 / 普通成员 / 部门管理员等的权限粒度差异
- 平台运营人员(P2 用户画像)的角色定义和操作审批链路
- 生态伙伴场景的跨租户授权机制
- 完整 authorizedScopes 清单及各 scope 对应的接口列表
