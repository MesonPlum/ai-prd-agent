### 接口描述
+ 支持查询指定时间段内，接口发起的全部合同拟定流程列表信息。
+ 支持指定具体的拟定流程状态，查询对应时间段内的全部流程列表。
+ 支持指定发起方，查询其名下对应时间段内的全部流程列表。
+ 支持指定填写方以及填写方具体的填写状态，查询其名下对应时间段内的全部流程列表。

:::warning
**<font style="color:#E8323C;">注意事项：</font>**

**<font style="color:#E8323C;">仅能查询当前应用Id（appId）通过接口发起的合同拟定流程列表。</font>**

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/list

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | :---: | :---: | :---: | --- |
| pageNum | | int | 是 | body | 页码（大于0，最小值为1）  |
| pageSize | | int | 是 | body | 每页展示的数量（可选范围[1~100]） |
| signFlowStartTimeFrom | | int64 | 是 | body | 开始时间（流程发起时间） 毫秒级时间戳格式 |
| signFlowStartTimeTo | | int64 | 是 | body | 结束时间（流程发起时间）毫秒级时间戳格式<br/><font style="color:#E8323C;">【注】</font>开始时间到结束时间的时间范围最长不可超过<font style="color:#DF2A3F;">1年</font>，且只能查询近<font style="color:#DF2A3F;">5年</font>的流程 |
| initiator | | object | 否 | body | 发起方 |
|    <br/>    | initiatorOrgId | string    | 否 | body | 机构发起方id |
| | transactorPsnId | string | 否 | body | 机构发起方经办人id |
| operator | | object | 否 | body | 填写操作人（个人填写方本人为操作人，机构填写方经办人为操作人） |
|    <br/>    | psnId | string | 否 | body | 填写操作人个人id |
| | psnAccount | string | 否 | body | 填写操作人个人账号 |
| organization | | object | 否 | body | 机构填写方 |
|    <br/>    | orgId | string | 否 | body | 机构填写方ID |
| | orgName | string | 否 | body | 机构填写方名称 |
| draftStatus    | | list | 否 | body | 拟定流程状态<font style="color:#DF2A3F;">（默认全部）</font><br/>**1** - 拟定中（填写中）<br/>**2 **- 完成（拟定完成流转到签署过程）<br/>**3** - 撤销（撤销合同拟定触发）<br/>**4** - 拒填（用户侧在页面拒填后触发）<br/>**5** - 过期（填写截至日期到期后触发） |
| fillStatus | | list | 否 | body | 某个填写人的填写状态<font style="color:#DF2A3F;">（默认全部）</font><br/>**1 **- 未填写<br/>**2** - 填写中<br/>**3 **- 已填写<br/>**4 -** 拒填<br/><font style="color:#E8323C;">【注】</font>查此状态，必须传入**operator（**签署操作人信息） |


