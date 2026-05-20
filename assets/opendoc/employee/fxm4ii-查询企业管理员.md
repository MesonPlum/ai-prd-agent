> [**必须确保企业用户已授予平台appId获取其组织成员的管理权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/kcbdu7)
>
> + **manage_org_member- 授权允许获取企业/组织用户的组织成员的查询、新增、编辑、删除权限**
>

### 接口描述
用于查询`**<font style="color:#FA8C16;">orgId</font>**`企业机构下的管理员信息。

:::info
+ 企业机构默认管理员角色为首次操作企业实名认证的经办人员。企业机构实名认证通过后，自动将经办人设置为企业管理员。
+ <font style="color:#000000;">如需变更企业机构的管理员，请登录e签宝SaaS官网操作</font>[管理员转授](https://help.esign.cn/detail?id=cgephk&nameSpace=cs3-dept%2Fexboae&searchText=%E4%BC%81%E4%B8%9A%E7%AE%A1%E7%90%86%E5%91%98)<font style="color:#000000;">。</font>

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/organizations/{orgId}/administrators

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;"></font>** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 是 | path | 机构账号ID<br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | administrators<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | array | 否 | 企业管理员信息 |
| |  | psnId | | | string | 否 | 管理员账号ID |
| | | psnName | | | string | 否 | 管理员实名姓名 |
| | | psnAccount | | | object | 否 | 管理员账号标识 |
| | |  | accountMobile | | string | 否 | 管理员手机号（账号标识，用于登录e签宝官网） |
| | | | accountEmail | | string | 否 | 管理员邮箱地址（账号标识，用于登录e签宝官网） |
| | | employeeNum | | | string | 否 | 员工编号 |
| | | memberName | | | string | 否 | 员工姓名/昵称 |


### 请求示例
```http
GET https://openapi.esign.cn/v3/organizations/0c5bd**8bfbf/administrators
```

### 响应示例
```json
{
    "message": "执行成功",
    "code": 0,
    "data": {
        "administrators": [
            {
                "psnId": "c7e002***541e7",
                "psnAccount": {
                    "accountMobile": "183****0101",
                    "accountEmail": null
                },
                "employeeNum": "01",
                "memberName": "赵经理",
                "psnName": "赵四"
            }
        ]
    }
}
```

### 错误码
[**点击查看错误码**](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/ckh528ox9a1k9u07#nMEgC)

