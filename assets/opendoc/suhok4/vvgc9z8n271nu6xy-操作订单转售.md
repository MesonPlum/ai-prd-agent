### 接口描述
获取到可转售主订单后，开发者可通过该接口将购买的订单份额转售给对应用户。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/orders/resell

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称****<font style="color:#8C8C8C;"></font>** | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#8C8C8C;">（请左右滑动查看完整描述）</font>** |
| --- | :---: | :---: | :---: | --- |
| orderId | string | 是 | body | 转售主订单号 |
| resellQuantity | BigDecimal | 是 | body | 转售量 |
| effectiveTime | long | 是 | body | 生效时间，时间戳格式，默认单位毫秒 |
| expireTime | long    | 是 | body | 失效时间，时间戳格式，默认单位毫秒 |
| orgIDCardType | string | 是 | body | 被转售方证件类型<br/>+ CRED_ORG_USCC 统一社会信用代码<br/>+ CRED_ORG_REGCODE 工商注册号 |
| orgIDCardNum | string | 是 | body | 被转售方证件号 |


### 响应参数
| **参数名称** | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data | | | object | 否 | 业务信息 |
|    <br/>   <br/>   <br/>    | resellOrders | | array | 是 | 转售订单信息 |
| |  | resellOrderId | string | 是 | 转售子订单号 |
| | | resellQuantity | BigDecimal | 是 | 转售量 |


### 请求示例
```json
{
  "orderId": "Z202******05152",
  "resellQuantity": 1,
  "effectiveTime": 1684401891000,
  "expireTime": 1734451199000,
  "orgIDCardType": "CRED_ORG_USCC",
  "orgIDCardNum": "91100*****000673"
}
```

### 响应示例
```json
{
  "code": 0,
  "message": "成功",
  "data": {
    "resellOrders": [
      {
        "resellOrderId": "ZS202305180179869417",
        "resellQuantity": 1
      }
    ]
  }
}
```

### 错误码
| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1459999 | 系统异常，请联系e签宝服务人员处理 |
| 1459001 | 转售时长超过限制 |
| 1459002 | 被转售方证件号在客户信息中不存在，请邀请被转售方在e签宝平台使用此证件号进行实名认证 |
| 1459003 | 转售用户信息异常，请联系e签宝服务人员处理 |
| 1459004 | 订单剩余可转售量不足或有效期范围不满足，转售失败 |
| 1459005 | 订单已过期，无法转售 |
| 1459006 | 订单余量不足，无法转售 |
| 1459007 | 按量后付充值式订单暂不支持api转售 |
| 1459008 | 账户类型不合法，请联系e签宝服务人员处理 |
| 1459009 | 查询用户信息失败，请联系e签宝服务人员处理 |
| 1459010 | 当前客户信息匹配失败 |
| 1459011 | 订单不是转售订单,无法对该订单进行转售 |
| 1459012 | 转售数据不合法，请确认转售订单是当前企业订单 |
| 1459013 | 订单非生效状态，无法转售 |
| 1459014 | 订单未在生效时间内，无法转售 |
| 1459015 | 转售订单不能为空 |
| 1459016 | 被转售用户信息不能为空 |
| 1459017 | 转售量必须为正整数 |
| 1459018 | 有效期开始时间和截止时间不合法 |
| 1459019 | 子订单价格不能低于主订单价格 |
| 1459020 | 正在处理，请稍等！ |
| 1459099 | 参数错误:{} |


  
 

