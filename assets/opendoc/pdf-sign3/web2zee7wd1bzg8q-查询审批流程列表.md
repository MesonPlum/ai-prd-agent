### 接口描述
查询某个企业下或某企业经办人下的的全部审批流程列表信息（仅查询当前appId发起的签署流程产生的审批流程列表）。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/approval/approval-task-list

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| pageNum | int | 是 | body | 页码（大于0，最小值为1） |
| pageSize | int | 是 | body | 每页展示的数量（可选范围[1~100]） |
| orgId | string | 是 | body | 机构账号ID<font style="color:#DF2A3F;">（机构账号ID可通过</font>[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)<font style="color:#E8323C;">接口通过组织机构名称/组织机构证件号进行</font><font style="color:#DF2A3F;">查询）</font><br/><font style="color:#DF2A3F;">补充说明：</font><br/>需要让当前机构提前对调用方企业应用ID做授权后才可以使用该接口（调用[【获取机构认证&授权页面链接】](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/kcbdu7)接口，授权添加 **org_approval_info **或 **manage_org_resource**权限范围）。 |
| operatorPsnId | string | 否 | body | 审批操作人个人账号ID |
| queryType | int    | 否 | body | 查询方式<font style="color:#DF2A3F;">（必须传入operatorPsnId，才能使用该字段）</font><br/>1-我参与的（只要操作人是审批流程的参与方就可以查询到）<br/>2-待我审批（必须是审批流程流转到当前操作人审批才能查询到） |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;">（左右拖动查看完整描述）</font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
| | total | | | | int32 | 否 | 查询结果总数量 |
| | approvalFlowList<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | array | 否 | 审批任务列表信息 |
| |  | signFlowId | | | string | 否 | 签署流程ID |
| | | approvalFlowId | | | string | 否 | 审批流程ID |
| | | approvalFlowStatus | | | int | 否 | 审批流程状态<br/>1-审批中<br/>2-审批通过<br/>3-审批驳回<br/>4-审批撤回<br/>5-审批终止（超时未审批） |
| | | approvalFlowCreateTime | | | long | 否 | 审批流程创建时间（毫秒级时间戳格式） |
| | | approvalFlowUpdateTime | | | long | 否 | 审批流程更新时间（毫秒级时间戳格式） |


**<font style="color:rgb(38, 38, 38);">请求示例</font>**

```json
{
  "pageNum": 1,
  "pageSize": 20,
  "orgId": "a14527******922b12709",
  "operatorPsnId": "fef71b********2af37",
  "queryType": 2
}
```

<font style="color:rgb(38, 38, 38);"></font>

**<font style="color:rgb(38, 38, 38);">响应示例</font>**<font style="color:rgb(38, 38, 38);"></font>

```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "total": 2,
        "approvalFlowList": [
            {
                "signFlowId": "d8cdac8c11111ad6cc4efcb37041b",
                "approvalFlowId": "AF-2cb111e01e080e9b",
                "approvalFlowStatus": 1,
                "approvalFlowCreateTime": 1706777968000,
                "approvalFlowUpdateTime": 1706778062000
            },
            {
                "signFlowId": "9cc4c9e23fc1111149dcfb4b653c",
                "approvalFlowId": "AF-2b7711115080631",
                "approvalFlowStatus": 1,
                "approvalFlowCreateTime": 1701421937000,
                "approvalFlowUpdateTime": 1701421937000
            }
        ]
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)





