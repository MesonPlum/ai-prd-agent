> [**必须确保个人用户已授予平台appId获取其印章资源管理权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/opendoc/auth3/rx8igf)
>
> + **manage_psn_resource - 授权允许获取个人用户的印章等资源的管理权限**
>

### 接口描述
通过可视化页面（免登录）来操作管理个人印章。

+ 支持查看个人印章列表、创建印章、删除印章、设置默认印章、修改印章名称等操作。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/seals/psn-seals-manage-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| psnId | string | 是 | body | 个人账号ID<br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询个人认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/vssvtu)接口通过个人账号标识（手机号或邮箱）/个人用户的证件号进行查询 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | psnSealManageUrl | | | | string | 否 | 个人印章管理页面链接（有效期30分钟，过期需要重新获取） |


### 请求示例
```http
{
    "psnId": "c7e002***0541e7"
}
```

### 响应示例
```json
{
    "message": "成功",
    "code": 0,
    "data": {
        "psnSealManageUrl": "https://h5.esign.cn/auth/guide?loginId=xx-xx-xx-xx-xxx"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gqgb0gwznb2su405)

