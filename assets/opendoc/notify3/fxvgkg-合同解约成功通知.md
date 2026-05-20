回调通知Url地址配置方式和回调通知数据接收，详见[签署回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/sblzg8)。

触发节点：当签署人发起解约，且解约协议由相关签署方签署完成并自动完结后，触发该通知。

**回调参数**

| **参数名** | | | **必填** | **参数类型** | **说明** |
| --- | --- | --- | :---: | :---: | --- |
| action | | | 是 | string | 标记该通知的业务类型，该通知固定为：**<font style="color:#52C41A;"></font>**<br/>**<font style="color:#52C41A;">SIGN_FILE_RESCINDED</font>** |
| timestamp | | | 是 | int64 | 回调通知触发时间 |
| signFlowId | | | 是 | string | 原签署流程ID |
| rescissionSignFlowId | | | 是 | string | 对应的**解约协议**签署流程ID |
| rescissionFileIds | | | 是 | array | 完成解约的文件ID列表 |


**通知示例**

```json
{
    "action":"SIGN_FILE_RESCINDED",
    "timestamp":1656313026176,
    "signFlowId":"88d03f***88cef9",
    "rescissionSignFlowId":"e7176625***e676586ff1b",
    "rescissionFileIds":["a4c5e***f34c2f4"]
}
```



