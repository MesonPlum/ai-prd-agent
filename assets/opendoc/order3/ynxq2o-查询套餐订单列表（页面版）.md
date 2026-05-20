> [**必须确保企业已授予资源管理权限（manage_org_resource）**](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/kcbdu7)
>

### 接口描述
当企业用户购买e签宝套餐，生态合作伙伴可通过此接口获取到企业用户机构下的订单列表链接，以便业务需要时供企业用户查看订单详情。

:::info
+ ****除企业管理员、计费管理员可见所有订单外，其他身份用户仅可见自己下单的订单；

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/orders/org-order-manage-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;"></font>** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 是 | body | 机构账号ID |
| transactorPsnId | string | 是 | body | 经办人个人账号ID |
| distributor | boolbean | 否 | body | 查询通过生态伙伴所购买的套餐，默认值 false<br/>**true** - 仅查询通过生态伙伴所购买的套餐<br/>**false **- 查询企业用户全部订单 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | orgOrderManageUrl | | | | string | 否 | 企业用户套餐订单列表页面链接（有效期30天） |


### 请求示例
```json
{
  "transactorPsnId":"c7e0029***541e7",
  "orgId":"0c5bd4***8bfbf",
  "distributor": true
}
```

### 响应示例
```json
{
    "message": "成功",
    "code": 0,
    "data": {
        "orgOrderManageUrl": "https://openapi.esign.cn/auth/guide?loginId=xx-xx-xx-xx-xx"
    }
}
```

