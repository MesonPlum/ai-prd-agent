回调通知Url地址配置方式和回调通知数据接收，详见[签署回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/sblzg8)。

用于接收签署方的签署结果，以流程中签署方维度通知，当签署方<font style="color:#E8323C;">签署完成</font>/<font style="color:#E8323C;">拒签</font>，触发此类型回调通知。



**回调参数**

| **参数名** | | | **必填** | **参数类型** | **说明** |
| --- | --- | --- | :---: | :---: | --- |
| action | | | 是 | string | 签署流程中某个签署方维度的签署状态通知，该通知固定值为：<br/>**<font style="color:#52C41A;">SIGN_MISSON_COMPLETE</font>**<br/>此参数可用于判断回调通知事件类型。 |
| timestamp | | | 是 | int64 | 回调通知触发时间（如重试多次均返回第一次时间，Unix时间戳格式，单位：毫秒） |
| signFlowId | | | 是 | string | 签署流程ID |
| operateTime | | | 是 | int64 | 签署时间或拒签时间（Unix时间戳格式，单位：毫秒） |
| signResult | | | 是 | int32 | 签署流程中<font style="color:#DF2A3F;">某个签署方</font>的签署结果<br/>**2 **- 签署完成，**4 **- 拒签 |
| resultDescription | | | 是 | string | 拒签或失败时，附加的原因描述 |
| signOrder | | | 是 | int32 | 签署人的签署顺序 |
| customBizNum | | | 否 | string | 自定义业务编号（流水号），该参数取发起签署时添加签署区时设置的customBizNum参数<br/><font style="color:#E8323C;">注：当同一个签署方存在多个签署区且指定不同的该参数值时，该参数会返回多个值，并以逗号分隔</font> |
| operator<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | 是 | object | 操作人信息 |
|  | psnId | | 否 | string | 操作人账号ID |
| | psnAccount | | 否 | object | 操作人账号 |
| |  | accountMobile | 否 | string | 手机号（操作人账号标识） |
| | | accountEmail | 否 | string | 邮箱号（操作人账号标识） |
| organization<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | 否 | object | 机构签署方 |
|  | orgId | | 否 | string | 机构账号ID |
| | orgName | | 否 | string | 机构名称 |


**通知示例**

```json
{
    "action":"SIGN_MISSON_COMPLETE",
    "timestamp":1650262138252,
    "signFlowId":"38fe9cd191**bf9eefe74",
    "customBizNum":"xxxxx0408111",
    "signOrder":1,
    "operateTime":1650262135000,
    "signResult":2,
    "resultDescription":"签署完成",
    "operator":{
        "psnId":"c7e002947291***ea310541e7",
        "psnAccount":{
            "accountMobile":"183****0101"
        }
    }
}
```



