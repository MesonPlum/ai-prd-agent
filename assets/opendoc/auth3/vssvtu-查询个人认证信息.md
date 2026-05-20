### 接口描述
查询个人用户实名认证的信息。

:::warning
**【注意事项】**

入参中`**<font style="color:#FA8C16;background-color:#E9E9E9;">psnId</font>**`、`**<font style="color:#FA8C16;background-color:#E9E9E9;">psnAccount</font>**`和`**<font style="color:#FA8C16;background-color:#E9E9E9;">psnIDCardNum</font>**`三个参数只选择一个传入即可查询个人的认证信息。

查询优先级为 `**<font style="color:#FA8C16;background-color:#E9E9E9;">psnId</font>** `> `**<font style="color:#FA8C16;background-color:#E9E9E9;">psnAccount</font>** `> `**<font style="color:#FA8C16;background-color:#E9E9E9;">psnIDCardNum</font>**`

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/persons/identity-info

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **<font style="color:black;">参数名称</font>** | **参数类型** | **<font style="color:black;">必选</font>** | **参数位置** | **<font style="color:black;">参数说明</font>** |
| :--- | :---: | :---: | :---: | :--- |
| <font style="color:rgb(64, 64, 64);">psnId</font> | <font style="color:rgb(64, 64, 64);">string</font> | <font style="color:rgb(64, 64, 64);">否</font> | <font style="color:rgb(64, 64, 64);">query</font> | <font style="color:rgb(64, 64, 64);">个人账号ID</font> |
| <font style="color:rgb(64, 64, 64);">psnAccount</font> | <font style="color:rgb(64, 64, 64);">string</font> | <font style="color:rgb(64, 64, 64);">否</font> | <font style="color:rgb(64, 64, 64);">query</font> | <font style="color:rgb(64, 64, 64);">个人账号标识（手机号或邮箱）</font> |
| <font style="color:rgb(64, 64, 64);">psnIDCardNum</font> | <font style="color:rgb(64, 64, 64);">string</font> | <font style="color:rgb(64, 64, 64);">否</font> | <font style="color:rgb(64, 64, 64);">query</font> | <font style="color:rgb(64, 64, 64);">个人</font><font style="color:rgb(64, 64, 64);">用户</font><font style="color:rgb(64, 64, 64);">的证件号</font> |
| <font style="color:rgb(64, 64, 64);">psnIDCardType</font> | <font style="color:rgb(64, 64, 64);">string</font> | <font style="color:rgb(64, 64, 64);">否</font> | <font style="color:rgb(64, 64, 64);">query</font> | <font style="color:rgb(64, 64, 64);">个人证件号类型 </font><font style="color:#E8323C;">（传psnIDCardNum时，证件类型为必传项）</font><br/>**CRED_PSN_CH_IDCARD** - 中国大陆居民身份证<br/>**CRED_PSN_CH_HONGKONG** - 香港来往大陆通行证<br/>**CRED_PSN_CH_MACAO** - 澳门来往大陆通行证<br/>**CRED_PSN_CH_TWCARD** - 台湾来往大陆通行证<br/>**CRED_PSN_PASSPORT** - 护照 |


### 响应参数
| **参数名称** | | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | string | 否 | 业务信息<br/><font style="color:#E8323C;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | | object | 否 | 业务数据 |
|  | realnameStatus | | | int32 | 否 | 用户在e签宝的实名认证状态<br/>**0** - 未实名，**1 **- 已实名 |
| | authorizeUserInfo | | | boolean | 否 | 是否授权相关信息给当前应用<br/>**true **- 已授权，**false **- 未授权 |
| | psnId | | | string | 否 | 个人账号ID |
| | psnAccount<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | object | 否 | 个人账号标识<br/><font style="color:#E8323C;">【注】仅当authorizeUserInfo返回值为true，已授权当前应用时，才会返回个人账号标识信息。</font> |
| |  | accountMobile | | string | 否 | 用户登录e签宝SaaS官网的手机号 |
| | | accountEmail | | string | 否 | 用户登录e签宝SaaS官网的邮箱地址 |
| | psnInfo<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | object | 否 | 个人用户身份信息<br/><font style="color:#E8323C;">【注】仅当authorizeUserInfo返回值为true，已授权当前应用时，才会返回个人用户的身份信息。</font> |
| | | psnName | | string | 否 | 个人用户已认证的姓名 |
| | | psnNationality | | string | 否 | 个人国籍<font style="color:#595959;">（暂无值返回）</font> |
| | | psnIDCardNum | | string | 否 | 个人证件号 |
| | | psnIDCardType | | string | 否 | 证件类型<br/>**CRED_PSN_CH_IDCARD** - 中国大陆居民身份证<br/>**CRED_PSN_CH_HONGKONG** - 香港来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_MACAO** - 澳门来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_TWCARD** - 台湾来往大陆通行证（台胞证）<br/>**CRED_PSN_PASSPORT** - 护照 |
| | | bankCardNum | | string | 否 | 个人用户已认证的银行卡号 |
| | | psnMobile | | string | 否 | 个人用户已认证的运营商实名登记手机号或银行卡预留手机号<br/><font style="color:#E8323C;">【注】如果用户使用刷脸方式进行的认证，是不会有该实名手机号返回的。</font> |


### 请求示例
```http
GET https://openapi.esign.cn/v3/persons/identity-info?psnAccount=183****0101
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "authorizeUserInfo": true,
        "realnameStatus": 1,
        "psnId": "c7e00229***41e7",
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
        }
    }
}
```

**<font style="color:rgb(64, 64, 64);">错误码</font>**  
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/agi7xuv4yrw1i8f3)

