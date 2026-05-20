### 接口描述
通过指定企业账号ID，来查询组织机构用户的授权范围以及授权的有效期限。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/organizations/{orgId}/authorized-info

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **<font style="color:black;">参数名称</font>** | **参数类型** | **<font style="color:black;">必选</font>** | **参数位置** | **<font style="color:black;">参数说明</font>** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 是 | path | 机构账号ID |


### 响应参数
| **参数名称** | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | string | 否 | 业务信息<br/><font style="color:#E8323C;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | object | 否 | 业务数据 |
|  | authorizedInfo | | array | 否 | 用户授权信息 |
| |  | authorizedScope | string | 否 | 用户授权范围<br/>+ **get_org_identity_info - **授权允许获取企业/组织的基本信息<br/>+ **org_initiate_sign** **- **授权允许代表企业/组织用户发起合同签署以及查询合同签署详情<br/>+ **manage_org_member - **授权允许获取企业/组织用户的组织成员的查询、新增、编辑、删除权限<br/>+ **manage_org_seal - **授权允许获取企业/组织用户的印章的查询、新增、编辑、授权、删除权限<br/>+ **manage_org_template -**授权允许获取企业/组织用户的模板的查询、新增、编辑、复制、删除权限<br/>+ **use_org_template - **授权允许获取企业/组织用户的模板的使用权限<br/>+ **manage_org_resource** - 授权允许获取企业/组织用户的印章、组织成员等资源的管理权限（不包含用印权限）<br/>+ **org_sign_file_storage **- 授权允许企业/组织合同文件存储到平台应用的本地服务器<br/>+ **org_approval_info - **授权允许获取企业/组织用户的用印审批信息<br/>+ **use_org_order** **- **授权允许获取企业/组织用户套餐订单的使用权限 |
| | | effectiveTime | int64 | 否 | 授权生效时间（Unix时间戳格式，单位毫秒） |
| | | expireTime | int64 | 否 | 授权到期时间（Unix时间戳格式，单位毫秒） |


### 请求示例
```http
GET https://openapi.esign.cn/v3/organizations/0c5bd4924**8bfbf/authorized-info
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "authorizedInfo": [
            {
                "authorizedScope": "use_org_order",
                "effectiveTime": 1653967422402,
                "expireTime": 1656559422402
            },
            {
                "authorizedScope": "manage_org_resource",
                "effectiveTime": 1653967422402,
                "expireTime": 1656559422402
            },
            {
                "authorizedScope": "org_initiate_sign",
                "effectiveTime": 1653967422402,
                "expireTime": 1656559422402
            },
            {
                "authorizedScope": "get_org_identity_info",
                "effectiveTime": 1653967422402,
                "expireTime": 1656559422402
            }
        ]
    }
}
```

**<font style="color:rgb(64, 64, 64);">错误码</font>**  
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/agi7xuv4yrw1i8f3)



