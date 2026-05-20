#### 该消息触发的条件
:::info
当按照以下方式设置了回调通知推送地址后，调用[《获取拖章定位页面》](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/gw0r0w5qb5cx2ft6)接口获取拖章页面<font style="color:rgb(38, 38, 38);">，拖好章并提交后触发此通知。</font>

:::

#### 该消息推送的回调通知Url地址配置方式
开发者登录e签宝 [**开放平台**](https://open.esign.cn) 后点击【控制台】进入e签宝开发者控制台，在页面上方先选择【正式服务】<font style="color:#DF2A3F;">（沙箱环境则选择【沙箱服务】，其他流程一致）</font>，然后在页面下方左侧点击【应用管理】-【我的应用】后在右侧应用列表页面中点击【配置】进入“应用配置”页面，选择【消息推送】模块的“添加”按钮即可配置接收回调通知的URL，并需要在事件订阅中勾选：“获取签章位置信息”事件。如下图：

![](https://cdn.nlark.com/yuque/0/2021/png/432598/1639619150410-08f204c0-0143-4e45-85f8-b6379c47a739.png)

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1673576109628-da52397f-2b3d-49b8-924b-f4a46031c168.png)

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1673576223204-9d78b033-1234-445f-893c-7377f1904517.png)



![](https://cdn.nlark.com/yuque/0/2023/png/447795/1675734243185-422ce0ac-026d-4c63-af64-6a62e9b1845a.png)

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1720090979693-1654ba66-59b3-4b8c-b42c-04a8eb4785cb.png)



#### 回调参数
回调通知数据接收，详见[文件和模板回调通知接收说明](https://qianxiaoxia.yuque.com/opendoc/notify3/qv82pc)。

| **参数名称** | | | | **必选** | **参数类型** | **参数说明** |
| --- | --- | --- | --- | :---: | :---: | --- |
| action | | | | 是 |   string | 通知的业务类型，固定值：**<font style="color:#52C41A;">GET_SEAL_POSITION</font>** |
| timestamp | | | | 是 | int64 | 回调通知发送时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| customBizNum | | | | 是 | string | 自定义业务编码<font style="color:#DF2A3F;">（开法者自定义业务标识，可以区分具体是哪笔业务流程）</font> |
| components | | | | 是 | <font style="color:rgb(68, 68, 68);">array</font> | 控件列表 |
| | | fileId | | 是 | string | 控件所属文件ID |
| | | signerRole | | 否 | string | 签署方角色标识，用于关联签署区 |
| | | componentType | | 是 | string | 控件类型<br/>6 - 普通签署区   17 - 备注签署区 |
| | | componentPosition | | 是 | object | 控件位置 |
| | | | componentPositionX | 是 | float | 控件位置X横坐标 |
| | | componentPositionY | | 是 | float | 控件位置Y纵坐标 |
| | | componentPageNum | | 是 | int32 | 控件所在页码 |
| | | componentSize | | 是 | object | 控件尺寸 |
| | |  | componentWidth | 是 | float | 控件宽度（矩形的左右距离，单位为px） |
| | | componentHeight | | 是 | float | 控件高度（矩形的上下距离，单位为px） |
| | | normalSignField | | 否 | object | 签章区属性 |
| | | | showSignDate | 否 | int32 | 是否显示签署日期<br/>**0** - 不显示，**1 **- 显示 |
| | | dateFormat | | 否 | string | 日期格式，支持以下日期格式：<br/>**yyyy年MM月dd日**<br/>**yyyy-MM-dd**<br/>**yyyy/MM/dd**<br/>**yyyy-MM-dd HH:mm:ss** |
| | | signFieldStyle | | 否 | int32 | 签章样式<br/>**1 **- 单页签章，**2** - 骑缝签章 |
| | | sealSpecs | | 否 | int32 | 落章规则<br/>**1** - 以实际印章规格加盖<br/>**2** - 自定义印章规格加盖（根据指定的签署区宽高适配） |
| | | remarkSignField | | 否 | object | 备注区属性 |
| | |  | aiCheck | 否 | int32 | 是否开启手写抄录AI校验<br/> **0** - 不开启，**1** - 开启 AI 校验，**2** - 强制 AI 校验 |
| | | inputType | | 否 | int32 | 备注文字输入方式 <br/>**1 **- 手写抄录方式，**2** - 自由输入方式 |
| | | remarkContent | | 否 | string | 预设手写抄录信息 |
| | | remarkFontSize | | 否 | string | 备注文字的字号，单位pt，默认值12pt（小四字号）<br/><font style="color:#DF2A3F;">注：签署侧需要的字号单位是px，模板侧通用的都是pt，因此要做一次转换；pt与px间的换算关系是：0.75px=1pt</font> |


#### 通知示例
```json
{
    "action": "GET_SEAL_POSITION",
    "components": [
        {
            "componentPosition": {
                "componentPageNum": 3,
                "componentPositionX": 220.73,
                "componentPositionY": 200.66
            },
            "componentSize": {
                "componentHeight": 100,
                "componentWidth": 100
            },
            "componentType": 6,
            "fileId": "70a0b2e887111111056969f79535bb",
            "normalSignField": {
                "dateFormat": "yyyy-MM-dd",
                "sealSpecs": 1,
                "showSignDate": 1,
                "signFieldStyle": 1
            },
            "signerRole": "甲方签署区"
        },
        {
            "componentPosition": {
                "componentPageNum": 3,
                "componentPositionX": 480.47,
                "componentPositionY": 207.16
            },
            "componentSize": {
                "componentHeight": 100,
                "componentWidth": 100
            },
            "componentType": 6,
            "fileId": "70a0b2e887111111056969f79535bb",
            "normalSignField": {
                "dateFormat": "yyyy-MM-dd",
                "sealSpecs": 1,
                "showSignDate": 1,
                "signFieldStyle": 1
            },
            "signerRole": "乙方签署区"
        }
    ],
    "customBizNum": "自定义编码001",
    "timestamp": 1720081636460
}
```



