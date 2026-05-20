### 接口描述
<font style="color:rgb(51, 51, 51);">撤销合同拟定过程中的合同，拟定流程撤销后，该流程作废，需要重新发起新的流程。</font>

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/rescind

**请求方法：**post

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | --- | --- | --- | --- |
| signFlowId | | string | 是 | path | 签署流程ID  |


### 响应参数
| **参数名称** | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data | | | string | 否 | 业务数据 |


### 请求示例
```http
//正式线上环境--POST请求
POST 'https://openapi.esign.cn/v3/sign-flow/b3713b681ce*****b463/rescind'

//沙箱模拟环境--POST请求
POST 'https://smlopenapi.esign.cn/v3/sign-flow/b3713b*****1db463/rescind'
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {}
}
```

