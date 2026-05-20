回调通知Url地址配置方式和回调通知数据接收，详见[签署回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/sblzg8)。

触发节点：当签署人通过签署链接进入到签署页面时，发现签署人信息与本人不一致，则可以填写正确信息告知开发者，<font style="color:rgb(64, 64, 64);">触发此类型回调通知。</font>

**回调参数**

| **参数名** | | | **必填** | **参数类型** | **说明** |
| --- | --- | --- | :---: | :---: | --- |
| action | | | 是 | string | 标记该通知的业务类型，<br/>签署人信息不一致回调通知Action值为：<br/>**<font style="color:#52C41A;">OPERATOR_CORRECT_IDENTITY</font>** |
| operateType | | | 是 | int | 签署人操作类型<br/>**0 **- 修正开发者传入的身份信息<br/>**1 **- 修正e签宝账号已绑定的身份信息 |
| timestamp | | | 是 | int64 | 回调通知发送时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| signFlowId | | | 是 | string | 签署流程ID |
| operator<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | 是 | object | 开发者指定的签署操作人信息 |
|    <br/>   <br/>   <br/>   <br/>   <br/>    | psnId | | 否 | string | 签署操作人ID |
| | psnAccount<font style="color:rgb(232, 50, 60);"></font> | | 否 | object | 签署操作人账号 |
| | | accountMobile | 否 | string | 用户登录e签宝官网的手机号 |
| | | accountEmail | 否 | string | 用户登录e签宝官网的邮箱 |
| | psnName | | 是 | string | 个人姓名 |
| | psnIDCardNum | | 是 | string | 个人身份证号 |
| | psnIDCardType | | 是 | string | 个人证件类型，可选值如下：<br/>**CRED_PSN_CH_IDCARD** - 中国大陆居民身份证（默认值）<br/>**CRED_PSN_CH_HONGKONG** - 香港来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_MACAO** - 澳门来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_TWCARD** - 台湾来往大陆通行证（台胞证）<br/>**CRED_PSN_PASSPORT** - 护照 |
| operatorCorrectInfo<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | 是 | object | 签署操作人更正的信息 |
|    <br/>   <br/>    | psnName | | 是 | string | 个人姓名 |
| | psnAccount | | 是 | string | 个人手机号/邮箱 |
| | psnIDCardNum | | 是 | string | 个人身份证号 |
| | psnIDCardType | | 是 | string | 个人证件类型，可选值如下：<br/>**CRED_PSN_CH_IDCARD** - 中国大陆居民身份证（默认值）<br/>**CRED_PSN_CH_HONGKONG** - 香港来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_MACAO** - 澳门来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_TWCARD** - 台湾来往大陆通行证（台胞证）<br/>**CRED_PSN_PASSPORT** - 护照 |


**通知示例**

```json
{
    "action": "OPERATOR_CORRECT_IDENTITY",
    "timestamp": 1704362698251,
    "signFlowId": "374276*****10ad5fbe4",
    "operateType": 0,
    "operator": {
        "psnId": "39c4d*******9634438c8",
        "psnAccount": {
            "accountMobile": "153******50"
        },
        "psnName": "张三",
        "psnIDCardNum": "2311********29",
        "psnIDCardType": "CRED_PSN_CH_IDCARD"
    },
    "operatorCorrectInfo": {
        "psnName": "张贺",
        "psnAccount": "15*******0",
        "psnIDCardNum": "231********29",
        "psnIDCardType": "CRED_PSN_CH_IDCARD"
    }
}
```



