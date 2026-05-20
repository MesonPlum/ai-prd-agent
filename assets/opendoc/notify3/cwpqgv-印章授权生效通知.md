回调通知Url地址配置方式和回调通知数据接收，详见[印章回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/ynu21s)。

**【通知描述】**

当印章授权书签署完成或印章授权意愿认证完成后，并到了发起授权时指定的授权生效时间时，将会触发印章授权生效的回调通知，e签宝将根据开发者设置的[印章回调通知地址](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/ynu21s)，发送业务类型`**<font style="color:#FFA940;background-color:#E9E9E9;">action</font>**`为 **<font style="color:#E8323C;">"</font>****<font style="color:#E8323C;">SEAL_AUTH_EFFICTIVE</font>****<font style="color:#E8323C;">" </font>**的回调通知。

**【触发条件】**

+ 当[印章授权人员](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/gz3s71#JJHKs)签署完成《电子签章授权书》或印章授权意愿认证完成后，印章授权有效期开始时，推送机构企业[内部成员印章授权](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/fu6ov5)生效的回调通知。
+ 当[印章授权人员](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/gz3s71#JJHKs)签署完成《电子印章跨企业委托使用授权书》后，印章授权有效期开始时，推送机构[跨企业印章授权](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/qkxyha)生效的回调通知。
+ 当开发者通过 [获取机构认证&授权页面链接](https://open.esign.cn/doc/opendoc/auth3/kcbdu7) 接口给经办人申请了企业全部印章的用印权限（[印章使用员](https://qianxiaoxia.yuque.com/opendoc/other-docs/gz3s71#FX3K1)）并被**企业e签宝账号管理员**或**企业法定代表人**审批通过时，推送该印章生效通知（印章授权类型为：平台批量印章授权）。

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
| action | 是 | string | 通知业务类型，固定值：**<font style="color:#E8323C;">SEAL_AUTH_EFFICTIVE</font>** |
| sealAuthType    | 是 | string | 印章授权类型：<br/>**SINGLE_SEAL** - 单个印章授权<br/>**PLATFORM_BATCH** - 平台批量印章授权 |
| sealId | 是 | string | 印章ID（印章编号）<br/>+ 当sealAuthType值为：PLATFORM_BATCH 时，该参数返回：CURRENT_ALL |
| sealAuthBizId | 是 | string | 授权业务流程编号/认证授权流程ID<br/>+ 当印章是通过[获取机构认证&授权页面链接](https://open.esign.cn/doc/opendoc/auth3/kcbdu7)接口授予的全部印章用印权限时，该字段返回认证授权流程ID（authFlowId） |
| authStatus | 是 | string | 授权状态（此回调通知只会有**1** - 生效状态）<br/>**1** - 生效 ，** 0 -** 失效 ，** 2** - 已删除，**3** - 待生效 |
| authorizerOrgId | 是 | string | 授权机构账号ID<font style="color:#F5222D;">（委托单位）</font> |
| authorizedPsnId | 否 | string | 被授权人账号ID<font style="color:#F5222D;">（委托单位内成员）</font><br/>+ **<font style="color:#F5222D;">仅机构企业内部成员印章授权时，返回此字段。</font>**<br/>+ **<font style="color:#E8323C;">开发者需考虑参数解析兼容性，</font>**[**点击查看参数容错建议**](https://qianxiaoxia.yuque.com/docs/share/bdc99d6e-d340-4872-8de0-3776246cfebe)**<font style="color:#E8323C;">。</font>** |
| authorizedOrgId | 否 | string | 被授权机构账号ID<font style="color:#F5222D;">（受托单位）</font><br/>+ **<font style="color:#F5222D;">仅跨企业印章授权时，返回此字段。</font>**<br/>+ **<font style="color:#E8323C;">开发者需考虑参数解析兼容性，</font>**[**点击查看参数容错建议**](https://qianxiaoxia.yuque.com/docs/share/bdc99d6e-d340-4872-8de0-3776246cfebe)**<font style="color:#E8323C;">。</font>** |
| bodyVersion | 是 | string | 印章回调通知版本，默认V3，开发者可忽略。 |
| effectiveTime | 是 | int64 | 授权生效时间，[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)格式，单位毫秒。 |
| expireTime | 是 | int64 | 授权失效时间，[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)格式，单位毫秒。 |


#### 回调示例
印章授权内部成员生效时：

```json
{
    "action":"SEAL_AUTH_EFFICTIVE",
    "authStatus":1,
    "authorizedPsnId":"7ffcaed8***f0a8f6",
    "authorizerOrgId":"0c5bd492**5648bfbf",
    "effectiveTime":1636473600000,
    "expireTime":1668095999000,
    "bodyVersion": "V3",
    "sealAuthBizId":"df2d861b-xx-xx-xx-21f34da000fd",
    "sealAuthType":"SINGLE_SEAL",
    "sealId":"a1ccfad7-xx-xx-xx-84c51bf3a7e4"
}
```

印章跨企业授权生效时：

```json
{
    "action":"SEAL_AUTH_EFFICTIVE",
    "authStatus":1,
    "authorizedOrgId":"a3d101***ad28582e",
    "authorizerOrgId":"0c5bd49***48bfbf",
    "bodyVersion": "V3",
    "effectiveTime":1636473600000,
    "expireTime":1668095999000,
    "sealAuthBizId":"e636c8b7-xx-xx-xx-54449757c4cd",
    "sealAuthType":"SINGLE_SEAL",
    "sealId":"f4942dd1-xx-xx-xx-a3623c32b84b"
}
```

平台批量印章授权经办人获取企业的全部印章用印权限时：

```json
{
    "action": "SEAL_AUTH_EFFICTIVE",
    "authStatus": 1,
    "authorizedPsnId": "c92520e*****bd9b50f",
    "authorizerOrgId": "3c4047*******79134e7",
    "bodyVersion": "V3",
    "effectiveTime": 1697040000000,
    "expireTime": 1728662399000,
    "sealAuthBizId": "OF-2a7*****5a",
    "sealAuthType": "PLATFORM_BATCH",
    "sealId": "CURRENT_ALL"
}

```

