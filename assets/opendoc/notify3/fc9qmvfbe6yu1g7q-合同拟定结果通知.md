**【触发条件】当开发者发起合同拟定后，用户在页面进行合同拟定，合同拟定的最终完成或者拒填等状态，会通过回调消息通知给开发者。 **

#### 回调参数
| **参数名称** | | | **必选** | **参数类型** | **参数说明** |
| --- | --- | --- | --- | --- | --- |
| action | | | 是 | string | 标记该通知的业务类型，该通知固定为：**<font style="color:#52C41A;"></font>**<br/>**<font style="color:#52C41A;">DRAFT_COMPLETE</font>** |
| timestamp | | | 是 | int64 | 回调通知发送时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| draftStatus | | | 是 | int | 拟定流程状态<br/>2-完成<br/>3-撤销<br/>4-拒填<br/>5-过期（填写截至日期到期后触发） |
| signFlowId | | | 是 | string | 签署流程id |
| signFlowTitle    | | | 是 | string | 签署流程标题 |
| draftStartTime | | | 是 | int64 | 拟定流程开启时间（毫秒级时间戳格式） |
| draftFinishTime | | | 是 | int64 | 拟定流程结束时间（毫秒级时间戳格式） |


#### 合同拟定结果通知示例
```json
{
    "action": "DRAFT_COMPLETE",
    "timestamp": 1676977689821,
    "signFlowId": "53d79b5*****e1495661b1c2",
    "signFlowTitle": "这是本次签署任务的主题",
    "draftStatus": 2,
    "draftStartTime": 1676977634000,
    "draftFinishTime": 1676977688000
}
```

#### 