### 响应参数
| 参数名称 | | |  | | | | 参数类型 | 必选 | 参数说明 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| code | | | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | | | string | 否 | 业务信息<br/>请根据 code 来判断错误情况，不应该依赖message 匹配，因为message 可能会调整。 |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | | | object | 否 | 业务数据 |
| <br/> | total | | | | | | int | 否 | 查询总数 |
| | draftInfos<font style="color:#DF2A3F;">（点击“+”展开详情）</font> | | | | | | array | 否 | 拟定流程信息列表 |
| |  | signFlowInitiator<font style="color:#DF2A3F;">（点击“+”展开详情）</font> | | | | | object | 否 | 拟定流程发起方 |
| | |  | orgId | | | | string | 否 | 机构发起方ID |
| | | | orgName | | | | string | 否 | 机构发起方名称 |
| | | | transactor | | | | object | 否 | 机构发起经办人信息 |
| | | |  | psnId | | | string | 否 | 个人发起方ID |
| | | | | psnAccount | | | object | 否 | 个人发起方账号 |
| | | | |  | accountMobile | | string | 否 | e签宝服务个人登录手机号 |
| | | | | | accountEmail | | string | 否 | e签宝服务个人登录邮箱 |
| | | drafters<font style="color:#DF2A3F;">（点击“+”展开详情）</font> | | | | | array | 否 | 填写方信息列表 |
| | | | draftOrder | | | | int | 否 | 填写顺序<br/>顺序值 1-255 ，不同参与人顺序不会重复 |
| | | | fillStatus | | | | int | 否 | 填写人的填写状态<br/>**1 **- 未填写<br/>**2** - 填写中<br/>**3 **- 已填写<br/>**4 -** 拒填 |
| | | | psnDrafter | | | | object | 否 | 个人填写方信息 |
| | | |  | psnId | | | string | 否 | 个人填写方ID |
| | | | | psnAccount | | | object | 否 | 个人填写方账号 |
| | | | |  | accountMobile | | string | 否 | e签宝服务个人登录手机号 |
| | | | | | accountEmail | | string | 否 | e签宝服务个人登录邮箱 |
| | | | orgDrafter | | | | object | 否 | 机构填写方 |
| | | |  | orgId | | | string | 否 | 机构ID |
| | | | | orgName | | | string | 否 | 机构名称 |
| | | | | transactor | | | object | 否 | 机构参与方经办人 |
| | | | |  | psnId | | string | 否 | 经办人个人ID |
| | | | | | psnAccount | | string | 否 | 经办人手机号/邮箱 |
| | | | | |  | accountMobile | string | 否 | e签宝服务个人登录手机号 |
| | | | | | | accountEmail | string | 否 | e签宝服务个人登录邮箱 |
| | | signFlowId | | | | | string | 否 | 签署流程ID |
| | | draftStartTime | | | | | int64 | 否 | 拟定流程开启时间，时间戳 |
| | | draftFinishTime | | | | | int64 | 否 | 拟定流程结束时间，时间戳 |
| | | draftStatus    | | | | | list | 否 | 拟定流程状态<br/>**1** - 拟定中（填写中）<br/>**2 **- 完成（拟定完成流转到签署过程）<br/>**3** - 撤销（撤销合同拟定触发）<br/>**4** - 拒填（用户侧在页面拒填后触发）<br/>**5** - 过期（填写截至日期到期后触发） |
| | | signFlowTitle | | | | | string | 否 | 签署流程标题 |


### 请求示例
```json
{
    "pageNum": 1,
    "pageSize": 20,
    "signFlowStartTimeFrom": 1674295319000,
    "signFlowStartTimeTo": 1676973733064,
    "draftStatus": [
        1,
        2
    ]
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "total": 2,
        "draftInfos": [
            {
                "signFlowInitiator": {
                    "orgId": "842ec8ce*****91662f",
                    "orgName": "企业名称",
                    "transactor": null
                },
                "drafters": [
                    {
                        "psnDrafter": {
                            "psnId": "626629f******1d8c1d",
                            "psnAccount": {
                                "accountMobile": "166*****1",
                                "accountEmail": null
                            }
                        },
                        "orgDrafter": null
                    },
                    {
                        "psnDrafter": null,
                        "orgDrafter": {
                            "orgId": "0daec218********eb",
                            "orgName": "企业名称",
                            "transactor": {
                                "psnId": "39c4d6*******634438c8",
                                "psnAccount": {
                                    "accountMobile": "153****50",
                                    "accountEmail": null
                                }
                            }
                        }
                    }
                ],
                "signFlowId": "b3713b6******1db463",
                "draftStartTime": 1676959878000,
                "draftFinishTime": 1676969696000,
                "draftStatus": 2,
                "signFlowTitle": "这是本次签署任务的主题1"
            },
            {
                "signFlowInitiator": {
                    "orgId": "842ec8c******fc91662f",
                    "orgName": "esig*****限公司",
                    "transactor": null
                },
                "drafters": [
                    {
                        "psnDrafter": {
                            "psnId": "626629f483*****299f1d8c1d",
                            "psnAccount": {
                                "accountMobile": "166****61",
                                "accountEmail": null
                            }
                        },
                        "orgDrafter": null
                    }
                ],
                "signFlowId": "ba57046f******671d539dc",
                "draftStartTime": 1676958612000,
                "draftFinishTime": null,
                "draftStatus": 1,
                "signFlowTitle": "这是本次签署任务的主题2"
            }
        ]
    }
}
```

