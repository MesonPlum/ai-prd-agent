### 接口描述
当签署流程中有用印审批流程触发后，可以通过审批流程ID获取当前审批人待审批的页面链接。

:::warning
**<font style="color:#DF2A3F;">仅支持以下两种场景：</font>**

1、当前应用（appId）通过接口发起的签署流程；

2、当前应用所属的SaaS企业在e签宝官网发起的签署流程。

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/approval/approval-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | :---: | :---: | :---: | --- |
| approvalFlowId | | string | 是 | body | 审批流程ID<font style="color:#DF2A3F;">（通过</font>[【回调通知】](https://qianxiaoxia.yuque.com/opendoc/notify3/tr6cur0c658inqu0)<font style="color:#DF2A3F;">或者</font>[【查询签署流程详情】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xxk4q6)<font style="color:#DF2A3F;">接口获取）</font><br/><font style="color:#DF2A3F;">补充说明：</font><br/>需要提前让盖章主体公司对调用方企业应用ID做授权后才可以使用该接口（调用[【获取机构认证&授权页面链接】](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/kcbdu7)接口，授权添加 **org_approval_info **或 **manage_org_resource**权限范围）。 |
| approverPsnId | | string | 是 | body | 审批人个人用户账号ID<font style="color:#DF2A3F;">（可通过</font>[【回调通知】](https://qianxiaoxia.yuque.com/opendoc/notify3/tr6cur0c658inqu0)<font style="color:#DF2A3F;">或者</font>[【查询审批流程详情】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/sdy3p3ri3825u1xy)<font style="color:#DF2A3F;">接口获取）</font> |
| needLogin | | boolean | 否 | body | 链接是否需要登录打开，默认 **true**<br/>**true - **需要登录<br/>**false** - 不需要登录 |
| clientType | | string | 否 | body | 指定客户端类型，默认 **ALL**<br/>**H5 **- 移动端适配<br/>**PC **- PC端适配<br/>**ALL **- 自动适配移动端或PC端<font style="color:#E8323C;">（默认值）</font><br/><font style="color:#E8323C;">【注】参数值均为大写的英文</font> |
| redirectConfig<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | object | 否 | body | 重定向配置项 |
| | redirectUrl | string | 否 | body | 重定向地址（需符合 https /http 协议地址） |
| | redirectDelayTime | int | 否 | body | 操作完成重定向跳转延迟时间，单位秒<font style="color:#E8323C;">（可选值0、3，默认值为 3）</font><br/>+ 传**0**时，签署完成直接跳转重定向地址；<br/>+ 传**3**时，展示签署完成结果页，倒计时3秒后，自动跳转重定向地址。<br/><font style="color:#E8323C;">【注】当redirectUrl不传的情况下，该字段无需传入，审批完成不跳转</font> |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | approvalTaskId | | | | string | 否 | 审批任务ID |
| | approvalShortUrl | | | | string | 否 | 审批短链接<font style="color:#E8323C;">（有效期90天）</font> |
| | approvalUrl | | | | string | 否 | 审批长链接<font style="color:#E8323C;">（永久有效）</font><br/><font style="color:#E8323C;">【注】支持自定义域名，微信小程序H5内嵌场景需要使用长链接</font> |


### 请求示例
```json
{
  "approvalFlowId":"AF-2cb6a1118080ebb",
  "approverPsnId":"7ffcaed8c11116c3aaca1d8f0ef0a8f6",
  "clientType": "ALL",
  "needLogin": false,
   "redirectConfig": {
        "redirectUrl": "https://open.esign.cn"
    }
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "approvalShortUrl": "https://smlt.esign.cn/FLQ2zkK",
        "approvalUrl": "https://smlh5.esign.cn/contract-flow/approval/seals?context=RMJ7pD2&approvalId=AF-2cb6a111180ebb&tsign_source_type=SIGN_LINK_WUKONG&tsign_source_detail=16R2mv%2F27h2Y5CkM9bwhboJI1J3vlJRfZSWcIsoCQiZlor%2FBjDAHDYjqRou4NZ2cLUfzqDWDgY3qEadxIkmYQRtK5oSH1Fean2CIzLt27bfs9kMW%2FCby%2Bxrv4oSFKYdjEi8pJX5Rly74d5dZPp3folV9Fwz78F%2F6b0wDdq%2BOAn9EEG%2BTQ6UFRmUlXzY0Ac4T%2FYX6tF6VYIS0XH7AvzeQiNFQBfTEghDKeYx0%2B9k5amg4%3D",
        "approvalTaskId": "c8003557-c0e3-11ee-8111-fea8a8dd3076"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)



