> [**必须确保企业用户已授予平台appId获取其印章资源管理的权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)
>
> + **manage_org_seal - 授权允许获取企业/组织用户的印章的查询、新增、编辑、授权、删除权限**
>

### 接口描述
解除机构印章的授权（内部成员或跨企业）。解除成功后，开发者将收到e签宝发送的[【解除印章授权】](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/wohggc)回调通知。

:::info
**注意事项：**

支持指定**印章编号**或印章授权时的**业务流程编号**来解除授权，区别在于当印章编号`**<font style="color:#FFA940;background-color:#E9E9E9;">sealId</font>**`同时存在内部成员授权和跨企业授权时：

+ 通过印章编号解除授权，即参数`**<font style="color:#FFA940;background-color:#E9E9E9;">deleteType</font>**`设置为sealIds，则印章对应内部成员和跨企业的授权将会一并解除。
+ 若指定解除对内部成员或跨企业一方授权，则参数`**<font style="color:#FFA940;background-color:#E9E9E9;">deleteType</font>**`可设置为sealAuthBizIds，实现对单方解除授权。

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/seals/org-seals/auth-delete

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;"></font>** |
| --- | --- | :---: | :---: | :---: | --- |
| orgId | | string | 是 | body | 机构账号ID<font style="color:#DF2A3F;">（委托单位）</font><br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询 |
| deleteType | | string | 是 | body | 指定解除授权的方式<br/>**sealIds **- 指定印章解除授权<br/>**sealAuthBizIds **- 指定授权业务流程编号解除授权 |
| sealIds | | array | 否 | body | 授权印章ID（印章编号）<br/><font style="color:#F5222D;">补充说明：</font><br/>+ 当deleteType传sealIds时，该参数必传值；<br/>+ 最多支持传入20个印章ID。 |
| sealAuthBizIds | | array | 否 | body | 授权业务流程编号<br/><font style="color:#F5222D;">补充说明：</font><br/>+ 当deleteType传sealAuthBizIds时，该参数必传值；<br/>+ 最多支持传入20个授权业务流程编号。 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data | | | | | object | 否 | 业务数据 |


### 请求示例
```json
{   
     "orgId": "0c5bd492**48bfbf",
     "deleteType":"sealIds",
     "sealIds":["02590082-xx-xx-xx-2138db4d7b73","a1ccfad7-xx-xx-xx-84c51bf3a7e4"]
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

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gqgb0gwznb2su405)

