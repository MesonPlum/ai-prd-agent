回调通知Url地址配置方式和回调通知数据接收，详见审批回调通知接收说明。

【触发条件】在一个审批流程中，某个审批节点的审批人审批任务完成后，触发此回调通知。  
**回调参数：**

| **参数名** | | | **必填** | **参数类型** | **说明** |
| --- | --- | --- | :---: | :---: | --- |
| action | | | 是 | string | 标记该通知的业务类型，该通知固定为：**<font style="color:#52C41A;">APPROVAL_TASK_COMPLETE</font>** |
| timestamp | | | 是 | int64 | 回调通知触发时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| signFlowId | | | 是 | string | 签署流程ID |
| <font style="color:rgb(51, 51, 51);">approval</font><font style="color:rgb(23, 43, 77);">FlowId</font> | | | 是 | string | 审批流程ID |
| approvalNodeId | | | 是 | string | 审批节点ID |
| approvalNodeType | | | 是 | int | 审批节点类型<br/>1-或审（任意一名审批人同意，该节点即通过，如果没有设置审批流，默认为或审）<br/>2-会审（需所有审批人同意，该节点才可通过） |
| approvalTaskId | | | 是 | string | 审批任务ID |
| approvalTaskResult | | | 是 | int | 审批任务结果<br/>1-通过<br/>2-驳回 |
| description | | | 否 | string | 审批结果备注 |
| approver<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | 是 | object | 审批操作人信息 |
|  | psnId | | 否 | string | 审批人账号ID |
| | psnName | | 否 | string | 审批人姓名 |
| organization<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | 否 | object | 机构信息 |
|  | orgId | | 否 | string | 机构账号ID |
| | orgName | | 否 | string | 机构名称 |


**通知示例：**

```json
{
    "action": "APPROVAL_TASK_COMPLETE",
    "approvalFlowId": "AF-2cb6682bf6080e8b",
    "approvalNodeId": "d708cad_1630553359251",
    "approvalNodeType": 1,
    "approvalTaskId": "ece93793-c0d8-11ee-80ad-fea8a8dd3076",
    "approvalTaskResult": 1,
    "approver": {
        "psnId": "7ffcaed8c1b146c3aaca1d8f0ef0a8f6",
        "psnName": "张贺"
    },
    "description": "审批通过",
    "organization": {
        "orgId": "842ec8ce3fcb41e78ee80675fc91662f",
        "orgName": "esigntest霁林测试有限公司"
    },
    "signFlowId": "961564e1ca1e4078b885acc48d0fd83f",
    "timestamp": 1706781391909
}
```

