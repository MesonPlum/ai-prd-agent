> [**必须确保企业用户已授予平台appId获取其组织成员的管理权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/kcbdu7)
>
> + **manage_org_member- 授权允许获取企业/组织用户的组织成员的查询、新增、编辑、删除权限**
>

### 接口描述
用于给企业/机构下的成员分配具体的身份角色，例如：印章的管理、成员的管理等。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/organizations/{orgId}/member/add-role

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;"></font>** |
| --- | --- | :---: | :---: | :---: | --- |
| orgId | | string | 是 | path | 机构账号ID<br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询 |
| memberPsnId | | string | 是 | body | 成员个人账号ID<br/><font style="color:#E8323C;">【注】</font>成员个人账号ID请使用：[【查询企业成员列表】](https://open.esign.cn/doc/opendoc/employee/bzrzic)接口获取 |
| addRole | | string | 否 | body | 要添加的角色，多个角色用英文逗号隔开<br/>2 - 印章保管员（可以对企业印章进行创建、删除、修改、查询等操作）<br/>3 - 成员管理员（可以对企业成员进行添加、移除、修改、查询等操作）<br/>4 - 模板管理员（可以对模板进行复制、新增、删除、开启、关闭、查询等操作） |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);"></font> | | | | | object | 否 | 业务数据（扩展字段，目前返回null） |


### 请求示例
```json
{
    "memberPsnId": "ddc491dab*****bfe11",
    "addRole": "2,3"
}
```

### 响应示例
```json
{
    "message": "成功",
    "code": 0,
    "data": null
}
```

### 错误码
[**点击查看错误码**](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/ckh528ox9a1k9u07#zotug)

