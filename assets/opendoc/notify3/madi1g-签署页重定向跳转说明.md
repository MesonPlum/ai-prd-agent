签署方手动签署完成后，e签宝签署页在重定向跳转时会在开发者传入的重定向Url中拼接上签署状态相关参数。

开发者可以在业务系统前端页面中通过解析重定向Url中的 **<font style="color:#FA8C16;background-color:#E9E9E9;">tsignCode</font>** 参数进行业务判断。

#### 样式示例及参数说明
```http
https://www.xxx.cn/?tsignType=SIGN&tsignCode=0&tsignDes=签署成功&signFlowId=285d1117d38c4df8862e77847a9ce3a1
```

其中 [https://www.xxx.cn/](https://www.xxx.cn/) 为开发者在[【基于文件发起签署】](https://qianxiaoxia.yuque.com/books/share/93483c38-9764-487d-a112-fd30265c7c6f/yrx1k7)接口中传入的  **<font style="color:#FA8C16;background-color:#E9E9E9;">redirectUrl</font>****<font style="color:#FA8C16;"> </font>**参数实际值。

Url中其他参数说明如下：

| **参数名称** | **参数类型** | **必选** | **参数说明** |
| --- | :---: | :---: | :--- |
| tsignType | string | 是 | 签署场景，固定值：**SIGN** |
| tsignCode | int | 是 | 签署状态<br/>0 - 签署成功，1 - 无权访问，2 - 流程被拒签 |
| tsignDes | string | 是 | 签署状态描述<br/>0 - 签署成功，1 - 无权访问，2 - 流程被拒签 |
| signFlowId | string | 是 | 签署流程ID |


