> [**必须确保企业用户已授予平台appId获取其印章资源管理的权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)
>
> + **manage_org_seal - 授权允许获取企业/组织用户的印章的查询、新增、编辑、授权、删除权限**
>

### 接口描述
通过可视化的页面（免登录）来操作管理机构印章。

:::info
+ <font style="color:#E8323C;">【印章管理】</font>支持查看企业印章列表、创建企业印章、查看印章详情、删除企业印章；
+ <font style="color:#E8323C;">【授权管理】</font>支持新增印章授权（包括对企业内成员或外部企业）、查看印章授权信息、以及查看被其他跨企业授权印章信息；

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/seals/org-seals-manage-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 是 | body | 机构账号ID<br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询 |
| transactorPsnId | string | 是 | body | 机构经办人账号ID<br/><font style="color:#E8323C;">【注】</font>必须确保经办人在该机构的成员中，拥有印章管理权限。建议直接由法定代表人或者管理员来操作（[点击跳转【查询企业成员列表】接口](https://open.esign.cn/doc/opendoc/employee/bzrzic)） |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | orgSealManageUrl | | | | string | 否 | 机构印章管理页面链接（有效期30分钟，过期需要重新获取） |


### 请求示例
```json
{
  "orgId": "0c5bd492**8bfbf",
  "transactorPsnId": "c7e00294729***10541e7"
}
```

### 响应示例
```json
{
    "message": "成功",
    "code": 0,
    "data": {
        "orgSealManageUrl": "https://h5.esign.cn/auth/guide?loginId=xx-xx-xx-xx-xx"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gqgb0gwznb2su405)

