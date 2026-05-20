> [**必须确保企业用户已授予平台appId获取其印章资源管理的权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)
>
> + **manage_org_seal - 授权允许获取企业/组织用户的印章的查询、新增、编辑、授权、删除权限**
>

### 接口描述
查询企业内部的印章授权相关信息。

:::warning
**注意事项：**

+ 允许指定<font style="color:#E8323C;">企业印章</font>（`sealId`）查询，查询拥有该印章权限的内部成员等信息；
+ 允许指定<font style="color:#E8323C;">企业成员</font>（`authorizedPsnId`）查询，查询该成员所拥有的所有印章权限；
+ 当企业印章和企业成员均不指定时，则默认查询企业下所有的印章授权记录；

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/seals/org-seals/internal-auth?orgId=xx&pageNum=1&pageSize=20&sealId=xx

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 是 | query | 机构账号ID<br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询 |
| sealId | string | 否 | query | 印章ID（印章编号），<font style="color:#E8323C;">【注】</font>不传则默认查询全部企业印章。 |
| authorizedPsnId | string | 否 | query | 被授权成员账号ID，<font style="color:#E8323C;">【注】</font>不传则默认查询全部企业成员。 |
| pageNum | int32 | 是 | query | 查询页码 |
| pageSize | int32 | 是 | query | 每页显示的数量，最大值：20 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
| | total | | | | int32 | 否 | 印章授权记录条数 |
| | sealAuthorizedInfos<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | array | 否 | 印章授权信息 |
| | | sealId | | | string | 否 | 印章ID（印章编号） |
| | | sealAuthBizId | | | string | 否 | 授权业务流程编号 |
| | | authorizerPsnId | | | string | 否 | 授权操作人账号ID |
| | | authorizedPsnId | | | string | 否 | 被授权成员账号ID |
| | | sealRole | | | string | 否 | 对应印章角色<br/>**SEAL_EXAMINER **- 印章审批员，**SEAL_USER **- 印章使用员 |
| | | authorizeStatus | | | int32 | 否 | 授权状态<br/>**0** - 失效，**1 **- 正常，**3 **- 待生效 |
| | | statusDescription | | | string | 否 | 授权状态描述 |
| | | expireReason | | | string | 否 | 过期原因<br/>**NOT_EXPIRE **- 未失效<font style="color:#E8323C;">（授权状态正常时，默认返回此值）</font><br/>**NOT_SIGN **- 保存授权成功，但未进行签署授权<br/>**WAIT_EFFECTIVE **- 还未到开始日期<br/>**EXPIRED **- 超过有效期<br/>**GRANT_ORG_ACCOUNT_UPDATE**- 授权企业账号更新<br/>**GRANTER_ACCOUNT_UPDATE** - 授权人账号更新<br/>**GRANTED_ACCOUNT_UPDATE **- 被授权方账号更新 |
| | | expireReasonDescription | | | string | 否 | 过期原因对应的解释说明 |
| | | longTermEffective | | | boolean | 否 | 印章授权是否长期有效（不限制授权时间），默认false<br/>**true** - 是<br/>**false** - 否 |
| | | effectiveTime | | | int64 | 否 | 印章授权生效时间，[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)格式，单位毫秒。 |
| | | expireTime | | | int64 | 否 | 印章授权失效时间，[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)格式，单位毫秒。 |
| | | signFlowId | | | string | 否 | 授权书签署流程ID |
| | | sealAuthScope | | | object | 否 | 印章授权范围 |
| | | | template | | object | 否 | 授权的模板或应用信息 |
| | | | | templateId | string | 否 | 指定授权的模板编号或ALL |
| | | | | applicationsIds | string | 否 | 指定授权的开发者应用ID |
| | | | autoSign | | boolean | 否 | 印章是否设置自动落章 |


### 请求示例
```http
GET https://openapi.esign.cn/v3/seals/org-seals/internal-auth?orgId=xxx&pageNum=1&pageSize=20&sealId=xxx
```

### 响应示例
```json
{
    "message": "成功",
    "code": 0,
    "data": {
        "total": 4,
        "sealAuthorizedInfos": [
            {
                "sealId": "f3a5504f-3b97-***-b55a-0318f8594010",
                "authorizerPsnId": "7ffcaed8c******8f0ef0a8f6",
                "authorizeStatus": 1,
                "statusDescription": "正常",
                "effectiveTime": 1670169600000,
                "expireTime": 1701791999000,
                "expireReason": "NOT_EXPIRE",
                "expireReasonDescription": "未失效",
                "signFlowId": "39e658ba******a747fe3",
                "sealAuthBizId": "afa8abe9-5f85-****-9694-ab6d61953a8d",
                "sealRole": "SEAL_USER",
                "authorizedPsnId": "ALL",
                "sealAuthScope": {
                    "template": {
                        "templateId": "dc4dd******8b4dcf0c301b",
                         "applicationsIds": null
                    },
                    "autoSign": true
                }
            },
            {
                "sealId": "f3a5504f-3b97-****-b55a-0318f8594010",
                "authorizerPsnId": "7ffcaed******8f0ef0a8f6",
                "authorizeStatus": 1,
                "statusDescription": "正常",
                "effectiveTime": 1670169600000,
                "expireTime": 1701791999000,
                "expireReason": "NOT_EXPIRE",
                "expireReasonDescription": "未失效",
                "signFlowId": "2575fb920******8e3e8d624",
                "sealAuthBizId": "b6efe5e4-****-4ec2-915e-15d92d0d95ba",
                "sealRole": "SEAL_USER",
                "authorizedPsnId": "ALL",
                "sealAuthScope": {
                    "template": {
                        "templateId": "c73a84b28*****e2bfa312ed",
                         "applicationsIds": null
                    },
                    "autoSign": true
                }
            },
            {
                "sealId": "f3a5504f-3b97-4176-****-0318f8594010",
                "authorizerPsnId": "7ffcaed8c1b1******0a8f6",
                "authorizeStatus": 0,
                "statusDescription": "失效",
                "effectiveTime": 1670169600000,
                "expireTime": 1701791999000,
                "expireReason": "NOT_SIGN",
                "expireReasonDescription": "保存授权成功，但未进行签署授权",
                "signFlowId": "78a00b0******3c99",
                "sealAuthBizId": "d68bb620-5bb2-****-8201-570d5f131a9c",
                "sealRole": "SEAL_USER",
                "authorizedPsnId": "0e04b42******57c21e96",
                "sealAuthScope": {
                    "template": {
                        "templateId": "ALL",
                         "applicationsIds": null
                    },
                    "autoSign": false
                }
            },
            {
                "sealId": "cbcb084b-fe9d-4824-****-759c6dac8e98",
                "authorizerPsnId": "7ffcaed8c1b1******0a8f6",
                "authorizeStatus": 1,
                "statusDescription": "正常",
                "effectiveTime": 1731168000000,
                "expireTime": 1733846399000,
                "expireReason": "NOT_EXPIRE",
                "expireReasonDescription": "未失效",
                "signFlowId": "9ac02a74f02****2a8e5c3f4c865",
                "sealAuthBizId": "af4b6ec3-ea10-4bba-aabc-e6abbbd6edb5",
                "sealRole": "SEAL_USER",
                "authorizedPsnId": "c92520ec8****4862246bd9b50f",
                "sealAuthScope": {
                    "template": {
                        "templateId": null,
                        "applicationsIds": "743**8496"
                    },
                    "autoSign": false
                }
            }
        ]
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gqgb0gwznb2su405)

