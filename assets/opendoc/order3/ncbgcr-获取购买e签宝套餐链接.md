> [**必须确保【购买方企业】已授予资源管理权限（manage_org_resource），点击查看如何授权**](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/kcbdu7)
>

### 接口描述
用于获取免登录购买e签宝套餐的页面链接。

:::warning
**注意事项：**

+ <font style="color:#E8323C;">【生态合作伙伴专用】</font>注册成为e签宝的生态伙伴，即可通过本接口来获取购买e签宝套餐页面链接。

 （在对接此接口前，请提供您的应用AppId及所属环境给e签宝的交付人员或商务经理协助配置。）

+ 操作购买的经办人<font style="color:rgb(0, 0, 0);background-color:rgb(255, 251, 230);">须确保已加入企业组织下，</font><font style="color:rgb(38, 38, 38);background-color:rgb(255, 251, 230);">点击前往</font>[“企业成员服务API”](https://open.esign.cn/doc/opendoc/employee/has759)<font style="color:rgb(0, 0, 0);background-color:rgb(255, 251, 230);">添加成员。</font>
+ 生态伙伴<font style="color:#000000;">可以自行推送此链接或集成到自身业务系统中，以便企业经办人员进行购买e签宝套餐操作。</font>
+ 通过此链接购买成功后，生态伙伴可查阅[购买套餐回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/xfgirh)来获取套餐购买信息。

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/orders/org-place-order-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 是 | body | 机构账号ID（购买方orgId） |
| transactorPsnId | string | 是 | body | 经办人个人账号ID（购买操作个人psnId） |
| redirectUrl | string | 否 | body | 重定向地址，用于设置套餐购买后页面的跳转。<br/>+ 重定向地址需是以http或https开头的互联网可访问的链接。<br/>+ 购买后，用户点击【返回】按钮时触发页面跳转。 |
| notifyUrl | string | 否 | body | 回调通知地址，购买完成后发送回调通知给该地址 |
| customBizNum | string | 否 | body | <font style="color:rgb(64, 64, 64);">自定义业务编号（用于关联开发者的业务系统）</font><br/><font style="color:rgb(232, 50, 60);">【注】：</font><font style="color:rgb(64, 64, 64);">接口不对该参数的值做重复性校验。</font><br/>+ 购买**融合专用版**套餐，自定义业务编号通过[融合专用版套餐购买完成通知](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/sxo8r0)返回；<br/>+ 购买**单方用印版**套餐，自定义业务编号通过[单方用印版套餐购买完成通知](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/wt7g27)返回。 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****（左右拖动查看完整描述）** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | orgPlaceOrderUrl | | | | string | 否 | 购买套餐页面Url <font style="color:#E8323C;">（有效期60分钟）</font> |


### 请求示例
```json
{
    "orgId": "0c5bd4924**648bfbf",
    "transactorPsnId": "c7e0029472914**10541e7",    
    "redirectUrl": "https://www.xxx.com",
    "notifyUrl": "http://xx.xx.xx.172:8081/CSTNotify/asyn/notify",
    "customBizNum": "这是一串开发者内部系统自定义的编号"
}
```

### 响应示例
```json
{
    "code":0,
    "message":"成功",
    "data":{
        "orgPlaceOrderUrl":"https://openapi.esign.cn/auth/guide?loginId=xx-xx-xx-xx-xxx"
    }
}
```

