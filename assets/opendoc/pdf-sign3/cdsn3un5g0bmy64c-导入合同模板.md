### 接口描述
导入合同文件模板数据，相当于在当前环境、当前appId下生成新的模板。与原有模板相比，除了模板ID（docTemplateId）不同，其余模板内数据均相同（包含控件ID（componentId）、控件Key（componentKey））。

:::warning
**<font style="color:#E8323C;">【注意事项】</font>**

+ **<font style="color:#DF2A3F;">由于导出的模板必须是服务升级后的，那么导入的模板页面的样式也是升级后的（不管当前appId是否升级）。</font>**

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/doc-templates/import

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明** | | |
| --- | --- | --- | :---: | :---: | --- | --- | --- |
| copyResult | | string | 是 | body | 复制结果，有效期30分钟，调用[《导出合同模板》](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/eh5l0eibugqw4x4r)接口获取 | | |


### 响应参数
| **参数名称** | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | object | 否 | 业务数据 |
| | docTemplateList | | array | 是 | 复制后的生产环境文件模板ID列表 |
| |  | customBizNum | string | 是 | 自定义业务编码 |
| | | docTemplateId | string | 是 | 导入后生成的新的合同模板ID |


### 请求示例
```json
{
    "copyResult": "sVNrx48hogLpF0kF4AFcHGLuaZVS1ZAHS6CgMZabKN2pXtf8wuxEQLInk0oaosuKr+gQFBBKxkUOZ9hjE/OsY3+yceCxuqMjoG8cdTGiucUyjtIWS3te4gt+jxgywnwWoXsQomIHQ+qmFS6XCLphlMJoYhkBX3AFbk0Zb1jOiUeIBHcXP6078cfvHIwgQ7QeQ2brteUY8zNnQRx12YcnVbsdZuKHny1hoPTaQfL1dHnk6aEGepKm+NkZbGHMYBowzl33DLiOyG+yvo4KwOSU9B9P1k7NtfrapKR1xIBDeXdBwiGIITv74QhvLHaV+gOhrWxnGsW93YNXpZYzJAdzhC/cnUAdesHergz0SYMUz45W86npzGOKIWAlox+BwvWoaB/lbqPfLagOCnbHmC7isuNe323eqSX7KcGkGM1zCDaUtI4NPjMCK1gWjJIqc9GD4ZVCE+wj+Lpakvt32GaThw==\n"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "docTemplateList": [
            {
                "docTemplateId": "67e9be7a569a4f7387734a955a493446",
                "customBizNum": "张三的模板001"
            },
            {
                "docTemplateId": "709af09a13e048bba90150eaaea7d616",
                "customBizNum": "李四的模板002"
            },
            {
                "docTemplateId": "904f91b347764f179d2f0318cc6e5a59",
                "customBizNum": "王五的模板003"
            }
        ]
    }
}
```

