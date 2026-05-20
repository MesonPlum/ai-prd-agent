### 接口描述
调用此接口可以向已创建的签署流程中删除指定的签署区<font style="color:#E8323C;">（仅限于未签署状态下的签署区）</font>。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/signers/sign-fields?signFieldIds=xxx1,xxx2

**请求方法：**DELETE

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **<font style="color:black;">参数名称</font>** | | **<font style="color:black;">参数类型</font>** | **<font style="color:black;">必选</font>** | **参数位置** | **<font style="color:black;">参数说明</font>** |
| --- | --- | --- | :---: | :---: | --- |
| signFlowId | | string | 是 | path | 签署流程ID  |
| signFieldIds | | string | 是 | query | 签署区ID<font style="color:#E8323C;">（多个签署区请使用英文逗号分隔）</font><br/><font style="color:#E8323C;">补充说明：</font><br/>需要用[《查询签署流程详情》](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xxk4q6)接口查询对应的签署区ID（signFieldId） |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#E8323C;">请根据 code 来判断错误情况，不应该依赖message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | <font style="color:rgb(23, 26, 29);">deleteResults</font> | | | | array | 否 | 签署区删除结果 |
| |  | signFieldId | | | string | 否 | 签署区ID |
| | | deleteResult | | | string | 否 | 操作结果：0 - 成功，1 - 失败 |
| | | failedReason | | | string | 否 | 失败的原因 |


### 请求示例
```http
DELETE https://openapi.esign.cn/v3/sign-flow/a9084f2**78ad0/signers/sign-fields?signFieldIds=97913b**6ccae5da
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "deleteResults": [
            {
                "signFieldId": "a7dd3835c*****25b59d39",
                "deleteResult": 0,
                "failedReason": null
            }
        ]
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)

