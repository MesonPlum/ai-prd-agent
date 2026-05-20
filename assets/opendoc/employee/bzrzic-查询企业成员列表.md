> [**必须确保企业用户已授予平台appId获取其组织成员的管理权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/kcbdu7)
>
> + **manage_org_member- 授权允许获取企业/组织用户的组织成员的查询、新增、编辑、删除权限**
>

### 接口描述
用于查询`**<font style="color:#FA8C16;">orgId</font>**`企业机构下的所有成员信息。

### 接口地址&请求方法
接口地址：https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/organizations/{orgId}/member-list?pageNum=1&pageSize=100

请求方法：GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;"></font>** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 是 | path | 机构账号ID<br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询 |
| pageNum | int32 | 是 | query | 查询页码 |
| pageSize | int32 | 是 | query | 单页展示的最大数量，最大100 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
| | total | | | | int32 | 否 | 查询成员总数 |
| | members<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | array | <font style="color:rgb(23, 43, 77);">否</font> | 企业成员信息列表 |
| | | psnId | | | string | 否 | 个人账号ID |
| | | psnName | | | string | 否 | 企业成员已实名的姓名 |
| | | psnAccount | | | object | 否 | 个人用户账号标识 |
| | |  | accountMobile | | string | 否 | 手机号（账号标识，用于登录e签宝官网） |
| | | | accountEmail | | string | 否 | 邮箱地址（账号标识，用于登录e签宝官网） |
| | | employeeNum | | | string | 否 | 员工编号 |
| | | memberName | | | string | 否 | 姓名（昵称） |
| | | role | | | string | 否 | 成员角色，多个角色英文逗号隔开<br/>1 - 普通成员<br/>2 - 印章保管员（可以对企业印章进行创建、删除、修改、查询等操作）<br/>3 - 成员管理员（可以对企业成员进行添加、移除、修改、查询等操作）<br/>4 - 模板管理员（可以对模板进行复制、新增、删除、开启、关闭、查询等操作）<br/>98 - 企业法定代表人<br/>99 - 企业管理员 |
| | | departments | | | array | 否 | 员工所在部门信息（部门在e签宝官网设置，[点击查看](https://help.esign.cn/detail?id=gn8h28&nameSpace=cs3-dept%2Fexboae&page=pol9i)如何新增部门）<br/>+ 多个部门返回列表，无部门返回空 |
| | | | departmentId | | string | 否 | 所在部门ID |
| | | | departmentName | | string | 否 | 所在部门名称 |


### 请求示例
```http
GET https://openapi.esign.cn/v3/organizations/xxx/member-list?pageNum=1&pageSize=100
```

### 响应示例
```json
{
    "message": "成功",
    "code": 0,
    "data": {
        "total": 3,
        "members": [
            {
                "psnId": "626629f****99f1d8c1d",
                "psnAccount": {
                    "accountMobile": "166****61",
                    "accountEmail": null
                },
                "employeeNum": "002",
                "memberName": "Lisa",
                "psnName": "李四",
                "role": "1,2,3",
                "departments": [
                    {
                        "departmentId": "796dc79000*****633be9915f2",
                        "departmentName": "交付组"
                    },
                    {
                        "departmentId": "867720d200****2071e543202349",
                        "departmentName": "护航组"
                    },
                    {
                        "departmentId": "a136e48331c****0afa2cf95d30a",
                        "departmentName": "项目交付部"
                    }
                ]
            },
            {
                "psnId": "50d5eda****0b1bd29c",
                "psnAccount": {
                    "accountMobile": "152****64",
                    "accountEmail": "W****.cn"
                },
                "employeeNum": "003",
                "memberName": "Sum",
                "psnName": "王五",
                "role": "1",
                "departments": []
            },
            {
                "psnId": "7ffcaed8*****ef0a8f6",
                "psnAccount": {
                    "accountMobile": null,
                    "accountEmail": "Z***.cn"
                },
                "employeeNum": null,
                "memberName": "Zoey",
                "psnName": "张三",
                "role": "1,98,99",
                "departments": []
            }
        ]
    }
}
```

### 错误码
[**点击查看错误码**](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/ckh528ox9a1k9u07#D5pCa)

