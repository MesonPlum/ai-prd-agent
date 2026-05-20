### 接口描述
开发者或用户通过可视化的**制作合同模板页面**（免登录）来**添加各类控件**，后续可通过[【填写模板生成文件】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/mv8a3i)或[【获取填写合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ub4ncy)接口生成最终的文件。

:::warning
**<font style="color:#E8323C;">【注意事项】</font>**

**<font style="color:#E8323C;">1、接口制作的合同模板是无法同步到e签宝SaaS官网的，且沙箱环境和正式环境不互通，需要分别制作。</font>**

2、合同模板分为 **PDF**和 **HTML**两种类型的模板，通过接口入参 `**<font style="color:#FA8C16;background-color:#E9E9E9;">docTemplateType</font>** `来进行区分。

+ 模板中的无表格或表格属于固定行填充时，请选择 **PDF **模板类型。
+ 模板中的表格需要动态增加行并填充内容时，请选择 **HTML**模板类型。

:::

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1733107480833-a5a22bbd-d4ef-4904-913b-6ba61bdaca68.png)![](https://cdn.nlark.com/yuque/0/2024/png/447795/1733107987038-94fa8092-9ff2-438f-b76c-b4649e9baf49.png)

### 接口地址&请求方法
> <font style="color:#333333;">点击下述蓝色字体{host}可跳转至API请求域名说明文档</font>
>

**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/doc-templates/doc-template-create-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **** | **** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :--- | :--- | :---: | :---: | :---: | --- |
| docTemplateName | | | string | 是 | body | 模板名称（可自定义模板名称） |
| docTemplateType | | | int32 | 否 | body | 模板类型，默认值为 0<br/>**0** - **PDF模板**<br/>**1** - **HTML模板**（适用动态增加表格行并填充内容场景） |
| fileId | | | string | 是 | body | 底稿文件ID（原始文件的编号）<br/>+ <font style="color:#DF2A3F;">在此底稿文件ID的基础上，添加各类控件来创建合同模板；</font><br/>+ <font style="color:#DF2A3F;">文件ID通过</font>[【上传本地文件】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256)<font style="color:#DF2A3F;">接口获取。</font> |
| redirectUrl | | | string | 否 | body | 制作模板完成后页面重定向跳转地址（需符合 https /http 协议地址） |
| hiddenOriginComponents | | | boolean | 否 | body | 是否隐藏原始控件，默认false<br/>**true **- 隐藏，**false **- 不隐藏 |
| basicComponentsType | | | list | 否 | body | 要展示的基础控件类型列表<font style="color:#DF2A3F;">（不传默认全部展示）</font><br/>1 - 单行文本，2 - 数字，3 - 日期，5 - 骑缝签署区，6 - 普通签章区，8 - 多行文本，9 - 复选，10 - 单选，11 - 图片，14 -下拉框，15 - 勾选框，16 - 身份证，17 - 备注区域<br/><font style="color:#DF2A3F;">【注】：</font><br/>+ <font style="color:#DF2A3F;">hiddenOriginComponents=false时才生效</font> |
| showReplaceFraft | | | boolean | 否 | body | 是否展示替换底稿按钮，默认值 **false**<br/>**true** - 展示替换底稿按钮<br/>**false** - 不展示替换底稿按钮 |
| customComponentGroups | | | list | 否 | body | 要展示的自定义控件组ID列表<br/>自定义控件组请使用接口：[【创建控件组】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/pupwutihq20wss04) |
| customComponents | | | list | 否 | body | 要展示的自定义控件ID列表<br/>自定义控件请使用接口：[【创建自定义业务控件】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/agc4mx5ei2cg8qsc) |
| signerRoles | | | list | 否 | body | 签署方角色标识，只对签署区控件生效（可以自定义命名，如：甲方、乙方）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 该字段主要为了区分不同的签署方位置，通过[【查询合同模板中控件详情】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/aoq509)查询到不同签署角色的位置坐标，来辅助发起签署的签署区定位<br/>+ 在同一次请求里，签署方角色标识不可以重复 |
| dedicatedCloudId | | | string | 否 | body | 专属云项目ID<br/><font style="color:#E8323C;">补充说明：</font><br/>（1）专属云：文件需要存储在开发者本地系统，购买了专属云服务时使用；<br/>（2）专属云项目ID获取方式：请先联系对接群内技术获取。<br/>（3）专属云项目ID需要先在[【获取文件上传地址】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256#e0adY)接口传入，这里必须传入同一个项目ID才可用。 |


### 响应参数
| **参数名称** | | **参数类型** | **必选** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| code | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message**** | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | object | 否 | 业务数据 |
| | docTemplateId | string | 否 | 合同模板ID<font style="color:#E8323C;">（建议开发者保管，当制作合同模板的链接过期失效后，可用于再次获取该模板的编辑链接，以及之后填充控件内容）</font> |
| | docTemplateCreateUrl | string | 否 | 制作合同模板的页面短链接<font style="color:#E8323C;">（有效期24小时）</font> |
| | docTemplateCreateLongUrl | string | 否 | 制作合同模板的页面长链接<font style="color:#E8323C;">（有效期24小时）</font> |


### 请求示例
```json
{
  "docTemplateName":"某公司的劳动合同模板",
  "docTemplateType":0,
  "fileId":"0e99de7ce***9db2cd69",
  "redirectUrl":"https://www.xxx.cn/",
   "signerRoles": [
        "甲方",
        "乙方"
    ]
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "docTemplateId": "9036ca4d1******c6095e993",
        "docTemplateCreateUrl": "https://smlt.esign.cn/m***ILc",
        "docTemplateCreateLongUrl": "https://smlfront.esign.cn:8880/template/common/set/openApi?docTemplateId=9036c*****36024c6095e993&appId=4438864954&encryption=I7oRzgRCPI0iEpIDVktPAZ5spOU0hiD0ECwhHJP3rw1wmmQpRAgIPwFzWHbn15Hv&scene=api&redirectUrl=https://esign.cn"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/px5yvgqf9glbs7o6)

