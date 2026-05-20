### 接口描述
查询企业用户下某一个流程模板的详情，以便开发者确认模板的文件信息、参与人信息以及控件信息等。

### 接口地址&请求方法
>  <font style="color:#333333;">点击下述蓝色字体{host}可跳转至API请求域名说明文档</font>
>

**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-templates/detail

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| signTemplateId | string | 是 | query | 流程模板ID  |
| orgId | string | 是 | query | 机构账号ID<br/><font style="color:#E8323C;">【注】用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用</font>[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)<font style="color:#E8323C;">接口通过组织机构名称/组织机构证件号进行查询</font> |
| queryComponents | boolean | 否 | query    | 是否需要查询控件信息，默认false<br/>true-是<br/>false-否 |


### 响应参数
| **参数名称** | | | | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| code | | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | | string | 否 | 业务信息<br/>请根据 code 来判断错误情况，不应该依赖message 匹配，因为message 可能会调整。 |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | | object | 否 | 业务数据 |
| <br/> | orgId | | | | | string | 是 | 机构账号ID |
| | signTemplateId | | | | | string | 是 | 流程模板ID |
| | signTemplateName | | | | | string | 是 | 流程模板名称 |
| | signTemplateStatus    | | | | | int | 是 | 流程模板可用状态<br/>0 - 停用状态<br/>1 - 启用状态 |
| | docs<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | array | 是 | 底稿文件信息 |
| |    <br/>   <br/>    | fileId | | | | string | 是 | 文件ID |
| | | fileName | | | | string | 是 | 文件名称 |
| | | fileNameConversion | | | | string | 是 | 文件转换后的文件名称 |
| | | fileDownloadUrl | | | | string | 是 | 文件底稿PDF文件的下载链接<font style="color:#F5222D;">（有效期为60分钟，过期后可以重新调用接口获取新的下载地址）</font> |
| | participants<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | array | 是 | 参与方 |
| |  | participantId | | | | string | 是 | 参与方ID，需要开发者保存，以便后续发起时使用 |
| | | participantFlag | | | | string | 是 | 参与方标识，同一个模板中不可重复<br/>会展示到模板页面上，所以建议设置为<br/>例如甲方、乙方等容易理解的业务名词 |
| | | participantType | | | | int | 是 | 参与方类型 1-企业 2-个人 |
| | | participateBizType | | | | string | 是 | 参与方式，1-填写 2-签署<br/>用英文逗号分隔 |
| | | participantSetMode | | | | int | 是 | 参与要求（参与人指定方式）<br/>1-使用模板时指定（由使用模板的人自行指定），[通过流程模板创建合同拟定和签署流程](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/megwsgkmpbg1tec1)接口发起流程时，<font style="color:#DF2A3F;">需要在</font>**<font style="color:#DF2A3F;">participants</font>**<font style="color:#DF2A3F;">内传入具体参与方信息</font><br/>2-固定成员（写死到模板中不可更改），[通过流程模板创建合同拟定和签署流程](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/megwsgkmpbg1tec1)接口发起流程时，<font style="color:#DF2A3F;">不需要传具体参与方信息</font><br/>3-发起人本人（使用模板的是谁就指定谁），[通过流程模板创建合同拟定和签署流程](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/megwsgkmpbg1tec1)接口发起流程时，<font style="color:#DF2A3F;">不需要传具体参与方信息，但需要在</font>**<font style="color:#DF2A3F;">signFlowInitiator</font>**<font style="color:#DF2A3F;">内指定发起人信息</font><br/>4-固定企业（企业名固定，由使用模板的人自行指定经办人），[通过流程模板创建合同拟定和签署流程](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/megwsgkmpbg1tec1)接口发起流程时，<font style="color:#DF2A3F;">需要在</font>**<font style="color:#DF2A3F;">participants</font>**<font style="color:#DF2A3F;">内传入具体企业参与方信息（企业名称传模板制作时的固定企业，经办人信息自行指定）</font> |
| | | orgParticipant<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | object | 否 | 企业参与方 |
| | |  | orgId | | | string | 否 | 企业账号ID |
| | | | orgName | | | string | 否 | 企业名称 |
| | | | transactor<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | object | 否 | 企业参与方经办人 |
| | | |  | transactorPsnId | | string | 否 | 经办人个人ID |
| | | | | transactorPsnAccount | | string | 否 | 经办人手机号/邮箱 |
| | | | | transactorName | | string | 否 | 经办人姓名 |
| | | psnParticipant<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | object | 否 | 个人参与方 |
| | |    <br/>    | psnId | | | string | 否 | 个人账号ID |
| | | | psnAccount | | | string | 否 | 个人手机号/邮箱 |
| | | | psnName | | | string | 否 | 个人姓名 |
| | | draftOrder | | | | int | 否 | 填写顺序，默认值1<br/>1-255 不同参与人不可重复 |
| | | signOrder | | | | int | 否 | 签署顺序，默认值1<br/>1-255 不同参与人可重复 |
| | | sealTypes | | | | string | 是 | 可选签章方式，用英文逗号隔开<br/>1-企业章<br/>2-法定代表人章<br/>3-个人-手绘签名<br/>4-个人-模板章<br/>5-个人-AI手绘签名 |
| | | willingnessAuthModes | | | | string | 是 | 签署人可选意愿方式，用英文逗号隔开<br/>1-人脸认证（包含e签宝、腾讯云、支付宝三种刷脸方式）<br/>2-短信验证码<br/>3-邮箱验证码<br/>4-签署密码（需要签署人在e签宝设置过签署密码，纯api客户不建议使用） |
| | | components<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | array | 是 | 控件列表（包含的参数见下方） |
| | |  | componentId | | | string | 否 | 控件id |
| | | | componentKey | | | string | 否 | 控件key（在设置文件模板时由用户填写的控件标识） |
| | | | componentName | | | string | 否 | 控件名称 |
| | | | required | | | boolean | 否 | 是否必填<br/>true-必填<br/>false-非必填 |
| | | | componentType | | | int | 否 | 控件类型<br/>1, 文本   2, 数字   3, 日期   6, 普通签署区   8, 多行文本   9, 复选   10, 单选   11, 图片   14, 下拉选择控件   15, 勾选框控件   16, 身份证控件   17,备注签署区   18, 动态表格   19, 手机号 |
| | | | componentDefaultValue | | | string | 否 | 控件默认值 |
| | | | componentPosition<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | object | 否 | 控件位置 |
| | | |  | componentPositionX | | float | 否 | 控件位置横坐标 |
| | | | | componentPositionY | | float | 否 | 控件位置纵坐标 |
| | | | | componentPageNum | | int | 否 | 控件所在页码 |
| | | | componentSpecialAttribute<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | object | 否 | 控件特有属性 |
| | | |  | dateFormat | | string | 否 | 日期格式（日期控件） |
| | | | | imageType | | string | 否 | 图片类型（图片控件）<br/>IDCard_widthwise 身份证 横向 锁比例<br/>IDCard_longitudinal 身份证 纵向 锁比例<br/>other 其他 不锁比例 |
| | | | | options<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | array | 否 | 选项（下拉选择控件、单选控件、多选控件） |
| | | | |  | optionOrder | int | 否 | 选项顺序 |
| | | | | | optionContent | string | 否 | 选项内容 |
| | | | | | selected | boolean | 否 | 是否默认选中 |
| | | | | | optionPositionX | float | 否 | 子选项在父控件边框中的横坐标 |
| | | | | | optionPositionY | float | 否 | 子选项在父控件边框中的纵坐标 |
| | | | | | optionWidth | float | 否 | 子选项宽度 |
| | | | | | optionHeight | float | 否 | 子选项宽度 |
| | | | | tableContent | | array | 否 | 表格行列内容（动态表格控件特有），格式：<br/>[row{"column1":"value1","column2":"value2"}]<br/>补充说明：<br/>row 表示动态表格对应的行，row的个数依据模板动态表格控件中所添加的所添加的行数。<br/>column1 表示当前行中单元格的Key值<br/>value1 表示当前行中单元格的Value值，单元格未设置固定值时为""空字符串，否则为所设置的固定值。 |
| | | | | numberFormat | | string | 否 | 数字格式（数字控件）<br/>整数：0<br/>保留一位小数：0.0<br/>保留两位小数：0.00 |
| | | | | componentMaxLength | | string | 否 | 控件可填充长度上限（多少个中文字符） |
| | | | componentTextFormat<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | object | 否 | 控件字符样式 |
| | | |  | font | | int | 否 | 填充字体，默认：1<br/>1-宋体，2-新宋体，4-黑体，5-楷体 |
| | | | | fontSize | | float | 否 | 填充字体大小，默认：12-小四<br/>42-初号<br/>36-小初<br/>26-一号<br/>24-小一<br/>22-二号<br/>19-小二<br/>16-三号<br/>15-小三<br/>14-四号<br/>12-小四<br/>10.5-五号<br/>9-小五 |
| | | | | textColor | | string | 否 | 字体颜色，默认：#000000-黑色 |
| | | | | bold | | boolean | 否 | 是否加粗，默认：false<br/>true-是<br/>false-否 |
| | | | | italic | | boolean | 否 | 是否斜体，默认：false<br/>true-是<br/>false-否 |
| | | | | horizontalAlignment | | string | 否 | 水平对齐，默认：LEFT-左对齐<br/>LEFT-左对齐<br/>CENTER-居中对齐<br/>RIGHT-右对齐 |
| | | | | verticalAlignment | | string | 否 | 垂直对齐，默认：TOP-顶对齐（适用于多行文本）<br/>TOP-顶对齐<br/>MIDDLE-居中对齐<br/>BOTTOM-底对齐 |
| | | | | textLineSpacing | | float | 否 | 行间距，默认：1.0 <br/>最多支持一位小数，最大值为2.0（适用于多行文本） |
| | | | componentSize<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | object | 否 | 控件尺寸 |
| | | |  | componentWidth | | int | 否 | 控件宽度（矩形的左右边距距离，单位为px） |
| | | | | componentHeight | | int | 否 | 控件高度（矩形的上下边距距离，单位为px） |
| | | | remarkSignField<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | object | 否 | 备注签字区属性 |
| | | |  | inputType | | int32 | 否 | 备注文字输入方式<br/>1 - 手写抄录输入<br/>2 - 键盘自由输入 |
| | | | | aiCheck | | int32 | 否 | 是否开启 AI 手写抄录校验，<br/>0 - 不开启<br/>1 - 开启 AI 校验<br/>2 - 强制 AI 校验 |
| | | | | remarkContent | | string | 否 | 预设待抄录信息 |
| | | | | remarkFontSize | | int32 | 否 | 备注文字字号，默认值14px |
| | | | normalSignField<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | object | 否 | 普通签章区属性 |
| | | |  | showSignDate | | int | 否 | 是否显示签署日期，   0 - 不显示   1 - 显示 |
| | | | | dateFormat | | string | 否 | 日期格式：<br/>yyyy年MM月dd日<br/>yyyy-MM-dd<br/>yyyy/MM/dd<br/>yyyy-MM-dd HH:mm:ss |
| | | | | signFieldStyle | | int32 | 否 | 签章区样式<br/>1-单页签章区<br/>2-骑缝签章区 |
| | | | | sealSpecs | | int32 | 否 | 落章规则<br/>**1** - 以实际印章规格加盖<br/>**2** - 自定义印章规格加盖（根据指定的签署区宽高适配） |
| | | | | sealType | | int | 否 | 印章类型<br/>1-企业章<br/>2-法人章<br/>3-企业经办人章<br/>（个人印章该字段返回null） |
| | | | | mustSign | | boolean | 否 | 是否必须签署<br/>true-是<br/>false-否 |
| | | | | designatedSealNum | | int | 否 | 签署区指定的印章数量 |
| | | | | designatedSealIds | | array | 否 | 签署区指定的印章列表 |
| | | | |  | sealId | string | 否 | 印章ID |
| | | | | | orgId | string | 否 | 印章所属主体企业ID |
| | | | originCustomComponentId | | | string | 否 | 来源自定义控件ID |
| | | | fileId | | | string | 否 | 控件所属文件ID |
| | copiers<font style="color:#DF2A3F;">（点击“+”展开详情）</font> | | | | | array | 否 | 设置抄送方 |
| |    <br/>   <br/>   <br/>    | copierPsnInfo<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | object | 否 | 个人抄送方信息<br/>支持场景：①抄送给个人，②抄送给企业的接收人 |
| | |  | psnId | | | string | 否 | 个人抄送方ID |
| | | | psnAccount | | | string | 否 | 个人抄送方账号，手机号或邮箱 |
| | | | psnName | | | string | 否 | 个人抄送方姓名 |
| | | copierOrgInfo<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | object | 否 | 机构抄送方信息 |
| | |  | orgId | | | string | 否 | 机构抄送方ID |
| | | | orgName | | | string | 否 | 机构抄送方名称 |
| | attachments<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | array | 否 | 附件（无需签名的文件）信息 |
| |    <br/>   <br/>    | fileId | | | | string | 否 | 附件文件ID |
| | | fileName | | | | string | 否 | 附件文件名称 |
| | | downloadUrl | | | | string | 是 | 文件下载地址（30天有效） |
| | dedicatedCloudId | | | | | string | 否 | 专属云项目ID<br/><font style="color:#E8323C;">补充说明：</font><br/>（1）专属云：文件需要存储在开发者本地系统，购买了专属云服务时使用；<br/>（2）专属云项目ID获取方式：请先联系对接群内技术获取； |


