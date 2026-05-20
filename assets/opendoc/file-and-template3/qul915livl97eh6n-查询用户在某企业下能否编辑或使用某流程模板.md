### 接口描述
查询某用户在某企业下能否编辑、使用某流程模板。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-templates/permission

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| psnId | string | 是 | query | <font style="color:rgb(64, 64, 64);">个人账号ID </font><br/><font style="color:#E8323C;">【注】通过</font> [【查询企业成员列表】](https://qianxiaoxia.yuque.com/opendoc/employee/bzrzic) <font style="color:#E8323C;">查询企业成员的账号ID（psnId）</font> |
| orgId | string | 是 | query | <font style="color:rgb(64, 64, 64);">机构账号ID</font><br/><font style="color:#E8323C;">【注】用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用</font>[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)<font style="color:#E8323C;">接口通过组织机构名称/组织机构证件号进行查询</font> |
| signTemplateId | string | 是 | query | 流程模板ID |
| permission | int | 否 | query | 流程模板编辑或使用权限，默认查询全部权限<br/>1 - 编辑权限<br/>2 - 使用权限 |


### 响应参数
| **参数名称** | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message 匹配，因为message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | object | 否 | 业务数据 |
| | editPermission | | boolean | 否 | 编辑权限<br/>true-可使用<br/>false-不可使用 |
| | usingPermission | | boolean | 否 | 使用权限<br/>true-可使用<br/>false-不可使用 |


### 请求示例
```http
//正式线上环境--GET请求
GET 'https://openapi.esign.cn/v3/sign-templates/permission?signTemplateId=c53786b******d20244e92&orgId=842ec8ce*****c91662f&psnId=7ffc****ef0a8f6'

//沙箱模拟环境--GET请求
GET 'https://smlopenapi.esign.cn/v3/sign-templates/permission?signTemplateId=c53786b******d20244e92&orgId=842ec8ce*****c91662f&psnId=7ffc****ef0a8f6'
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "editPermission": true,
        "usingPermission": true
    }
}
```

