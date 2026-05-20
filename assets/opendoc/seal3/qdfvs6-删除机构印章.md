> [**必须确保企业用户已授予平台appId获取其印章资源管理的权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)
>
> + **manage_org_seal - 授权允许获取企业/组织用户的印章的查询、新增、编辑、授权、删除权限**
>

### 接口描述
指定机构账号以及印章ID，来删除机构印章。

:::warning
+ **<font style="color:#E8323C;">请谨慎操作</font>**<font style="color:#E8323C;">，删除后印章相关的授权记录将会一并删除，且无法恢复。</font>
+ 企业默认印章不可被删除（默认印章只有一个）；
+ 审核中的图片印章不可被删除；
+ e签宝自动创建的非默认印章可以删除，但不会触发回调通知。（例如合同专用章<font style="color:rgb(0, 0, 0);">、人事专用章、财务专用章</font>）。

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/seals/org-seal?orgId=xx&sealId=xx

**请求方法：**DELETE

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 是 | query | 机构账号ID<br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询 |
| <font style="color:rgb(64, 64, 64);">sealId</font> | string | 是 | query | 印章ID |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data | | | | | string | 否 | 业务数据 |
|  | sealStatus | | | | string | 否 | 删除印章状态 <br/>**delete** - 已删除（该印章之前<font style="color:#DF2A3F;">未被使用过</font>，完全删除）<br/>**revoke** - 已吊销（该印章之前<font style="color:#DF2A3F;">被使用过</font>，用印记录保留） |


### 请求示例
```http
DELETE https://openapi.esign.cn/v3/seals/org-seal?orgId=0c5bd4**fbf&sealId=XXX
```

### 响应示例
```json
{
    "message": "成功",
    "code": 0,
    "data": {
        "sealStatus": "delete"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gqgb0gwznb2su405)

