回调通知Url地址配置方式和回调通知数据接收，详见[认证和授权回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/naksvv)。

**【触发条件】**个人或企业实名认证通过。

#### 回调参数
| **参数名称** | | | | | **必选** | **参数类型** | **参数说明** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| action | | | | | 是 |   string | 标记该通知的业务类型，该通知固定为：**<font style="color:#52C41A;">AUTH_PASS</font>** |
| authFlowId | | | | | 是 | string | 用户认证&授权流程ID |
| timestamp | | | | | 是 | int64 | 回调通知触发时间，Unix时间戳格式，单位：毫秒 |
| authType | | | | | 是 | string | 认证主体类型<br/>**PSN** - 个人认证，**ORG** - 机构认证 |
| bizType | | | | | 是 | string | 业务类型<br/>**REAL_NAME** - 实名认证<br/>**UPDATE-INFO** - 信息变更（只有企业更名，且之前已经实名的情况可能触发） |
| psnInfo | | | | | 否 | object | 个人认证信息<font style="color:#52C41A;">（个人认证场景返回此参数）</font> |
|  | psnId | | | | 否 | string | 个人账号ID |
| | psnAccount | | | | 否 | object | 个人账号信息 |
| |  | accountMobile | | | 否 | string | 手机号（个人账号标识） |
| | | accountEmail | | | 否 | string | 邮箱号（个人账号标识） |
| organization | | | | | 否 | object | 机构认证信息<font style="color:#52C41A;">（机构认证场景返回此参数）</font> |
|  | orgId | | | | 否 | string | 机构账号ID |
| | orgName | | | | 否 | string | 机构名称 |
| | transactor | | | | 否 | object | 经办人认证信息 |
| | | psnId | | | 否 | string | 经办人账号ID |
| | | psnAccount | | | 否 | object | 经办人账号信息 |
| | | | accountMobile | | 否 | string | 手机号（经办人账号标识） |
| | | | accountEmail | | 否 | string | 邮箱号（经办人账号标识） |


#### 个人实名认证通知示例
```json
{
    "authFlowId": "OF-308******0057",
    "timestamp": 1724984592073,
    "authType": "PSN",
    "bizType": "REAL_NAME",
    "psnInfo": {
        "psnId": "d77a938******5e67c04e9",
        "psnAccount": {
            "accountMobile": "17******02"
        }
    },
    "action": "AUTH_PASS"
}
```

#### 机构实名认证通知示例
```json
{
    "authFlowId": "OF-30f3c***8000e",
    "timestamp": 1724984941307,
    "authType": "ORG",
    "bizType": "REAL_NAME",
    "organization": {
        "orgId": "25ce887c568*****56d4aca9",
        "orgName": "****科技有限公司",
        "transactor": {
            "psnId": "cb603eb5db********b77e87b09",
            "psnAccount": {
                "accountMobile": "13******70"
            }
        }
    },
    "action": "AUTH_PASS"
}
```

