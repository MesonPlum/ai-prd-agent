回调通知Url地址配置方式和回调通知数据接收，详见[印章回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/ynu21s)。

e签宝将在已设置的印章授权失效时间 **<u>提前7天 </u>**和 **<u>提前1天</u>**<font style="color:rgb(23, 26, 29);">，</font>根据开发者设置的[印章回调通知地址](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/ynu21s)，

发送业务类型`**<font style="color:#FFA940;background-color:#E9E9E9;">action</font>**`为 **<font style="color:#E8323C;">"</font>****<font style="color:rgb(232, 50, 60);">SEAL_AUTH_NEARLY_EXPIRED</font>****<font style="color:#E8323C;">" </font>**的回调通知。

#### 回调参数
| **参数名称** | **必填** | **参数类型** | **参数说明** |
| --- | :---: | :---: | --- |
| action | 是 | string | 通知业务类型，固定值：**<font style="color:rgb(232, 50, 60);">SEAL_AUTH_NEARLY_EXPIRED</font>** |
| sealAuthType | 是 | string | 印章授权类型：<br/>**SINGLE_SEAL** - 单个印章授权<br/>**PLATFORM_BATCH** - 平台批量印章授权 |
| sealId | 是 | string | 印章ID（印章编号）<br/>+ 当sealAuthType值为：PLATFORM_BATCH 时，该参数返回：CURRENT_ALL |
| sealAuthBizId | 是 | string | 授权业务流程编号 |
| authStatus | 是 | string | 授权状态（此回调通知只会有**1** - 生效状态）<br/>**1** - 生效 ，** 0 -** 失效 ，** 2** - 已删除，**3** - 待生效 |
| authorizerOrgId | 是 | string | 授权机构账号ID<font style="color:#F5222D;">（委托单位）</font> |
| authorizedPsnId | 否 | string | 被授权人账号ID<font style="color:#F5222D;">（委托单位成员）</font><br/>+ **<font style="color:#F5222D;">企业内成员印章授权即将到期时，返回此字段</font>** |
| authorizedOrgId | 否 | string | 被授权机构账号ID<font style="color:#F5222D;">（受托单位）</font><br/>+ **<font style="color:#F5222D;">跨企业印章授权即将到期时，返回此字段</font>** |
| bodyVersion | 是 | string | 印章回调通知版本，默认V3，开发者可忽略。 |
| effectiveTime | 是 | int64 | 授权生效时间，[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)格式，单位毫秒。 |
| expireTime | 是 | int64 | 授权失效时间，[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)格式，单位毫秒。 |


#### 回调示例
企业内部成员印章授权即将过期时：

```json
{
    "action": "SEAL_AUTH_NEARLY_EXPIRED",
    "authStatus": 1,
    "authorizedPsnId": "50d5eda394***b1bd29c",
    "authorizerOrgId": "0c5bd49***1d5648bfbf",
    "effectiveTime": 1636473600000,
    "expireTime": 1668095999000,
    "bodyVersion": "V3",
    "sealAuthBizId": "04e589b8-xx-xx-xx-ba8f1f689d3e",
    "sealAuthType": "SINGLE_SEAL",
    "sealId": "a1ccfad7-xx-xx-xx-84c51bf3a7e4"
}
```

跨企业印章授权即将过期时：

```json
{
    "action": "SEAL_AUTH_NEARLY_EXPIRED",
    "authStatus": 1,
    "authorizedOrgId": "a3d101cc***ad28582e",
    "authorizerOrgId": "0c5bd492***5648bfbf",
    "effectiveTime": 1636473600000,
    "expireTime": 1668095999000,
    "bodyVersion": "V3",
    "sealAuthBizId": "e636c8b7-xx-xx-xx-54449757c4cd",
    "sealAuthType": "SINGLE_SEAL",
    "sealId": "f4942dd1-xx-xx-xx-a3623c32b84b"
}
```

