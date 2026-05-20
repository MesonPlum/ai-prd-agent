**<font style="color:#DF2A3F;">自2024年11月19日起，该接口命名由“印章授权书签署完成通知”变更为“印章授权操作完成通知”。</font>**

回调通知Url地址配置方式和回调通知数据接收，详见[印章回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/ynu21s)。

**【通知描述】**

当印章授权书签署完成或印章授权意愿认证完成后将触发印章授权操作完成的回调通知，e签宝将根据开发者设置的[印章回调通知地址](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/ynu21s)，发送业务类型`**<font style="color:#FFA940;background-color:#E9E9E9;">action</font>**`为 **<font style="color:#E8323C;">"</font>****<font style="color:rgb(232, 50, 60);">SEAL_AUTH_SIGN</font>****<font style="color:#E8323C;">" </font>**的回调通知。<font style="color:#DF2A3F;">(因印章授权设置的生效时间可能是签署授权书之后的某个时间，所以印章授权操作完成并不代表当前时间印章授权已经生效)</font>

**【触发条件】**

+ 当[印章授权人员](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/gz3s71#JJHKs)签署完成《电子签章授权书》或者操作完意愿认证授权后，推送机构企业[内部成员印章授权](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/fu6ov5)的相关回调通知。
+ 当[印章授权人员](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/gz3s71#JJHKs)签署完成《电子印章跨企业委托使用授权书》后，推送机构[跨企业印章授权](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/qkxyha)的相关回调通知。

:::info
**【提示说明】**

+ 返回参数中有`**<font style="color:#FFA940;background-color:#E9E9E9;">authorizedPsnId</font>**`参数代表是内部成员印章授权。
+ 返回参数中有`**<font style="color:#FFA940;background-color:#E9E9E9;">authorizedOrgId</font>**`参数代表是跨企业印章授权。
+ 开发者可以通过回调参数中是否存在上述两个参数来判断是内部成员印章授权还是跨企业印章授权。
+ 开发者需考虑参数解析兼容性，[点击查看参数容错建议](https://qianxiaoxia.yuque.com/docs/share/bdc99d6e-d340-4872-8de0-3776246cfebe)。

:::

#### 回调参数
| **参数名称** | **必填** | **参数类型** | **参数说明** |
| --- | :---: | :---: | --- |
| action | 是 | string | 通知业务类型，固定值：**<font style="color:rgb(232, 50, 60);">SEAL_AUTH_SIGN</font>** |
| sealId | 是 | string | 印章ID（印章编号） |
| sealAuthBizId | 是 | string | 授权业务流程编号 |
| authStatus | 是 | int32 | 授权状态<br/>**1** - 生效 ，** 0 -** 失效 ，** 2** - 已删除，**3** - 待生效 |
| authConfirmMethod | 是 | int32 | 授权确认方式，默认：1（签署授权书授权）<br/>**0** - 意愿认证授权（直接跳转企业管理员/法定代表人刷脸页面，管理员/法定代表人刷脸完成即授权完成）<br/>**1** - 签署授权书授权（获取企业管理员/法定代表人加盖企业公章和个人章的签署页面，授权书盖章签署完成即授权完成）<br/>+ **<font style="color:#F5222D;">仅企业内部成员印章授权时，支持指定：0（意愿认证授权）</font>** |
| sealAuthType    | 是 | string | 印章授权类型：<br/>**SINGLE_SEAL** - 单个印章授权<br/>**PLATFORM_BATCH** - 平台批量印章授权 |
| authorizerOrgId | 是 | string | 授权机构账号ID<font style="color:#F5222D;">（委托单位）</font> |
| authorizedPsnId | 否 | string | 被授权人账号ID<font style="color:#F5222D;">（委托单位内成员）</font><br/>+ **<font style="color:#F5222D;">仅机构企业内部成员印章授权时，返回此字段。</font>**<br/>+ **<font style="color:#E8323C;">开发者需考虑参数解析兼容性，</font>**[**点击查看参数容错建议**](https://qianxiaoxia.yuque.com/docs/share/bdc99d6e-d340-4872-8de0-3776246cfebe)**<font style="color:#E8323C;">。</font>** |
| authorizedOrgId | 否 | string | 被授权机构账号ID<font style="color:#F5222D;">（受托单位）</font><br/>+ **<font style="color:#F5222D;">仅跨企业印章授权时，返回此字段。</font>**<br/>+ **<font style="color:#E8323C;">开发者需考虑参数解析兼容性，</font>**[**点击查看参数容错建议**](https://qianxiaoxia.yuque.com/docs/share/bdc99d6e-d340-4872-8de0-3776246cfebe)**<font style="color:#E8323C;">。</font>** |
| bodyVersion | 是 | string | 印章回调通知版本，默认V3，开发者可忽略。 |
| effectiveTime | 是 | int64 | 授权生效时间，[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)格式，单位毫秒。 |
| expireTime | 是 | int64 | 授权失效时间，[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)格式，单位毫秒。 |
| signFlowId | 是 | string | 授权书签署流程ID，可通过[【查询签署流程详情】](https://open.esign.cn/doc/opendoc/pdf-sign3/xxk4q6)接口查询签署流程详情信息。 |


#### 回调示例
印章内部成员授权书签署完成时：

```json
{
    "action": "SEAL_AUTH_SIGN",
    "authConfirmMethod": 0,
    "authStatus": 1,
    "authorizedPsnId": "c92520ec*****62246bd9b50f",
    "authorizerOrgId": "4851f8*****965a694d37c3de60",
    "bodyVersion": "V3",
    "effectiveTime": 1731168000000,
    "expireTime": 1733846399000,
    "sealAuthBizId": "b41fb868-****-43c6-b9ba-97f0ab520f5b",
    "sealAuthType": "SINGLE_SEAL",
    "sealId": "cbcb084b-fe9d-****-b2a8-759c6dac8e98"
}
```

印章跨企业授权书签署完成时：

```json
{
    "action": "SEAL_AUTH_SIGN",
    "authConfirmMethod": 1,
    "authStatus": 1,
    "authorizedOrgId": "4851f82****65a694d37c3de60",
    "authorizerOrgId": "3c4047*****6445940279134e7",
    "bodyVersion": "V3",
    "effectiveTime": 1731427200000,
    "expireTime": 1763135999000,
    "sealAuthBizId": "2fb88b31-****-497a-88c9-69e07b179ee1",
    "sealAuthType": "SINGLE_SEAL",
    "sealId": "0ff52476-***-448e-9260-466f5b4b1b04",
    "signFlowId": "c2f57d7*****edae6344e9e7c"
}
```

