> [**必须确保企业用户已授予平台appId获取其印章资源管理的权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)
>
> + **manage_org_seal - 授权允许获取企业/组织用户的印章的查询、新增、编辑、授权、删除权限**
>

### 接口描述
当原授权书的签署链接失效，或未签署完成，可重新获取授权书的签署链接，接口支持查询的范围：

+ 印章授权企业内部成员时，《电子签章授权书》的签署链接。
+ 跨企业印章授权时，《电子印章跨企业委托使用授权书》的签署链接。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/seals/org-seals/authorization-sign-url?orgId=xx&sealAuthBizId=xx

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 是 | query | 机构账号ID<font style="color:#DF2A3F;">（委托单位）</font><br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询 |
| sealAuthBizId | string | 是 | query | 授权业务流程编号（通过[【内部成员授权】](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/fu6ov5)或[【跨企业授权】](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/qkxyha)接口获取） |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | authorizationSignShortUrl | | | | string | 否 | 授权书签署短链接<font style="color:#E8323C;">（有效期180天）</font> |
| | authorizationSignUrl | | | | string | 否 | 授权书签署长链接<font style="color:#E8323C;">（永久有效）</font> |


### 请求示例
```http
GET https://openapi.esign.cn/v3/seals/org-seals/authorization-sign-url?orgId=xxx&sealAuthBizId=xxx
```

### 响应示例
```json
{
    "message": "成功",
    "code": 0,
    "data": {
        "authorizationSignShortUrl": "https://t.esign.cn/hd**v1",
        "authorizationSignUrl": "https://h5.esign.cn/mesign/guide?context=Nksbcxa&flowId=0d46****89889dce16966b8&organ=true&appId=5****5&linkSource=1&bizType=1&tsign_source_type=SIGN_LINK_XUANYUAN&tsign_source_detail=1vGqUyZBm8k4aIosgUEaAJ40lsE7AJ7F9iSLvM9qrkC28h11ZZUbSoIipVsi%2BtbjwrVJo2n0cjgeEFrWTVKT8mOocb7oM8s2EIx3JuKOt16arLi98Q0TRUjf3JROLf08nYE2XOMSuPrevLzSmwsVj1GKu4v0VKzqOOcpKoj%2BeAuhvQL6l1mXSrTXXZ0kmK5bXfbgH%2F2tW0rbfa3iyzlHvb%2FCYLKwiQ5xvOEghorX0i2eypB%2Frf"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gqgb0gwznb2su405)

