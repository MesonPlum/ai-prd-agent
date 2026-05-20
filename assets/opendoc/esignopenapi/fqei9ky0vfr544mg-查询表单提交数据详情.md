### 接口描述
当平台企业（appId所属企业主体）成员在e签宝官网发起表单采集申请后，平台开发者可通过接口查询用户提交的表单数据详情。（[点击跳转 e签宝官网-信息采集表单功能介绍](https://help.esign.cn/detail?id=rvd6g9f1lvcdcgf4&nameSpace=cs3-dept%2Fexboae)）

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/collect-form/submitted-data

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | | | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | :---: | :---: | :---: | --- |
| formId | | | | string | 是 | body | 表单ID（可通过异步通知 [【提交表单采集通知】](https://qianxiaoxia.yuque.com/opendoc/notify3/hsv0qx13599ig80l) 中获取）![](https://cdn.nlark.com/yuque/0/2025/png/447795/1765953521295-fcc5693a-ab30-49a3-a94a-de3e017edfe9.png) |
| taskId | | | | string | 是 | body | 采集任务ID（可通过异步通知 [【提交表单采集通知】](https://qianxiaoxia.yuque.com/opendoc/notify3/hsv0qx13599ig80l) 中获取）<br/>![](https://cdn.nlark.com/yuque/0/2025/png/447795/1765953472878-823f258c-e8a3-4f27-b9f7-40f2c0cf4cef.png) |
| dataId | | | | string | 是 | body | 提交数据ID（可通过异步通知 [【提交表单采集通知】](https://qianxiaoxia.yuque.com/opendoc/notify3/hsv0qx13599ig80l) 或 接口[【查询表单提交数据列表】](https://qianxiaoxia.yuque.com/opendoc/esignopenable/wq2rdva9fu3erlac)中获取） |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | submitterPsnId | | | | string | 否 | 提交人个人账号ID |
| | submitterName | | | | string | 否 | 提交人姓名 |
| | submitTime | | | | long | 否 | 提交时间（毫秒级时间戳） |
| | submittedData<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | array | 否 | 提交数据 |
| |  | componentId | | | string | 否 | 组件ID |
| | | componentName | | | string | 否 | 组件名称 |
| | | componentType | | | string | 否 | 组件类型<br/>单行文本：input<br/>多行文本：textarea<br/>单选：select<br/>多选：selects<br/>数值：numerical<br/>日期：date<br/>文件：fileupload<br/>图片：imgupload<br/>跳转链接：link<br/>固定文案：text<br/>手机号：cellphone<br/>证件号：licensenumber<br/>评分：rate<br/>地区：region<br/>子表单：subform |
| | | groupId | | | string | 否 | 所属分组ID |
| | | groupName | | | string | 否 | 所属分组名称 |
| | | combinationType | | | string | 否 | 所属智能字段类型<br/>ocr_id_card - 身份证<br/>ocr_bank_card - 银行卡<br/>ocr_driving_license - 驾驶证<br/>ocr_vehicle_license - 行驶证 |
| | | combinationName | | | string | 否 | 所属智能字段名称 |
| | | componentValue | | | string | 否 | 组件填写值（除了子表单外的组件均在此返回） |
| | | subform<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | array | 否 | 子表单数据 |
| | |  | columnId | | string | 否 | 子表单组件ID |
| | | | columnName | | string | 否 | 子表单组件名称 |
| | | | columnType | | int | 否 | 子表单组件类型<br/>单行文本：input<br/>多行文本：textarea<br/>单选：select<br/>多选：selects<br/>数值：numerical<br/>日期：date<br/>文件：fileupload<br/>图片：imgupload<br/>跳转链接：link<br/>固定文案：text<br/>手机号：cellphone<br/>证件号：licensenumber<br/>评分：rate<br/>地区：region |
| | | | columnValue | | string | 否 | 子表单组件填写值 |


### 请求示例
```json
{
    "formId": "form10536111757749248",
     "taskId": "task1053111585359867904",
     "dataId":"105367111123451392"
}
```

### 响应示例
```json
{
    "submittedData": [
        {
            "componentType": "subform",
            "groupName": null,
            "componentValue": null,
            "componentId": "table_4nnzxe3k",
            "groupId": null,
            "combinationName": null,
            "combinationType": null,
            "componentName": "子表单名称111",
            "subform": [
                [
                    {
                        "columnId": "column_1765955265097",
                        "columnName": "姓名",
                        "columnType": "input",
                        "columnValue": "张三"
                    },
                    {
                        "columnId": "column_1765955307801",
                        "columnName": "手机号",
                        "columnType": "cellphone",
                        "columnValue": "19800002222"
                    }
                ]
            ]
        },
        {
            "componentType": "numerical",
            "groupName": null,
            "componentValue": "27",
            "componentId": "numerical_ec49rnro",
            "groupId": null,
            "combinationName": null,
            "combinationType": null,
            "componentName": "年龄",
            "subform": null
        },
        {
            "componentType": "imgupload",
            "groupName": null,
            "componentValue": "[\"https://esignoss.esign.cn/3411117422/d0daeac2-bfed-4378-a6b4-0eba757999ef/FullSizeRender.jpeg?Expires=1765959313&OSSAccessKeyId=LTAI4G23YViiKnxTC28ygQzF&Signature=zE0DD78i6sNxPHvmaXYKJyLewFo%3D\"]",
            "componentId": "ocr_id_card_d162yric_frontend_sz3jw52d",
            "groupId": null,
            "combinationName": "身份证识别",
            "combinationType": "ocr_id_card",
            "componentName": "人像面",
            "subform": null
        },
        {
            "componentType": "imgupload",
            "groupName": null,
            "componentValue": "[\"https://esignoss.esign.cn/3431111422/c4bdcd5d-6d37-4669-85db-5144e61a2aad/FullSizeRender.jpeg?Expires=1765959313&OSSAccessKeyId=LTAI4G23YViiKnxTC28ygQzF&Signature=LxGJgwBs%2F%2F8qKZW4qayz7YLKx%2Bc%3D\"]",
            "componentId": "ocr_id_card_d162yric_backend_xpc1ptx2",
            "groupId": null,
            "combinationName": "身份证识别",
            "combinationType": "ocr_id_card",
            "componentName": "国徽面",
            "subform": null
        },
        {
            "componentType": "input",
            "groupName": null,
            "componentValue": "张三",
            "componentId": "ocr_id_card_d162yric_name_3snqj3ev",
            "groupId": null,
            "combinationName": "身份证识别",
            "combinationType": "ocr_id_card",
            "componentName": "姓名",
            "subform": null
        },
        {
            "componentType": "licensenumber",
            "groupName": null,
            "componentValue": "231182199903194312",
            "componentId": "ocr_id_card_d162yric_id_card_no_b553tpgn",
            "groupId": null,
            "combinationName": "身份证识别",
            "combinationType": "ocr_id_card",
            "componentName": "身份证号",
            "subform": null
        },
        {
            "componentType": "select",
            "groupName": null,
            "componentValue": "女",
            "componentId": "ocr_id_card_d162yric_gender_l2tptobi",
            "groupId": null,
            "combinationName": "身份证识别",
            "combinationType": "ocr_id_card",
            "componentName": "性别",
            "subform": null
        },
        {
            "componentType": "date",
            "groupName": null,
            "componentValue": "1999-03-12",
            "componentId": "ocr_id_card_d162yric_birthday_obwbno2p",
            "groupId": null,
            "combinationName": "身份证识别",
            "combinationType": "ocr_id_card",
            "componentName": "出生日期",
            "subform": null
        },
        {
            "componentType": "input",
            "groupName": null,
            "componentValue": "汉",
            "componentId": "ocr_id_card_d162yric_nation_wj7utfvd",
            "groupId": null,
            "combinationName": "身份证识别",
            "combinationType": "ocr_id_card",
            "componentName": "民族",
            "subform": null
        }
    ],
    "submitTime": 1765955683850,
    "submitterPsnId": "a76bff5c62111a5dff8943f498442",
    "submitterName": "张三"
}
```

