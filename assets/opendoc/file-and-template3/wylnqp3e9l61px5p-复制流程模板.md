### 接口描述
通过该接口可以将原有流程模板复制一份副本到当前企业空间，或者到其他企业空间下（需要提前通过 [用户授权](https://open.esign.cn/doc/opendoc/auth3/kcbdu7) 接口获取 manage_org_template -授权允许获取企业/组织用户的模板的查询、新增、编辑、复制、删除权限）。

:::warning
<font style="color:#DF2A3F;">【注】：当复制流程模板到当前企业空间时，复制后会自动给复制出来的新的流程模板赋值模板名称，规则：在原模板名称加上"_副本"字样。例如原有模板名称为：合同模板，复制后新的模板名称则为：合同模板_副本。（复制到其他企业空间不加"_副本"字样）</font>

:::

### <font style="color:#DF2A3F;">接口地址&请求方法</font>
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-templates/copy

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 是 | body | 机构账号ID <br/><font style="color:#E8323C;">【注】用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用</font>[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)<font style="color:#E8323C;">接口通过组织机构名称/组织机构证件号进行查询</font> |
| transactorPsnId | string | 是 | body | 经办人个人账号ID<br/><font style="color:#E8323C;">【注】通过</font> [【查询企业成员列表】](https://qianxiaoxia.yuque.com/opendoc/employee/bzrzic) <font style="color:#E8323C;">查询企业成员的账号ID（psnId），经办人必须有模板复制权限（需要通过 </font>[用户授权](https://open.esign.cn/doc/opendoc/auth3/kcbdu7)<font style="color:#E8323C;"> 获取企业模板的管理权限），建议直接使用管理员账号</font> |
| signTemplateId | string | 是 | body | 流程模板ID |
| copyToExternalOrg | <font style="color:rgb(23, 43, 77);">boolean</font> | 否 | body | 是否复制到外部企业，默认为：false<br/>true - 是<br/>false - 否 |
| externalOrgId | string | 否 | body | 外部企业的机构账号ID<br/><font style="color:#DF2A3F;">【注】：copyToExternalOrg为true时必传</font> |
| externalTransactorPsnId | string | 否 | body | 外部企业的经办人个人账号ID<br/><font style="color:#DF2A3F;">【注】：copyToExternalOrg为true时必传</font> |


### 响应参数
| **参数名称** | | **参数类型** | **必选** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| code | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message**** | | string | 否 | <font style="color:rgb(64, 64, 64);">业务信息</font><br/><font style="color:rgb(245, 34, 45);">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | object | 否 | 业务数据 |
|  | copiedSignTemplateId | string | 是 | 复制出来的新流程模板ID |


### 请求示例
```json
{
        "orgId": "842ec8ce******5fc91662f",
        "transactorPsnId": "7ffcaed8******d8f0ef0a8f6",
        "signTemplateId": "6f5aa0fc*****756b42f71adb",
        "copyToExternalOrg":true,
        "externalOrgId":"3c4047cc*****279134e7",
        "externalTransactorPsnId":"10fcaed*****0ef0a8zn"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "copiedSignTemplateId": "c73a84b28c******e2bfa312ed"
    }
}
```

