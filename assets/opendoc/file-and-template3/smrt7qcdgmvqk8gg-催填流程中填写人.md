### 接口描述
向当前轮到填写但还未填写的填写人发送催填提醒, 支持指定填写人发送催填提醒。 提醒内容如下：

:::warning
【e签宝】Dear XXX，天谷测试有限公司 给您发送合同《发送的流程任务主题》，请点击 smlt.esign.cn/PZsD1SR 进行填写。

:::

:::info
**<font style="color:#E8323C;">【注意事项】</font>**

+ 发起填写之后的前半小时不可进行催填；
+ 与上一次催填，请至少间隔十分钟再发起下一次催填提醒。

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/urge-filling

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **<font style="color:black;">参数名称</font>** | | **<font style="color:black;">参数类型</font>** | **<font style="color:black;">必选</font>** | **参数位置** | **<font style="color:black;">参数说明</font>** |
| --- | --- | --- | :---: | :---: | --- |
| signFlowId | | string | 是 | path | 填写流程ID |
| urgedOperator<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | object | 否 | body | 指定被催填的填写人<br/><font style="color:#E8323C;">按被催填人的账号或账号ID方式（二选一，根据发起填写时传入方式决定）</font> |
|  | psnAccount | string | 否 | body | 被催填人账号标识（手机号/邮箱）<br/><font style="color:#E8323C;">为空表示：催填当前轮到填写但还未填写的所有填写人</font> |
| | psnId | string | 否 | body | 被催填人账号ID，<br/><font style="color:#E8323C;">为空表示：催填当前轮到填写但还未填写的所有填写人</font> |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data | | | | | object | 否 | 业务数据 |


### 请求示例
```json
POST https://openapi.esign.cn/v3/sign-flow/b2cb7**3cc54/urge-filling
{
	"urgedOperator": {
		"psnAccount": "183****0101"
	}
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





