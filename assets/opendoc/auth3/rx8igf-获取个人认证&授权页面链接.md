:::warning
**<font style="color:#DF2A3F;">重要提示：自2024年9月12日起，认证授权涉及权限范围（authorizedScopes）部分功能需要购买e签宝高级版或生态伙伴版本方可支持！</font>**

:::

### 接口描述
<font style="color:rgb(38, 38, 38);">用于获取个人的认证授权页面链接，通过此链接个人用户可进行个人</font><font style="color:#E8323C;">实名认证</font><font style="color:rgb(38, 38, 38);">、</font><font style="color:#E8323C;">资源授权</font><font style="color:rgb(38, 38, 38);">等操作。</font>

[点击这里](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/lmfokx)了解更多关于“用户授权与实名认证”场景介绍。

:::info
+ 调用本API接口前，开发者可通过[【查询个人认证信息】](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/vssvtu)根据手机号（邮箱）或证件号来查询个人用户是否已实名，已实名用户无需重复实名；
+ 开发者可接收[实名认证通过](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/tme3qi)的回调通知，来获取个人实名认证通过的结果，并保管个人用户的`psnId`；
+ 开发者可接收[授权完成通知](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/demod3)的回调通知，来获取本次授权的有效期限等相关信息；
+ 本次流程中认证授权操作的更多详情参考API接口：[【查询认证授权流程详情】](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/hlrs7s)。

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/psn-auth-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称****<font style="color:#E8323C;"></font>** | | | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;"></font>** |
| --- | --- | --- | --- | :---: | :---: | --- |
| **psnAuthConfig**<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | object | 是 | body | **个人实名认证配置项**<br/>+ <font style="color:#E8323C;">传入个人账号信息后获取对应个人用户的授权认证或者实名认证页面链接；</font><br/>+ <font style="color:#E8323C;">如果不传个人的账号信息</font><font style="color:#DF2A3F;">（psnAccount/psnId）</font><font style="color:#E8323C;">，则需要个人用户自主在页面填写手机号/邮箱进行验证码回填注册；</font> |
| | psnAccount | | string | 否 | body | 个人用户账号标识（手机号或邮箱）<br/>**<font style="color:#DF2A3F;">【注】</font>**<font style="color:#DF2A3F;">psnAccount与psnId二选一传值即可，未知用户psnId时，直接传此字段</font> |
| | psnId | | string | 否 | body |  个人账号ID<br/>**<font style="color:#DF2A3F;">【注】</font>**<font style="color:#DF2A3F;">psnAccount与psnId二选一传值即可</font> |
| | psnInfo**<font style="color:#E8323C;"></font>** | | object | 否 | body | 个人身份附加信息   |
| | | psnName | string | 否 | body | 姓名 |
| | | psnIDCardNum | string | 否 | body | 证件号码 |
| | | psnIDCardType | string | 否 | body | 证件类型，可选值如下：<br/>**CRED_PSN_CH_IDCARD** - 中国大陆居民身份证<br/>**CRED_PSN_CH_HONGKONG **- 香港来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_MACAO** - 澳门来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_TWCARD** - 台湾来往大陆通行证（台胞证）<br/>**CRED_PSN_PASSPORT** - 护照<br/><font style="color:#DF2A3F;">【注】</font>**<font style="color:#DF2A3F;">CRED_PSN_CH_IDCARD</font>**<font style="color:#DF2A3F;"> 类型同时兼容港澳台居住证（81、82、83开头18位证件号）、外国人永久居住证（9开头18位证件号）</font> |
| | | psnMobile | string | 否 | body | 个人手机号（运营商实名登记手机号或银行卡预留手机号，仅用于认证） |
| | | bankCardNum | string | 否 | body | 个人银行卡号 |
| | | psnIdentityVerify | boolean | 否 | body | 是否校验：psnAccount（个人用户账号标识）或 psnId（个人账号ID）绑定的e签宝个人信息与传入的psnInfo（个人身份信息）中的信息一致<br/>**true** - 校验<br/>**false** - 不校验<font style="color:#F5222D;">（默认值）</font><br/>**<font style="color:rgb(232, 50, 60);">【注】</font>**若传true，则校验信息是否一致。若信息一致或用户未在e签宝注册认证过则正常发起，若信息不一致则报错：“传入的%s和该用户在e签宝的个人信息不一致” ，其中%s可能为多个字段，包含：姓名、证件号、实名手机号、银行卡号 |
| | psnAuthPageConfig**<font style="color:#E8323C;"></font>** | | object | 否 | body | 个人实名认证页面配置项 |
| | | psnDefaultAuthMode | string | 否 | body | 设置页面中默认选择的实名认证方式，可选值如下：<br/>**PSN_FACE **- 人脸识别认证<font style="color:#F5222D;">（默认值）</font><br/>**PSN_MOBILE3 **- 手机运营商三要素认证<br/>**PSN_BANKCARD4 **- 银行卡四要素认证<br/><font style="color:#E8323C;">【注】使用iframe内嵌集成不支持对接刷脸方式</font> |
| | | psnAvailableAuthModes | list | 否 | body | 设置页面中可选择的个人认证方式范围，若不传此参数，则可选择全部认证方式。<br/>+ **PSN_FACE **- 人脸识别认证<br/>+ **PSN_MOBILE3 **- 手机运营商三要素认证<br/>+ **PSN_BANKCARD4 **- 银行卡四要素认证<br/><font style="color:#E8323C;">【注】使用iframe内嵌集成不支持对接刷脸方式</font> |
| | | advancedVersion    | list | 否 | body | 通过银行卡认证或运营商认证方式时，是否使用详情版（如指定则核验失败可返回具体不匹配信息），传空默认为普通版。<br/>+ **PSN_MOBILE3 **- 手机运营商三要素认证<br/>+ **PSN_BANKCARD4 **- 银行卡四要素认证<br/>**<font style="color:rgb(232, 50, 60);">【注】</font>**详情版：针对个人认证失败可以返回具体的不匹配信息，需要单独购买，具体购买方式请咨询e签宝商务人员；<br/>普通版：只返回信息比对核验失败，不会返回具体的不匹配信息。 |
| | | psnEditableFields | list | 否 | body | 设置页面中可编辑的个人信息字段，不传此参数，页面默认不允许编辑个人信息。<br/>+ **name **- 姓名<br/>+ **IDCardNum **- 证件号码（如果账号已实名，传了该字段，页面也是不可编辑更改的，因为证件号是唯一标识）<br/>+ **mobile **- 个人手机号（仅针对实名认证手机号）<br/>+ **bankCardNum **- 个人银行卡号 |
| **authorizeConfig**<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | object | 否 | body | **个人授权配置项**<br/>+ <font style="color:#E8323C;">不传此参数默认页面仅实名认证，不需要用户授权；</font><br/>+ <font style="color:#E8323C;">实名认证模式下，如用户之前已实名，接口报错："个人用户已实名"；授权认证模式下，如用户之前已实名，正常获取授权链接，需要用户获取验证码进入页面后，直接授权成功。</font> |
| | authorizedScopes | | list | 否 | body | 设置页面中权限范围，参数值如下： |
| | | | <font style="color:#E8323C;">授权当前应用AppId获取用户的账号基本信息：</font><br/>+ **get_psn_identity_info - **授权允许获取个人用户的账号信息（姓名、手机号/邮箱、证件号等）<br/>**<font style="color:#DF2A3F;">（自2024年9月12日起，仅e签宝高级版或生态伙伴版本支持指定）</font>** | | | |
| | | | <font style="color:#E8323C;">授权当前应用AppId代用户发起合同签署：</font><br/>+ **psn_initiate_sign - **授权允许代表个人用户发起合同签署以及查询合同签署详情<br/>**<font style="color:#DF2A3F;">（自2024年9月12日起，仅e签宝生态伙伴版本支持指定）</font>** | | | |
| | | | <font style="color:#E8323C;">授权当前应用AppId获取用户资源管理权限：</font><br/>+ **manage_psn_resource** - 授权允许获取个人用户的印章等资源的管理权限<br/>**<font style="color:#DF2A3F;">（自2024年9月12日起，仅e签宝高级版或生态伙伴版本支持指定）</font>** | | | |
| | | | <font style="color:#E8323C;">授权当前应用AppId存储用户的合同文件：</font><br/>+ **psn_sign_file_storage **- 授权允许个人合同文件存储到平台应用的本地服务器<br/><font style="color:#E8323C;">（用于平台专属云项目代客户发起合同签署场景）</font> | | | |
| | | | <font style="color:#E8323C;">授权当前应用AppId代表用户申请出证：</font><br/>+ **apply_psn_evidence** -  授权允许代表个人用户申请出证<br/>**<font style="color:#DF2A3F;">（于2025年9月22日新增，仅e签宝高级版或生态伙伴版本支持指定）</font>** | | | |
| **redirectConfig**<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | object | 否 | body | **认证完成重定向配置项** |
|  | redirectUrl | | string | 否 | body | 认证完成后跳转页面（除app和小程序端集成外，地址需符合 https /http 协议地址）<br/><font style="color:#E8323C;">【注】贵司的重定向域名需要在e签宝提前放行，否则会报错：“您即将访问的页面可能有安全风险”。（</font>[点击跳转 重定向域名配置说明](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/umo8rop7dmttkdnv)<font style="color:#DF2A3F;">）</font> |
| | redirectDelayTime | | string | 否 | body | <font style="color:rgb(64, 64, 64);">重定向跳转延迟时间，单位为秒。</font><br/><font style="color:rgb(64, 64, 64);">授权模式下（</font>authorizedScopes有具体的参数值<font style="color:rgb(64, 64, 64);">）：默认延迟时间为 </font>**<font style="color:rgb(64, 64, 64);">3</font>**<font style="color:rgb(64, 64, 64);">秒。</font><br/>+ <font style="color:rgb(64, 64, 64);">传 </font>**<font style="color:rgb(64, 64, 64);">0</font>**<font style="color:rgb(64, 64, 64);"> - 不展示授权结果页（或结果页一闪而过），授权完成直接跳转重定向地址</font><br/>+ <font style="color:rgb(64, 64, 64);">传 其他数字 - 展示授权结果页，倒计时 </font>**<font style="color:rgb(64, 64, 64);">x</font>**<font style="color:rgb(64, 64, 64);">秒后，自动跳转重定向地址</font><br/>实名模式下<font style="color:rgb(64, 64, 64);">（</font>authorizedScopes不传或者没有具体的参数值<font style="color:rgb(64, 64, 64);">）：默认延迟时间为 </font>**<font style="color:rgb(64, 64, 64);">5</font>**<font style="color:rgb(64, 64, 64);">秒。</font><br/>+ <font style="color:rgb(64, 64, 64);">传 </font>**<font style="color:rgb(64, 64, 64);">0</font>**<font style="color:rgb(64, 64, 64);"> - 不展示实名结果页，认证完成直接跳转重定向地址</font><br/>+ <font style="color:rgb(64, 64, 64);">传 其他数字 - 展示实名结果页，倒计时</font>**<font style="color:rgb(64, 64, 64);">5</font>**<font style="color:rgb(64, 64, 64);">秒后，自动跳转重定向地址（只有</font>**<font style="color:rgb(64, 64, 64);">5</font>**<font style="color:rgb(64, 64, 64);">秒，没有其他秒数的控制）</font><br/>**<font style="color:rgb(232, 50, 60);">【注】</font>**<font style="color:rgb(64, 64, 64);">当redirectUrl不传的情况下，该字段无需传入，认证完成结果页不跳转。</font> |
| notifyUrl | | | string | 否 | body | 接收回调通知的Web地址，通知开发者用户认证和授权的完成以及变更情况，<br/>[点此](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/naksvv)了解更多认证授权回调通知。 |
| clientType | | | string | 否 | body | 指定客户端类型，默认值 ALL<font style="color:#E8323C;">（注意参数值全部为英文大写）</font><br/>**ALL** - 自动适配移动端或PC端<br/>**H5**  - 移动端适配<br/>**PC ** - PC端适配 |
| appScheme | | | string | 否 | body | AppScheme，主要用于支付宝人脸认证重定向时跳回开发者自身App。<br/>示例值：<font style="color:rgb(64, 64, 64);">esign://demo/realBack</font><br/>**（**[**点击了解  APP内嵌签署/认证H5对接说明**](https://qianxiaoxia.yuque.com/opendoc/case3/ovb0e40do4fnrr61)**）** |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | authUrl | | | | string | 否 | 个人认证授权长链接<font style="color:#E8323C;">（有效期30天）</font><br/><font style="color:#E8323C;">【注】支持自定义域名，微信小程序H5内嵌场景需要使用长链接</font> |
| | authShortUrl | | | | string | 否 | 个人认证授权短链接 <font style="color:#E8323C;">（有效期30天）</font> |
| | authFlowId | | | | string | 否 | 本次认证授权流程ID<font style="color:#E8323C;">（请注意保管流程ID，可用于</font>[【查询认证授权流程详情】](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/hlrs7s)<font style="color:#E8323C;">）</font> |


### 请求示例
```json
{
  "psnAuthConfig": {
    "psnAccount": "183****0101",
    "psnInfo": {
      "psnName": "赵四",
      "psnIDCardNum": "130204********1001",
      "psnIDCardType": "CRED_PSN_CH_IDCARD"
    },
    "psnAuthPageConfig": {
      "psnDefaultAuthMode": "PSN_MOBILE3",
      "psnAvailableAuthModes": ["PSN_BANKCARD4","PSN_MOBILE3","PSN_FACE"]
    }
  },
  "authorizeConfig": {
    "authorizedScopes": ["get_psn_identity_info"]
  },
  "notifyUrl": "http://xx.xx.xx.172:8081/CSTNotify/asyn/notify",
  "clientType": "ALL",
  "redirectConfig": {
    "redirectUrl": "https://www.xxx.cn/"
  }
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "authFlowId": "OF-203***e080010",
        "authUrl": "https://openapi.esign.cn/auth/h5/index?authFlowId=OF-xxx&clientType=ALL&appId=xxx",
        "authShortUrl": "https://openapi.esign.cn/mFHR***hUV46"
    }
}
```

**<font style="color:rgb(64, 64, 64);">错误码</font>**  
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/agi7xuv4yrw1i8f3)

