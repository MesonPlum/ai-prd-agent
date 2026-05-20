### 接口描述
<font style="color:rgb(64, 64, 64);">查询集成方企业（当前应用ID对应的企业主体）名下发起的签署流程列表。</font>

:::warning
**<font style="color:#E8323C;">注意事项：</font>**

<font style="color:rgb(38, 38, 38);">支持查询集成方企业（应用ID对应的企业主体），通过</font><font style="color:#E8323C;">API接口发起</font><font style="color:rgb(38, 38, 38);">的签署流程和</font> <font style="color:#E8323C;">SaaS 智能合同</font>（e签宝SaaS官网）发起的签署流程<font style="color:rgb(38, 38, 38);">。</font> 

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/organizations/sign-flow-list

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **<font style="color:black;">参数名称</font>** | | **<font style="color:black;">参数类型</font>** | **<font style="color:black;">必选</font>** | **参数位置** | **<font style="color:black;">参数说明</font>** |
| --- | --- | :---: | :---: | :---: | --- |
| pageNum | | int32 | 是 | body | 查询页码 （大于0，最小值为1） |
| pageSize | | int32 | 是 | body | <font style="color:rgb(64, 64, 64);">每页显示的数量</font>，（可选范围[1~100]） |
| signFlowStartTimeFrom | | int64 | 否 | body | 开始时间（<font style="color:#DF2A3F;">发起签署流程时间</font>），Unix时间戳（毫秒级）格式<br/><font style="color:#E8323C;">【注】</font><br/>+ 开始时间到结束时间的时间范围最长不可超过<font style="color:#DF2A3F;">1年，</font>且只能查询近<font style="color:#DF2A3F;">5年</font>的流程<br/>+ 发起签署流程的时间区间和完结签署流程的时间区间<font style="color:#DF2A3F;">不可同时为空</font> |
| signFlowStartTimeTo | | int64 | 否 | body |  结束时间（<font style="color:#DF2A3F;">发起签署流程时间</font>），Unix时间戳（毫秒级）格式 |
| signFlowFinishTimeFrom | | int64 | 否 | body | 开始时间（<font style="color:#DF2A3F;">完结签署流程时间</font>），Unix时间戳（毫秒级）格式<br/><font style="color:#E8323C;">【注】</font><br/>+ 开始时间到结束时间的时间范围最长不可超过<font style="color:#DF2A3F;">1年，</font>且只能查询近<font style="color:#DF2A3F;">5年</font>的流程<br/>+ 发起签署流程的时间区间和完结签署流程的时间区间<font style="color:#DF2A3F;">不可同时为空</font><br/>+ 根据流程完结的时间区间查询到的signFlowStatus（流程状态）一定是：2 - 已完成 |
| signFlowFinishTimeTo | | int64 | 否 | body |  结束时间（<font style="color:#DF2A3F;">完结签署流程时间</font>），Unix时间戳（毫秒级）格式 |
| signFlowStatus | | list | 否 | body | 流程状态（默认值为 1,2 ）<br/>+ **1** - 签署中<br/>+ **2** - 已完成 |
| operator<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | object | 否 | body | 签署操作人<font style="color:#E8323C;">（个人签署方本人为操作人，机构签署方经办人为操作人）</font><br/><font style="color:#E8323C;">【注】</font>psnId 与 psnAccount 二选一传入即可。 |
|  | psnAccount | string | 否 | body | 个人签署方账号标识（手机号或邮箱） |
| | psnId | string | 否 | body | 个人签署方ID |
| organization<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | object | 否 | body | 机构签署方信息<br/><font style="color:#E8323C;">【注】</font>orgId 与 orgName 二选一传入即可。 |
|  | orgId | string | 否 | body | 机构签署方ID |
| | orgName | string | 否 | body | 机构签署方名称 |


