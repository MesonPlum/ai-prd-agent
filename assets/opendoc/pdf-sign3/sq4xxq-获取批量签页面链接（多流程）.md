### 接口描述
用于获取指定签署人名下的待签合同文件列表页面，签署人进行一次认证即可同时完成多个流程签署。

**（**[**点击了解 多流程批量签署**](https://qianxiaoxia.yuque.com/opendoc/case3/fagsf3x7nevhfihp)**）**

**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/batch-sign-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;"></font>** |
| --- | :---: | :---: | :---: | --- |
| operatorId | string | 是 | body | 签署人账号ID（请传入个人账号ID或企业经办人账号ID）   <font style="color:#E8323C;">【注】</font><font style="color:#DF2A3F;">账号ID可以通过</font>[【查询签署流程详情】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xxk4q6)<font style="color:#DF2A3F;">接口获取个人用户psnId</font> |
| signFlowIds | array | 是 | body | 待签署流程ID列表<font style="color:#E8323C;">（最多支持1000个流程签署）</font><br/>+ 通过[【查询签署流程列表】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/kq4b2e)接口获取到的signFlowId；<br/>+ 仅支持传入状态为“签署中”的流程ID。<br/>+ 当签署流程数超过**<font style="color:#DF2A3F;">100</font>**个时，页面会走异步签署，开发者需要接受[批量签署结果回调通知](https://qianxiaoxia.yuque.com/opendoc/notify3/ctdi52o8g7ffsx8g)做后续处理。 |
| noticeTypes | string | 否 | body | 批量签署通知类型，<font style="color:#DF2A3F;">默认不通知</font>（值为""空字符串），允许多种通知方式，请使用英文逗号分隔<br/>**"" **- 不通知<font style="color:#E8323C;">（默认值）</font><br/>**1** - 短信通知<font style="color:#DF2A3F;">（如果套餐内带“分项”字样，请确保开通【电子签名流量费（分项）认证】中的子项：【短信服务】，否则短信通知收不到）</font><br/>**2 **- 邮件通知<br/><font style="color:#E8323C;">补充说明：</font><br/>+ <font style="color:#E8323C;">在当前开发者应用ID下，同一个用户，一个自然日内最多收到</font>**<font style="color:#E8323C;">10条</font>**<font style="color:#E8323C;">批量签署通知（同一个证件号即是同一个用户）。</font><br/>+ 个人账号中需要绑定短信/邮件才有对应的通知方式；<br/>+ 该通知是签署方维度的，只控制签署人的签署提醒短信，不控制流程的撤销、完成、抄送等短信通知。 |
| forcedRead | boolean | 否 | body | 是否强制阅读，默认false<br/>true-强制阅读所有文件后才能签署<br/>false-不强制阅读 |
| clientType | string | 否 | body | 指定客户端类型，默认ALL<br/>ALL - 自动适配移动端或PC端<br/>H5 - 移动端适配<br/>PC - PC端适配 |
| redirectUrl | string | 否 | body | 重定向地址，签署完成结果页确认后跳转地址<br/><font style="color:#E8323C;">【注】贵司的重定向域名需要在e签宝提前放行，否则会报错：“您即将访问的页面可能有安全风险”。（</font>[点击跳转 重定向域名配置说明](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/umo8rop7dmttkdnv)<font style="color:#DF2A3F;">）</font> |
| appScheme | string | 否 | body | AppScheme，主要用于支付宝人脸认证重定向时跳回开发者自身App。<br/>示例值：esign://demo/signBack<br/>**（**[**点击了解  APP内嵌签署/认证H5对接说明**](https://qianxiaoxia.yuque.com/opendoc/case3/ovb0e40do4fnrr61)**）** |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
| | batchSerialId | | | | string | 否 | 批量签署批次号（标识本次批量签署任务） |
| | batchSignUrl | | | | string | 否 | 需登录批量签长链接（链接有效期2小时）<br/><font style="color:#DF2A3F;">【注】支持自定义域名，微信小程序H5内嵌场景需要使用长链接</font> |
| | batchSignShortUrl | | | | string | 否 | 需登录批量签短链接（链接有效期2小时） |
| | batchSignUrlWithoutLogin | | | | string | 否 | 免登录批量签长链接（链接有效期2小时）<br/><font style="color:#DF2A3F;">【注】支持自定义域名，微信小程序H5内嵌场景需要使用长链接</font> |
| | batchSignShortUrlWithoutLogin | | | | string | 否 | 免登录批量签短链接（链接有效期2小时） |


### 请求示例
```json
{
    "operatorId":"c7e0029472914ce4a3xxxe7",
    "redirectUrl":"xxx",
    "signFlowIds":["ba619b6d0***bf8e9xxe4","7b90e0d09***29a67dx53"]
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "batchSerialId": "api-batch-sign-3c3e8efc5*****ad0403a1021c",
        "batchSignUrl": "https://h5.esign.cn/mesign/batchsign/guide?context=Xj**fR&batchSerialId=api-batch-51ae2****9a954581db&tsign_source_type=SIGN_LINK_XUANYUAN&tsign_source_detail=1vGqUyZBm8k4aIosrZzTBwWnV2I1g4UB0OAxYE6sa91zI0%2FoJj3R7FKUZEeoKkklf1znfL22PeRUYAl8NCRQ%2BbBGhKB1TP9NSoNklLj%2FPTaARYB%2Bw3PPrphpz72szoc4iwILDHQ95H6OoKl0tNtygNh5kQ5rLc0rmRFzUHMPmGgC3JtO9puMWcqzHsw7GUdJ%2F%2FdA7&appId=511***",
        "batchSignShortUrl": "https://t.esign.cn/Rb***x",
        "batchSignUrlWithoutLogin": "https://h5.esign.cn/mesign/batchsign/guide?context=TO**IY&batchSerialId=api-batch-51ae2eb9******554581db&tsign_source_type=SIGN_LINK_XUANYUAN&tsign_source_detail=1vGqUyZBm8k4aIosrZzTBwWneRUYAl8NCRQ%2BbBGhKtTDCNc1EfDWAJpgZxx4XY1xs4z7LJqPU7FqA09VjIh6eB1TP9NSoNklLj%2FPTaARYB%2Bw3PPrphpz72zCF06KDLdV2jw59qszoc4iwILDHQ95H6OoKl0tNtygNh5kQ5rLc0rmRFzUHMPmGgC3A7&appId=5111****",
        "batchSignShortUrlWithoutLogin": "https://t.esign.cn/qW***HU"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)



