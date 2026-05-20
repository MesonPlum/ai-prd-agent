> [**必须确保个人用户已授予平台appId获取其印章资源管理权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/opendoc/auth3/rx8igf)
>
> + **manage_psn_resource - 授权允许获取个人用户的印章等资源的管理权限**
>

### 接口描述
提供可视化的页面（免登录），由个人用户选择印章的样式、内容等，创建个人印章。

:::info
+ 开发者可预设置印章的样式等其他参数，若不指定则可由用户在页面中选择。
+ 接口用于获取制作个人印章的页面地址，支持开发者将地址集成到内部系统当中访问。
+ 通过页面印章创建成功后，e签宝将会向开发者推送[【创建印章通知】](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/qgn8c6)。

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/seals/psn-seal-create-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;"></font>** |
| --- | :---: | :---: | :---: | --- |
| psnId | string | 是 | body | 个人账号ID<br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询个人认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/vssvtu)接口通过个人账号标识（手机号或邮箱）/个人用户的证件号进行查询 |
| customBizNum | string | 否 | body | 自定义业务编号，<font style="color:#E8323C;">【注】：</font>接口不对该参数的值做重复性校验。<br/>（用于关联开发者的业务系统，印章创建成功后将通过[创建印章回调通知](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/qgn8c6)和印章编号一同返回） |
| sealName | string | 否 | body | 印章名称（用户自定义，名称不可重复） |
| sealCreateMode | string | 否 | body | 指定制章方式<br/>**template **- 按照模板制作印章<br/>**file **- 上传本地图片制作印章 |
| sealTemplateStyle | string | 否 | body | 指定页面模板印章样式<br/>**RECTANGLE_NO_BORDER**- 不带边框长方形章<br/>**RECTANGLE_BORDER**- 带边框长方形章<br/>**SQUARE_LEFT_BORDER**- 带边框正方形章（左侧字体放大）<br/>**SQUARE_RIGHT_BORDER**- 带边框正方形章（右侧字体放大）<br/>**SQUARE_LEFT_NO_BORDER**- 不带边框正方形章（左侧字体放大）<br/>**SQUARE_RIGHT_NO_BORDER**- 不带边框正方形章（右侧字体放大） |
| sealSize | string | 否 | body | 固定个人印章尺寸（单位毫米mm），格式：宽_高<br/><font style="color:#E8323C;">请依据指定的模板印章样式传入对应的印章尺寸：</font><br/>长方矩形章固定值：**20_10**<br/>正方形章固定值：**20_20、18_18、16_16** |
| sealColor | string | 否 | body | 指定个人印章颜色，默认值为RED<br/>**RED**-红色、**BLUE**-蓝色、**BLACK**-黑色、**PURPLE**-紫色 |
| sealSuffix | int32 | 否 | body | 指定印章后缀格式，默认值为0<br/>**0** - 无后缀（仅显示姓名，如：赵四）<br/>**1** - 加“印”（姓名后添加“印”字，如：赵四印）<br/>**2** - 加“之印”（姓名后添加“之印”，如：赵四之印） |
| sealOpacity | int32 | 否 | body | 印章不透明度（默认值为80）<br/> 取值范围 **【20-100】**（100表示不透明） |
| redirectUrl | string | 是 | body | 重定向地址，印章创建成功后跳转到的页面地址<br/>（需满足http/https地址协议，app场景支持appScheme格式） |
| uneditableFields | list | 否 | body | 设置页面中**不可编辑**的字段<br/>+ **sealCreateMode - **制章方式<br/>+ **sealName - **印章名称<br/>+ **sealSuffix - **印章后缀格式<br/>+ **sealTemplateStyle - **印章模板样式<br/>+ **sealSize - **印章尺寸<br/>+ **sealColor - **印章颜色<br/>+ **sealOpacity - **印章不透明度 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | psnSealCreateUrl | | | | string | 否 | 创建个人印章页面链接（有效期30分钟，过期需要重新获取） |


### 请求示例
```json
{
  "psnId": "c7e002***0541e7",
  "sealName": "这是一个预定义印章名称",
  "customBizNum": "这是一串开发者内部系统自定义的编号",
  "redirectUrl":"https://www.xxx.cn/",
  "uneditableFields":["sealName","sealOpacity"]
}
```

### 响应示例
```json
{
    "message": "成功",
    "code": 0,
    "data": {
        "psnSealCreateUrl": "https://h5.esign.cn/auth/guide?loginId=xx-xx-xx-xx-xx"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gqgb0gwznb2su405)

