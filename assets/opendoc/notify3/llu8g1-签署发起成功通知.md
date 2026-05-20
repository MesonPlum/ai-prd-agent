回调通知Url地址配置方式和回调通知数据接收，详见[签署回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/sblzg8)。

<font style="color:#F5222D;">【触发条件】</font>当用户通过页面发起签署流程后触发。（API接口直接创建的流程，不会触发此通知）

**回调参数**

| **参数名** | | | **必填** | **参数类型** | **说明** |
| --- | --- | --- | :---: | :---: | --- |
| action | | | 是 | string | 签署流程发起成功的通知，该通知固定值为：**<font style="color:#52C41A;">SIGN_FLOW_INITIATED</font>**<br/>此参数可用于判断回调通知事件类型。 |
| timestamp | | | 是 | int64 | 回调通知触发时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| signFlowId | | | 是 | string | 签署流程ID |
| customBizNum | | | 是 | string | 自定义业务编号，取值【通过页面发起签署】中的customBizNum参数 |


**通知示例**

```json
{
    "action":"SIGN_FLOW_INITIATED",
    "timestamp":1650262138252,
    "signFlowId":"38fe9cd191**bf9eefe74",
    "customBizNum":"这是一串开发者自定义的业务编号"
}
```



