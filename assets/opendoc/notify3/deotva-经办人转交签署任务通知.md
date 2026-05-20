回调通知Url地址配置方式和回调通知数据接收，详见[签署回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/sblzg8)。

**触发场景1**

企业签署场景，当企业签署方在e签宝企业空间配置接收人和接收权限，接口发起签署时指定的经办人账号非企业成员或者未指定经办人时，那么该企业的签署任务可以自动转交给企业接收人，转交发生时，会触发回调通知给开发者。

<font style="color:#F5222D;">注意：若要触发此回调，企业签署方必须在e签宝实名，并在e签宝企业控制台中配置企业合同接收人，并设置自动转交，如下图：</font>![](https://cdn.nlark.com/yuque/0/2021/png/447795/1623393947993-38548e62-3bab-42ff-8291-69b629331613.png)

**触发场景2**

企业签署场景，接口发起签署指定经办人张三，合同发给张三后，张三认为应该由同企业的李四签署，在页面里进行了转交李四的操作，转交发生时，会触发回调通知给开发者。

<font style="color:#F5222D;">注意：若要使用此转交功能，触发此回调，企业开发者需要提供appid给e签宝技术人员配置开启</font>**<font style="color:#F5222D;">签署页面显示转交按钮</font>**<font style="color:#F5222D;">功能。</font>![](https://cdn.nlark.com/yuque/0/2021/png/447795/1628668160195-257258fc-2011-4621-9407-3c7299c4aeee.png)

**回调参数**

| **参数名** | | | **是否必填** | **参数类型** | **说明** |
| --- | --- | --- | :---: | :---: | --- |
| action | | | 是 | string | 标记该通知的业务类型，该通知固定为：**<font style="color:rgb(58, 181, 74);">TRANSMISS_SIGN</font>** |
| timestamp | | | 是 | int64 | 回调通知触发时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| signFlowId | | | 是 | string | 签署流程ID |
| customBizNum | | | 否 | string | 自定义业务编号<br/>该参数取值设置签署区的时候设置的customBizNum参数 |
| transmissTime | | | 是 | string | 转交时间（毫秒级时间戳格式） |
| organization | | | 是 | object | 机构信息 |
| | orgId | | 是 | string | 机构账号ID |
| | orgName | | 是 | string | 机构名称 |
| transactor | | | 是 | object | 转交人信息 |
| | psnId | | 否 | string | 转交人账号ID |
| | psnAccount | | 否 | object | 转交人账号标识 |
| | | accountMobile | 否 | string | 手机号（转交人账号标识） |
| | | accountEmail | 否 | string | 邮箱（转交人账号标识） |
| newTransactor | | | 是 | object | 被转交人信息 |
| | psnId | | 否 | string | 被转交人账号ID |
| | psnAccount | | 否 | object | 被转交人账号标识 |
| | | accountMobile | 否 | string | 手机号（被转交人账号标识） |
| | | accountEmail | 否 | string | 邮箱（被转交人账号标识） |


**通知示例：**

```json
{
    "action": "TRANSMISS_SIGN",
    "timestamp": 1652152758250,
    "signFlowId": "4a7d96abf54***a4fd266e1eab",
    "transmissTime": 1652152758211,
    "transactor": {
        "psnId": "7ffcaed8c1***ca1d8f0ef0a8f6",
        "psnAccount": {
            "accountMobile": "153****0000",
            "accountEmail": "***@aa.cn"
        }
    },
    "newTransactor": {
        "psnId": "626629f483b***9f1d8c1d",
        "psnAccount": {
            "accountMobile": "166****0000"
        }
    },
    "organization": {
        "orgId": "d030d3b77*****387529cb4",
        "orgName": "四月测试***企业"
    }
}
```

