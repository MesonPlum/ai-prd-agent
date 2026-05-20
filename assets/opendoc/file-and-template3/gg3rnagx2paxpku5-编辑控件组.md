### 接口描述
编辑已经存在的控件组ID对应的控件列表：

+ 控件ID列表必须传入（按传入的控件ID列表覆盖原有控件）；
+ 控件组名称非必传，传入即修改，不传则保持原有名称不变（如果仅调整控件组名名称，不想改变控件列表，建议使用[【重命名控件组】](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/kg8p50dhr7n3swln)接口）。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/custom-component-group/update

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | :---: | :---: | :---: | --- |
| componentGroupId | | string | 是 | body | 控件组ID  |
| componentGroupName | | string | 否 | body | 控件组名称 |
| componentGroupOrder | | int | 否 | body | 控件组展示顺序<br/>+ <font style="color:#DF2A3F;">指定数字：0-999，从小到大排序</font><br/>+ <font style="color:#DF2A3F;">若不传，默认按创建时间正序排序</font> |
| components | | array | 是 | body | 控件ID列表<br/><font style="color:#DF2A3F;">注：如果传入components空数组，对应清空控件组内所有控件</font> |
|  | componentId | string | 否 | body | 控件ID |


### 响应参数
| **参数名称** | | **参数类型** | **必选** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| code | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data | | object | 否 | 业务信息 |


### 请求示例
```json
{
    "componentGroupId":"6c580301*****e19719",
    "componentGroupName": "修改的控件组名称",
    "components": [
        {
            "componentId": "18978******3b557d2f"
        },
        {
            "componentId": "d7ada*******7cf87e"
        }
    ]
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": null
}
```

### 错误码
| **code 错误码** | **message 错误信息** | **解决方案** |
| --- | --- | --- |
| 1430002 | 参数错误 | 检查对应的参数是否符合格式 |
| 1430724 | 控件组不存在 | 检查下输入的控件组ID是否是当前appId下创建，是否真实存在 |
| 1430012 | 服务异常 | 检查接口整体的参数格式是否正确 |


