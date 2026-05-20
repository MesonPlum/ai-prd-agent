### 2025年9月
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2025年9月22日</font> | `**<font style="color:#E8323C;">新增</font>**`[【获取机构认证&授权页面链接】](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)新增参数枚举值 | **新增请求参数枚举：**<br/>+ **org_function_benefits - **授权允许查询企业在e签宝官网功能权益<br/>+ **apply_org_evidence** - 授权允许代表企业/组织用户申请出证<br/>+ **apply_psn_evidence** -  授权允许代表经办人个人用户申请出证 |
| <font style="color:#389E0D;">2025年9月22日</font> | `**<font style="color:#E8323C;">新增</font>**`[【获取个人认证&授权页面链接】](https://qianxiaoxia.yuque.com/opendoc/auth3/rx8igf)新增参数枚举值 | **新增请求参数枚举：**<br/>+ **apply_psn_evidence** -  授权允许代表个人用户申请出证 |


### 2025年4月
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2025年4月23日</font> | `**<font style="color:#E8323C;">新增</font>**`[【查询认证授权流程详情】](https://qianxiaoxia.yuque.com/opendoc/auth3/hlrs7s)接口新增响应参数 | **新增响应参数：**<br/>+ **realNameOrWillingnessFlowId - **认证流程ID（e签宝其他业务串联使用，常规场景不需要） |
| <font style="color:#389E0D;">2025年4月18日</font> | `**<font style="color:#E8323C;">新增</font>**`[【获取机构认证&授权页面链接】](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)接口新增请求参数 | **新增请求参数：**<br/>+ **orgIdentityVerify - **企业身份信息校验配置项 |


### 2025年1月
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2025年1月13日</font> | `**<font style="color:#E8323C;">新增</font>**`[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口新增响应参数 | **新增响应参数：**<br/>+ **orgAuthMode** - 机构实名认证完成时使用的认证方式（如果多次认证则取最近一次认证）<br/>+ **corporateAccount** - 机构对公账户名称<br/>+ **orgBankAccountNum** - 机构对公打款银行卡号信息<br/>+ **cnapsCode** - 机构对公打款银行联行号（开户行银行支行）<br/>+ **authorizationDownloadUrl** - 机构对公打款单位实名认证授权委托书文件下载地址<br/>+ **licenseDownloadUrl** - 机构营业执照照片文件下载地址（需要开启页面OCR营业执照上传功能才能返回） |


### 2024年9月
:::warning
**<font style="color:#DF2A3F;">重要提示：自2024年9月12日起，认证授权涉及权限范围（authorizedScopes）部分功能需要购买e签宝高级版或生态合作版本方可支持！</font>**

:::

| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2024年9月27日</font> | `**<font style="color:#E8323C;">修改</font>**`[【获取机构认证&授权页面链接】](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)、[【获取个人认证&授权页面链接】](https://qianxiaoxia.yuque.com/opendoc/auth3/rx8igf) | **去掉认证授权有效期默认365天的相关描述**<br/>+ 从2024年9月28日开始不再限制认证授权有效期为365天（变更为99年） |
| <font style="color:#389E0D;">2024年9月20日</font> | `**<font style="color:#E8323C;">新增</font>**`[【获取机构认证&授权页面链接】](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)新增参数枚举值 | **新增请求参数枚举：**<br/>+ **authorizedScopes（**设置页面中权限范围）<font style="color:#DF2A3F;">新增枚举</font>：<br/>**manage_org_member **（授权允许获取企业/组织用户的组织成员的查询、新增、编辑、删除权限）、<br/>**manage_org_seal**（授权允许获取企业/组织用户的印章的查询、新增、编辑、授权、删除权限）、<br/>**manage_org_template**（授权允许获取企业/组织用户的模板的查询、新增、编辑、复制、删除权限）、<br/>**use_org_template**（ 授权允许获取企业/组织用户的模板的使用权限）<br/>**<font style="color:#DF2A3F;">（仅e签宝高级版或生态伙伴版本支持指定）</font>** |
| <font style="color:#389E0D;">2024年9月6日</font> | `**<font style="color:#E8323C;">修改</font>**`[【获取机构认证&授权页面链接】](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)、[【获取个人认证&授权页面链接】](https://qianxiaoxia.yuque.com/opendoc/auth3/rx8igf) | **修改请求参数枚举描述：**<br/>+ **authorizedScopes（**设置页面中权限范围）修改枚举描述：<br/>**1、get_org_identity_info（**授权允许获取企业/组织的基本信息（企业名称、统一社会信用代码等））**、**<br/>**get_psn_identity_info（**授权允许获取经办人/个人用户的账号信息（姓名、手机号/邮箱、证件号等））**、**<br/>**manage_org_resource（**授权允许获取企业/组织用户的印章、组织成员等资源的管理权限（不包含用印权限）**）、**<br/>**manage_psn_resource（**授权允许获取经办人/个人用户的印章等资源的管理权限**）、**<br/>**org_approval_info（**授权允许获取企业/组织用户的用印审批信息**）**<br/>**<font style="color:#DF2A3F;">（自2024年9月12日起，仅e签宝高级版或生态伙伴版本支持指定）</font>**<br/>**2、org_initiate_sign（**授权允许代表企业/组织用户发起合同签署以及查询合同签署详情**）、**<br/>**psn_initiate_sign（ **授权允许代表经办人/个人用户发起合同签署以及查询合同签署详情**）、**<br/>**use_org_order（**授权允许获取企业/组织用户套餐订单的使用权限**）**<br/>**<font style="color:#DF2A3F;">（自2024年9月12日起，仅e签宝生态伙伴版本支持指定）</font>** |


### 2024年3月
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2024年3月28日</font> | `**<font style="color:#E8323C;">新增</font>**`[【获取机构认证&授权页面链接】](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)接口新增请求入参枚举值 | **新增请求参数枚举：**<br/>+ **authorizedScopes（**设置页面中权限范围）新增枚举：<br/>**psn_sign_file_storage **- 授权个人合同文件存储到平台应用的本地服务器<br/>**org_sign_file_storage **- 授权企业/组织合同文件存储到平台应用的本地服务器 |
| <font style="color:#389E0D;">2024年3月28日</font> | `**<font style="color:#E8323C;">新增</font>**`[【获取个人认证&授权页面链接】](https://qianxiaoxia.yuque.com/opendoc/auth3/rx8igf)接口新增请求入参枚举值 | **新增请求参数枚举：**<br/>+ **authorizedScopes（**设置页面中权限范围）新增枚举：**psn_sign_file_storage **- 授权个人合同文件存储到平台应用的本地服务器 |




### 2024年2月
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2024年2月1日</font> | `**<font style="color:#E8323C;">新增</font>**`[【获取机构认证&授权页面链接】](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)接口新增请求入参枚举值 | **新增请求参数枚举：**<br/>+ **authorizedScopes（**设置页面中权限范围）新增枚举：**org_approval_info - **授权允许获取企业/组织用户的用印审批信息 |


### 2023年12月****
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2023年12月8日</font> | `**<font style="color:#E8323C;">新增</font>**`[【获取机构认证&授权页面链接】](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)接口新增请求入参 | **新增请求参数：**<br/>+ **orgBankAccountNum - **企业对公打款银行账户<br/>+ **orgEditableFields**（设置页面中可编辑的信息） 中新增枚举：**orgBankAccountNum** - 企业对公打款银行账户 |


### 2023年10月
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2023年10月13日</font> | `**<font style="color:#E8323C;">新增</font>**`[【获取机构认证&授权页面链接】](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)接口新增请求入参 | **新增请求参数：**<br/>+ **transactorUseSeal - **经办人若未成为管理员，是否需要获取用印权限，默认false<br/>true-需要；false-不需要 |
| <font style="color:#389E0D;">2023年10月11日</font> | `**<font style="color:#E8323C;">新增</font>**`[【查询认证授权流程详情】](https://qianxiaoxia.yuque.com/opendoc/auth3/hlrs7s)接口新增响应参数 | **新增响应参数：**<br/>+ **idCardFront - **刷脸认证时上传的身份证正面照片（base64编码照片图片数据）<br/>+ **idCardBack** ** - **刷脸认证时上传的身份证反面照片（base64编码照片图片数据） |


### 2023年8月
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2023年8月8日</font> | `**<font style="color:#E8323C;">新增</font>**`[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口新增响应参数 | **新增响应参数：**<br/>**adminAccount** - 机构管理员联系方式 |


### 2023年5月
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | --- |
| <font style="color:#389E0D;">2023年5月30日</font> | `**<font style="color:#E8323C;">新增</font>**`[【获取个人认证&授权页面链接】](https://qianxiaoxia.yuque.com/opendoc/auth3/rx8igf)和[【获取机构认证&授权页面链接】](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/kcbdu7)接口新增校验信息参数 | **新增请求参数：**<br/>**psnIdentityVerify - **是否校验：psnAccount或 psnId 绑定的e签宝个人信息与传入的 psnInfo 中的信息一致<br/>+ **true** - 校验<br/>+ **false** - 不校验<font style="color:#F5222D;">（默认值）</font> |
| <font style="color:#389E0D;">2023年5月10日</font> | `**<font style="color:#E8323C;">变更</font>**`[【获取个人认证&授权页面链接】](https://qianxiaoxia.yuque.com/opendoc/auth3/rx8igf)和[【获取机构认证&授权页面链接】](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/kcbdu7)接口获取的授权链接的授权有效期变更 | 自**2023年5月10日**起新发起的授权链接，授权有效期由原本的默认**180**天变更为**365**天（在2023年5月10日之前发起的授权链接，授权有效期仍然为180天）。 |
| <font style="color:#389E0D;">2023年5月10日</font> | `**<font style="color:#E8323C;">变更</font>**`[【获取个人认证&授权页面链接】](https://qianxiaoxia.yuque.com/opendoc/auth3/rx8igf)接口个人账号信息传入逻辑更新 | **逻辑优化：**<br/>psnId和psnAccount不需要二选一传入了。可以两者都不传任何信息，让用户自主在页面填写手机号/邮箱，获取验证码注册进入。 |
| <font style="color:#389E0D;">2023年5月10日</font> | `**<font style="color:#E8323C;">变更</font>**`[【获取机构认证&授权页面链接】](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/kcbdu7)接口经办人账号信息传入逻辑更新 | **逻辑优化：**<br/>+ transactorInfo从必传改为非必传对象。<br/>+ psnId和psnAccount不需要二选一传入了。可以两者都不传任何信息，让用户自主在页面填写手机号/邮箱，获取验证码注册进入。 |
| <font style="color:#389E0D;">2023年5月10日</font> | `**<font style="color:#E8323C;">新增</font>**`[【获取个人认证&授权页面链接】](https://qianxiaoxia.yuque.com/opendoc/auth3/rx8igf)接口新增请求参数 | **新增请求参数：**<br/>**advancedVersion - **通过银行卡认证或运营商认证方式时，是否使用详情版 |
| <font style="color:#389E0D;">2023年5月10日</font> | `**<font style="color:#E8323C;">新增</font>**`[【获取机构认证&授权页面链接】](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/kcbdu7)接口新增请求参数 | **新增请求参数：**<br/>**advancedVersion - **通过银行卡认证或运营商认证方式时，是否使用详情版 |
| <font style="color:#389E0D;">2023年5月10日</font> | `**<font style="color:#E8323C;">新增</font>**`[【查询认证授权流程详情】](https://qianxiaoxia.yuque.com/opendoc/auth3/hlrs7s)接口新增响应参数 | **新增响应参数：**<br/>**authUrl - **认证授权长链接 |


### 2023年4月
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2023年4月14日</font> | `**<font style="color:#E8323C;">新增</font>**`[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口新增响应参数 | **新增响应参数：**<br/>**adminName **- 机构管理员姓名 |


### 2022年11月
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2022年11月24日</font> | `**<font style="color:#E8323C;">变更</font>**`[【获取机构认证&授权页面链接】](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/kcbdu7)接口机构认证方式枚举值变更 | <font style="background-color:#FBE4E7;">机构认证方式相关字段 orgDefaultAuthMode、orgAvailableAuthModes</font><br/>**原枚举值：**<br/>+ **ORG_LEGALREP_AUTHORIZATION **- 授权委托书认证<br/>+ **ORG_LEGALREP **- 法定代表人本人认证<br/>**现将这两个枚举值合并成一个，新枚举值：**<br/>+ **ORG_LEGALREP_INVOLVED - **法定代表人认证/法人授权书认证<font style="background-color:#E7E9E8;"></font> |






