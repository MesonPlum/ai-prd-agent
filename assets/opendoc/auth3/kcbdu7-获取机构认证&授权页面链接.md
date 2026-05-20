:::warning
**<font style="color:#DF2A3F;">重要提示：自2024年9月12日起，认证授权涉及权限范围（authorizedScopes）部分功能需要购买e签宝高级版或生态合作版本方可支持！</font>**

:::

### 接口描述
<font style="color:rgb(38, 38, 38);">用于获取组织机构的认证授权页面链接，通过此链接经办人可为组织机构进行</font><font style="color:#E8323C;">实名认证</font>、<font style="color:#E8323C;">资源授权</font><font style="color:rgb(38, 38, 38);">等操作。</font>

[点击这里](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/lmfokx)了解更多关于“用户授权与实名认证”场景介绍。

:::info
+ 调用本API接口前，开发者可通过[【查询机构认证信息】](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/xxz4tc)根据企业名称来查询是否为实名组织，已实名组织无需重复实名；
+ 开发者可接收[实名认证通过](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/tme3qi)的回调通知，来获取机构实名认证通过的结果，并保管机构用户的`orgId`；
+ 开发者可接收[授权完成通知](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/demod3)的回调通知，来获取本次授权的有效期限等相关信息；
+ 本次流程中认证授权操作的更多详情参考API接口：[【查询认证授权流程详情】](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/hlrs7s)。

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/org-auth-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| **orgAuthConfig**<font style="color:rgb(232, 50, 60);background-color:rgb(245, 245, 245);">（点击“+”展开详情）</font> | | | | **object** | **是** | **body** | **组织机构认证配置项**<br/>+ <font style="color:#DF2A3F;">传入机构信息后获取该机构的授权认证或者实名认证页面链接（若不传机构信息，则由用户自主在页面任意填写机构名称、证件号等认证信息）；</font><br/>+ <font style="color:#DF2A3F;">常规场景：组织机构名称orgName与机构账号orgId二者选一项传入即可。</font> |
|  | orgName | | | string | 否 | body | 组织机构名称<font style="color:#E8323C;">（机构账号标识）</font><br/><font style="color:#DF2A3F;">【注】orgName与orgId二者选一项传入即可，若未知机构的orgId，请传此字段</font> |
| | orgId | | | string | 否 | body | 机构账号ID<br/><font style="color:#DF2A3F;">【注】orgName与orgId二者选一项传入即可</font> |
| | orgInfo | | | object | 否 | body | 组织机构身份附加信息 |
| | | orgIDCardNum | | string | 否 | body | 组织机构证件号 |
| | | orgIDCardType | | string | 否 | body | 组织机构证件类型，可选值如下：<br/>+ **CRED_ORG_USCC** - 统一社会信用代码<br/>+ **CRED_ORG_REGCODE **- 工商注册号 |
| | | legalRepName | | string | 否 | body | 法定代表人姓名 |
| | | legalRepIDCardNum | | string | 否 | body | 法定代表人证件号 |
| | | legalRepIDCardType | | string | 否 | body | 法定代表人证件类型，可选值如下：<br/>+ **CRED_PSN_CH_IDCARD **- 中国大陆居民身份证<br/>+ **CRED_PSN_CH_HONGKONG **- 香港来往大陆通行证（回乡证）<br/>+ **CRED_PSN_CH_MACAO **- 澳门来往大陆通行证（回乡证）<br/>+ **CRED_PSN_CH_TWCARD **- 台湾来往大陆通行证（台胞证）<br/>+ **CRED_PSN_PASSPORT **- 护照 |
| | | orgBankAccountNum | | string | 否 | body | 企业对公打款银行账户<br/>**<font style="color:rgb(232, 50, 60);">【注】</font>**仅限实名方式为对公账户打款认证时使用 |
| | orgAuthPageConfig | | | object | 否 | body | 机构实名认证页面配置项 |
| |  | orgDefaultAuthMode | | string | 否 | body | 指定页面中默认选择的机构认证方式：<br/>+ **ORG_BANK_TRANSFER **- 对公账户打款认证<br/>+ **ORG_ALIPAY_CREDIT **- 法人快捷认证<font style="color:#DF2A3F;">（必须操作人为法定代表人本人场景才会显示，需要法人支付宝刷脸授权完成认证）</font><br/>+ **ORG_LEGALREP_INVOLVED - **法定代表人认证/法人授权认证<font style="color:#E8323C;">（如操作人为法定代表人本人操作则为法定代表人认证，如非法定代表人本人则为法人授权认证）</font> |
| | | orgAvailableAuthModes | | list | 否 | body | 设置页面中可选择的机构认证方式，若不传此参数，则可选择全部认证方式<br/>+ **ORG_BANK_TRANSFER **- 对公账户打款认证<br/>+ **ORG_ALIPAY_CREDIT **- 法人快捷认证<font style="color:#DF2A3F;">（必须操作人为法定代表人本人场景才会显示，需要法人支付宝刷脸授权完成认证）</font><br/>+ **ORG_LEGALREP_INVOLVED - **法定代表人认证/法人授权认证<font style="color:#E8323C;">（如操作人为法定代表人本人操作则为法定代表人认证，如非法定代表人本人则为法人授权认证）</font> |
| | | orgEditableFields | | list | 否 | body | 设置页面中可编辑的信息，<font style="color:rgb(64, 64, 64);">不传此参数，页面默认不允许编辑机构信息。</font><br/>+ **orgNum **- 机构证件号（如果账号已实名，传了该字段，页面也是不可编辑更改的，因为证件号是唯一标识）<br/>+ **legalRepName **- 法定代表人姓名<br/>+ **orgBankAccountNum** - 企业对公打款银行账户 |
| | transactorInfo | | | object | 否 | body | 经办人身份信息<br/><font style="color:#E8323C;">（如果不传经办人个人的账号信息，则需要经办人自主在页面填写手机号/邮箱进行验证码回填注册）</font> |
| | | psnId | | string | 否 | body | 经办人账号ID |
| | | psnAccount | | string | 否 | body | 经办人账号标识（手机号或邮箱） |
| | | psnInfo | | object | 否 | body | 经办人身份信息 |
| | | | psnName | string | 否 | body | 经办人姓名 |
| | | | psnIDCardNum | string | 否 | body | 经办人证件号 |
| | | | psnIDCardType | string | 否 | body | 经办人证件类型，可选值如下：<br/>+ **CRED_PSN_CH_IDCARD **- 中国大陆居民身份证<br/>+ **CRED_PSN_CH_HONGKONG **- 香港来往大陆通行证（回乡证）<br/>+ **CRED_PSN_CH_MACAO **- 澳门来往大陆通行证（回乡证）<br/>+ **CRED_PSN_CH_TWCARD **- 台湾来往大陆通行证（台胞证）<br/>+ **CRED_PSN_PASSPORT **- 护照<br/><font style="color:#DF2A3F;">【注】</font>**<font style="color:#DF2A3F;">CRED_PSN_CH_IDCARD</font>**<font style="color:#DF2A3F;"> 类型同时兼容港澳台居住证（81、82、83开头18位证件号）、外国人永久居住证（9开头18位证件号）</font> |
| | | | bankCardNum | string | 否 | body | 经办人银行卡号 |
| | | | psnMobile | string | 否 | body | 经办人手机号（运营商实名登记手机号或银行卡预留手机号，仅用于认证） |
| | | | psnIdentityVerify | boolean | 否 | body | 是否校验：psnAccount（经办人账号标识）或 psnId（经办人账号ID）绑定的e签宝个人信息与传入的psnInfo（经办人身份信息）中的信息一致<br/>**true** - 校验<br/>**false** - 不校验<font style="color:#F5222D;">（默认值）</font><br/>**<font style="color:rgb(232, 50, 60);">【注】</font>**若传true，则校验信息是否一致。若信息一致或经办人未在e签宝注册认证过则正常发起，若信息不一致则报错：“传入的%s和该用户在e签宝的个人信息不一致” ，其中%s可能为多个字段，包含：姓名、证件号、实名手机号、银行卡号 |
| | transactorAuthPageConfig | | | object | 否 | body | 经办人认证页面设置 |
| |  | psnDefaultAuthMode | | string | 否 | body | 设置页面中默认选择的实名认证方式，可选值如下：<br/>+ **<font style="color:rgb(64, 64, 64);">PSN_FACE </font>**<font style="color:rgb(64, 64, 64);">- 人脸识别认证</font><font style="color:rgb(245, 34, 45);">（默认值）</font><br/>+ **<font style="color:rgb(64, 64, 64);">PSN_MOBILE3 </font>**<font style="color:rgb(64, 64, 64);">- 手机运营商三要素认证</font><br/>+ **<font style="color:rgb(64, 64, 64);">PSN_BANKCARD4 </font>**<font style="color:rgb(64, 64, 64);">- 银行卡四要素认证</font><br/><font style="color:#E8323C;">【注】使用iframe内嵌集成不支持对接刷脸方式</font> |
| | | psnAvailableAuthModes | | list | 否 | body | 设置页面中可选择的个人认证方式，若不传此参数，则可选择全部认证方式<br/>+ **<font style="color:rgb(64, 64, 64);">PSN_FACE </font>**<font style="color:rgb(64, 64, 64);">- 人脸识别认证</font><br/>+ **<font style="color:rgb(64, 64, 64);">PSN_MOBILE3</font>****<font style="color:rgb(64, 64, 64);"> </font>**<font style="color:rgb(64, 64, 64);">- 手机运营商三要素认证</font><br/>+ **<font style="color:rgb(64, 64, 64);">PSN_BANKCARD4 </font>**<font style="color:rgb(64, 64, 64);">- 银行卡四要素认证</font><br/><font style="color:#E8323C;">【注】使用iframe内嵌集成不支持对接刷脸方式</font> |
| | | advancedVersion    | | list | 否 | body | 通过银行卡认证或运营商认证方式时，是否使用详情版（如指定则核验失败可返回具体不匹配信息），传空默认为普通版。<br/>+ **PSN_MOBILE3 **- 手机运营商三要素认证<br/>+ **PSN_BANKCARD4 **- 银行卡四要素认证<br/>**<font style="color:rgb(232, 50, 60);">【注】</font>**详情版：针对个人认证失败可以返回具体的不匹配信息，需要单独购买，具体购买方式请咨询e签宝商务人员；<br/>普通版：只返回信息比对核验失败，不会返回具体的不匹配信息。 |
| | | psnEditableFields | | list | 否 | body | 设置页面中可编辑的个人信息字段，<font style="color:rgb(64, 64, 64);">不传此参数，页面默认不允许编辑个人信息。</font><br/>+ **name **- 个人姓名<br/>+ **IDCardNum **- 个人证件号<br/>+ **mobile **- 个人手机号（仅针对实名认证手机号）<br/>+ **bankCardNum **- 个人银行卡号 |
| **authorizeConfig**<font style="color:rgb(232, 50, 60);background-color:rgb(245, 245, 245);">（点击“+”展开详情）</font> | | | | **object** | **否** | **body** | **机构授权配置项**<br/>+ <font style="color:#E8323C;">不传此参数默认页面仅实名认证，不需要用户授权；</font><br/>+ <font style="color:#E8323C;">实名认证模式下，如用户之前已实名，接口报错："企业用户已实名"；授权认证模式下，如用户之前已实名，正常获取授权链接，需要经办人做个人认证，然后直接授权通过或向企业管理员发起授权审批。</font> |
| | authorizedScopes | | | list<br/><br/> | 否<br/><br/> | body<br/><br/> | 设置页面中权限范围，参数值如下： |
| | | | | <font style="color:#E8323C;">授权当前应用AppId获取用户的账号基本信息：</font><br/>+ **get_org_identity_info - **授权允许获取企业/组织的基本信息（国家信息公示网查不到的法定代表人证件号、对公打款等信息需要授权后才可返回）<br/>+ **get_psn_identity_info - **授权允许获取经办人个人用户的账号信息（姓名、手机号/邮箱、证件号等）<br/>**<font style="color:#DF2A3F;">（自2024年9月12日起，仅e签宝高级版或生态伙伴版本支持指定）</font>** | | |
| | | | | <font style="color:#E8323C;">授权当前应用AppId代用户发起合同签署：</font><br/>+ **org_initiate_sign** **- **授权允许代表企业/组织用户发起合同签署以及查询合同签署详情<br/>+ **psn_initiate_sign - **授权允许代表经办人个人用户发起合同签署以及查询合同签署详情<br/>**<font style="color:#DF2A3F;">（自2024年9月12日起，仅e签宝生态伙伴版本支持指定）</font>** | | |
| | | | | <font style="color:#E8323C;">授权当前应用AppId获取用户资源管理权限：</font><br/>+ **manage_org_member - **授权允许获取企业/组织用户的组织成员的查询、新增、编辑、删除权限<br/>+ **manage_org_seal - **授权允许获取企业/组织用户的印章的查询、新增、编辑、授权、删除权限<br/>+ **manage_org_template -**授权允许获取企业/组织用户的模板的查询、新增、编辑、复制、删除权限<br/>+ **use_org_template - **授权允许获取企业/组织用户的模板的使用权限<br/>+ **manage_org_resource** - 授权允许获取企业/组织用户的印章、组织成员等资源的管理权限（不包含用印权限）<br/>+ **manage_psn_resource** **- **授权允许获取经办人个人用户的印章等资源的管理权限<br/>**<font style="color:#DF2A3F;">（自2024年9月12日起，仅e签宝高级版或生态伙伴版本支持指定）</font>** | | |
| | | | | <font style="color:#E8323C;">授权当前应用AppId存储用户的合同文件：</font><br/>+ **psn_sign_file_storage **- 授权允许经办人个人合同文件存储到平台应用的本地服务器<br/>+ **org_sign_file_storage **- 授权允许企业/组织合同文件存储到平台应用的本地服务器<br/>**<font style="color:#E8323C;">（用于平台专属云项目代客户发起合同签署场景）</font>** | | |
| | | | | <font style="color:#E8323C;">授权当前应用AppId获取用户的用印审批信息：</font><br/>+ **org_approval_info - **授权允许获取企业/组织用户的用印审批信息<br/>**<font style="color:#DF2A3F;">（自2024年9月12日起，仅e签宝高级版或生态伙伴版本支持指定）</font>** | | |
| | | | | <font style="color:#E8323C;">授权当前应用AppId获取用户订单使用权限：</font><br/>+ **use_org_order** **- **授权允许获取企业/组织用户套餐订单的使用权限<br/>**<font style="color:#DF2A3F;">（自2024年9月12日起，仅e签宝生态伙伴版本支持指定）</font>** | | |
| | | | | <font style="color:#E8323C;">授权当前应用AppId代表用户申请出证：</font><br/>+ **apply_org_evidence** - 授权允许代表企业/组织用户申请出证<br/>+ **apply_psn_evidence** -  授权允许代表经办人个人用户申请出证<br/>**<font style="color:#DF2A3F;">（于2025年9月22日新增，仅e签宝高级版或生态伙伴版本支持指定）</font>** | | |
| | | | | <font style="color:#E8323C;">授权当前应用AppId获取企业在e签宝官网功能权益的查询权限：</font><br/>+ **org_function_benefits - **授权允许查询企业在e签宝官网功能权益   **<font style="color:#DF2A3F;">（于2025年9月22日新增，仅e签宝高级版或生态伙伴版本支持指定）</font>** | | |
| | | | | <font style="color:#E8323C;">授权当前应用AppId获取用户的合同管理权限</font><br/>+ **manage_org_contract** - 授权允许获取企业/组织用户的合同的管理权限<br/>**<font style="color:#DF2A3F;">（于2026年1月22日新增，仅e签宝高级版或生态伙伴版本支持指定）</font>** | | |
| **redirectConfig**<font style="color:rgb(232, 50, 60);background-color:rgb(245, 245, 245);">（点击“+”展开详情）</font> | | | | **object** | **否** | **body** | **认证完成重定向配置项** |
| | redirectUrl | | | string | 否 | body | 认证完成后跳转页面（除app和小程序端集成外，地址需符合 https /http 协议地址）<br/><font style="color:#E8323C;">【注】贵司的重定向域名需要在e签宝提前放行，否则会报错：“您即将访问的页面可能有安全风险”。（</font>[点击跳转 重定向域名配置说明](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/umo8rop7dmttkdnv)<font style="color:#DF2A3F;">）</font> |
| | redirectDelayTime | | | string | 否 | body | <font style="color:rgb(64, 64, 64);">重定向跳转延迟时间，单位为秒。</font><br/><font style="color:rgb(64, 64, 64);">授权模式下（</font>authorizedScopes有具体的参数值<font style="color:rgb(64, 64, 64);">）：默认延迟时间为 </font>**<font style="color:rgb(64, 64, 64);">3</font>**<font style="color:rgb(64, 64, 64);">秒。</font><br/>+ <font style="color:rgb(64, 64, 64);">传 </font>**<font style="color:rgb(64, 64, 64);">0</font>**<font style="color:rgb(64, 64, 64);"> - 不展示授权结果页（或结果页一闪而过），授权完成直接跳转重定向地址</font><br/>+ <font style="color:rgb(64, 64, 64);">传 其他数字 - 展示授权结果页，倒计时 </font>**<font style="color:rgb(64, 64, 64);">x</font>**<font style="color:rgb(64, 64, 64);">秒后，自动跳转重定向地址</font><br/>实名模式下<font style="color:rgb(64, 64, 64);">（</font>authorizedScopes不传或者没有具体的参数值<font style="color:rgb(64, 64, 64);">）：默认延迟时间为 </font>**<font style="color:rgb(64, 64, 64);">5</font>**<font style="color:rgb(64, 64, 64);">秒。</font><br/>+ <font style="color:rgb(64, 64, 64);">传 </font>**<font style="color:rgb(64, 64, 64);">0</font>**<font style="color:rgb(64, 64, 64);"> - 不展示实名结果页，认证完成直接跳转重定向地址</font><br/>+ <font style="color:rgb(64, 64, 64);">传 其他数字 - 展示实名结果页，倒计时</font>**<font style="color:rgb(64, 64, 64);">5</font>**<font style="color:rgb(64, 64, 64);">秒后，自动跳转重定向地址（只有</font>**<font style="color:rgb(64, 64, 64);">5</font>**<font style="color:rgb(64, 64, 64);">秒，没有其他秒数的控制）</font><br/>**<font style="color:rgb(232, 50, 60);">【注】</font>**<font style="color:rgb(64, 64, 64);">当redirectUrl不传的情况下，该字段无需传入，认证完成结果页不跳转。</font> |
| transactorUseSeal | | | | boolean | 否 | body | 当前经办人非企业管理员的情况下，是否需要为其获取企业全部印章的用印权限，默认false<br/>true - 需要<br/>false - 不需要<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 只在配置了authorizeConfig的授权模式下生效，纯实名模式不生效<br/>+ 第一次为企业做实名的经办人会变成企业管理员，则不需要再额外获取用印权限 |
| clientType | | | | string | 否 | body | 指定客户端类型，默认值 ALL<font style="color:#E8323C;">（注意参数值全部为英文大写）</font><br/>+ **ALL** - 自动适配移动端或PC端<br/>+ **H5** - 移动端适配<br/>+ **PC** - PC端适配 |
| notifyUrl | | | | string | 否 | body | 接收回调通知的Web地址（需符合 https /http 协议），通知开发者用户认证和授权的完成情况，[点击](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/naksvv)详见通知说明。 |
| appScheme | | | | string | 否 | body | AppScheme，用于支付宝人脸认证重定向时唤起指定App。<br/>示例值：<font style="color:rgb(64, 64, 64);">esign://demo/realBack</font><br/>**（**[**点击了解  APP内嵌签署/认证H5对接说明**](https://qianxiaoxia.yuque.com/opendoc/case3/ovb0e40do4fnrr61)**）** |
| orgIdentityVerify | | | | boolean | 否 | body | 企业身份信息校验配置项（以开发者当前传入的企业证件号为唯一标识去校验当前企业名称与在e签宝已有的企业名称不一致时，该如何处理），默认：false<br/>true - 接口报错，不能发起（提示：传入的企业信息与e签宝已有信息不一致）<br/>false - 不报错，正常发起（用户登录进入页面后需按照当前传入信息重新企业实名认证，<font style="color:#DF2A3F;">适用于企业更名场景</font>）<br/><font style="color:#E8323C;">【注】该参数仅限当前企业用户已在e签宝实名注册过的场景才有校验</font> |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | <font style="color:rgb(0, 0, 0);">authUrl</font> | | | | string | 否 | 机构认证授权长链接<font style="color:#E8323C;">（有效期30天）</font><br/><font style="color:#E8323C;">【注】支持自定义域名，微信小程序H5内嵌场景需要使用长链接</font> |
| | authShortUrl | | | | string | 否 | 机构认证授权短链接 <font style="color:#E8323C;">（有效期30天）</font> |
| | <font style="color:rgb(0, 0, 0);">authFlowId</font> | | | | string | 否 | <font style="color:rgb(0, 0, 0);">本次认证授权流程ID</font><font style="color:#E8323C;">（开发者请注意保管流程ID，可用于</font>[【查询认证授权流程详情】](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/hlrs7s)<font style="color:#E8323C;">）</font> |


