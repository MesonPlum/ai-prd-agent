回调通知Url地址配置方式和回调通知数据接收，详见[签署回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/sblzg8)。

触发节点：在一个签署流程中，某个签署任务需要进行印章的用印审批，当用印审批被驳回时，触发此回调通知。

同一个签署任务若有多个印章审批均被驳回，则会触发多次。

**回调参数**

| **参数名** | | | **必填** | **参数类型** | **说明** |
| --- | --- | --- | :---: | :---: | --- |
| action | | | 是 | string | 标记该通知的业务类型，该通知固定为：**<font style="color:#52C41A;">SIGN_SEAL_EXAMINE_REJECTED</font>** |
| timestamp | | | 是 | int64 | 回调通知触发时间 |
| signFlowId | | | 是 | string | 签署流程ID |
| signOrder | | | 是 | integer | 签署人的签署顺序 |
| rejectTime | | | 是 | int64 | 驳回时间（毫秒级时间戳格式） |
| rejectDescription | | | 是 | string | 用印审批驳回时，附加的原因描述 |
| rejecter | | | 是 | object | 用印审批操作人信息 |
|  | psnId | | 否 | string | 操作人账号ID |
| | psnAccount | | 否 | object | 操作人账号 |
| |  | accountMobile | 否 | string | 手机号（操作人账号标识） |
| | | accountEmail | 否 | string | 邮箱号（操作人账号标识） |
| <font style="color:rgb(23, 43, 77);">operator</font> | | | 是 | object | 签署人信息 |
| | psnId | | 否 | string | 操作人账号ID |
| | psnAccount | | 否 | object | 操作人账号 |
| | | accountMobile | 否 | string | 手机号（操作人账号标识） |
| | | accountEmail | 否 | string | 邮箱号（操作人账号标识） |
| organization | | | 否 | object | 机构签署方 |
|  | orgId | | 否 | string | 机构账号ID |
| | orgName | | 否 | string | 机构名称 |


**通知示例**

```json
{
    "action":"SIGN_SEAL_EXAMINE_REJECTED",
    "timestamp":1656313026176,
    "signFlowId":"88d03f***88cef9",
    "signOrder":1,
    "rejectTime":1656313025000,
    "rejectDescription":"这里是用印审批驳回原因",
    "rejecter":{
        "psnId":"c7e0029***0541e7",
        "psnAccount":{
            "accountMobile":"183****0101"
        }
    },
    "operator":{
        "psnId":"61982be***73018ca0",
        "psnAccount":{
            "accountMobile":"151***0202"
        }
    },
    "organization":{
        "orgId":"0c5bd49***48bfbf",
        "orgName":"这里是个签署企业的名称"
    }
}
```



