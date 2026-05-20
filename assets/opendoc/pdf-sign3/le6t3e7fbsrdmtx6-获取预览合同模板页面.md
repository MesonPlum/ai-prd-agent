### 接口描述
开发者或用户通过可视化的**合同模板页面**来**预览已经在模板里添加的各类控件**（当操作者想要查看模板控件，又不想编辑改动时使用）。

:::warning
**<font style="color:#E8323C;">【注意事项】</font>**

+ <font style="color:#DF2A3F;">只能预览</font>[【获取制作合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xagpot)<font style="color:#DF2A3F;">接口制作的模板，不支持SaaS官网生成的模板。</font>
+ <font style="color:#E8323C;">沙箱环境和正式环境不互通，需要分别获取不同的页面链接进行预览。</font>

:::

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1733110326697-c8679580-cbd1-4d86-9b4d-e57ee1bd24f6.png)

### 接口地址&请求方法
> <font style="color:#333333;">点击下述蓝色字体{host}可跳转至API请求域名说明文档</font>
>

**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/doc-templates/doc-template-preview-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| :--- | :---: | :---: | :---: | --- |
| docTemplateId | string | 是 | body | 合同模板ID |


### 响应参数
| **参数名称** | | **参数类型** | **必选** | **参数说明** | |
| --- | --- | :---: | :---: | --- | --- |
| code | | int32 | 是 | 业务码，0表示成功，非0表示异常。 | |
| message**** | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> | |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | object | 否 | 业务数据 | |
| | docTemplatePreviewUrl | string | 否 | 预览文件模板页面链接，有效期30分钟，过期可以重新获取 | |


### 请求示例
```json
{
  "docTemplateId": "9036ca4d1******c6095e993"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "docTemplateId": "请忽略此字段",
        "docTemplatePreviewUrl": "https://smlfront.esign.cn:8880/template/common/preview/openApi?docTemplateId=a6b48e8****5bc69b3b7cce6&appId=7438***54&encryption=sTjwMIhpaGiWJ%2B2WvaMoMBN313tCSGUFsfKtapQfaphOck6dUquRI3U0o5QZUUQpQUoIzrS/0BGSw%3D%3D&scene=api"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/px5yvgqf9glbs7o6)

