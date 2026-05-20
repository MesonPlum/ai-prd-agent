### 接口描述
用于确认e签宝SaaS账号下，某个个人用户是否为某个企业/机构的成员。

:::warning
<font style="color:#DF2A3F;">注：该接口可以不提前做认证授权。</font>

:::

### 接口地址&请求方法
接口地址：https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/organizations/member

请求方法：GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;"></font>** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 是 | query | 机构账号ID（企业的e签宝SaaS账号）<br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询 |
| psnId | string | 是 | query | 个人账号ID（个人的e签宝SaaS账号）<br/><font style="color:#E8323C;">【注】</font><br/>+ 用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询个人认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/vssvtu)接口通过个人账号标识（手机号或邮箱）/个人用户的证件号进行查询；<br/>+ 当一个人存在多个e签宝账号，只校验证件号是同一个，则认为其存在于该企业中。例如：张三使用手机号注册个人账号A，加入甲企业。张三又使用邮箱注册个人账号B，那么使用账号B查询，返回结果也是张三在甲企业中的。 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
| | memberCheck | | | | boolean | 否 | 个人用户是否在企业中<br/>+ true - 在企业中<br/>+ false - 不在企业中 |
| | organLegalCheck | | | | boolean | 否 | 个人用户是否为企业法定代表人<br/>+ true - 是<br/>+ false - 否 |
| | adminCheck | | | | boolean | 否 | 个人用户是否为企业管理员<br/>+ true - 是<br/>+ false - 否 |


### 请求示例
```http
GET https://openapi.esign.cn/v3/organizations/member?orgId=3c4047cc3****0279134e7&psnId=626629f48****f1d8c1d
```

### 响应示例
```json
{
    "message": "成功",
    "code": 0,
    "data": {
        "memberCheck": true,
        "adminCheck": true,
        "organLegalCheck": false
    }
}
```

### 错误码
[**点击查看错误码**](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/ckh528ox9a1k9u07#vcgHr)

