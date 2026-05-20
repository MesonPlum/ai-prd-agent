### 接口描述
流程结束后，获取<font style="color:#333333;">签署完成的文件以及相关附属材料的下载链接。</font>

+ <font style="color:#333333;">未签署完成的流程，无法下载相关文件，否则会报错：</font>"流程非签署完成状态，不允许下载文档"。

:::warning
**为优化接口开发体验，自 ****<font style="color:#DF2A3F;">2025年12月11日</font>**** 起：**

+ **新增 ****<font style="color:#DF2A3F;">POST</font>**** 请求方式**，后续新功能将基于此方式开发。
+ **原有 ****<font style="color:#DF2A3F;">GET</font>**** 请求方式保留**，但不再增加新功能，**<font style="color:#DF2A3F;">不再推荐使用</font>**。

:::

## 请求方式一：
### <font style="color:#DF2A3F;">新</font>接口地址&请求方法<font style="color:#DF2A3F;">（推荐）</font>
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/file-download-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **<font style="color:black;">参数名称</font>** | | **<font style="color:black;">参数类型</font>** | **<font style="color:black;">必选</font>** | **参数位置** | **<font style="color:black;">参数说明</font>** |
| --- | --- | --- | :---: | :---: | --- |
| signFlowId | | string | 是 | path | 已完成状态的签署流程ID |
| urlAvailableDate | | int | 否 | body | 下载链接有效期，单位：秒。默认：3600秒（60分钟）<br/>+ 可传入：**1-3600**<br/><font style="color:#DF2A3F;">补充说明：</font><br/>+ 为链接设置有效期是一项安全措施，旨在降低因无关人员访问而导致的信息泄露风险。 |
| internalUrl | | boolean | 否 | body | 是否是内网地址，默认：false<br/>**true** - 内网<br/>**false** - 外网 <br/><font style="color:#DF2A3F;">注：专属云产品才可能用到内网地址，标准都是外网地址</font> |
| aesEncrypt | | boolean | 否 | body | 是否使用AES加密文件，默认：false<br/>**true** - 使用AES加密<br/>**false** - 不使用AES加密<br/><font style="color:#DF2A3F;">补充说明：</font><br/>+ 开发者如果不想文件下载地址可被直接访问，可使用该方式对文件进行加密<br/>+ 加密后的文件通过异步回调[《签署文件加密完成通知》](https://qianxiaoxia.yuque.com/opendoc/notify3/nzgbdrgvdg1g7eab)中返回的downloadUrl来进行下载，接口将不再返回下载地址<br/>+ 与下文的rsaSecret和rsaSecretKey是两种不同的加密方式 |
| rsaSecret | | string | 否 | body | 文件需要加密时使用的RSA公钥（base64编码）   <font style="color:#DF2A3F;">补充说明：</font><br/>+ 开发者如果不想文件下载地址可被直接访问，可使用该方式对文件进行加密<br/>+ 加密后的文件通过异步回调[《签署文件加密完成通知》](https://qianxiaoxia.yuque.com/opendoc/notify3/nzgbdrgvdg1g7eab)中返回的downloadUrl来进行下载，接口将不再返回下载地址<br/>+ 需要用RSA私钥解密响应参数中的aesSecret，并使用解密后的AES密钥来解密加密后的文件<br/>+ [点击跳转 生成RSA密钥对和文件解密的Java参考代码](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/RSAEncryptUtils.java)  |
| rsaSecretKey | | string | 否 | body | RSA公钥版本（开发者自定义唯一标识，可用该字段标识对应的rsaSecret加密版本）<br/><font style="color:#DF2A3F;">补充说明：</font><br/>+ rsaSecret传入时，此字段必传<br/>+ 会在异步回调[《签署文件加密完成通知》](https://qianxiaoxia.yuque.com/opendoc/notify3/nzgbdrgvdg1g7eab)中原样返回 |


### 响应参数
| **参数名称** | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | string | 否 | 业务信息<br/><font style="color:#DF2A3F;">请根据 code 来判断错误情况，不应该依赖message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | object | 否 | 业务数据 |
| | files<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | array | 否 | 签署文件信息 |
| |  | fileId | string | 否 | 签署文件ID |
| | | fileName | string | 否 | 签署文件名称 |
| | | downloadUrl | string | 否 | 已签署文件下载链接<font style="color:#DF2A3F;">（默认有效期为60分钟，过期后可以重新调用接口获取新的下载地址）</font> |
| | attachments<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | array | 否 | 附属材料信息 |
| |  | fileId | string | 否 | 附属材料文件ID |
| | | fileName | string | 否 | 附属材料文件名称 |
| | | downloadUrl | string | 否 | 附属材料文件下载链接<font style="color:#DF2A3F;">（默认有效期为60分钟，过期后可以重新调用接口获取新的下载地址）</font> |
| | certificateDownloadUrl | | string | 否 | 海外签证书报告下载地址<font style="color:#DF2A3F;">（默认有效期为60分钟，过期后可以重新调用接口获取新的下载地址）</font><br/><font style="color:#DF2A3F;">注：默认中国大陆签署不返回值</font> |
| | aesSecret | | string | 否 | 加密后的密钥<br/><font style="color:#DF2A3F;">注：</font><br/>+ <font style="color:#DF2A3F;">aesEncrypt传入true时返回e签宝开放平台AES加密后的密钥</font><br/>+ <font style="color:#DF2A3F;">传入rsaSecret和rsaSecretKey时返回RSA公钥加密后的AES密钥</font> |


### 请求示例
```http
POST https://openapi.esign.cn/v3/sign-flow/b2cb7**3cc54/file-download-url
```

```json
{
    "urlAvailableDate": "3600"
}
```

### 响应示例
```json
{
  "code": 0,
  "message": "成功",
  "data": {
    "files": [
      {
        "fileId": "0e99dee27**b2cd69",
        "fileName": "xx企业劳动合同签署.pdf",
        "downloadUrl": "https://esignoss.esign.cn/1111563786/8446a910-1252-4712-84e6-5fe17beb7db6/%E5%BC%80%E5%8F%91%E5%89%8D%E5%BF%85%E8%AF%BB.pdf?Expires=1649935695&OSSAccessKeyId=LTAI4G23YViiKnxTC28ygQzF&Signature=xx%3D"
      }
    ],
    "attachments": [
      {
        "fileId": "e2774d28**b4e55180",
        "fileName": "入职材料.pdf",
        "downloadUrl": "https://esignoss.esign.cn/1111564182/37afade5-84eb-497c-8068-909487f5cc41/%E5%BC%80%E5%8F%91%E5%89%8D%E5%BF%85%E8%AF%BB.pdf?Expires=1649935695&OSSAccessKeyId=LTAI4G23YViiKnxTC28ygQzF&Signature=1KtvhoMUi%2B1k%x%3D"
      }
    ],
    "certificateDownloadUrl": null,
    "aesSecret": null
  }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)



## <font style="color:rgb(64, 64, 64);">请求方式二：</font>
### 接口地址&请求方法<font style="color:#DF2A3F;">（不推荐）</font>
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/file-download-url

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **<font style="color:black;">参数名称</font>** | | **<font style="color:black;">参数类型</font>** | **<font style="color:black;">必选</font>** | **参数位置** | **<font style="color:black;">参数说明</font>** |
| --- | --- | --- | :---: | :---: | --- |
| signFlowId | | string | 是 | path | 已完成状态的签署流程ID |
| urlAvailableDate | | int | 否 | query | 下载链接有效期，单位：秒。默认：3600秒（60分钟）<br/>+ 可传入：**1-3600**<br/><font style="color:#DF2A3F;">补充说明：</font><br/>+ 为链接设置有效期是一项安全措施，旨在降低因无关人员访问而导致的信息泄露风险。 |


### 响应参数
| **参数名称** | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | object | 否 | 业务数据 |
| | files<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | array | 否 | 签署文件信息 |
| |  | fileId | string | 否 | 签署文件ID |
| | | fileName | string | 否 | 签署文件名称 |
| | | downloadUrl | string | 否 | 已签署文件下载链接<font style="color:#F5222D;">（默认有效期为60分钟，过期后可以重新调用接口获取新的下载地址）</font> |
| | attachments<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | array | 否 | 附属材料信息 |
| |  | fileId | string | 否 | 附属材料文件ID |
| | | fileName | string | 否 | 附属材料文件名称 |
| | | downloadUrl | string | 否 | 附属材料文件下载链接<font style="color:#F5222D;">（默认有效期为60分钟，过期后可以重新调用接口获取新的下载地址）</font> |
| | certificateDownloadUrl | | string | 否 | 海外签证书报告下载地址<font style="color:#F5222D;">（默认有效期为60分钟，过期后可以重新调用接口获取新的下载地址）</font><br/><font style="color:#F5222D;">【注】默认中国大陆签署不返回值</font> |


### 请求示例
```http
GET https://openapi.esign.cn/v3/sign-flow/b2cb7**3cc54/file-download-url?urlAvailableDate=3600
```

### 响应示例
```json
{
  "code": 0,
  "message": "成功",
  "data": {
    "files": [
      {
        "fileId": "0e99dee27**b2cd69",
        "fileName": "xx企业劳动合同签署.pdf",
        "downloadUrl": "https://esignoss.esign.cn/1111563786/8446a910-1252-4712-84e6-5fe17beb7db6/%E5%BC%80%E5%8F%91%E5%89%8D%E5%BF%85%E8%AF%BB.pdf?Expires=1649935695&OSSAccessKeyId=LTAI4G23YViiKnxTC28ygQzF&Signature=xx%3D"
      }
    ],
    "attachments": [
      {
        "fileId": "e2774d28**b4e55180",
        "fileName": "入职材料.pdf",
        "downloadUrl": "https://esignoss.esign.cn/1111564182/37afade5-84eb-497c-8068-909487f5cc41/%E5%BC%80%E5%8F%91%E5%89%8D%E5%BF%85%E8%AF%BB.pdf?Expires=1649935695&OSSAccessKeyId=LTAI4G23YViiKnxTC28ygQzF&Signature=1KtvhoMUi%2B1k%x%3D"
      }
    ],
    "certificateDownloadUrl": null,
    "aesSecret": null
  }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)



