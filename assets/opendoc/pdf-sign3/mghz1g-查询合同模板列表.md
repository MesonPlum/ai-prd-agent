### 接口描述
查询已创建的合同模板列表。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/doc-templates?pageNum=1&pageSize=20

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| <font style="color:rgb(64, 64, 64);">pageNum</font> | <font style="color:rgb(64, 64, 64);">int32</font> | <font style="color:rgb(64, 64, 64);">否</font> | query | <font style="color:rgb(64, 64, 64);">查询页码（默认值 1）</font> |
| <font style="color:rgb(64, 64, 64);">pageSize</font> | <font style="color:rgb(64, 64, 64);">int32</font> | <font style="color:rgb(64, 64, 64);">否</font> | query | <font style="color:rgb(64, 64, 64);">每页显示的数量，最大值：20（默认值 20）</font> |


### 响应参数
| **参数名称** | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message 匹配，因为message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | object | 否 | 业务数据 |
|  | total | | int32 | 否 | 查询结果中模板的总数量 |
| | docTemplates<font style="color:#E8323C;">（点击“+”展开详情）</font> | | array | 否 | 合同模板列表 |
| |  | docTemplateId | string | 否 | 合同模板ID |
| | | docTemplateName | string | 否 | 合同模板名称 |
| | | createTime | int64 | 否 | 合同模板创建时间（Unix时间戳格式，单位：毫秒） |
| | | updateTime | int64 | 否 | 合同模板更新时间（Unix时间戳格式，单位：毫秒） |


### 请求示例
```json
GET https://openapi.esign.cn/v3/doc-templates?pageNum=1&pageSize=20
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "total": 2,
        "docTemplates": [
            {
                "docTemplateName": "模板一",
                "docTemplateId": "8726f6b9***1a56d",
                "createTime": 1649389616000,
                "updateTime": 1649389616000
            },
            {
                "docTemplateName": "模板二",
                "docTemplateId": "ecd09aa***967bb",
                "createTime": 1635834265000,
                "updateTime": 1635834265000
            }
        ]
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/px5yvgqf9glbs7o6)

