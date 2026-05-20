### 接口描述
开发者可通过该接口查询appid所属企业指定时间段内对应套餐商品可转售的订单列表信息，以及转售订单的余额信息。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/orders/resell-order

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称****<font style="color:#8C8C8C;"></font>** | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#8C8C8C;">（请左右滑动查看完整描述）</font>** |
| --- | :---: | :---: | :---: | --- |
| commodityId | string | 是 | body | e签宝内部商品id |
| orderStartTimeFrom | long    | 否 | body | 下单开始时间，时间戳格式，默认单位毫秒 |
| orderStartTimeTo    | long    | 否 | body | 下单结束时间，时间戳格式，默认单位毫秒 |
| pageNum    | int | 否 | body | 分页页码<br/>默认1 |
| pageSize | int    | 否 | body | 每页记录数<br/>单页展示的最大数量，最大100，默认20    |


### 响应参数
| **参数名称** | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data | | | object | 否 | 业务信息 |
|    <br/>   <br/>   <br/>    | total | | int | 是 | 查询到的结果总数 |
| | totalPages | | int | 是 | 总页数 |
| | orderList | | array | 是 | 订单列表详情 |
| | | orderId | string | 否 | 订单号 |
| | | commodityId | int | 否 | e签宝内部商品id |
| | | commodityName | string | 否 | 商品名称 |
| | | units | string | 否 | 计量单位。<br/>例：份、次等 |
| | | usedQuantity    | BigDecimal    | 否 | 转售量 |
| | | remainingQuantity    | BigDecimal    | 否 | 剩余转售量 |
| | | specification    | BigDecimal    | 否 | 订单总量 |
| | | effectiveTime    | int | 否 | 订单生效时间 |
| | | expireTime    | int | 否 | 订单失效时间 |


### 请求示例
```json
{
  "commodityId": "40"
}
```

### 响应示例
```json
{
  "code": 0,
  "message": "成功",
  "data": {
    "total": 1,
    "totalPages": 1,
    "orderList": [
      {
        "orderId": "Z2022******5152",
        "commodityId": "40",
        "commodityName": "电子签名服务（按份）",
        "units": "份",
        "usedQuantity": 1,
        "remainQuantity": 99,
        "specification": 100,
        "effectiveTime": 1671120000000,
        "expireTime": 1734451199000
      }
    ]
  }
}
```

  
 

