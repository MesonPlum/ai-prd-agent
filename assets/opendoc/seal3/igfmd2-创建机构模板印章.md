> [**必须确保企业用户已授予平台appId获取其印章资源管理权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/kcbdu7)
>
> + **manage_org_seal - 授权允许获取企业/组织用户的印章的查询、新增、编辑、授权、删除权限**
>

### 接口描述
使用e签宝提供的模板样式来制作机构印章。

+ 印章创建成功后，e签宝将会向开发者推送[【创建印章通知】](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/qgn8c6)。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/seals/org-seals/create-by-template

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 是 | body | 机构账号ID<br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询 |
| sealName | string | 是 | body | 机构印章名称（用户自定义，且名称不可重复） |
| sealTemplateStyle | string | 是 | body | 机构模板印章样式，印章效果参考[【印章样式说明及展示效果】](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/xl2yiv#IOrtZ)<br/>**PUBLIC_ROUND_STAR **- 圆形公章<font style="color:#F5222D;">（带五角星）</font><br/>**PUBLIC_OVAL **- 椭圆形公章<font style="color:#F5222D;">（不带五角星）</font><br/>**PUBLIC_TWO_OVAL **- 双椭圆形公章<font style="color:#F5222D;">（不带五角星）</font><br/>**CONTRACT_ROUND_NO_STAR **- 合同专用章<font style="color:#E8323C;">（圆形章，不带五角星）</font><br/>**CONTRACT_ROUND_STAR **- 合同专用章<font style="color:#E8323C;">（圆形章，带五角星）</font><br/>**PERSONNEL_ROUND_NO_STAR **- 人事专用章<font style="color:#E8323C;">（圆形章，不带五角星）</font><br/>**PERSONNEL_ROUND_STAR**<font style="color:rgb(0, 0, 0);"> </font>- 人事专用章<font style="color:#E8323C;">（圆形章，带五角星）</font><br/>**FINANCE_ROUND_NO_STAR **- 财务专用章<font style="color:#E8323C;">（圆形章，不带五角星）</font><br/>**FINANCE_ROUND_STAR **- 财务专用章<font style="color:#E8323C;">（圆形章，带五角星）</font><br/>**FINANCE_SQUARE_HORIZONTAL **- 财务专用章<font style="color:#E8323C;">（横排正方形章，不带五角星）</font><br/>**FINANCE_SQUARE_VERTICAL **- 财务专用章<font style="color:#E8323C;">（竖排正方形章，不带五角星）</font><br/>**COMMON_ROUND_STAR - **其他章<font style="color:#E8323C;">（圆形章，带五角星）</font><br/>**COMMON_OVAL** **- **其他章<font style="color:#F5222D;">（椭圆章）</font><br/>**COMMON_TWO_OVAL - **其他章<font style="color:#F5222D;">（双椭圆章）</font> |
| sealSize | string | 是 | body | 机构印章尺寸（单位：毫米mm，格式：宽_高）<br/>+ <font style="color:#E8323C;">请依据指定的模板印章样式传入对应的印章尺寸：</font><br/>PUBLIC_ROUND_STAR 样式固定尺寸：**42_42、40_40**<br/>PUBLIC_OVAL 样式固定尺寸：**45_30**<br/>PUBLIC_TWO_OVAL 样式固定尺寸: **45_30**<br/>CONTRACT_ROUND_NO_STAR 样式固定尺寸：**38_38**<br/>CONTRACT_ROUND_STAR 样式固定尺寸：**38_38**<br/>PERSONNEL_ROUND_NO_STAR 样式固定尺寸: **38_38**<br/>PERSONNEL_ROUND_STAR 样式固定尺寸: **38_38**<br/>FINANCE_ROUND_NO_STAR 样式固定尺寸: **38_38**<br/>FINANCE_ROUND_STAR 样式固定尺寸: **38_38**<br/>FINANCE_SQUARE_HORIZONTAL 样式固定尺寸: **22_22**<br/>FINANCE_SQUARE_VERTICAL 样式固定尺寸：**22_22**<br/>COMMON_ROUND_STAR 样式固定尺寸：**42_42、40_40**<br/>COMMON_OVAL 样式固定尺寸**：45_30**<br/>COMMON_TWO_OVAL 样式固定尺寸：**45_30** |
| sealColor | string | 否 | body | 机构印章颜色（默认值为 RED）<br/>**RED **-红色，**BLUE **-蓝色，**BLACK **-黑色，**PURPLE **-紫色 |
| sealOpacity | int32 | 否 | body | 印章不透明度（默认值为 80）<br/>取值范围 【**20-100】**（100表示不透明） |
| sealOldStyle | string | 否 | body | 印章图片做旧（默认值为 NONE）<br/>**NONE **- 不做旧，**OLD** - 随机样式做旧<br/><font style="color:#F5222D;">【注】</font>按**OLD_编号**格式传值来指定做旧样式，其编号范围为1-12。<br/>示例值：**OLD_1**、**OLD_2**、...、**OLD_10**、**OLD_11**、**OLD_12**。 |
| sealHorizontalText    | string | 否 | body | 自定义印章横向文，示例值：XX专用章<br/>+ 最多可设置30个字符 |
| sealBottomText    | string | 否 | body | 印章下弦文（实体印章防伪码），示例值：<font style="color:#000000;">9133********1</font><br/>+ 只支持英文或英文状态下的符号（半角符号）<br/>+ 最多可设置30个字符 |
| sealOutsideSurroundText | string | 否 | body | 印章环绕文（英文），双椭圆公章的外侧，例如企业英文名称<br/>+ 只支持英文字母或英文状态下的符号（半角符号）<br/>+ 最多可设置50个字符 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | <font style="color:rgb(64, 64, 64);">sealId</font> | | | | string | 否 | 印章ID<font style="color:#E8323C;">（建议开发者本地保存印章编号）</font> |


### 请求示例
```json
{
  "orgId": "0c5bd492**8bfbf",
  "sealName": "xx企业公章",
  "sealTemplateStyle": "PUBLIC_ROUND_STAR",
  "sealOpacity": "100",
  "sealColor": "RED",
  "sealOldStyle": "OLD_12",
  "sealSize":"40_40"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "sealId": "53642310-xx-xx-xx-xxx"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gqgb0gwznb2su405)

