### 接口描述
通过签署流程编号获取已推送到蚂蚁区块链的存证信息，如文件哈希值、蚂蚁区块链统一证据编号和上链编号等。

:::info
+ 当签署流程中的全部文件完成签署，且签署流程完结后，e签宝会将文件哈希值推送至蚂蚁区块链。
+ 文件哈希值及相关数据被推送至蚂蚁区块链之后，可以有效防止数据被篡改，以保证证据链的可信度。

:::

**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/antchain-file-info

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;"></font>** |
| --- | :---: | :---: | :---: | --- |
| signFlowId | string | 是 | body | 已完成状态的签署流程ID |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。  |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data | | | | | object | 否 | 业务数据 |
|  | antchainFiles | | | | array | 否 | 上链文件信息（流程中存在多个签署文件时，返回数组格式的多笔数据） |
| |  | fileId | | | string | 否 | 签署流程中的文件ID |
| | | fileHash | | | string | 否 | 文件SHA256哈希值<br/>+ 每份签署文件对应一个唯一的哈希值（不可解密）；<br/>+ 请开发者妥善保存，以便用于[【核验区块链存证文件】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/benz09)； |
| | | antTransactionId | | | string | 否 | 签署流程存证上链编号<br/>+ 每个签署流程ID对应一个唯一的上链编号； |
| | | antTxHash | | | string | 否 | 区块链统一证据编号<br/>+ 每份签署文件对应一个唯一的证据编号；<br/>+ 请开发者妥善保存，以便用于[【核验区块链存证文件】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/benz09) |
| | | pushTime | | | string | 否 | 签署流程推送蚂蚁区块链时间（毫秒级Unix时间戳） |


### 请求示例
```json
{
  "signFlowId": "xxx",
}
```

### 响应示例
```json
{
    "message": "成功",
    "code": 0,
    "data": {
        "antchainFiles": [
            {
                "fileId": "02c73e01ae11116d8bc63d3ef1ea",
                "fileHash": "65f1a95ac3fb358b0af11118a2d6450e02e002d0448329250861d5fc81645f8",
                "antTransactionId": "9146d270-8fa0-1111-bb26-15d6d2670997",
                "antTxHash": "e9012b6ad90c4cc6416611111fe68ba1e19be5ed9c44da96c569566e57",
                "pushTime": 1729127948780
            },
            {
                "fileId": "616f4551645046c1b11118a3a9133ef5",
                "fileHash": "e4243c5b71c4e123d40111112786072f32c081e6a0aff45c205cf6d70ed74527",
                "antTransactionId": "9146d270-8fa0-1111-bb26-15d6d2670997",
                "antTxHash": "745fde816bbe7a6146431e111112039f5f858ea3988c354f7b6cc77884e94f8",
                "pushTime": 1729127948780
            }
        ]
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)

