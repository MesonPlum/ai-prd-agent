### 接口描述
查询流程的具体状态（包含合同拟定状态和签署状态）

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/status

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | --- | --- | --- |
| signFlowId | string | 是 | path | 签署流程ID |


### 响应参数
| **参数名称** | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 是 | 业务码，0表示成功，非0表示异常。  |
| message | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message 匹配，因为message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | object | 否 | 业务数据 |
| | draftStatus | | int | 否 | 合同拟定状态<br/>1-拟定中<br/>2-完成<br/>3-撤销<br/>4-拒填<br/>5-过期<br/><font style="color:#F5222D;">【注】：合同拟定完成后，才会流转到签署阶段。</font> |
| | signFlowStatus | | int | 否 | 签署流程状态<br/>0-草稿<br/>1-签署中<br/>2-完成<br/>3-撤销<br/>5-过期（签署截至日期到期后触发）<br/>7-拒签<br/><font style="color:#F5222D;">【注】：若流程未流转到签署阶段, 该参数返回null。</font> |
| | rescissionStatus | | int | 否 | 签署流程的解约状态<br/>0 - 未解约<br/>1 - 解约中<br/>2 - 部分解约<br/>3 - 已解约<br/><font style="color:#F5222D;">【注】：签署流程完成后，才允许发起解约，发起解约成功后，该字段才可能是1、2、3状态。</font> |


### 请求示例
```http
//正式线上环境--GET请求
GET 'https://openapi.esign.cn/v3/sign-flow/b3713b681*****db463/status'

//沙箱模拟环境--GET请求
GET 'https://smlopenapi.esign.cn/v3/sign-flow/b3713b681*****db463/status'
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "draftStatus": 2,
        "signFlowStatus": 1,
        "rescissionStatus": 0
    }
}
```

