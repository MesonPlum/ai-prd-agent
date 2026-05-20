### 接口描述
用于获取合同比对的结果页面，页面效果如下：

（左侧为标准文件，右侧为比对文件，两边不一样的地方会被圈出来）

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1678950219830-9687205c-edbf-4dc9-9c99-6dc57bca1879.png)

:::warning
**<font style="color:#E8323C;">注意事项：</font>**

+ <font style="color:#DF2A3F;">发起该接口需要计费一次：身份核验认证服务的子服务项-合同比对。</font>
+ 文件比对前，需要先将标准文件和比对文件分别在e签宝进行上传，获取文件ID。
+ 文件上传接口：[上传本地文件](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256)；接口使用说明：[接口调用Postman图解](https://open.esign.cn/doc/opendoc/case3/hxzn88wydyft769i#OcO5C)

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)<font style="color:rgb(0, 0, 0);">/v3/</font><font style="color:rgb(64, 64, 64);">contract-compare-url</font>

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | | | **参数**<br/>**类型** | **必选** | **参数**<br/>**位置** | **参数说明**<br/>**<font style="color:#F5222D;">（左右拖动查看完整描述）</font>** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| standardFileId | | | | string | 是 | body | 标准文件ID<br/>+ <font style="color:#DF2A3F;">文件支持：pdf，单个文件不超过30M</font><br/>+ <font style="color:#DF2A3F;">建议比对前查询下文件上传状态：</font>[查询文件上传状态](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/qz4aip) |
| comparativeFileId | | | | string | 是 | body | 比对文件ID<br/>+ <font style="color:#DF2A3F;">文件支持：pdf，单个文件不超过30M</font><br/>+ <font style="color:#DF2A3F;">建议比对前查询下文件上传状态：</font>[查询文件上传状态](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/qz4aip) |
| filterPageHeaderFooter | | | | boolean | 否 | body | 是否忽略页眉页脚进行比对，默认：false<br/>**false** - 不忽略<br/>**true** - 忽略<br/><font style="color:#DF2A3F;">注意：若两份文件此前已比对过，再次使用原文件ID进行比对将直接调用缓存结果，当前参数可能无法生效。如需重新应用参数，请上传文件获取新的文件ID后再进行比对。</font> |
| filterSymbols | | | | list | 否 | body | 合同比对时需要忽略的标点符号，默认：不忽略标点符号   案例：如需要忽略中文逗号和句号后进行比对，需要传值："filterSymbols":["，","。"]<br/><font style="color:#DF2A3F;">注意：若两份文件此前已比对过，再次使用原文件ID进行比对将直接调用缓存结果，当前参数可能无法生效。如需重新应用参数，请上传文件获取新的文件ID后再进行比对。</font> |


### 响应参数
| **<font style="color:black;">参数名称</font>** | | | **<font style="color:black;">参数</font>**<br/>**<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>** |
| --- | --- | --- | --- | --- | --- |
| code | | | int32 | 是 | 业务码，0表示成功 |
| message | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message</font><br/><font style="color:#F5222D;"> 匹配，因为 message 可能会调整。</font> |
| data | | | object | 否 | 业务数据 |
| | contractCompareUrl | | string | 否 | 合同比对页面地址<br/><font style="color:#DF2A3F;">注：</font><br/>+ <font style="color:#DF2A3F;">相同文件入参返回的url每次都变更</font><br/>+ <font style="color:#DF2A3F;">有效期五分钟</font> |
| | contractCompareBizId | | string | 否 | 合同比对业务ID<br/><font style="color:#DF2A3F;">注：相同文件入参返回的ID保持不变</font> |


### 请求示例
```json
{
    "standardFileId": "f6714063*****89d51f",
    "comparativeFileId": "35f7******04856a"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "contractCompareUrl": "https://smlt.esign.cn/67J3***Iw",
        "contractCompareBizId": "9f7d61c9e******bc018f16"
    }
}
```

