### 接口描述
调用此接口可以向已创建的签署流程中追加签署方、签署区。

:::warning
**<font style="color:#E8323C;">注意事项：</font>**

+ 在追加一个签署区时，请确保流程在开启之前已添加了该签署区所在的待签署文件，参考[【追加待签文件】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/fuuzv5)；
+ 流程在“草稿”和“签署中”状态时，允许向流程中再追加签署区；
+ [【基于文件发起签署】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/su5g42)时设置了自动完结（`autoFinish`为 true）的流程不支持再添加签署区。

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/signers/sign-fields

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | --- | --- | --- | :---: | :---: | :---: | --- |
| **signFlowId** | | | | | string | 是 | path | 签署流程ID  |
| **identityVerify** | | | | | boolean | 否 | body | 身份校验配置项（当开发者指定的签署人信息与该签署人在e签宝已有的身份信息不一致时如何处理），默认：**true**<br/>**true** - 接口报错（提示：传入的指定签署人信息与实名信息不一致相关报错） <br/>**false** - 不报错，正常发起（签署人可以在签署链接中修改账号信息，开发者再通过回调通知接收相关改动信息，<font style="color:rgb(64, 64, 64);">详见</font>[【签署人更正个人信息回调通知】](https://open.esign.cn/doc/opendoc/notify3/waqf917gq1h56ct8)）。 |
| **signers**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | array | 是 | body | 添加签署方信息<font style="color:#F5222D;"></font> |
| | **signConfig**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | object | 否 | body | 签署人配置项 |
| | | signOrder | | | int32 | 否 | body | 设置签署方的签署顺序<br/>+ 按序签时支持传入顺序值** 1 - 255**<font style="color:#DF2A3F;">（值小的先签署）</font><br/>+ 同时签时，允许值重复 |
| | | forcedReadingTime | | | int32 | 否 | body | 设置签署页面强制阅读倒计时时间，默认值为 0（单位：秒，最大值999） |
| | | agreeSkipWillingness | | | boolean | 否 | body | 签署人是否需要免意愿快捷签署，默认false<br/>**true **- 需要<br/>**false **- 不需要<br/>场景对接说明详见：[【免意愿快捷签署】](https://qianxiaoxia.yuque.com/opendoc/case3/ci573w8my7u1sok7)<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 免意愿快捷签署需要提前联系与您对接的技术/业务人员确认场景，场景审批通过后开通才可使用（例如：处方单、物流承运协议等需要个人频繁签署的低风险场景，<font style="color:#DF2A3F;">企业签署不支持，仅限个人签署</font>）；<br/>+ 免意愿快捷签署是指用户在e签宝页面签署过程中勾选同意《快捷签署服务协议》后，当前用户在约定时间内<font style="color:#DF2A3F;">（默认7天）</font>再次在当前开发者appId、当前终端设备下签署即可免除意愿认证，直接签署成功。 |
| | | signTaskType | | | int32 | 否 | body | 签署任务类型，默认值为** 0**<br/>**0** - 会签（所有指定的签署方均必须签署）<br/>**1** - 或签（多个签署方中，任意一方签署即可完成签署流程）<br/>**<font style="color:#E8323C;">或签</font>**<font style="color:#E8323C;">场景补充说明：</font><br/>+ 指定的签署方数量必须>=2，其中任意一方签署即可<br/>+ 所有签署方和签署区的配置以及签署的文件需要一致<br/>+ 或签不允许自动签署<br/>+ 不允许同一个经办人代不同的主体或签 |
| | | signTipsTitle | | | string | 否 | body | 签署前提示弹框自定义签署声明--文案标题<font style="color:#DF2A3F;">（最多20字）</font><br/><font style="color:#E8323C;">补充说明：</font><br/>+ 当前签署方在签署页面进入后，展示该弹框提示标题，点击“我已知悉上述内容”按钮后关闭弹框，进入签署合同页。<br/>+ 必须与下方signTipsContent或signTipsFileId字段配套使用。 |
| | | signTipsContent | | | string | 否 | body | 签署前提示弹框自定义签署声明--文案内容<font style="color:#DF2A3F;">（最多500字）</font><br/><font style="color:#E8323C;">补充说明：</font><br/>+ 当前签署方在签署页面进入后，展示该弹框提示文案，点击“我已知悉上述内容”按钮后关闭弹框，进入签署合同页。<br/>+ 必须与上方signTipsTitle字段配套使用。<br/>+ 与signTipsFileId字段二选一传入，不可同时传入。 |
| | | signTipsFileId | | | string | 否 | body | 签署前提示弹框自定义签署声明--文案的文件ID（通过[【上传文件流】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256)接口获取，<font style="color:#DF2A3F;">必须转成PDF格式</font>）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 当前签署方在签署页面进入后，展示该弹框提示文件，点击“我已知悉上述内容”按钮后关闭弹框，进入签署合同页。<br/>+ 必须与上方signTipsTitle字段配套使用。<br/>+ 与signTipsContent字段二选一传入，不可同时传入。 |
| | | uploadFiles | | | array | 否 | body | 允许签署方在签署时上传的附件列表配置<br/><font style="color:#E8323C;">补充说明：</font><br/>+ <font style="color:#E8323C;">需要签署方在签署页自主上传附属材料时，对应的附属文件要求在此配置</font><br/>+ <font style="color:#E8323C;">不需要签署方自主上传附件时，此项无需传入</font> |
| | |  | uploadDescription | | string | 否 | body | 附件的标题描述，会显示在签署详情页内<br/>比如：身份证信息面、身份证国徽页 |
| | | | required | | boolean | 否 | body | 此附件是否必传，默认**true**<br/>**true** - 必传<br/>**false** - 非必传<br/><font style="color:#E8323C;">【注】</font><font style="color:#DF2A3F;">如设置了必传，但是签署方在页面没有上传是无法提交签署的</font> |
| | | | fileOrder | | int | 否 | body | 附件展示顺序<br/>按序展示时支持传入顺序值：1 - 50（值越小越靠前） |
| | | | multiple | | boolean | 否 | body | 当前标题下是否允许上传多个附件，默认：false<br/>**true** - 允许上传多个附件<br/>**false** - 不允许上传多个附件（只能传一个） |
| | | docsViewType | | | int32 | 否 | body | 签署方可见文件类型，默认：1<br/>1：允许查看流程内所有文件<br/>2：仅允许查看自身签署的文件和指定文件（通过viewableFileIds指定文件id列表）<br/><font style="color:#DF2A3F;">【注】：流程配置里的docsViewLimited需要传：true，这里指定2才生效。</font> |
| | | viewableFileIds | | | list | 否 | body | 指定签署方允许查看的文件id列表（仅在docsViewType为2的情况下生效） |
| | **authConfig****<font style="color:rgb(232, 50, 60);"></font>** | | | | object | 否 | body | 签署方纬度认证配置项 |
| | | willingnessAuthModes | | | list | 否 | body | 签署意愿认证方式，可选值如下：<br/>+ **CODE_SMS **- 短信验证码<br/>+ **PSN_FACE_ALIPAY **- 支付宝刷脸<br/>+ **PSN_FACE_ESIGN **- 快捷刷脸<br/>+ **PSN_FACE_WECHAT **- 微信小程序刷脸（仅限微信小程序中使用）<br/>+ **SIGN_PWD **- 签署密码<br/><font style="color:#E8323C;">以下方式如需使用，请联系交付顾问开通：</font><br/>+ **PSN_FACE_TECENT **- 腾讯云刷脸<br/>+ **PSN_AUDIO_VIDEO_ESIGN **- H5智能视频认证（新版）<br/>+ **PSN_AUDIO_VIDEO_ALIPAY **- 支付宝智能视频认证<br/>+ **PSN_AUDIO_VIDEO_WECHAT** - 微信智能视频认证<br/>+ **PSN_MOBILE_FACE_AUTH** - 手机号多因子认证（运营商三要素验证+刷脸认证）<br/><font style="color:#E8323C;">【注】</font><br/>+ <font style="color:#E8323C;">使用iframe内嵌集成不支持对接刷脸方式</font> |
| | | psnAvailableAuthModes | | | list | 否 | body | 个人实名认证方式，可选值：<br/>+ **PSN_MOBILE3 **- 个人运营商三要素认证<br/>+ **PSN_FACE **- 刷脸认证<br/>+ **PSN_BANKCARD4 **- 个人银行卡四要素认证<br/><font style="color:#E8323C;">以下方式如需使用，请联系交付顾问开通：</font><br/>+ **PSN_AUDIO_VIDEO_ESIGN **- H5智能视频认证（新版）<br/><font style="color:#E8323C;">【注】使用iframe内嵌集成不支持对接刷脸方式</font> |
| | | orgAvailableAuthModes | | | list | 否 | body | 机构实名认证方式，可选值：<br/>+ **ORG_BANK_TRANSFER **- 组织机构对公账户打款认证<br/>+ **ORG_ALIPAY_CREDIT **- 企业支付宝认证<br/>+ **ORG_LEGALREP_AUTHORIZATION **- 组织机构授权委托书认证<br/>+ **ORG_LEGALREP **- 法定代表人本人认证 |
| | | globalWillingness | | | boolean | 否 | body | 是否需要意愿认证，默认：true<br/>**true** - 需要<br/>**false **- 不需要<font style="color:#DF2A3F;">（仅限海外签时可配置，</font>**<font style="color:#DF2A3F;">signMode=GLOBAL</font>**<font style="color:#DF2A3F;">）</font> |
| | | globalAuthModes | | | string | 否 | body | 海外签身份验证方式，默认：MAINLAND_REAL_NAME<br/>**MAINLAND_REAL_NAME** - 中国实名（中国大陆签原有方式）<br/>**NO_NEED** - 无需验证<font style="color:#DF2A3F;">（仅限海外签时可配置，</font>**<font style="color:#DF2A3F;">signMode=GLOBAL</font>**<font style="color:#DF2A3F;">）</font><br/>**ACCESS_CODE** - 访问口令<font style="color:#DF2A3F;">（仅限海外签时可配置，</font>**<font style="color:#DF2A3F;">signMode=GLOBAL；</font>**<font style="color:#E8323C;">且配置该方式时，</font>**<font style="color:#E8323C;">globalAccessCode</font>**<font style="color:#E8323C;">必须传值</font><font style="color:#DF2A3F;">）</font> |
| | | globalAccessCode | | | string | 否 | body | 海外签访问口令<font style="color:#DF2A3F;">（（仅限海外签时可配置，</font>**<font style="color:#DF2A3F;">signMode=GLOBAL</font>**<font style="color:#DF2A3F;">）</font><br/><font style="color:#E8323C;">【注】支持6-45位，只支持字母和数字</font> |
| | | audioVideoTemplateId | | | string | 否 | body | 智能视频认证模板ID，请联系e签宝交付顾问提供<br/><font style="color:#DF2A3F;">【注】同级willingnessAuthModes（签署意愿认证方式）包含智能视频认证时可用</font> |
| | | audioVideoActiveField | | | array | 否 | body | H5智能视频认证（新版）文案中的动态朗读内容，动态内容 Key和Value值（支持自定义key和Value），格式如下：<br/>"audioVideoActiveField":[{"key":"name","value":"张三"},{"key":"idno","value":"12345678"}]<br/><font style="color:#DF2A3F;">【注】：</font><br/>+ <font style="color:#DF2A3F;">与 audioVideoTemplateId（智能视频认证模板ID）配套使用</font><br/>+ <font style="color:#DF2A3F;">请联系e签宝交付顾问进行配置</font> |
| | | | key | | string | 否 | body | 开发者模板内自定义变量值 |
| | | | value | | string | 否 | body | 当前用户文案的变量key对应的具体值 |
| | **noticeConfig**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | object | 否 | body | 签署人通知配置项 |
| |  | noticeTypes | | | string | 否 | body | 通知类型，<font style="color:#DF2A3F;">默认不通知</font>（值为""空字符串），允许多种通知方式，请使用英文逗号分隔<br/>（[点解了解 指定e签宝短信/邮件通知签署](https://qianxiaoxia.yuque.com/opendoc/case3/uk2lbd9ictbycpz1)）<br/>传空 - 不通知<font style="color:#E8323C;">（默认值）</font><br/>**1** - 短信通知<font style="color:#DF2A3F;">（如果套餐内带“分项”字样，请确保开通【电子签名流量费（分项）认证】中的子项：【短信服务】，否则短信通知收不到）</font><br/>**2 **- 邮件通知<br/>**3** - 钉钉工作通知（需使用e签宝钉签产品）<br/>**5** - 微信通知（用户需关注“e签宝电子签名”微信公众号且使用过e签宝微信小程序）<br/>**6** - 企业微信通知（需要使用e签宝企微版产品）<br/>**7** - 飞书通知（需要使用e签宝飞书版产品）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 1、2：个人账号中需要绑定短信/邮件才有对应的通知方式；<br/>+ 3、5、6、7：仅限e签宝<font style="color:#DF2A3F;">正式环境</font>调用才会有。<br/>+ 该通知是签署方维度的，只控制签署人的签署提醒短信，不控制流程的撤销、完成、抄送等短信通知。<font style="color:#DF2A3F;">（流程维度在</font>**<font style="color:#DF2A3F;">signFlowConfig</font>**<font style="color:#DF2A3F;">里的</font>**<font style="color:#DF2A3F;">noticeTypes</font>**<font style="color:#DF2A3F;">控制）</font> |
| | **signerType** | | | | int32 | 是 | body | 签署方类型，**0 **- 个人，**1 **- 企业/机构，**2** - 法定代表人，**3** - 经办人<br/>+ 若指定签署方为个人，则psnSignerInfo为必传项；<br/>+ 若指定签署方为机构或法定代表人手动签署（autoSign参数为false）时，则orgSignerInfo为必传项；<br/>+ 若指定签署方为经办人，在同级数组内必须还有机构类型存在，且orgSignerInfo为必传项，即：指定**3** - 经办人签的前提是必须同时存在**1 **- 企业/机构（且autoSign参数为false），且经办人签属于企业合同，不在个人名下。 |
| | **orgSignerInfo**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | object | 否 | body | 企业/机构签署方信息<br/><font style="color:#F5222D;">【注】</font><font style="color:#E8323C;">orgId 与 orgName 二选一传入即可</font> |
| |  | orgId | | | string | 否 | body | 企业/机构账号ID |
| | | orgName | | | string | 否 | body | 企业/机构名称（账号标识） |
| | | orgInfo<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | object | 否 | body | 企业/机构签署方信息 |
| | | | legalRepName | | string | 否 | body | 法定代表人姓名 |
| | | | legalRepIDCardNum | | string | 否 | body | 法定代表人证件号 |
| | | | legalRepIDCardType | | string | 否 | body | 法定代表人证件类型，可选值如下：<br/>**CRED_PSN_CH_IDCARD** - 中国大陆居民身份证<font style="color:#E8323C;">（默认值）</font><br/>**CRED_PSN_CH_HONGKONG** - 香港来往大陆通行证<br/>**CRED_PSN_CH_MACAO **- 澳门来往大陆通行证<br/>**CRED_PSN_CH_TWCARD **- 台湾来往大陆通行证<br/>**CRED_PSN_PASSPORT **- 护照 |
| | | | orgIDCardNum | | string | 否 | body | 企业/机构证件编号 |
| | | | orgIDCardType | | string | 否 | body | 企业/机构证件类型 <br/>**CRED_ORG_USCC **- 统一社会信用代码<br/>**CRED_ORG_REGCODE **- 工商注册号 |
| | | transactorInfo<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | object | 否 | body | 企业/机构签署经办人信息<font style="color:#F5222D;">（当签署方为企业/机构时，经办人必传）</font><br/><font style="color:#F5222D;">【注】</font><font style="color:#E8323C;">psnId 与 psnAccount 二选一传入即可</font> |
| | |  | psnAccount | | string | 否 | body | 经办人账号标识，手机号或邮箱<br/><font style="color:#E8323C;">【注】指</font><font style="color:#F5222D;">定orgName时，该参数为必传项，</font><font style="color:#E8323C;">为了保证签署人准确，</font>**<font style="color:#E8323C;">必须配合psnName（经办人姓名）传入</font>**<font style="color:#E8323C;"></font> |
| | | | psnId | | string | 否 | body | 经办人账号ID |
| | | | psnInfo | | object | 否 | body | 经办人身份信息 |
| | | | | psnName | string | 是 | body | 经办人姓名<br/><font style="color:#DF2A3F;">【注】传psnAccount（经办人账号标识）时，</font>**<font style="color:#F5222D;">该参数为必传项</font>** |
| | | | | bankCardNum | string | 否 | body | 经办人银行卡号 |
| | | | | psnIDCardNum | string | 否 | body | 经办人证件号 |
| | | | | psnIDCardType | string | 否 | body | 经办人证件类型，可选值如下：<br/>**CRED_PSN_CH_IDCARD** - 中国大陆居民身份证<font style="color:#E8323C;">（默认值）</font><br/>**CRED_PSN_CH_HONGKONG** - 香港来往大陆通行证<br/>**CRED_PSN_CH_MACAO **- 澳门来往大陆通行证<br/>**CRED_PSN_CH_TWCARD **- 台湾来往大陆通行证<br/>**CRED_PSN_PASSPORT **- 护照 |
| | **psnSignerInfo**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | object | 否 | body | 个人签署方信息<br/><font style="color:#F5222D;">【注】</font><font style="color:#E8323C;">psnId 与 psnAccount 二选一传入即可</font> |
| |  | psnAccount | | | string | 否 | body | 个人账号标识（手机号或邮箱）<br/><font style="color:#E8323C;">【注】为了保证签署人准确，</font>**<font style="color:#E8323C;">必须配合psnName（个人姓名）传入</font>**<font style="color:#E8323C;"></font> |
| | | psnId | | | string | 否 | body | 个人账号ID |
| | | psnInfo<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | object | 否 | body | 签署方个人身份信息 |
| | | | psnName | | string | 是 | body | 个人姓名<br/><font style="color:#DF2A3F;">【注】传psnAccount（个人账号标识）时</font>**<font style="color:#DF2A3F;">，</font>****<font style="color:#F5222D;">该参数为必传项</font>** |
| | | | bankCardNum | | string | 否 | body | 个人银行卡号 |
| | | | psnIDCardNum | | string | 否 | body | 个人签署方证件号 |
| | | | psnIDCardType | | string | 否 | body | 个人证件类型，可选值如下：<br/>**CRED_PSN_CH_IDCARD** - 中国大陆居民身份证<font style="color:#E8323C;">（默认值）</font><br/>**CRED_PSN_CH_HONGKONG** - 香港来往大陆通行证<br/>**CRED_PSN_CH_MACAO **- 澳门来往大陆通行证<br/>**CRED_PSN_CH_TWCARD **- 台湾来往大陆通行证<br/>**CRED_PSN_PASSPORT **- 护照 |
| | **signFields**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | array | 是 | body | 签署区信息<font style="color:#DF2A3F;">（一个流程中，签署区不能超过300个）</font> |
| | | fileId | | | string | 是 | body | 签署区所在文件ID |
| | | customBizNum | | | string | 否 | body | 自定义业务编号 |
| | | signFieldType | | | int32 | 否 | body | 签署区类型 <br/>**0 **- 签章区 （添加印章、签名等）<br/>**1 **- 备注区（添加备注文字信息等）<br/>**2** - 独立签署日期（添加单独的签署日期） |
| | | mustSign | | | boolean | 否 | body | 该签署区是否必须签署，默认值为 **true（必须签）**<br/>**true** - 是<br/>**false** - 否<br/>场景对接说明详见：[【选签（非必须签）】](https://qianxiaoxia.yuque.com/opendoc/case3/xedm3cmeky7b4ul9)（该参数设置：**false**时）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 常规场景都是必须签署，不需要额外指定该参数为 **false**，如果需要**选签（非必须签）**功能，则不允许设置自动落章。 |
| | | normalSignFieldConfig<font style="color:rgb(232, 50, 60);">（点击“+”）</font> | | | object | 否 | body | 签章区配置（当signFieldType为0时，该参数必传） |
| | | | autoSign | | boolbean | 否 | body | 是否后台自动签章，默认值 false<br/>**true **- 后台自动签章（无感知），**false **- 签署页手动操作签章<br/><font style="color:rgb(232, 50, 60);">补充说明：</font><br/>+ <font style="color:rgb(64, 64, 64);">当签署方为</font>**<font style="color:rgb(64, 64, 64);">个人</font>**<font style="color:rgb(64, 64, 64);">时，不支持自动签章。</font><br/>+ <font style="color:rgb(64, 64, 64);">当签署方为</font>**<font style="color:rgb(64, 64, 64);">机构</font>**<font style="color:rgb(64, 64, 64);">（且非应用Id所属企业），自动签章需先经过印章授权，</font>[点击查看](https://open.esign.cn/doc/opendoc/seal3/vk863c)<font style="color:rgb(64, 64, 64);">印章授权规则。</font><br/>+ <font style="color:rgb(64, 64, 64);">当签署方为</font>**<font style="color:rgb(64, 64, 64);">应用Id所属主体企业</font>**<font style="color:rgb(64, 64, 64);">自身签署时，支持后台自动签章。</font> |
| | | | freeMode | | boolbean | 否 | body | 是否自由签章，默认值 false<br/> **true **- 是，**false **- 否<br/><font style="color:#F5222D;">【注】</font><font style="color:#000000;">指</font>由用户选择是否签署，且不限签署位置和签署次数 |
| | | | movableSignField | | boolbean | 否 | body | 是否可以移动签章区，默认值 false<br/> **true **- 可以移动 ，**false **- 固定位置 |
| | | | signFieldSize | | int | 否 | body | 签章区尺寸（正方形的边长，单位为px）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 指定的签署区的宽度，高度等比缩放；不指定默认以印章原始大小加盖<br/>+ 不能与signFieldWidth、signFieldHeight同时传入 |
| | | | signFieldWidth | | int | 否 | body | 签署区宽度（矩形的左右边距距离，单位为px）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 印章需要自定义规格时传入该参数（根据指定的签署区宽高适配）；不指定默认以印章原始大小加盖<br/>+ 与signFieldHeight搭配使用，但不能与signFieldSize同时传入 |
| | | | signFieldHeight | | int | 否 | body | 签署区高度（矩形的上下边距距离，单位为px）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 印章需要自定义规格时传入该参数（根据指定的签署区宽高适配）；不指定默认以印章原始大小加盖<br/>+ 与signFieldWidth搭配使用，但不能与signFieldSize同时传入 |
| | | | signFieldStyle | | int32 | 否 | body | 签章区样式 <br/>**1** - 单页签章区 ，**2 **- 骑缝签章区 |
| | | | assignedSealId | | string | 否 | body | 指定印章ID |
| | | | availableSealIds | | list | 否 | body | 手动签章时页面可选的印章列表 |
| | | | orgSealBizTypes | | string | 否 | body | 可选机构印章类型（英文逗号分隔）<br/>**ALL **- 显示所有类型的印章<font style="color:#F5222D;">（默认值）</font><br/>**PUBLIC **- 机构主体公章<br/>**CONTRACT **- 合同专用章<br/>**FINANCE **- 财务专用章<br/>**PERSONNEL **- 人事专用章<br/>**COMMON **- 其他类印章（无具体业务类型的章） |
| | | | psnSealStyles | | string | 否 | body | 可选个人印章样式，默认值0和1（英文逗号分隔）<br/>**0** - 普通手写，**1** - 印章，**2 **- AI手写 |
| | | | signFieldPosition | | object | 否 | body | 签章区位置 |
| | | |  | acrossPageMode | string | 否 | body | 骑缝模式<br/>**ALL**-全部页，**AssignedPages **- 指定页码范围 |
| | | | | positionPage | string | 否 | body | 签章区所在页码<br/>（1）当signFieldStyle为1即单页签章时，只能传单个页码 <br/>（2）当signFieldStyle为2即骑缝签章时，且acrossPageMode为AssignedPages即指定页码范围时，连续页码可使用'-'指定页码范围，多个页码范围用逗号分隔，例如：1-3,6-10 |
| | | | | positionX | float | 否 | body | 签章区所在X坐标<br/>（当signFieldStyle为2即骑缝签章时，该参数不生效，可不传值） |
| | | | | positionY | float | 否 | body | 签章区所在Y坐标 |
| | | remarkSignFieldConfig<font style="color:rgb(232, 50, 60);">（点击“+”）</font> | | | object | 否 | body | 备注区配置 |
| | | | freeMode | | boolbean | 否 | body | 自由模式（由用户选择是否签署，且不限签署位置和签署次数）<br/>**true **- 是（自由模式下不需要传此对象中的其他参数）<br/>**false **- 否<font style="color:#E8323C;">（默认值）</font> |
| | | | inputType | | int32 | 是 | body | 备注文字输入方式<br/>**1** - 手写抄录输入，**2 **- 键盘自由输入<br/><font style="color:#F5222D;">【注】</font>inputType=2时，aiCheck和remarkContent参数值不生效 |
| | | | aiCheck | | int32 | 否 | body | 是否开启手写抄录AI校验，默认值：**0 **<br/>**0 **- 不开启（不开启AI校验手写内容是否一致）<br/>**1 **- 开启 AI 校验（开启 AI 手写抄录校验，连续3次校验不通过将弹窗提醒“监测到多次识别未通过，是否直接使用当前手写笔迹？”，确定后跳过该字的校验，下一个字继续执行 AI 校验）<br/>**2** - 强制 AI 校验（强制 AI 手绘校验，若校验不通过，则会一直提示“识别失败，请重新书写XX”，直至校验通过） |
| | | | movableSignField | | boolbean | 否 | body | 是否可以移动备注区，默认值 false<br/> **true **- 可以， **false **- 不可以 |
| | | | remarkContent | | string | 否 | body | 预设待抄录信息，最多支持50个汉字（含标点符号），支持传换行符 \n<br/><font style="color:#F5222D;">【注】</font>inputType=1时此参数必须传值 |
| | | | remarkFontSize | | int32 | 否 | body | 备注文字字号，默认值14px |
| | | | signFieldHeight | | float | 否 | body | 备注区高度（矩形的上下边距距离，单位为px） |
| | | | signFieldWidth | | float | 否 | body | 备注区宽度（矩形的左右边距距离，单位为px） |
| | | | signFieldPosition | | object | 否 | body | 备注区位置 |
| | | |  | positionPage | string | 否 | body | 备注区所在页码<font style="color:rgb(64, 64, 64);">，只能传单个页码</font> |
| | | | | positionX | float | 否 | body | 备注区所在X坐标 |
| | | | | positionY | float | 否 | body | 备注区所在Y坐标 |
| | | signDateConfig<font style="color:rgb(232, 50, 60);">（点击“+”）</font> | | | object | 否 | body | 签署区/备注区的签署日期配置项<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 该日期是跟签署区/备注区关联的，即一个签署区/备注区需要一个签署日期匹配，且必须和签署区/备注区在同一页码<br/>+ 当signFieldType（签署区类型）= 0（签章区）时，指定该参数<br/>+ OFD格式文件暂不支持指定签署日期 |
| | |  | dateFormat | | string | 否 | body | 日期格式<br/>**yyyy年MM月dd日**<font style="color:#E8323C;">（默认值）</font><br/>**yyyy-MM-dd**<br/>**yyyy/MM/dd**<br/>**yyyy-MM-dd HH:mm:ss** |
| | | | fontSize | | int32 | 否 | body | 字体大小，默认值12px |
| | | | showSignDate | | int32 | 否 | body | 是否显示签署日期，默认值 0<br/> **0** - 不显示，**1** - 固定位置显示 ，**2** - 不固定位置 |
| | | | signDatePositionX | | float | 否 | body | 签署日期所在位置X坐标 |
| | | | signDatePositionY | | float | 否 | body | 签署日期所在位置Y坐标 |
| | | dateSignFieldConfig | | | object | 否 | body | 独立签署日期配置项<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 该日期是跟签署区/备注区独立的，只要保证一个用户下存在至少一个签署区/备注区，即可配置多个日期位置且支持和签署区/备注区不在同一页码<br/>+ 当signFieldType（签署区类型）= 2（独立签署日期）时，指定该参数 |
| | | | autoSign | | boolean | 否 | body | 是否是后台自动落章关联的独立签署日期，默认值 **false**<br/>**true** - 后台自动落章关联的独立签署日期（平台静默签署）<br/>**false** - 签署页手动签章关联的独立签署日期<br/><font style="color:#F5222D;">【注】当关联的普通签署区包含自动签，即签署区数组中存在normalSignFieldConfig中的autoSign=true时，该字段才允许传true</font> |
| | | | dateFormat | | string | 否 | body | 日期格式<br/>**yyyy年MM月dd日**<font style="color:#E8323C;">（默认值）</font><br/>**yyyy-MM-dd **<br/>**yyyy/MM/dd**<br/>**yyyy.MM.dd**<br/>**yyyy年M月d日**<br/>**yyyy年M月**<br/>**yyyy/M/d**<br/>**yy-MM-dd**<br/>**yyyy/MM/dd HH:mm:ss**<br/>**yyyy/MM/dd HH:mm**<br/>**yyyy-MM-dd HH:mm** |
| | | | fontSize | | int | 否 | body | 日期字体大小，默认值12px（可传入5-42） |
| | | | signDatePositionPage | | int | 否 | body | 指定签署日期位置页码<br/><font style="color:#F5222D;">【注】</font><font style="color:#DF2A3F;">允许与签署区位置positionPage的值不一样，即允许跨页添加签署日期</font> |
| | | | signDatePositionX | | float | 否 | body | 签署日期所在位置X坐标 |
| | | | signDatePositionY | | float | 否 | body | 签署日期所在位置Y坐标 |


### 响应参数
| **<font style="color:black;">参数名称</font>** | | | **<font style="color:black;">参数类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 否 | 业务码，0表示成功 |
| message | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | array | 否 | 业务数据 |
| | signFieldId | | string | 否 | 签署区ID |
| | fileId | | string | 否 | 签署区所在文件ID |
| | psnId | | string | 否 | 签署区对应的签署人账号ID |
| | orgId | | string | 否 | 签署区对应的机构账ID |


### 请求示例
```json
{
    "signers": [
         {
            "signConfig": {
                "signOrder": 1
            },
            "orgSignerInfo": {
                "orgName": "******有限公司",
                "orgInfo": {
                    "orgIDCardNum": "911*****88",
                    "orgIDCardType": "CRED_ORG_USCC"
                },
                "transactorInfo": {
                    "psnAccount": "15*****50",
                    "psnInfo": {
                        "psnName": "张三"
                    }
                }
            },
            "signerType": 2,
            "signFields": [
                {
                    "customBizNum": "自定义编码001",
                    "fileId": "0d8b8cf3******a2f2afd1df",
                    "normalSignFieldConfig": {
                        "autoSign": false,
                        "assignedSealId": "",
                        "signFieldPosition": {
                            "positionPage": "1",
                            "positionX": 200,
                            "positionY": 200
                        },
                        "signFieldStyle": 1
                    },
                    "signDateConfig": {
                        "dateFormat": "yyyy-MM-dd HH:mm:ss",
                        "fontSize": 20,
                        "showSignDate": 1
                    }
                }
            ]
        }
    ]
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": [
        {
            "signFieldId": "8fd1*****ff25ef6d",
            "fileId": "0d8b8c******2afd1df",
            "psnId": "39c4d6*****9634438c8",
            "psnAccount": "153*****50",
            "orgId": "842ec******fc91662f",
            "orgName": "*****有限公司"
        }
    ]
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)

