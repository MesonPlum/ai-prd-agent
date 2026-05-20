#### 【触发条件】当appid所属企业主体下的成员在e签宝官网设置了信息采集表单，并成功发起填写任务时触发。
![](https://cdn.nlark.com/yuque/0/2025/png/447795/1765940503942-80492ae7-7a86-44f6-a7d8-109e69558a0f.png)

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1765941222371-796af8be-d861-4d3f-9813-6482c0c64251.png)

#### 回调参数
回调通知数据接收，详见[e签宝全网回调通知接收说明](https://qianxiaoxia.yuque.com/opendoc/notify3/etrrn6c04lb0294i)。

| **参数名称** | | **必选** | **参数类型** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| action | | 是 |   string | 通知的业务类型，固定值：**<font style="color:#52C41A;">COLLECT_TASK_INITIATE</font>** |
| timestamp | | 是 | int64 | 回调通知发送时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| formId | | 是 | string | 表单ID |
| formName | | 是 | string | 表单名称 |
| taskId | | 是 | string | 任务ID |
| taskName | | 是 | string | 任务名称 |
| creatorPsnId | | 是 | string | 创建人ID |
| creatorPsnName | | 是 | string | 创建人姓名 |
| deadline | | 是 | long | 截止时间（毫秒级时间戳） |
| allowRepeatSubmit | | 是 | boolean | 是否允许重复提交<br/>true-允许（提交次数限制选择：不限制）<br/>false-不允许（提交次数限制选择：每个用户只能提交一次） |


#### 通知示例
```json
{
    "formId": "form10536221117757749248",
    "creatorPsnName": "张三",
    "formName": "表单1",
    "action": "COLLECT_TASK_INITIATE",
    "taskName": "任务名称1",
    "deadline": 1767196799000,
    "taskId": "task105361111383681536",
    "creatorPsnId": "a76bff5c62c911115dff8943f498442",
    "allowRepeatSubmit": true,
    "timestamp": 1765939193365
}
```

