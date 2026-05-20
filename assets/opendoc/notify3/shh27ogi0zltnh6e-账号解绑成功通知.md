#### 【触发条件】当在开发者发起的e签宝**<font style="color:rgb(38, 38, 38);">SaaS账号解绑页面链接中操作账号解绑成功时触发该回调通知。</font>**
![](https://cdn.nlark.com/yuque/0/2024/png/447795/1729759669318-01ba0d52-09ea-42ab-bb31-b66c91b3940c.png?x-oss-process=image%2Fformat%2Cwebp)

#### 回调参数
回调通知数据接收，详见[账号管理回调通知接收说明](https://qianxiaoxia.yuque.com/opendoc/notify3/pdkird9s1knbdgwr)。

| **参数名称** | | **必选** | **参数类型** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| action | | 是 |   string | 通知的业务类型，固定值：**<font style="color:#52C41A;">ACCOUNT_UNBIND</font>** |
| timestamp | | 是 | int64 | 回调通知发送时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| account | | 是 | string | 解绑成功的用户登录凭证：手机号或邮箱 |
| customBizNum | | 是 | string | 自定义业务编码（开发者发起时传入的自定义标识） |


#### 通知示例
```json
{
    "customBizNum": "标识本次解绑任务标识001",
    "account": "jilinXXXX@XXX.cn",
    "timestamp": 1729763155255,
    "action": "ACCOUNT_UNBIND"
}
```

