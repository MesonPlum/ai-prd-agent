### 接口描述
查询本次认证授权流程的详细信息。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/auth-flow/{authFlowId}

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| authFlowId | string | 是 | path |  认证授权流程ID<br/>通过[【获取个人认证&授权页面链接】](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/rx8igf)或[【获取机构认证&授权页面链接】](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/kcbdu7)接口获取。 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#E8323C;">（请左右滑动查看完整参数说明）</font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
| | authFlowId | | | | string | 否 | 认证授权流程ID |
| | authType | | | | string | 否 | 认证授权主体类型<br/>**ORG **- 机构实名认证，**PSN **- 个人实名认证 |
| | realNameOrWillingness | | | | string | 否 | 流程中使用的认证类型<br/>**realName **- 实名认证<br/>**willingness **- 意愿认证<br/>**none **- 都没使用 |
| | realNameOrWillingnessFlowId | | | | string | 否 | 认证流程ID（e签宝其他业务串联使用，常规场景不需要）   <font style="color:#E8323C;">【注】</font>根据流程中使用的认证类型返回对应的值，如果realNameOrWillingness是none，则该字段返回0。 |
| | realNameStatus | | | | int32 | 否 | 认证流程状态<br/>**0** - 未实名，**1** - 已实名 |
| | authorizedStatus | | | | int32 | 否 | 授权流程状态<br/>**0** - 流程过期失效<br/>**1** - 已授权<br/>**2** - 授权中<br/>**3 **-<font style="color:rgb(255, 0, 0);"> </font>审批未通过 |
| | authUrl | | | | string | 否 | 认证授权长链接 |
| | authInfo<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | | object | 否 | 认证详情 |
| |  | willingnessAuthModes | | | string | 否 | 流程中使用的意愿认证方式<br/>**CODE_SMS** - 短信验证码<br/>**CODE_EMAIL** - 邮箱验证码<br/>**PSN_FACE_ALIPAY** - 支付宝刷脸<br/>**PSN_FACE_TECENT** - 腾讯云刷脸<br/>**PSN_FACE_ESIGN** - 快捷刷脸<br/>**PSN_FACE_WECHAT** - 微信小程序刷脸 |
| | | psnAuthMode | | | string | 否 | 本次流程中使用的个人/经办人认证方式<br/>**PSN_BANKCARD4** - 个人银行卡四要素认证<br/>**PSN_MOBILE3** - 手机运营商三要素认证<br/>**PSN_BANKCARD4_DETAILS** - 个人银行卡四要素认证（详情版）<br/>**PSN_MOBILE3_DETAILS** - 个人运营商三要素认证（详情版）<br/>**PSN_FACE** - 刷脸认证 |
| | | orgAuthMode | | | string | 否 | 本次流程中机构实名认证使用的认证方式<br/>**ORG_BANK_TRANSFER** - 对公账户打款认证<br/>**ORG_ALIPAY_CREDIT** - 企业支付宝认证<br/>**ORG_LEGALREP_AUTHORIZATION** - 授权委托书认证<br/>**ORG_LEGALREP** - 法定代表人本人实名认证<br/>**ORG_LEGALREP_WILLINGNESS** - 法定代表人本人意愿认证 |
| | | authFlowCreateTime | | | int64 | 否 | 流程创建时间（Unix时间戳格式，单位：毫秒） |
| | | authFlowUpdateTime | | | int64 | 否 | 流程最后更新时间（Unix时间戳格式，单位：毫秒） |
| | | person<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | object | 否 | 个人以及机构经办人信息<br/>+ **<font style="color:#F5222D;">个人认证&授权场景返回个人信息。</font>**<br/>+ **<font style="color:#F5222D;"> 机构认证&授权场景返回经办人信息。</font>** |
| | | | psnId | | string | 否 | 个人账号ID |
| | | | psnAccount | | object | 否 | 个人账号标识（手机号/邮箱） |
| | | |  | accountMobile | string | 否 | 手机号（个人账号标识） |
| | | | | accountEmail | string | 否 | 邮箱（个人账号标识） |
| | | | psnInfo | | object | 否 | 个人身份信息<br/>+ **<font style="color:#F5222D;">需要发起认证授权时指定get_psn_identity_info范围权限才会返回个人身份信息。</font>** |
| | | |  | psnName | string | 否 | 个人姓名 |
| | | | | psnNationality | string | 否 | 个人用户已认证的国籍/地区（默认不返回值） |
| | | | | psnIDCardNum | string | 否 | 个人用户已认证的证件号 |
| | | | | psnIDCardType | string | 否 | 个人证件类型<br/>**CRED_PSN_CH_IDCARD** - 中国大陆居民身份证<br/>**CRED_PSN_CH_HONGKONG** - 香港来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_MACAO** - 澳门来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_TWCARD** - 台湾来往大陆通行证（台胞证）<br/>**CRED_PSN_PASSPORT** - 护照 |
| | | | | bankCardNum | string | 否 | 个人用户已认证的银行卡号 |
| | | | | psnMobile | string | 否 | 个人用户已认证的运营商实名登记手机号或银行卡预留手机号<br/><font style="color:#E8323C;">【注】如果用户使用刷脸方式进行的认证，是不会有该实名手机号返回的。</font> |
| | | | faceRecognitionInfo | | object | 否 | 人脸识别信息 |
| | | | | facePhotoUrl | string | 否 | 刷脸认证时刷脸照片（base64编码照片图片数据）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 此字段默认不返回任何信息，需联系e签宝沟通业务场景通过后才可开通。<br/>+ 认证方式仅当选择腾讯云人脸识别、快捷人脸识别或微信小程序刷脸时，才会返回该字段。<br/>+ 地址有效期默认 <font style="color:#DF2A3F;">1小时</font>，过期后可以重新调用接口获取新的地址。<br/>+ 照片保存 **<font style="color:#DF2A3F;">180天</font>**，请在刷脸完成后180天内进行下载。 |
| | | | | similarityScore | string | 否 | 刷脸照片相似度得分<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 认证方式仅当选择腾讯云人脸识别、快捷人脸识别或微信小程序刷脸时，才会返回该字段。 |
| | | | | livingScore | string | 否 | 刷脸活体检测得分<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 认证方式仅当选择腾讯云人脸识别、快捷人脸识别或微信小程序刷脸时，才会返回该字段 |
| | | | | idCardFront | string | 否 | 刷脸认证时上传的身份证正面照片（base64编码照片图片数据）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 此字段默认不返回任何信息，需联系e签宝沟通业务场景通过后才可开通。<br/>+ 认证方式仅限微信小程序使用e签宝微信小程序刷脸时，才会返回该字段。<br/>+ 地址有效期默认 <font style="color:#DF2A3F;">1小时</font>，过期后可以重新调用接口获取新的地址。<br/>+ 照片保存 **<font style="color:#DF2A3F;">180天</font>**，请在刷脸完成后180天内进行下载。 |
| | | | | idCardBack | string | 否 | 刷脸认证时上传的身份证反面照片（base64编码照片图片数据）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 此字段默认不返回任何信息，需联系e签宝沟通业务场景通过后才可开通。<br/>+ 认证方式仅限微信小程序使用e签宝微信小程序刷脸时，才会返回该字段。<br/>+ 地址有效期默认 <font style="color:#DF2A3F;">1小时</font>，过期后可以重新调用接口获取新的地址。<br/>+ 照片保存 **<font style="color:#DF2A3F;">180天</font>**，请在刷脸完成后180天内进行下载。 |
| | | organization<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | object | 否 | 实名认证的机构信息 |
| | |  | orgId | | string | 否 | 机构账号ID |
| | | | orgName | | string | 否 | 组织机构名称（账号标识） |
| | | | orgInfo | | object | 否 | 组织机构信息 |
| | | | | orgIDCardNum | string | 否 | 组织机构证件号 |
| | | | | orgIDCardType | string | 否 | 组织机构证件类型<br/>**CRED_ORG_USCC** - 统一社会信用代码<br/>**CRED_ORG_REGCODE** - 工商注册号 |
| | | | | legalRepName | string | 否 | 法定代表人姓名 |
| | | | | legalRepIDCardNum | string | 否 | 法定代表人证件号 |
| | | | | legalRepIDCardType | string | 否 | 法定代表人证件类型<br/>**CRED_PSN_CH_IDCARD** - 中国大陆居民身份证<br/>**CRED_PSN_CH_HONGKONG** - 香港来往大陆通行证<br/>**CRED_PSN_CH_MACAO** - 澳门来往大陆通行证<br/>**CRED_PSN_CH_TWCARD** - 台湾来往大陆通行证<br/>**CRED_PSN_PASSPORT** - 护照 |
| | authorizedInfo<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | | array | 否 | 本次授权详情 |
| | | <font style="color:rgb(0, 0, 0);">authorizedScope</font> | | | string | 否 | 用户授权范围<br/>+ **get_org_identity_info - **授权允许获取企业/组织的基本信息<br/>+ **get_psn_identity_info - **授权允许获取个人用户的账号信息<br/>+ **org_initiate_sign** **- **授权允许代表企业/组织用户发起合同签署以及查询合同签署详情<br/>+ **psn_initiate_sign - **授权允许代表个人用户发起合同签署以及查询合同签署详情<br/>+ **manage_org_member - **授权允许获取企业/组织用户的组织成员的查询、新增、编辑、删除权限<br/>+ **manage_org_seal - **授权允许获取企业/组织用户的印章的查询、新增、编辑、授权、删除权限<br/>+ **manage_org_template -**授权允许获取企业/组织用户的模板的查询、新增、编辑、复制、删除权限<br/>+ **use_org_template - **授权允许获取企业/组织用户的模板的使用权限<br/>+ **manage_org_resource** - 授权允许获取企业/组织用户的印章、组织成员等资源的管理权限（不包含用印权限）<br/>+ **manage_psn_resource** **- **授权允许获取个人用户的印章等资源的管理权限<br/>+ **psn_sign_file_storage **- 授权允许个人合同文件存储到平台应用的本地服务器<br/>+ **org_sign_file_storage **- 授权允许企业/组织合同文件存储到平台应用的本地服务器<br/>+ **org_approval_info - **授权允许获取企业/组织用户的用印审批信息<br/>+ **use_org_order** **- **授权允许获取企业/组织用户套餐订单的使用权限 |
| | | <font style="color:rgb(0, 0, 0);">effectiveTime</font> | | | int64 | 否 | 授权生效时间（unix时间戳格式，单位：毫秒） |
| | | <font style="color:rgb(0, 0, 0);">expireTime</font> | | | int64 | 否 | 授权失效时间（unix时间戳格式，单位：毫秒） |


