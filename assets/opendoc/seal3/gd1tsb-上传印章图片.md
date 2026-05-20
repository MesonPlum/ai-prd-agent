# 上传印章图片概述
上传本地印章图片文件到e签宝服务端请按以下步骤顺序操作：

**步骤一：获取印章图片上传地址**`**<font style="color:#FFA940;background-color:#E9E9E9;">fileUploadUrl</font>**`[（点击直接跳转下方 步骤一）](#TRPDd)

**步骤二：将印章图片文件流上传到**`**<font style="color:#FFA940;background-color:#E9E9E9;">fileUploadUrl</font>**`[（点击直接跳转下方 步骤二）](#xvTbe)

:::danger
+ 以上二个步操作缺一不可，上传印章图片时请按序调用。
+ 请上传真实有效的印章图片，支持 **jpg、jpeg、png、bmp**格式图片，印章图片大小需控制在2M以内。

:::

## 步骤一：获取印章图片上传地址fileUploadUrl
### 接口描述
用于获取上传印章图片文件的服务端地址<font style="color:rgb(232, 50, 60);"></font>`**<font style="color:#FA8C16;background-color:#E9E9E9;">fileUploadUrl</font>** `和印章图片`**<font style="color:#FA8C16;background-color:#E9E9E9;">fileKey </font>**`。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/files/file-key

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | --- | :---: | --- |
| contentMd5 | string | 是 | body | 文件的Content-MD5值。<br/>先获取文件MD5的128位二进制数组，再对此二进制进行Base64编码。<br/>（1）可参考[Content-MD5计算说明及代码示例](https://qianxiaoxia.yuque.com/docs/share/270e2dc6-7d99-4838-8bfb-ebddf54906e7?#)计算。<br/>（2）开发调试时可通过【[获取文件哈希值小工具](https://smlopen.esign.cn/tools/file-md5)】计算。 |
| contentType | string | 是 | body | 目标文件的MIME类型，固定值：**application/octet-stream** |
| fileName | string | 是 | body | 本地印章图片文件名称（含扩展名，示例：赵某某.png）<br/>+ 扩展名只能为 **.png、.jpg、.jpeg、.bmp**。<br/>+ 不支持 ：/ \ : * " < > | ？等字符。 |
| fileSize | int64 | 是 | body | 印章图片大小，单位byte |


### 响应参数
| **<font style="color:black;">参数名称</font>** | | **<font style="color:black;">参数类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>** |
| :--- | --- | :---: | :---: | --- |
| code | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | object | 否 | 业务数据 |
| | <font style="color:#333333;">fileKey</font> | string | 否 | 印章图片的fileKey<font style="color:#F5222D;">（开发者需妥善保存</font><font style="color:#E8323C;">fileKey</font><font style="color:#F5222D;">，可用于创建图片印章）</font> |
| | <font style="color:#333333;">fileUploadUrl</font> | string | 否 | 印章图片服务端上传地址，链接有效期60分钟。<font style="color:#F5222D;">（请继续按下方</font>**<font style="color:#F5222D;">步骤二</font>**<font style="color:#F5222D;">将文件流上传到该地址中）</font> |


### 请求示例
```json
{
    "contentMd5":"eGMHwA4TW***KMxreUQ==",
    "contentType":"application/octet-stream",
    "fileName":"这是个自定义图片印章.png",
    "fileSize":1525
}
```

### 响应示例
```json
{
    "message": "成功",
    "code": 0,
    "data": {
        "fileKey": "$c3c7170e-xx-xx-xx-xx",
        "fileUploadUrl": "https://esignoss.esign.cn/7438861007/xx-xx-xx-xx-xx/%E5%8C%BA%E5%9D%97%E9%93%BE%E7%AD%BE%E7%BD%B2%E6%B5%81%E7%A8%8B%E5%9B%BE.pdf?Expires=1651892150&OSSAccessKeyId=STS.NTvgoN7TLTsKEfgA2QQa5zRP8&Signature=gHbOQTnhHfUka%2FqTuO2yTNH7MPo%3D&callback-var=eyJ4OmZpbGVfa2V5IjoiJGMzYzcxNzBlLTA5MWUtNGRmYi05Y2M0LWNjYjA0NjM4ZjJmYyQyMjIyODMxOTg0In0%3D%0A&callback=eyJjYWxsYmFja1VybCI6Imh0dHA6Ly9zbWx0YXBpLnRzaWduLmNuL2FueWRvb3IvZmlsZS1zeXN0ZW0vY2FsbGJhY2svYWxpb3NzIiwiY2FsbGJhY2tCb2R5IjogIntcIm1pbWVUeXBlXCI6JHttaW1lVHlwZX0sXCJzaXplXCI6ICR7c2l6ZX0sXCJidWNrZXRcIjogJHtidWNrZXR9LFwib2JqZWN0XCI6ICR7b2JqZWN0fSxcImV0YWdcIjogJHtldGFnfSxcImZpbGVfa2V5XCI6JHt4OmZpbGVfa2V5fX0iLCJjYWxsYmFja0JvZHlUeXBlIjogImFwcGxpY2F0aW9uL2pzb24ifQ%3D%3D%0A&security-token=CAIS%2BAF1q6Ft5B2yfSjIr5fDLNX62ott47GgR0DWpTIEXe4ZlZf72jz2IHtKdXRvBu8Xs%2F4wnmxX7f4YlqB6T55OSAmcNZEoBGKafeL5MeT7oMWQweEurv%2FMQBqyaXPS2MvVfJ%2BOLrf0ceusbFbpjzJ6xaCAGxypQ12iN%2B%2Fm6%2FNgdc9FHHPPD1x8CcxROxFppeIDKHLVLozNCBPxhXfKB0ca0WgVy0EHsPnvm5DNs0uH1AKjkbRM9r6ceMb0M5NeW75kSMqw0eBMca7M7TVd8RAi9t0t1%2FIVpGiY4YDAWQYLv0rda7DOltFiMkpla7MmXqlft%2BhzcgeQY0pc%2FRqAAWB1nmVO9V5bLEJ%2Bmfc0aYUty97F5iHIbjugzY2bdYrKy39zXIZFLk0wIUBYPDH43gn4AzdLFsS%2Fw5ZZtkNiN5d9PXKvaheqCVtogy%2F2i7Se6L%2FOJNfbF%2FNVrXFNlgi8UKCKgWSOtAvYLT5rSfq0%2FSfpaqd%2Boi8iZW%2F6q1F%2BCy%2Fi"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gqgb0gwznb2su405)

## 步骤二：将印章图片文件流上传到fileUploadUrl
### 上传地址&请求方法
**接口地址：**【**步骤一：**获取印章图片上传地址】的响应参数`**<font style="color:#FA8C16;background-color:#E9E9E9;">fileUploadUrl</font>**`

**请求方法：**PUT

### 请求头格式
| **参数名称** | **参数类型** | **必选** | **参数说明****** |
| --- | :---: | :---: | --- |
| <font style="color:rgb(51, 51, 51);">Content-MD5</font> | <font style="color:rgb(38, 38, 38);">string</font> | <font style="color:rgb(38, 38, 38);">是</font> | 与【步骤一：获取印章图片上传地址】Body体中contentMd5值一致<br/><font style="color:#E8323C;">必须跟上述说明接口的contentMd5参数一致，否则会报403错误</font> |
| <font style="color:rgb(51, 51, 51);">Content-Type</font> | <font style="color:rgb(38, 38, 38);">string</font> | <font style="color:rgb(38, 38, 38);">是</font> | 固定值：**application****<font style="color:rgb(38, 38, 38);">/</font>****octet-stream** |


:::warning
**<font style="color:#E8323C;">提示：</font>**如果文件流上传时出现报错，请参考[文件上传常见报错及解决方法](https://qianxiaoxia.yuque.com/docs/share/c5328d3e-5b00-4d33-8779-46dc73de2c0a?#)尝试解决。

:::

### 请求参数
<font style="color:rgb(51, 51, 51);">HTTP BODY：待上传文件的二进制字节流。</font>

:::warning
**<font style="color:#F5222D;">注意</font>**<font style="color:#F5222D;">：</font>此文件必须与contentMd5值对应的文件一致

:::

### 响应参数
| **<font style="color:black;">参数名称</font>** | **<font style="color:black;">参数类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>** |
| --- | :---: | :---: | --- |
| errCode | int32 | <font style="color:rgb(38, 38, 38);">是</font> | 业务码，0表示成功，非0表示异常。 |
| <font style="color:rgb(38, 38, 38);">msg</font> | string | <font style="color:rgb(38, 38, 38);">否</font> | 业务信息 |


