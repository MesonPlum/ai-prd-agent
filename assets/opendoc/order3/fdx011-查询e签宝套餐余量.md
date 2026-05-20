### 接口描述
查询企业机构用户名下当前套餐余量。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/orders/remaining-quantity?orgId=xx

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 是 | query | 机构账号ID |
| distributor | boolean | 否 | query    | 查询通过生态伙伴所购买的套餐，默认值 false<br/>**true **- 仅查询通过生态伙伴所购买的套餐<br/>**false **- 仅查询通过e签宝所购买的套餐（包含被共享的套餐） |
| orderType | string | 否 | query | 订单类型，默认：COMBINATION<br/>**COMBINATION** - 电子签名组合计费套餐<br/>**DIVISION** -电子签名分项计费套餐<br/>**AUTH **- 认证服务余额 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****（左右拖动查看完整描述）** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#E8323C;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data | | | | | object | 否 | 业务数据 |
|  | containUnlimitedOrder | | | | boolean | 是 | 是否按量后付费套餐<br/>**true **- 是<br/>**false **- 否<br/><font style="color:#E8323C;">注：仅查询通过生态伙伴所购买的套餐时，此字段返回值固定为 false。</font> |
| | totalRemainingQuantity | | | | float | 是 | 套餐总余量<br/><font style="color:#E8323C;">注：</font><br/>+ <font style="color:#E8323C;">只统计生效中的套餐余量，待生效、已失效等状态的套餐不被统计。</font><br/>+ <font style="color:#E8323C;">电子签名套餐的余量是份数，认证服务的余量是金额</font><br/>+ <font style="color:#E8323C;">认证服务余额需除以10000后才是剩余的金额（元）</font> |


### 请求示例
```http
GET https://openapi.esign.cn/v3/orders/remaining-quantity?orgId=0c5bd4**bfbf&distributor=false
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "containUnlimitedOrder": false,
        "totalRemainingQuantity": 200
    }
}
```

