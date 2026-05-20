回调通知Url地址配置方式和回调通知数据接收，详见[【e签宝回调通知接收说明】](https://qianxiaoxia.yuque.com/opendoc/notify3/pmy852)，<font style="color:#DF2A3F;">需要勾选【Webhook】-【独立实名认证服务】-【实名认证资源-oss文件解冻完成通知】。</font>

当开发者调用[【查询认证详情信息】](https://qianxiaoxia.yuque.com/opendoc/kxf3gi/azug7gcoo8enrvhr)接口获取超过180天的认证资源文件时，可以通过该回调通知获取文件激活成功的消息。<font style="color:#DF2A3F;"></font>

**回调参数**

| **参数名** | | | **必填** | **参数类型** | **说明** |
| --- | --- | --- | :---: | :---: | --- |
| action | | | 是 | string | 标记该通知的业务类型，该通知固定：**<font style="color:#52C41A;"></font>**<br/>**<font style="color:#52C41A;">FILE_ACTIVATE</font>** |
| timestamp | | | 是 | int64 | 回调通知触发时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| bizType | | | 是 | string | 业务流程类型：<br/>**auth** - 实名~~~~认证业务流程 <br/>**willingness** - 意愿任务业务流程 |
| bizId | | | 是 | string | 对应业务流程ID（flowId/willAuthId值） |
| resourceStatus | | | 是 | string | 固定值：active |


**通知示例**

```json
{
  "bizType": "auth", 
  "bizId": "4206189679777153429",
  "resourceStatus": "active",
  "action": "FILE_ACTIVATE",
  "timestamp":1650262138252
}
```



