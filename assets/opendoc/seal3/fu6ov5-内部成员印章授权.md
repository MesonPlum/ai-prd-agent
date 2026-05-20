> [**必须确保企业用户已授予平台appId获取其印章资源管理和发起签署的权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)
>
> + **manage_org_seal - 授权允许获取企业/组织用户的印章的查询、新增、编辑、授权、删除权限**
> + **org_initiate_sign - 授权允许代表企业/组织用户发起合同签署以及查询合同签署详情**
>

### 接口描述
（企业法定代表人/企业管理员）将企业印章授予内部成员相关权限，需要签署<font style="color:#E8323C;">《电子印章授权书》</font>或做<font style="color:#DF2A3F;">印章授权意愿认证</font>，接口用于印章授权的操作链接。

:::warning
**<font style="color:#F5222D;">注意事项：</font>**

+ <font style="color:#000000;">被授权的成员须确保已加入到印章所属企业组织下，</font>点击前往[“企业成员服务API”](https://qianxiaoxia.yuque.com/books/share/5f5d0c9f-0af8-4ded-b32c-cae4086a587c/has759)<font style="color:#000000;">添加成员。</font>
+ <font style="color:#000000;">当需要签</font>署《电子印章授权书》时，<font style="color:#000000;">开发者应用系统中可以集成该接口返回的授权书签署链接或使用e签宝自带的短信通知（前提是操作人账号有手机号绑定），企业管理员或法定代表人查看及签署。</font>
+ <font style="color:#000000;">当需要做印章授权意愿认证时，没有e签宝短信通知，只能开发者应用系统中集成或者单独发给企业管理员或法定代表人操作。</font>
+ <font style="color:#000000;">授权操作人必须为该企业成员，否则无法发起，建议授权操作人为当前企业管理员或法定代表人。</font>
+ 开发者可参考[印章授权生效通知](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/cwpqgv)<font style="color:#000000;">来接收印章授权生效的回调通知。</font>
+ [点击这里](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/ydh5ue)<font style="color:#000000;">了解更多企业印章内部授权说明。</font>

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/seals/org-seals/internal-auth

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;"></font>** |
| --- | --- | :---: | :---: | :---: | --- |
| orgId | | string | 是 | body | 机构账号ID<br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询 |
| sealId | | string | 是 | body | 授权印章ID<font style="color:#E8323C;">（企业印章编号）</font><br/><font style="color:#F5222D;">【注】</font>通过接口获取企业印章ID：[ 查询企业内部印章](https://qianxiaoxia.yuque.com/opendoc/seal3/ups6h1) |
| authorizedPsnIds | | list | 是 | body | 指定被授权成员（**账号ID或ALL**）<font style="color:#E8323C;"></font><br/>+ **被授权人账号ID列表****<font style="color:#DF2A3F;">（最多授权10个成员）</font>**<br/>+ **ALL **- 授权全部企业成员<br/><font style="color:#F5222D;">【注】</font>传ALL时，sealRole印章角色只能指定印章使用员 |
| sealRole | | string | 是 | body | 指定印章角色，[点击了解](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/ydh5ue#CiGWR)印章角色介绍<br/>**SEAL_USER **- 印章使用员（印章使用权限）<br/>**SEAL_EXAMINER **- 印章审批员（印章使用权限+用印审批权限） |
| transactorPsnId | | string | 是 | body | 授权操作人账号ID<br/><font style="color:#F5222D;">【注】</font>建议传入企业管理员或法定代表人的个人账号ID。若传入普通企业成员账号ID，则默认会向企业管理员发送授权书签署通知。 |
| sealAuthScope | | object | 是 | body | 授权印章使用范围<br/>**<font style="color:#F5222D;">【注】以下templateIds和applicationsIds必须二选一传值（不能同时传或者同时不传）</font>** |
| | templateIds | list | 否 | body | 授权的企业模板编号列表（**模板编号或ALL**），不传就是不限模板<br/>+ **具体的模板编号**<br/>+ **ALL** - 授权机构账号下全部模板<br/><font style="color:#F5222D;">【注】</font><br/>（1）当授权全部企业成员（authorizedPsnIds传ALL）时，模板编号不能同时传ALL；<br/>（2）模板编号的数量最多支持传入10个。（模板编号可以登录e签宝官网复制） |
| | applicationsIds | list | 否 | body | 授权的开发者应用ID列表（appId），不传就是不限应用ID<br/><font style="color:#F5222D;">【注】</font>使用场景：当前授权的印章人员只能在特定的某个/某些企业的平台使用时，需传入平台的开发者应用ID |
| autoSign | | boolean | 否 | body | 印章是否设置自动落章，默认值 **false**<br/>**true** - 设置自动落章（设置自动落章仅限[《流程模板签署服务API》](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/ccrulvhqdvk42nza)和[《e签宝官网模板发起签署》](https://help.esign.cn/detail?id=fbumym&nameSpace=cs3-dept%2Fexboae)使用）<br/>**false** - 不设置自动落章<br/><font style="color:rgb(245, 34, 45);">【注】</font><br/>（1）设置自动落章必须授权全部企业成员，并且指定具体的模板编号。   （2）设置自动落章后，使用对应的模板发起签署的文件无需经办人手动签署，可自动加盖。<br/>（3）同一个模板只能授权对应企业下某一个印章自动落章，不允许多个印章自动落章。 |
| longTermEffective | | boolean | 否 | body | 印章授权是否长期有效（不限制授权时间），默认false<br/>**true** - 是<br/>**false** - 否<br/><font style="color:#F5222D;">【注】</font>当传true时，不能再传effectiveTime和expireTime，否则会报错：“设置为长期有效无需传入生效和失效时间”。 |
| effectiveTime | | int64 | 否 | body | 印章授权生效时间（[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)格式：单位毫秒）<br/>**<font style="color:#DF2A3F;">【注】当longTermEffective是false时，该字段必传</font>** |
| expireTime | | int64 | 否 | body | 印章授权失效时间（[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)格式，单位毫秒）<br/>**<font style="color:#F5222D;">【注】</font>****<font style="color:#DF2A3F;">当longTermEffective是false时，该字段必传</font>**<br/>（1）授权有效期最长不可超过3年。<br/>（2）授权实际失效时间是以天为单位，例如：指定时间戳对应的时间为：2023-02-01 11:20:47，实际失效时间为：2023-02-01 23:59:59。 |
| authConfirmMethod | | int32 | 否 | body | 授权确认方式，默认：1（签署授权书授权）<br/>**0** - 意愿认证授权<font style="color:#DF2A3F;">（直接跳转企业管理员/法定代表人刷脸页面，管理员/法定代表人刷脸完成即授权完成）</font><br/>**1** - 签署授权书授权<font style="color:#DF2A3F;">（获取企业管理员/法定代表人加盖企业公章和个人章的签署页面，授权书盖章签署完成即授权完成）</font> |
| redirectUrl | | string | 否 | body | 授权操作完成后跳转开发者指定的重定向跳转地址（符合http、https协议地址） |
| appScheme | | string | 否 | body | 开发者的app-Scheme地址，授权时进行支付宝刷脸意愿认证后（支付宝刷脸需要跳到支付宝app），可以根据Scheme地址跳回开发者自身app。 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
| | sealAuthBizIds | | | | array | 否 | 授权业务流程编号列表<font style="color:#E8323C;">（建议开发者本地保存业务流程编号）</font><br/>+ 当授权多位成员、多个模板或者多个开发者应用ID时，每位成员、每个模板或者每个开发者应用ID对应一个业务流程编号；<br/>+ 当授权全部企业成员或者全部模板时（ALL），只会返回一个业务流程编号； |
| | sealAuthBizInfos<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | array | 否 | 授权业务流程详细信息 |
| |  | authorizedPsnId | | | string | 否 | 被授权成员<br/>+ 被授权人账号ID / ALL（全部企业成员） |
| | | sealAuthBizId | | | string | 否 | 授权人对应的业务流程编号<br/>+ 当授权多个模板或者多个开发者应用ID时，可以调用[《查询对内部成员授权详情》](https://qianxiaoxia.yuque.com/opendoc/seal3/totfte)接口查询模板/应用与业务流程编号的对应关系 |
| | authorizationSignShortUrl | | | | string | 否 | 授权书签署短链接<font style="color:#E8323C;">（有效期180天）</font> |
| | authorizationSignUrl | | | | string | 否 | 授权书签署长链接<font style="color:#E8323C;">（永久有效）</font> |
| | sealAuthorizeType | | | | int | 否 | 授权操作人的企业成员角色<br/>**1 **- 管理员、法定代表人<br/>**2** - 普通成员 |


### 请求示例
```json
{
    "orgId":"0c5bd49***48bfbf",
    "sealId":"02590082-xx-xx-xx-2138db4d7b73",
    "effectiveTime":1636525541000,
    "expireTime":1668061541000,
    "transactorPsnId":"c7e0029***10541e7",
    "authorizedPsnIds":["7ffcae***f0a8f6","00371e8***c21ed09"],
    "sealAuthScope":{
        "templateIds":["ALL"]
    },
    "sealRole":"SEAL_EXAMINER",
    "redirectUrl":"https://www.xxx.cn/"
}
```

### 响应示例
```json
{
  "message": "成功",
  "code": 0,
  "data": {
    "sealAuthBizIds": [
      "b3eb3d0a-xx-xx-xx-bbda4ee40e07",
      "9089bd2e-xx-xx-xx-d94510e860e7"
    ],
    "sealAuthBizInfos": [
      {
        "authorizedPsnId": "626629******299f1d8c1d",
        "sealAuthBizId": "b3eb3d0a-xx-xx-xx-bbda4ee40e07"
      },
      {
        "authorizedPsnId": "0e04b427******0957c21e96",
        "sealAuthBizId": "9089bd2e-xx-xx-xx-d94510e860e7"
      }
    ],

    "authorizationSignUrl": "https://h5.esign.cn/mesign/guide?context=Nksbcxa&flowId=0d46****89889dce16966b8&organ=true&appId=5****5&linkSource=1&bizType=1&tsign_source_type=SIGN_LINK_XUANYUAN&tsign_source_detail=1vGqUyZBm8k4aIosgUEaAJ40lsE7AJ7F9iSLvM9qrkC28h11ZZUbSoIipVsi%2BtbjwrVJo2n0cjgeEFrWTVKT8mOocb7oM8s2EIx3JuKOt16arLi98Q0TRUjf3JROLf08nYE2XOMSuPrevLzSmwsVj1GKu4v0VKzqOOcpKoj%2BeAuhvQL6l1mXSrTXXZ0kmK5bXfbgH%2F2tW0rbfa3iyzlHvb%2FCYLKwiQ5xvOEghorX0i2eypB%2Frf",
    "authorizationSignShortUrl": "https://t.esign.cn/BP9a***rg7cw",
    "sealAuthorizeType": 2
  }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gqgb0gwznb2su405)

