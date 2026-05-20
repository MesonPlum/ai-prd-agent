### 接口描述
查询本次签署中审批流程的详细信息（仅查询当前appId发起的签署流程产生的审批任务）。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/approval/{approvalFlowId}/detail

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| approvalFlowId | string | 是 | path | 审批流程ID<font style="color:#DF2A3F;">（通过</font>[【回调通知】](https://qianxiaoxia.yuque.com/opendoc/notify3/tr6cur0c658inqu0)<font style="color:#DF2A3F;">或者</font>[【查询签署流程详情】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xxk4q6)<font style="color:#DF2A3F;">接口获取）</font><br/><font style="color:#DF2A3F;">补充说明：</font><br/>需要提前让盖章主体公司对调用方企业应用ID做授权后才可以使用该接口（调用[【获取机构认证&授权页面链接】](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/kcbdu7)接口，授权添加 **org_approval_info **或 **manage_org_resource**权限范围）。 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;">（左右拖动查看完整描述）</font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
| | signFlowId | | | | string | 否 | 签署流程ID |
| | orgId | | | | string | 否 | 机构账号ID |
| | orgName | | | | string | 否 | 机构名称 |
| | approvalFlowStatus | | | | int | 否 | 审批流程状态<br/>1-审批中<br/>2-审批通过<br/>3-审批驳回<br/>4-审批撤回<br/>5-审批终止（超时未审批） |
| | approvalNodes | | | | array | 否 | 审批节点列表 |
| |  | approvalNodeNum | | | int | 否 | 审批节点序号 |
| | | approvalNodeId | | | string | 否 | 审批节点ID |
| | | approvalNodeType | | | int | 否 | 审批节点类型<br/>1-或审<br/>2-会审 |
| | | approvalNodeStatus | | | int | 否 | 审批节点状态（审批节点下每个审批人都有一个审批任务）<br/>0-未开始<br/>1-待审批<br/>2-已通过<br/>3-已拒绝 |
| | | approvers | | | array | 否 | 审批操作人列表（会审时会存在多个操作人） |
| | |  | approvalOperateTime | | long | 否 | 审批操作时间戳（毫秒级时间戳格式） |
| | | | psnId | | string | 否 | 审批人账号ID |
| | | | psnName | | string | 否 | 审批人姓名 |


**<font style="color:rgb(38, 38, 38);">请求示例</font>**

```http
GET https://openapi.esign.cn/v3/approval/1f21w9****111/detail
```

<font style="color:rgb(38, 38, 38);"></font>

**<font style="color:rgb(38, 38, 38);">响应示例</font>**<font style="color:rgb(38, 38, 38);"></font>

```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "signFlowId": "961564e1c1111b885acc48d0fd83f",
        "orgId": "842ec8ce3fcb111180675fc91662f",
        "orgName": "测试有限公司",
        "approvalFlowStatus": 2,
        "approvalNodes": [
            {
                "approvalNodeNum": 1,
                "approvalNodeId": "d708cad_1631111251",
                "approvalNodeType": 1,
                "approvalNodeStatus": 2,
                "approvers": [
                    {
                        "psnId": "7ffcaed8c11111118f0ef0a8f6",
                        "psnName": "张三",
                        "approvalOperateTime": 1706781391000
                    }
                ]
            }
        ]
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)





