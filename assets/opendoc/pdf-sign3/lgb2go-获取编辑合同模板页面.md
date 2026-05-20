### 接口描述
基于已创建的合同模板，可通过此接口再次获取模板的编辑页面链接。

:::warning
**<font style="color:#E8323C;">【注意事项】</font>**

+ <font style="color:#DF2A3F;">只能编辑</font>[【获取制作合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xagpot)<font style="color:#DF2A3F;">接口制作的模板，不支持SaaS官网生成的模板。</font>
+ <font style="color:#E8323C;">沙箱环境和正式环境不互通，需要分别获取不同的页面链接进行编辑。</font>

:::

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1733109704738-20a5b099-4643-4ea9-a6a8-fad594a72580.png)

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/doc-templates/{docTemplateId}/doc-template-edit-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **** | **** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :--- | :--- | :---: | :---: | --- | --- |
| docTemplateId | | | string | 是 | path | 文件模板ID<font style="color:#DF2A3F;">（通过</font>[【获取制作文件模板页面链接】](https://qianxiaoxia.yuque.com/books/share/7c96739d-040e-47f2-8782-24d4b5b7b24f/xagpot)<font style="color:#DF2A3F;">接口获取）</font> |
| redirectUrl | | | string | 否 | body | 编辑模板完成后页面重定向跳转地址（需符合 https /http 协议地址） |
| <font style="color:rgb(64, 64, 64);">hiddenOriginComponents</font> | | | <font style="color:rgb(64, 64, 64);">boolean</font> | <font style="color:rgb(64, 64, 64);">否</font> | <font style="color:rgb(64, 64, 64);">body</font> | <font style="color:rgb(64, 64, 64);">是否隐藏原始控件，默认false</font><br/>**<font style="color:rgb(64, 64, 64);">true </font>**<font style="color:rgb(64, 64, 64);">- 隐藏，</font>**<font style="color:rgb(64, 64, 64);">false </font>**<font style="color:rgb(64, 64, 64);">- 不隐藏</font> |
| basicComponentsType | | | array | 否 | body | 要展示的基础控件类型列表<font style="color:#DF2A3F;">（不传默认全部展示）</font><br/>1 - 单行文本，2 - 数字，3 - 日期，5 - 骑缝签署区，6 - 普通签章区，8 - 多行文本，9 - 复选，10 - 单选，11 - 图片，14 -下拉框，15 - 勾选框，16 - 身份证，17 - 备注区域<br/><font style="color:#DF2A3F;">【注】：</font><br/>+ <font style="color:#DF2A3F;">hiddenOriginComponents=false时才生效</font> |
| showReplaceFraft | | | boolean | 否 | body | 是否展示替换底稿按钮，默认值 **false**<br/>**true** - 展示替换底稿按钮<br/>**false** - 不展示替换底稿按钮 |
| <font style="color:rgb(64, 64, 64);">customComponentGroups</font> | | | <font style="color:rgb(64, 64, 64);">array</font> | <font style="color:rgb(64, 64, 64);">否</font> | <font style="color:rgb(64, 64, 64);">body</font> | 要展示的自定义控件组ID列表<br/>自定义控件组请使用接口：[【创建控件组】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/pupwutihq20wss04) |
| <font style="color:rgb(64, 64, 64);">customComponents</font><br/><font style="color:rgb(64, 64, 64);"></font> | | | <font style="color:rgb(64, 64, 64);">array</font> | <font style="color:rgb(64, 64, 64);">否</font> | <font style="color:rgb(64, 64, 64);">body</font> | 要展示的自定义控件ID列表<br/>自定义控件请使用接口：[【创建自定义业务控件】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/agc4mx5ei2cg8qsc) |
| signerRoles | | | list | 否 | body | 签署方角色标识，只对签署区控件生效（可以自定义命名，如：甲方、乙方）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 该字段主要为了区分不同的签署方位置，通过[【查询合同模板中控件详情】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/aoq509)查询到不同签署角色的位置坐标，来辅助发起签署的签署区定位<br/>+ 在同一次请求里，签署方角色标识不可以重复 |


### 响应参数
| **参数名称** | | **参数类型** | **必选** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| code | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message**** | | string | 否 | <font style="color:rgb(64, 64, 64);">业务信息</font><br/><font style="color:rgb(245, 34, 45);">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | object | 否 | 业务数据 |
| | docTemplateEditUrl | string | 否 | 编辑文件模板的页面短链接<font style="color:#E8323C;">（有效期24小时）</font> |
| | docTemplateEditLongUrl | string | 否 | 编辑文件模板的页面长链接<font style="color:#E8323C;">（有效期24小时）</font> |


### 请求示例
```json
POST https://openapi.esign.cn/v3/doc-templates/b7018f7e130***978925f2/doc-template-edit-url

{
  "redirectUrl":"https://www.xxx.com/"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "docTemplateEditUrl": "https://smlt.esign.cn/BdZ***",
        "docTemplateEditLongUrl": "https://smlfront.esign.cn:8880/template/common/set/openApi?docTemplateId=2b0853****8ec6d7aac9708d&appId=74388****&encryption=qAJmscCZIO1Q4LGZyL4gKopy495WrZlSKNku7Bx7z9Z0pp5hKIaNgizK4Vlt1eNJg8zDXh5***Q%3D%3D&scene=api&redirectUrl=https://esign.cn"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/px5yvgqf9glbs7o6)