### 请求示例
```http
GET https://openapi.esign.cn/v3/auth-flow/OF-1f7f8****608004f
```

### 响应示例
**查询企业认证授权流程详情：**

```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "authFlowId": "OF-1f7f8****608004f",
        "authType": "ORG",
        "realNameOrWillingness": "realName",
        "realNameStatus": 1,
        "authorizedStatus": 1,
        "authInfo": {
            "willingnessAuthModes": null,
            "psnAuthMode": null,
            "orgAuthMode": null,
            "authFlowCreateTime": 1650020055000,
            "authFlowUpdateTime": 1650020055000,
            "person": {
                "psnId": "c7e002947291**eea310541e7",
                "psnAccount": {
                    "accountMobile": "183****0101",
                    "accountEmail": null
                },
                "psnInfo": {
                    "psnName": "赵四",
                    "psnNationality": null,
                    "psnIDCardNum": "130204********1001",
                    "psnIDCardType": "CRED_PSN_CH_IDCARD",
                    "bankCardNum": null,
                    "psnMobile": "183****0101"
                },
                "faceRecognitionInfo": {
                    "facePhotoUrl": null,
                    "similarityScore": null,
                    "livingScore": null
                }
            },
            "organization": {
                "orgId": "0c5bd492486b47f58d4ba96d5648bfbf",
                "orgName": "esign企业",
                "orgInfo": {
                    "orgType": null,
                    "orgIDCardNum": "913301******110212",
                    "orgIDCardType": "CRED_ORG_USCC",
                    "legalRepName": "这里是法定代表人的姓名",
                    "legalRepIDCardNum": "130204********1001",
                    "legalRepIDCardType": "CRED_PSN_CH_IDCARD"
                }
            }
        },
        "authorizedInfo": null
    }
}
```

**<font style="color:rgb(64, 64, 64);">错误码</font>**  
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/agi7xuv4yrw1i8f3)

