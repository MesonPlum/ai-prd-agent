### 接口描述
在沙箱模拟环境下，导出合同文件模板数据。接口获取到的复制结果，再调用[《导入合同模板》](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/cdsn3un5g0bmy64c)接口，进行模板的复制，方便开发者切换环境后，可以跨环境导入使用，无需再次制作模板。**<font style="color:#DF2A3F;">（导出接口只能在沙箱环境调用，但导入支持跨环境、跨企业、跨appId）</font>**

:::warning
**<font style="color:#E8323C;">【注意事项】</font>**

+ **<font style="color:#DF2A3F;">只能在沙箱环境调用该接口，所以域名固定：</font>**[**https://smlopenapi.esign.cn**](https://smlopenapi.esign.cn)**<font style="color:#DF2A3F;">。</font>**
+ **<font style="color:#DF2A3F;">只能用</font>**[**【获取制作合同模板页面】**](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xagpot)**<font style="color:#DF2A3F;">接口制作的模板，不支持用SaaS官网生成的模板。</font>**
+ **<font style="color:#DF2A3F;">只支持模板服务升级后制作的模板导出（请提供appId，联系e签宝交付顾问进行服务升级）。升级后模板制作页面样式如下：</font>**

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1719822169669-ae678cc0-53e7-434a-a586-589f6d4e4af5.png)

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1719822473314-4f4202f4-1950-4108-8cbc-91ecece630b9.png)

:::

### 接口地址&请求方法
**接口地址：**https://smlopenapi.esign.cn/v3/doc-templates/export

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | --- | :---: | :---: | --- |
| docTemplateList | | array | 是 | body | 沙箱模拟环境文件模板ID列表 |
|  | customBizNum | string | 是 | body | 自定义业务编码<font style="color:#DF2A3F;">（开发者自定义可用于标识当前模板）</font> |
| | docTemplateId | string | 是 | body | 要复制的合同模板ID<font style="color:#DF2A3F;">（必须是当前appId下创建的）</font> |


### 响应参数
| **参数名称** | | **参数类型** | **必选** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| code | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message**** | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | object | 否 | 业务数据 |
|  | copyResult | string | 否 | 复制结果，有效期30分钟，需要调用[《导入合同模板》](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/cdsn3un5g0bmy64c)接口使用 |


### 请求示例
```json
{
    "docTemplateList": [
        {
            "customBizNum": "张三的模板001",
            "docTemplateId": "a8749d0364ac482e86aa9a4bc1aadbc3"
        },
        {
            "customBizNum": "李四的模板002",
            "docTemplateId": "f4b881a60f694ff1bd5a695521f24147"
        },
        {
            "customBizNum": "王五的模板003",
            "docTemplateId": "ceb841921af14cda930ebf15a00a7684"
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
        "copyResult": "sVNrx48hogLpF0kF4AFcHGLuaZVS1ZAHS6CgMZabKN2pXtf8wuxEQLInk0oaosuKr+gQFBBKxkUOZ9hjE/OsY3+yceCxuqMjoG8cdTGiucUyjtIWS3te4gt+jxgywnwWoXsQomIHQ+qmFS6XCLphlPH1CCzj3SQIIx/QV3yifUGIBHcXP6078cfvHIwgQ7QeQ2brteUY8zNnQRx12YcnVdT/oxVz64n0BlvxdsTkRXvXGI8wQ3Yyl9tDt4EdF1pxHH7Y25HKx15LW5Lw0ltRfBqdfe1GQiyDamgZDBCHTbIHJTosF0Lh03krNPUd3TlfrWxnGsW93YNXpZYzJAdzhAROrylbwMsN4WStCWM9XRBW86npzGOKIWAlox+BwvWoaB/lbqPfLagOCnbHmC7isluUezHUru0eQmigGXjOMKVgpom+cQHUj6GvMXlM2KRO7Fho21WFErAMSVq/Xxdm1w==\n"
    }
}
```



