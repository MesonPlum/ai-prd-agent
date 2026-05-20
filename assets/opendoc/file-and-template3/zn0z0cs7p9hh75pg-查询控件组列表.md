### 接口描述
可查询当前appId下自定义的全部控件组列表信息，可查询某个具体的控件组ID/控件组名称，也可根据控件ID查询其所在的控件组。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/custom-component-group/get-list

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | :---: | :---: | :---: | --- |
| pageNum | | int | 是 | body | 页码（大于0，最小值为1）  |
| pageSize | | int    | 是 | body | 每页展示的数量（可选范围[1~100]） |
| componentGroupId | | string | 否 | body | 控件组ID |
| componentName | | string | 否 | body | 控件组名称 |
| componentId | | string | 否 | body | 控件ID<br/><font style="color:#DF2A3F;">可根据控件ID查询其所在的控件组</font> |


### 响应参数
| **参数名称** | **** | | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data | | | | | object | 否 | 业务信息 |
| | componentGroups | | | | array | 否 | 控件组列表 |
| |     | componentGroupId | | | string | 否 | 控件组ID |
| | | componentGroupName | | | string | 否 | 控件组名称 |
| | | componentGroupOrder | | | int | 否 | 控件组展示顺序 |


### 请求示例
```json
{
    "pageNum": "1",
    "pageSize": "20"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "componentGroups": [
            {
                "componentGroupId": "6c58030*****9c959ace19719",
                "componentGroupName": "控件组名称1",
                "componentGroupOrder": 1
            },
            {
                "componentGroupId": "08cec****7ff3c",
                "componentGroupName": "控件组名称2",
                "componentGroupOrder": 1
            }
        ],
        "total": 2
    }
}
```

### 错误码
| **code 错误码** | **message 错误信息** | **解决方案** |
| --- | --- | --- |
| 1430002 | 参数错误 | 检查对应的参数是否符合格式 |
| 1430012 | 服务异常 | 检查接口整体的参数格式是否正确 |


  


  


