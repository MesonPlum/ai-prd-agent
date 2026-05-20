回调通知Url地址配置方式和回调通知数据接收，详见[购买套餐回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/xfgirh)。

:::info
**<font style="color:#E8323C;">【电子签名服务（融合专用版）】</font>**

 适用于签署合同/协议类文件，套餐包含合同/协议全部签署主体的签署页面及其实名/意愿认证服务。

:::

**回调参数**

| **参数名** | **是否必填** | **参数类型** | **说明** |
| --- | :---: | :---: | --- |
| action | 是 | string | 通知业务类型，固定值：**<font style="color:#E8323C;">BUY_QUANTIFY_PACKAGE</font>** |
| orgId | 是 | string | 购买方企业账号ID |
| transactorPsnId | 是 | string | <font style="color:rgb(64, 64, 64);">经办人个人账号ID（购买操作个人psnId）</font> |
| orderNum | 是 | string | 订单编号 |
| customBizNum | 否 | string | 自定义业务编号 |
| totalQuantity | 是 | int32 | 本次购买套餐量（单位：份） |
| effectiveTime | 是 | int64 | 套餐生效时间（毫秒级时间戳） |
| expireTime | 是 | int64 | 套餐失效时间（毫秒级时间戳） |


**通知示例**

```json
{
    "totalQuantity": "100",
    "expireTime": 1684079999000,
    "effectiveTime": 1652371200000,
    "customBizNum": "这是一串开发者内部系统自定义的编号",
    "action": "BUY_QUANTIFY_PACKAGE",
    "orderNum": "O2022****42524699",
    "transactorPsnId":"50d5eda3***1bd29c",
    "orgId": "4851f82***4d37c3de60"
}
```



