### 接口描述
复制一份相同的模板，原模板中的控件将会一并复制到新的模板。<font style="color:#DF2A3F;">（只适用同一个环境的复制，例如：沙箱环境的模板只能复制到沙箱环境，正式环境的模板只能复制到正式环境）</font>

:::info
**注意事项：**

（1）复制出来新的模板内容与原模板保持一致（模板名称相同）；

（2）接口将生成新的模板编号，与新的控件编号；

（3）新模板可以调用[【获取编辑合同模板页面】](https://qianxiaoxia.yuque.com/books/share/7c96739d-040e-47f2-8782-24d4b5b7b24f/lgb2go)接口，在页面中编辑控件；

（4）仅支持复制API接口中创建的模板，在e签宝官网中创建的模板不可被复制；

（5）pdf模板和html模板均可被复制。

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/doc-templates/{docTemplateId}/copy

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | :---: | :---: | :---: | --- |
| docTemplateId | | string | 是 | path | 原始合同模板ID |
| renameDocTemplate | | string | 否 | body | 重命名模板名称（最长64个字）<br/><font style="color:#DF2A3F;">【注】不传时默认取原模板名称</font> |


### 响应参数
| **参数名称** | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | string | 否 | 业务数据 |
|  | newDocTemplateId | | string | 否 | 新合同模板ID |
| | componentList<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | array | 否 | 控件列表 |
| |  | originComponentId | string | 否 | 原始控件ID |
| | | newComponentId | string | 否 | 新控件ID |


### 请求示例
```http
POST https://openapi.esign.cn/v3/doc-templates/061778***701b7/copy

{
  "renameDocTemplate":"新的模板名字"
}
```

```json
{
    "renameDocTemplate": "新的模板名称"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "newDocTemplateId": "565d746***183f816",
        "componentList": [
            {
                "originComponentId": "d742ba42f***496243a1b",
                "newComponentId": "8dc2c6d***34b172fb"
            },
            {
                "originComponentId": "c35d428de***f416e291fe",
                "newComponentId": "7ffe5a55***28f4f73"
            },
            {
                "originComponentId": "7c86e839d2***c88a66e24",
                "newComponentId": "89fb1dd***33809cfdc"
            }
        ]
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/px5yvgqf9glbs7o6)



