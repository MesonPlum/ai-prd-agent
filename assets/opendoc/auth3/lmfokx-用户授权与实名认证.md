:::warning
**<font style="color:#DF2A3F;">重要提示：自2024年9月12日起，认证授权涉及权限范围（authorizedScopes）部分功能需要购买e签宝高级版或生态伙伴版本方可支持！</font>**

:::

# 基础介绍
:::info
**什么是用户授权？**

根据电子签名法律法规相关要求，如需获取e签宝平台用户的相关隐私信息，需要提前对用户发起授权（仅支持接口形式授权），授权给当前调用方开放平台应用（AppId）使用e签宝用户相关资源权限（获取身份信息、印章信息等）。授权成功后，调用方调用后续业务API接口时需传入用户授权的e签宝个人或企业账号，并确保授权在有效范围内，就可以使用用户相关授权的资源权限。

**<font style="color:rgb(245, 34, 45);">注意事项：</font>**

+ <font style="color:rgb(38, 38, 38);">建议开发者本地保管好用户的账号ID与账号标识（个人用户的手机号/邮箱、企业用户的企业名称）的关联关系；</font>

:::

:::warning
**什么是实名认证？**

实名认证是电子签名过程中必不可少的环节，通过信息核验、人脸比对、校验码回填、机构对公账户打款等方式确认身份的真实性，并反馈认证结果的服务。

对接方可以自己选择在签署前单独发起实名认证服务（可避免用户在签署中因为实名信息不符，造成签署卡点），或者用e签宝签署页面自带的实名认证页面。

**<font style="color:rgb(245, 34, 45);">注意事项：</font>**

+ <font style="color:rgb(38, 38, 38);">用户可以自主登录</font>[e签宝官网](https://web.esign.cn/user/authorize)<font style="color:rgb(38, 38, 38);">—<个人用户中心>/<企业控制台> 管理自己的账号信息。</font>
+ <font style="color:rgb(38, 38, 38);">建议开发者本地保管好用户的账号ID与账号标识（个人用户的手机号/邮箱、企业用户的企业名称）的关联关系；</font>

:::

**本文介绍签署前需要接口发起实名认证&用户授权场景，涉及API文档：**[**实名认证和授权服务API 3.0**](https://open.esign.cn/doc/opendoc/auth3/rx8igf)

**获取机构/个人认证&授权页面链接 **接口包含两种模式（可通过参数控制进入不同的模式里，具体见[相关参数](#Exbz5)说明）：

+ **授权认证模式：**包含用户授权 + 实名认证/意愿认证。用户第一次使用e签宝需要做实名认证，证明真实身份。第二次及以后不需要再做实名，只需做意愿认证，证明本人真实意愿。

 	（1）实名认证支持：人脸识别认证（支付宝人脸，腾讯云人脸），银行四要素认证，手机三要素认证。

 	（2）意愿认证支持：人脸识别认证（支付宝人脸，腾讯云人脸），短信验证码认证（意愿认证与实名认证的用户感知类似）。

+ **实名认证模式：**用户只需要做一次，如果用户做过e签宝实名认证，再次调用接口使用实名模式，接口会报错"用户已实名"。

# 效果展示
**具体参考：**[点击查看 SaaS API V3版用户认证&授权操作手册](https://open.esign.cn/doc/opendoc/helper/vo3s51)

## 企业机构用户
**企业机构用户****<font style="color:#DF2A3F;">授权认证模式</font>****，进入到授权认证链接的首页展示如下：**

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1669972642943-2dfd78de-4c2b-4a11-9b19-06f6f40f9286.png)

**企业机构用户****<font style="color:#DF2A3F;">实名认证模式</font>****，进入到实名认证链接的首页展示如下：**

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1669972723060-8ae9970d-b372-48b7-a1ef-7067d37c1679.png)

## 个人用户
**个人用户****<font style="color:#DF2A3F;">授权认证模式</font>****，进入到授权认证链接的首页展示如下：**

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1670295174675-9a32fcf2-37e7-4d63-863f-ffe8c8f892de.png)  
**个人用户****<font style="color:#DF2A3F;">实名认证模式</font>****，进入到实名认证链接的首页展示如下：**

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1670295302220-fb2bc14a-2417-46dd-8cd4-053d27d09990.png)

