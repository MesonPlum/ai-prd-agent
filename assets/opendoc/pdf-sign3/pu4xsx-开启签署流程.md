### 接口描述
<font style="color:#333333;">签署流程开启之后，签署任务会按照流程既定配置开始执行（通知相关签署人开始签署等），签署流程此时为“签署中”状态。</font>

:::info
**<font style="color:#E8323C;">注意事项：</font>**

+ 签署流程开启后，将不允许向签署流程中添加或删除文件（包括待签文件和附属材料文件）。
+ 签署流程开启后，签署中可向签署流程中再添加签署区（签署方），参考文档[【追加签署区】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/ohzup7)。注意，如果是自动完结的流程，即发起签署时`<font style="color:rgb(64, 64, 64);">autoFinish</font>`<font style="color:rgb(64, 64, 64);">（</font>自动完结<font style="color:rgb(64, 64, 64);">）参数设置了true，不允许向此流程中</font>添加签署区（签署方）

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/start

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
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。  |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data | | | | | object | 否 | 业务数据 |


### 请求示例
```http
POST https://openapi.esign.cn/v3/sign-flow/429b1d30**0a63d7e4c0d/start
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



