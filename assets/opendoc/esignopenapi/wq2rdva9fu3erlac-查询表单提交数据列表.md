### 接口描述
当平台企业（appId所属企业主体）成员在e签宝官网发起表单采集申请后，平台开发者可通过接口查询某个表单采集任务的所有提交数据列表。（[点击跳转 e签宝官网-信息采集表单功能介绍](https://help.esign.cn/detail?id=rvd6g9f1lvcdcgf4&nameSpace=cs3-dept%2Fexboae)）

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/collect-form/submitted-data-list

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | | | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | :---: | :---: | :---: | --- |
| formId | | | | string | 是 | body | 表单ID（可通过异步通知 [【提交表单采集通知】](https://qianxiaoxia.yuque.com/opendoc/notify3/hsv0qx13599ig80l) 中获取）![](https://cdn.nlark.com/yuque/0/2025/png/447795/1765953521295-fcc5693a-ab30-49a3-a94a-de3e017edfe9.png) |
| taskId | | | | string | 是 | body | 采集任务ID（可通过异步通知 [【提交表单采集通知】](https://qianxiaoxia.yuque.com/opendoc/notify3/hsv0qx13599ig80l) 中获取）<br/>![](https://cdn.nlark.com/yuque/0/2025/png/447795/1765953472878-823f258c-e8a3-4f27-b9f7-40f2c0cf4cef.png) |
| pageNum | | | | int | 否 | body | 查询页码（大于0，最小值为1），默认为1 |
| pageSize | | | | int | 否 | body | 查询一页展示的数量（可选范围[1~100]），默认为20 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | --- | --- | :---: | --- | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
| | total | | | | int | 否 | 查询结果总数量 |
| | submittedDataList<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | string | 否 | 提交的数据列表 |
| |  | submitterPsnId | | | string | 否 | 提交人个人账号ID |
| | | submitterName | | | string | 否 | 提交人姓名 |
| | | submitTime | | | long | 否 | 提交时间（毫秒级时间戳） |
| | | dataId | | | string | 否 | 提交数据ID |


### 请求示例
```json
{
    "formId": "form1053611119092969472",
     "taskId": "task1053611110453326848"
}
```

### 响应示例
```json
{
    "code": 0,
    "data": {
        "submittedDataList": [
            {
                "submitTime": 1765958015987,
                "dataId": "105370151115983488",
                "submitterPsnId": "a76bff5c62c1118ba5dff8943f498442",
                "submitterName": "李四"
            },
            {
                "submitTime": 1765950938193,
                "dataId": "105367182111451392",
                "submitterPsnId": "8a2cf1a1c1111f3824329327b165754",
                "submitterName": "张三"
            }
        ],
        "total": 2
    },
    "message": "SUCCESS"
}
```