### 请求示例
```json
{
    "orgAuthConfig": {
        "orgName": "******公司",
        "orgInfo": {
            "orgIDCardNum": "9133010****8110212",
            "orgIDCardType": "CRED_ORG_USCC",
            "legalRepName": "这里是法定代表人的姓名",
            "legalRepIDCardNum": "110101********1001",
            "legalRepIDCardType": "CRED_PSN_CH_IDCARD"
        },
        "orgAuthPageConfig": {
            "orgDefaultAuthMode": "ORG_BANK_TRANSFER",
            "orgAvailableAuthModes": [
                "ORG_BANK_TRANSFER",
                "ORG_LEGALREP_INVOLVED"
            ],
            "orgEditableFields": [
                "orgNum"
            ]
        },
        "transactorInfo": {
            "psnAccount": "153****0000",
            "psnInfo": {
                "psnName": "这里是经办人的姓名",
                "psnIDCardNum": "110102*****0000",
                "psnIDCardType": "CRED_PSN_CH_IDCARD",
                "psnMobile": "151****0050"
            }
        }
    },
    "authorizeConfig": {
        "authorizedScopes": [
            "get_org_identity_info",
            "get_psn_identity_info"
        ]
    },
    "redirectConfig": {
        "redirectUrl": "https://www.xxx.cn/"
    },
    "clientType": "ALL",
    "notifyUrl": "http://******/notify"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "authFlowId": "OF-1f7f8***8004f",
        "authUrl": "https://openapi.esign.cn/auth/h5/index?authFlowId=OF-xxx&clientType=ALL&appId=xxx",
        "authShortUrl": "https://openapi.esign.cn/nB2cAf4***4cTRJn"
    }
}
```

**<font style="color:rgb(64, 64, 64);">错误码</font>**  
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/agi7xuv4yrw1i8f3)

