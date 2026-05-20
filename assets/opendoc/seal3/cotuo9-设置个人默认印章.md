> [**必须确保个人用户已授予平台appId获取其印章资源管理权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/opendoc/auth3/rx8igf)
>
> + **manage_psn_resource - 授权允许获取个人用户的印章等资源的管理权限**
>

### 接口描述
个人用户在完成实名认证时，e签宝会为其生成一个默认印章。若需要将其他样式印章设置为默认印章时，可通过此接口进行设置。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/seals/psn-seals/set-default-seal

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| psnId | string | 是 | body | 个人账号ID<br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询个人认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/vssvtu)接口通过个人账号标识（手机号或邮箱）/个人用户的证件号进行查询 |
| sealId | string | 是 | body | 印章ID |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data | | | | | string | 否 | 业务数据 |


### 请求示例
```json
{
  "psnId":"c7e0029***41e7",
  "sealId":"d2749c50-xx-xx-xx-ce4482c7747f"
}
```

### 响应示例
```json
{
    "message": "成功",
    "code": 0,
    "data": null
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gqgb0gwznb2su405)

