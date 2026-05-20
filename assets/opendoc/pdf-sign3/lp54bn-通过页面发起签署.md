### 接口描述
通过此接口开发者将获取到一个<font style="color:#E8323C;">发起签署可视化页面</font>（免登录），由用户在此页面中选择签署文件、签署方等，并设置签署区位置等相关信息，页面发起签署流程后，开发者通过[《签署发起成功通知》](https://qianxiaoxia.yuque.com/opendoc/notify3/llu8g1)接收签署流程ID（**signFlowId**）。该接口获取到的发起签署页面参考：

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1723012816337-e6429044-f795-4fe4-9555-c278acca1368.png)

:::info
**<font style="color:#E8323C;">注意事项</font>**

 1. 接口中预设置的信息（签署文件、签署方、签署区等），页面允许用户在此基础上进行添加，不允许用户编辑和修改。

 2. 单个签署流程中对**签署文件（**`**docs**`**）**要求如下：

+ 单个签署流程中所添加的文件个数不可超过**50**个。
+ 单个文件大小不可超过**50**MB。
+ 单个文件内单页大小不可超过**20**MB（文件内含图片时，需特别关注单页大小）。
+ 单个签署流程中所添加的文件大小总和不可超过**500**MB。

 3. 单个签署流程中一次性添加的签署方（`signers`）不要超过**10**个，如果超过10个后续可以用[《追加签署区》](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ohzup7)接口追加，整个流程不能超过**50**个签署方。

 4. 单个签署流程中所添加的**签署区（**`**signFields**`**）**总和不要超过**300**个。

:::

### 接口地址&请求方法
> <font style="color:#333333;">点击下述蓝色字体{host}可跳转至API请求域名说明文档</font>
>

