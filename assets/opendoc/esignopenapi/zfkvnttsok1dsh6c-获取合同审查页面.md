### 接口描述
提供用户免登录直接进入e签宝的合同审查页面，可内嵌到自身系统内，帮助开发者快速识别合同潜在风险。接口获取的页面样式如下：

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1765877497099-02d52de8-090e-4183-b618-93f875f17dff.png)

:::warning
[点击跳转 e签宝官网-合同审查功能介绍](https://help.esign.cn/detail?id=crl7evd1it72ygdv&nameSpace=cs3-dept%2Fexboae)<font style="color:#DF2A3F;">（版本要求和审核次数跟e签宝官网对应的企业同步）</font>

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/contract-review/get-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | | | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | :---: | :---: | :---: | --- |
| orgId | | | | string | 是 | body | 机构账号ID<br/><font style="color:#DF2A3F;">【注】</font><br/>+ 企业用户在e签宝注册实名后才有账号ID，账号ID获取方式可以使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询；<br/>+ 若非开发者自身平台企业账号（appId所属企业），需先经过[【机构用户授权】](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)获取对应权限后才可使用（**manage_org_contract** - 授权允许获取企业/组织用户的合同的管理权限）。 |
| transactorPsnId | | | | string | 是 | body | 经办人账号ID<br/><font style="color:#E8323C;">【注】</font><br/>+ 经办人需要有授予智能工具-使用合同审查权限（建议企业管理员去操作），可通过[【查询企业成员列表】](https://qianxiaoxia.yuque.com/opendoc/employee/bzrzic)接口获取企业成员的账号ID。 |
| fileId | | | | string | 否 | body | 预传入文件ID（请使用文件上传接口：[上传本地文件](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256)；使用说明：[接口调用Postman图解](https://open.esign.cn/doc/opendoc/case3/hxzn88wydyft769i#OcO5C)）<br/><font style="color:#DF2A3F;">【注】</font><br/>+ 只支持上传.doc、.docx、.pdf格式文件，文件大小不超过50MB；<br/>+ 若指定了文件ID，调通后用户访问页面时会自动触发审查。 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | contractReviewUrl | | | | string | 否 | 免登录合同审查页面地址（有效期24小时，过期需要重新获取） |


### 请求示例
```json
{
    "orgId": "842ec8ce3f11118ee80675fc91662f",
    "transactorPsnId": "7ffcae11111c3aaca1d8f0ef0a8f6"
}
```

### 响应示例
```json
{
    "code": 0,
    "data": {
        "contractReviewUrl": "https://wps-weboffice-sml.tsign.cn/epaas-contract-drafting/review-manage?tempToken=eyJhbGciOiJIUzI1NiIsInppcCI6IkRFRiJ9.eNqqViouTVKyUrJMSUlNNTO1NE81MzIxMzVLsrA0MjYws0hMM7dMNDJJUdJRSq0oULIyNAcqMjM2tbCsBQAAAP__.L8OZGjZuQWv9OkNg4TsqJSGRfCF_zDEcJOMm8aHZyOI&appId=4438864954&tenantToken=1AQ9hdXRoVGVtcGxhdGVLZfkQAAAByJmPuuVmTk9STUHMODJjMGZmZGNkZGQwNDA2YWEwZTgyYjA2OTQ0YjFmYbA%3D&dc=as1"
    },
    "message": "SUCCESS"
}
```

