### 接口描述
通过signFlowId（签署流程ID ）获取用户的合同拟定页面链接

### 接口地址&请求方法
> <font style="color:#333333;">点击下述蓝色字体{host}可跳转至API请求域名说明文档</font>
>

**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/draft-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | :---: | :---: | :---: | --- |
| signFlowId | | string | 是 | path | 签署流程ID  |
| operator | | object | 是 | body | 填写操作人（个人填写方本人为操作人，机构填写方经办人为操作人） |
|  | psnId | string | 否 | body | 填写人账号ID（和psnAccount二选一进行使用，同时传优先取psnId） |
| | psnAccount | string | 否 | body    | 填写人账号，手机号或邮箱（和psnId二选一进行使用，同时传优先取psnId） |
| needLogin | | boolean | 否 | body | 是否需要登录打开填写链接（默认值 **true**）<br/>**true **- 需登录打开链接<br/>**false **- 免登录<br/><font style="color:#DF2A3F;">【注】：免登录获取的填写链接默认30分钟有效，过期后可以重新调用接口获取新的链接。</font> |
| urlType | | int32 | 否 | body | 填写链接类型（默认值 **2**）<br/>**1** - 预览链接<br/>**2 **- 填写链接<br/><font style="color:#DF2A3F;">【注】：预览链接可以查看用户填写中或填写完成的文件详情，方便业务场景中的审批等环节（操作人-operator必须是流程中的参与方）。</font> |
| clientType | | string | 否 | body    | 指定客户端类型，默认值 **ALL**<br/>**ALL** - 自动适配移动端或PC端<br/>**H5** - 移动端适配<br/>**PC** - PC端适配<br/><font style="color:#DF2A3F;">【注】：微信小程序使用场景需要指定：H5</font> |
| redirectConfig | | object | 否 | body | 重定向配置项 |
|  | redirectUrl | string | 否 | body | 重定向地址 |
| | redirectDelayTime | int | 否 | body | 操作完成后页面重定向跳转延迟时间，单位为秒，默认3秒。<br/>0-不展示填写完成结果页，填写完成直接跳转重定向地址。<br/>X-展示填写完成结果页，倒计时X秒后，自动跳转重定向地址<br/><font style="color:#DF2A3F;">补充说明：</font><br/>+ 当redirectUrl不传的情况下，该字段无需传入，默认填写完成结果页不跳转。<br/>+ 没有传入redirectUrl但传入redirectDelayTime接口会报错。 |


### 响应参数
| **参数名称** | | **参数类型** | **必选** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| code | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | object | 否 | 业务数据 |
|  | draftUrl | string | 否 | 长链地址（需要登录长链接永久有效，免登录链接<font style="color:#DF2A3F;">30分钟</font>有效）<br/><font style="color:#DF2A3F;">【注】小程序H5内嵌场景需要使用长链接，支持自定义域名（需要指定clientType=H5 时才会返回自定义域名填写链接），</font>[详见小程序域名配置说明](https://open.esign.cn/doc/opendoc/dev-guide3/oyzxrr) |
| | draftShortUrl | string | 否 | 短链地址（需要登录短链接<font style="color:#DF2A3F;">30天</font>有效，免登录链接<font style="color:#DF2A3F;">30分钟</font>有效） |


### 请求示例
```json
{
    "operator": {
        "psnAccount": "138****8888"
    },
    "needLogin": false,
    "urlType": 2,
    "clientType": "ALL",
    "redirectConfig": {
        "redirectUrl": "http://esign.cn",
        "redirectDelayTime": 3
    }
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "draftUrl": "https://smlfront.esign.cn:8880/documents/guide?cooperationId=1b2110c4****0496de90a3e8&context=HS4OFcfR2rK3kw1axwdG7jbOT9IHDRdE%2BUp%2F1QbLp6Sz%2BJDagzqfZmlASoxfjM9eDG%2Fl3ZOot66mad52IlAvHPx03gLXcmKvwjv57m6MRcqIf4xQBP%2BUrtMrZlT40xJKiyNUuDiGPqHoae92hHeA7g%3D%3D&processId=a6a1eaa77f****b5ad481c2",
        "draftShortUrl": "https://smlt.esign.cn/K5X****ZS"
    }
}
```

