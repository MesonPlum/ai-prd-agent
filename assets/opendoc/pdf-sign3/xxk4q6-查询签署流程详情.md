### 接口描述
查询签署流程的基本信息

+ [点击这里](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/gsy6xe)了解更多流程状态说明。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/detail

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **<font style="color:black;">参数名称</font>** | **参数类型** | **<font style="color:black;">必选</font>** | **参数位置** | **<font style="color:black;">参数说明</font>** |
| --- | :---: | :---: | :---: | --- |
| signFlowId | string | 是 | path | 签署流程ID<br/><font style="color:#DF2A3F;">注：</font><br/><font style="color:#DF2A3F;">如发起签署时有指定发起方，必须确保有代表用户发起合同签署以及查询合同签署详情权限（org_initiate_sign/psn_initiate_sign），</font>[点击查看如何授权](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7) |


### 响应参数
| **参数名称** | | | | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | --- | --- | --- | :---: | --- | --- |
| code | | | | | | int32 | 是 | 业务码，<br/>0表示成功，非0表示异常。 |
| message | | | | | | string | 否 | 业务信息<br/><font style="color:#E8323C;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| **data**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | | **object** | **否** | **业务数据** |
|  | signFlowStatus | | | | | int32 | 否 | 当前流程的状态<br/>**0 **- 草稿<br/>**1** - 签署中<br/>**2** - 完成<br/>**3 **- 撤销<br/>**5** - 过期（签署截至日期到期后触发）<br/>**7 **- 拒签<br/>[点击这里](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/gsy6xe)了解更多流程状态说明。 |
| | signFlowDescription | | | | | string | 否 | 签署流程描述<br/>如果流程已拒签或已撤销，并且存在拒签或撤回原因，流程描述显示为原因,，否则默认为流程状态描述 |
| | rescissionStatus | | | | | int32 | 否 | 签署流程的解约状态<br/>**0** - 未解约<br/>**1 **- 解约中<br/>**2** - 部分解约<br/>**3** - 已解约 |
| | rescissionSignFlowIds | | | | | list | 否 | 对应的**解约协议**签署流程ID |
| | revokeReason | | | | | string | 否 | 撤销原因（签署流程撤销时指定的原因，signFlowStatus为3时才可能返回） |
| | signFlowCreateTime | | | | | int64 | 否 | 签署流程创建时间（毫秒级时间戳格式） |
| | signFlowStartTime | | | | | int64 | 否 | 签署流程开启时间（毫秒级时间戳格式） |
| | signFlowFinishTime | | | | | int64 | 否 | 签署流程结束时间（毫秒级时间戳格式） |
| | **signFlowInitiator**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **object** | **否** | **签署流程发起方** |
| |  | psnInitiator | | | | object | 否 | 个人发起方信息 |
| | | | psnId | | | string | 否 | 个人发起方账号ID |
| | | | psnName | | | string | 否 | 个人发起方姓名 |
| | | orgInitiator | | | | object | 否 | 机构发起方信息 |
| | |  | orgId | | | string | 否 | 机构发起方账号ID |
| | | | orgName | | | string | 否 | 机构发起方企业名称 |
| | | | transactor | | | object | 否 | 机构发起方的经办人 |
| | | | | psnId | | string | 否 | 经办人账号ID |
| | | | | psnName | | string | 否 | 经办人姓名 |
| | **signFlowConfig**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **object** | **否** | **签署流程配置项** |
| |  | signFlowTitle | | | | string | 否 | 签署流程标题 |
| | | contractGroupIds | | | | list | 否 | 企业合同归档文件夹ID<br/><font style="color:#E8323C;">【注】</font><font style="color:#DF2A3F;">通过</font>[e签宝SaaS官网](https://www.esign.cn/)<font style="color:#DF2A3F;">进行设置的归档分类文件夹，如未设置则此字段返回空</font> |
| | | autoFinish | | | | boolean | 否 | 签署流程是否自动完结<br/>true - 自动完结（所有签署方签署完成后触发）<br/>false - 非自动完结 |
| | | signFlowExpireTime | | | | int64 | 否 | 签署截止时间 unix时间戳（毫秒）格式 |
| | | notifyUrl | | | | string | 否 | 接收回调通知的Web地址 |
| | | chargeConfig | | | | object | 否 | 计费配置项 |
| | |  | chargeMode | | | int32 | 否 | 计费模式，默认0<br/>0 - 接口集成方付费（指应用ID所属企业）<br/>1 - 发起方企业付费（signFlowInitiator参数对应企业） |
| | | | orderType | | | string | 否 | 订单套餐类型，默认为普通订单套餐。<br/>DISTRIBUTION - 渠道订单套餐 |
| | | | barrierCode | | | string | 否 | 订单隔离码（预留参数，开发者可忽略） |
| | | noticeConfig | | | | object | 否 | 流程整体通知配置项 |
| | | | noticeTypes | | | string | 否 | 通知类型, 通知发起方、签署方、抄送方<br/>空 - 不通知<br/>1 - 短信通知<br/>2 - 邮件通知 |
| | | | examineNotice | | | boolean | 否 | 通知给企业印章用印审批人员的通知类型，默认不指定时返回：null（取noticeTypes配置的通知方式）<br/>true - 发送消息（短信+邮件+e签宝官网站内信）<br/>false - 不发送消息 |
| | | signConfig | | | | object | 否 | 签署配置项 |
| | | | availableSignClientTypes | | | string | 否 | 签署终端类型<br/>1 - 网页（自适配H5/PC样式）<br/>2 - 支付宝 |
| | | | showBatchDropSealButton | | | boolbean | 否 | 签署页面是否显示“一键落章”按钮<br/>true  - 显示“一键落章”<br/>false - 不显示“一键落章” |
| | | | signMode | | | string | 否 | 签署模式<br/>**NORMAL** - 中国大陆签<br/>**GLOBAL** - 海外签 |
| | | | dedicatedCloudId | | | string | 否 | 专属云项目ID |
| | | | forcedNotarize | | | boolean | 否 | 是否需要赋强公证<br/>**true** - 需要<br/>**false** - 不需要 |
| | | | serviceCode | | | string | 否 | 赋强公证服务编号 |
| | | authConfig | | | | object | 否 | 流程整体认证配置项 |
| | |  | psnAvailableAuthModes | | | list | 否 | 个人实名认证方式可选项<br/>**PSN_MOBILE3 **- 个人运营商三要素认证<br/>**PSN_FACE **- 刷脸认证<br/>**PSN_BANKCARD4 **- 个人银行卡四要素认证 |
| | | | orgAvailableAuthModes | | | list | 否 | 机构实名认证方式可选项<br/>**ORG_BANK_TRANSFER **- 对公打款认证<br/>**ORG_ALIPAY_CREDIT **- 法人快捷认证<font style="color:#DF2A3F;"></font><br/>**ORG_LEGALREP_AUTHORIZATION **- 法人授权认证<br/>**ORG_LEGALREP **- 法定代表人认证<font style="color:#DF2A3F;"></font> |
| | | | willingnessAuthModes | | | list | 否 | 签署意愿认证方式可选项<br/>**CODE_SMS** - 短信验证码<br/>**PSN_FACE_ALIPAY** - 支付宝刷脸<br/>**PSN_FACE_TECENT **- 腾讯云刷脸<br/>**PSN_FACE_ESIGN **- 快捷刷脸<br/>**PSN_FACE_WECHAT **- 微信小程序刷脸 |
| | | | audioVideoTemplateId | | | list | 否 | （预留参数，开发者可忽略） |
| | **docs**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **array** | **否** | **签署文件信息** |
| | | fileId | | | | string | 否 | 签署文件ID |
| | | fileName | | | | string | 否 | 签署文件名称 |
| | | fileEditPwd | | | | string | 否 | 文件编辑密码 |
| | | contractNum | | | | string | 否 | 合同编号<br/><font style="color:#E8323C;">【注】</font><font style="color:rgb(232, 50, 60);">根据e签宝SaaS官网上设置的规则生成（</font>[点击查看 如何设置合同编号](https://help.esign.cn/detail?id=aq1itcl9xnzes6a4&nameSpace=cs3-dept%2Fexboae)<font style="color:rgb(232, 50, 60);">），用户未设置则取默认生成的合同编号</font> |
| | | contractBizTypeId | | | | string | 否 | 合同类型ID<br/><font style="color:#E8323C;">【注】</font><font style="color:#DF2A3F;">通过</font>[e签宝SaaS官网](https://www.esign.cn/)<font style="color:#DF2A3F;">进行设置的合同类型，如未设置则此字段返回空</font> |
| | **attachments**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **array** | **否** | **附件信息** |
| | | fileId | | | | string | 否 | 附件文件ID |
| | | fileName | | | | string | 否 | 附件名称 |
| | | signerUpload | | | | boolean | 否 | 是否为签署方上传的附件<br/>true - 是<br/>false - 否 |
| | **signers**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **array** | **否** | **签署方信息** |
| | | psnSigner | | | | object | 否 | 个人签署方信息 |
| | |  | psnId | | | string | 否 | 个人账号ID |
| | | | psnName | | | string | 否 | 个人姓名 |
| | | | psnAccount | | | object | 否 | 个人账号标识（手机号/邮箱） |
| | | | | accountMobile | | string | 否 | 个人手机号 |
| | | | | accountEmail | | string | 否 | 个人邮箱号 |
| | | orgSigner | | | | object | 否 | 机构签署方信息 |
| | |  | orgId | | | string | 否 | 机构账号ID |
| | | | orgName | | | string | 否 | 机构名称 |
| | | | transactor | | | object | 否 | 机构经办人 |
| | | | | psnId | | string | 否 | 经办人账号ID |
| | | | | psnName | | string | 否 | 经办人姓名 |
| | | | | psnAccount | | object | 否 | 经办人账号信息 |
| | | | |  | accountMobile | string | 否 | 经办人手机号 |
| | | | | | accountEmail | string | 否 | 经办人邮箱号 |
| | | signerType | | | | int | 否 | 签署方类型<br/>**0 **-个人，**1 **-机构<font style="color:#DF2A3F;">（包含法定代表人和经办人签)</font><br/><font style="color:#E8323C;">【注】</font><font style="color:#DF2A3F;">具体的机构类型可以根据签署区中的signFieldSealType字段判断</font> |
| | | signOrder | | | | int | 否 | 签署顺序 |
| | | signStatus | | | | int | 否 | 当前签署状态<br/>0 - 等待签署<br/>1 - 签署中<br/>2 - 已签署<br/>3 - 等待审批<br/>4 - 已拒签 |
| | | notaryRole | | | | string | 否 | 该签署方是赋强公证中的何种角色<br/>**lender** - 出借方（同一个流程里需要有且只有一个）<br/>**borrower** - 借款人（同一个流程至少有一个）<br/>**guarantor **- 担保方（同一个流程可以没有或有多个） |
| | | signTaskType | | | | int32 | 否 | 签署任务类型<br/>0 - 会签<br/>1 - 或签 |
| | | uploadFiles | | | | array | 否 | 签署方在签署时上传的附件列表信息 |
| | |  | uploadDescription | | | string | 否 | 附件的标题描述 |
| | | | required | | | boolean | 否 | 此附件是否必传，默认**true**<br/>**true** - 必传<br/>**false** - 非必传 |
| | | | uploadFileId | | | string | 否 | 签署人上传的文件ID |
| | | | uploadFileName | | | string | 否 | 签署人上传的文件名称 |
| | | signerIp | | | | string | 否 | 签署人IP |
| | | signerLocation | | | | string | 否 | 签署人IP所属城市 |
| | | signFields | | | | array | 否 | 签署区信息 |
| | | | signFieldId | | | string | 否 | 签署区ID |
| | | | signFieldStatus | | | string | 否 | 当前签署区状态<br/>**0** - 等待执行<br/>**1 **- 执行中<br/>**2 **- 执行失败<br/>**3 **- 审批中<br/>**4 **- 执行完成 |
| | | | sealApprovalFlowId | | | string | 否 | 关联的用印审批流程ID |
| | | | statusUpdateTime | | | int64 | 否 | 签署区状态更新时间，Unix时间戳（毫秒级）<br/>当signFieldStatus=0时，statusUpdateTime为签署区创建时间；<br/>当signFieldStatus=1时，statusUpdateTime为签署区创建时间；<br/>当signFieldStatus=2时，statusUpdateTime为执行失败的时间；<br/>当signFieldStatus=3时，statusUpdateTime为审批提交时间；<br/>当signFieldStatus=4时，statusUpdateTime为签署区签署时间； |
| | | | failReason | | | string | 否 | 失败原因 |
| | | | customBizNum | | | string | 否 | 自定义业务编号（流水号）<br/>平台方可以自行传入，作为签署任务的唯一标识 |
| | | | fileId | | | string | 否 | 签署区所在文件ID |
| | | | signFieldType | | | int | 否 | 签署区类型，默认值为 0<br/>**0 **- 签章区 （添加印章、签名等）<br/>**1 **- 备注区（添加备注文字信息等）<br/>**2** - 独立签署日期（添加单独的签署日期） |
| | | | mustSign | | | boolean | 否 | 该签署区是否必须签署，默认 true<br/>**true** - 是<br/>**false** - 否 |
| | | | signFieldSealType | | | int | 否 | 签署区用印类型<br/>**0** - 个人签<br/>**1 **- 机构签<br/>**2** - 法定代表人签<br/>**3** - 经办人签 |
| | | | normalSignFieldConfig | | | object | 否 | 签章区配置信息 |
| | | |  | freeMode | | boolbean | 否 | 自由模式<br/>true  - 是，false - 否 |
| | | | | signFieldStyle | | int | 否 | 签章区样式<br/>**1** -单页签章区，**2** -骑缝签章区 |
| | | | | signFieldPosition | | object | 否 | 签章区位置信息 |
| | | | |  | positionPage | string | 否 | 签章区所在页码 |
| | | | | | positionX | float | 否 | 签章区所在X坐标 |
| | | | | | positionY | float | 否 | 签章区所在Y坐标 |
| | | | | movableSignField | | boolbean | 否 | 是否可以移动签章区   true  - 可以，false - 不可以 |
| | | | | autoSign | | boolbean | 否 | 是否自动签署<br/>true  - 后台自动执行签章，false - 页面手动操作签章 |
| | | | | sealStyle | | string | 否 | 印章样式<br/> 0 - 手写签名，1 - 印章 |
| | | | | sealId | | string | 否 | 印章ID |
| | | | | sealOwnerId | | string | 否 | 印章归属方用户账号ID<br/><font style="color:#DF2A3F;">补充说明：</font><br/>+ 签署的是企业章返回：企业章归属方的机构账号ID<br/>+ 签署的是个人章返回：个人章所属方的个人账号ID |
| | | | | handWrittenFileKey | | string | 否 | 手绘图片文件filekey，开发者可忽略此字段 |
| | | | remarkSignFieldConfig | | | object | 否 | 备注区配置信息 |
| | | | | inputType | | int | 否 | 备注文字输入方式<br/>1 - 手写抄录输入，2 - 键盘自由输入 |
| | | | | movableSignField | | boolbean | 否 | 是否可以移动备注区   true - 可以，false - 不可以 |
| | | | | freeMode | | boolbean | 否 | 自由模式<br/>true  - 是，false - 否 |
| | | | | remarkContent | | string | 否 | 备注文字预设置内容 |
| | | | | remarkImageFileKey | | string | 否 | 备注区生成的图片文件filekey，开发者可忽略此字段 |
| | | | | signFieldPositionBean | | object | 否 | 备注区位置 |
| | | | |  | positionPage | string | 否 | 备注区所在页码 |
| | | | | | positionX | float | 否 | 备注区所在X坐标 |
| | | | | | positionY | float | 否 | 备注区所在Y坐标 |
| | | | | actualContent | | string | 否 | 用户页面实际签字内容 |
| | | | dateSignFieldConfig | | | object | 否 | 独立签署日期配置项 |
| | | |  | dateFormat | | string | 否 | 日期格式<br/>**yyyy年MM月dd日**<font style="color:#E8323C;">（默认值）</font><br/>**yyyy-MM-dd **<br/>**yyyy/MM/dd** |
| | | | | fontSize | | int | 否 | 日期字体大小，默认值12px |
| | | | | signDatePositionPage | | int | 否 | 指定签署日期位置页码 |
| | | | | signDatePositionX | | float | 否 | 签署日期所在位置X坐标 |
| | | | | signDatePositionY | | float | 否 | 签署日期所在位置Y坐标 |
| | **copiers**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **array** | **否** | **抄送方** |
| |  | copierPsnInfo | | | | object | 否 | 个人抄送方信息 |
| | |  | psnId | | | string | 否 | 个人抄送方账号 |
| | | | psnAccount | | | string | 否 | 个人抄送方账号，手机号或邮箱 |
| | | copierOrgInfo | | | | object | 否 | 机构抄送方信息 |
| | |  | orgId | | | string | 否 | 机构账号ID |
| | | | orgName | | | string | 否 | 机构抄送方名称 |


### 请求示例
```http
GET https://openapi.esign.cn/v3/sign-flow/1778***701b7/detail
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "signFlowInitiator": {
            "psnInitiator": null,
            "orgInitiator": {
                "orgId": "55d29d5a***49afe67",
                "orgName": "XXXX有限公司",
                "transactor": null
            }
        },
        "signFlowConfig": {
            "signFlowTitle": "签署流程的自定义名称:劳动合同签署",
            "contractGroupIds": [],
            "autoFinish": false,
            "signFlowExpireTime": 1654674819000,
            "notifyUrl": "http://xx.xx.xx.xx:8081/asyn/notify",
            "chargeConfig": {
                "chargeMode": 0,
                "orderType": null,
                "barrierCode": null
            },
            "noticeConfig": {
                "noticeTypes": "1",
                "examineNotice": null
            },
            "signConfig": {
               "availableSignClientTypes": "1",
                "showBatchDropSealButton": false,
                "signTipsTitle": null,
                "signTipsContent": null,
                "signMode": "NORMAL",
                "dedicatedCloudId": null,
                "forcedNotarize": false,
                "serviceCode": null,
                "notaryOfficeNum": null
            },
            "authConfig": {
                "psnAvailableAuthModes": [
                    "PSN_TELECOM_AUTHCODE"
                ],
                "orgAvailableAuthModes": null,
                "willingnessAuthModes": [
                    "CODE_SMS"
                ],
                "audioVideoTemplateId": null
            }
        },
        "signFlowStatus": 1,
        "rescissionStatus": 0,
        "revokeReason": null,
        "signFlowCreateTime": 1649409455451,
        "signFlowStartTime": 1649409511000,
        "signFlowFinishTime": null,
        "signFlowDescription": "签署中",
        "docs": [
            {
                "fileId": "0e99d***b2cd69",
                "fileName": "某企业用工合同",
                "fileEditPwd": "",
                "contractNum": "ESIGN202310111145024",
                "contractBizTypeId": null
            }
        ],
        "attachments": [
            {
                "fileId": "12844***ueyye",
                "fileName": "入职材料",
                "signerUpload": false
            },
            {
                "fileId": "ea315***9d3f4c",
                "fileName": "企业工位图",
                "signerUpload": false
            }
        ],
        "signers": [
            {
                "psnSigner": {
                    "psnId": "c7e002947**10541e7",
                    "psnName": "张三",
                    "psnAccount": {
                        "accountMobile": "183****0101",
                        "accountEmail": null
                    }
                },
                "orgSigner": null,
                "signerType": 0,
                "signOrder": 1,
                "signStatus": 2,
                "notaryRole": null,
                "signFields": [
                    {
                        "signFieldId": "fc3f846487***dd565",
                        "signFieldStatus": "4",
                        "sealApprovalFlowId": "AF-2cb6a411110ebb",
                        "statusUpdateTime": 1649409635000,
                        "failReason": null,
                        "customBizNum": "20220501010021",
                        "fileId": "0e99de7***b2cd69",
                        "signFieldType": 0,
                        "mustSign": true,
                        "signFieldSealType": 0,
                        "normalSignFieldConfig": {
                            "freeMode": true,
                            "signFieldStyle": 0,
                            "signFieldPosition": {
                                "positionPage": "1",
                                "positionX": 100.0,
                                "positionY": 200.0
                            },
                            "movableSignField": false,
                            "autoSign": false,
                            "sealStyle": ",1",
                            "sealId": ""
                        },
                        "remarkSignFieldConfig": null,
                        "dateSignFieldConfig": null
                    }
                ]
            }
        ],
        "copiers": [],
        "rescissionSignFlowIds": null
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)

