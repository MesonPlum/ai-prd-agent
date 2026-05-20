### 接口描述
为自定义控件创建分组，让控件可以分组显示。同类的自定义控件可以放到一个分组里。 

**添加了自定义控件组的模板制作页面样式参考（使用**[**【获取制作合同模板页面】**](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xagpot)**接口制作模板）：**

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1761812309565-703e60c3-098f-411e-b7ea-dac3de4cb43e.png)

:::warning
**<font style="color:#DF2A3F;">注意：</font>**

+ <font style="color:#DF2A3F;">开发者在当前appId下，最多可以创建 </font>**<font style="color:#DF2A3F;">1000个</font>**<font style="color:#DF2A3F;">自定义控件组。</font>
+ <font style="color:#DF2A3F;">该接口自2024年3月28日起放开对componentGroupName（控件组名称）唯一性的校验。</font>

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/custom-component-group/create

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | :---: | :---: | :---: | --- |
| componentGroupName | | string | 是 | body | 控件组名称<font style="color:#DF2A3F;">（最多100个字符）</font> |
| componentGroupOrder | | int | 否 | body | 控件组展示顺序（默认：1）<br/>+ <font style="color:#DF2A3F;">指定数字：0-999，从小到大排序</font><br/>+ <font style="color:#DF2A3F;">若不传，默认按创建时间正序排序</font> |
| components | | array | 是 | body | 控件列表 |
|  | componentId | string | 是 | body | 控件ID |


### 响应参数
| **参数名称** | | **参数类型** | **必选** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| code | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data | | object | 否 | 业务信息 |
|  | componentGroupId | string | 否 | 控件组ID |


### 请求示例
```json
{
    "componentGroupName": "控件1组",
    "componentGroupOrder": 1,
    "components": [
        {
            "componentId": "07301790******3ebf0dd3"
        },
        {
            "componentId": "4d1ee2c9*****2bb12da0547e"
        }
    ]
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "componentGroupId": "08cec5*****4de815f7ff3c"
    }
}
```

### 错误码
| **code 错误码** | **message 错误信息** | **解决方案** |
| --- | --- | --- |
| 1430002 | 参数错误 | 检查对应的参数是否符合格式 |
| 1430722 | 控件不存在 | 检查下输入的控件ID是否是当前appId下创建，是否真实存在 |
| 1430012 | 服务异常 | 检查接口整体的参数格式是否正确 |


  


  


  


