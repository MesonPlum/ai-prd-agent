### 接口描述
通过数据推送服务获取到ledgerId（台账ID）、processId（合同流程ID）、flowId（子流程ID）来下载台账中所提取到的图片。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/ledger/image-download-urls

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数**<br/>**类型** | **必选** | **参数**<br/>**位置** | **参数说明****<font style="color:#E8323C;">（左右拖动查看完整描述）</font>** |
| --- | :---: | :---: | :---: | --- |
| ledgerId | string | 是 | query | 台账ID |
| downloadId | string | 是 | query | 下载ID<br/><font style="color:#E8323C;">注：</font><br/><font style="color:#E8323C;">downloadIdType为1时，请传入 processId</font><br/><font style="color:#E8323C;">downloadIdType为2时，请传入 flowId</font> |
| downloadIdType | int32 | 是 | query | 下载ID类型<br/>1 - 使用 processId 下载 ，2 - 使用 flowId 下载 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data | | | | | object | 否 | 业务数据 |
| | processId | | | | string | 否 | 合同流程ID |
| | flowId | | | | string | 否 | 子流程ID |
| | imageDownloadUrls | | | | array | 否 | 图片下载链接列表 |
| | | fieldId | | | string | 否 | 台账字段ID |
| | | imageDownloadUrl | | | string | 否 | 图片下载链接（有效期60分钟） |


### 请求示例
```http
GET https://{host}/v3/ledger/image-download-urls?downloadId=xx&downloadIdType=xx&ledgerId=xx
```

### 响应示例
```json
{
    "code":0,
    "message":"成功",
    "data":{
        "flowId":"xx",
        "processId":"xx",
        "imageDownloadUrls":[
            {
                "fieldId":"xx",
                "imageDownloadUrl":"https://xxx"
            },
            {
                "fieldId":"xx",
                "imageDownloadUrl":"https://xxx"
            }
        ]
    }
}
```

