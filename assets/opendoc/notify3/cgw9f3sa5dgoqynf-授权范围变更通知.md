#### 该消息触发的用户操作条件
:::info
**<font style="color:#DF2A3F;">用户登录e签宝官网进行操作：（注意两个环境是隔离的，不要用混）</font>**

1. 线上正式环境-e签宝官网地址：[https://web.esign.cn/workspace/home](https://web.esign.cn/workspace/home)
2. 模拟沙箱环境-e签宝模拟官网地址：[https://smlfront.esign.cn:8880/workspace/home](https://smlfront.esign.cn:8880/workspace/home)

:::

##### 企业用户
进入e签宝官网（模拟官网），左下角【安全】-【应用授权】-【应用授权(新)】-找到对应的授权平台点击【取消授权】

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1765869788207-a45a7fc0-133c-4a4b-a670-b1f1fd5b8706.png)

##### 个人用户
进入e签宝官网（模拟官网），左下角【安全】-【应用授权】-【应用授权(新)】- 找到对应的授权平台点击【取消授权】

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1765869700657-39b9f6f6-4fab-4135-9b9f-095153127786.png)

#### 该消息推送的回调通知Url地址配置方式
开发者登录e签宝 [**开放平台**](https://open.esign.cn) 后点击【控制台】进入e签宝开发者控制台，在页面上方先选择【正式服务】<font style="color:#DF2A3F;">（沙箱环境则选择【沙箱服务】，其他流程一致）</font>，然后在页面下方左侧点击【应用管理】-【我的应用】后在右侧应用列表页面中点击【配置】进入“应用配置”页面，选择【添加Webhook】即可配置接收回调通知的URL，并需要在事件订阅中勾选：“用户授权范围变更”事件。如下图：

![](https://cdn.nlark.com/yuque/0/2021/png/432598/1639619150410-08f204c0-0143-4e45-85f8-b6379c47a739.png)

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1765870357649-9808acc0-7f23-4d1a-8e88-c28418c212fc.png)

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1765870504391-523487af-12f2-4bcf-8b8b-83ec3f86ef0b.png)

#### 回调参数
回调通知数据接收，详见[认证和授权回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/naksvv)。

| **参数名称** | | **必选** | **参数类型** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| action | | 是 |   string | 通知的业务类型，固定值：**<font style="color:#52C41A;">AUTHORIZE_CHANGE</font>** |
| timestamp | | 是 | int64 | 回调通知发送时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| psnId | | 否 | string | 个人用户账号ID<br/><font style="color:#DF2A3F;">【注】</font><br/><font style="color:#DF2A3F;">1.个人用户授权取消场景返回</font><br/><font style="color:#DF2A3F;">2.返回已实名未注销的个人账号，若该个人证件号绑定的多个e签宝账号均在同一个appid下授权过，则分多次回调发送</font> |
| orgId | | 否 | string | 机构用户账号ID<br/><font style="color:#DF2A3F;">【注】机构用户授权取消场景返回</font> |
| cancelAuthorizedScope | | 是 | string | 失效的授权范围 |
| operatorPsnId | | 是 | string | 操作人账号ID（若有则返回） |
| operateTime | | 是 | int64 | 操作时间（毫秒级时间戳格式） |


#### 通知示例
##### 机构取消授权
```json
{
    "timestamp": 1678178557204,
    "operateTime": 1678178557204,
    "cancelAuthorizedScope": "org_initiate_sign,get_org_identity_info,use_org_order,manage_org_resource",
    "operatorPsnId": "39c4d6****438c8",
    "orgId": "d94ad19****e9cecf9f",
    "action": "AUTHORIZE_CHANGE"
}
```

##### 个人取消授权
```json
{
    "timestamp": 1678178948087,
    "operateTime": 1678178948087,
    "cancelAuthorizedScope": "get_psn_identity_info,psn_initiate_sign,manage_psn_resource",
    "operatorPsnId": "39c4d66b***3c39634438c8",
    "psnId": "e7d1fe1f96f****2dfcd7098",
    "action": "AUTHORIZE_CHANGE"
}
```