### 响应参数
| **参数名称** | | | | | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | | | string | 否 | 业务信息<br/><font style="color:#E8323C;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | | | object | 否 | 业务数据 |
|  | **total** | | | | | | int32 | 否 | 查询结果中流程的总数量 |
| | **signFlowInfos**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | | array | 否 | 签署流程列表信息 |
| | | signFlowId | | | | | string | 否 | 签署流程ID |
| | | signFlowStartTime | | | | | int64 | 否 | 流程开始时间（Unix时间戳，单位：毫秒） |
| | | signFlowEndTime | | | | | int64 | 否 | 流程结束时间（Unix时间戳，单位：毫秒） |
| | | signFlowTitle | | | | | string | 否 | 签署流程标题 |
| | | signFlowStatus | | | | | int32 | 否 | 签署流程状态<br/>**1 **- 签署中，**2 **- 已完成 |
| | | rescissionStatus | | | | | int32 | 否 | 签署流程的解约状态<br/>**0** - 未解约<br/>**1** - 解约中<br/>**2** - 部分解约<br/>**3** - 已解约 |
| | | **signFlowInitiator**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | string | 否 | 签署流程发起方信息 |
| | |  | psnInitiator<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | 个人发起方信息 |
| | | |  | psnAccount | | | object | 否 | 个人账号 |
| | | | |  | accountMobile | | string | 否 | 手机号（个人账号标识） |
| | | | | | accountEmail | | string | 否 | 邮箱号（个人账号标识） |
| | | | | psnId | | | string | 否 | 个人账号ID |
| | | | orgInitiator<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | 机构发起方信息 |
| | | |  | orgId | | | string | 否 | 机构账号ID |
| | | | | orgName | | | string | 否 | 机构名称（机构账号标识） |
| | | | | transactor | | | object | 否 | 机构方经办人 |
| | | | |  | psnAccount | | object | 否 | 经办人账号 |
| | | | | |  | accountMobile | string | 否 | 手机号（经办人账号标识） |
| | | | | | | accountEmail | string | 否 | 邮箱号（经办人账号标识） |
| | | | | | psnId | | string | 否 | 经办人账号ID |
| | | **signers**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | array | 否 | 签署方信息列表 |
| | |  | psnSigner | | | | object | 否 | 个人签署方 |
| | | |  | psnId | | | string | 否 | 个人签署方账号ID |
| | | | | psnAccount | | | object | 否 | 个人签署方账号 |
| | | | |  | accountMobile | | string | 否 | 手机号（个人账号标识） |
| | | | | | accountEmail | | string | 否 | 邮箱号（个人账号标识） |
| | | | orgSigner | | | | object | 否 | 机构签署方 |
| | | |  | orgId | | | string | 否 | 机构账号ID |
| | | | | orgName | | | string | 否 | 机构名称（机构账号标识） |
| | | | | transactor | | | object | 否 | 机构签署经办人 |
| | | | |  | psnAccount | | object | 否 | 经办人账号 |
| | | | | |  | accountMobile | string | 否 | 手机号（经办人账号标识） |
| | | | | | | accountEmail | string | 否 | 邮箱号（经办人账号标识） |
| | | | | | psnId | | string | 否 | 经办人账号ID |


### 请求示例
```json
{
	"pageNum": 1,
	"pageSize": 20,
	"signFlowStartTimeFrom": 1648801671000,
	"signFlowStartTimeTo": 1651393671000,
	"signFlowStatus": [1,2]
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "total": 1,
        "signFlowInfos": [
            {
                "signFlowInitiator": {
                    "psnInitiator": null,
                    "orgInitiator": {
                        "orgId": "55d29d5ab***7149afe67",
                        "orgName": "xxx发起方企业名称",
                        "transactor": null
                    }
                },
                "signers": [
                    {
                        "psnSigner": {
                            "psnId": "c7e00294729***ea310541e7",
                            "psnAccount": {
                                "accountMobile": "183****0101",
                                "accountEmail": null
                            }
                        },
                        "orgSigner": null
                    }
                ],
                "signFlowId": "99a90f284***b4yy8ad0",
                "signFlowStartTime": 1649409511000,
                "signFlowEndTime": null,
                "signFlowStatus": 1,
                "rescissionStatus": 0,
                "signFlowTitle": "这是个签署流程的主题"
            }
        ]
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)

