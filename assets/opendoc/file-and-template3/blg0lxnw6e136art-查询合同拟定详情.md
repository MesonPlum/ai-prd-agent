### 接口描述
查询流程中合同拟定的具体详情信息。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/draft-detail

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | --- | --- | --- |
| signFlowId | string | 是 | path | 签署流程ID  |


### 响应参数
| 参数名称 | | |  | | | 参数类型 | 必选 | 参数说明 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| code | | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | | string | 否 | 业务信息 <br/>请根据 code 来判断错误情况，不应该依赖message 匹配，因为message 可能会调整。 |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | | object | 否 | 业务数据 |
| <br/> | draftStatus | | | | | int32 | 是 | 拟定流程状态<br/>1-拟定中<br/>2-完成<br/>3-撤销<br/>4-拒填<br/>5-过期（填写截至日期到期后触发） |
| | draftStartTime | | | | | int64 | 否 | 拟定流程开启时间，时间戳 |
| | draftEndTime | | | | | int64 | 否 | 拟定流程结束时间，时间戳 |
| | signTemplateId | | | | | string | 是 | 签署流程模板ID |
| | signFlowInitiator<font style="color:#DF2A3F;">（点击“+”展开详情）</font> | | | | | object | 是 | 签署流程发起方 |
| |    <br/>   <br/>    | orgId | | | | string | 否    | 机构发起方的ID |
| | | transactor | | | | object | 否 | 机构发起方的发起人 |
| | |  | psnId | | | string | 否 | 发起人的个人ID |
| | signFlowConfig<font style="color:#DF2A3F;">（点击“+”展开详情）</font> | | | | | object | 是 | 签署流程配置 |
| | | signFlowTitle | | | | string | 是 | 签署任务主题（将展示在发起页面中，页面默认允许用户修改主题）<br/><font style="color:#E8323C;">【注】</font>主题名称不可含有以下9个特殊字符：/ \ : * " < > | ？以及所有emoji表情 |
| | | signFlowExpireTime | | | | int64 | 否 | 签署截止时间（将展示在发起页面中，页面默认允许用户修改截止时间）<br/><font style="color:#F5222D;">【注】</font>Unix时间戳格式（单位：毫秒），默认在签署流程创建后的**90天**时截止 |
| | | <font style="color:rgb(64, 64, 64);">autoStart</font> | | | | <font style="color:rgb(64, 64, 64);">boolean</font> | <font style="color:rgb(64, 64, 64);">否</font> | 拟定完成后自动开启签署流程，<font style="color:rgb(64, 64, 64);">默认值 true</font><br/>**<font style="color:rgb(64, 64, 64);">true</font>**<font style="color:rgb(64, 64, 64);"> - 自动开启</font><br/>**<font style="color:rgb(64, 64, 64);">false </font>**<font style="color:rgb(64, 64, 64);">- 非自动开启</font> |
| | | autoFinish | | | | boolean | 否 | 所有签署方签署完成后签署流程自动完结，默认值 false<br/>**true **- 自动完结<br/>**false **- 非自动完结，需调用[【完结签署流程】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/ynwqsm)接口完结<br/><font style="color:#E8323C;">【注】</font>设置了自动完结的流程中不允许再追加签署区、抄送方，[点击这里](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/gsy6xe)了解更多流程状态说明。 |
| | | chargeConfig<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | 计费配置项 |
| | | | chargeMode | | | int32 | 否 | 计费模式，默认0<font style="color:rgb(0, 0, 0);"></font><br/>**0** - 接口集成方付费（指应用ID所属企业）<br/>**1** - 发起方企业付费（发起方见下文signFlowInitiator参数，需获取发起方的套餐订单使用授权，且发起方必须是企业）<br/>**2 **- 签署方付费（需提前购买套餐） |
| | | | orderType | | | string | 否 | 订单套餐类型，默认为普通订单套餐。<br/>可选值：DISTRIBUTION - 生态伙伴订单套餐<br/><font style="color:#DF2A3F;">【注】</font>只有已登记成为e签宝生态伙伴之后，才允许传值DISTRIBUTION |
| | | signConfig<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | 签署配置项 |
| | |  | availableSignClientTypes | | | string | 否 | 签署终端类型，默认值1和2（英文逗号分隔）<br/>**1** - 网页（自适配H5/PC样式），**2** - 支付宝，**3** - 微信小程序（需联系e签宝技术开通），**4** - e签宝app |
| | | noticeConfig<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | 流程整体通知配置项 |
| | | | noticeTypes | | | string | 否 | 通知类型，允许多种通知方式，请使用英文逗号分隔<br/>传空 - 不通知<font style="color:#E8323C;">（默认值）</font><br/>**1** - 短信通知<br/>**2 **- 邮件通知<br/>通知发起方、签署方、抄送方，<font style="color:#F5222D;">默认值为""</font>空字符串<br/><font style="color:#E8323C;">【注】个人账号中需要绑定短信/邮件才有对应的通知方式。</font> |
| | | | examineNotice | | | boolean | 否 | 通知给企业印章用印审批人员的通知类型，按照账号中的手机号或邮箱的填写情况进行通知。<br/><font style="color:#E8323C;">不传值默认取noticeTypes配置的通知方式</font>   **true** - 发送消息（短信+邮件+e签宝官网站内信）   **false** - 不发送消息 |
| | | notifyUrl | | | | string | 否 | 接收相关回调通知的Web地址，详见[【签署回调通知接收说明】](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/sblzg8)。 |
| | | authConfig<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | 流程整体认证配置项 |
| | | | psnAvailableAuthModes | | | list | 否 | 个人实名认证方式，可选值：<br/>+ **PSN_MOBILE3 **- 个人运营商三要素认证<br/>+ **PSN_FACE **- 刷脸认证<br/>+ **PSN_BANKCARD4 **- 个人银行卡四要素认证 |
| | | | orgAvailableAuthModes | | | list | 否 | 机构实名认证方式，可选值：<br/>+ **ORG_BANK_TRANSFER **- 组织机构对公账户打款认证<br/>+ **ORG_ALIPAY_CREDIT **- 企业支付宝认证<br/>+ **ORG_LEGALREP_AUTHORIZATION **- 组织机构授权委托书认证<br/>+ **ORG_LEGALREP **- 法定代表人本人认证 |
| | drafters<font style="color:#DF2A3F;">（点击“+”展开详情）</font> | | | | | array | 否 | 填写方信息 |
| |  | participantId | | | | object | 否 | 参与方ID |
| | | participantFlag | | | | object | 否 | 参与方标识 |
| | | draftOrder | | | | int | 否 | 填写顺序 |
| | | draftStatus | | | | int | 否 | 填写状态<br/>1-未填写<br/>2-填写中<br/>3-已填写<br/>4-拒填 |
| | |    statusUpdateTime | | | | int | 否 | 签署区状态更新时间，Unix时间戳（毫秒级）<br/>当status=1时，updataTime为签署流程创建时间；<br/>当status=2时，updataTime为填写任务创建的时间；<br/>当status=3时，updataTime为填写完成时间；<br/>当status=4时，updataTime为拒填时间； |
| | | orgDrafter | | | | object | 否 | 企业填写方 |
| | |  | orgId | | | string | 否 | 企业ID |
| | | | orgName | | | string | 否 | 企业名称 |
| | | | transactor<font style="color:#DF2A3F;"></font> | | | object | 否 | 企业参与方经办人 |
| | | |  | transactorPsnId | | string | 否 | 经办人个人ID |
| | | | | transactorPsnAccount | | string | 否 | 经办人手机号/邮箱 |
| | | | | transactorName | | string | 否 | 经办人姓名 |
| | | psnDrafter | | | | object | 否 | 个人填写方 |
| | |    <br/>    | psnId | | | string | 否 | 个人ID |
| | | | psnAccount | | | string | 否 | 个人手机号/邮箱 |
| | | | psnName | | | string | 否 | 个人姓名 |
| | docs<font style="color:#DF2A3F;">（点击“+”展开详情）</font> | | | | | array | 是 | 待签名文件信息 |
| |    <br/>    | fileId | | | | string | 否 | 文件ID |
| | | fileName | | | | string | 否 | 文件名称 |
| | | downloadUrl | | | | string | 是 | 文件下载地址<font style="color:#F5222D;">（合同完成拟定后才返回，有效期为60分钟，过期后可以重新调用接口获取新的下载地址）</font> |


