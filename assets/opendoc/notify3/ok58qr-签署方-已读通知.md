回调通知Url地址配置方式和回调通知数据接收，详见签署回调通知接收说明。

【触发条件】当签署人通过签署链接进入到签署页面时，则认为签署人已经查看此签署链接。

:::info
注：

（1）同一签署流程中，同一个签署人仅在首次进入签署页面时触发已读回调通知，多次进入不会重复触发 。

（2）同一签署流程中，同一个签署人同时代表两个企业进行签署，且签署顺序order参数值不同时，会触发2次已读回调通知。

:::

**回调参数：**

| **参数名** | | | **必填** | **参数类型** | **说明** |
| --- | --- | --- | :---: | :---: | --- |
| action | | | 是 | string | 标记该通知的业务类型，该通知固定为：**<font style="color:#52C41A;">OPERATOR_READ</font>** |
| timestamp | | | 是 | int64 | 回调通知触发时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| signFlowId | | | 是 | string | 签署流程ID |
| customBizNum | | | 否 | string | 自定义业务编号<br/>该参数取值设置签署区的时候设置的customBizNum参数 |
| signOrder | | | 是 | string | 当前签署顺序 |
| readTime | | | 是 | string | 已读时间，格式：yyyy-MM-dd HH:mm:ss |
| operator<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | 是 | object | 签署操作人信息 |
| | psnId | | 否 | string | 签署人账号ID |
| | psnAccount | | 否 | object | 签署人账号 |
| | | accountMobile | 否 | string | 手机号（操作人账号标识） |
| | | accountEmail | 否 | string | 邮箱号（操作人账号标识） |


**通知示例：**

```json
{
    "action":"OPERATOR_READ",
    "timestamp":1650262066714,
    "signFlowId":"38fe9cd1914***9eefe74",
    "customBizNum":"xxxxxbh0408111",
    "signOrder":1,
    "readTime":"2022-04-18 14:07:46",
    "operator":{
        "psnId":"c7e00294729148**310541e7",
        "psnAccount":{
            "accountMobile":"183****0101"
        }
    }
}
```

