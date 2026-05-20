> [**必须确保企业用户已授予平台appId获取其印章资源管理的权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)
>
> + **manage_org_seal - 授权允许获取企业/组织用户的印章的查询、新增、编辑、授权、删除权限**
>

### 接口描述
查询 orgId （机构企业）名下被外部其他机构企业所授权的印章，包括印章的编号、名称、授权机构、印章业务类型、授权失效时间、印章图片下载地址等信息。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/seals/org-authorized-seal-list?orgId=xx&pageNum=1&pageSize=20

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 是 | query | 被授权方机构账号ID<font style="color:#DF2A3F;"> （受托单位）</font><br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询 |
| authorizerOrgId | string | 否 | query | 授权方机构账号ID <font style="color:#DF2A3F;">（委托单位）</font><br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询 |
| pageNum | int32 | 是 | query | 查询页码 |
| pageSize | int32 | 是 | query | 每页显示的数量，最大值：20 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
| | total | | | | int64 | 否 | 被授权印章记录条数 |
| | seals<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | array | 否 | 被授权印章信息 |
| | | sealId | | | string | 否 | 被授权印章ID（印章编号） |
| | | authorizerOrgId | | | string | 否 | 授权机构账号ID**<font style="color:#8C8C8C;">（委托单位）</font>** |
| | | authorizerOrgName | | | string | 否 | 授权机构名称**<font style="color:#8C8C8C;">（委托单位）</font>** |
| | | sealAuthBizId | | | string | 否 | 授权业务流程编号 |
| | | sealName | | | string | 否 | 被授权印章名称 |
| | | sealBizType | | | string | 否 | 印章业务类型<br/>**PUBLIC **- 公章<br/>**CONTRACT **- 合同专用章<br/>**FINANCE** - 财务专用章<br/>**PERSONNEL** - 人事专用章<br/>**LEGAL_PERSON** - 法定代表人章<br/>**COMMON **- 其他 |
| | | sealBizTypeDescription | | | string | 否 | 印章业务类型说明 |
| | | sealStyle | | | int32 | 否 | 印章制作方式   **1** - 机构模板章，**3** - 图片印章（上传本地文件） |
| | | effectiveTime | | | int64 | 否 | 印章授权生效时间，[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)格式，单位毫秒。 |
| | | expireTime | | | int64 | 否 | 印章授权失效时间，[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)格式，单位毫秒。 |
| | | sealImageDownloadUrl | | | string | 否 | 印章图片（带水印）下载地址<font style="color:#E8323C;">（有效期60分钟）</font> |
| | | sealHeight | | | int32 | 否 | 印章高度（单位：毫米mm） |
| | | sealWidth | | | int32 | 否 | 印章宽度（单位：毫米mm） |


### 请求示例
```http
GET https://openapi.esign.cn/v3/seals/org-authorized-seal-list?orgId=c7e007**41e7&pageNum=1&pageSize=20
```

### 响应示例
```json
{
    "message": "成功",
    "code": 0,
    "data": {
        "total": 1,
        "seals": [
            {
                "sealId": "1125736b-xxxx-fa574ae9a073",
                "sealName": "财务章",
                "sealBizType": "FINANCE",
                "sealStyle": 1,
                "sealBizTypeDescription": "财务专用章",
                "authorizerOrgId": "624f37******4fa67",
                "authorizerOrgName": "XXXXX科技有限公司",
                "sealAuthBizId": "13eab264-XXXXX-ff487e498e95",
                "effectiveTime": 1697472000000,
                "expireTime": 1729094399000,
                "sealImageDownloadUrl": "https://esignoss.esign.cn/seal-service/358fd0c2-*****6ce/a8ea5247****-868b",
                "sealHeight": 38,
                "sealWidth": 38
            }
        ]
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gqgb0gwznb2su405)

