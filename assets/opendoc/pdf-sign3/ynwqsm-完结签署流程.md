### 接口描述
此接口用于完结签署流程，完成后的签署流程不允许再添加、删除签章区域，也不允许撤销签署流程。

:::info
**注意事项：**

（1）签署流程中添加的签署方全部完成签章后才可以完结流程。

（2）完结签署流程后才允许调用[【下载已签文件及附属材料】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/kczf8g)接口下载已签章的文件。

（3）发起签署时 autoFinish 参数设置为true，全部签章完成时流程将自动完结，无需再调用此接口。

（4）发起签署时 autoFinish 参数设置为false，需要开发者主动调用此接口将签署流程状态变更为**已完成**。

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/finish

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **<font style="color:black;">参数名称</font>** | **参数类型** | **<font style="color:black;">必选</font>** | **参数位置** | **<font style="color:black;">参数说明</font>** |
| --- | :---: | :---: | :---: | --- |
| signFlowId | string | 是 | path | 签署流程ID |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message</font><br/><font style="color:#F5222D;"> 匹配，因为 message 可能会调整。</font> |
| data | | | | | object | 否 | 业务数据 |


### 请求示例
```http
POST https://openapi.esign.cn/v3/sign-flow/429b1d30**0a63d7e4c0d/finish
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": null
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)





