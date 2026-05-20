> [**必须确保企业用户已授予平台appId获取其印章资源管理的权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)
>
> + **manage_org_seal - 授权允许获取企业/组织用户的印章的查询、新增、编辑、授权、删除权限**
>

### 接口描述
查询 orgId （机构企业）名下自身创建的内部自有企业印章，包括印章的编号、名称、状态、印章业务类型、印章图片下载地址等信息。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/seals/org-own-seal-list?orgId=xx&pageNum=1&pageSize=20

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 是 | query | 机构账号ID<br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询 |
| pageNum | int32 | 是 | query | 查询页码 |
| pageSize | int32 | 是 | query | 每页显示的数量，最大值：20 |
| sealBizTypes | string | 否 | query | 印章业务类型<font style="color:#E8323C;">（多项可使用英文逗号分隔）</font><br/>**PUBLIC **- 公章<br/>**CONTRACT **- 合同专用章<br/>**FINANCE** - 财务专用章<br/>**PERSONNEL** - 人事专用章<br/>**LEGAL_PERSON** - 法定代表人章<br/>**COMMON **- 其他 |
| <font style="color:rgb(51, 51, 51);"> </font>revocationSeal | boolean | 否 | query | 是否需要查询已吊销印章，默认不查询 <br/>**false** - 不查询已吊销印章<br/>** ture** - 查询已吊销印章<br/><font style="color:#E8323C;">【注】</font>曾经有用印记录的印章删除后即为已吊销状态 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | total | | | | int64 | 否 | 查询印章总数 |
| | seals<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | array | 否 | 印章列表信息 |
| |  | sealId | | | string | 否 | 印章ID（印章编号） |
| | | sealName | | | string | 否 | 印章名称 |
| | | sealCreateTime | | | int64 | 否 | 印章创建时间，[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)格式，单位毫秒。 |
| | | defaultSealFlag | | | boolean | 否 | 是否为机构默认印章<br/>**true **-默认印章，**false **-非默认印章 |
| | | sealHeight | | | int32 | 否 | 印章高度（单位：毫米mm） |
| | | sealWidth | | | int32 | 否 | 印章宽度（单位：毫米mm） |
| | | sealBizType | | | string | 否 | 印章业务类型<br/>**PUBLIC **- 公章<br/>**CONTRACT **- 合同专用章<br/>**FINANCE** - 财务专用章<br/>**PERSONNEL** - 人事专用章<br/>**LEGAL_PERSON** - 法定代表人章<br/>**COMMON **- 其他 |
| | | sealBizTypeDescription | | | string | 否 | 印章业务类型说明 |
| | | sealStyle | | | int32 | 否 | 印章制作方式   **1** - 机构模板章，**3** - 图片印章（上传本地文件） |
| | | sealStatus | | | int32 | 否 | 印章状态<br/> **1** - 已启用，**2** - 待审核，** 3 **- 审核不通过，**4** - 挂起或已停用（挂起仅限法人/管理员更换后未重新授权的法定代表人章状态），**6** - 已吊销（有用印记录的印章删除后） |
| | | statusDescription | | | string | 否 | 印章状态描述 |
| | | rejectReason | | | string | 否 | 审核意见，图片印章审核不通过时，会返回审核不通过的原因 |
| | | sealImageDownloadUrl | | | string | 否 | 印章图片（带水印）下载地址<font style="color:#E8323C;">（有效期60分钟）</font> |


### 请求示例
```http
GET https://openapi.esign.cn/v3/seals/org-own-seal-list?orgId=0c5***fbf&pageNum=1&pageSize=20&sealBizTypes=PUBLIC
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
                "sealId": "53642310-xx-xx-xx-xxx",
                "sealName": "xx企业章",
                "sealCreateTime": 1651748074000,
                "defaultSealFlag": false,
                "sealWidth": 40,
                "sealHeight": 40,
                "sealBizType": "PUBLIC",
                "sealBizTypeDescription": "公章",
                "sealStyle": 40,
                "sealStatus": 1,
                "statusDescription": "已启用",
                "rejectReason": "",
                "sealImageDownloadUrl": "https://esignoss.esign.cn/seal-service/xx-xx-xx-xx/xx-xx-xx-x-openseal.png?Expires=xx&OSSAccessKeyId=xx&Signature=xx"
            }
        ]
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gqgb0gwznb2su405)

