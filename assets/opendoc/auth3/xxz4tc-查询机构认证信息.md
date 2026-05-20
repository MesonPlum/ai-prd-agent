### 接口描述
查询机构实名认证信息。

:::warning
**注意事项：**

入参中`**<font style="color:#FA8C16;background-color:#E9E9E9;">orgId</font>**`、`**<font style="color:#FA8C16;background-color:#E9E9E9;">orgName</font>**`和`**<font style="color:#FA8C16;background-color:#E9E9E9;">orgIDCardNum</font>**`三个参数只选择一个传入即可查询机构认证信息。

查询优先级为 `**<font style="color:#FA8C16;background-color:#E9E9E9;">orgId </font>**`> `**<font style="color:#FA8C16;background-color:#E9E9E9;">orgName </font>**`> `**<font style="color:#FA8C16;background-color:#E9E9E9;">orgIDCardNum</font>**`。

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/organizations/identity-info

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **<font style="color:black;">参数名称</font>** | **参数类型** | **<font style="color:black;">必选</font>** | **参数位置** | **<font style="color:black;">参数说明</font>** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 否 | query | 机构账号ID |
| orgName | string | 否 | query | 组织机构名称 |
| orgIDCardNum | string | 否 | query | 组织机构证件号 |
| orgIDCardType | string | 否 | query | 组织机构证件类型<font style="color:#E8323C;">（传orgIDCardNum时，该参数为必传）</font><br/>**CRED_ORG_USCC **- 统一社会信用代码<br/>**CRED_ORG_REGCODE **- 工商注册号 |