**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/sign-flow-initiate-url/by-file

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
:::danger
_开发者可通过_[_【签字盖章核心操作演示视频】_](https://demo.esign.cn/saas-api-sign-pre.html)_和_[_【发起签署参数可视化讲解页】_](https://demo.esign.cn/saas-api-v3-signintro.html)_来辅助理解签章及参数含义。_

:::

| **参数名称****<font style="color:#8C8C8C;">（点击左侧“+”一键展开参数）</font>** | | | | | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#8C8C8C;">（请左右滑动查看完整描述）</font>** |
| --- | --- | --- | --- | --- | :---: | :---: | :---: | --- |
| **initiatePageConfig**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **object** | **否** | **body** | **发起签署页面配置项** |
| | customBizNum | | | | string | 否 | body | <font style="color:rgb(64, 64, 64);">自定义业务编号（用于关联开发者的业务系统，流程发起成功后将在</font>[签署发起成功通知](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/llu8g1)<font style="color:rgb(64, 64, 64);">中和签署流程ID一同返回）</font><br/><font style="color:rgb(232, 50, 60);">【注】接口不对该参数的值做重复性校验。</font> |
| | initiateButtons | | | | string | 否 | body | 页面中展示的发起按钮，默认值为1,2（按钮全部展示，英文逗号分隔）<br/> **1 **- 立即发起，**2** - 指定位置发起<br/>+ 传**1**- 立即发起：将依据接口中设置的签署区位置信息发起签署流程，接口中未指定签署区时，则由签署方自由签署；<br/>+ 传**2** - 指定位置发起：允许用户在页面中选择拖拽签署区，设置签署位置（接口中若设置了签署区，页面不可编辑修改，允许再增加）。 |
| | redirectUrl | | | | string | 否 | body | 页面发起流程成功后的跳转地址（需符合 https /http 协议地址）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 该地址为签署流程发起成功的重定向地址，不是用户签署完成的重定向跳转；<br/>+ 贵司的重定向域名需要在e签宝提前放行，否则会报错：“您即将访问的页面可能有安全风险”。（[点击跳转 重定向域名配置说明](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/umo8rop7dmttkdnv)） |
| | redirectDelayTime | | | | int | 否 | body | 发起成功后的重定向跳转延迟时间，单位秒（可选值0、3，默认值为 3）<br/>+ 传0时，操作完成直接跳转重定向地址；<br/>+ 传3时，展示操作完成结果页，倒计时3秒后，自动跳转重定向地址。<br/><font style="color:#F5222D;">【注】</font><font style="color:rgb(232, 50, 60);">当redirectUrl不传的情况下，该字段无需传入，操作完成不跳转</font> |
| | orgSealType | | | | string | 否 | body | 页面中新增企业签署方时展示哪些企业签章类型，默认仅展示企业章，多项请使用英文逗号隔开<br/>**1** - 企业章<br/>**2** - 法定代表人章 |
| | uneditableFields | | | | list | 否 | body | 禁止用户在页面上修改或追加的内容<br/>+ **signFlowTitle**-签署流程标题（禁用文本框）<br/>+ **docs**-待签文件（隐藏添加签署文件按钮）<br/>+ **signers**-签署方（隐藏签署方区域的添加企业和添加个人按钮）<br/>+ **signFields**-追加签署区（禁用签署方在页面追加签署区）<br/>+ **signFlowExpireTime**-签署截止时间（禁用时间选择框）<br/>+ **copiers**-抄送方（隐藏抄送方区域的添加企业和添加个人按钮）<br/>+ **attachments**-附件（隐藏添加附件按钮） |
| **signFlowConfig**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **object** | **是** | **body** | **签署流程配置项** |
| | signFlowTitle | | | | string | 是 | body | 签署任务主题（将展示在发起页面中，页面默认允许用户修改主题）<br/><font style="color:#E8323C;">【注】主题名称不可含有以下9个特殊字符：/ \ : * " < > | ？以及所有emoji表情</font> |
| | signFlowExpireTime | | | | int64 | 否 | body | 签署截止时间（将展示在发起页面中，页面默认允许用户修改截止时间）<br/><font style="color:#F5222D;">补充说明：</font><br/>默认在签署流程创建后的**90天**时截止<font style="color:#DF2A3F;">（指定值最大不能超过90天，只能指定90天内的时间戳）</font>。签署中如需延期请调用[【延期签署截止时间】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/idv0fv)接口。 |
| | autoFinish | | | | boolean | 否 | body | 所有签署方签署完成后签署流程自动完结，默认值 false<br/>**true **- 自动完结<br/>**false **- 非自动完结，需调用[【完结签署流程】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/ynwqsm)接口完结<br/><font style="color:#F5222D;">补充说明：</font><br/>【注】设置了自动完结的流程中不允许再追加签署区、抄送方，[点击这里](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/gsy6xe)了解更多流程状态说明。 |
| | notifyUrl | | | | string | 否 | body | 接收相关回调通知的Web地址，详见[【签署回调通知接收说明】](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/sblzg8)。 |
| | redirectConfig<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | body | 用户侧签署完成重定向配置项 |
| |  | redirectUrl | | | string | 否 | body | 用户侧签署完成后跳转页面（除app和小程序端集成外，地址需符合 https /http 协议地址）<br/><font style="color:#F5222D;">【注】</font><br/>+ 该地址为签署方签署操作完成后的重定向地址。<br/>+ 贵司的重定向域名需要在e签宝提前放行，否则会报错：“您即将访问的页面可能有安全风险”。（[点击跳转 重定向域名配置说明](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/umo8rop7dmttkdnv)）<br/>+ 签署完成后会在贵司重定向地址上拼接签署状态等字段。（[点击跳转 签署页重定向跳转说明](https://qianxiaoxia.yuque.com/opendoc/notify3/madi1g)） |
| | | redirectDelayTime | | | int32 | 否 | body | 用户侧签署完成重定向跳转延迟时间，单位秒<font style="color:#E8323C;">（可选值0、3，默认值为 3）</font><br/>+ 传**0**时，签署完成直接跳转重定向地址；<br/>+ 传**3**时，展示签署完成结果页，倒计时3秒后，自动跳转重定向地址。<br/><font style="color:#E8323C;">【注】当redirectUrl不传的情况下，该字段无需传入，签署完成不跳转</font> |
| | signConfig<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | body | 签署配置项 |
| | | availableSignClientTypes | | | string | 否 | body | 签署终端类型，默认值1和2（英文逗号分隔）<br/>（[点击了解 网页端OR支付宝端签署](https://qianxiaoxia.yuque.com/opendoc/case3/km9lo5php780z8dk)）<br/>**1** - 网页（自适配H5/PC样式），**2** - 支付宝<br/><font style="color:#E8323C;">【注】</font><font style="color:#DF2A3F;">如果是开发者自己的app或者支付宝小程序等端内嵌e签宝H5/PC，需要传：1（网页端）</font> |
| | | showBatchDropSealButton | | | boolbean | 否 | body | 签署页面是否显示“同时盖在所有签署区”按钮（一键落章功能），默认值 true<br/>**true**  - 显示（显示按钮并默认开启）<br/>**false** - 不显示（不显示按钮，即：不能同时盖在所有签署区） |
| | | signTipsTitle | | | string | 否 | body | 签署前提示弹框自定义签署声明--文案标题<font style="color:#DF2A3F;">（最多20字）</font><br/><font style="color:#E8323C;">补充说明：</font><br/>+ 在签署页面进入后，展示该弹框提示，点击“我已知悉上述内容”按钮后关闭弹框，进入签署合同页。<br/>+ 必须与下方signTipsContent字段配套使用。<br/>+ 流程中的所有签署方都会展示此弹框文案。 |
| | | signTipsContent | | | string | 否 | body | 签署前提示弹框自定义签署声明--文案内容<font style="color:#DF2A3F;">（最多500字）</font><br/><font style="color:#E8323C;">补充说明：</font><br/>+ 在签署页面进入后，展示该弹框提示，点击“我已知悉上述内容”按钮后关闭弹框，进入签署合同页。<br/>+ 必须与上方signTipsTitle字段配套使用。<br/>+ 流程中的所有签署方都会展示此弹框文案。 |
| | noticeConfig<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | body | 流程整体通知配置项 |
| | | noticeTypes | | | string | 否 | body | 通知类型，通知发起方、签署方、抄送方，<font style="color:#DF2A3F;">默认不通知</font>（值为""空字符串），允许多种通知方式，请使用英文逗号分隔）<br/>（[点解了解 指定e签宝短信/邮件通知签署](https://qianxiaoxia.yuque.com/opendoc/case3/uk2lbd9ictbycpz1)）<br/>传空 - 不通知<font style="color:#E8323C;">（默认值）</font><br/>**1** - 短信通知<font style="color:#DF2A3F;">（如果套餐内带“分项”字样，请确保开通【电子签名流量费（分项）认证】中的子项：【短信服务】，否则短信通知收不到）</font><br/>**2 **- 邮件通知<br/>**3** - 钉钉工作通知（需使用e签宝钉签版产品）<br/>**5** - 微信通知（用户需关注“e签宝电子签名”微信公众号且使用过e签宝微信小程序）<br/>**6** - 企业微信通知（需要使用e签宝企微版产品）<br/>**7** - 飞书通知（需要使用e签宝飞书版产品）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 1、2：个人账号中需要绑定短信/邮件才有对应的通知方式；<br/>+ 3、5、6、7：仅限e签宝<font style="color:#DF2A3F;">正式环境</font>调用才会有。 |
| | | examineNotice | | | boolean | 否 | body | 通知给企业印章用印审批人员的通知类型，按照账号中的手机号或邮箱的填写情况进行通知。   **true** - 发送消息（短信+邮件+e签宝官网站内信）<br/><font style="color:#DF2A3F;">（如果套餐内带“分项”字样，请确保开通【电子签名流量费（分项）认证】中的子项：【短信服务】，否则短信通知收不到）</font>   **false** - 不发送消息<br/><font style="color:#E8323C;">【注】不传值默认取noticeTypes配置的通知方式</font> |
| | authConfig<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | body | 流程整体认证配置项 |
| | | willingnessAuthModes | | | list | 否 | body | 签署意愿认证方式，可选值如下：<br/>+ **CODE_SMS **- 短信验证码<br/>+ **PSN_FACE_ALIPAY **- 支付宝刷脸<br/>+ **PSN_FACE_ESIGN **- 快捷刷脸<br/>+ **PSN_FACE_WECHAT **- 微信小程序刷脸（仅限微信小程序中使用）<br/>+ **SIGN_PWD **- 签署密码<br/><font style="color:#E8323C;">以下方式如需使用，请联系交付顾问开通：</font><br/>+ **PSN_FACE_TECENT **- 腾讯云刷脸<br/>+ **PSN_AUDIO_VIDEO_ESIGN **- H5智能视频认证（新版）<br/>+ **PSN_AUDIO_VIDEO_ALIPAY **- 支付宝智能视频认证<br/>+ **PSN_AUDIO_VIDEO_WECHAT** - 微信智能视频认证<br/>+ **PSN_MOBILE_FACE_AUTH** - 手机号多因子认证（运营商三要素验证+刷脸认证）<br/><font style="color:#E8323C;">【注】使用iframe内嵌集成不支持对接刷脸方式</font> |
| | | psnAvailableAuthModes | | | list | 否 | body | 个人实名认证方式，可选值：<br/>+ **PSN_MOBILE3 **- 个人运营商三要素认证<br/>+ **PSN_FACE **- 刷脸认证<br/>+ **PSN_BANKCARD4 **- 个人银行卡四要素认证<br/><font style="color:#E8323C;">以下方式如需使用，请联系交付顾问开通：</font><br/>+ **PSN_AUDIO_VIDEO_ESIGN **- H5智能视频认证（新版）<br/><font style="color:#E8323C;">【注】使用iframe内嵌集成不支持对接刷脸方式</font> |
| | | orgAvailableAuthModes | | | list | 否 | body | 机构实名认证方式，可选值：<br/>+ **ORG_BANK_TRANSFER **- 对公打款认证<br/>+ **ORG_ALIPAY_CREDIT **- 法人快捷认证<font style="color:#DF2A3F;">（必须操作人为法定代表人本人场景才会显示，需要法人支付宝刷脸授权完成认证）</font><br/>+ **ORG_LEGALREP_AUTHORIZATION **- 法人授权认证<font style="color:#DF2A3F;">（必须操作人 </font>**<font style="color:#DF2A3F;">非法定代表人</font>**<font style="color:#DF2A3F;">本人场景才会显示，会通知法人在线签署授权书，授权给操作人）</font><br/>+ **ORG_LEGALREP **- 法定代表人认证<font style="color:#DF2A3F;">（必须操作人为法定代表人本人场景才会显示，法人任选一种个人认证方式完成认证）</font> |
| | | audioVideoTemplateId | | | string | 否 | body | 智能视频认证模板ID，请联系交付顾问提供 |
| | | uneditableFields | | | list | 否 | body | 实名认证时不可修改的信息字段<br/>+ **orgIDCardNum** - 企业证件号<br/>+ **psnIDCardType** - 个人证件类型<br/>+ **psnMobile** - 个人实名手机号<br/><font style="color:#DF2A3F;">【注】：个人姓名、个人证件号、企业名称默认即不可修改</font> |
| | contractConfig | | | | boolean | 否 | body | 合同相关配置项 |
| | | allowToRescind | | | boolean | 否 | body | 该签署流程是否允许发起解约，默认true<br/>**true **- 允许<br/>**false **- 不允许 |
| | | contractExpirationDate | | | int64 | 否 | body | 合同到期时间，<font style="color:#DF2A3F;"> unix时间戳（毫秒）格式</font><br/>补充说明：<br/>+ 当贵司签署的合同即将到期需要提醒客户进行续约，可设置该时间；<br/>+ 默认合同到期前30天进行提醒，如需更改提醒规则，请通过[e签宝SaaS官网](https://www.esign.cn/)进行设置，[点此了解 如何设置合同履约提醒](https://help.esign.cn/detail?id=aqyoc3wppbs6o6lm&nameSpace=cs3-dept%2Fexboae)<font style="color:#DF2A3F;">（履约提醒设置仅高级版及以上版本可用）</font>。 |
| **docs**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **array** | **否** | **body** | **预设置待签署文件信息**<br/>+ 不传入待签署文件，则默认由用户在发起页面中进行上传；<br/>+ 通过接口预设置的签署文件，发起签署页面仅限预览，无法修改删除；<br/>+ 支持预设置多份签署文件，<font style="color:rgb(64, 64, 64);background-color:rgb(245, 245, 245);">可传入多个docs数组；</font><br/>+ 发起签署页面允许用户在页面再添加签署文件。 |
|  | fileId | | | | string | 否 | body | 待签署文件ID |
| | fileName | | | | string | 否 | body | 文件名称（需要添加文件的真实后缀名，如：“xxx.pdf”、“xxx.ofd”）<br/><font style="color:#E8323C;">【注】</font><br/>+ <font style="color:#E8323C;">文件名称不可含有以下9个特殊字符：/ \ : * " < > | ？以及所有emoji表情</font><br/>+ <font style="color:#E8323C;">文件名称长度限制不能超过100字符</font> |
| | neededPwd | | | | boolbean | 否 | body | 是否需要密码，默认false |
| | fileEditPwd | | | | string | 否 | body | 文件编辑密码 |
| **attachments**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **array** | **否** | **body** | **预设置合同附件信息**（指无需签名的文件，仅用于查看）<br/>+ 通过接口预设置的合同附件，发起签署页面仅限预览，无法修改删除；<br/>+ 发起签署页面默认允许用户再添加合同附件。 |
|  | fileId | | | | string | 否 | body | 合同附件的文件ID |
| | fileName | | | | string | 否 | body | 合同附件名称（需要添加文件真实后缀名，例如：“xxx.pdf”）<br/><font style="color:#E8323C;">【注】名称不可含有以下9个特殊字符：/ \ : * " < > | ？以及所有emoji表情</font> |
| **signFlowInitiator**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **object** | **否** | **body** | **签署流程的发起方**（指在平台中发起合同签约的一方，合同的归属方，有权限查看签署的文件，签署通知中展示：“XXX 通知您签署... ”中的XXX即为发起方名字。）<br/>（[点击了解 指定合同发起方](https://qianxiaoxia.yuque.com/opendoc/case3/bgs7lwkpz0fezgup)）<br/>+ 不传则默认为应用ID所属的企业来发起签署流程；<br/>+ 发起方可以为**个人**或者**机构**，但不可同时传值（orgInitiator与psnInitiator 二选一传入）；<br/>**<font style="color:#DF2A3F;">（自2024年9月12日起，仅e签宝高级版和生态伙伴版本支持指定非应用ID所属企业作为机构发起方，仅e签宝生态伙伴版本支持指定个人发起方）</font>** |
| | orgInitiator | | | | object | 否 | body | 机构发起方信息<br/>**<font style="color:#DF2A3F;">（自2024年9月12日起，仅e签宝高级版和生态伙伴版本支持指定非应用ID所属企业作为机构发起方）</font>**<br/>+ 当指定发起方为非应用ID所属企业时：<br/>（1）**<font style="color:#DF2A3F;">e签宝生态版本 </font>**需先经过[【用户授权】](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/lmfokx)（代企业和经办人用户发起合同签署权限）；<br/>（2）**<font style="color:#DF2A3F;">e签宝宝高级版 </font>**需经过e签宝官网的[【关联企业】](https://help.esign.cn/detail?id=kgkucwnnk6whzv82&nameSpace=cs3-dept%2Fexboae)开通。 |
| |  | orgId | | | string | 否 | body | 机构账号ID<br/><font style="color:#E8323C;">【注】用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用</font>[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)<font style="color:#E8323C;">接口通过组织机构名称/组织机构证件号进行查询</font> |
| | | transactor | | | object | 否 | body | 机构发起方的经办人<font style="color:#E8323C;">（机构发起签署场景，经办人账号ID为必传项）</font> |
| | |  | psnId | | string | 否 | body | 经办人账号ID<br/><font style="color:#E8323C;">【注】用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用</font>[【查询个人认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/vssvtu)<font style="color:#E8323C;">接口通过个人账号标识（手机号或邮箱）/个人用户的证件号进行查询</font> |
| | psnInitiator | | | | object | 否 | body | 个人发起方信息<br/>**<font style="color:#DF2A3F;">（自2024年9月12日起，仅e签宝生态伙伴版本支持指定个人发起方）</font>**<br/>+ **<font style="color:#DF2A3F;">e签宝生态版本 </font>**需先经过[【用户授权】](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/lmfokx)（代个人用户发起合同签署权限）； |
| |  | psnId | | | string | 否 | body | 个人账号ID<br/><font style="color:#E8323C;">【注】用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用</font>[【查询个人认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/vssvtu)<font style="color:#E8323C;">接口通过个人账号标识（手机号或邮箱）/个人用户的证件号进行查询</font> |
| | initialRemarks | | | | list | 否 | body | 合同备注信息（显示到签署页面的任务详情信息里）<br/><font style="color:#E8323C;">【注】目前</font><font style="color:#DF2A3F;">最多支持1条备注，最多300个字符</font> |
| **signers**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **array** | **否** | **body** | **预设置签署方信息**（指参与签署的个人或者机构）<br/>+ 不传入签署方信息，则默认由用户在发起页面中添加；<br/>+ 接口预设置的签署方信息页面不可进行修改编辑，允许用户再添加签署方。<br/>+ 单个签署方数组中，机构签署方、个人签署方二选一传入（orgSignerInfo与psnSignerInfo二选一即可）；<br/>+ 多方签署场景，可传多个签署方数组； |
| | **signConfig**<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | body | 签署人配置项 |
| | | forcedReadingTime | | | int32 | 否 | body | 设置页面强制阅读倒计时时间，默认值为 0（单位：秒，最大值999） |
| | | signOrder | | | int32 | 否 | body | 设置签署方的签署顺序<br/>+ 按序签时传入顺序值** 1 - 255**；<br/>+ 同时签时，允许值重复；<br/>+ 接口传入的顺序依次固定，页面若用户新增了签署方，则页面允许用户选择是否“顺序签署”，并拖拽新增的签署方顺序在预设置的签署方之前或之后。 |
| | | signTipsTitle | | | string | 否 | body | 签署前提示弹框自定义签署声明--文案标题<font style="color:#DF2A3F;">（最多20字）</font><br/><font style="color:#E8323C;">补充说明：</font><br/>+ 当前签署方在签署页面进入后，展示该弹框提示标题，点击“我已知悉上述内容”按钮后关闭弹框，进入签署合同页。<br/>+ 必须与下方signTipsContent或signTipsFileId字段配套使用。 |
| | | signTipsContent | | | string | 否 | body | 签署前提示弹框自定义签署声明--文案内容<font style="color:#DF2A3F;">（最多500字）</font><br/><font style="color:#E8323C;">补充说明：</font><br/>+ 当前签署方在签署页面进入后，展示该弹框提示文案，点击“我已知悉上述内容”按钮后关闭弹框，进入签署合同页。<br/>+ 必须与上方signTipsTitle字段配套使用。<br/>+ 与signTipsFileId字段二选一传入，不可同时传入。 |
| | | signTipsFileId | | | string | 否 | body | 签署前提示弹框自定义签署声明--文案的文件ID（通过[【上传文件流】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256)接口获取，<font style="color:#DF2A3F;">必须转成PDF格式</font>）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 当前签署方在签署页面进入后，展示该弹框提示文件，点击“我已知悉上述内容”按钮后关闭弹框，进入签署合同页。<br/>+ 必须与上方signTipsTitle字段配套使用。<br/>+ 与signTipsContent字段二选一传入，不可同时传入。 |
| | **noticeConfig**<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | body | 设置签署方的通知方式 |
| |  | noticeTypes | | | string | 否 | body | 通知类型，<font style="color:#DF2A3F;">默认不通知</font>（值为""空字符串），允许多种通知方式，请使用英文逗号分隔<br/>（[点解了解 指定e签宝短信/邮件通知签署](https://qianxiaoxia.yuque.com/opendoc/case3/uk2lbd9ictbycpz1)）<br/>传空 - 不通知<font style="color:#E8323C;">（默认值）</font><br/>**1** - 短信通知<font style="color:#DF2A3F;">（如果套餐内带“分项”字样，请确保开通【电子签名流量费（分项）认证】中的子项：【短信服务】，否则短信通知收不到）</font><br/>**2 **- 邮件通知<br/>**3** - 钉钉工作通知（需使用e签宝钉签版产品）<br/>**5** - 微信通知（用户需关注“e签宝电子签名”微信公众号且使用过e签宝微信小程序）<br/>**6** - 企业微信通知（需要使用e签宝企微版产品）<br/>**7** - 飞书通知（需要使用e签宝飞书版产品）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 1、2：个人账号中需要绑定短信/邮件才有对应的通知方式；<br/>+ 3、5、6、7：仅限e签宝<font style="color:#DF2A3F;">正式环境</font>调用才会有。<br/>+ 该通知是签署方维度的，只控制签署人的签署提醒短信，不控制流程的撤销、完成、抄送等短信通知。<font style="color:#DF2A3F;">（流程维度在</font>**<font style="color:#DF2A3F;">signFlowConfig</font>**<font style="color:#DF2A3F;">里的</font>**<font style="color:#DF2A3F;">noticeTypes</font>**<font style="color:#DF2A3F;">控制）</font> |
| | **signerType** | | | | int32 | 是 | body | 签署方类型，**0 **- 个人，**1 **- 企业/机构，**2** - 法定代表人，**3** - 经办人签<br/>+ 若指定签署方为个人，则psnSignerInfo为必传项；<br/>+ 若指定签署方为机构或法定代表人手动签署（autoSign参数为false）时，则orgSignerInfo为必传项；<br/>+ 若指定签署方为经办人，在同级数组内必须还有机构类型存在，且orgSignerInfo为必传项，即：指定**3** - 经办人签的前提是必须同时存在**1 **- 企业/机构（且autoSign参数为false），且经办人签属于企业合同，不在个人名下。 |
| | **signerRole** | | | | string | 否 | body | 签署方角色标识（可以自定义命名，如：甲方、乙方）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 主要用于固定签署区位置，签署方信息由发起签署页面操作人自行补充（若接口同时指定了签署方角色标识和下方签署方信息，发起签署页面支持操作人修改签署方信息）；<br/>+ 若不指定下方具体的签署方信息时，必须传入签署方角色标识；<br/>+ 签署方角色标识无法在发起签署页面中修改；<br/>+ 在同一次请求里，签署方角色标识不可以重复。 |
| | **orgSignerInfo**<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | body | **企业/机构签署方信息**<br/>+ 当签署主体为**企业/机构用户**、autoSign参数为false手动签章时，请必须传入此对象（orgName与orgId二选一传值即可）<br/>+ 当**企业/机构用户**选择静默签署，autoSign参数为true自动落章时，此对象可以不传，后台会默认取appId所属主体企业盖章 |
| |  | orgId | | | string | 否 | body | 企业/机构账号ID<br/><font style="color:#E8323C;">【注】用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用</font>[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)<font style="color:#E8323C;">接口通过组织机构名称/组织机构证件号进行查询</font> |
| | | orgName | | | string | 否 | body | 企业/机构名称（账号标识） |
| | | orgInfo<font style="color:rgb(232, 50, 60);"></font> | | | object | 否 | body | 企业/机构签署方信息（将展示在机构认证页面） |
| | |  | legalRepName | | string | 否 | body | 法定代表人姓名 |
| | | | legalRepIDCardNum | | string | 否 | body | 法定代表人证件号 |
| | | | legalRepIDCardType | | string | 否 | body | 法定代表人证件类型，可选值如下：<br/>**CRED_PSN_CH_IDCARD** - 中国大陆居民身份证<font style="color:#E8323C;">（默认值）</font><br/>**CRED_PSN_CH_HONGKONG** - 香港来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_MACAO **- 澳门来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_TWCARD **- 台湾来往大陆通行证（台胞证）<br/>**CRED_PSN_PASSPORT **- 护照 |
| | | | orgIDCardNum | | string | 否 | body | 企业/机构证件号 |
| | | | orgIDCardType | | string | 否 | body | 企业/机构证件类型，可选值如下：<br/>**CRED_ORG_USCC **- 统一社会信用代码<br/>**CRED_ORG_REGCODE **- 工商注册号 |
| | | transactorInfo<font style="color:rgb(232, 50, 60);"></font> | | | object | 否 | body | 企业/机构经办人信息<br/>+ 企业/机构手动签署（autoSign为false），经办人信息必传；<br/>+ 集成方企业自动落章（autoSign为true），请不要传该参数。 |
| | |  | psnAccount | | string | 否 | body | 经办人账号标识，手机号或邮箱<font style="color:#E8323C;">（指</font><font style="color:#F5222D;">定orgName时，该参数为必传项）</font><br/><font style="color:#E8323C;">【注】为了保证签署人准确，建议配合姓名信息传入</font> |
| | | | psnId | | string | 否 | body | 经办人账号ID<font style="color:#E8323C;">（</font><font style="color:#F5222D;">指定orgId时，该参数为必传项）</font><br/><font style="color:#E8323C;">【注】用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用</font>[【查询个人认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/vssvtu)<font style="color:#E8323C;">接口通过个人账号标识（手机号或邮箱）/个人用户的证件号进行查询</font> |
| | | | psnInfo | | object | 否 | body | 经办人身份信息 |
| | | |  | psnName | string | 否 | body | 经办人姓名 |
| | | | | psnIDCardNum | string | 否 | body | 经办人证件号 |
| | | | | psnIDCardType | string | 否 | body | 经办人证件类型，可选值如下：<br/>**CRED_PSN_CH_IDCARD** - 中国大陆居民身份证<font style="color:#E8323C;">（默认值）</font><br/>**CRED_PSN_CH_HONGKONG** - 香港来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_MACAO **- 澳门来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_TWCARD **- 台湾来往大陆通行证（台胞证）<br/>**CRED_PSN_PASSPORT **- 护照<br/>**CRED_PSN_CH_GREEN_CARD **- 外国人永久居住证（15位或18位）<br/><font style="color:#DF2A3F;">【注】</font>**<font style="color:#DF2A3F;">CRED_PSN_CH_IDCARD</font>**<font style="color:#DF2A3F;"> 类型同时兼容港澳台居住证（81、82、83开头18位证件号）</font> |
| | **psnSignerInfo**<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | body | **个人签署方信息**<br/><font style="color:#E8323C;">【注】</font>当签署主体为**个人**时请传此对象，psnAccount与psnId二选一传值即可 |
| |  | psnAccount | | | string | 否 | body | 个人账号标识（手机号或邮箱）<font style="color:#E8323C;">用于登录e签宝官网的凭证</font><br/><font style="color:#E8323C;">【注】为了保证签署人准确，建议配合姓名信息传入</font> |
| | | psnId | | | string | 否 | body | 个人账号ID<br/><font style="color:#E8323C;">【注】用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用</font>[【查询个人认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/vssvtu)<font style="color:#E8323C;">接口通过个人账号标识（手机号或邮箱）/个人用户的证件号进行查询</font> |
| | | psnInfo<font style="color:rgb(232, 50, 60);"></font> | | | object | 否 | body | 个人签署方身份信息<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 已实名用户，若传入的psnInfo与在e签宝绑定的psnAccount一致，则无需重复实名，签署页直接进行签署意愿认证；<br/>+ 已实名用户，若传入的psnInfo与在e签宝绑定的psnAccount不一致，则接口将会报错，建议核实用户身份信息后重新发起流程；<br/>+ 未实名用户，签署页将根据传入的身份信息进行用户实名认证。 |
| | |  | psnName | | string | 否 | body | 个人姓名 |
| | | | psnIDCardNum | | string | 否 | body | 个人证件号 |
| | | | psnIDCardType | | string | 否 | body | 个人证件类型，可选值如下：<br/>**CRED_PSN_CH_IDCARD** - 中国大陆居民身份证<font style="color:#E8323C;">（默认值）</font><br/>**CRED_PSN_CH_HONGKONG** - 香港来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_MACAO **- 澳门来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_TWCARD **- 台湾来往大陆通行证（台胞证）<br/>**CRED_PSN_PASSPORT **- 护照<br/>**CRED_PSN_CH_GREEN_CARD **- 外国人永久居住证（15位或18位）<br/><font style="color:#DF2A3F;">【注】</font>**<font style="color:#DF2A3F;">CRED_PSN_CH_IDCARD</font>**<font style="color:#DF2A3F;"> 类型同时兼容港澳台居住证（81、82、83开头18位证件号）</font> |
| | | | psnMobile | | string | 否 | body | 个人实名手机号（运营商实名登记手机号或银行卡预留手机号，仅用于认证） |
| | | | bankCardNum | | string | 否 | body | 个人实名银行卡号 |
| | **signFields**<font style="color:rgb(232, 50, 60);"></font> | | | | array | 否 | body | **签署区信息**（设置签署方 盖章/签名/文字输入的区域）<br/>+ 接口预设置的签署区，将展示在发起页面，且不可进行修改编辑，允许用户再添加签署区。<br/>+ 单个签署方若对应多个签署区，可传多个数组（整个流程中，签署区不能超过300个） |
| | | fileId | | | string | 是 | body | 签署区所在待签署文件ID<br/><font style="color:#F5222D;">【注】这里的fileId需先添加在docs数组中，否则会报错“参数错误: 文件id不在签署流程中”。</font> |
| | | customBizNum | | | string | 否 | body | 开发者自定义业务编号<br/><font style="color:#DF2A3F;">【注】该参数会在</font>[【签署方-签署结果通知】](https://qianxiaoxia.yuque.com/opendoc/notify3/zzcdf8)<font style="color:#DF2A3F;">中原样返回，用于标识开发者自身业务</font> |
| | | signFieldType | | | int32 | 否 | body | 签署区类型，默认值为 0<br/>**0 **- 签章区 （添加印章、签名等）<br/>**1 **- 备注区（添加备注文字信息等）（[点击了解 备注签署](https://qianxiaoxia.yuque.com/opendoc/case3/pxlkdri00a37c2zy)）<br/>**2** - 独立签署日期（添加单独的签署日期） |
| | | normalSignFieldConfig | | | object | 否 | body | 签章区配置项<font style="color:rgb(245, 34, 45);">（指定signFieldType为 0 -签章区时，该参数为必传项）</font> |
| | |  | freeMode | | boolbean | 否 | body | 是否自由签章，默认值 false<br/>**true **- 是，**false **- 否。<br/><font style="color:#E8323C;">补充说明：</font><br/>+ **自由签章** 指不限制印章、签署位置、签章样式（单页、骑缝）、和签章个数。<br/>+ 自由签章模式下，无需传normalSignFieldConfig对象下的其他参数。 |
| | | | autoSign | | boolbean | 否 | body | 是否后台自动落章，默认值 false<br/>true - 后台自动落章（无感知），false - 签署页手动签章<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 当签署方为**个人**时，不支持自动签章。<br/>+ 当签署方为**机构**（且非应用Id所属企业**）**，静默签署自动落章需先经过印章授权，[点击查看](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/vk863c)印章授权规则。<br/>+ 当签署方为**应用Id所属主体企业**自身静默签署时，支持后台自动落章。<br/>**<font style="color:#DF2A3F;">（自2024年9月12日起，机构用户自动落章（跨企业印章授权自动签署）功能需要购买e签宝高级版或生态伙伴版本方可支持）</font>** |
| | | | movableSignField | | boolbean | 否 | body | 页面是否可移动签章区，默认值 false<br/>**true **- 可移动 ，**false **- 不可移动 |
| | | | assignedSealId | | string | 否 | body | 指定印章ID |
| | | | availableSealIds | | list | 否 | body | 手动签章时页面可选的印章列表 |
| | | | orgSealBizTypes | | string | 否 | body | 页面可选机构印章类型，默认值ALL<font style="color:#F5222D;">（多项请使用英文逗号分隔）</font><br/>**ALL **- 显示所有类型的印章<br/>**PUBLIC **- 机构主体公章<br/>**CONTRACT **- 合同专用章<br/>**FINANCE **- 财务专用章<br/>**PERSONNEL **-人事专用章<br/>**COMMON **-其他类印章（无具体业务类型的章） |
| | | | psnSealStyles | | string | 否 | body | 页面可选个人印章样式，默认值0和1（英文逗号分隔）<br/>**0** - 手写签名 <br/>**1** - 姓名印章<br/>**2** - 手写签名AI校验 |
| | | | signFieldSize | | int | 否 | body | 签章区尺寸（正方形的边长，单位为px）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 指定的签署区的宽度，高度等比缩放；不指定默认以印章原始大小加盖<br/>+ 不能与signFieldWidth、signFieldHeight同时传入 |
| | | | signFieldWidth | | int | 否 | body | 签署区宽度（矩形的左右边距距离，单位为px）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 印章需要自定义规格时传入该参数（根据指定的签署区宽高适配）；不指定默认以印章原始大小加盖<br/>+ 与signFieldHeight搭配使用，但不能与signFieldSize同时传入 |
| | | | signFieldHeight | | int | 否 | body | 签署区高度（矩形的上下边距距离，单位为px）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 印章需要自定义规格时传入该参数（根据指定的签署区宽高适配）；不指定默认以印章原始大小加盖<br/>+ 与signFieldWidth搭配使用，但不能与signFieldSize同时传入 |
| | | | signFieldStyle | | int32 | 否 | body | 签章区样式 <br/>**1** - 单页签章，**2** - 骑缝签章 |
| | | | signFieldPosition | | object | 否 | body | 签章区位置信息 |
| | | |  | acrossPageMode | string | 否 | body | 骑缝章模式选择<br/>**ALL **- 全部页盖骑缝章，**AssignedPages **- 指定页码盖骑缝章 |
| | | | | positionPage | string | 否 | body | 签章区所在页码<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 当signFieldStyle为 **1** - 单页签章时，只能传单个页码；<br/>+ 当signFieldStyle为** 2** - 骑缝签章时，且acrossPageMode为AssignedPages即指定页码范围时，连续页码可使用'-'指定页码范围，多个页码范围用逗号分隔，例如：1-3,6-10。 |
| | | | | positionX | float | 否 | body | 签章区所在X坐标（当signFieldStyle为2即骑缝签章时，该参数不生效，可不传值）<br/><font style="color:rgb(245, 34, 45);">【注】可选择如下方式可以确定坐标：</font><br/>（1）开放平台拖章定位工具【[请点击](https://open.esign.cn/tools/seal-position)】<br/>（2）根据关键字辅助定位接口【[请点击](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ze0ahv)】 |
| | | | | positionY | float | 否 | body | 签章区所在Y坐标 |
| | | remarkSignFieldConfig | | | object | 否 | body | 备注区配置项<font style="color:#F5222D;">（指定signFieldType为 1 - 备注区时，该参数为必传项）</font><br/>（[点击了解 备注签署](https://qianxiaoxia.yuque.com/opendoc/case3/pxlkdri00a37c2zy)）<br/><font style="color:rgb(245, 34, 45);">【注】</font><br/>+ <font style="color:rgb(245, 34, 45);">备注区只支持个人签署方</font><br/>+ <font style="color:rgb(245, 34, 45);">备注内容不可控，如对备注内容有严格要求建议不要设置自由备注模式并使用手写抄录开启AI校验</font> |
| | |  | freeMode | | boolbean | 否 | body | 自由备注模式，默认值 false<br/>**true **- 是，**false **- 否。<br/><font style="color:rgb(245, 34, 45);">【注】自由备注指由用户选择是否备注，且</font>**<font style="color:rgb(245, 34, 45);">不限备注位置和备注区个数</font>**<font style="color:rgb(245, 34, 45);"></font> |
| | | | inputType | | int32 | 否 | body | 文字输入方式，默认值：**1**<br/>**1** - 手写抄录方式，**2** - 键盘输入方式<br/><font style="color:#F5222D;">【注】inputType=2（键盘输入方式）时，aiCheck和remarkContent参数值不生效</font> |
| | | | aiCheck | | int32 | 否 | body | 是否开启手写抄录AI校验，默认值：**0 **<br/>**0 **- 不开启（不开启AI校验手写内容是否一致）<br/>**1 **- 开启 AI 校验（开启 AI 手写抄录校验，连续3次校验不通过将弹窗提醒“监测到多次识别未通过，是否直接使用当前手写笔迹？”，确定后跳过该字的校验，下一个字继续执行 AI 校验）<br/>**2** - 强制 AI 校验（强制 AI 手绘校验，若校验不通过，则会一直提示“识别失败，请重新书写XX”，直至校验通过） |
| | | | remarkContent | | string | 否 | body | 预设待抄录信息，最多支持50个汉字（含标点符号）<br/><font style="color:#F5222D;">【注】inputType=1时手写抄录方式此参数必须传值</font> |
| | | | movableSignField | | boolbean | 否 | body | 备注区是否可以移动，默认值 false <br/>**true** - 可移动，**false **- 位置固定 |
| | | | remarkFontSize | | int32 | 否 | body | 备注文字字号，默认值14px |
| | | | signFieldHeight | | float | 否 | body | 备注区高度（矩形的上下距离，单位为px） |
| | | | signFieldWidth | | float | 否 | body | 备注区宽度（矩形的左右距离，单位为px） |
| | | | signFieldPosition | | object | 否 | body | 备注区位置 |
| | | |  | positionPage | string | 否 | body | 备注区所在页码，只能传单个页码。 |
| | | | | positionX | float | 否 | body | 备注区所在X坐标 |
| | | | | positionY | float | 否 | body | 备注区所在Y坐标 |
| | | signDateConfig | | | object | 否 | body | 签署日期配置项<br/><font style="color:#E8323C;">补充说明：</font><br/>+ OFD格式文件暂不支持指定签署日期 |
| | |  | dateFormat | | string | 否 | body | 日期格式<br/>**yyyy年MM月dd日**<font style="color:#E8323C;">（默认值）</font><br/>**yyyy-MM-dd **<br/>**yyyy/MM/dd**<br/>**yyyy-MM-dd HH:mm:ss**<font style="color:#E8323C;"></font> |
| | | | fontSize | | int32 | 否 | body | 日期字体大小，默认值 12px |
| | | | showSignDate | | int32 | 否 | body | 是否显示签署日期，默认值 0 <br/>**0 **- 不显示，**1 **- 固定位置显示，**2 **- 不固定位置<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 传1时，可以设置签署日期位置的X、Y坐标（如不传入位置坐标，日期默认显示在签署区下方，但不传位置用户手动签署时可移动日期位置，传了位置则不可移动）<br/>+ 传2时，由用户在签署页面中选择是否开启显示签署日期（默认不开启），开启后日期位置可在页面移动调整。日期格式、字体大小参数都不生效，需要用户在页面选择。 |
| | | | signDatePositionX | | float | 否 | body | 签署日期所在位置**X**坐标，当showSignDate为**1**-固定位置显示时生效。 |
| | | | signDatePositionY | | float | 否 | body | 签署日期所在位置**Y**坐标，当showSignDate为**1-**固定位置显示时生效。 |
| | | dateSignFieldConfig | | | object | 否 | body | 独立签署日期配置项<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 该日期是跟签署区/备注区独立的，只要保证一个用户下存在至少一个签署区/备注区即可，可以配置多个日期位置且支持和签署区/备注区不在同一页码<br/>+ 当signFieldType（签署区类型）= 2（独立签署日期）时，指定该参数 |
| | | | autoSign | | boolean | 否 | body | 是否是后台自动落章关联的独立签署日期，默认值 **false**<br/>**true** - 后台自动落章关联的独立签署日期（平台静默签署）<br/>**false** - 签署页手动签章关联的独立签署日期<br/><font style="color:#F5222D;">【注】当关联的普通签署区包含自动签，即签署区数组中存在normalSignFieldConfig中的autoSign=true时，该字段才允许传true</font> |
| | | | dateFormat | | string | 否 | body | 日期格式<br/>**yyyy年MM月dd日**<font style="color:#E8323C;">（默认值）</font><br/>**yyyy-MM-dd **<br/>**yyyy/MM/dd**<br/>**yyyy.MM.dd**<br/>**yyyy年M月d日**<br/>**yyyy年M月**<br/>**yyyy/M/d**<br/>**yy-MM-dd**<br/>**yyyy/MM/dd HH:mm:ss**<br/>**yyyy/MM/dd HH:mm**<br/>**yyyy-MM-dd HH:mm** |
| | | | fontSize | | int | 否 | body | 日期字体大小，默认值12px（可传入5-42） |
| | | | signDatePositionPage | | int | 否 | body | 指定签署日期位置页码<br/><font style="color:#F5222D;">【注】</font><font style="color:#DF2A3F;">允许与签署区位置positionPage的值不一样，即允许跨页添加签署日期</font> |
| | | | signDatePositionX | | float | 否 | body | 签署日期所在位置X坐标 |
| | | | signDatePositionY | | float | 否 | body | 签署日期所在位置Y坐标 |
| **copiers**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **array** | **否** | **body** | **预设置****抄送方信息**（指不参与签署的机构或者个人，流程结束后将收到通知，允许查看签署文件）<br/>（[点击了解 添加合同抄送方](https://qianxiaoxia.yuque.com/opendoc/case3/uiviglpo2yg7rhd0)）<br/>+ 如需抄送多个企业或个人，允许传入多个抄送方数组；<br/>+ 抄送机构的情况：copierOrgInfo与copierPsnInfo均需传值；抄送个人的情况：仅需传copierPsnInfo； |
|  | copierOrgInfo<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | body | 机构抄送方信息<font style="color:#E8323C;">（orgName与orgId，二选一传值）</font> |
| |  | orgName | | | string | 否 | body | 机构名称 |
| | | orgId | | | string | 否 | body | 机构账号ID |
| | copierPsnInfo<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | body | 个人抄送方信息<font style="color:#E8323C;">（psnAccount与psnId，二选一传值）</font> |
| |  | psnAccount | | | string | 否 | body | 个人账号标识（手机号/邮箱号） |
| | | psnId | | | string | 否 | body | 个人账号ID |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
| | signFlowInitiateUrl | | | | string | 否 | 发起签署页面链接<font style="color:#E8323C;">（有效期30天）</font><br/><font style="color:#E8323C;">【注】当页面链接已经成功发起了签署流程后就会失效，不可以继续发起新的签署流程。</font> |
| | signFlowInitiateLongUrl | | | | string | 否 | 发起签署页面长链接<font style="color:#E8323C;">（有效期30天）</font><br/><font style="color:#E8323C;">【注】</font><br/>+ <font style="color:#E8323C;">当页面长链接已经成功发起了签署流程后就会失效，不可以继续发起新的签署流程。</font><br/>+ <font style="color:#E8323C;">长链接支持自定义域名，微信小程序H5内嵌场景需要使用此长链接</font> |


### 请求示例
```json
{
    "initiatePageConfig": {
        "customBizNum": "这是一串开发者自定义的业务编号",
        "redirectUrl": "https://xxx.cn",
        "uneditableFields": [
            "signFlowTitle",
            "signFlowExpireTime",
            "copiers",
            "attachments"
        ]
    },
    "signFlowConfig": {
        "signFlowTitle": "这是本次签署任务的主题",
        "autoFinish": true,
        "noticeConfig": {
            "noticeTypes": "1"
        },
        "redirectConfig": {
            "redirectUrl": "https://xxx.cn/"
        },
        "notifyUrl": "http://xx.xx.xx.xx:8081/notify"
    }
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "signFlowInitiateUrl": "https://smlt.esign.cn/DXXXXX8vZ",
        "signFlowInitiateLongUrl": "https://smlh5.esign.cn/start/home/pc/sign/set?context=o7CG1jMbGAXH&batchSerialId=d6dc6*****1e0500"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)





