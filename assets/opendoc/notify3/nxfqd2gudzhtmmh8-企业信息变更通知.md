#### 【触发条件】当在页面进行企业信息变更（企业名字修改）成功后触发此回调通知
![](https://cdn.nlark.com/yuque/0/2024/png/447795/1704955853086-a7f76799-c8b9-469c-bddb-a371605d4ae8.png)

#### 回调参数
回调通知数据接收，详见[e签宝全网回调通知接收说明](https://qianxiaoxia.yuque.com/opendoc/notify3/etrrn6c04lb0294i)。

| **参数名称** | | **必选** | **参数类型** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| action | | 是 |   string | 通知的业务类型，固定值：**<font style="color:#52C41A;">UPDATE_ORG_NAME</font>** |
| timestamp | | 是 | int64 | 回调通知发送时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| orgId | | 是 | string | 机构账号ID |
| orgName | | 是 | string | 原机构名称（修改前的企业名字） |
| newOrgName | | 是 | string | 新机构名称（修改后的企业名字） |


#### 通知示例
```json
{
    "action": "UPDATE_ORG_NAME",
    "orgId": "c0e0574******56d65746b26398",
    "orgName": "旧的杭州天谷信息科技有限公司",
    "newOrgName": "新的杭州天谷信息科技有限公司",
    "timestamp": 1680745281887
}
```

