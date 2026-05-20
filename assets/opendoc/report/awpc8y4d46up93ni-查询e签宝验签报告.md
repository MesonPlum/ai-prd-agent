### 接口描述
通过调用”申请e签宝验签报告”接口申请出证后，可通过此接口查询出证状态及对应的报告下载地址。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/service-report/query

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | --- | :---: | :---: | :---: | --- |
| reportFlowId | | | string | 是 | path | 申请流程ID |


### 响应参数
| **<font style="color:black;">参数名称</font>** | | | **<font style="color:black;">参数类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 否 | 业务码，0表示成功 |
| message | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data | | | array | 否 | 业务数据 |
|    <br/>   <br/>   <br/>   <br/>    | reportFlowId | | string | 是 | 申请流程id |
| |    status | | int64 | 是 | 申请流程状态：<br/>0-处理中<br/>1-已完结 |
| | reportFlowCreateTime | | int64 | 是 | 发起时间 |
| | reportFlowFinishTime | | int64 | 否 | 完结时间（成功/失败时间） |
| | succeededNumber | | int64 | 是 | 成功的数量 |
| | failedNumber | | int64 | 是 | 失败的数量 |
| | customBizNum | | string | 否 | 自定义业务编号 |
| | reportList | | array | 否 | 出证报告列表 |
| |  | fileId | string | 是 | 上传的签署后文件原文fileId |
| | | status | int | 是 | 出证状态 ：<br/>1-出证成功 <br/>0-出证失败 |
| | | downloadUrl | string | 是 | 验证报告下载地址<font style="color:#DF2A3F;">（有效期为24小时，过期后可以重新调用接口获取新的下载地址）</font> |
| | | failReason | string | 是 | 失败原因<br/>（具体某份文件失败的原因，一般是文件的问题） |
| | failReason | | string | 是 | 失败原因<br/>（整个申请流程失败的原因，一般是订单的问题） |


### 请求示例
```http
//正式环境
https://openapi.esign.cn/v3/service-report/query?reportFlowId=6877acc6-5efc-4881-b651-276ca94516a2

//沙箱环境
https://smlopenapi.esign.cn/v3/service-report/query?reportFlowId=3f07f338-c421-4173-a700-351939fb0a08
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "reportFlowId": "6877acc6-5efc-4881-b651-276ca94516a2",
        "status": 1,
        "reportFlowCreateTime": 1718270934000,
        "reportFlowFinishTime": 1718270935000,
        "succeededNumber": 1,
        "failedNumber": 1,
        "customBizNum": "a2540341-439c-46da-aed0-7fa868c5f895",
        "reportList": [
            {
                "fileId": "48ed3357519843468961fa64fc1acb26",
                "status": 1,
                "downloadUrl": "https://esignoss.esign.cn/docsign-pre/aab54294-6f4e-4be1-95e0-8cdec0d104b0/test_%E7%AD%BE%E7%BD%B2%E6%8A%A5%E5%91%8A.pdf?Expires=1718357348&OSSAccessKeyId=LTAI4G23YViiKnxTC28ygQzF&Signature=5OTgnsteCJHk9fUKpT4v9IdGwxk%3D",
                "failReason": null
            },
            {
                "fileId": "55f83e257930475387c9d6ec2f7b3d4d",
                "status": 0,
                "downloadUrl": null,
                "failReason": "无电子签名"
            }
        ],
        "failReason": null
    }
}
```



