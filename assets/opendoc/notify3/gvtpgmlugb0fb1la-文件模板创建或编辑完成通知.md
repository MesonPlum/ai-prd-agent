#### 该消息触发的用户操作条件
开发者使用[【获取制作合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xagpot)或[【获取编辑合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/lgb2go)接口获取页面提供给用户编辑模板，用户编辑完成后会通过异步回调通知消息推送给开发者，以此判断用户是否创建或编辑模板完成。

#### 该消息推送的回调通知Url地址配置方式
开发者登录e签宝 [**开放平台**](https://open.esign.cn) 后点击【控制台】进入e签宝开发者控制台，在页面上方先选择【正式服务】<font style="color:#DF2A3F;">（沙箱环境则选择【沙箱服务】，其他流程一致）</font>，然后在页面下方左侧点击【应用管理】-【我的应用】后在右侧应用列表页面中点击【配置】进入“应用配置”页面，选择【消息推送】模块的“添加”按钮即可配置接收回调通知的URL，并需要在事件订阅中勾选：“模板编辑”事件。如下图：

![](https://cdn.nlark.com/yuque/0/2021/png/432598/1639619150410-08f204c0-0143-4e45-85f8-b6379c47a739.png)

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1673576109628-da52397f-2b3d-49b8-924b-f4a46031c168.png)

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1673576223204-9d78b033-1234-445f-893c-7377f1904517.png)



![](https://cdn.nlark.com/yuque/0/2023/png/447795/1675734243185-422ce0ac-026d-4c63-af64-6a62e9b1845a.png)

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1683278126787-45ae7d3a-d326-4734-8d6c-701eccc2c1d5.png)

#### 回调参数
回调通知数据接收，详见[文件和模板回调通知接收说明](https://qianxiaoxia.yuque.com/opendoc/notify3/qv82pc)。

| **参数名称** | | **必选** | **参数类型** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| action | | 是 | string | 标记该通知的业务类型，该通知固定为：**<font style="color:#52C41A;">EDIT_DOCTEMPLATE</font>** |
| timestamp | | 是 | int64 | 回调通知发送时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| docTemplateId | | 是 | string | 文件模板ID |
| docTemplateName | | 是 | string | 文件模板名称 |


#### 通知示例
```json
{
    "action": "EDIT_DOCTEMPLATE",
    "docTemplateId": "c0e0574********5746b26398",
    "docTemplateName": "test.pdf",
    "timestamp": 1680745281887
}
```

