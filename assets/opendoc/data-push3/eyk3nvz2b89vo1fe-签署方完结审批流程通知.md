回调通知Url地址配置方式和回调通知数据接收，详见签署提醒消息推送服务。

【触发条件】在一个签署流程中，某个签署任务的审批流程结束，触发此回调通知。

**回调参数：**

| **参数名** | | | **必填** | **参数类型** | **说明** |
| --- | --- | --- | :---: | :---: | --- |
| action | | | 是 | string | 标记该通知的业务类型，该通知固定为：**<font style="color:#52C41A;"></font>**<br/>**<font style="color:#52C41A;">PARTNER_APPROVAL_FINISH</font>** |
| timestamp | | | 是 | int64 | 回调通知触发时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| signFlowId | | | 是 | string | 所属签署流程ID |
| approvalFlowId | | | 是 | string | 审批流程ID |
| <font style="color:rgb(51, 51, 51);">approvalFlow</font><font style="color:rgb(0, 0, 0);">Status</font> | | | 是 | int | 审批流程状态<br/>2-审批通过<br/>3-审批驳回<br/>4-审批撤回<br/>5-审批终止（超时未审批） |
| organization<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | 否 | object | 机构信息 |
|  | orgId | | 否 | string | 机构账号ID |
| | orgName | | 否 | string | 机构名称 |


**通知示例：**

```json
{
    "action": "PARTNER_APPROVAL_FINISH",
    "approvalFlowId": "AF-2cb611111e8b",
    "approvalFlowStatus": 2,
    "organization": {
        "orgId": "842ec8c11111e80675fc91662f",
        "orgName": "测试有限公司"
    },
    "signFlowId": "961564e1ca1111118d0fd83f",
    "timestamp": 1706781391888
}
```

