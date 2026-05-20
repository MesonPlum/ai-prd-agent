### 接口描述
已发起的签署流程，延长签署流程中设置的签署截止时间。

:::warning
**<font style="color:#F5222D;">注意事项：</font>**

+ 签署截止时间仅限往后延期<font style="color:#DF2A3F;">一次</font>；
+ <font style="color:#F5222D;">新的签署截止时间</font>可在<font style="color:#F5222D;">当前接口调用时间</font>的基础上最多延长90天，而不是从原流程的截止时间往后算。
+ <font style="color:#F5222D;">新的签署截止时间</font>不可提前于流程中<font style="color:#F5222D;">原设置的签署截止时间</font>。
+ 自<font style="color:#F5222D;">2023年6月30日</font>起支持对<font style="color:#F5222D;">已过期</font>的流程进行延期，流程只能延期<font style="color:#F5222D;">一次</font>（之前延期过就不能延期了）。

流程中原设置的签署截止时间请参照[【基于文件发起签署】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/su5g42)中设置的signFlowExpireTime。

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/delay

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **<font style="color:black;">参数名称</font>** | | **<font style="color:black;">参数类型</font>** | **<font style="color:black;">必选</font>** | **参数位置** | **<font style="color:black;">参数说明</font>** |
| --- | --- | --- | :---: | :---: | --- |
| signFlowId | | string | 是 | path | 签署流程ID |
| signFlowExpireTime | | int64 | 是 | body | <font style="color:rgb(34, 34, 34);">新的签署截止时间</font><font style="color:#F5222D;">（unix时间戳格式，单位：毫秒）</font> |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message</font><br/><font style="color:#F5222D;"> 匹配，因为 message 可能会调整。</font> |
| data | | | | | object | 否 | 业务数据 |


### 请求示例
```json
POST  https://openapi.esign.cn/v3/sign-flow/0b7e490****c10bb1/delay
{
	"signFlowExpireTime": 1654849671000
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": null
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)

