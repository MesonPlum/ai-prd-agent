回调通知Url地址配置方式和回调通知数据接收，详见签署提醒消息推送服务。

【触发条件】在一个审批流程中，审批经办人在审批页面主动转交审批任务，触发此回调通知。  
**回调参数：**

| **参数名** | | | **必填** | **参数类型** | **说明** |
| --- | --- | --- | :---: | :---: | --- |
| action | | | 是 | string | 标记该通知的业务类型，该通知固定为：**<font style="color:#52C41A;"></font>**<br/>**<font style="color:#52C41A;">PARTNER_APPROVAL_TASK_TRANS</font>** |
| timestamp | | | 是 | int64 | 回调通知触发时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| signFlowId | | | 是 | string | 所属签署流程ID |
| approvalFlowId | | | 是 | string | 审批流程ID |
| approvalTaskId | | | 是 | string | 审批任务ID |
| organization<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | 是 | object | 机构信息 |
|  | orgId | | 是 | string | 机构账号ID |
| | orgName | | 是 | string | 机构名称 |
| approver<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | 是 | object | 原审批人信息（转交人） |
|  | psnId | | 否 | string | 原审批人账号ID |
| | psnName | | 否 | string | 原审批人姓名 |
| newApprover<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | 是 | object | 新审批人信息（被转交人） |
|  | psnId | | 否 | string | 新审批人账号ID |
| | psnName | | 否 | string | 新审批人姓名 |


**通知示例：**

```json
{
    "action": "PARTNER_APPROVAL_TASK_TRANS",
    "approvalFlowId": "AF-2cb6d111b6080849",
    "approvalTaskId": "ab3e1116-c0e9-11ee-8fb0-062c085731b2",
    "approver": {
        "psnId": "50d5eda391111e29af32c4100b1bd29c",
        "psnName": "李四"
    },
    "newApprover": {
        "psnId": "7ffcaed11111c3aaca1d8f0ef0a8f6",
        "psnName": "张三"
    },
    "organization": {
        "orgId": "842ec8c111118ee80675fc91662f",
        "orgName": "esigntest霁林测试有限公司"
    },
    "signFlowId": "11cf0870a11110bb8124737960eae9a",
    "timestamp": 1706782235529
}
```

