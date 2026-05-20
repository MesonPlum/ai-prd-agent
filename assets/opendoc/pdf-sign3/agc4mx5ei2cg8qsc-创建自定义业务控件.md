### 接口描述
为开发者提供自定义控件的能力，关联到自己系统中的业务字段，以便后续实现控件内容从开发者系统中提取并自动填写到模板中。创建自定义控件，支持设置控件名称，控件类型、以及控件共用和特有属性，最终生成自定义控件ID。 

**添加了自定义控件的模板制作页面样式参考（**使用[【获取制作合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xagpot)接口制作模板**）：**

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1761812071636-eed3dcf0-4288-4551-bc94-527ab8d1d807.png)

:::warning
**<font style="color:#DF2A3F;">注意：</font>**

+ <font style="color:#DF2A3F;">开发者在当前appId下，最多可以创建 </font>**<font style="color:#DF2A3F;">30000个</font>**<font style="color:#DF2A3F;">自定义控件。</font>
+ <font style="color:#DF2A3F;">该接口自2024年3月28日起</font>**<font style="color:#DF2A3F;">不再</font>**<font style="color:#DF2A3F;">对</font><font style="color:#DF2A3F;">componentName（控件名称）唯一性的校验，并新增customBizNum（自定义业务编码）字段，方便开发者使用同名不同样式的控件，可通过customBizNum确保控件唯一性。</font>

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/custom-components/create

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称****<font style="color:#8C8C8C;"></font>** | | | | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#8C8C8C;">（请左右滑动查看完整描述）</font>** |
| --- | --- | --- | --- | :---: | :---: | :---: | --- |
| components | | | | array | 是 | body | 控件列表 |
| | componentName | | | string | 是 | body | 控件名称<font style="color:#DF2A3F;">（最多100个字符）</font> |
| | customBizNum | | | string | 否 | body | 自定义业务编码<br/><font style="color:#DF2A3F;">（需要用</font>[《查询自定义业务控件列表》](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/fdxvhhqg247ba4v5)<font style="color:#DF2A3F;">接口进行和控件ID的匹配，开发者自行控制唯一性）</font> |
| | componentOrder | | | int | 否 | body | 控件展示顺序（默认：1）<br/>可指定：0-9999（从小到大排序）<br/><font style="color:#DF2A3F;">若不设置，系统会按创建时间进行正序排序</font> |
| | componentType | | | string | 是 | body | 控件类型<br/>1, 文本   2, 数字   3, 日期   8, 多行文本   9, 复选   10, 单选   11, 图片   14, 下拉选择控件   15, 勾选框控件   16, 身份证控件   19, 手机号 |
| | componentDefaultValue | | | string | 否 | body | 控件默认值 |
| | componentSize | | | object | 否 | body | 控件尺寸 |
| |  | componentWidth | | int | 否 | body | 控件宽度（矩形的左右边距距离，单位为px） |
| | | componentHeight | | int | 否 | body | 控件高度（矩形的上下边距距离，单位为px） |
| | componentTextFormat | | | object | 否 | body | 控件字符样式 |
| | | font | | int | 否 | body | 填充字体,默认1，<br/>1-宋体，2-新宋体，4-黑体，5-楷体 |
| | | fontSize | | float | 否 | body | 填充字体大小，默认：12-小四<br/>42-初号   36-小初   26-一号   24-小一   22-二号   19-小二   16-三号   15-小三   14-四号   12-小四   10.5-五号   9-小五 |
| | | textColor | | string | 否 | body | 字体颜色，默认#000000黑色 |
| | | bold | | boolean | 否 | body | 是否加粗，默认false<br/>true-是<br/>false-否 |
| | | italic | | boolean | 否 | body | 是否斜体，默认false<br/>true-是<br/>false-否 |
| | | horizontalAlignment | | string | 否 | body | 水平对齐，默认：左对齐<br/>LEFT-左对齐<br/>CENTER-居中对齐<br/>RIGHT-右对齐 |
| | | verticalAlignment | | string | 否 | body | 垂直对齐，默认：顶对齐（适用于多行文本）<br/>TOP-顶对齐<br/>MIDDLE-居中对齐<br/>BOTTOM-底对齐 |
| | | textLineSpacing | | float | 否 | body | 行间距，默认1.0 最多支持一位小数，最大值为2.0（适用于多行文本） |
| | required | | | boolean | 否 | body | 是否必填，默认必填<br/>true-必填<br/>false-非必填<br/><font style="color:#DF2A3F;">【注】</font>：是指模板控件填写内容时候是否是必填项 |
| | componentSpecialAttribute | | | object | 否 | body | 控件特有属性 |
| | | numberFormat | | string | 否 | body | 数字格式（数字控件），默认整数<br/>整数：0<br/>保留一位小数：0.0<br/>保留两位小数：0.00<br/>通用数字：ANY<br/><font style="color:#DF2A3F;">（通用数字支持整数和小数）</font> |
| | | dateFormat | | string | 否 | body | 日期格式（日期控件），默认yyyy/MM/dd<br/>yyyy/MM/dd<br/>yyyy-MM-dd<br/>yyyy年MM月dd日 |
| | | imageType | | string | 否 | body | 图片类型（图片控件）<br/>IDCard_widthwise 身份证 横向 锁比例<br/>IDCard_longitudinal 身份证 纵向 锁比例<br/>other 其他 不锁比例 |
| | | options | | array | 否 | body | 选项（下拉选择控件、单选控件、多选控件） |
| | | | optionOrder | int | 否 | body | 选项顺序 |
| | | | optionContent | string | 否 | body | 选项内容 |
| | | | selected | boolean | 否 | body | 是否默认选中 |


### 响应参数
| **参数名称** | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data | | | object | 否 | 业务信息 |
|  | customComponents |  | array | 否 | 自定义控件列表 |
| |  | customComponentId | string | 否 | 自定义控件ID |
| | | customComponentName | string | 否 | 自定义控件名称 |


### 请求示例
```json
{
    "components": [
        {
            "customBizNum": "N0001",
            "componentName": "0522005自定义控件名称",
            "componentType": 1,
            "componentSize": {
                "componentWidth": "160",
                "componentHeight": "15"
            },
            "componentTextFormat": {
                "font": 4,
                "fontSize": 14,
                "textColor": "#000000",
                "bold": true,
                "italic": true,
                "horizontalAlignment": "CENTER",
                "verticalAlignment": "MIDDLE",
                "textLineSpacing": 2.0
            }
        },
        {
            "customBizNum": "N0002",
            "componentName": "0522006自定义控件名称",
            "componentType": 1,
            "componentSize": {
                "componentWidth": 200,
                "componentHeight": 15
            },
            "componentTextFormat": {
                "font": 2,
                "fontSize": 14
            }
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
        "customComponents": [
            {
                "customComponentId": "29100f*****77433adb",
                "customComponentName": "0522005自定义控件名称"
            },
            {
                "customComponentId": "f7ab10b******6fca59a7a745",
                "customComponentName": "0522006自定义控件名称"
            }
        ]
    }
}
```

### 错误码
| **code 错误码** | **message 错误信息** | **解决方案** |
| --- | --- | --- |
| 1430002 | 参数错误 | 检查对应的参数是否符合格式 |
| 1430012 | 服务异常 | 检查接口整体的参数格式是否正确 |


  


  


  


