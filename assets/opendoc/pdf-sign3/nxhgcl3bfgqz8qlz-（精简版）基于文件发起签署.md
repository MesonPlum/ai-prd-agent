### 接口描述
开发者可基于 <font style="color:#F5222D;">已上传的合同文件 </font>或 <font style="color:#F5222D;">模板所填充生成的文件 </font>来发起签署流程。

:::warning
<font style="color:#DF2A3F;">由于《基于文件发起签署》接口参数过于繁多，开发者接入较为复杂，该文档在完整版基础上根据开发者常用参数做了精简，因此命名为（精简版）基于文件发起签署。与</font>[**（完整版）基于文件发起签署**](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/su5g42)<font style="color:#DF2A3F;"> 是同一个接口。</font>

:::

:::info
**<font style="color:#E8323C;">【注意事项】</font>**

 1. 单个签署流程中对**签署文件（**`**docs**`**）**要求如下：

+ 单个签署流程中所添加的文件个数不可超过**50**个。
+ 单个文件大小不可超过**50**MB。
+ 单个文件内单页大小不可超过**20**MB（文件内含图片时，需特别关注单页大小）。
+ 单个签署流程中所添加的文件大小总和不可超过**500**MB。

 2. 单个签署流程中一次性添加的**签署方****（**`**signers**`**）**不要超过**10**个，如果超过10个后续可以用[《追加签署区》](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ohzup7)接口追加，整个流程不能超过**50**个签署方。

 3. 单个签署流程中所添加的**签署区（**`**signFields**`**）**总和不要超过**300**个。

:::

### 接口地址&请求方法
> <font style="color:#333333;">点击下述蓝色字体{host}可跳转至API请求域名说明文档</font>
>

