回调通知Url地址配置方式和回调通知数据接收，详见[认证和授权回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/naksvv)。

**回调参数**

| **参数名称** | | **必选** | **参数类型** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| action | | 是 |   string | 通知的业务类型，固定值：**<font style="color:#52C41A;">AUTHORIZE_FINISH</font>** |
| timestamp | | 是 | int64 | 回调通知发送时间，Unix时间戳（毫秒） |
| psnId | | 是 | string | 个人账号ID（经办人账号ID） |
| orgId | | 否 | string | 机构账号ID |
| authFlowId | | 是 | string | 用户认证&授权流程ID |
| authorizedInfo<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | 是 | array | 用户授权信息 |
|  | authorizedScope | 否 | string | 授权范围  <font style="color:#E8323C;"></font><br/>**<font style="color:#E8323C;">授权主体为个人用户（企业授权场景为经办人）：</font>**<br/>**get_psn_identity_info - **授权允许获取个人账号基本信息<br/>**psn_initiate_sign **- 授权允许代替用户发起合同签署<br/>**manage_psn_resource** -授权允许获取用户的模板、印章等资源的权限<br/>**<font style="color:#E8323C;">授权主体为企业机构用户：</font>**<br/>**get_org_identity_info **- 授权允许获取机构用户账号基本信息<br/>**org_initiate_sign** -<font style="color:rgb(255, 0, 0);"> </font>授权允许代替机构用户发起合同签署<br/>**manage_org_resource**<font style="color:rgb(255, 0, 0);"> </font>- 授权允许获取机构用户的模板、印章、组织成员等资源的权限<br/>**use_org_order **- 授权允许获取机构用户套餐订单的使用权限 |
| | effectiveTime | 否 | int64 | 授权生效时间（unix时间戳，单位：毫秒） |
| | expireTime | 否 | int64 | 授权失效时间（unix时间戳，单位：毫秒） |
| legalRepCheck | | 否 | boolean | 本次操作的机构经办人是否为企业法人<br/>**true** - 是<br/>**false** - 否 |
| adminCheck | | 否 | boolean | 本次操作的机构经办人是否为企业管理员<br/>**true** - 是<br/>**false** - 否 |
| transactorUseSeal | | 否 | boolean | 本次操作的机构经办人是否获得了用印权限（经办人未成为企业管理员或法人的情况下存在）<br/>**true** - 是<br/>**false** - 否 |


**通知示例**

该示例为企业用户进行认证授权，授权范围为个人经办人、企业用户授权成功的回调通知：

```json
{
    "timestamp": 1697081866002,
    "psnId": "c92520e******2246bd9b50f",
    "orgId": "3c404*****940279134e7",
    "authFlowId": "OF-2a74****8005a",
    "authorizedInfo": [
        {
            "authorizedScope": "use_org_order",
            "effectiveTime": 1697081865883,
            "expireTime": 4819145865883
        },
        {
            "authorizedScope": "manage_org_resource",
            "effectiveTime": 1697081865883,
            "expireTime": 4819145865883
        },
        {
            "authorizedScope": "org_initiate_sign",
            "effectiveTime": 1697081865883,
            "expireTime": 4819145865883
        },
        {
            "authorizedScope": "get_org_identity_info",
            "effectiveTime": 1697081865883,
            "expireTime": 4819145865883
        },
        {
            "authorizedScope": "manage_psn_resource",
            "effectiveTime": 1697081865883,
            "expireTime": 4819145865883
        },
        {
            "authorizedScope": "psn_initiate_sign",
            "effectiveTime": 1697081865883,
            "expireTime": 4819145865883
        },
        {
            "authorizedScope": "get_psn_identity_info",
            "effectiveTime": 1697081865883,
            "expireTime": 4819145865883
        }
    ],
    "legalRepCheck": false,
    "adminCheck": false,
    "transactorUseSeal": true,
    "action": "AUTHORIZE_FINISH"
}
```



