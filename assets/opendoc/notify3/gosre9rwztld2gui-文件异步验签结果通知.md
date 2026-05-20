回调通知Url地址配置方式和回调通知数据接收，详见[签署回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/sblzg8)。

当开发者调用[【核验合同文件签名有效性】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/yekrnc)接口指定异步验签时，可以通过该回调通知接收验签结果信息。

**回调参数**

| **参数名** | | | | **必填** | **参数类型** | **说明** |
| --- | --- | --- | --- | :---: | :---: | --- |
| action | | | | 是 | string | 标记该通知的业务类型，该通知固定：**<font style="color:#52C41A;"></font>**<br/>**<font style="color:#52C41A;">FILE_ASYNC_VERIFY_RESULT</font>** |
| timestamp | | | | 是 | int64 | 回调通知触发时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| fileId | | | | 是 | string | 文件ID |
| verifyTaskId | | | | 是 | string | 验签任务ID |
| status | | | | 是 | string | 验签状态<br/>**1** - 验签失败<br/>**2** - 验签成功 |
| failReason | | | | 否 | string | 验签失败的原因 |
| signInfos | | | | 否 | array | PDF文件中签署信息 |
|  | cert | | | 否 | object | 数字证书信息 |
| | | certOwner | | 否 | string | 数字证书所有者 |
| | | certSN | | 否 | string | 数字证书序列号 |
| | | effectiveTime | | 否 | string | 数字证书有效期开始时间 |
| | | expireTime | | 否 | string | 数字证书有效期结束时间 |
| | | issuerCN | | 否 | string | 数字证书颁发者名称 |
| | signature | | | 否 | object | 签名信息 |
| |  | modify | | 否 | boolean | 文件内容或签名是否篡改<br/>**false** - 未篡改<br/>**true** - 已篡改 |
| | | signTimeSource | | 否 | string | 签署时间来源<br/>返回 tsa 表示时间源取自遵循RFC3161规范的时间戳 |
| | | signTime | | 否 | string | 签署时间 |


**通知示例**

```json
{
    "action": "FILE_ASYNC_VERIFY_RESULT",
    "timestamp": 1765507541099,
    "fileId": "673d8406b805471111cd4f776f4b693",
    "verifyTaskId": "408e6b2b111114a017da5abd3da453",
    "status": 2,
    "signInfos": [
        {
            "cert": {
                "certOwner": "我的测试有限公司",
                "certSN": "109478411114969911",
                "effectiveTime": "2025-04-27 11:44:35",
                "expireTime": "2028-04-26 11:44:35",
                "issuerCN": "eSign Test OCA"
            },
            "signature": {
                "modify": false,
                "signTimeSource": "tsa",
                "signTime": "2025-12-09 17:46:05"
            }
        },
        {
            "cert": {
                "certOwner": "杭州天谷有限公司",
                "certSN": "385d958111d7c12201f935",
                "effectiveTime": "2025-04-12 11:48:12",
                "expireTime": "2026-04-12 11:48:12",
                "issuerCN": "TEST ZHCA RSA CA"
            },
            "signature": {
                "modify": false,
                "signTimeSource": "tsa",
                "signTime": "2025-12-09 17:46:06"
            }
        }
    ]
}
```



