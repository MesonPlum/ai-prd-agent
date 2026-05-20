回调通知Url地址配置方式和回调通知数据接收，详见[签署回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/sblzg8)。

触发节点：当签署人在页面上发起解约后触发。

**回调参数**

| **参数名** | | | **必填** | **参数类型** | **说明** |
| --- | --- | --- | :---: | :---: | --- |
| action | | | 是 | string | 标记该通知的业务类型，该通知固定为：**<font style="color:#52C41A;">SIGN_FILE_RESCISSION_INITIATE</font>** |
| timestamp | | | 是 | int64 | 回调通知触发时间 |
| signFlowId | | | 是 | string | 原签署流程ID |
| rescissionSignFlowId | | | 是 | string | 对应的**解约协议**签署流程ID |
| rescissionFileIds | | | 是 | array | 发起解约的文件ID列表 |
| rescindReason | | | 是 | string | 解约原因 |
| additionalComments | | | 否 | string | 附加说明 |


**通知示例**

```json
{
    "action": "SIGN_FILE_RESCISSION_INITIATE",
    "signFlowId": "3e0d52b6*****2e9550d73",
    "rescissionSignFlowId": "742ff61c0*****96c85239d09d",
    "rescissionFileIds": [
        "6ed2e3a*****9fb77c9df5a"
    ],
    "timestamp": 1671697336193,
    "rescindReason": "条款内容有误",
    "additionalComments": "张三信息错误"
}
```



