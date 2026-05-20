**【触发条件】当开发者发起合同拟定和签署流程后，用户在页面进行合同拟定，合同拟定后才会触发签署过程的发起，此时可能会因为计费不足、文件转换等问题导致发起签署失败****<font style="color:#DF2A3F;">（大多数场景都是能发起成功的）</font>****，签署发起的结果会通过回调消息通知给到开发者。 ****<font style="color:#DF2A3F;">（该通知仅支持事件订阅方式配置，详见</font>**[**开放平台配置回调通知订阅**](https://qianxiaoxia.yuque.com/opendoc/notify3/qbgdz62humots27s#Ngtbv)**<font style="color:#DF2A3F;">）</font>**

#### 回调参数
| **参数名称** | | | **必选** | **参数类型** | **参数说明** |
| --- | --- | --- | --- | --- | --- |
| action | | | 是 | string | 标记该通知的业务类型，该通知固定为：**<font style="color:#52C41A;"></font>**<br/>**<font style="color:#52C41A;">SIGN_FLOW_INITIATE_RESULT</font>** |
| timestamp | | | 是 | int64 | 回调通知发送时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| signFlowId | | | 是 | string | 签署流程ID |
| result | | | 是 | string | SUCCESS - 发起成功<br/>FAIL - 发起失败 |
| failReason | | | 是 | string | 失败原因<font style="color:#DF2A3F;">（只有发起失败时返回）</font><br/>1 - 扣费方账号签署套餐余量不足<br/>2 - 文档格式转换失败<br/>99 - 服务异常<font style="color:#DF2A3F;">（请联系e签宝技术人员确认具体原因）</font> |


#### 签署流程发起结果通知示例
```json
{
    "action": "SIGN_FLOW_INITIATE_RESULT",
    "timestamp": 1730094774527,
    "signFlowId": "e5d25b6093054ea4aca5c363af16a264",
    "result": "SUCCESS"
}
```

#### 