### 请求示例
```http
//正式线上环境--GET请求
GET 'https://openapi.esign.cn/v3/sign-flow/6b498644****11b590803b800/draft-detail'

//沙箱模拟环境--GET请求
GET 'https://smlopenapi.esign.cn/v3/sign-flow/b3713b6****fd1db463/draft-detail'
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "draftStatus": 2,
        "draftStartTime": 1676959879000,
        "draftEndTime": 1676969696000,
        "signFlowInitiator": {
            "orgId": "842ec*****5fc91662f",
            "transactor": null
        },
        "signTemplateId": "57e956d****c300700b65",
        "signFlowConfig": {
            "signFlowTitle": "这是本次签署任务的主题",
            "autoStart": true,
            "autoFinish": true,
            "signFlowExpireTime": 1684735878137,
            "notifyUrl": "http://xx.xx.xx.xx/notify",
            "chargeConfig": {
                "chargeMode": 0,
                "orderType": null
            },
            "noticeConfig": {
                "noticeTypes": "1",
                "examineNotice": null
            },
            "signConfig": {
                "availableSignClientTypes": "1"
            },
            "authConfig": {
                "psnAvailableAuthModes": [
                    "PSN_MOBILE3"
                ],
                "orgAvailableAuthModes": [
                    "ORG_BANK_TRANSFER"
                ]
            }
        },
        "drafters": [
            {
                "participantId": "deb9*****c3457b",
                "participantFlag": "签署方1",
                "draftOrder": 1,
                "draftStatus": 3,
                "statusUpdateTime": 1676959947000,
                "orgDrafter": {
                    "orgId": "0daec21******",
                    "orgName": "企业名字****",
                    "transactor": {
                        "transactorPsnId": "39c4d66*****634438c8",
                        "transactorPsnAccount": "153****650",
                        "transactorName": "张三"
                    }
                },
                "psnDrafter": null
            },
            {
                "participantId": "0ac59a6******0dc82",
                "participantFlag": "签署方2",
                "draftOrder": 2,
                "draftStatus": 3,
                "statusUpdateTime": 1676969696000,
                "orgDrafter": null,
                "psnDrafter": {
                    "psnId": "626629*******f1d8c1d",
                    "psnAccount": "166*****61",
                    "psnName": "李四"
                }
            }
        ],
        "docs": [
            {
                "fileId": "1567864*******5b49d4",
                "fileName": "软件销售合同.pdf",
                "downloadUrl": "https://esignoss.esign.cn/1111564182/8db5e086-6****4-9bd1-7a924af225ab/%E8%BD%AF%***%80%E5%94%AE%E5%90%88%E5%90%8C.pdf?Expires=1676975781&OSSAccessKeyId=LTAI4G23YViiKnxTC28ygQzF&Signature=sBm8boVOvsU7tgsmUeCi%2Bjilh3Y%3D"
            }
        ]
    }
}
```

