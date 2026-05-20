### 接口描述
撤销签署中的流程，撤销后签署流程将终止，变为已撤销状态（[**点击了解 签署流程状态详解**](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/gsy6xe)**）**。

:::warning
**<font style="color:#DF2A3F;">注意：</font>**

**<font style="color:#DF2A3F;">1、当签署方已完成签字盖章操作之后，对于此签署方来说已履行签署义务；如果开发者要撤销此签署流程，必须先获得全部已完成盖章的签署方同意，否则会存在一定法律风险。</font>**

**<font style="color:#DF2A3F;">2、仅当指定发起方经办人的场景（</font>**[**点击了解 如何指定合同发起方**](https://qianxiaoxia.yuque.com/opendoc/case3/bgs7lwkpz0fezgup)**<font style="color:#DF2A3F;">）才支持在</font>**[**e签宝SaaS官网撤回**](https://help.esign.cn/detail?id=wmkirm&nameSpace=cs3-dept%2Fexboae)**<font style="color:#DF2A3F;">，默认平台方发起不支持在e签宝SaaS官网撤回，仅能通过接口撤销。</font>**

:::

### **接口地址&请求方法**
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/revoke

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **<font style="color:black;">参数名称</font>** | **参数类型** | **<font style="color:black;">必选</font>** | **参数位置** | **<font style="color:black;">参数说明</font>** |
| --- | :---: | :---: | :---: | --- |
| signFlowId | string | 是 | path | 签署流程ID |
| revokeReason | string | 否 | body | 撤销原因<br/><font style="color:#DF2A3F;">补充说明：</font><br/>+ 撤销原因最多50字 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message</font><br/><font style="color:#F5222D;"> 匹配，因为 message 可能会调整。</font> |
| data | | | | | object | 否 | 业务数据 |


### 请求示例
```http
POST https://openapi.esign.cn/v3/sign-flow/429b1d30**0a63d7e4c0d/revoke
```

```json
{
    "revokeReason": "合同条款错误"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {}
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)



