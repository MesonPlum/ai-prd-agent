### 接口描述
开发者可根据被转售人身份信息以及转售主订单号，查询指定时间段内转售的订单列表信息。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/orders/reselled-order-list

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称****<font style="color:#8C8C8C;"></font>** | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#8C8C8C;">（请左右滑动查看完整描述）</font>** |
| --- | :---: | :---: | :---: | --- |
| orderId | string | 是 | body | 转售主订单号 |
| orgIDCardType | string | 否 | body | 被转售方证件类型<br/>+ CRED_ORG_USCC 统一社会信用代码<br/>+ CRED_ORG_REGCODE 工商注册号 |
| orgIDCardNum | string | 否 | body | 被转售方证件号 |
| pageNum | int | 否 | body | 分页页码 |
| pageSize | int | 否 | body | 每页记录数 |
| resellStartTimeFrom | long | 否 | body | 转售操作开始时间，时间戳格式，默认单位毫秒 |
| resellStartTimeTo | long    | 否 | body | 转售操作结束时间，时间戳格式，默认单位毫秒 |


### 响应参数
| **参数名称** | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data | | | object | 否 | 业务信息 |
|    <br/>   <br/>   <br/>    | total | | int | 是 | 查询到的结果总数 |
| | totalPages | | int | 是 | 总页数 |
| | resellOrders | | array | 是 | 转售订单信息 |
| |  | resellOrderId | string | 否 | 子订单号 |
| | | resellQuantity | BigDecimal    | 否 | 子订单转售量 |
| | | remainingQuantity | BigDecimal | 否 | 子订单剩余可使用量 |
| | | buyerName | string | 否 | 被转售方名称 |
| | | operateTime | long | 否 | 转售操作时间，时间戳格式，默认单位毫秒 |
| | | effectiveTime | long    | 否 | 转售子订单生效时间，时间戳格式，默认单位毫秒 |
| | | expireTime | long    | 否 | 转售子订单失效时间，时间戳格式，默认单位毫秒 |


### 请求示例
```json
{
  "orderId": "Z2022*****5152",
  "orgIDCardType": "CRED_ORG_USCC",
  "orgIDCardNum": "91100*****673",
  "resellStartTimeFrom": 1671170703000,
  "resellStartTimeTo": 1734451199000
}
```

### 响应示例
```json
{
  "code": 0,
  "message": "成功",
  "data": {
    "total": 3,
    "totalPages": 1,
    "orderList": [
      {
        "resellOrderId": "ZS20******869417",
        "resellQuantity": 2,
        "remainingQuantity": 1,
        "buyerName": "XXXXX企业",
        "operateTime": 1684401897000,
        "effectiveTime": 1684401891000,
        "expireTime": 1734451199000
      },
      {
        "resellOrderId": "ZS2023******644550",
        "resellQuantity": 1,
        "remainingQuantity": 1,
        "buyerName": "XXXXX企业",
        "operateTime": 1684401880000,
        "effectiveTime": 1684425600000,
        "expireTime": 1734451199000
      }
    ]
  }
}
```

