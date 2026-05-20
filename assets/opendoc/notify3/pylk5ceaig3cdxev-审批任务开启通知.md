回调通知Url地址配置方式和回调通知数据接收，详见审批回调通知接收说明。

【触发条件】在一个审批流程中，某个审批节点的审批人的审批任务开启后，触发此回调通知。

**回调参数：**

| **参数名** | | | **必填** | **参数类型** | **说明** |
| --- | --- | --- | :---: | :---: | --- |
| action | | | 是 | string | 标记该通知的业务类型，该通知固定为：**<font style="color:#52C41A;">APPROVAL_TASK_START</font>** |
| timestamp | | | 是 | int64 | 回调通知触发时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| signFlowId | | | 是 | string | 签署流程ID |
| <font style="color:rgb(51, 51, 51);">approval</font><font style="color:rgb(23, 43, 77);">FlowId</font> | | | 是 | string | 审批流程ID |
| approvalNodeId | | | 是 | string | 审批节点ID |
| approvalNodeType | | | 是 | int | 审批节点类型<br/>1-或审（任意一名审批人同意，该节点即通过，如果没有设置审批流，默认为或审）<br/>2-会审（需所有审批人同意，该节点才可通过） |
| approvalTaskId | | | 是 | string | 审批任务ID |
| approvalUrl | | | 是 | string | 审批长链接地址（永久有效） |
| approvalShortUrl | | | 是 | string | 审批短链接地址（30天有效） |
| approver<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | 是 | object | 审批操作人信息 |
|  | psnId | | 否 | string | 审批人账号ID |
| | psnName | | 否 | string | 审批人姓名 |
| organization<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | 否 | object | 机构信息 |
|  | orgId | | 否 | string | 机构账号ID |
| | orgName | | 否 | string | 机构名称 |


**通知示例：**

```json
{
    "action": "APPROVAL_TASK_START",
    "approvalFlowId": "AF-707ad9de71111111120d4d6f7e6e98",
    "approvalNodeId": "d708cad_111111359251",
    "approvalNodeType": 1,
    "approvalShortUrl": "https://smlt.esign.cn/rHc111RG",
    "approvalTaskId": "f2f1049d-1111-11f0-8309-9ed525aa0ec5",
    "approvalUrl": "https://smlfront.esign.cn:8880/approve-manage-front/approve/detail?approvalId=AF-707ad11111111120d4d6f7e6e98&context=o87Qrw3",
    "approver": {
        "psnId": "bf565cbf5a11111116523dc2342c4",
        "psnName": "测试张三"
    },
    "organization": {
        "orgId": "745498ac7c11111115aeecef999b",
        "orgName": "测试专用企业"
    },
    "signFlowId": "7131085a27511111a69a4de75796",
    "timestamp": 1753365798577
}
```

