回调通知Url地址配置方式和回调通知数据接收，详见[签署回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/sblzg8)。

当整个签署流程完结，触发该类型的回调通知。

:::warning
**<font style="color:#E8323C;">【触发条件】</font>**

（1）若设置了自动完结（`autoFinish`为true）的流程，全部签署方签署完成后，流程自动完结，触发此回调通知；

（2）设置了非自动完结（`autoFinish`为false）的流程，全部签署方签署完成后，调用[【完结签署流程】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/ynwqsm)接口成功后触发此回调通知；

（3）流程中任一签署方拒绝签署，触发此回调通知，注意`signFlowStatus`返回值为 **7 - **已拒签；

（4）当超过了流程中设置的签署截止日期，触发此回调通知，注意`signFlowStatus`返回值为 **5 - **已过期；

（5）发起方撤销签署流程，触发此回调通知，注意`signFlowStatus`返回值为 **3 - **已撤销；

:::

**回调参数**

| **参数名** | **必填** | **参数类型** | **说明** |
| :--- | :---: | :---: | :--- |
| action | 是 | string | 整个签署流程的完结状态通知，该通知固定值为：<br/>**<font style="color:#52C41A;">SIGN_FLOW_COMPLETE</font>**<br/>此参数可用于判断回调通知事件类型。 |
| timestamp | 是 | int64 | 回调通知触发时间（如重试多次均返回第一次时间，毫秒级时间戳） |
| signFlowId | 是 | string | 签署流程ID |
| signFlowTitle | 是 | string | 签署流程标题 |
| signFlowStatus | 是 | string | <font style="color:#DF2A3F;">整个签署流程</font>的最终状态（注意这不是签署流程中某一个签署方状态）<br/>**2** - 已完成（所有签署方完成签署）<br/>**3** - 已撤销（发起方撤销签署任务）<br/>**5 **- 已过期（<font style="background-color:#F8F8F8;">签署截止日到期后触发</font>）<br/>**7** - 已拒签（签署方拒绝签署） |
| statusDescription | 是 | string | 当流程非签署完成，其他原因结束时，附加原因描述 |
| signFlowCreateTime | 是 | int64 | 签署流程创建时间（Unix时间戳格式，单位：毫秒） |
| signFlowStartTime | 是 | int64 | 签署流程开启时间（Unix时间戳格式，单位：毫秒） |
| signFlowFinishTime | 是 | int64 | 签署流程完结时间（Unix时间戳格式，单位：毫秒） |


#### 通知示例
```json

{
  "action": "SIGN_FLOW_COMPLETE",
  "timestamp": 1650265864671,
  "signFlowId": "2bf5e92***0a1ab0c2",
  "signFlowTitle": "xx企业劳动合同签署",
  "signFlowStatus": "2",
  "statusDescription": "完成",
  "signFlowCreateTime": 1650265502814,
  "signFlowStartTime": 1650265503000,
  "signFlowFinishTime": 1650265864000
}
```



