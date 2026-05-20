#### 【触发条件】当在页面进行企业成员变更（企业成员的添加或者移除）后触发此回调通知
![](https://cdn.nlark.com/yuque/0/2024/png/447795/1730689302352-3188aa6b-51d9-47fb-b27e-9080b819fd9c.png)

#### 回调参数
回调通知数据接收，详见[企业控制台回调通知接收说明](https://qianxiaoxia.yuque.com/opendoc/notify3/iybhmua85odoer9u)。

| **参数名称** | | **必选** | **参数类型** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| action | | 是 |   string | 通知的业务类型，固定值：**<font style="color:#52C41A;">UPDATE_ORG_MEMBER</font>** |
| timestamp | | 是 | int64 | 回调通知发送时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| orgId | | 是 | string | 机构账号ID |
| orgName | | 是 | string | 机构名称 |
| bizType | | 是 | int32 | 1 - 新增成员<br/>2 - 删除成员 |
| memberPsnId | | 是 | string | 新增/删除的成员账号ID |
| memberPsnName | | 是 | string | 新增/删除的成员姓名 |


#### 通知示例
```json
{
    "orgName": "企业测试有限公司",
    "bizType": 1,
    "memberPsnId": "c92520ec8111112b34862246bd9b50f",
    "memberPsnName": "李四",
    "orgId": "eb75d38e647d411111edaa7904",
    "timestamp": 1730689105399,
    "action": "UPDATE_ORG_MEMBER"
}
```

