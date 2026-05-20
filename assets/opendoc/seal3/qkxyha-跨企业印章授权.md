> [**必须确保企业用户已授予平台appId获取其印章资源管理和发起签署的权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)
>
> + **manage_org_seal - 授权允许获取企业/组织用户的印章的查询、新增、编辑、授权、删除权限**
> + **org_initiate_sign - 授权允许代表企业/组织用户发起合同签署以及查询合同签署详情**
>

### 接口描述
当委托单位需要将企业印章授权给外部企业时，接口可用于获取<font style="color:#E8323C;">《电子印章跨企业委托使用授权书》</font>的签署链接。委托机构通过授权书签署链接完成签署，并进行意愿认证即代表印章授权成功，开发者同时将接收到[印章授权生效](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/cwpqgv)的回调通知。

:::warning
**<font style="color:#F5222D;">注意事项：</font>**

+ 跨企业印章签署的文件所展示的对应签名信息，印章样式和数字证书均为**授权企业（委托机构）**所有。
+ 适用场景：集团分总企业、关联合作企业等。
+ 接口返回的授权书签署链接，需开发者在应用系统内自行集成通知委托机构来签署（如果授权委托人账号绑定了联系方式，也会有e签宝默认的短信/邮件通知委托人来签署）。
+ [点击这里](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/vk863c)<font style="color:#000000;">了解更多印章跨企业授权说明。</font>

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/seals/org-seals/external-auth

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;"></font>** |
| --- | --- | :---: | :---: | :---: | --- |
| orgId | | string | 是 | body | 机构账号ID<font style="color:#E8323C;">（委托机构，企业印章的拥有者）</font><br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询。 |
| sealIds | | list | 是 | body | 授权印章ID列表<font style="color:#E8323C;">（授权企业印章编号，包含法定代表人印章）</font><br/><font style="color:#E8323C;">【注】</font>机构用户印章ID可以通过[【查询企业内部印章】](https://qianxiaoxia.yuque.com/opendoc/seal3/ups6h1)接口获取。 |
| ~~sealId~~ | | string | 否 | body | 授权印章ID<font style="color:#E8323C;">（旧版）</font><br/><font style="color:#E8323C;">【注】</font>自2024年11月20日起，支持一次授权多个印章，开发者可直接指定上方参数（**sealIds**）进行一个或者多个印章进行授权，无需再传入本参数（**sealId**） |
| transactorPsnId | | string | 是 | body | 授权操作人账号ID<font style="color:#E8323C;">（委托机构的法定代表人或企业管理员个人账号ID）</font><br/><font style="color:#DF2A3F;">【注】</font>法定代表人或企业管理员个人账号ID可通过[【查询企业成员列表】](https://open.esign.cn/doc/opendoc/employee/bzrzic)接口获取。 |
| authorizedOrgInfo<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | object | 是 | body | 被授权机构信息<font style="color:#E8323C;">（受托机构）</font> |
|  | orgName | string | 是 | body | 被授权机构名称 |
| | orgIDCardNum | string | 是 | body | 被授权机构证件号<font style="color:#DF2A3F;">（统一社会信用代码 或 工商注册号）</font> |
| longTermEffective | | boolean | 否 | body | 印章授权是否长期有效（不限制授权时间），默认false<br/>**true** - 是<br/>**false** - 否<br/><font style="color:#F5222D;">【注】</font>当传true时，不能再传effectiveTime和expireTime，否则会报错：“设置为长期有效无需传入生效和失效时间”。 |
| effectiveTime | | int64 | 否 | body | 印章授权生效时间（[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)格式：单位毫秒）<br/>**<font style="color:#DF2A3F;">【注】当longTermEffective是false时，该字段必传</font>** |
| expireTime | | int64 | 否 | body | 印章授权失效时间（[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)格式，单位毫秒）<br/>**<font style="color:#F5222D;">【注】</font>****<font style="color:#DF2A3F;">当longTermEffective是false时，该字段必传</font>**<br/>（1）授权有效期最长不可超过3年。<br/>（2）授权实际失效时间是以天为单位，例如：指定时间戳对应的时间为：2023-02-01 11:20:47，实际失效时间为：2023-02-01 23:59:59。 |
| authorizedType | | int32 | 否 | body | 授权印章使用对象，默认：**0**<br/>**0** - 被授权企业的管理员/法定代表人<font style="color:#F5222D;">（不限被授权方企业下的开发者应用ID）</font><br/>**1** - 被授权企业下的应用<font style="color:#F5222D;">（仅限被授权企业下的某个指定应用ID使用，必须配合applicationsId字段使用）</font> |
| applicationsId | | string | 否 | body | 被授权企业下的开发者应用ID（appId），默认不限被授权方企业下的应用ID。<font style="color:#DF2A3F;">（authorizedType为1时该参数必传）</font> |
| redirectUrl | | string | 否 | body | 授权书签署完成后重定向跳转地址（需符合http、https协议） |
| <font style="color:rgb(64, 64, 64);">appScheme</font> | | <font style="color:rgb(64, 64, 64);">string</font> | <font style="color:rgb(64, 64, 64);">否</font> | <font style="color:rgb(64, 64, 64);">body</font> | <font style="color:rgb(64, 64, 64);">签署授权书时进行支付宝刷脸意愿认证后，可以跳回开发者app。</font> |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
| | authorizationSignShortUrl | | | | string | 否 | 授权书签署url短链<font style="color:#E8323C;">（有效期180天）</font> |
| | authorizationSignUrl | | | | string | 否 | 授权书签署url长链<font style="color:#E8323C;">（永久有效）</font> |
| | sealAuthBizIds<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | array | 否 | 授权业务流程编号列表<font style="color:#E8323C;">（建议开发者妥善保存业务流程编号）</font> |
| |  | sealId | | | string | 否 | 授权印章ID<font style="color:#E8323C;"></font> |
| | | sealAuthBizId | | | string | 否 | 授权印章对应的业务流程编号 |
| | ~~sealAuthBizId~~ | | | | string | 否 | 授权业务流程编号<font style="color:#DF2A3F;">（旧版）</font><br/><font style="color:#E8323C;">【注】</font>自2024年11月20日起，支持一次授权多个印章，所以授权业务流程编号拓展成数组类型，开发者可以忽略此字段，直接看上方sealAuthBizIds字段 |


### 请求示例
```json
{
    "orgId": "0c5bd49**648bfbf",
    "sealIds": [
        "0ff52476-1111-448e-9260-466f5b4b1b04"
    ],
    "transactorPsnId": "c7e00294**41e7",
    "effectiveTime": 1636525541000,
    "expireTime": 1668061541000,
    "authorizedOrgInfo": {
        "orgName": "这是一个受托企业的名称",
        "orgIDCardNum": "91330108******1222"
    },
    "redirectUrl": "https://www.xx.cn/"
}
```

### 响应示例
```json
{
    "message": "成功",
    "code": 0,
    "data": {
        "sealAuthBizId": "565149b2-1111-4c5c-91fb-5e6e4e59db21",
        "sealAuthBizIds": [
            {
                "sealId": "0ff52476-1111-448e-9260-466f5b4b1b04",
                "sealAuthBizId": "565149b2-1111-4c5c-91fb-5e6e4e59db21"
            }
        ],
        "authorizationSignUrl": "https://h5.esign.cn/mesign/guide?context=Nksbcxa&flowId=0d46****89889dce16966b8&organ=true&appId=5****5&linkSource=1&bizType=1&tsign_source_type=SIGN_LINK_XUANYUAN&tsign_source_detail=1vGqUyZBm8k4aIosgUEaAJ40lsE7AJ7F9iSLvM9qrkC28h11ZZUbSoIipVsi%2BtbjwrVJo2n0cjgeEFrWTVKT8mOocb7oM8s2EIx3JuKOt16arLi98Q0TRUjf3JROLf08nYE2XOMSuPrevLzSmwsVj1GKu4v0VKzqOOcpKoj%2BeAuhvQL6l1mXSrTXXZ0kmK5bXfbgH%2F2tW0rbfa3iyzlHvb%2FCYLKwiQ5xvOEghorX0i2eypB%2Frf",
        "authorizationSignShortUrl": "https://t.esign.cn/MkgR***cT0"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gqgb0gwznb2su405)

