### 接口描述
发起签署时，开发者可指定签署方签署通知的方式（短信通知或邮件通知），签署人访问签署链接以进行相关操作；

当开发者需要在业务系统中访问签署链接或自行发送签署通知时，可通过此接口获取合同的签署/预览链接。

:::warning
+ 签署流程开启后，才可以获取到文件的签署链接。流程若未开启，请调用[【开启签署流程】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/pu4xsx)接口。

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/sign-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | :---: | :---: | :---: | --- |
| signFlowId | | string | 是 | path | 签署流程ID |
| needLogin | | boolean | 否 | body | 是否需要登录打开链接（默认值 false）<br/>**true **- 需登录打开链接，**false **- 免登录 |
| urlType | | int32 | 否 | body | 链接类型（默认值 2）<br/>** 1** - 预览链接（仅限查看，不能签署），** 2** - 签署链接 |
| operator<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | object | 是 | body | 个人签署方（机构签署传经办人信息）<br/>+ 当获取签署链接场景，需传入当前流程流转到的签署操作人信息。<br/>+ psnAccount与psnId二选一传入<font style="color:#DF2A3F;">（必须与发起签署时的账号保持一致）</font><br/><font style="color:#DF2A3F;">【补充说明】：</font><br/>+ **<font style="color:#DF2A3F;">该字段为大多数场景下的必传字段</font>**<font style="color:#DF2A3F;">。若不传此参数，系统将默认使用appId对应的主体信息，并自动获取平台方的合同预览地址（注：仅适用于未指定签署流程发起方，默认由平台发起的流程场景）。</font> |
|  | psnAccount | string | 否 | body | 签署操作人账号标识（手机号/邮箱号） |
| | psnId | string | 否 | body | 签署操作人账号ID（个人账号ID） |
| organization<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | object | 否 | body | 机构签署方<br/>+ 一个流程中存在经办人代多个机构签署时，通过此参数分别获取对应机构的签署链接；<br/>+ orgId与orgName二选一传入<font style="color:#DF2A3F;">（必须与发起签署时账号保持一致）</font> |
|  | orgId | string | 否 | body | 机构账号ID |
| | orgName | string | 否 | body | 机构名称 |
| redirectConfig<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | object | 否 | body | 重定向配置项 |
|  | redirectUrl | string | 否 | body | 签署完成后跳转页面（除app和小程序端集成外，地址需符合 https /http 协议地址）<br/><font style="color:#E8323C;">【注】</font><br/>+ <font style="color:#E8323C;"></font><font style="color:#DF2A3F;">贵司的重定向域名需要在e签宝提前放行，否则会报错：“您即将访问的</font><font style="color:#E8323C;">页面可能有安全风险”。（</font>[点击跳转 重定向域名配置说明](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/umo8rop7dmttkdnv)<font style="color:#DF2A3F;">）</font><br/>+ <font style="color:#DF2A3F;">签署完成后会在贵司重定向地址上拼接签署状态等字段。（</font>[点击跳转 签署页重定向跳转说明](https://qianxiaoxia.yuque.com/opendoc/notify3/madi1g)<font style="color:#DF2A3F;">）</font> |
| | redirectDelayTime | int32 | 否 | body | 操作完成重定向跳转延迟时间，单位秒<font style="color:#DF2A3F;">（可选值0、3，默认值为 3）</font><br/>+ 传**0**时，签署完成直接跳转重定向地址；<br/>+ 传**3**时，展示签署完成结果页，倒计时3秒后，自动跳转重定向地址。<br/><font style="color:#DF2A3F;">【注】当redirectUrl不传的情况下，该字段无需传入，签署完成不跳转</font> |
| clientType | | string | 否 | body | 指定客户端类型，当urlType为2（签署链接）时生效<br/>**H5 **- 移动端适配<br/>**PC **- PC端适配<br/>**ALL **- 自动适配移动端或PC端<font style="color:#DF2A3F;">（默认值）</font><br/><font style="color:#DF2A3F;">【注】参数值均为大写的英文</font> |
| appScheme | | string | 否 | body | AppScheme，主要用于支付宝人脸认证重定向时跳回开发者自身App。<br/>示例值：esign://demo/signBack<br/>**（**[**点击了解  APP内嵌签署/认证H5对接说明**](https://qianxiaoxia.yuque.com/opendoc/case3/ovb0e40do4fnrr61)**）** |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
| | shortUrl | | | | string | 否 | 签署短链接<font style="color:#E8323C;">（有效期90天）</font> |
| | url | | | | string | 否 | 签署长链接<font style="color:#E8323C;">（永久有效）</font><br/><font style="color:#DF2A3F;">【注】小程序H5内嵌场景需要使用长链接，支持自定义域名，</font>[详见小程序域名配置说明](https://open.esign.cn/doc/opendoc/dev-guide3/oyzxrr) |


### 请求示例
```json
POST https://openapi.esign.cn/v3/sign-flow/b2cb7**3cc54/sign-url
{
  "clientType": "ALL",
  "needLogin": true,
  "operator": {
    "psnAccount": "183****0101"
  },
  "urlType": 2
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "url": "https://h5.esign.cn/mesign/guide?context=HM***q&flowId=9d83******b114a15b19&organ=false&appId=511***&linkSource=1&bizType=1&tsign_source_type=SIGN_LINK_XUANYUAN&tsign_source_detail=1vGqUyZBm****QaNBCvlH3PBYvYbA7LZOWPUn%2B2y1znV8jGwtcB5ejKxXfw3OpJk58vs4esvzIrRwiKOp0AV5uPU36CTcFOly%2BOsLQLJSNkFOz6hxxel8ULfKYc6oJGUSCASG7FqUIeMDX1ansmdvnrEkGjnC4o61jG13SZ1lwSieimaLPesHRzaQVttcIeZLrUd%2FB2Mp%2B",
        "shortUrl": "https://t.esign.cn/SM***I"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)



