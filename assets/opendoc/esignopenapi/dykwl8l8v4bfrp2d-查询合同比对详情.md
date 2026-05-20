### 接口描述
通过接口获取合同的比对结果以及比对详情，[《获取合同比对结果页面》](https://qianxiaoxia.yuque.com/opendoc/esignopenapi/kzanlfeoplw2q4q5)接口必须要打开链接，在页面里用肉眼查看结果。当前接口可以直接通过查询合同比对业务ID直接返回信息结果。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/contract-compare-result

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | | | **参数**<br/>**类型** | **必选** | **参数**<br/>**位置** | **参数说明** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| contractCompareBizId | | | | string | 是 | body | 合同比对业务ID（通过[《获取合同比对结果页面》](https://qianxiaoxia.yuque.com/opendoc/esignopenapi/kzanlfeoplw2q4q5)接口获取） |


### 响应参数
| **<font style="color:black;">参数名称</font>** | | | | **<font style="color:black;">参数</font>**<br/>**<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>** |
| --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | int32 | 是 | 业务码，0表示成功 |
| message | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message</font><br/><font style="color:#F5222D;"> 匹配，因为 message 可能会调整。</font> |
| data | | | | object | 否 | 业务数据 |
| | status | | | int32 | 否 | 比对状态<br/>1 - 比对中<br/>2 - 比对成功<br/>3 - 比对失败 |
| | failMessage | | | string | 否 | 失败原因 |
| | compareResult | | | object | 否 | 比对结果 |
| |  | differenceCount | | object | 否 | 比对差异数量 |
| | |  | total | int32 | 否 | 总数 |
| | | | add | int32 | 否 | 新增数量 |
| | | | replace | int32 | 否 | 替换数量 |
| | | | delete | int32 | 否 | 删除数量 |
| | | details | | array | 否 | 比对详情 |
| | |  | originalWords | string | 否 | 对照内容值（标准文件内容） |
| | | | compareWords | string | 否 | 比对内容值（比对文件内容） |
| | | | type | int32 | 否 | 类型<br/>1 - 删除<br/>2 - 新增<br/>4 - 替换 |


### 请求示例
```json
{
    "contractCompareBizId": "e819098fcc****f373b67ee7e3"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "status": 2,
        "failMessage": null,
        "compareResult": {
            "differenceCount": {
                "total": 2,
                "add": 0,
                "replace": 2,
                "delete": 0
            },
            "details": [
                {
                    "originalWords": "3",
                    "compareWords": "5",
                    "type": 4
                },
                {
                    "originalWords": "3",
                    "compareWords": "5",
                    "type": 4
                }
            ]
        }
    }
}
```

