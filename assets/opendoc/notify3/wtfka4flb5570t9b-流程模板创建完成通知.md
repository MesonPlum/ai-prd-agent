**【触发条件】当开发者调用 **[**获取《创建流程模板》页面链接**](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/ukznvprry5qvlxh3)** 接口获取到模板制作链接，设置好签署方后点击下一步，会通过回调消息通知给开发者。 **

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1743128075740-dab0fb5d-1d32-4626-84f4-deb50459ba6e.png)

#### **该消息推送的回调通知Url地址配置方式**
开发者登录e签宝 [**开放平台**](https://open.esign.cn) 后点击【控制台】进入e签宝开发者控制台，在页面上方先选择【正式服务】<font style="color:#DF2A3F;">（沙箱环境则选择【沙箱服务】，其他流程一致）</font>，然后在页面下方左侧点击【应用管理】-【我的应用】后在右侧应用列表页面中点击【配置】进入“应用配置”页面，选择【消息推送】模块的“添加”按钮即可配置接收回调通知的URL，并需要在事件订阅中勾选对应事件。如下图：

![](https://cdn.nlark.com/yuque/0/2021/png/432598/1639619150410-08f204c0-0143-4e45-85f8-b6379c47a739.png)

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1673576109628-da52397f-2b3d-49b8-924b-f4a46031c168.png)

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1716776448627-e24a8219-7591-4b72-a2c9-5c1b33a2c722.png)

#### 回调参数
| **参数名称** | | | **必选** | **参数类型** | **参数说明** |
| --- | --- | --- | --- | --- | --- |
| action | | | 是 | string | 标记该通知的业务类型，该通知固定为：<br/>**<font style="color:#52C41A;">CREATE_SIGN_TEMPLATE</font>** |
| timestamp | | | 是 | int64 | 回调通知发送时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| signTemplateId | | | 是 | string | 流程模板ID |
| signTemplateName | | | 是 | string | 流程模板名称 |
| orgId | | | 是 | string | 模板归属企业ID（机构账号ID） |
| orgName | | | 是 | string | 模板归属企业名称（机构名称） |
| customBizNum | | | 否 | string | 自定义业务编号<br/><font style="color:#DF2A3F;">（创建流程模板时传入值，原样返回）</font> |


#### 填写状态通知示例
```json
{
    "action": "CREATE_SIGN_TEMPLATE",
    "timestamp": 1717740175087,
    "signTemplateId": "d2ff354d4caa42e29263a59e6f5df8c8",
    "signTemplateName": "0607",
    "orgId": "842ec8ce3fcb41e78ee80675fc91662f",
    "orgName": "esigntest霁林测试有限公司",
    "customBizNum": "自定义业务编号001"
}
```

#### 
