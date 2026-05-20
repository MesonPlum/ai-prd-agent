回调通知Url地址配置方式和回调通知数据接收，详见签署提醒消息推送服务。

【触发条件】在一个审批流程中，某个审批节点的审批人的审批任务开启后，触发此回调通知。

**回调参数：**

| **参数名** | | | **必填** | **参数类型** | **说明** |
| --- | --- | --- | :---: | :---: | --- |
| action | | | 是 | string | 标记该通知的业务类型，该通知固定为：**<font style="color:#52C41A;"></font>**<br/>**<font style="color:#52C41A;">PARTNER_APPROVAL_TASK_START</font>** |
| timestamp | | | 是 | int64 | 回调通知触发时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| signFlowId | | | 是 | string | 所属签署流程ID |
| approvalFlowId | | | 是 | string | 审批流程ID |
| approvalNodeId | | | 是 | string | 审批节点ID |
| approvalNodeType | | | 是 | int | 审批节点类型<br/>1-或审（任意一名审批人同意，该节点即通过，如果没有设置审批流，默认为或审）<br/>2-会审（需所有审批人同意，该节点才可通过） |
| approvalUrl | | | 是 | string | 审批长链地址（永久有效） |
| approvalShortUrl | | | 是 | string | 审批短链地址（180天有效） |
| approvalTaskId | | | 是 | string | 审批任务ID |
| approver<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | 是 | object | 审批操作人信息 |
|  | psnId | | 否 | string | 审批人账号ID |
| | psnName | | 否 | string | 审批人姓名 |
| organization<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | 否 | object | 机构信息 |
|  | orgId | | 否 | string | 机构账号ID |
| | orgName | | 否 | string | 机构名称 |


**通知示例：**

```json
{
    "action": "PARTNER_APPROVAL_TASK_START",
    "approvalFlowId": "AF-2cb661116080e8b",
    "approvalNodeId": "d708cad_1631111359251",
    "approvalNodeType": 1,
    "approvalShortUrl": "https://smlt.esign.cn/FLQ2zkK",
    "approvalUrl": "https://smlh5.esign.cn/contract-flow/approval/seals?context=RMJ7pD2&approvalId=AF-2cb6a111180ebb&tsign_source_type=SIGN_LINK_WUKONG&tsign_source_detail=16R2mv%2F27h2Y5CkM9bwhboJI1J3vlJRfZSWcIsoCQiZlor%2FBjDAHDYjqRou4NZ2cLUfzqDWDgY3qEadxIkmYQRtK5oSH1Fean2CIzLt27bfs9kMW%2FCby%2Bxrv4oSFKYdjEi8pJX5Rly74d5dZPp3folV9Fwz78F%2F6b0wDdq%2BOAn9EEG%2BTQ6UFRmUlXzY0Ac4T%2FYX6tF6VYIS0XH7AvzeQiNFQBfTEghDKeYx0%2B9k5amg4%3D",
    "approvalTaskId": "ece93793-c0d8-1111-80ad-fea8a8dd3076",
    "approver": {
        "psnId": "7ffcaed8c1111118f0ef0a8f6",
        "psnName": "张贺"
    },
    "organization": {
        "orgId": "842ec8ce3fcb11110675fc91662f",
        "orgName": "测试有限公司"
    },
    "signFlowId": "961564e1ca111185acc48d0fd83f",
    "timestamp": 1706774842283
}
```

