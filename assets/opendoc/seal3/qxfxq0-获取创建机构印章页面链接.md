> [**必须确保企业用户已授予平台appId获取其印章资源管理的权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)
>
> + **manage_org_seal - 授权允许获取企业/组织用户的印章的查询、新增、编辑、授权、删除权限**
>

### 接口描述
提供可视化的页面（免登录），由机构经办人选择印章的样式、内容等，来创建机构印章。

:::info
+ 开发者可预设置机构印章的样式等其他参数，若不指定则可由用户在页面中选择。
+ 接口用于获取制作机构印章的页面地址，支持开发者将地址集成到内部系统当中访问。
+ 通过页面印章创建成功后，e签宝将会向开发者推送[【创建印章通知】](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/qgn8c6)。

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/seals/org-seal-create-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 是 | body | 机构账号ID<br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询 |
| transactorPsnId | string | 是 | body | 经办人个人账号ID<br/><font style="color:#E8323C;">【注】</font>必须确保经办人在该机构的成员中，拥有印章管理权限。建议直接由法定代表人或者管理员来操作（[点击跳转【查询企业成员列表】接口](https://open.esign.cn/doc/opendoc/employee/bzrzic)） |
| <font style="color:rgb(64, 64, 64);">customBizNum</font> | <font style="color:rgb(64, 64, 64);">string</font> | <font style="color:rgb(64, 64, 64);">否</font> | <font style="color:rgb(64, 64, 64);">body</font> | 自定义业务编号<br/><font style="color:#DF2A3F;">【注】接口不对该参数的值做重复性校验。</font><br/>（用于关联开发者的业务系统，印章创建成功后将通过[创建印章回调通知](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/qgn8c6)和印章编号一同返回） |
| sealName | string | 否 | body | 机构印章名称（由用户自定义，且名称不可重复） |
| sealCreateMode | string | 否 | body | 指定制章方式<br/>**template **- 按照模板制作印章<br/>**file **- 上传本地图片制作印章 |
| sealTemplateStyle | string | 否 | body | 指定页面机构模板印章样式<br/>**PUBLIC_ROUND_STAR **- 圆形公章<font style="color:#F5222D;">（带五角星）</font><br/>**PUBLIC_OVAL **- 椭圆形公章<font style="color:#F5222D;">（不带五角星）</font><br/>**PUBLIC_TWO_OVAL **- 双椭圆形公章<font style="color:#F5222D;">（不带五角星）</font><br/>**CONTRACT_ROUND_NO_STAR **- 合同专用章<font style="color:#E8323C;">（圆形章，不带五角星）</font><br/>**CONTRACT_ROUND_STAR **- 合同专用章<font style="color:#E8323C;">（圆形章，带五角星）</font><br/>**PERSONNEL_ROUND_NO_STAR **- 人事专用章<font style="color:#E8323C;">（圆形章，不带五角星）</font><br/>**PERSONNEL_ROUND_STAR**<font style="color:rgb(0, 0, 0);"> </font>- 人事专用章<font style="color:#E8323C;">（圆形章，带五角星）</font><br/>**FINANCE_ROUND_NO_STAR **- 财务专用章<font style="color:#E8323C;">（圆形章，不带五角星）</font><br/>**FINANCE_ROUND_STAR **- 财务专用章<font style="color:#E8323C;">（圆形章，带五角星）</font><br/>**FINANCE_SQUARE_HORIZONTAL **- 财务专用章<font style="color:#E8323C;">（横排正方形章，不带五角星）</font><br/>**FINANCE_SQUARE_VERTICAL **- 财务专用章<font style="color:#E8323C;">（竖排正方形章，不带五角星）</font><br/>**COMMON_ROUND_STAR - **其他章<font style="color:#E8323C;">（圆形章，带五角星）</font><br/>**COMMON_OVAL** **- **其他章<font style="color:#F5222D;">（椭圆章）</font><br/>**COMMON_TWO_OVAL - **其他章<font style="color:#F5222D;">（双椭圆章）</font> |
| sealSize | string | 否 | body | 机构印章尺寸（单位：毫米mm，格式：宽_高）<br/>+ <font style="color:#E8323C;">请依据指定的模板印章样式传入对应的印章尺寸：</font><br/>PUBLIC_ROUND_STAR 样式固定尺寸：**42_42、40_40**<br/>PUBLIC_OVAL 样式固定尺寸：**45_30**<br/>PUBLIC_TWO_OVAL 样式固定尺寸: **45_30**<br/>CONTRACT_ROUND_NO_STAR 样式固定尺寸：**38_38**<br/>CONTRACT_ROUND_STAR 样式固定尺寸：**38_38**<br/>PERSONNEL_ROUND_NO_STAR 样式固定尺寸: **38_38**<br/>PERSONNEL_ROUND_STAR 样式固定尺寸: **38_38**<br/>FINANCE_ROUND_NO_STAR 样式固定尺寸: **38_38**<br/>FINANCE_ROUND_STAR 样式固定尺寸: **38_38**<br/>FINANCE_SQUARE_HORIZONTAL 样式固定尺寸: **22_22**<br/>FINANCE_SQUARE_VERTICAL 样式固定尺寸：**22_22**<br/>COMMON_ROUND_STAR 样式固定尺寸：**42_42、40_40**<br/>COMMON_OVAL 样式固定尺寸**：45_30**<br/>COMMON_TWO_OVAL 样式固定尺寸：**45_30** |
| sealColor | string | 否 | body | 机构印章颜色<br/>**<font style="color:rgb(64, 64, 64);">RED </font>**<font style="color:rgb(64, 64, 64);">-红色，</font>**<font style="color:rgb(64, 64, 64);">BLUE </font>**<font style="color:rgb(64, 64, 64);">-蓝色，</font>**<font style="color:rgb(64, 64, 64);">BLACK </font>**<font style="color:rgb(64, 64, 64);">-黑色，</font>**<font style="color:rgb(64, 64, 64);">PURPLE </font>**<font style="color:rgb(64, 64, 64);">-紫色</font> |
| sealOpacity | int32 | 否 | body | 印章不透明度（默认值为80）<br/> 取值范围 【**20-100】**（100表示不透明） |
| redirectUrl | string | 是 | body | 重定向地址<br/>创建成功后跳转到的页面地址，满足https地址协议，不可超过1024个字符 |
| uneditableFields | list | 否 | body | 设置页面中**不可编辑**的字段，可选值如下：<br/>+ **sealCreateMode - **制章方式<br/>+ **sealName - **印章名称<br/>+ **sealTemplateType - **印章模板类型<br/>+ **sealTemplateStyle - **印章模板样式<br/>+ **sealSize - **印章尺寸<br/>+ **sealColor - **印章颜色<br/>+ **sealOpacity - **印章不透明度 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | orgSealCreateUrl | | | | string | 否 | 创建机构印章页面链接（有效期30分钟，过期需要重新获取） |


### 请求示例
```json
{
    "orgId":"0c5bd492***48bfbf",
    "transactorPsnId": "c7e00294***10541e7",
    "customBizNum": "这是一串开发者内部系统自定义的编号",
    "sealName": "这是个预定义的企业印章名称",
    "sealColor": "RED",
    "redirectUrl":"http://www.xxx.cn/",
    "uneditableFields":["sealName","sealColor"]
}
```

### 响应示例
```json
{
    "message": "成功",
    "code": 0,
    "data": {
        "orgSealCreateUrl": "https://h5.esign.cn/auth/guide?loginId=xx-xx-xx-xx-xx"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gqgb0gwznb2su405)

