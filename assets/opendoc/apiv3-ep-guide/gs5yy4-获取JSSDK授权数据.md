### 接口描述
基于认证授权为前端 eSignPartner 组件生成授权数据及票据，以便前端组件直接调用公有云 Open API 接口。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://open.esign.cn/doc/opendoc/dev-guide3/el34xh#JsWHg)**<font style="color:rgb(23, 43, 77);">/</font>**ep/jssdk/init-data

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://open.esign.cn/doc/opendoc/dev-guide3/el34xh#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
:::danger
【重要提示】

本接口的调用通常都搭配前端使用，因此可以直接将前端eSignPartner组件所构建的JSON直接作为入参传入此接口，以免造成入参异常。

:::

| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | :---: | :---: | :---: | --- |
| psnAccount | | string | 是 | body | 经办人在e签宝服务的登录账号，手机号或邮箱 |
| orgName | | string | 是 | body | 组织机构名称 |
| authOptions | | object | 否 | body | 可选参数 |
| | redirectUrl | string | 否 | body | 认证授权完成、购买完成、发起签署后的重定向地址 |
| | notifyUrl | string | 否 | body | 认证授权完成的回调地址<font style="color:rgb(64, 64, 64);">（需符合 https /http 协议），通知开发者用户认证和授权的完成情况，</font>[点击](https://open.esign.cn/doc/opendoc/notify3/naksvv)<font style="color:rgb(64, 64, 64);">详见通知说明。</font> |
| | psnName | string | 否 | body | 个人姓名 |
| | psnIDCardType | string | 否 | body | 个人证件类型   【中国大陆居民身份证】   CRED_PSN_CH_IDCARD   【香港来往大陆通行证】   CRED_PSN_CH_HONGKONG   【澳门来往大陆通行证】   CRED_PSN_CH_MACAO   【台湾来往大陆通行证】   CRED_PSN_CH_TWCARD   【护照】   CRED_PSN_PASSPORT |
| | psnIDCardNum | string | 否 | body | 个人证件号 |
| | bankCardNum | string | 否 | body | 个人银行卡号 |
| | psnEditableFields | list | 否 | body | <font style="color:rgb(64, 64, 64);">设置页面中可编辑的个人信息字段，不传此参数，页面默认不允许编辑个人信息。</font><br/>+ **<font style="color:rgb(64, 64, 64);">name</font>****<font style="color:rgb(64, 64, 64);"> </font>**<font style="color:rgb(64, 64, 64);">- 个人姓名</font><br/>+ **<font style="color:rgb(64, 64, 64);">IDCardNum</font>****<font style="color:rgb(64, 64, 64);"> </font>**<font style="color:rgb(64, 64, 64);">- 个人证件号</font><br/>+ **<font style="color:rgb(64, 64, 64);">mobile</font>****<font style="color:rgb(64, 64, 64);"> </font>**<font style="color:rgb(64, 64, 64);">- 个人手机号（仅针对实名认证手机号）</font><br/>+ **<font style="color:rgb(64, 64, 64);">bankCardNum </font>**<font style="color:rgb(64, 64, 64);">- 个人银行卡号</font> |
| | orgIDCardType | string | 否 | body | 组织机构证件类型   【统一社会信用代码】   CRED_ORG_USCC   【工商注册号】   CRED_ORG_REGCODE |
| | orgIDCardNum | string | 否 | body | 组织机构证件号 |
| | orgEditableFields | list | 否 | body | <font style="color:rgb(64, 64, 64);">设置页面中可编辑的信息，不传此参数，页面默认不允许编辑机构信息。</font><br/>+ **<font style="color:rgb(64, 64, 64);">orgName</font>****<font style="color:rgb(64, 64, 64);"> </font>**<font style="color:rgb(64, 64, 64);">- 机构名称</font><br/>+ **<font style="color:rgb(64, 64, 64);">orgType</font>****<font style="color:rgb(64, 64, 64);"> </font>**<font style="color:rgb(64, 64, 64);">- 机构类型</font><br/>+ **<font style="color:rgb(64, 64, 64);">orgNum</font>****<font style="color:rgb(64, 64, 64);"> </font>**<font style="color:rgb(64, 64, 64);">- 机构证件号</font><br/>+ **<font style="color:rgb(64, 64, 64);">legalRepName</font>****<font style="color:rgb(64, 64, 64);"> </font>**<font style="color:rgb(64, 64, 64);">- 法定代表人姓名</font><br/>+ **<font style="color:rgb(64, 64, 64);">legalRepIdNum </font>**<font style="color:rgb(64, 64, 64);">- 法定代表人证件号</font> |
| | legalRepName | string | 否 | body | 法定代表人姓名 |
| | legalRepIDCardType | string | 否 | body | 法定代表人证件类型   【中国大陆居民身份证】   CRED_PSN_CH_IDCARD   【香港来往大陆通行证】   CRED_PSN_CH_HONGKONG   【澳门来往大陆通行证】   CRED_PSN_CH_MACAO   【台湾来往大陆通行证】   CRED_PSN_CH_TWCARD   【护照】   CRED_PSN_PASSPORT |
| | legalRepIDCardNum | string | 否 | body | 法定代表人证件号 |


### 请求示例
```json
{
  "orgName": "某某某科技有限公司",
  "psnAccount": "152XXXX4800",
  "authOptions": {
    "psnName": "某某",
    "orgIDCardNum": "9100000000000014L7",
    "orgIDCardType": "CRED_ORG_USCC",
    "legalRepName": "某某",
    "legalRepIDCardNum": "530323XXXXXXXX1959",
    "legalRepIDCardType": "CRED_PSN_CH_IDCARD",
    "psnIDCardNum": "530323XXXXXXXX1959",
    "psnIDCardType": "CRED_PSN_CH_IDCARD",
    "bankCardNum": "6220000000000000000",
    "notifyUrl": "http://xx.cn/sign/notify",
    "psnEditableFields": [
      "name",
      "IDCardNum",
      "mobile",
      "bankCardNum"
    ],
    "orgEditableFields": [
      "orgName",
      "orgNum",
      "legalRepName",
      "legalRepIdNum"
    ],
    "redirectUrl": "http://xx.cn/index.html"
  }
}
```

### 响应参数
:::danger
【重要提示】

本接口返回的JSON数据请保持结构原封不动的传递回贵司的前端，以免eSignPartner组件解析数据异常。

:::

| **参数名称** | | | | **参数类型** | **必选** | **参数说明****** |
| --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | string | 否 | 业务信息<br/><font style="color:#E8323C;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data | | | | object | 否 | 业务数据 |
| | jsSdkTicket | | | string | 是 | eSignPartner 组件授权票据 |
| | authInfo | | | object | 是 | 授权信息 |
| | | psnId | | string | 是 | 个人账号ID |
| | | psnName | | string | 是 | 个人姓名，当传入个人姓名或者个人已实名时有值 |
| | | psnRealnameStatus | | string | 是 | 个人实名状态<br/>0-未实名<br/>1-已实名 |
| | | isOrgMember | | boolean | 是 | 是否企业成员<br/>true-是 false-否 |
| | | orgId | | string | 是 | 机构账号ID |
| | | orgRealnameStatus | | string | 是 | 企业实名状态<br/>0-未实名<br/>1-已实名 |
| | | authStatus | | string | 是 | 授权状态：<br/>UNAUTH-未授权<br/>AUTHED-已授权<br/>AUTH_EXPIRED-授权失效 |
| | | orgAuthStatus | | string | 是 | 企业授权状态：<br/>UNAUTH-未授权<br/>AUTHED-已授权<br/>AUTH_EXPIRED-授权失效 |
| | | psnAuthStatus | | string | 是 | 个人授权状态：<br/>UNAUTH-未授权<br/>AUTHED-已授权<br/>AUTH_EXPIRED-授权失效 |
| | | authEffectiveTime | | int64 | 是 | 授权生效时间 |
| | | authExpireTime | | int64 | 是 | 授权到期时间 |
| | | authShortUrl | | string | 是 | 用户认证&资源授权页面短链接，链接有效期30天 |
| | appConfigInfo | | | object | 是 | 平台信息 |
| | | sdkAdvertVideoUrl | | string | 否 | 聚合页运营视频链接 |
| | | sdkAdvertPictureInfos | | array | 是 | 运营位固定展示图片信息集合 |
| | | | sdkAdvertPictureUrl | string | 是 | 聚合页运营图片URL链接 |
| | | | sdkAdvertPictureLink | string | 是 | 聚合页运营图片详情链接 |
| | | sdkH5AdvertPictureInfos | | array | 是 | H5运营位固定展示图片信息集合 |
| | | | sdkAdvertPictureUrl | string | 是 | H5聚合页运营图片URL链接 |
| | | | sdkAdvertPictureLink | string | 是 | H5聚合页运营图片详情链接 |
| | | userManualInfo | | object | 是 | 聚合页使用教程信息 |
| | | | iconUrl | string | 是 | 使用教程图标 |
| | | | iconLink | string | 是 | 链接地址 |


### 响应示例
```json
{
    "code":0,
    "message":"成功",
    "data":{
        "jsSdkTicket":"eyJ0eXAiOiJKV1......Y0NzUwMA==",
        "authInfo":{
            "orgId":"9b7fc8777cc741858856d9fdbf76aaa3",
            "psnId":"b1c4b1fb60bc4730a56c3a89fe33490a",
            "psnName":"某某",
            "authShortUrl":"https://xx.tsign.cn/YWgeuq8EdIAY",
            "authStatus":"AUTHED",
            "orgRealnameStatus":1,
            "psnRealnameStatus":1,
            "orgAuthStatus":"AUTHED",
            "psnAuthStatus":"AUTHED",
            "authEffectiveTime":1664441491977,
            "authExpireTime":1667026081993
        },
        "appConfigInfo":{
            "sdkAdvertVideoUrl":"https://xxxx.cn/xxx",
            "sdkAdvertPictureInfos":[
                {
                    "sdkAdvertPictureUrl":"https://trial-cdn.esign.cn/upload/e5d198a7-e419-5cee-b....a.jpg",
                    "sdkAdvertPictureLink":"https://demo.esign.cn/Detailspage.html"
                }
            ],
            "sdkH5AdvertPictureInfos":[
                {
                    "sdkH5AdvertPictureUrl":"https://trial-cdn.esign.cn/upload/e5d198a7-e419-5cee-b....a.jpg ",
                    "sdkH5AdvertPictureLink":"https://demo.esign.cn/Detailspage.html"
                }
            ],
            "userManualInfo":{
                "iconUrl":"https://trial-cdn.esign.cn/upload/e5d198a7-e419-5cee-b....a.jpg ",
                "iconLink":"https://qianxiaoxia.yuque.com/docs/share/2f0eec13-6843-4b03-871d-59cda1948024"
            }
        }
    }
}
```

