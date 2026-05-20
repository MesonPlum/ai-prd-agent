**【触发条件】**<font style="color:rgb(64, 64, 64);">用户填写模板完成并提交成功后触发</font>。

#### 回调参数
| **参数名称** | | **必选** | **参数类型** | **参数说明** |
| --- | --- | --- | --- | --- |
| action | | 是 | string | 标记该通知的业务类型，该通知固定为：**<font style="color:#52C41A;">FILL_DOCTEMPLATE</font>** |
| timestamp | | 是 | int64 | 回调通知发送时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| docTemplateId | | 是 | string | 待填充的模板ID |
| docTemplateName | | 是 | string | 文件模板名称 |
| customBizNum | | 否 | string | 开发者自定义业务编号，发起模板填写时定义的标识业务参数 |
| fileId | | 是 | string | 填充后生成的文件ID |
| components<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | 否 | array | 填充控件信息列表 |
| | componentId | 否 | string | 控件ID |
| | componentKey | 否 | string | 控件Key |
| | componentValue | 否 | string | 控件填充值 |
| | componentType | 否 | string | 控件类型<br/>1 - 单行文本，2 - 数字，3 - 日期，6 - 签章区域，8 - 多行文本，9 - 复选，10 - 单选，11 - 图片，14 -下拉框，15 - 勾选框，16 - 身份证，17 - 备注区域，18 - 动态表格，19 - 手机号<br/><font style="color:#DF2A3F;">注：仅对新版模板生效</font> |
| | componentContent | 否 | string | 控件选项对应文本内容（仅在控件类型是：9 - 复选、10 - 单选、14 -下拉框 时返回对应的内容值）<br/><font style="color:#DF2A3F;">注：仅对新版模板生效</font> |
| | originCustomComponentId | 否 | string | 自定义控件ID |
| fillTaskId | | 否 | string | 填写任务ID<br/><font style="color:#DF2A3F;">注：仅对新版模板生效</font> |
| decFillTaskId | | 否 | string | 填写任务ID（仅限专属云使用）<br/><font style="color:#DF2A3F;">注：仅对新版模板生效</font> |


#### 模板填写完成通知示例
```json
{
    "action": "FILL_DOCTEMPLATE",
    "components": [
        {
            "componentId": "6925be81011111fb7903943453",
            "componentKey": "key1",
            "componentType": 1,
            "componentValue": "2"
        },
        {
            "componentContent": "[\"多选内容002\"]",
            "componentId": "1e013e8811117ae19064a320",
            "componentKey": "key2",
            "componentType": 9,
            "componentValue": "[1]"
        },
        {
            "componentContent": "下拉内容001",
            "componentId": "a4d546c7f11111491b470f13bd",
            "componentKey": "key3",
            "componentType": 14,
            "componentValue": "0"
        },
        {
            "componentContent": "单选内容003",
            "componentId": "bf29535f111114c68fc1bd8",
            "componentType": 10,
            "componentValue": "0"
        }
    ],
    "customBizNum": "01测试",
    "decFillTaskId": "a03b834bdb4011116d0ca54447a",
    "docTemplateId": "3b0c928edc821111d635f2d480dc4",
    "docTemplateName": "授权书.pdf",
    "field": "171303c36711111f9d7ac2c05ec44de3",
    "fileId": "171303c36711111f9d7ac2c05ec44de3",
    "fillTaskId": "0fa6d72d035911111d196bcef6b73181",
    "timestamp": 1758596421793
}
```

