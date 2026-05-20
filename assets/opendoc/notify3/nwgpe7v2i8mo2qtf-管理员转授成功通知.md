#### 【触发条件】当在页面进行管理员转授成功后触发此回调通知
![](https://cdn.nlark.com/yuque/0/2024/png/447795/1704955893042-76585ab7-7a32-44b7-892e-2363ec493d20.png)

#### 回调参数
回调通知数据接收，详见[企业控制台回调通知接收说明](https://qianxiaoxia.yuque.com/opendoc/notify3/iybhmua85odoer9u)。

| **参数名称** | | **必选** | **参数类型** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| action | | 是 |   string | 通知的业务类型，固定值：**<font style="color:#52C41A;">DELEGATE_ADMIN</font>** |
| timestamp | | 是 | int64 | 回调通知发送时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| orgId | | 是 | string | 机构账号ID |
| adminId    | | 是 | string | 旧管理员个人账号ID |
| newAdminId | | 是 | string | 新管理员个人账号ID |


#### 通知示例
```json
{
    "action": "DELEGATE_ADMIN",
    "orgId": "c0e0574******56d65746b26398",
    "adminId": "1110574******56d65746b26222",
    "newAdminId": "222574******56d65746b26333",
    "timestamp": 1680745281887
}
```



