### 接口描述
本接口用于查询HTML模板填写内容转换为PDF后，各签署区域的坐标位置（X/Y值），为后续发起签署提供精准定位。

<font style="color:#DF2A3F;">注意：由于HTML样式可能导致布局变化，签署区坐标仅在模板转为PDF后生效，转换前的坐标可能存在偏差。</font>

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/files/{fileId}/detail

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | --- | --- |
| fileId | string | 是 | path | 填写后的文件ID<br/>+ <font style="color:#E8323C;">通过</font>[【填写模板生成文件】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/mv8a3i)<font style="color:#E8323C;">接口获取到的文件fileId</font><br/>+ <font style="color:#E8323C;">或</font>[【获取填写合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ub4ncy)<font style="color:#E8323C;">填写后返回的fileId</font> |


### 响应参数
| **参数名称** | | | | | **参数**<br/>**类型** | **必选** | **参数说明**<br/>**<font style="color:#F5222D;">（左右拖动查看完整描述）</font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message</font><br/><font style="color:#F5222D;"> 匹配，因为 message 可能会调整。</font> |
| data | | | | | object | 否 | 业务数据 |
| | fileId | | | | string | 否 | 填写后的文件ID |
| | fileName | | | | string | 否 | 填写后的文件名称 |
| | fileTotalPageCount | | | | int64 | 否 | PDF文件总页数 |
| | fileDownloadUrl | | | | string | 否 | 填写后的文件下载链接<font style="color:#F5222D;">（有效期为60分钟，过期后可以重新调用接口获取新的下载地址）</font> |
| | docTemplateId | | | | string | 否 | 填写时使用的模板ID |
| | docTemplateName | | | | string | 否 | 模板ID对应的模板名称 |
| | components | | | | array | 否 | 填写后文件中的控件列表 |
| | | componentId | | | string | 否 | 控件ID<font style="color:#F5222D;">（设置文件模板时由e签宝系统生成）</font> |
| | | componentKey | | | string | 否 | 控件Key<font style="color:#F5222D;">（设置文件模板时由用户自定义）</font> |
| | | componentName | | | string | 否 | 控件名称<font style="color:#F5222D;">（设置文件模板时由用户自定义）</font> |
| | | componentType | | | int32 | 否 | **控件类型**<br/>1 - 单行文本，2 - 数字，3 - 日期，6 - 签章区域，8 - 多行文本，9 - 复选，10 - 单选，11 - 图片，14 -下拉框，15 - 勾选框，16 - 身份证，17 - 备注区域，18 - 动态表格，19 - 手机号 |
| | | componentDefaultValue | | | string | 否 | 控件默认值<br/>（页面中文本控件或数字控件中设置的默认值） |
| | | required | | | boolean | 否 | 控件是否必填<br/>true - 必填<br/>false - 非必填 |
| | | componentPosition | | | object | 否 | 控件位置信息 |
| | |  | componentPositionX | | float | 否 | 控件位置X横坐标 |
| | | | componentPositionY | | float | 否 | 控件位置Y纵坐标 |
| | | | componentPageNum | | int32 | 否 | 控件所在页码 |
| | | componentSpecialAttribute | | | object | 否 | 控件特有属性 |
| | | | dateFormat | | string | 否 | 日期格式（日期控件特有）<br/>yyyy年MM月dd日<br/>yyyy-MM-dd<br/>yyyy/MM/dd<br/>yyyy-MM-dd HH:mm:ss |
| | | | imageType | | string | 否 | 图片类型（图片控件特有） <br/>IDCard_widthwise（身份证横向，等比缩放大小）<br/>IDCard_longitudinal（身份证纵向，等比缩放大小）<br/>other （其他，自由缩放大小） |
| | | | options | | array | 否 | 选项（下拉框控件、单选控件、多选控件特有） |
| | | |  | optionContent | string | 否 | 选项内容 |
| | | | | optionOrder | int32 | 否 | 选项顺序 |
| | | | | selected | boolean | 否 | 选项是否默认选中 |
| | | | tableContent | | array | 否 | 表格行列内容（动态表格控件特有），格式：<br/>**[row{"column1":"value1","column2":"value2"}]**<br/><font style="color:#F5222D;">补充说明：</font><br/>+ **row **表示动态表格对应的行，row的个数依据模板动态表格控件中所添加的所添加的行数。<br/>+ **column1 **表示当前行中单元格的Key值<br/>+ **value1** 表示当前行中单元格的Value值，单元格未设置固定值时为""空字符串，否则为所设置的固定值。<br/>+ 详见 [tableContent 解释说明](https://qianxiaoxia.yuque.com/docs/share/90d092e6-1728-480a-81be-ad67dc8bf07d#AWzvV)。 |
| | | componentSize | | | object | 否 | 控件尺寸 |
| | |  | componentWidth | | float | 否 | 控件宽度（矩形的左右距离，单位为px） |
| | | | componentHeight | | float | 否 | 控件高度（矩形的上下距离，单位为px） |
| | | normalSignField | | | object | 否 | 签章区属性 |
| | |  | showSignDate | | int32 | 否 | 是否显示签署日期<br/>**0** - 不显示<br/>**1 **- 显示 |
| | | | dateFormat | | string | 否 | 日期格式，支持以下日期格式：<br/>yyyy年MM月dd日<br/>yyyy-MM-dd<br/>yyyy/MM/dd<br/>yyyy-MM-dd HH:mm:ss |
| | | | signFieldStyle | | int32 | 否 | 签章样式<br/>**1 **- 单页签章<br/>**2** - 骑缝签章 |
| | | remarkSignField | | | object | 否 | 备注区属性 |
| | | | aiCheck | | int32 | 否 | 是否开启手写抄录AI校验<br/> **0** - 不开启 <br/> **1** - 开启 AI 校验 <br/> **2** - 强制 AI 校验 |
| | | | inputType | | int32 | 否 | 备注文字输入方式 <br/>**1 **- 手写抄录方式<br/>**2** - 自由打字方式 |
| | | | remarkContent | | string | 否 | 预设手写抄录信息 |
| | | | remarkFontSize | | string | 否 | 备注文字的字号，单位pt，默认值12pt<br/><font style="color:#DF2A3F;">注：签署侧需要的字号单位是px，模板侧通用的都是pt，因此要做一次转换；pt与px间的换算关系是：0.75px=1pt</font> |


### 请求示例
```http
GET https://openapi.esign.cn/v3/files/cbd1***qwe/detail
```

### 响应示例
```json
{
    "code":0,
    "message":"成功",
    "data":{
        "docTemplateId":"9f565***1e4073233",
        "docTemplateName":"这是个填充所使用的html模板名称",
        "createTime":1653042399000,
        "updateTime":1653042399000,
        "fileDownloadUrl":"https://esignoss.esign.cn/xx/xx-xx-xx-xx/docName.pdf?Expires=1653xx046405&OSSAccessKeyId=xx&Signature=xx%3D",
        "components":[
            {
                "componentId":"4d4ea***c644e4",
                "componentKey":"itemsales1",
                "componentName":"商品销售表",
                "componentType":18,
                "componentDefaultValue":null,
                "componentPosition":null,
                "componentSpecialAttribute":{
                    "dateFormat":null,
                    "imageType":null,
                    "options":null,
                    "tableContent":[
                        {
                            "row":{
                                "column1":"单价",
                                "column2":"数量",
                                "column3":"总价"
                            }
                        },
                        {
                            "row":{
                                "column1":"3.5",
                                "column2":"400",
                                "column3":"1400"
                            }
                        },
                        {
                            "row":{
                                "column1":"3.6",
                                "column2":"300",
                                "column3":"1080"
                            }
                        }
                    ]
                },
                "componentSize":{
                    "componentWidth":null,
                    "componentHeight":null
                },
                "remarkSignField":null,
                "normalSignField":null
            }
        ],
        "fileId":"581484db***adb1b0863",
        "fileName":"模板填充后的文件.pdf",
        "fileTotalPageCount":3
    }
}


```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/px5yvgqf9glbs7o6)

