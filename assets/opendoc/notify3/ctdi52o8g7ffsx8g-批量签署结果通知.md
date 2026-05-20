回调通知Url地址配置方式和回调通知数据接收，详见[签署回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/sblzg8)。

当用户一次性批量签署数量<font style="color:#DF2A3F;">超过100份</font>时，页面会进行异步签署，开发者通过该回调通知接收异步批量签署结果。



**回调参数**

| **参数名** | | | **必填** | **参数类型** | **说明** |
| --- | --- | --- | :---: | :---: | --- |
| action | | | 是 | string | 标记该通知的业务类型，该通知固定：**<font style="color:#52C41A;"></font>**<br/>**<font style="color:#52C41A;">BATCH_SIGN_FLOW_COMPLETE</font>** |
| timestamp | | | 是 | int64 | 回调通知触发时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| signFlowList | | | 否 | array | 签署流程列表 |
|  | signFlowId | | 否 | string | 签署流程ID |
| | status | | 否 | int | 签署是否成功<br/>0 - 失败<br/>1 - 成功 |
| | failReason | | 否 | string | 签署失败原因 |
| batchSerialId | | | 是 | string | 批量签署批次号 |


**通知示例**

```json
{
    "action": "BATCH_SIGN_FLOW_COMPLETE",
    "timestamp": 1736763577590,
    "batchSerialId": "api-batch-sign-a******ad46eede684b073",
    "signFlowList": [
        {
            "signFlowId": "a760d8b******5b4fcfe8eb",
            "status": 1
        },
        {
            "signFlowId": "81df55ae*******87eaa7987e",
            "status": 0,
            "failReason": "签署失败原因XXXX"
        },
        {
            "signFlowId": "649b4893e3*****e8b02eded",
            "status": 1
        },
      {"signFlowId":"...至少100个流程，中间省略..."}
    ]
}
```