### 请求示例
```http
//正式线上环境--GET请求
GET 'https://openapi.esign.cn/v3/sign-templates/detail?signTemplateId=a3924a*****d8203aa2&orgId=842ec****91662f&queryComponents=true'

//沙箱模拟环境--GET请求
GET 'https://smlopenapi.esign.cn/v3/sign-templates/detail?signTemplateId=a3924a*****d8203aa2&orgId=842ec****91662f&queryComponents=true'
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "orgId": "842ec8ce3f****5fc91662f",
        "signTemplateId": "c53786b****20244e92",
        "signTemplateName": "流程模板测试",
        "signTemplateStatus": 1,
        "docs": [
            {
                "fileId": "a8d7472******3d6d0a88",
                "fileName": "劳动合同文件.doc",
                "fileNameConversion": "劳动合同文件.pdf",
                "fileDownloadUrl": "https://esignoss.esign.cn/1111564182/ade246a7-*****-9c43-d77240d151fb/%E8%BD%AF%E4%BB%B6%E9%94%80%E5%94%AE%E5%90%88%E5%90%8C.pdf?Expires=1676862779&OSSAccessKeyId=LTAI4G23YViiKnxTC28ygQzF&Signature=KUX3n4hcHcQauCaPT6XjvM5wU9U%3D"
            }
        ],
        "participants": [
            {
                "participantId": "fd28225f*****6242fd2ee",
                "participantFlag": "甲方企业",
                "participantType": 1,
                "participateBizType": "2",
                "participantSetMode": 2,
                "orgParticipant": {
                    "orgId": "0daec2******963e49eb",
                    "orgName": "甲方XXX测试企业（测试专用）",
                    "transactor": {
                        "transactorPsnId": null,
                        "transactorPsnAccount": "153****650",
                        "transactorName": "甲方经办人姓名"
                    }
                },
                "psnParticipant": null,
                "draftOrder": null,
                "signOrder": 1,
                "sealTypes": "1",
                "willingnessAuthModes": "1,2",
                "components": [
                    {
                        "componentId": "e7de5c3b******ca37bbb9d5",
                        "componentKey": null,
                        "componentName": "签署区",
                        "required": false,
                        "componentType": 6,
                        "componentDefaultValue": null,
                        "componentPosition": {
                            "componentPositionX": 485.85,
                            "componentPositionY": 199.96,
                            "componentPageNum": 3
                        },
                        "componentSpecialAttribute": {
                            "dateFormat": null,
                            "imageType": null,
                            "options": null,
                            "tableContent": null,
                            "numberFormat": null,
                            "componentMaxLength": null
                        },
                        "componentTextFormat": {
                            "font": 1,
                            "fontSize": 12.0,
                            "textColor": "#000000",
                            "bold": false,
                            "italic": false,
                            "horizontalAlignment": "LEFT",
                            "verticalAlignment": "TOP",
                            "textLineSpacing": 1.0
                        },
                        "componentSize": {
                            "componentWidth": 100,
                            "componentHeight": 100
                        },
                        "remarkSignField": null,
                        "normalSignField": {
                            "showSignDate": 0,
                            "dateFormat": null,
                            "signFieldStyle": 1,
                            "sealSpecs": 1,
                            "sealType": 1,
                            "mustSign": true,
                            "designatedSealNum": 0,
                            "designatedSealIds": []
                        },
                        "originCustomComponentId": null,
                        "fileId": "a8d747******8f3d6d0a88"
                    }
                ]
            },
            {
                "participantId": "b12b3********94b22a",
                "participantFlag": "乙方个人",
                "participantType": 2,
                "participateBizType": "2,1",
                "participantSetMode": 2,
                "orgParticipant": null,
                "psnParticipant": {
                    "psnId": "626629f******24299f1d8c1d",
                    "psnAccount": "139****761",
                    "psnName": "乙方个人姓名"
                },
                "draftOrder": 1,
                "signOrder": 1,
                "sealTypes": "3,4",
                "willingnessAuthModes": "1,2",
                "components": [
                    {
                        "componentId": "2fb8fe7*****db34ca7",
                        "componentKey": null,
                        "componentName": "签署区",
                        "required": false,
                        "componentType": 6,
                        "componentDefaultValue": null,
                        "componentPosition": {
                            "componentPositionX": 223.53,
                            "componentPositionY": 193.49,
                            "componentPageNum": 3
                        },
                        "componentSpecialAttribute": {
                            "dateFormat": null,
                            "imageType": null,
                            "options": null,
                            "tableContent": null,
                            "numberFormat": null,
                            "componentMaxLength": null
                        },
                        "componentTextFormat": {
                            "font": 1,
                            "fontSize": 12.0,
                            "textColor": "#000000",
                            "bold": false,
                            "italic": false,
                            "horizontalAlignment": "LEFT",
                            "verticalAlignment": "TOP",
                            "textLineSpacing": 1.0
                        },
                        "componentSize": {
                            "componentWidth": 100,
                            "componentHeight": 100
                        },
                        "remarkSignField": null,
                        "normalSignField": {
                            "showSignDate": 0,
                            "dateFormat": null,
                            "signFieldStyle": 1,
                            "sealSpecs": 1,
                            "sealType": null,
                            "mustSign": true,
                            "designatedSealNum": 0,
                            "designatedSealIds": []
                        },
                        "originCustomComponentId": null,
                        "fileId": "a8d74728d*****f3d6d0a88"
                    },
                    {
                        "componentId": "4d355ba06******0a2f8a00",
                        "componentKey": null,
                        "componentName": "name",
                        "required": true,
                        "componentType": 1,
                        "componentDefaultValue": null,
                        "componentPosition": {
                            "componentPositionX": 204.03,
                            "componentPositionY": 663.06,
                            "componentPageNum": 1
                        },
                        "componentSpecialAttribute": {
                            "dateFormat": null,
                            "imageType": null,
                            "options": null,
                            "tableContent": null,
                            "numberFormat": null,
                            "componentMaxLength": "20"
                        },
                        "componentTextFormat": {
                            "font": 1,
                            "fontSize": 12.0,
                            "textColor": "#000000",
                            "bold": false,
                            "italic": false,
                            "horizontalAlignment": "LEFT",
                            "verticalAlignment": "TOP",
                            "textLineSpacing": 1.0
                        },
                        "componentSize": {
                            "componentWidth": 160,
                            "componentHeight": 15
                        },
                        "remarkSignField": null,
                        "normalSignField": null,
                        "originCustomComponentId": null,
                        "fileId": "a8d7472*****f3d6d0a88"
                    },
                    {
                        "componentId": "93ae9016******bb473ed",
                        "componentKey": null,
                        "componentName": "name2",
                        "required": true,
                        "componentType": 1,
                        "componentDefaultValue": null,
                        "componentPosition": {
                            "componentPositionX": 378.15,
                            "componentPositionY": 661.67,
                            "componentPageNum": 1
                        },
                        "componentSpecialAttribute": {
                            "dateFormat": null,
                            "imageType": null,
                            "options": null,
                            "tableContent": null,
                            "numberFormat": null,
                            "componentMaxLength": "20"
                        },
                        "componentTextFormat": {
                            "font": 1,
                            "fontSize": 12.0,
                            "textColor": "#000000",
                            "bold": false,
                            "italic": false,
                            "horizontalAlignment": "LEFT",
                            "verticalAlignment": "TOP",
                            "textLineSpacing": 1.0
                        },
                        "componentSize": {
                            "componentWidth": 160,
                            "componentHeight": 15
                        },
                        "remarkSignField": null,
                        "normalSignField": null,
                        "originCustomComponentId": null,
                        "fileId": "a8d747*****3d6d0a88"
                    }
                ]
            }
        ],
        "copiers": [
            {
                "copierPsnInfo": {
                    "psnId": "7ffcaed8******f0a8f6",
                    "psnAccount": "XXX@XXX.cn",
                    "psnName": "张三"
                },
                "copierOrgInfo": null
            }
        ],
        "attachments": [
            {
                "fileId": "313e16******dd9808dee",
                "fileName": "流程模板预览附件测试.doc",
                "downloadUrl": "https://esignoss.esign.cn/1111564182/344116e-***-9e06-054d42005839/%E4%B8%89%E4%BA%BA%E5%90%88%E4%BC%99%E7%BB%8F%E8%90%A5%E5%8D%8F%E8%AE%AE%E4%B9%A6.doc?Expires=1676865368&OSSAccessKeyId=LTAI4G23YViiKnxTC28ygQzF&Signature=w4zWcDDebFCtqrQVkWRpamqjpLU%3D"
            }
        ],
        "dedicatedCloudId": null
    }
}
```

