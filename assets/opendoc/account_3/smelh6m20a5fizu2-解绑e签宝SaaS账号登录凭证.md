### 接口描述
当e签宝登录凭证（手机号/邮箱）与目前使用者的姓名、证件号不符时，可以通过该接口获取账号解绑页面，获取验证码验证通过即可解绑原有的证件信息。解绑页面样式如下（H5/PC自动适配）：

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1729835098983-6c3563bf-6055-4543-9d47-173883f033bc.png)![](https://cdn.nlark.com/yuque/0/2024/png/447795/1729758456584-0f7363d5-73f4-47f7-9743-974ee2c9ee86.png)![](https://cdn.nlark.com/yuque/0/2024/png/447795/1729758498836-086c103e-8f32-4082-9ed7-f7b2a079b269.png)

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1729759669318-01ba0d52-09ea-42ab-bb31-b66c91b3940c.png)

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/account-unbind-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称****<font style="color:#E8323C;"></font>** | | | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;"></font>** |
| --- | --- | --- | :---: | :---: | :---: | --- |
| account | | | string | 是 | body | 用户登录凭证：手机号或邮箱<br/><font style="color:#DF2A3F;">注：传入后会展示到页面上且禁止编辑</font> |
| hideTopBar | | | boolean | 否 | body | 是否隐藏顶部通栏，默认：false（不隐藏）<br/>**true** - 是（隐藏）<br/>**false** - 否（不隐藏） |
| redirectUrl | | | string | 否 | body | 账号解绑后页面重定向跳转地址<br/><font style="color:#DF2A3F;">注：</font><br/>+ <font style="color:#DF2A3F;">支持微信小程序场景传入固定值：wechat://back，解绑后自动跳回开发者小程序初始页</font> |
| customBizNum | | | string | 否 | body | 自定义业务编码<br/><font style="color:#DF2A3F;">注：</font><br/>+ <font style="color:#DF2A3F;">开发者可以自定义标识本次操作</font><br/>+ <font style="color:#DF2A3F;">该字段会在</font>[异步回调通知](https://qianxiaoxia.yuque.com/opendoc/notify3/pdkird9s1knbdgwr)<font style="color:#DF2A3F;">中返回（“账号解绑成功通知”事件订阅消息）</font><br/>+ <font style="color:#DF2A3F;">该字段会在重定向跳转地址后拼接</font> |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | accountUnbindUrl | | | | string | 否 | 账号解绑长链接<font style="color:#E8323C;">（有效期7天）</font><br/><font style="color:#E8323C;">【注】能获取到解绑链接不代表目前一定有绑定e签宝SaaS账号。如果当前账号没有绑定证件，会在获取验证码后提示：“该账号未绑定身份信息，无需解绑”。</font> |
| | accountUnbindShortUrl | | | | string | 否 | 账号解绑短链接 <font style="color:#E8323C;">（有效期7天）</font> |


### 请求示例
```json
{
    "account": "139XXXX0000",
    "hideTopBar":false,
    "redirectUrl":"https://esign.cn",
    "customBizNum":"标识本次解绑任务标识001"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "accountUnbindUrl": "https://smlh5.esign.cn/usercenterFront/unbind?account=139XXXX0000&hideTopBar=false&redirectUrl=&customBizNum=&appId=7438XXXX96",
        "accountUnbindShortUrl": "https://smlt.esign.cn/WiPLaaR"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1563051 | account必填 |
| 1563052 | account格式有误 |
| 1563053 | customBizNum长度过长，不超过256 |
| 1563053 | redirectUrl长度过长，不超过256 |


