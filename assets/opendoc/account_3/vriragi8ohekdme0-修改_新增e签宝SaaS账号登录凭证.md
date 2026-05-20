### 接口描述
当e签宝登录凭证（手机号/邮箱）需要修改或者新增时，可以使用该接口获取用户账号绑定页面，用户需要输入新的手机号/邮箱，**新旧手机号/邮箱都需要获取验证码并回填成功后方可操作成功**。页面样式如下（H5/PC自动适配）：

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1743075845114-0402bd0c-ab68-4f91-ba37-efad774a14a6.png)![](https://cdn.nlark.com/yuque/0/2025/png/447795/1743064056556-0ea1bb9f-c633-4655-a90f-68ac1167253f.png)![](https://cdn.nlark.com/yuque/0/2025/png/447795/1743064174995-1c2f7cfa-31c8-4bc9-8062-00aa7607e264.png)

:::warning
**<font style="color:#DF2A3F;">注意：</font>**

+ <font style="color:#DF2A3F;">当用户之前没有当前登录方式时，则视为新增，有当前登录方式时，则视为修改。例如：之前仅有手机号登录，本次获取的绑定新邮箱页面，则绑定后该用户则有原手机号和新邮箱两种登录方式。</font>
+ <font style="color:#DF2A3F;">当用户传入的新手机号/邮箱已被其他用户绑定时，则不能被当前用户绑定成功。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1743064446561-aadb548c-a19f-497f-af5b-f24b6ca22ef3.png)

+ <font style="color:#DF2A3F;">该接口能力等同于e签宝SaaS</font>[正式官网](https://web.esign.cn/workspace/home)<font style="color:#DF2A3F;">/</font>[模拟官网](https://smlfront.esign.cn:8880/workspace/home)<font style="color:#DF2A3F;">-个人空间-账户管理中的“修改”和“立即设置”功能。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1743075548084-e2712cd9-9a7e-4b42-9c95-0b04cb956c2f.png)

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/account-binding-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称****<font style="color:#E8323C;"></font>** | | | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;"></font>** |
| --- | --- | --- | :---: | :---: | :---: | --- |
| account | | | string | 是 | body | 用户登录凭证：手机号或邮箱<br/><font style="color:#DF2A3F;">注：传入后会展示到页面上且禁止编辑</font> |
| changeType | | | string | 否 | body | 绑定账号的新登录凭证类型，默认：mobile（手机号）<br/>mobile - 手机号<br/>email - 邮箱<br/><font style="color:#DF2A3F;">注：如果该类型的登录凭证之前已存在，则进行修改操作，如果不存在则进行新增绑定操作</font> |
| hideTopBar | | | boolean | 否 | body | 是否隐藏顶部通栏，默认：false（不隐藏）<br/>**true** - 是（隐藏）<br/>**false** - 否（不隐藏） |
| redirectUrl | | | string | 否 | body | 账号解绑后页面重定向跳转地址 |
| customBizNum | | | string | 否 | body | 自定义业务编码<br/><font style="color:#DF2A3F;">注：</font><br/>+ <font style="color:#DF2A3F;">开发者可以自定义标识本次操作</font><br/>+ <font style="color:#DF2A3F;">该字段会在重定向跳转地址后拼接</font> |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | accountBindUrl | | | | string | 否 | 账号修改/新增链接<font style="color:#E8323C;">（有效期7天）</font> |


### 请求示例
```json
{
    "customBizNum": "标识本次修改或新增任务标识001",
    "account": "198XXXX2222",
    "changeType": "mobile",
    "hideTopBar": false,
    "redirectUrl": "https://open.esign.cn/"
}
```

	

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "accountBindUrl": "https://smlh5.esign.cn/usercenterFront/rebind?account=198****2222&contextId=4c9760988ded4e829e3d78909af7a595&changeType=mobile&hideTopBar=false&redirectUrl=&customBizNum=%E6%A0%87%E8%AF%86%E6%9C%AC%E6%AC%A1%E6%8D%A2%E7%BB%91%E6%88%96%E6%96%B0%E5%A2%9E%E4%BB%BB%E5%8A%A1%E6%A0%87%E8%AF%86001&appId=1111028765"
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


