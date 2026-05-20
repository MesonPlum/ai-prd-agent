### 接口描述
查询某个控件组中的控件详情。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/custom-component-group/get-components

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | :---: | :---: | :---: | --- |
| componentGroupId | | string | 是 | body | 控件组ID  |


### 响应参数
| **参数名称** | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data | | | object | 否 | 业务信息 |
| | components | | array | 否 | 控件ID列表 |
| |    <br/>    | componentId | string | 否 | 控件ID |
| | | componentOrder | int | 否 | 控件展示顺序 |


### 请求示例
```json
{
    "componentGroupId":"6c580301*****9c959ace19719"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "components": [
            {
                "componentId": "18978e*****5f3b557d2f",
                "componentOrder": 1
            },
            {
                "componentId": "d7ada5a9*****0b17cf87e",
                "componentOrder": 2
            }
        ]
    }
}
```

### 错误码
| **code 错误码** | **message 错误信息** | **解决方案** |
| --- | --- | --- |
| 1430002 | 参数错误 | 检查对应的参数是否符合格式 |
| 1430724 | 控件组不存在 | 检查下输入的控件组ID是否是当前appId下创建，是否真实存在 |
| 1430012 | 服务异常 | 检查接口整体的参数格式是否正确 |


  


  


  


