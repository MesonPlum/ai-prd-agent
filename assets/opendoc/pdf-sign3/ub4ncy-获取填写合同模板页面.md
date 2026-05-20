### 接口描述
用户可通过可视化的**填写合同模板页面来填写控件内的内容**，生成最终的待签署合同。填写页面效果如下：

:::warning
**<font style="color:#E8323C;">【注意事项】：</font>**

**<font style="color:#E8323C;">1.</font>****<font style="color:#DF2A3F;">适用于用户填写</font>**[**【获取制作合同模板页面】**](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xagpot)**<font style="color:#DF2A3F;">接口制作的模板内容。</font>**

**<font style="color:#E8323C;">2.使用HTML动态模板时，填充的表格行数不能超过2000行（性能限制），且HTML填充完样式可能产生变化，不能保证完全一致。</font>**

:::

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1733111266670-bf5ea59d-430b-4b83-b4e5-d9c1e704c98a.png)

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/doc-templates/doc-template-fill-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | :--- | :---: | :---: | --- |
| docTemplateId | | string | 是 | body | 文件模板ID |
| customBizNum | | string | 否 | body | 自定义业务编号<br/><font style="color:#E8323C;">【注】</font>开发者自定义内容，用户填写后可通过回调通知以及重定向地址拼接形式传回该参数标识该笔任务 |
| componentFillingtValues | | array | 否 | body | 模板控件预填内容列表<font style="color:rgb(232, 50, 60);">（</font>**<font style="color:rgb(232, 50, 60);">控件ID </font>**<font style="color:rgb(232, 50, 60);">和 </font>**<font style="color:rgb(232, 50, 60);">控件Key </font>**<font style="color:rgb(232, 50, 60);">二选一传值）</font> |
|  | componentId | string | 否 | body | 控件ID<font style="color:rgb(245, 34, 45);">（设置合同模板时由e签宝系统自动生成）</font> |
| | componentKey | string | 否 | body | <font style="color:rgb(64, 64, 64);">控</font>件Key<font style="color:rgb(245, 34, 45);">（设置合同模板时由用户自定义）</font> |
| | componentValue | string | 是 | body | <font style="color:rgb(64, 64, 64);">控件填充值</font><br/><font style="color:rgb(232, 50, 60);">补充说明：</font><br/>（1）[点击查看](https://qianxiaoxia.yuque.com/opendoc/case3/zh1a6z#ZJWrS)<font style="color:rgb(64, 64, 64);"> 如何填充基础控件</font><br/><font style="color:rgb(64, 64, 64);">（2）</font>[点击查看](https://qianxiaoxia.yuque.com/opendoc/case3/ubfvvk#pCyRQ)<font style="color:rgb(64, 64, 64);"> 如何填充动态表格</font> |
| editFillingValue | | boolean | 否 | body | 用户填写页面是否可以修改预填内容（**componentFillingtValues**中填写的内容），默认为：**true**<br/>**true** - 可修改<br/>**false** - 不可修改 |
| clientType | | string | 否 | body | 指定客户端类型<br/>ALL - 自动适配移动端或PC端<font style="color:#E8323C;">（默认值）</font><br/>H5 - 移动端适配<br/>PC - PC端适配 |
| notifyUrl | | string | 否 | body | 回调通知地址，详见[【文件和模板回调通知接收说明】](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/qv82pc) |
| redirectUrl | | string | 否 | body | 填写模板完成后跳转页面（需符合 https /http 协议地址）<br/><font style="color:#E8323C;">【注】</font><br/>+ 用户填写后跳转地址上会携带e签宝生成的待签署文件ID以及开发者自定义业务编号，例如：<font style="color:#117CEE;">https://redirectUrl?fileId=40971**c512&customBizNum=Order001</font><br/>+ 如开发者地址本身携带查询字符串、锚点，请遵照浏览器 window.location 标准解析规则（如有#，请放在最后），例如：[https://www.esign.cn:80/path?key1=001&key2=002#section1](https://www.esign.cn:80/path?t=888&c=key#section1) |


### 响应参数
| **参数名称** | | **参数类型** | **必选** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| code | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message**** | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | object | 否 | 业务数据 |
| | fillTaskId | string | 否 | 填写任务ID（可根据任务ID调用[《查询填写合同模板任务结果》](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ovhittqcf7cooxxv)接口获取用户填写的内容及填写任务状态等信息） |
| | docTemplateFillUrl | string | 否 | 填写文件模板页面链接（30天有效） |
| | docTemplateFillLongUrl | string | 否 | 填写文件模板页面长链接（30天有效）<br/><font style="color:#F5222D;">【注】</font>支持自定义域名，微信小程序H5内嵌场景需要使用长链接 |


### 请求示例
```json
{
    "docTemplateId": "79d3a0ec*******876",
    "customBizNum": "01测试",
    "componentFillingtValues": [
        {
            "componentKey": "tableKey",
            "componentValue": "[{\"row\":{\"column1\":\"\",\"column2\":\"\",\"column3\":\"\",\"column4\":\"\"}},{\"insertRow\":\"true\",\"row\":{\"column1\":\"1\",\"column2\":\"工具套装111\",\"column3\":\"10\",\"column4\":\"2\",\"column5\":\"20\"}},{\"insertRow\":\"true\",\"row\":{\"column1\":\"2\",\"column2\":\"工具套装222\",\"column3\":\"20\",\"column4\":\"2\",\"column5\":\"40\"}},{\"insertRow\":\"true\",\"row\":{\"column1\":\"3\",\"column2\":\"工具套装333\",\"column3\":\"100\",\"column4\":\"4\",\"column5\":\"400\"}},{\"row\":{\"column1\":\"合计\",\"column2\":\"460\"}},{\"row\":{\"column1\":\"人民币大写\",\"column2\":\"肆佰陆拾元整\"}},{\"row\":{\"column1\":\"备注\",\"column2\":\"我是备注........\"}}]"
        },
        {
            "componentKey": "key1",
            "componentValue": "公司A"
        },
        {
            "componentKey": "key2",
            "componentValue": "公司B"
        }
    ],
    "editFillingValue": false,
    "clientType": "ALL",
    "notifyUrl": "http://****/notify",
    "redirectUrl": "https://esign.cn"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "docTemplateFillUrl": "https://smlt.esign.cn/P1AAARJ",
        "docTemplateFillLongUrl": "https://kfz7411114954.smlh5.esign.cn/documents/api/fill-guide?appId=7411114954&templateId=7be640b11111634e0fd660ba87&openId=iklreFl&clientType=ALL&redirectUrl=https%3A%2F%2Fesign.cn%3FcustomBizNum%3D01%25E6%25B5%258B%25E8%25AF%2595",
        "fillTaskId": "356b5d759*****f1596800433015"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/px5yvgqf9glbs7o6)

