### 接口描述
为流程添加附件, 附件无需签署，只作为签署过程中的参考，比如录音、视频, 图片, 文档等。

:::info
**注意事项**

（1）附件文件需先通过[【上传本地文件】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256)获取 fileId 后才可以追加到签署流程中。

（2）文件名称不可以含有以下9个特殊字符：/ \ : * " < > | ？以及所有emoji表情。

（3）此接口所追加的文件仅可以阅读而不能签章，若文件需要签章，建议使用[【追加待签文件】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/fuuzv5)接口追加。

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/attachments

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **<font style="color:black;">参数名称</font>** | | **<font style="color:black;">参数类型</font>** | **<font style="color:black;">必选</font>** | **参数位置** | **<font style="color:black;">参数说明</font>** |
| --- | --- | --- | :---: | :---: | --- |
| signFlowId | | string | 是 | path | 签署流程ID  |
| attachmentList<font style="color:#E8323C;">（点击“+”展开详情）</font> | | array | 是 | body | 添加附属材料文件列表 |
|  | fileId | string | 是 | body | 附属材料文件ID |
| | fileName | string | 否 | body | <font style="color:#333333;">附属材料文件名称（含扩展名，如合同.pdf）</font><br/><font style="color:#F5222D;">补充说明：</font><br/>（1）文件名称必须包含文件扩展名，否则后续发起签署时无法通过校验。<br/>（2）文件扩展名必须与实际文件类型一致，否则后续签署会出现异常。例如：<br/>实际文件类型是PDF，请填写XX.pdf而不是xx.docx。<br/>（3）文件名称不支持以下9个字符：/ \ : * " < > | ? |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data | | | | | object | 否 | 业务数据 |


### 请求示例
```json
POST https://openapi.esign.cn/v3/sign-flow/a9084f28430**8ad0/attachments
{
	"attachmentList": [
		{
			"fileId": "ea3151***a53d3f4c",
			"fileName": "入职手册.pdf"
		}
	]
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": null
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)

