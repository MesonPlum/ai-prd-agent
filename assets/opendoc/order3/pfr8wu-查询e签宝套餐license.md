### 接口描述
用于查询企业已购买的单方用印版套餐详情，“license”可用于签署时的计费凭证。

:::info
**<font style="color:#E8323C;">【电子签名服务(单方用印版)】</font>**

 适用于签署通知公文/电子收据类文件，平台用户使用其企业的印章，由系统自动完成印章加盖的操作，不包含任何认证服务。

:::

+ [点击这里](https://qianxiaoxia.yuque.com/books/share/215f4333-0181-4a73-a3af-ccc8bbceaba2/zxsab6)进入《企业单方自动签署》API文档。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v1/mix/license/query

**请求方法：**POST

### 请求头
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **类型** | **参数类型** | **必选** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| orgOid | string | body | 是 | 机构账号ID，即购买套餐的机构账号orgId |
| page | int32 | body | 否 | 页码，默认1 |
| pageSize | int32 | body | 否 | 每页数量，默认20（最大100） |


### 响应参数
| **参数名称** | | | **类型** | **必选** | **参数说明** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int | 是 | 业务码，0表示成功 |
| message | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | object | 否 | 业务数据 |
|  | total | | string | 否 | 总数 |
| | list<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | array | 否 | 当前页数据列表 |
| |  | oid | string | 否 | 机构账号ID，即购买套餐的机构账号orgId |
| | | license | string | 否 | 套餐license（计费凭证） |
| | | startTime | int64 | 否 | license生效时间（Unix时间戳，单位毫秒） |
| | | endTime | int64 | 否 | license失效时间（Unix时间戳，单位毫秒） |


### 请求示例
```http
{
  "orgOid":"xxx",
  "page":"1",
  "pageSize":"20"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "list": [
            {
                "oid": "xxx",
                "license": "1U9NAxxx3H1",
                "startTime": 1648483200000,
                "endTime": 1680191999000
            }
        ],
        "total": 1
    }
}
```

