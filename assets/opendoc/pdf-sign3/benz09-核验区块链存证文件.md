### 接口描述
核验当前已签署合同PDF文件信息与蚂蚁区块链上已存证信息是否一致。

**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/antchain-file-info/verify

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明****** |
| --- | :---: | :---: | :---: | --- |
| fileHash | string | 是 | body | 文件SHA256哈希值 <br/>+ 可由开发者自行计算文件SHA256哈希值。<br/>+ 可通过[【获取区块链存证信息】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/ugtag2)接口获取文件SHA256哈希值。 |
| antTxHash | string | 是 | body | 区块链统一证据编号<br/>+ 每份签署文件对应一个唯一的证据编号；<br/>+ 可通过[【获取区块链存证信息】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/ugtag2)接口获取。 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data | | | | | object | 否 | 业务数据 |
| | fileHash | | | | string | 是 | 文件SHA256哈希值 |
| | antTxHash | | | | string | 是 | 蚂蚁区块链统一证据编号 |
| | verifyResult | | | | boolean | 是 | 查验结果<br/>**true **- 核验成功<br/>**false **- 核验失败 |
| | errorCode | | | | int64 | 是 | 核验错误码<br/>**0 - **errorMessage为null（**核验成功**）<br/>**2302 **- Check failed, inconsistent content（核验数据比对不一致）<br/>**2303 **- Permission error（无核验权限）<br/>**2304 **- Invalid Base64 Data（非法的Base64数据）<br/>**3001 **- Notary Type Error（不存在的存证类型）<br/>**3008 **- Notary Not Found（未找到指定存证） |
| | errorMessage | | | | string | 是 | 对应错误信息<br/>**0 - **errorMessage为null（**核验成功**）<br/>**2302 **- Check failed, inconsistent content（核验数据比对不一致）<br/>**2303 **- Permission error（无核验权限）<br/>**2304 **- Invalid Base64 Data（非法的Base64数据）<br/>**3001 **- Notary Type Error（不存在的存证类型）<br/>**3008 **- Notary Not Found（未找到指定存证） |
| | notaryTime | | | | int64 | 是 | 蚂蚁区块链存证时间（Unix时间戳格式，单位：毫秒） |
| | notaryType | | | | string | 是 | 存证类型<br/>固定值：**FileNotary**（文件存证） |
| | notaryPhase | | | | string | 是 | 存证阶段，默认为空 |
| | blockHeight | | | | int64 | 是 | 区块高度（当前存储区块在区块链的位置） |
| | antTransactionId | | | | string | 是 | 当前流程的签署文件上链事务的唯一标识 |


### 请求示例
```json
{
    "fileHash":"bcdc3c***0477",
    "antTxHash":"11111111222222226c***fd1ed2f4"
}
```

### 响应示例
```json
{
    "success": true,
    "message": "执行成功",
    "code": 0,
    "data": {
        "fileHash": "bcdc3c***0477",
        "blockHeight": 36047469,
        "errorCode": 0,
        "errorMessage": null,
        "notaryTime": 1625068800000,
        "notaryType": "FileNotary",
        "notaryPhase": null,
        "verifyResult": true,
        "antTransactionId": "dfd7d1dcad6fc9ae5551b6af54ceff4d",
        "antTxHash": "11111111222222226c***fd1ed2f4"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)

