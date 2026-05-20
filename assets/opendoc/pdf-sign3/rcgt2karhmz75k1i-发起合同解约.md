### 接口描述
原流程中的合同文件在签署方<font style="color:#F5222D;">均已完成签署</font>的前提下，其中的任一签署方或原流程的发起方可以申请发起合同解约。通过此接口发起合同解约后，再通过解约签署流程ID去调用【[获取签署页面链接](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/pvfkwd)】接口获取解约协议的签署链接（或者通过e签宝自带的短信/邮箱自动发送信息通知）。签署方收到解约协议签署链接后，重新签订一份 <font style="color:#F5222D;">“解约协议”</font>，“解约协议”签署成功后，原签署文件将失效。

**（**[**点击了解 合同解约服务**](https://qianxiaoxia.yuque.com/opendoc/case3/yzb0yg652qf68cgw)**）**

:::warning
**注意事项：**

+ 仅限已完成状态流程中的<font style="color:#F5222D;">签署方或发起方</font>来发起合同解约；
+ 单方签署的流程不支持发起解约（流程中必须包含2个及以上的签署方）。

:::

[点击查看更多《合同解约服务常见问题》。](https://qianxiaoxia.yuque.com/docs/share/0cb83868-354b-412f-a79c-3932b623fa92)

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/initiate-rescission

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | | | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;">（请左右滑动查看完整描述）</font>** |
| --- | --- | --- | --- | :---: | --- | --- | --- |
| **signFlowId** | | | | string | 是 | path | 已完成状态的签署流程ID  |
| **rescindFileList** | | | | list | 是 | body | 本次需要解约的签署文件ID列表（一次解约最多可添加<font style="color:#DF2A3F;">10</font>份文件）<br/><font style="color:rgb(245, 34, 45);">【注】</font>文件ID必须是原签署流程中的文件 |
| **rescindReason** | | | | string | 是 | body | 解约原因<font style="color:#DF2A3F;">（传对应的数字枚举值）</font><br/>**1** - 条款内容有误<br/>**2** - 印章选择错误<br/>**3** - 签署人信息错误<br/>**4** - 合作终止<br/>**5** - 其他 |
| **rescindReasonNotes** | | | | string | 否 | body | 解约原因说明，最长200字 |
| **rescissionInitiator** | | | | object | 是 | body | 合同解约发起方信息<br/>+ <font style="color:#E8323C;">仅原流程中的</font>**<font style="color:#E8323C;">签署方或发起方</font>**<font style="color:#E8323C;">可以发起解约；</font><br/>+ <font style="color:#DF2A3F;">发起方需先经过 </font>[**用户授权**](https://open.esign.cn/doc/opendoc/auth3/lmfokx)<font style="color:#DF2A3F;">（代个人/企业用户发起合同签署权限）；</font><br/>+ <font style="color:#E8323C;">psnInitiator与orgInitiator二选一传入。</font> |
|  | psnInitiator | | | object | 否 | body | 解约发起人信息 |
| |  | psnId | | string | 否 | body | 个人账号ID |
| | orgInitiator | | | object | 否 | body | 解约发起机构信息 |
| |  | orgId | | string | 否 | body | 机构账号ID |
| | | transactor | | object | 否 | body | 机构经办人信息 |
| | |  | psnId | string | 否 | body | 经办人账号ID |
| **signFlowConfig** | | | | object | 否 | body | 解约流程配置项 |
| | signFlowExpireTime | | | int64 | 否 | body | 解约流程签署截止时间， <font style="color:#E8323C;">unix时间戳（毫秒）格式</font>（[点击了解 指定签署截止日期](https://qianxiaoxia.yuque.com/opendoc/case3/rhb8htbiaq8hl3td)）<br/><font style="color:#F5222D;">补充说明：</font><br/>默认在签署流程创建后的**90天**时截止<font style="color:#DF2A3F;">（指定值最大不能超过90天，只能指定90天内的时间戳）</font>。签署中如需延期请调用[【延期签署截止时间】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/idv0fv)接口。 |
| | signConfig<font style="color:rgb(232, 50, 60);"></font> | | | object | 否 | body | 签署配置项 |
| | | availableSignClientTypes | | string | 否 | body | 签署终端类型，默认值1和2（英文逗号分隔）<br/>**1** - 网页（自适配H5/PC样式），**2** - 支付宝 |
| | | psnSealStyles | | string | 否 | body | 页面可选个人印章样式，默认值0和1（英文逗号分隔）<br/>0 - 手写签名<br/>1 - 姓名印章<br/>2 - 手写签名AI校验 |
| | noticeConfig | | | object | 否 | body | 解约协议通知配置项（通知原流程中的签署方、抄送方） |
| | | noticeTypes | | string | 否 | body | 通知类型，默认值为""空字符串，允许多种通知方式，请使用英文逗号分隔<br/>** ""** - 不进行任何通知<br/> **1** - 短信通知<font style="color:#DF2A3F;">（如果套餐内带“分项”字样，请确保开通【电子签名流量费（分项）认证】中的子项：【短信服务】，否则短信通知收不到）</font><br/>** 2 **- 邮件通知<br/><font style="color:#E8323C;">【注】个人账号中需要绑定短信/邮件才有对应的通知方式。</font> |
| | | examineNotice | | boolean | 否 | body | 通知给企业印章用印审批人员的通知类型，按照账号中的手机号或邮箱的填写情况进行通知。<br/>不传 - 取noticeTypes的配置   true - 发送通知   false - 不发送通知 |
| | notifyUrl | | | string | 否 | body | 接收合同解约回调通知的Web地址<br/>详见[【签署回调通知接收说明】](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/sblzg8) |
| **autoSignOrg** | | | | array | 否 | body | 指定本次解约使用自动签署的机构签署方<br/><font style="color:rgb(245, 34, 45);">补充说明：</font><br/>+ 只有appId所属的平台方企业或者授权平台方印章的企业才能自动签署<br/>+ 跨企业印章授权的解约自动签，必须传入印章归属方的授权方（委托方）企业信息<br/>+ 同一个企业，必须选择平台自动签和经办人手动签中的一种，且不能同时选择（**autoSignOrg**和**orgSignerTransactor**） |
|  | orgId | | | string | 否 | body | 机构签署方账号ID<font style="color:rgb(245, 34, 45);">（orgName与orgId二选一传值即可）</font> |
| | orgName | | | string | 否 | body | 机构签署方名称<font style="color:rgb(245, 34, 45);">（orgName与orgId二选一传值即可）</font> |
| | sealId | | | string | 否 | body | 若自动签，该参数必传，且必须传入解约参与方的印章ID<font style="color:rgb(245, 34, 45);">（必须是企业印章ID，不能使用法人章）</font> |
| **orgSignerTransactor** | | | | array | 否 | body | 指定本次解约机构签署方经办人信息<br/><font style="color:#DF2A3F;">补充说明：</font><br/>+ 可以在这里指定更换原有签署机构的经办人；<br/>+ 若原有流程是机构自动签署的话是没有经办人信息的，可以通过**autoSignOrg**指定自动签署。 |
|  | orgId | | | string | 否 | body | 机构签署方账号ID<font style="color:#DF2A3F;">（orgName与orgId二选一传值即可）</font> |
| | orgName | | | string | 否 | body | 机构签署方名称<font style="color:#DF2A3F;">（orgName与orgId二选一传值即可）</font> |
| | transactorInfo | | | object | 否 | body | 机构经办人信息 |
| |  | psnId | | string | 否 | body | 经办人ID<font style="color:#DF2A3F;">（指定orgId时，传该参数）</font> |
| | | psnAccount | | string | 否 | body | 经办人账号<font style="color:#DF2A3F;">（指定orgName时，传该参数）</font> |
| | | psnName | | string | 否 | body | 经办人姓名 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data | | | | | object | 否 | 业务数据 |
|  | signFlowId | | | | string | 否 | 解约协议签署流程ID |


### 请求示例
_<font style="color:#DF2A3F;">构造请求JSON时，请结合上方【请求参数】中参数名称、参数类型、必选和参数位置的描述进行设置。</font>_

```json
{
    "rescindReason": "1",
    "rescindFileList": [
        "f78dd1****33f0d122b74"
    ],
    "rescissionInitiator": {
        "orgInitiator": {
            "orgId": "842ec8ce3*****5fc91662f",
            "transactor": {
                "psnId": "7ffcae******0ef0a8f6"
            }
        }
    },
    "signFlowConfig": {
        "notifyUrl": "http://*******/notify"
    },
    "orgSignerTransactor": [
        {
            "orgName": "********有限公司",
            "transactorInfo": {
                "psnAccount": "153****0000"
            }
        }
    ]
}
```

### 响应示例
_<font style="color:#DF2A3F;">解析响应JSON时，请结合上方【响应参数】中描述进行处理。同时需要考虑进行</font>_[_JSON反序列化容错_](https://qianxiaoxia.yuque.com/opendoc/helper/hnmqsc)_<font style="color:#DF2A3F;">处理。</font>_

```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "signFlowId": "0f0c2112f******4ed3aea"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)

