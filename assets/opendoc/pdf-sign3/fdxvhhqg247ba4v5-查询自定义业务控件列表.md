### 接口描述
可查询当前appId下自定义的全部控件列表信息，也可以根据控件ID或控件名称查询单独某个自定义控件的详情信息。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/custom-components/get-list

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | :---: | :---: | :---: | --- |
| pageNum | | int | 是 | body | 页码（大于0，最小值为1）  |
| pageSize | | int    | 是 | body | 每页展示的数量（可选范围[1~100]） |
| **<font style="color:#DF2A3F;">以下三个字段，传值则取交集查询</font>** | | | | | |
| componentId | | string | 否 | body | 控件ID<br/><font style="color:#DF2A3F;">注：因控件ID是唯一的，如果传控件ID查询，就无需再传控件名称和自定义业务编码字段。</font> |
| componentName | | string | 否 | body | 控件名称 |
| customBizNum | | string | 否 | body | 自定义业务编码 |


### 响应参数
| **参数名称** | **** | | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data | | | | | object | 否 | 业务信息 |
| | components | | | | array | 否 | 控件列表 |
| |    <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>   <br/>    | componentId | | | string | 否 | 控件ID |
| | | customBizNum | | | string | 否 | 自定义业务编码 |
| | | componentName | | | string | 否 | 控件名称 |
| | | componentType | | | string | 否 | 控件类型<br/>1, 文本   2, 数字   3, 日期   8, 多行文本   9, 复选   10, 单选   11, 图片   14, 下拉选择控件   15, 勾选框控件   16, 身份证控件   19, 手机号 |
| | | componentDefaultValue | | | string | 否 | 控件默认值 |
| | | componentSize | | | object | 否 | 控件尺寸 |
| | |  | componentWidth | | int | 否 | 控件宽度（矩形的左右边距距离，单位为px） |
| | | | componentHeight | | int | 否 | 控件高度（矩形的上下边距距离，单位为px） |
| | | componentTextFormat | | | object | 否 | 控件字符样式 |
| | |  | font | | int | 否 | 填充字体,默认1，<br/>1-宋体，2-新宋体，4-黑体，5-楷体 |
| | | | fontSize | | float | 否 | 填充字体大小，默认：12-小四<br/>42-初号   36-小初   26-一号   24-小一   22-二号   19-小二   16-三号   15-小三   14-四号   12-小四   10.5-五号   9-小五 |
| | | | textColor | | string | 否 | 字体颜色，默认#000000黑色 |
| | | | bold | | boolean | 否 | 是否加粗，默认false<br/>true-是<br/>false-否 |
| | | | italic | | boolean | 否 | 是否斜体，默认false<br/>true-是<br/>false-否 |
| | | | horizontalAlignment | | string | 否 | 水平对齐，默认：左对齐<br/>LEFT-左对齐<br/>CENTER-居中对齐<br/>RIGHT-右对齐 |
| | | | verticalAlignment | | string | 否 | 垂直对齐，默认：顶对齐（适用于多行文本）<br/>TOP-顶对齐<br/>MIDDLE-居中对齐<br/>BOTTOM-底对齐 |
| | | | textLineSpacing | | float | 否 | 行间距，默认1.0 最多支持一位小数，最大值为2.0（适用于多行文本） |
| | | required | | | boolean | 否 | 是否必填<br/>true-必填<br/>false-非必填 |
| | | componentSpecialAttribute | | | object | 否 | 控件特有属性 |
| | |  | numberFormat | | string | 否 | 数字格式（数字控件），默认整数<br/>整数：0<br/>保留一位小数：0.0<br/>保留两位小数：0.00<br/>通用数字：ANY<br/><font style="color:#DF2A3F;">（通用数字支持整数和小数）</font> |
| | | | dateFormat | | string | 否 | 日期格式（日期控件），默认yyyy/MM/dd<br/>yyyy/MM/dd<br/>yyyy-MM-dd<br/>yyyy年MM月dd日 |
| | | | imageType | | string | 否 | 图片类型（图片控件）<br/>IDCard_widthwise 身份证 横向 锁比例<br/>IDCard_longitudinal 身份证 纵向 锁比例<br/>other 其他 不锁比例 |
| | | | options | | array | 否 | 选项（下拉选择控件、单选控件、多选控件） |
| | | |  | optionOrder | int | 否 | 选项顺序 |
| | | | | optionContent | string | 否 | 选项内容 |
| | | | | selected | boolean | 否 | 是否默认选中 |
| | | | tableContent | | array | 否 | 表格内容（表格控件）<br/><font style="color:#DF2A3F;">拓展字段，返回null</font> |
| | | normalSignField | | | object | 否 | 普通签章区属性<br/><font style="color:#DF2A3F;">拓展字段，返回null</font> |
| | | remarkSignField | | | object | 否 | 备注签字区属性<br/><font style="color:#DF2A3F;">拓展字段，返回null</font> |
| | | originCustomComponentId | | | string | 否 | <font style="color:#DF2A3F;">拓展字段，返回null</font> |
| | | componentOrder | | | int | 否 | 控件展示顺序（默认：1） |


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
        "components": [
            {
                "componentTextFormat": {
                    "font": 4,
                    "fontSize": 14.0,
                    "textColor": "#000000",
                    "bold": true,
                    "italic": true,
                    "horizontalAlignment": "CENTER",
                    "verticalAlignment": "MIDDLE",
                    "textLineSpacing": 2.0
                },
                "componentSpecialAttribute": {
                    "dateFormat": null,
                    "imageType": null,
                    "options": null,
                    "tableContent": null,
                    "numberFormat": null,
                    "componentMaxLength": null,
                    "signerRole": null
                },
                "componentId": "e70ba4a241d048c1b6e7e358a0e9f7e0",
                "customBizNum": "N0001",
                "componentKey": null,
                "componentName": "0522005自定义控件名称",
                "required": true,
                "componentType": 1,
                "componentDefaultValue": null,
                "componentPosition": null,
                "componentSize": {
                    "componentWidth": 160,
                    "componentHeight": 15
                },
                "remarkSignField": null,
                "normalSignField": null,
                "originCustomComponentId": null,
                "componentOrder": 1
            },
            {
                "componentTextFormat": {
                    "font": 4,
                    "fontSize": 14.0,
                    "textColor": "#000000",
                    "bold": true,
                    "italic": true,
                    "horizontalAlignment": "CENTER",
                    "verticalAlignment": "MIDDLE",
                    "textLineSpacing": 2.0
                },
                "componentSpecialAttribute": {
                    "dateFormat": null,
                    "imageType": null,
                    "options": null,
                    "tableContent": null,
                    "numberFormat": null,
                    "componentMaxLength": null,
                    "signerRole": null
                },
                "componentId": "9723034e168941bba62c4eb40c3c14a1",
                "customBizNum": "N0002",
                "componentKey": null,
                "componentName": "0522006自定义控件名称",
                "required": true,
                "componentType": 1,
                "componentDefaultValue": null,
                "componentPosition": null,
                "componentSize": {
                    "componentWidth": 160,
                    "componentHeight": 15
                },
                "remarkSignField": null,
                "normalSignField": null,
                "originCustomComponentId": null,
                "componentOrder": 2
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
| 1430722 | %S控件不存在 | 检查下输入的控件ID是否是当前appId下创建，是否真实存在 |
| 1430012 | 服务异常 | 检查接口整体的参数格式是否正确 |
| 1430011 | 服务异常,请重试 | 检查接口整体的参数格式是否正确 |


  