# API列表
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| **企业机构授权｜认证场景** | | |
| [查询机构认证信息](https://open.esign.cn/doc/opendoc/auth3/xxz4tc) | 此接口用来查询企业机构用户在e签宝的实名状态、授权状态（仅限当前应用ID）、e签宝的账号ID以及实名认证时的机构名称、机构证件号、法人等信息（需要提前授权后才会返回）。 | **<font style="color:#8C8C8C;">按需</font>** |
| [查询机构授权信息](https://open.esign.cn/doc/opendoc/auth3/ytn2tt) | 此接口在授权场景可以接入查询授权范围以及授权到期时间。 | **<font style="color:#8C8C8C;">按需</font>** |
| [获取机构认证&授权页面链接 ](https://open.esign.cn/doc/opendoc/auth3/kcbdu7) | 此接口用来获取企业机构用户的授权+实名认证链接或者单独的实名认证链接，发起成功后会返回认证授权流程标识：authFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| **个人授权｜认证场景** | | |
| [查询个人认证信息](https://open.esign.cn/doc/opendoc/auth3/vssvtu) | 此接口用来查询个人用户在e签宝的实名状态、授权状态（仅限当前应用ID）、e签宝的账号ID以及实名认证时的姓名、证件号等信息（需要提前授权后才会返回）。 | **<font style="color:#8C8C8C;">按需</font>** |
| [查询个人授权信息](https://open.esign.cn/doc/opendoc/auth3/nurtvw) | 此接口在授权场景可以接入查询授权范围以及授权到期时间。 | **<font style="color:#8C8C8C;">按需</font>** |
| [获取个人认证&授权页面链接](https://open.esign.cn/doc/opendoc/auth3/rx8igf) | 此接口用来获取个人用户的授权+实名认证链接或者单独的实名认证链接，发起成功后会返回认证授权流程标识：authFlowId。 | **<font style="color:#8C8C8C;"></font>****<font style="color:#E8323C;">必需</font>** |
| **公共查询接口** | | |
| [查询认证授权流程详情](https://open.esign.cn/doc/opendoc/auth3/hlrs7s) | 此接口可根据认证流程标识：authFlowId 查询本次授权和认证的详情信息。 | **<font style="color:#52C41A;">建议</font>** |


## <font style="color:rgb(51, 51, 51);">获取机构/个人认证&授权页面链接接口</font><font style="color:rgb(64, 64, 64);">代码案例</font>
### 关键参数
+ <font style="color:#DF2A3F;">orgAuthConfig/psnAuthConfig</font>（机构/个人授权&认证信息）：机构接口传入orgAuthConfig，个人接口传入psnAuthConfig。
+ <font style="color:#DF2A3F;">redirectUrl</font><font style="color:rgb(64, 64, 64);">（认证完成后跳转页面）：建议开发者传入，跳转到自己的业务页面做信息处理。</font>
+ <font style="color:#DF2A3F;">notifyUrl</font><font style="color:rgb(64, 64, 64);">（接收回调通知的Web地址）：通知开发者用户认证和授权的完成以及变更情况。</font>

<font style="color:rgb(38, 38, 38);">用户授权完成时，开发者可通过</font>[【授权完成通知】](https://open.esign.cn/doc/opendoc/notify3/demod3)<font style="color:rgb(38, 38, 38);">的回调通知来接收用户的授权信息；</font>

<font style="color:rgb(38, 38, 38);">用户实名完成时，开发者可通过</font>[【实名认证通过通知】](https://open.esign.cn/doc/opendoc/notify3/tme3qi)<font style="color:rgb(38, 38, 38);">的回调通知来接收用户的实名账号信息。</font>

+ <font style="color:#DF2A3F;">authorizedScopes</font>（授权范围）<font style="color:rgb(64, 64, 64);">：设置该参数则为</font>**<font style="color:rgb(64, 64, 64);">授权认证模式</font>**<font style="color:rgb(64, 64, 64);">，不设置该参数（或者传空值）则为</font>**实名认证模式**。

| <font style="color:rgb(64, 64, 64);">企业用户的授权范围（</font><font style="color:rgb(64, 64, 64);">authorizedScopes</font><font style="color:rgb(64, 64, 64);">）</font> | | <font style="color:rgb(64, 64, 64);">对应的可选值</font> |
| --- | --- | --- |
| <font style="color:rgb(245, 34, 45);">获取用户的账号基本信息：</font> | <font style="color:rgb(64, 64, 64);">允许获取企业/组织用户的账号基本信息</font> | **<font style="color:rgb(64, 64, 64);">get_org_identity_info</font>** |
| | <font style="color:rgb(64, 64, 64);">允许获取经办人个人用户的账号基本信息</font> | **<font style="color:rgb(64, 64, 64);">get_psn_identity_info</font>** |
| <font style="color:rgb(245, 34, 45);">允许代替用户发起合同签署：</font> | <font style="color:rgb(64, 64, 64);">允许代表企业/组织用户发起合同签署</font> | **<font style="color:rgb(64, 64, 64);">org_initiate_sign</font>** |
| | <font style="color:rgb(64, 64, 64);">允许代表经办人个人用户发起合同签署</font> | **<font style="color:rgb(64, 64, 64);">psn_initiate_sign</font>** |
| <font style="color:rgb(232, 50, 60);">获取用户资源管理权限：</font> | <font style="color:rgb(64, 64, 64);">允许获取企业/组织用户的组织成员的查询、新增、编辑、删除权限</font> | **<font style="color:rgb(64, 64, 64);">manage_org_member</font>** |
| | <font style="color:rgb(64, 64, 64);">允许获取企业/组织用户的印章的查询、新增、编辑、授权、删除权限</font> | **<font style="color:rgb(64, 64, 64);">manage_org_seal</font>** |
| | <font style="color:rgb(64, 64, 64);">允许获取企业/组织用户的模板的查询、新增、编辑、复制、删除权限</font> | **<font style="color:rgb(64, 64, 64);">manage_org_template</font>** |
| | <font style="color:rgb(64, 64, 64);">允许获取企业/组织用户的模板的使用权限</font> | **<font style="color:rgb(64, 64, 64);">use_org_template</font>** |
| | <font style="color:rgb(64, 64, 64);">允许获取企业/组织用户的印章、组织成员等资源的管理权限</font> | **<font style="color:rgb(64, 64, 64);">manage_org_resource</font>** |
| | <font style="color:rgb(64, 64, 64);">允许获取经办人个人用户的印章等资源的管理权限</font> | **<font style="color:rgb(64, 64, 64);">manage_psn_resource</font>** |
| <font style="color:rgb(232, 50, 60);">存储用户的合同文件（适用于专属云对接）：</font> | <font style="color:rgb(64, 64, 64);">允许企业/组织合同文件存储到平台应用的本地服务器</font> | **<font style="color:rgb(64, 64, 64);">org_sign_file_storage</font>** |
| <font style="color:rgb(232, 50, 60);">获取用户的用印审批信息：</font> | <font style="color:rgb(64, 64, 64);">允许获取企业/组织用户的用印审批信息</font> | **<font style="color:rgb(64, 64, 64);">org_approval_info</font>** |
| <font style="color:rgb(232, 50, 60);">获取用户订单使用权限（适用于合同“发起方”付费场景）：</font> | <font style="color:rgb(64, 64, 64);">允许获取企业/组织用户套餐订单的使用权限</font> | **<font style="color:rgb(64, 64, 64);">use_org_order</font>** |


| <font style="color:rgb(64, 64, 64);">个人用户的授权范围（authorizedScopes）</font> | | <font style="color:rgb(64, 64, 64);">对应的可选值</font> |
| --- | --- | --- |
| <font style="color:rgb(245, 34, 45);">获取用户的账号基本信息：</font> | <font style="color:rgb(64, 64, 64);">允许获取个人用户的账号基本信息</font> | **<font style="color:rgb(64, 64, 64);">get_psn_identity_info</font>** |
| <font style="color:rgb(245, 34, 45);">允许代替用户发起合同签署：</font> | <font style="color:rgb(64, 64, 64);">允许代表个人用户发起合同签署</font> | **<font style="color:rgb(64, 64, 64);">psn_initiate_sign</font>** |
| <font style="color:rgb(232, 50, 60);">获取用户资源管理权限：</font> | <font style="color:rgb(64, 64, 64);">允许获取个人用户的印章等资源的管理权限</font> | **<font style="color:rgb(64, 64, 64);">manage_psn_resource</font>** |
| <font style="color:rgb(232, 50, 60);">存储用户的合同文件（适用于专属云对接）：</font> | 允许个人合同文件存储到平台应用的本地服务器 | **psn_sign_file_storage** |


### 企业机构用户<font style="color:rgb(64, 64, 64);">代码案例</font>
#### <font style="color:rgb(64, 64, 64);">企业机构用户</font><font style="color:#DF2A3F;">授权认证模式</font><font style="color:rgb(64, 64, 64);">代码案例</font>
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

#### <font style="color:rgb(64, 64, 64);">企业机构用户</font><font style="color:#DF2A3F;">实名认证模式</font><font style="color:rgb(64, 64, 64);">代码案例</font>
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
    "redirectConfig": {
        "redirectUrl": "https://www.xxx.cn/"
    },
    "clientType": "ALL",
    "notifyUrl": "http://******/notify"
}
```

### 个人用户<font style="color:rgb(64, 64, 64);">代码案例</font>
#### 个人用户<font style="color:#DF2A3F;">授权认证模式</font><font style="color:rgb(64, 64, 64);">代码案例</font>
```json
{
    "psnAuthConfig": {
        "psnAccount": "153******50",
        "psnInfo": {
            "psnName": "张三",
            "psnIDCardNum": "2311********4329",
            "psnIDCardType": "CRED_PSN_CH_IDCARD",
            "psnMobile": "153******50"
        },
        "psnAuthPageConfig": {
            "psnDefaultauthMode": "PSN_MOBILE3",
            "psnAvailableauthModes": [
                "PSN_BANKCARD4",
                "PSN_MOBILE3",
                "PSN_FACE_ALIPAY",
                "PSN_FACE_TECENT"
            ],
            "psnEditableFields": [
                "IDCardNum"
            ]
        }
    },
    "authorizeConfig": {
        "authorizedScopes": [
            "get_psn_identity_info"
        ]
    },
    "redirectConfig": {
        "redirectUrl": "https://www.esign.cn/"
    },
    "notifyUrl": "http://******/notify",
    "clientType": "ALL"
}
```

#### 个人<font style="color:rgb(64, 64, 64);">用户</font><font style="color:#DF2A3F;">实名认证模式</font><font style="color:rgb(64, 64, 64);">代码案例</font>
```json
{
    "psnAuthConfig": {
        "psnAccount": "153******50",
        "psnInfo": {
            "psnName": "张三",
            "psnIDCardNum": "2311********4329",
            "psnIDCardType": "CRED_PSN_CH_IDCARD",
            "psnMobile": "153******50"
        },
        "psnAuthPageConfig": {
            "psnDefaultauthMode": "PSN_MOBILE3",
            "psnAvailableauthModes": [
                "PSN_BANKCARD4",
                "PSN_MOBILE3",
                "PSN_FACE_ALIPAY",
                "PSN_FACE_TECENT"
            ],
            "psnEditableFields": [
                "IDCardNum"
            ]
        }
    },
    "redirectConfig": {
        "redirectUrl": "https://www.esign.cn/"
    },
    "notifyUrl": "http://******/notify",
    "clientType": "ALL"
}
```

