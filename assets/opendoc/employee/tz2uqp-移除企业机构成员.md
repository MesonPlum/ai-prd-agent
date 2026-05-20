> [**必须确保企业用户已授予平台appId获取其组织成员的管理权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/kcbdu7)
>
> + **manage_org_member- 授权允许获取企业/组织用户的组织成员的查询、新增、编辑、删除权限**
>

### 接口描述
用于将企业成员从企业机构中移除，支持批量移除多个成员账号（一次至多移除10个）。

:::info
+ <font style="color:#000000;">当企业成员角色为企业管理员时无法通过此接口移除</font>。

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/organizations/{orgId}/members

**请求方法：**DELETE

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;"></font>** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 是 | path | 机构账号ID<br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询 |
| memberPsnIds | string | 是 | <font style="color:rgb(64, 64, 64);">query</font> | 需移除的个人账号ID列表<br/><font style="color:#E8323C;">【注】</font><br/>+ 成员个人账号ID请使用：[【查询企业成员列表】](https://open.esign.cn/doc/opendoc/employee/bzrzic)接口获取<br/>+ 多个账号使用英文逗号分隔 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
| | deletedMembers | | | | list | 否 | 本次移除成功的成员列表 |
| | undeletedMembers<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | array | 否 | 本次移除失败的成员列表 |
| | | psnId | | | string | 否 | 个人账号ID |
| | | failedReason | | | string | 否 | 移除失败的原因，原因文案如下：<br/>+ <font style="color:rgb(23, 26, 29);">用户不是企业成员</font><br/>+ <font style="color:rgb(23, 26, 29);">用户不存在</font> |


### 请求示例
```json
DELETE https://openapi.esign.cn/v3/organizations/3c40c*****940279134e7/members?memberPsnIds=50d5eda*****0b1bd29c,00371e8******1ed09
```

### 响应示例
```json
{
    "message":"成功",
    "code":0,
    "data":{
        "deletedMembers":[
            "d3fcf19***0ddc60a13",
            "501a277***6b19b7211"
        ],
        "undeletedMembers":[
        ]
    }
}
```

```json
{
    "message": "成功",
    "code": 0,
    "data": {
        "deletedMembers": [],
        "undeletedMembers": [
            {
                "psnId": "5288e5*******45b80256c",
                "failedReason": "用户不存在"
            }
        ]
    }
}
```

### 错误码
[**点击查看错误码**](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/ckh528ox9a1k9u07#oLL36)

