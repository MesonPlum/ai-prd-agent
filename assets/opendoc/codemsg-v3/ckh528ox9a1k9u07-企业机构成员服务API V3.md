:::warning
**<font style="color:#DF2A3F;">注：</font>**

<font style="color:#DF2A3F;">错误信息描述中的 </font>**<font style="color:#DF2A3F;">%s</font>**<font style="color:#DF2A3F;">：代表具体的参数值。例如：“参数错误:%s”，其中 </font>**<font style="color:#DF2A3F;">%s</font>**<font style="color:#DF2A3F;"> 实际会返回请求参数中传入的某个具体值。</font>

:::

# <font style="color:rgb(51, 51, 51);">成员管理</font>
## 添加企业机构成员
POST <font style="color:rgb(64, 64, 64);">/v3/organizations/{orgId}/members</font>

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1499000 | 用户未授权： {orgId}, manage_org_resource |
| 1000000 | %s |
| 10000001 | 系统异常,请重试或联系e签宝服务人员 |
| 10000007 | 参数错误:%s |
| 1499014 | 角色不存在:%s |


## 移除企业机构成员
<font style="color:rgb(64, 64, 64);">DELETE</font> <font style="color:rgb(64, 64, 64);">/v3/organizations/{orgId}/members</font>

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1499000 | 用户未授权： {orgId}, manage_org_resource |
| 1000000 | %s |
| 10000001 | 系统异常,请重试或联系e签宝服务人员 |
| 10000007 | 参数错误:%s |


## 查询企业成员列表
GET <font style="color:rgb(64, 64, 64);">/v3/organizations/{orgId}/member-list?pageNum=1&pageSize=100</font>

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1499000 | 用户未授权： {orgId}, manage_org_resource |
| 1000000 | %s |
| 10000001 | 系统异常,请重试或联系e签宝服务人员 |
| 10000007 | 参数错误:%s |


## 查询企业管理员
GET <font style="color:rgb(64, 64, 64);">/v3/organizations/{orgId}/administrators</font>

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1499000 | 用户未授权： {orgId}, manage_org_resource |
| 1000000 | %s |
| 10000001 | 系统异常,请重试或联系e签宝服务人员 |
| 10000007 | 参数错误:%s |


## 查询个人用户是否为企业成员
GET /v3/organizations/member

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1499000 | 用户未授权： {orgId}, manage_org_resource |
| 1435203 | 账号不存在或已注销 :{orgId} |
| 1499004 | psnId不能为空 |
| 72000046 | 请求参数错误: 授权主体orgId不能为空 |


# 成员角色管理
## 添加成员角色
POST <font style="color:rgb(64, 64, 64);">/v3/organizations/{orgId}/member/add-role</font>

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1499000 | 用户未授权： {orgId}, manage_org_resource |
| 1499014 | 角色不存在:%s |
| 1499013 | 用户未实名 |
| 1499017 | 用户不属于该企业，无法修改角色 |
| 1499004 | %s不能为空 |


## 删除成员角色
<font style="color:rgb(64, 64, 64);">POST /v3/organizations/{orgId}/member/delete-role</font>

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1499000 | 用户未授权： {orgId}, manage_org_resource |
| 1499014 | 角色不存在:%s |
| 1499013 | 用户未实名 |
| 1499017 | 用户不属于该企业，无法修改角色 |
| 1499004 | %s不能为空 |