### 响应参数
| **参数名称**<font style="color:#E8323C;"></font> | | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | string | 否 | 业务信息<br/><font style="color:#E8323C;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | | object | 否 | 业务数据 |
| | realnameStatus | | | int32 | 否 | 实名认证状态<br/>**0 **- 未实名，**1 **- 已实名 |
| | authorizeUserInfo | | | boolean | 是 | 是否授权身份信息给当前应用<br/>**true **- 已授权，**false **- 未授权<br/><font style="color:rgb(232, 50, 60);">【注</font><font style="color:#DF2A3F;">】发起授权认证时需要授权：</font>**<font style="color:#DF2A3F;">get_org_identity_info </font>**<font style="color:#DF2A3F;">权限，并操作授权完成后，才能返回</font><font style="color:rgb(232, 50, 60);">已授权状态</font> |
| | orgId | | | string | 否 | 机构账号ID |
| | orgName | | | string | 否 | 机构名称 |
| | orgAuthMode | | | string | 否 | 机构实名认证完成时使用的认证方式（如果多次认证则取最近一次认证）<br/>**ORG_BANK_TRANSFER** - 对公打款认证<br/>**ORG_LEGALREP_AUTHORIZATION** - 法人授权认证<br/>**ORG_LEGALREP** - 法定代表人本人实名认证<br/>**ORG_LEGALREP_WILLINGNESS** - 法定代表人本人意愿认证<br/>**ORG_ALIPAY_QUICK **- 法人快捷认证<br/>**ORG_ALIPAY_CREDIT** - 企业支付宝认证<br/>**ORG_MANUAL** - 人工审核<br/>**ORG_OTHER** - 其他 |
| | orgInfo<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | object | 否 | 机构认证信息<br/><font style="color:rgb(232, 50, 60);">【注】</font><font style="color:rgb(64, 64, 64);">如果机构已实名的状态下，会默认返回实名的机构名称、机构证件号、</font>机构证件号类型、法定代表人姓名、机构管理员姓名（脱敏）、机构管理员联系方式（脱敏） |
| | | orgIDCardNum | | string | 否 | 组织机构证件号 |
| | | orgIDCardType | | string | 否 | 组织机构证件号类型<br/>**CRED_ORG_USCC **- 统一社会信用<br/>**CRED_ORG_REGCODE **- 工商注册号 |
| | | legalRepName | | string | 否 | 法定代表人姓名 |
| | | legalRepIDCardNum | | string | 否 | 法定代表人证件号<br/><font style="color:rgb(232, 50, 60);">【注</font><font style="color:#DF2A3F;">】发起授权认证时需要授权：</font>**<font style="color:#DF2A3F;">get_org_identity_info </font>**<font style="color:#DF2A3F;">权限才能返回</font> |
| | | legalRepIDCardType | | string | 否 | 法定代表人证件类型<br/>**CRED_PSN_CH_IDCARD **- 中国大陆居民身份证<br/>**CRED_PSN_CH_HONGKONG **- 香港来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_MACAO **- 澳门来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_TWCARD **- 台湾来往大陆通行证（台胞证）<br/>**CRED_PSN_PASSPORT **- 护照<br/><font style="color:rgb(232, 50, 60);">【注</font><font style="color:#DF2A3F;">】发起授权认证时需要授权：</font>**<font style="color:#DF2A3F;">get_org_identity_info </font>**<font style="color:#DF2A3F;">权限才能返回</font> |
| | | corporateAccount | | string | 否 | 机构对公账户名称<br/><font style="color:rgb(232, 50, 60);">【注</font><font style="color:#DF2A3F;">】仅对公打款认证方式可返回，且发起授权认证时需要授权：</font>**<font style="color:#DF2A3F;">get_org_identity_info </font>**<font style="color:#DF2A3F;">权限</font> |
| | | orgBankAccountNum | | string | 否 | 机构对公打款银行卡号信息<br/><font style="color:rgb(232, 50, 60);">【注</font><font style="color:#DF2A3F;">】仅对公打款认证方式可返回，且发起授权认证时需要授权：</font>**<font style="color:#DF2A3F;">get_org_identity_info </font>**<font style="color:#DF2A3F;">权限</font> |
| | | cnapsCode | | string | 否 | 机构对公打款银行联行号（开户行银行支行）<br/><font style="color:rgb(232, 50, 60);">【注</font><font style="color:#DF2A3F;">】仅对公打款认证方式可返回，且发起授权认证时需要授权：</font>**<font style="color:#DF2A3F;">get_org_identity_info </font>**<font style="color:#DF2A3F;">权限</font> |
| | | authorizationDownloadUrl | | string | 否 | 机构对公打款单位实名认证授权委托书文件下载地址<br/><font style="color:rgb(232, 50, 60);">【注</font><font style="color:#DF2A3F;">】</font><br/>+ <font style="color:#DF2A3F;">仅对公打款认证方式可返回，且发起授权认证时需要授权：</font>**<font style="color:#DF2A3F;">get_org_identity_info </font>**<font style="color:#DF2A3F;">权限</font><br/>+ <font style="color:#DF2A3F;">地址有效期默认</font>**<font style="color:#DF2A3F;"> 1小时</font>**<font style="color:#DF2A3F;">，过期后可以重新调用接口获取新的地址。</font><br/>+ <font style="color:#DF2A3F;">文件保存 </font>**<font style="color:#DF2A3F;">180天</font>**<font style="color:#DF2A3F;">，请在完成后180天内进行下载。</font> |
| | | licenseDownloadUrl | | string | 否 | 机构营业执照照片文件下载地址<br/><font style="color:rgb(232, 50, 60);">【注</font><font style="color:#DF2A3F;">】</font><br/>+ <font style="color:#DF2A3F;">需要联系e签宝交付顾问开启页面OCR-营业执照上传功能，用户在认证页面上传后才能返回</font><br/>+ <font style="color:#DF2A3F;">发起授权认证时需要授权：g</font>**<font style="color:#DF2A3F;">et_org_identity_info </font>**<font style="color:#DF2A3F;">权限才能返回</font><br/>+ <font style="color:#DF2A3F;">地址有效期默认</font>**<font style="color:#DF2A3F;"> 1小时</font>**<font style="color:#DF2A3F;">，过期后可以重新调用接口获取新的地址。</font><br/>+ <font style="color:#DF2A3F;">照片保存 </font>**<font style="color:#DF2A3F;">180天</font>**<font style="color:#DF2A3F;">，请在完成后180天内进行下载。</font> |
| | | adminName | | string | 否 | 机构管理员姓名（在e签宝SaaS官网认证绑定的管理员姓名）<br/><font style="color:rgb(232, 50, 60);">【注】姓名会脱敏显示</font> |
| | | adminAccount | | string | 否 | 机构管理员联系方式（在e签宝SaaS官网认证绑定的管理员手机号或者邮箱，如果两种联系方式都有优先返回手机号）<br/><font style="color:rgb(232, 50, 60);">【注】联系方式会脱敏显示</font> |


### 请求示例
```http
GET https://openapi.esign.cn/v3/organizations/identity-info?orgName=xxxx企业
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "authorizeUserInfo": false,
        "realnameStatus": 1,
        "orgId": "7292997588*****521928db25",
        "orgName": "测试企业****",
        "orgAuthMode": "ORG_LEGALREP",
        "orgInfo": {
            "orgType": null,
            "orgIDCardNum": "9130*****114007",
            "orgIDCardType": "CRED_ORG_USCC",
            "legalRepName": "张三",
            "legalRepIDCardNum": null,
            "legalRepIDCardType": null,
            "orgBankAccountNum": null,
            "corporateAccount": null,
            "cnapsCode": null,
            "licenseDownloadUrl": null,
            "authorizationDownloadUrl": null,
            "adminName": "张*",
            "adminAccount": "1******7650"
        }
    }
}
```

**<font style="color:rgb(64, 64, 64);">错误码</font>**  
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/agi7xuv4yrw1i8f3)

