> [**必须确保企业用户已授予平台appId获取其印章资源管理的权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)
>
> + **manage_org_seal - 授权允许获取企业/组织用户的印章的查询、新增、编辑、授权、删除权限**
>

### 接口描述
用于查询对外部企业的印章授权信息。

:::info
+ 指定<font style="color:#E8323C;">企业印章</font>（`sealId`）查询时，可查询该印章所有的跨企业授权信息；
+ 指定<font style="color:#E8323C;">被授权机构账号ID</font>（`authorizedOrgId`）查询时，可查询对该企业的所有印章授权信息；
+ 同时指定`sealId`、`authorizedOrgId`时，则查询该印章对某企业的授权详情。

:::

### 接口地址&请求方法
**接口地址：**

https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/seals/org-seals/external-auth?orgId=xx&pageNum=1&pageSize=20&sealId=xx

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 是 | query | 机构账号ID<font style="color:#DF2A3F;">（委托单位）</font><br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询 |
| sealId | string | 否 | query | 印章ID（印章编号）<br/>+ **<font style="color:#E8323C;">sealId、authorizedOrgId至少选一项传值</font>** |
| authorizedOrgId | string | 否 | query | 被授权机构账号ID<font style="color:#DF2A3F;">（受托单位）</font><br/>+ **<font style="color:#E8323C;">sealId、authorizedOrgId至少选一项传值</font>**<br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询 |
| pageNum | int32 | 是 | query | 查询页码 |
| pageSize | int32 | 是 | query | 每页显示的数量，最大值：20 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
| | total | | | | int32 | 否 | 授权记录总数 |
| | sealAuthorizedInfos<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | array | 否 | 印章跨企业授权信息 |
| | | sealId | | | string | 否 | 印章ID（印章编号） |
| | | authorizerPsnId | | | string | 否 | 授权操作人账号ID（委托人） |
| | | authorizedOrgId | | | string | 否 | 被授权机构账号ID（受托单位） |
| | | sealAuthBizId | | | string | 否 | 授权业务流程编号 |
| | | authorizeStatus | | | int32 | 否 | 当前授权状态<br/>**0** - 失效，**1 **- 正常，**3** - 待生效 |
| | | statusDescription | | | string | 否 | 授权状态对应的解释说明 |
| | | expireReason | | | string | 否 | 过期原因<br/>**NOT_EXPIRE **- 未失效<font style="color:#E8323C;">（授权状态正常时，默认返回此值）</font><br/>**NOT_SIGN **- 保存授权成功，但未进行签署授权<br/>**WAIT_EFFECTIVE **- 还未到开始日期<br/>**EXPIRED **- 超过有效期<br/>**GRANT_ORG_ACCOUNT_UPDATE**- 授权企业账号更新<br/>**GRANTER_ACCOUNT_UPDATE** - 授权人账号更新<br/>**GRANTED_ACCOUNT_UPDATE **- 被授权方账号更新 |
| | | expireReasonDescription | | | string | 否 | 过期原因对应的解释说明 |
| | | longTermEffective | | | boolean | 否 | 印章授权是否长期有效（不限制授权时间），默认false<br/>**true** - 是<br/>**false** - 否 |
| | | effectiveTime | | | int64 | 否 | 印章授权生效时间，[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)格式，单位毫秒。 |
| | | expireTime | | | int64 | 否 | 印章授权失效时间，[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)格式，单位毫秒。 |
| | | signFlowId | | | string | 否 | 授权书签署流程ID |
| | | authorizedType | | | int32 | 否 | 授权印章使用对象，默认：**0**<br/>**0** - 被授权企业的管理员/法人（不限被授权方企业下的开发者应用ID）<br/>**1** - 被授权企业下的应用（仅限被授权企业下的某个指定应用ID使用） |
| | | authorizedApplication | | | string | 否 | 被授权企业下的开发者应用ID（appId），为null即不限被授权方企业下的应用ID。 |


### 请求示例
```http
GET https://openapi.esign.cn/v3/seals/org-seals/external-auth?orgId=0c5bd***48bfbf&pageNum=1&pageSize=20&sealId=xxx
```

### 响应示例
```json
{
    "message": "成功",
    "code": 0,
    "data": {
        "total": 1,
        "sealAuthorizedInfos": [
            {
                "sealId": "02590082-**-**-**-2138db4d7b73",
                "authorizerPsnId": "c7e002***10541e7",
                "authorizeStatus": 1,
                "statusDescription": "正常",
                "effectiveTime": 1636473600000,
                "expireTime": 1668095999000,
                "expireReason": "NOT_EXPIRE",
                "expireReasonDescription": "未失效",
                "signFlowId": "4e8de6e**396bda63",
                "sealAuthBizId": "7327fd33-xx-xx-xx-494f313340aa",
                "authorizedOrgId": "a3d101cc***d28582e",
                "authorizedType": 0,
                "authorizedApplication": null
            }
        ]
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gqgb0gwznb2su405)

