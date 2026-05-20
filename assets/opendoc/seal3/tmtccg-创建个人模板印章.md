> [**必须确保个人用户已授予平台appId获取其印章资源管理权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/opendoc/auth3/rx8igf)
>
> + **manage_psn_resource - 授权允许获取个人用户的印章等资源的管理权限**
>

### 接口描述
使用e签宝提供的模板样式来制作个人印章。

:::warning
**<font style="color:#E8323C;">【注】</font>**印章中的姓名为个人用户已实名认证的真实姓名。

:::

+ 印章创建成功后，e签宝将会向开发者推送[【创建印章通知】](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/qgn8c6)。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/seals/psn-seals/create-by-template

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;"></font>** |
| --- | :---: | :---: | :---: | --- |
| psnId | string | 是 | body | 个人账号ID<br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询个人认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/vssvtu)接口通过个人账号标识（手机号或邮箱）/个人用户的证件号进行查询 |
| sealName | string | 是 | body | 印章名称（用户自定义，且名称不可重复） |
| sealTemplateStyle | string | 是 | body | 个人模板印章样式，<font style="color:#E8323C;">印章展示效果详见</font>[【印章样式说明及展示效果】](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/xl2yiv#pUNP1)<br/>长方形章可选值如下：<br/>**RECTANGLE_NO_BORDER**-** **不带边框长方形章<br/>**RECTANGLE_BORDER**- 带边框长方形章<br/>正方形章可选值如下：<br/>**SQUARE_LEFT_BORDER**-** **带边框正方形章（左侧字体放大）<br/>**SQUARE_RIGHT_BORDER**-** **带边框正方形章（右侧字体放大）<br/>**SQUARE_LEFT_NO_BORDER**- 不带边框正方形章（左侧字体放大）<br/>**SQUARE_RIGHT_NO_BORDER**-** **不带边框正方形章（右侧字体放大） |
| sealSize | string | 是 | body | 个人印章尺寸（单位毫米mm），格式：宽_高<br/><font style="color:#E8323C;">请依据指定的模板印章样式（sealTemplateStyle）传入对应的印章尺寸：</font><br/>长方形章的固定值：**20_10**<br/>正方形章的固定值：**20_20、18_18、****16_16** |
| sealColor | string | 否 | body | 个人印章颜色（默认值为RED）<br/>**RED**-红色，**BLUE**-蓝色，**BLACK**-黑色，**PURPLE**-紫色 |
| sealSuffix | int32 | 否 | body | 印章内容规则（印章中姓名后缀），默认值为0<br/>**0 **- 无后缀（仅显示姓名，如：赵四）<br/>**1** - 加“印”（姓名后添加“印”字，如：赵四印）<br/>**2** - 加“之印”（姓名后添加“之印”，如：赵四之印） |
| sealOpacity | int32 | 否 | body | 印章不透明度（默认值为80）<br/> 取值范围 【**20-100】**（100表示不透明） |
| sealOldStyle | string | 否 | body | 印章图片做旧（默认值为NONE）<br/>**NONE **- 不做旧，**OLD** - 随机样式做旧<br/><font style="color:#E8323C;">【注】</font>可按**OLD_编号**格式传值来指定做旧样式，其编号范围为1-12。<br/>示例值：**OLD_1**、**OLD_2**、...、**OLD_10**、**OLD_11**、**OLD_12**。 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | <font style="color:rgb(64, 64, 64);">sealId</font> | | | | string | 否 | 印章ID<font style="color:#E8323C;">（开发者需妥善保存印章ID）</font> |


### 请求示例
```json
{
  "psnId": "c7e002***0541e7",
  "sealName": "这是一个自定义的名称",
  "sealTemplateStyle": "SQUARE_LEFT_BORDER",
  "sealSize":"20_20",
  "sealColor": "RED",
  "sealSuffix": "2",
  "sealOldStyle": "OLD_1",
  "sealOpacity": "100"
}
```

### 响应示例
```json
{
    "message": "成功",
    "code": 0,
    "data": {
        "sealId": "1caebb40-xx-xx-xx-31f7f95087de"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gqgb0gwznb2su405)

