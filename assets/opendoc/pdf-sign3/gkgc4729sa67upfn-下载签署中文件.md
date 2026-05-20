### 接口描述
通过该接口可以下载流程正在签署中的文件进行预览查看，用于开发者内部系统展示合同内容。本接口下载的文件因为是过程中文件所以不支持验签和出证，并且文件中会带有<font style="color:#DF2A3F;">“本文档仅供预览查看”</font>的水印字样。样式参考下图：

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1698315891746-af013ea1-ef06-4cc8-8bd0-374e8e2427d3.png)

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/preview-file-download-url

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **<font style="color:black;">参数名称</font>** | | **<font style="color:black;">参数类型</font>** | **<font style="color:black;">必选</font>** | **参数位置** | **<font style="color:black;">参数说明</font>** |
| --- | --- | --- | :---: | :---: | --- |
| signFlowId | | string | 是 | path | 签署中状态的签署流程ID |
| docFileId | | string | 是 | query | 本次签署流程中的文件ID<br/><font style="color:#DF2A3F;">【注】</font><br/>+ <font style="color:#DF2A3F;">仅支持签署文件，不支持附件</font><br/>+ <font style="color:#DF2A3F;">仅支持PDF文件，不支持OFD文件</font> |
| urlAvailableDate | | int | 否 | query | 下载链接有效期，单位：秒。默认：3600秒（60分钟）<br/>+ 可传入：**1-3600**<br/><font style="color:#DF2A3F;">补充说明：</font><br/>+ 为链接设置有效期是一项安全措施，旨在降低因无关人员访问而导致的信息泄露风险。 |


### 响应参数
| **参数名称** | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | :---: | :---: | --- |
| code | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | object | 否 | 业务数据 |
| | fileId | string | 否 | 文件ID |
| | fileName | string | 否 | 文件名称 |
| | fileDownloadUrl | string | 否 | 签署中文件下载链接<font style="color:#DF2A3F;">（有效期为60分钟，过期后可以重新调用接口获取新的下载地址）</font> |


### 请求示例
```http
GET https://openapi.esign.cn/v3/sign-flow/c57fb***88afb7b97d5/preview-file-download-url?docFileId=a24a7***d2406eb23
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "fileId": "a24a751b57394115af322ced2406eb23",
        "fileName": "11.pdf",
        "fileDownloadUrl": "https://esignoss.esign.cn/1111564182/24585d36-6f4b-****-97d0-9d9b039297e1/%E9%94%80%E5%94%AE%E5%90%88%E5%90%8C.pdf?Expires=1698318711&OSSAccessKeyId=LTAI4G23YViiKnxTC28ygQzF&Signature=QR%2FMabb66UA0fjPjEV2JJbCCfuE%3D"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)



