### 接口描述
**<font style="color:#F5222D;">自2023年6月16日起，该接口由原名“获取合同解约链接”更名为“通过页面发起合同解约”，接口内容无变化。</font>**

原流程中的合同文件在签署方<font style="color:#F5222D;">均已完成签署</font>的前提下，其中的任一签署方或原流程的发起方可以申请发起合同解约，e签宝提供发起合同解约的页面，通过页面发起解约成功后，签署方收到解约协议签署链接，签署方之间重新签订一份 <font style="color:#F5222D;">“解约协议”</font>，“解约协议”签署成功后，原签署文件将失效。

**（**[**点击了解 合同解约服务**](https://qianxiaoxia.yuque.com/opendoc/case3/yzb0yg652qf68cgw)**）**

:::warning
**注意事项：**

+ <font style="color:#F5222D;">仅限已完成状态</font>流程中的<font style="color:#F5222D;">签署方或发起方</font>来发起合同解约；
+ 单方签署的流程<font style="color:#F5222D;">不支持</font>发起解约（流程中必须包含2个及以上的签署方）。

:::

[点击查看更多《合同解约服务常见问题》。](https://qianxiaoxia.yuque.com/docs/share/0cb83868-354b-412f-a79c-3932b623fa92)

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/rescission-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | | | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;">（请左右滑动查看完整描述）</font>** |
| --- | --- | --- | --- | :---: | :---: | :---: | --- |
| **signFlowId** | | | | string | 是 | path | 已完成状态的签署流程ID  |
| **rescissionInitiator** | | | | object | 是 | body | 合同解约发起方信息<br/>+ <font style="color:#E8323C;">仅原流程中的</font>**<font style="color:#E8323C;">签署方或发起方</font>**<font style="color:#E8323C;">可以发起解约；</font><br/>+ <font style="color:#DF2A3F;">发起方需先经过 </font>[**用户授权**](https://open.esign.cn/doc/opendoc/auth3/lmfokx)<font style="color:#DF2A3F;">（代个人/企业用户发起合同签署权限）；</font><br/>+ <font style="color:#E8323C;">psnInitiator与orgInitiator二选一传入。</font> |
|  | psnInitiator | | | object | 否 | body | 解约发起人信息 |
| |  | psnId | | string | 否 | body | 个人账号ID |
| | orgInitiator | | | object | 否 | body | 解约发起机构信息 |
| |  | orgId | | string | 否 | body | 机构账号ID |
| | | transactor | | object | 否 | body | 机构经办人信息 |
| | |  | psnId | string | 否 | body | 经办人账号ID |
| **signFlowConfig** | | | | object | 否 | body | 解约流程配置项 |
| | redirectConfig | | | object | 否 | body | 重定向配置项 |
| |  | redirectUrl | | string | 否 | body | 解约协议签署完成后跳转页面 |
| | | redirectDelayTime | | int32 | 否 | body | 操作完成后页面重定向跳转延迟时间，单位为秒，默认3秒。<br/>**0 - **不展示签署完成结果页，签署完成直接跳转重定向地址。<br/>**X **- 展示签署完成结果页，倒计时X秒后，自动跳转重定向地址<br/>注：当redirectUrl不传的情况下，该字段无需传入，默认签署完成结果页不跳转。 |
| | noticeConfig | | | object | 否 | body | 解约协议通知配置项（通知原流程中的签署方、抄送方） |
| | | noticeTypes | | string | 否 | body | 通知类型，默认值为""空字符串，允许多种通知方式，请使用英文逗号分隔<br/>** ""** - 不进行任何通知<br/> **1** - 短信通知<br/>** 2 **- 邮件通知 |
| | notifyUrl | | | string | 否 | body | 接收合同解约回调通知的Web地址<br/>详见[【签署回调通知接收说明】](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/sblzg8) |
| | clientType | | | string | 否 | body | 指定客户端类型，默认值：ALL<br/>H5 - 移动端适配<br/>PC - PC端适配<br/>ALL - 自动适配移动端或PC端<font style="color:#DF2A3F;">（默认值）</font><br/><font style="color:#DF2A3F;">【注】参数值均为大写的英文</font> |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data | | | | | object | 否 | 业务数据 |
|  | rescissionUrl | | | | string | 否 | 发起合同解约页面长链地址（永久有效） |
| | rescissionShortUrl | | | | string | 否 | 发起合同解约页面短链地址（有效期180天） |


### 请求示例
```json
{
    "rescissionInitiator":{
        "orgInitiator":{
            "orgId":"0c5bd49248***5648bfbf",
            "transactor":{
                "psnId":"c7e002947***310541e7"
            }
        }
    },
    "signFlowConfig":{
        "notifyUrl":"https://xx.xx.xx/callback"
    }
}
```

### 响应示例
```json
{
    "code":0,
    "message":"成功",
    "data":{
        "rescissionUrl":"https://openapi.esign.cn/start/rescind?context=xx&flowId=xx&chargeMode=1¬iceTypes=1,2&initiatorAccountId=xx&initiatorSubjectAccountId=xx&initiatorIdentityAccountType=2&tsign_source_type=SIGN_LINK_WUKONG&tsign_source_detail=16R2mv%xx%x%x%xx%x%xx",
        "rescissionShortUrl":"https://openapi.esign.cn/g1sX***R4wZ"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)

