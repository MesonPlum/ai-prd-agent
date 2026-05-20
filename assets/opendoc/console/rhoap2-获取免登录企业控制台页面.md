> [**必须确保企业用户已授予平台appId获取其资源管理权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/kcbdu7)
>
> **manage_org_resource - 授权允许获取企业/组织用户的印章、组织成员等资源的管理权限（不包含用印权限）**
>

### 接口描述
提供用户免登录进入e签宝企业控制台的页面链接，支持开发者将获取到的企业控制台页面（ “企业信息”、“企业成员”、“印章管理”、“商品购买”、“订单管理”）集成到内部业务系统中访问。接口获取到的页面如下图：

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1713928774829-b9e7ea18-9f4e-40ca-ae8f-c39708782708.png)

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/organizations/org-console-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | | | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | :---: | :---: | :---: | --- |
| orgId | | | | string | 是 | body | 机构账号ID<br/><font style="color:#E8323C;">【注】企业用户在e签宝注册实名后才有账号ID，账号ID获取方式可以使用</font>[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)<font style="color:#E8323C;">接口通过组织机构名称/组织机构证件号进行查询</font> |
| transactorPsnId | | | | string | 是 | body | 经办人账号ID<br/><font style="color:#E8323C;">【注】</font><font style="color:#DF2A3F;">经办人需要有企业控制台对应菜单管理的权限（建议企业管理员去操作），可通过</font>[【查询企业成员列表】](https://qianxiaoxia.yuque.com/opendoc/employee/bzrzic)<font style="color:#DF2A3F;">接口获取企业成员的账号ID。</font> |
| showTopBar | | | | boolbean | 否 | body | 页面是否展示顶部栏<br/>**true** - 展示<font style="color:#E8323C;">（默认值）</font><br/>**false** - 隐藏 |
| menu | | | | list | 否 | body | 指定页面中展示的菜单<font style="color:#E8323C;">（默认按照成员角色权限展示）</font><br/>+ **org_info**（企业信息页面）<br/>+ **org_seal_manage **（企业印章管理页面）<br/>+ **org_member_manage**（企业成员管理页面）<br/>+ **org_place_order** （企业下单页面）<br/>+ **org_order_manage **（企业订单管理页面） |
| pageConfig | | | | object | 否 | body | 页面配置项 |
| | distributor | | | boolbean | 否 | body | 是否仅查询渠道商维度的订单（企业订单管理页面），<br/>**true **- 是<br/>**false **- 否<font style="color:#E8323C;">（默认值）</font> |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data | | | | | object | 否 | 业务数据 |
|  | orgConsoleUrl | | | | string | 否 | 免登录企业控制台链接（有效期30分钟，过期需要重新获取） |


### 请求示例
```json
{
    "orgId": "0c5bd4924****5648bfbf",
    "transactorPsnId":"c7e002947****310541e7",
    "menu": ["org_info","org_seal_manage","org_member_manage"],
    "pageConfig": {
        "distributor": false
    },
    "showTopBar": true
}
```

### 响应示例
```json
{
    "message":"成功",
    "code":0,
    "data":{
        "orgConsoleUrl":"https://openapi.tsign.cn/auth/guide?loginId=xx-xx-xx-xx-xx"
    }
}
```

