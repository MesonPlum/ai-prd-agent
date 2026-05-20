**【触发条件】当开发者开启拟定流程后，当前流转到的用户在页面填写的已填写或拒填状态，会通过回调消息通知给开发者。 **

#### 回调参数
| **参数名称** | | | **必选** | **参数类型** | **参数说明** |
| --- | --- | --- | --- | --- | --- |
| action | | | 是 | string | 标记该通知的业务类型，该通知固定为：**<font style="color:#52C41A;">DRAFT_MISSON_COMPLETE</font>** |
| timestamp | | | 是 | int64 | 回调通知发送时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| signFlowId | | | 是 | string | 签署流程ID |
| draftOrder | | | 是 | integer | 填写人的填写顺序 |
| operateTime | | | 是 | int64 | 填写时间或拒填时间（毫秒级时间戳格式） |
| draftResult | | | 是 | int | 填写结果 <br/>3:已填写 <br/>4:拒填 |
| resultDescription | | | 否 | string | 拒签或失败时，附加的原因描述 |
| operator | | | 是 | object | 填写操作人 |
|  | psnId | | 否 | string | 填写人ID |
| | psnAccount | | 否 | object | 填写人账号 |
| |  | accountMobile | 否 | string | 用户登录e签宝服务的手机号 |
| | | accountEmail | 否 | string | 用户登录e签宝服务的邮箱 |
| organization | | | 否 | object | 机构填写方 |
|  | orgId | | 否 | string | 机构账号ID |
| | orgName | | 否 | string | 机构名称 |
| components | | | 是 | array | 填充控件信息<br/><font style="color:#DF2A3F;">【注】专属云模板不返回该参数（内容为空）</font> |
|     | componentId | | 否 | string | 控件iD |
| | componentKey | | 否 | string | 控件key |
| | componentValue | | 是 | string | 控件填充值 |
| | originCustomComponentId | | 否 | string | 来源自定义控件ID |
| fillTaskId | | | 否 | string | 填写任务ID<br/><font style="color:#DF2A3F;">【注】</font><br/>+ <font style="color:#DF2A3F;">当通知内不返回components填充控件信息时，可用该字段通过接口查询填充控件信息；</font><br/>+ <font style="color:#DF2A3F;">仅限专属云模板使用，具体使用流程请联系e签宝技术人员获取。</font> |


#### 填写状态通知示例
```json
{
    "action": "DRAFT_MISSON_COMPLETE",
    "timestamp": 1689302023989,
    "signFlowId": "b03f78111111111173176d275",
    "draftOrder": 1,
    "draftResult": 3,
    "operateTime": 1689302024000,
    "operator": {
        "psnId": "39c4d66b111111111438c8",
        "psnAccount": {
            "accountMobile": "15300001111"
        }
    },
    "components": [
        {
            "componentId": "b44b6eb111111111186c0783d",
            "componentKey": "key001",
            "componentValue": "填充值0001"
        },
        {
            "componentId": "6c29888805824f6e9999c043a56edbe3",
            "componentKey": "key002",
            "componentValue": "填充值0002"
        },
        {
            "componentId": "a73e14d865b34723b000aaa24d11ac4d",
            "componentKey": "key003",
            "componentValue": "填充值0003"
        },
        {
            "componentId": "6c6d0dd6201e41168430938f7bb11c6c",
            "componentKey": "key004",
            "componentValue": "填充值0004"
        }
    ],
    "fillTaskId": "31841a1111104ffeb7b2bc6a07518a6e"
}
```

#### 
