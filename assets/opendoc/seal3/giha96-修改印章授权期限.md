> [**必须确保企业用户已授予平台appId获取其印章资源管理的权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)
>
> + **manage_org_seal - 授权允许获取企业/组织用户的印章的查询、新增、编辑、授权、删除权限**
>

### 接口描述
基于原印章授权（企业内授权或跨企业）所保留的授权业务流程编号（包含已过期的流程），重新修改印章授权的有效期限。

:::info
+ 通过接口重新修改授权有效期后，授权操作人需重新签署授权书；
+ 通过接口重新修改授权有效期后，原有保留的授权业务流程编号、授权书签署链接将失效。

:::

**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/seals/org-seals/reauthorization

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;"></font>** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 是 | body | 机构账号ID<br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询 |
| transactorPsnId | string | 是 | body | 授权操作人账号ID （指企业法定代表人或企业管理员） |
| sealAuthBizId | string | 是 | body | 原授权业务流程编号 |
| longTermEffective | boolean | 否 | body | 印章授权是否长期有效（不限制授权时间），默认false<br/>**true** - 是<br/>**false** - 否<br/><font style="color:#F5222D;">【注】</font>当传true时，不能再传effectiveTime和expireTime，否则会报错：“设置为长期有效无需传入生效和失效时间”。 |
| effectiveTime | int64 | 否 | body | 印章授权生效时间（[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)格式：单位毫秒）<br/>**<font style="color:#DF2A3F;">【注】当longTermEffective是false时，该字段必传</font>** |
| expireTime | int64 | 否 | body | 印章授权失效时间（[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)格式，单位毫秒）<br/>**<font style="color:#F5222D;">【注】</font>****<font style="color:#DF2A3F;">当longTermEffective是false时，该字段必传</font>**<br/>（1）授权有效期最长不可超过3年。<br/>（2）授权实际失效时间是以天为单位，例如：指定时间戳对应的时间为：2023-02-01 11:20:47，实际失效时间为：2023-02-01 23:59:59。 |
| redirectUrl | string | 否 | body | 授权书签署完成后重定向跳转地址 （需符合http、https协议，且最长不可超过1024字符） |
| <font style="color:rgb(64, 64, 64);">appScheme</font> | <font style="color:rgb(64, 64, 64);">string</font> | <font style="color:rgb(64, 64, 64);">否</font> | <font style="color:rgb(64, 64, 64);">body</font> | <font style="color:rgb(64, 64, 64);">签署授权书时进行支付宝刷脸意愿认证后，可以跳回开发者app。</font> |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
| | newSealAuthBizId | | | | string | 否 | 新的授权业务流程编号 |
| | authorizationSignShortUrl | | | | string | 否 | 授权书签署短链接（有效期30天） |
| | authorizationSignUrl | | | | string | 否 | 授权书签署长链接 |


### 请求示例
```json
{
    "sealAuthBizId": "7eb81942-xx-xx-xx-b59aa2ba479f",
    "orgId": "0c5bd4924***5648bfbf",
    "transactorPsnId": "c7e002***ea310541e7",
    "effectiveTime": "1636525541000",
    "expireTime": "1668061541000",
    "redirectUrl": "http://www.xxx.cn/"
}
```

### 响应示例
```json
{
  "message": "成功",
  "code": 0,
  "data": {
    "newSealAuthBizId": "61b9d337-xx-xx-xx-0dc308d32d3c",
    "authorizationSignUrl": "https://h5.esign.cn/mesign/guide?context=Nksbcxa&flowId=0d46****89889dce16966b8&organ=true&appId=5****5&linkSource=1&bizType=1&tsign_source_type=SIGN_LINK_XUANYUAN&tsign_source_detail=1vGqUyZBm8k4aIosgUEaAJ40lsE7AJ7F9iSLvM9qrkC28h11ZZUbSoIipVsi%2BtbjwrVJo2n0cjgeEFrWTVKT8mOocb7oM8s2EIx3JuKOt16arLi98Q0TRUjf3JROLf08nYE2XOMSuPrevLzSmwsVj1GKu4v0VKzqOOcpKoj%2BeAuhvQL6l1mXSrTXXZ0kmK5bXfbgH%2F2tW0rbfa3iyzlHvb%2FCYLKwiQ5xvOEghorX0i2eypB%2Frf",
    "authorizationSignShortUrl": "https://t.esign.cn/UmLd***EDy6"
  }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gqgb0gwznb2su405)

