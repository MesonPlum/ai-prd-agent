回调通知Url地址配置方式和回调通知数据接收，详见审批回调通知接收说明。

【触发条件】在一个签署流程中，某个审批任务成功发起（目前只有签署中企业印章的用印审批类型），触发此回调通知。

**印章用印审批成功发起案例：**

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1706776383582-b2f51f31-815f-442d-bcd4-dfb256e5c49a.png)

**回调参数：**

| **参数名** | | | **必填** | **参数类型** | **说明** |
| --- | --- | --- | :---: | :---: | --- |
| action | | | 是 | string | 标记该通知的业务类型，该通知固定为：**<font style="color:#52C41A;">INITIATE_APPROVAL</font>****<font style="color:rgba(128,194,14,1);"></font>** |
| timestamp | | | 是 | int64 | 回调通知触发时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| signFlowId | | | 是 | string | 签署流程ID |
| <font style="color:rgb(51, 51, 51);">approval</font><font style="color:rgb(23, 43, 77);">FlowId</font> | | | 是 | string | 审批流程ID |
| operator<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | 是 | object | 发起审批操作人信息 |
|  | psnId | | 否 | string | 操作人账号ID |
| | psnName | | 否 | string | 操作人姓名 |
| organization<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | 否 | object | 机构信息 |
|  | orgId | | 否 | string | 机构账号ID |
| | orgName | | 否 | string | 机构名称 |


**通知示例：**

```json
{
    "action": "INITIATE_APPROVAL",
    "approvalFlowId": "AF-2cb6682bf6111e8b",
    "operator": {
        "psnId": "c92520ec89ef4512b31112246bd9b50f",
        "psnName": "李四"
    },
    "organization": {
        "orgId": "842ec8ce3fcb41e781110675fc91662f",
        "orgName": "测试有限公司"
    },
    "signFlowId": "961564e1ca1e4078b111acc48d0fd83f",
    "timestamp": 1706774841989
}
```