**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/create-by-file

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
:::danger
_开发者可通过_[_【签字盖章核心操作演示视频】_](https://demo.esign.cn/saas-api-sign-pre.html)_和_[_【发起签署参数可视化讲解页】_](https://demo.esign.cn/saas-api-v3-signintro.html)_来辅助理解签章及参数含义。_

:::

| **参数名称****<font style="color:rgb(140, 140, 140);background-color:rgb(233, 233, 233);">（点击左侧“+”一键展开参数）</font>** | | | | | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#8C8C8C;">（请左右滑动查看完整描述）</font>** | **示例效果** |
| --- | --- | --- | --- | --- | :---: | :---: | :---: | --- | --- |
| **docs**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **array** | **否** | **body** | **设置待签署文件信息**<br/>+ 流程中如需一次完成多份文件签署，可传入多个docs数组；<br/>+ <font style="background-color:rgb(241, 242, 243);">当发起流程而相关签署需求无法确定时，允许不传docs（同时签署方参数signers也无需设置、是否自动开启</font>autoStart必须设置为false<font style="background-color:rgb(241, 242, 243);">），发起签署后再</font>[<font style="background-color:rgb(241, 242, 243);">【追加签署文件】</font>](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/fuuzv5)<font style="background-color:rgb(241, 242, 243);">。</font> | [**点击了解 直接上传待签署文件**](https://qianxiaoxia.yuque.com/opendoc/case3/hxzn88wydyft769i)<br/>[**点击了解 PDF模板填充生成待签署文件**](https://qianxiaoxia.yuque.com/opendoc/case3/rs709w)<br/>[**点击了解 ****HTML动态模板填充生成待签署文件**](https://qianxiaoxia.yuque.com/opendoc/case3/ubfvvk) |
|  | fileId | | | | string | 是 | body | 待签署文件ID |  |
| | fileName | | | | string | 否 | body | 文件名称（需要添加文件的真实后缀名，如：“xxx.pdf”、“xxx.ofd”）<br/><font style="color:#E8323C;">【注】</font><br/>+ <font style="color:#E8323C;">文件名称不可含有以下9个特殊字符：/ \ : * " < > | ？以及所有emoji表情</font><br/>+ <font style="color:#E8323C;">文件名称长度限制不能超过100字符</font> | [点击了解 设置文件名称](https://qianxiaoxia.yuque.com/opendoc/case3/yu2g4vqm6hioligk) |
| **signFlowConfig**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **object** | **是** | **body** | **签署流程配置项** | **** |
|  | signFlowTitle | | | | string | 是 | body | 签署流程主题（将展示在签署通知和签署页的任务信息中）<br/><font style="color:#E8323C;">【注】主题名称不可含有以下9个特殊字符：/ \ : * " < > | ？以及所有emoji表情</font> | ![](https://cdn.nlark.com/yuque/0/2025/png/447795/1766470808209-f6e9d3c8-b3d3-4a40-8e8e-9e9d31a0f315.png)![](https://cdn.nlark.com/yuque/0/2025/png/447795/1766470977768-9a329c32-5d66-464a-8ca4-0b42e980b378.png) |
| | signFlowExpireTime | | | | int64 | 否 | body | 签署截止时间， <font style="color:#E8323C;">unix时间戳（毫秒）格式</font>（[点击了解 指定签署截止日期](https://qianxiaoxia.yuque.com/opendoc/case3/rhb8htbiaq8hl3td)）<br/><font style="color:#F5222D;">补充说明：</font><br/>默认在签署流程创建后的**90天**时截止<font style="color:#DF2A3F;">（指定值最大不能超过90天，只能指定90天内的时间戳）</font>。签署中如需延期请调用[【延期签署截止时间】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/idv0fv)接口。 | [点击了解 指定签署截止日期](https://qianxiaoxia.yuque.com/opendoc/case3/rhb8htbiaq8hl3td) |
| | autoFinish | | | | boolean | 否 | body | 所有签署方签署完成后流程自动完结，默认值 false<br/>**true **- 自动完结<br/>**false **- 非自动完结，需调用[【完结签署流程】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/ynwqsm)接口完结<br/><font style="color:#E8323C;">【注】设置了自动完结的流程中不允许再追加签署区、抄送方。</font> | [点击了解 签署流程状态详解](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/gsy6xe) |
| | notifyUrl | | | | string | 否 | body | 接收相关回调通知的Web地址，详见[【签署回调通知接收说明】](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/sblzg8)。 |  |
| | noticeConfig<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | body | 流程整体通知配置项 |  |
| | | noticeTypes | | | string | 否 | body | 通知类型，通知签署方签署链接，<font style="color:#DF2A3F;">默认不通知</font>（值为""空字符串），允许多种通知方式，请使用英文逗号分隔<br/>**"" **- 不通知<font style="color:#E8323C;">（默认值）</font><br/>**1** - 短信通知<font style="color:#DF2A3F;">（如果套餐内带“分项”字样，请确保开通【电子签名流量费（分项）认证】中的子项：【短信服务】，否则短信通知收不到）</font><br/>**2 **- 邮件通知<br/>**3** - 钉钉工作通知（需使用e签宝钉签产品）<br/>**5** - 微信通知（用户需关注“e签宝电子签名”微信公众号且使用过e签宝微信小程序）<br/>**6** - 企业微信通知（需要使用e签宝企微版产品）<br/>**7** - 飞书通知（需要使用e签宝飞书版产品）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 1、2：个人账号中需要绑定短信/邮件才有对应的通知方式；<br/>+ 3、5、6、7：仅限e签宝<font style="color:#DF2A3F;">正式环境</font>调用才会有。 | [点解了解 指定e签宝短信/邮件通知签署](https://qianxiaoxia.yuque.com/opendoc/case3/uk2lbd9ictbycpz1) |
| | | examineNotice | | | boolean | 否 | body | 通知给企业印章用印审批人员的通知类型，按照账号中的手机号或邮箱的填写情况进行通知。   **true** - 发送消息（短信+邮件+e签宝官网站内信）<br/><font style="color:#DF2A3F;">（如果套餐内带“分项”字样，请确保开通【电子签名流量费（分项）认证】中的子项：【短信服务】，否则短信通知收不到）</font>   **false** - 不发送消息<br/><font style="color:#E8323C;">【注】不传值默认取noticeTypes配置的通知方式</font> | [点解了解 企业签署用印审批的触发与流程](https://qianxiaoxia.yuque.com/opendoc/helper/qi453w) |
| | redirectConfig<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | body | 重定向配置项 |  |
| |  | redirectUrl | | | string | 否 | body | 签署完成后跳转页面（除app和小程序端集成外，地址需符合 https /http 协议地址）<br/><font style="color:#E8323C;">【注】</font><br/>+ <font style="color:#E8323C;"></font><font style="color:#DF2A3F;">贵司的重定向域名需要在e签宝提前放行，否则会报错：“您即将访问的</font><font style="color:#E8323C;">页面可能有安全风险”。（</font>[点击跳转 重定向域名配置说明](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/umo8rop7dmttkdnv)<font style="color:#DF2A3F;">）</font><br/>+ <font style="color:#DF2A3F;">签署完成后会在贵司重定向地址上拼接签署状态等字段。（</font>[点击跳转 签署页重定向跳转说明](https://qianxiaoxia.yuque.com/opendoc/notify3/madi1g)<font style="color:#DF2A3F;">）</font> |  |
| **signers**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **array** | **否** | **body** | **签署方信息**（指参与签署的个人或者机构）<br/>（[点击了解 如何指定双方签署](https://qianxiaoxia.yuque.com/opendoc/case3/evesulzd0efhg59y)）<br/>+ 单个签署方数组中，机构签署方、个人签署方二选一传入<br/>（orgSignerInfo与psnSignerInfo二选一即可）；<br/>+ 多方签署场景，可传多个签署方数组；<br/>+ 单个签署流程中，签署方最多不能超过10个。<br/><font style="color:#E8323C;">【注】该接口如果未添加签署方信息，则需要后续在流程中添加，调用</font>[【追加签署区】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ohzup7)<font style="color:#E8323C;">接口添加。</font> | [**点击了解 单方签署**](https://qianxiaoxia.yuque.com/opendoc/case3/xf1vsv7vdmwerhmg)<br/>[**点击了解 双方签署**](https://qianxiaoxia.yuque.com/opendoc/case3/evesulzd0efhg59y)<br/>[**点击了解 多方签署**](https://qianxiaoxia.yuque.com/opendoc/case3/ubp51qdmgu0gkd0x) |
|  | **signConfig**<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | body | 签署人配置项 |  |
| | | forcedReadingTime | | | int32 | 否 | body | 设置页面强制阅读倒计时时间，默认值为 0（单位：秒，最大值999） | [点击了解 指定强制阅读时间](https://qianxiaoxia.yuque.com/opendoc/case3/wclqklmiecs2yqlz) |
| | | signOrder | | | int32 | 否 | body | 设置签署方的签署顺序<br/>+ 按序签时支持传入顺序值** 1 - 255**<font style="color:#DF2A3F;">（值小的先签署）</font><br/>+ 同时签时，允许值重复 | [点击了解 指定签署顺序](https://qianxiaoxia.yuque.com/opendoc/case3/tkrt9rm7018k73lb) |
| | **signerType** | | | | int32 | 是 | body | 签署方类型<br/>**0 **- 个人，**1 **-企业/机构，**2** - 法定代表人，**3** - 经办人<br/>+ 若指定签署方为个人，则psnSignerInfo为必传项；<br/>+ 若指定签署方为机构或法定代表人手动签署（autoSign参数为false）时，则orgSignerInfo为必传项；<br/>+ 若指定签署方为经办人，在同级数组内必须还有机构类型存在，且orgSignerInfo为必传项，即：指定**3** - 经办人签的前提是必须同时存在**1 **- 企业/机构（且autoSign参数为false），且经办人签属于企业合同，不在个人名下。 | [点击了解 单方签署](https://qianxiaoxia.yuque.com/opendoc/case3/xf1vsv7vdmwerhmg)<br/>[点击了解 企业与法定代表人自动签署](https://qianxiaoxia.yuque.com/opendoc/case3/vubtggb5ah1g7ly7)<br/>[点击了解 经办人签章](https://qianxiaoxia.yuque.com/opendoc/case3/si9rglzcyxgg72u8) |
| | **orgSignerInfo**<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | body | **企业/机构签署方信息**<br/>+ 当签署主体为**企业/机构用户**、autoSign参数为false手动签章时，<font style="color:#DF2A3F;">请必须传入此对象</font><br/>+ 当**企业/机构用户**选择静默签署，autoSign参数为true自动落章时，<font style="color:#DF2A3F;">建议不传此对象，e签宝后台会取默认值</font> | **** |
| | | orgName | | | string | 是 | body | 企业/机构名称（账号标识）<br/><font style="color:#E8323C;">【注】</font><font style="color:#F5222D;">企业/机构用户签署时，该参数为必传项</font> |  |
| | | orgInfo<font style="color:rgb(232, 50, 60);"></font> | | | object | 否 | body | 企业/机构签署方信息（将展示在机构认证页面） |  |
| | | | orgIDCardNum | | string | 否 | body | 企业/机构证件号 |  |
| | | | orgIDCardType | | string | 否 | body | 企业/机构证件类型，可选值如下：<br/>**CRED_ORG_USCC **- 统一社会信用代码<br/>**CRED_ORG_REGCODE **- 工商注册号 |  |
| | | transactorInfo<font style="color:rgb(232, 50, 60);"></font> | | | object | 否 | body | 企业/机构经办人信息<br/>+ 企业/机构手动签署（autoSign为false），经办人信息必传<br/>+ 企业/机构自动落章（autoSign为true），请不要传该参数 |  |
| | | | psnAccount | | string | 是 | body | 经办人账号标识，手机号或邮箱<br/><font style="color:#E8323C;">【注】指</font><font style="color:#F5222D;">定orgName时，该参数为必传项，</font><font style="color:#E8323C;">为了保证签署人准确，</font>**<font style="color:#E8323C;">必须配合psnName（经办人姓名）传入</font>**<font style="color:#E8323C;"></font> |  |
| | | | psnInfo | | object | 否 | body | 经办人身份信息 |  |
| | | |  | psnName | string | 是 | body | 经办人姓名<br/><font style="color:#DF2A3F;">【注】传psnAccount（经办人账号标识）时，</font>**<font style="color:#F5222D;">该参数为必传项</font>** |  |
| | | | | psnIDCardNum | string | 否 | body | 经办人证件号 |  |
| | | | | psnIDCardType | string | 否 | body | 经办人证件类型，可选值如下：<br/>**CRED_PSN_CH_IDCARD** - 中国大陆居民身份证<font style="color:#E8323C;">（默认值）</font><br/>**CRED_PSN_CH_HONGKONG** - 香港来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_MACAO **- 澳门来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_TWCARD **- 台湾来往大陆通行证（台胞证）<br/>**CRED_PSN_PASSPORT **- 护照<br/><font style="color:#DF2A3F;">【注】</font>**<font style="color:#DF2A3F;">CRED_PSN_CH_IDCARD</font>**<font style="color:#DF2A3F;"> 类型同时兼容港澳台居住证（81、82、83开头18位证件号）、外国人永久居住证（9开头18位证件号）</font> |  |
| | **psnSignerInfo**<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | body | **个人签署方信息**<br/>+ 当签署主体为个人时请传此对象 | **** |
| | | psnAccount | | | string | 是 | body | 个人账号标识（手机号或邮箱）<font style="color:#E8323C;">用于登录e签宝官网的凭证</font><br/><font style="color:#E8323C;">【注】个人用户签署</font><font style="color:#F5222D;">时，该参数为必传项，</font><font style="color:#E8323C;">为了保证签署人准确，</font>**<font style="color:#E8323C;">必须配合psnName（个人姓名）传入</font>** |  |
| | | psnInfo<font style="color:rgb(232, 50, 60);"></font> | | | object | 否 | body | 个人签署方身份信息<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 已实名用户，若传入的psnInfo与在e签宝绑定的psnAccount一致，则无需重复实名，签署页直接进行签署意愿认证；<br/>+ 已实名用户，若传入的psnInfo与在e签宝绑定的psnAccount不一致，则接口将会报错，建议核实用户身份信息后重新发起流程；<br/>+ 未实名用户，签署页将根据传入的身份信息进行用户实名认证。 |  |
| | | | psnName | | string | 是 | body | 个人姓名<br/><font style="color:#DF2A3F;">【注】传psnAccount（个人账号标识）时</font>**<font style="color:#DF2A3F;">，</font>****<font style="color:#F5222D;">该参数为必传项</font>** |  |
| | | | psnIDCardNum | | string | 否 | body | 个人证件号 |  |
| | | | psnIDCardType | | string | 否 | body | 个人证件类型，可选值如下：<br/>**CRED_PSN_CH_IDCARD** - 中国大陆居民身份证<font style="color:#E8323C;">（默认值）</font><br/>**CRED_PSN_CH_HONGKONG** - 香港来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_MACAO **- 澳门来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_TWCARD **- 台湾来往大陆通行证（台胞证）<br/>**CRED_PSN_PASSPORT **- 护照<br/><font style="color:#DF2A3F;">【注】</font>**<font style="color:#DF2A3F;">CRED_PSN_CH_IDCARD</font>**<font style="color:#DF2A3F;"> 类型同时兼容港澳台居住证（81、82、83开头18位证件号）、外国人永久居住证（9开头18位证件号）</font> |  |
| | **signFields**<font style="color:rgb(232, 50, 60);"></font> | | | | array | 是 | body | **签署区信息**（设置签署方 盖章/签名/文字输入的区域）<br/><font style="color:#F5222D;">【注】指定了签署方signers的情况下，签署区必传</font><br/>（单个签署方若对应多个签署区，可传多个数组，整个流程中，签署区不能超过300个） | **** |
| |  | fileId | | | string | 是 | body | 签署区所在待签署文件ID<br/><font style="color:#F5222D;">【注】这里的fileId需先添加在</font>**<font style="color:#F5222D;">docs</font>**<font style="color:#F5222D;">数组中，否则会报错“参数错误: 文件id不在签署流程中”</font> |  |
| | | customBizNum | | | string | 否 | body | 开发者自定义业务编号<br/><font style="color:#DF2A3F;">【注】该参数会在</font>[【签署方-签署结果通知】](https://qianxiaoxia.yuque.com/opendoc/notify3/zzcdf8)<font style="color:#DF2A3F;">中原样返回，用于标识开发者自身业务</font> |  |
| | | normalSignFieldConfig | | | object | 是 | body | 签章区配置项<font style="color:#F5222D;"></font> |  |
| | | | freeMode | | boolean | 否 | body | 是否自由签章，默认值 false<br/><br/>**true **- 是，**false **- 否<br/><font style="color:#E8323C;">补充说明：</font><br/>+ **自由签章** 指不限制印章、签署位置、签章样式（单页、骑缝）、和签章个数。<br/>+ 自由签章模式下，无需传normalSignFieldConfig对象下的其他参数。 | [点击了解 指定位置签章与自由签章](https://qianxiaoxia.yuque.com/opendoc/case3/tgvrtoz21b06dqgc) |
| | | | autoSign | | boolean | 否 | body | 是否后台自动落章，默认值 false<br/>**true** - 后台自动落章（无感知），**false** - 签署页手动签章<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 当签署方为**个人**时，不支持自动签章。<br/>+ 当签署方为**机构**（且非应用Id所属企业**）**，静默签署自动落章需先经过印章授权，[点击查看](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/vk863c)印章授权规则。<br/>+ 当签署方为**应用Id所属主体企业**自身静默签署时，支持后台自动落章。<br/>**<font style="color:#DF2A3F;">（自2024年9月12日起，机构用户自动落章（</font>**[**跨企业印章授权自动签署**](https://qianxiaoxia.yuque.com/opendoc/helper/ryllt4y4x6bemr7b)**<font style="color:#DF2A3F;">）功能需要购买e签宝高级版或生态伙伴版本方可支持）</font>** | [点击了解 企业与法定代表人自动签署](https://qianxiaoxia.yuque.com/opendoc/case3/vubtggb5ah1g7ly7) |
| | | | assignedSealId | | string | 否 | body | 指定印章ID（印章ID是e签宝SaaS官网的印章编号，[点击查看 获取方式](https://qianxiaoxia.yuque.com/opendoc/helper/xvglqhiq48prkf4m)）<br/><font style="color:#F5222D;">【注】平台方企业自动落章场景，如不指定印章ID，则取平台默认印章</font> | [点击了解 指定印章场景说明](https://qianxiaoxia.yuque.com/opendoc/case3/pwdxfr6w04id5gww) |
| | | | signFieldSize | | float | 否 | body | 签章区尺寸（正方形的边长，单位为px）<br/><font style="color:rgb(245, 34, 45);">【注】不指定默认以印章原始大小展示</font> | [点击了解  设置签署区尺寸](https://qianxiaoxia.yuque.com/opendoc/case3/qg20trlpyahxm3h4) |
| | | | signFieldStyle | | int32 | 否 | body | 签章区样式 <br/>**1** - 单页签章，**2** - 骑缝签章（[点击了解 骑缝盖章](https://qianxiaoxia.yuque.com/opendoc/case3/yi2uzzogefr5lp1z)） | [点击了解 骑缝盖章](https://qianxiaoxia.yuque.com/opendoc/case3/yi2uzzogefr5lp1z)   [点击了解 骑缝+单页盖章](https://qianxiaoxia.yuque.com/opendoc/case3/ridnrz2awbq9qq5u) |
| | | | signFieldPosition | | object | 否 | body | 签章区位置信息<br/> | [点击了解 指定位置签章与自由签章](https://qianxiaoxia.yuque.com/opendoc/case3/tgvrtoz21b06dqgc) |
| | | |  | acrossPageMode | string | 否 | body | 骑缝章模式选择<br/>**ALL **- 全部页盖骑缝章，**AssignedPages **- 指定页码盖骑缝章<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 当signFieldStyle为1即单页签章时，该参数无需设置<br/>+ 当signFieldStyle为2即骑缝签章时，可以指定该参数，默认值**ALL** | [点击了解 骑缝盖章](https://qianxiaoxia.yuque.com/opendoc/case3/yi2uzzogefr5lp1z) |
| | | | | positionPage | string | 否 | body | 签章区所在页码<br/><font style="color:#E8323C;">补充说明：</font><br/>（1）当signFieldStyle为1即单页签章时，只能传单个页码 <br/>（2）当signFieldStyle为2即骑缝签章时，且acrossPageMode为AssignedPages即指定页码范围时，连续页码可使用'-'指定页码范围，多个页码范围用逗号分隔，例如：1-3,6-10 |  |
| | | | | positionX | float | 否 | body | 签章区所在X坐标（当signFieldStyle为2即骑缝签章时，该参数不生效，可不传值）<br/><font style="color:rgb(245, 34, 45);">【注】可选择如下方式可以确定坐标：</font><br/>（1）开放平台拖章定位工具：【[请点击](https://open.esign.cn/tools/seal-position)】<br/>（2）根据关键字辅助定位接口【[请点击](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ze0ahv)】 |  |
| | | | | positionY | float | 否 | body | 签章区所在Y坐标 |  |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | signFlowId | | | | string | 否 | 签署流程ID<font style="color:#E8323C;">（建议开发者保存此流程ID）</font> |


### 请求示例
此场景案例为**个人用户**和**平台自身**（应用Id所属主体企业）双方签署案例

更多参数案例请参考[【常见场景对接说明】](https://qianxiaoxia.yuque.com/opendoc/apiv3-guide/al7kcc)中“**发起签署**”和“**签署可选功能**”模块

```json
{
    "docs": [
        {
            "fileId": "55607bb*****702b5f92ed565",
            "fileName": "xx企业劳动合同.pdf"
        }
    ],
    "signFlowConfig": {
        "signFlowTitle": "企业员工劳动合同签署",
        "signFlowExpireTime": 169111118000,
        "autoFinish": true,
        "notifyUrl": "http://xxx/asyn/notify",
        "redirectConfig": {
            "redirectUrl": "http://www.xx.cn/"
        }
    },
    "signers": [
        {
            "signConfig": {
                "signOrder": 1
            },
            "noticeConfig": {
                "noticeTypes": "1"
            },
            "signerType": 0,
            "psnSignerInfo": {
                "psnAccount": "15****50",
                "psnInfo": {
                    "psnName": "张三"
                }
            },
            "signFields": [
                {
                    "customBizNum": "自定义编码001",
                    "fileId": "55607bb5*******ed565",
                    "normalSignFieldConfig": {
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "1",
                            "positionX": 200,
                            "positionY": 200
                        }
                    }
                }
            ]
        },
        {
            "signConfig": {
                "signOrder": 2
            },
            "signerType": 1,
            "signFields": [
                {
                    "customBizNum": "自定义编码002",
                    "fileId": "55607b********2ed565",
                    "normalSignFieldConfig": {
                        "autoSign": true,
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "1",
                            "positionX": 458,
                            "positionY": 200
                        }
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
    "code":0,
    "message":"成功",
    "data":{
        "signFlowId":"165467****000"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)

### 附录
发起签署的参数较多，不同的场景容易弄混，所以结合四种签署场景，整理了关键参数signers（签署方信息）中的传参规则。

signers中参数设置规则如下（signers本身是数组，多场景可以传多个）：

| **<font style="color:rgb(0, 0, 0);">参数字段\签署场景</font>** | **<font style="color:rgb(0, 0, 0);">appId对应的自身机构自动落章</font>** | **<font style="color:rgb(0, 0, 0);">机构用户自动落章</font>** | **<font style="color:rgb(0, 0, 0);">机构用户手动签署</font>** | **<font style="color:rgb(0, 0, 0);">个人用户手动签署</font>** |
| --- | :---: | :---: | :---: | :---: |
| **<font style="color:rgb(0, 0, 0);">signerType</font>** | <font style="color:rgb(0, 0, 0);">传值：1</font> | <font style="color:rgb(0, 0, 0);">传值：1</font> | <font style="color:rgb(0, 0, 0);">传值：1</font> | <font style="color:rgb(0, 0, 0);">传值：0</font> |
| **<font style="color:rgb(0, 0, 0);">orgSignerInfo</font>** | <font style="color:rgb(0, 0, 0);">不传</font> | <font style="color:rgb(0, 0, 0);">不传</font> | <font style="color:rgb(0, 0, 0);">（1）传入机构用户的账号orgId或者</font><font style="color:rgb(64, 64, 64);">orgName</font><br/><font style="color:rgb(0, 0, 0);">（2）传入代机构签署的经办人信息</font><font style="color:rgb(64, 64, 64);">transactorInfo</font><br/><font style="color:rgb(232, 50, 60);">（1）和（2）均须</font> | <font style="color:rgb(0, 0, 0);">不传</font> |
| **<font style="color:rgb(0, 0, 0);">psnSignerInfo</font>** | <font style="color:rgb(0, 0, 0);">不传</font> | <font style="color:rgb(0, 0, 0);">不传</font> | <font style="color:rgb(0, 0, 0);">不传</font> | <font style="color:rgb(0, 0, 0);">个人签署账号</font><font style="color:rgb(64, 64, 64);">psnAccount或者psnId</font> |
| **<font style="color:rgb(0, 0, 0);">autoSign</font>** | <font style="color:rgb(0, 0, 0);">true</font> | <font style="color:rgb(0, 0, 0);">true</font> | <font style="color:rgb(0, 0, 0);">false</font> | <font style="color:rgb(0, 0, 0);">false</font> |
| **<font style="color:rgb(0, 0, 0);">assignedSealId</font>** | <font style="color:rgb(0, 0, 0);">（1）不传此字段取默认印章</font><br/><font style="color:rgb(0, 0, 0);">（2） 传入appId对应的自身机构账号的印章ID</font><br/><font style="color:rgb(232, 50, 60);">（1）或者（2）</font> | <font style="color:rgb(0, 0, 0);">传入机构用户授权给appId对应的自身机构的印章ID</font><br/>（[跨企业印章授权与自动签署流程](https://qianxiaoxia.yuque.com/opendoc/helper/ryllt4y4x6bemr7b)） | <font style="color:rgb(0, 0, 0);">不传</font> | <font style="color:rgb(0, 0, 0);">不传</font> |


