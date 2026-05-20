### 接口描述
通过调用”申请出证”接口申请出证后，如果长时间未收到回调通知，可通过此接口查询出证状态及对应的报告下载地址。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/evidence-report/query

**请求方法：**GET

**<font style="color:#333333;">请求域名：</font>**

| **开发环境** | **请求域名** | **公网IP** | **端口** |
| --- | --- | --- | --- |
| 沙箱环境 | https://smlopenapi.esign.cn | 114.55.17.44 | 443 |
| 正式环境 | https://openapi.esign.cn | <font style="color:#262626;background-color:#FFFFFF;">118.31.181.75</font> | 443 |


### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **<font style="color:black;">参数名称</font>** | | **<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **参数类型** | **<font style="color:black;">参数说明</font>** | **示例值** |
| --- | --- | :---: | :---: | --- | --- | --- |
| recordNum | | string | 是 | query | 申请出证编号 |  |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。  |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#DF2A3F;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:#DF2A3F;">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
| | recordNum | | | | string | 是 | 出证编号 |
| | status | | | | string | 是 | 申请流程状态：<br/>**ACCEPTED**（受理中）<br/>**ISSUE_SUCCESS**（出证成功）<br/>**ISSUE_FAILED**（出证失败） |
| | downloadUrl | | | | string | 否 | 出证报告zip压缩包下载地址（包含出证报告以及存储的文件原文） |
| | failReason | | | | string | 否 | 失败原因 |


### 请求示例  
**GET请求示例：**

```http
https://openapi.esign.cn/v3/evidence-report/query?recordNum=2023*****576802
```

### 响应示例
**出证成功示例：**

```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "recordNum": "20230*****6802",
        "status": "ISSUE_SUCCESS",
        "downloadUrl": "https://esignoss.esign.cn/flash/8511119d-ed2a-4ef8-8e90-96b2c2b7ad25/20230505094954576802.zip?Expires=1683358796&OSSAccessKeyId=LTAI4G23YViiKnxTC28ygQzF&Signature=Szmn9q%2BZyjO1%2FxD4ne1A0h0Uqjw%3D",
        "failReason": null
    }
}
```

**出证失败示例：**

```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "recordNum": "2023*****76810",
        "status": "ISSUE_FAILED",
        "downloadUrl": null,
        "failReason": "报告生成失败，getSignFlowEvidence调用失败，flowId：bb34367e1****6acdfd5c72，error msg：must not be null-operateTime:null"
    }
}
```

### 错误码
| **错误码** | **错误描述** | **解决方案** |
| --- | --- | --- |
| 1480209 | 出证记录不存在 | 请检查申请出证编号（recordNum）是否正确，是否是当前环境创建的。 |




