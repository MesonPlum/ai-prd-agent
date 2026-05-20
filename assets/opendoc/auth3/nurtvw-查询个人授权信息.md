### 接口描述
查询个人用户的授权信息以及授权有效期限。

:::warning
**注意事项：**

+ **<font style="color:#E8323C;">个人授权场景</font>**<font style="color:#E8323C;">：</font>用于查询**个人用户**授权开发者应用（AppId）的范围，以及授权有效期限；
+ **<font style="color:#E8323C;">企业授权场景：</font>**用于查询**企业经办人**授权开发者应用（AppId）的范围，以及授权有效期限；

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/persons/{psnId}/authorized-info

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **<font style="color:black;">参数名称</font>** | **参数类型** | **<font style="color:black;">必选</font>** | **参数位置** | **<font style="color:black;">参数说明</font>** |
| :--- | :---: | :---: | :---: | :--- |
| <font style="color:rgb(64, 64, 64);">psnId</font> | <font style="color:rgb(64, 64, 64);">string</font> | <font style="color:rgb(64, 64, 64);">是</font> | <font style="color:rgb(64, 64, 64);">path</font> | <font style="color:rgb(64, 64, 64);">个人账号ID（或企业经办人账号ID）</font> |


### 响应参数
| **参数名称** | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 是 | 业务码，<br/>0表示成功，非0表示异常。 |
| message | | | string | 否 | 业务信息<br/><font style="color:#E8323C;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | object | 否 | 业务数据 |
|  | authorizedInfo | | array | 否 | 用户授权信息 |
| | | authorizedScope | string | 否 | 用户授权范围<br/>+ **get_psn_identity_info - **授权允许获取个人用户的账号信息（姓名、手机号/邮箱、证件号等）<br/>+ **psn_initiate_sign - **授权允许代表个人用户发起合同签署以及查询合同签署详情<br/>+ **manage_psn_resource** - 授权允许获取个人用户的印章等资源的管理权限<br/>+ **psn_sign_file_storage **- 授权允许个人合同文件存储到平台应用的本地服务器 |
| | | effectiveTime | int64 | 否 | 授权生效时间（Unix时间戳格式，单位毫秒） |
| | | expireTime | int64 | 否 | 授权到期时间（Unix时间戳格式，单位毫秒） |


### 请求示例
```http
GET https://openapi.esign.cn/v3/persons/c7e0029472***ea310541e7/authorized-info
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "authorizedInfo": [
            {
                "authorizedScope": "manage_psn_resource",
                "effectiveTime": 1658144081996,
                "expireTime": 1660736081996
            },
            {
                "authorizedScope": "psn_initiate_sign",
                "effectiveTime": 1658144081996,
                "expireTime": 1660736081996
            },
            {
                "authorizedScope": "get_psn_identity_info",
                "effectiveTime": 1658144081996,
                "expireTime": 1660736081996
            }
        ]
    }
}
```

**<font style="color:rgb(64, 64, 64);">错误码</font>**  
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/agi7xuv4yrw1i8f3)



