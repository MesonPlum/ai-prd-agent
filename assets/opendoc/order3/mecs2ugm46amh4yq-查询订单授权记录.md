### 接口描述
当企业用户将订单授权给其他企业后，可调用此接口，查询该订单相关的全部授权记录（包含历史的）。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/orders/authed-order-list

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;"></font>** |
| --- | :---: | :---: | :---: | --- |
| orderNum | string | 是 | body | 授权主订单编号<br/><font style="color:#DF2A3F;">注：</font>仅支持查询当前应用（appId）自身企业的订单，或当前应用（appId）被授予企业资源管理权限后，对应企业的订单。建议先用[《查询套餐订单列表》](https://qianxiaoxia.yuque.com/opendoc/order3/ozl166)接口查询订单编号。 |
| pageNum | int32 | 否 | body | 查询页码，默认1 |
| pageSize | int32 | 否 | body | 单页展示的最大数量，最大100，默认10 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
| | total | | | | int32 | 否 | 查询结果总量 |
| | totalPages | | | | int32 | 否 | 查询结果总页数（返回总量可支持的最大页码） |
| | orderList | | | | array | 否 | 授权记录列表 |
| |  | authOrderId | | | string | 否 | 被授权订单编号 |
| | | authedGidName | | | string | 否 | 被授权方名称 |
| | | authTime | | | int64 | 否 | 授权时间 |
| | | consumeAmount | | | string | 否 | 订单使用量 |
| | | maxAmount | | | string | 否 | 订单剩余可用量 |
| | | totalAmount | | | string | 否 | 订单总授权量 |
| | | authType | | | int32 | 否 | 授权类型<br/>0-共享授权<br/>2-配额授权 |
| | | units | | | string | 否 | 订单计量单位（份，次，G，条，份/年） |


### 请求示例
```json
{
    "orderNum": "O202505230312381111",
    "pageNum": 1,
    "pageSize": 10
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
                "authOrderId": "O202505230312381111",
                "authedGidName": "甲电子商务有限公司",
                "authTime": 1747995173000,
                "consumeAmount": "192",
                "maxAmount": "8",
                "totalAmount": "200",
                "authType": 2,
                "units": "份"
            },
            {
                "authOrderId": "O202505230312381111",
                "authedGidName": "乙电子商务有限公司",
                "authTime": 1747995173000,
                "consumeAmount": "301",
                "maxAmount": "2699",
                "totalAmount": "3000",
                "authType": 0,
                "units": "份"
            },
            {
                "authOrderId": "O202505230312381111",
                "authedGidName": "丙电子商务有限公司",
                "authTime": 1747994036000,
                "consumeAmount": "100",
                "maxAmount": "0",
                "totalAmount": "100",
                "authType": 2,
                "units": "份"
            }
        ]
    }
}
```

