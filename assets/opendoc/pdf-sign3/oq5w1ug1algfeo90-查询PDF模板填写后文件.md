### 接口描述
当模板通过[【获取填写合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ub4ncy)接口获取的填写链接填写生成文件后（或通过[【填写模板生成文件】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/mv8a3i)接口填写后），开发者平台想要查看/下载用户填写后的文件详情，可以使用文件ID通过此接口进行查询。

:::warning
<font style="color:#DF2A3F;">该接口同</font>[【查询文件上传状态】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/qz4aip)<font style="color:#DF2A3F;">是同一个接口，只是使用节点不同。为便于开发者理解，命名为不同的名字。</font>

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/files/{fileId}

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| fileId | string | 是 | path | 填写模板后生成的文件ID |
| pageSize | boolean | 否 | query | 是否返回文件首页的长宽值，默认值 **false**<br/>**true** - 返回长宽值<br/>**false **- 不返回长宽值（字段会返回，值为null） |


### 响应参数
| **参数名称** | | **参数类型** | **必选** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| code | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message**** | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | object | 否 | 业务数据 |
|  | fileId | string | 否 | 文件ID |
| | fileName | string | 否 | 文件名称 |
| | fileSize | int32 | 否 | 文件大小<font style="color:#8C8C8C;">（预留字段，暂时不会返回任何值，开发者可忽略）</font> |
| | fileStatus | int32 | 否 | 文件状态**<font style="color:#F5222D;">（填写PDF模板后生成的文件状态只可能是2）</font>**<br/>0 - 文件未上传<br/>1 - 文件上传中<br/>**<font style="color:#F5222D;">2 - 文件上传已完成 或 文件已转换（HTML）</font>**<br/>3 - 文件上传失败<br/>4 - 文件等待转换（PDF）<br/>**<font style="color:#F5222D;">5 - 文件已转换（PDF）</font>**<br/>6 - 加水印中<br/>7 - 加水印完毕<br/>8 - 文件转化中（PDF）<br/>9 - 文件转换失败（PDF）<br/>10 - 文件等待转换（HTML）<br/>11 - 文件转换中（HTML）<br/>12 - 文件转换失败（HTML） |
| | fileDownloadUrl | string | 否 | 文件下载地址<font style="color:#F5222D;">（有效期为60分钟，过期后可以重新调用接口获取新的下载地址）</font> |
| | fileTotalPageCount | int32 | 否 | pdf文件总页数 |
| | pageWidth | float | 否 | 首页宽度，单位：像素（<font style="color:rgb(38, 38, 38);">px</font>）<br/><font style="color:#E8323C;">【注】</font>pageSize传**true**才返回具体值 |
| | pageHeight | float | 否 | 首页高度，单位：像素（<font style="color:rgb(38, 38, 38);">px</font>）<br/><font style="color:#E8323C;">【注】</font>pageSize传**true**才返回具体值 |


### 请求示例
```http
GET https://openapi.esign.cn/v3/files/cbd1***qwe
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "fileId": "cbd1***qwe",
        "fileName": "房屋租赁协议.pdf",
        "fileSize": null,
        "fileStatus": 2,
        "fileDownloadUrl": "https://esignoss.esign.cn/1111564182/6e4c2df8-***-ec781e2ae849/%E5%90%8C.pdf?Expires=***&OSSAccessKeyId=***&Signature=***",
        "fileTotalPageCount": 4,
        "pageWidth": null,
        "pageHeight": null
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/px5yvgqf9glbs7o6)



