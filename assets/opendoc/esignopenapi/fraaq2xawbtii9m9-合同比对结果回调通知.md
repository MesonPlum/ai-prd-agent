#### 【触发条件】当在开发者调用[《**获取合同比对结果页面》**](https://qianxiaoxia.yuque.com/opendoc/esignopenapi/kzanlfeoplw2q4q5)**<font style="color:rgb(38, 38, 38);">，返回</font>**合同比对业务ID时**<font style="color:rgb(38, 38, 38);">触发该回调通知。</font>**
:::info
适用场景：原有的获取合同比对结果页面必须要打开链接在页面里才能看到结果，实际如果完全一致的文件，开发者不能快速判断，所以可以依赖回调通知进行判断。

<font style="color:#DF2A3F;">注意：如多次调用合同比对接口使用相同的文件，返回的合同比对业务ID相同时，不重新触发此通知。</font>

:::

#### 回调参数
回调通知数据接收，详见[合同比对回调通知接收说明](https://qianxiaoxia.yuque.com/opendoc/esignopenapi/ahye03gkbgtrdg0c)。

| **参数名称** | | **必选** | **参数类型** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| action | | 是 |   string | 通知的业务类型，固定值：**<font style="color:#52C41A;">CONTRACT_COMPLETE_RESULT</font>** |
| timestamp | | 是 | int64 | 回调通知发送时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| contractCompareBizId | | 是 | string | 合同比对业务ID |
| contractCompareResult | | 是 | string | 合同比对结果<br/>identical - 比对一致<br/>not_identical - 不一致<br/>fail_can_retry - 比对失败（可重试）<br/>fail_not_can_retry - 比对失败（不可重试） |
| failReason | | 否 | string | 比对失败原因 |


#### 通知示例
比对一致案例：

```json
{
    "action": "CONTRACT_COMPLETE_RESULT",
    "contractCompareBizId": "e819098fcc111fdfbccef373b67ee7e3",
    "contractCompareResult": "identical",
    "failReason": "",
    "timestamp": 1731050570000
}
```

比对失败案例：

```json
{
    "action": "CONTRACT_COMPLETE_RESULT",
    "contractCompareBizId": "ea4b6e791d111de7b71535011e646160",
    "contractCompareResult": "fail_not_can_retry",
    "failReason": "两份文件相似度低，无法比对",
    "timestamp": 1731051659000
}
```

