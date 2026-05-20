### 接口描述
可使用此接口查询用户在“填写文件模板页面”上输入的内容及填写任务状态等信息。

<font style="color:#DF2A3F;">特别说明：“填写文件模板页面”链接必须通过</font>[【获取填写合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ub4ncy)<font style="color:#DF2A3F;">接口获取。</font>

### 接口地址&请求方法
**接口地址：**https://[{host}](https://open.esign.cn/doc/opendoc/dev-guide3/el34xh?#JsWHg)/v3/doc-templates/fill-task-result

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://open.esign.cn/doc/opendoc/dev-guide3/el34xh?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | :--- | :---: | :---: | --- |
| docTemplateId | | string | 是 | body | 文件模板ID |
| fillTaskId | | string | 是 | body | 填写任务ID |


### 响应参数
| **参数名称** | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | object | 否 | 业务数据 |
| | fillTaskStatus | | string | 否 | 填写状态<br/>1 - 待填写<br/>2 - 填写完成<br/>3 - 填写任务已过期（链接超过30天失效未填写） |
| | fileId | | string | 否 | 填写完成后的文件ID，仅填写完成时返回 |
| | components | | array    | 否 | 填充控件信息 |
| | <font style="color:rgb(23, 43, 77);">   </font><br/><font style="color:rgb(23, 43, 77);">   </font><br/><font style="color:rgb(23, 43, 77);">   </font> | componentId | string    | 否 | 控件ID |
| | | componentKey | string    | 否 | <font style="color:rgb(64, 64, 64);">控</font>件Key |
| | | componentValue | string    | 否 | 控件填充值 |
| | | originCustomComponentId | string | 否 | 来源自定义控件ID |


### 请求示例
```json
{
  "docTemplateId": "ff36b8c******45b2e9ff6",
  "fillTaskId": "413ab12*******a7c52711e364"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "fillTaskStatus": "2",
        "fileId": "2fabe6a*****71a9f09e733",
        "components": [
            {
                "componentId": "319feda*****5798b01ff146",
                "componentKey": null,
                "componentValue": "这里是填充内容",
                "originCustomComponentId": null
            },
            {
                "componentId": "7e410ca******15c762530f5",
                "componentKey": null,
                "componentValue": "2024-04-23",
                "originCustomComponentId": null
            }
        ]
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/px5yvgqf9glbs7o6)

