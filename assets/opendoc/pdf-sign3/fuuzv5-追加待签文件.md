### 接口描述
调用此接口可以向草稿状态的签署流程中追加待签署文件<font style="color:#E8323C;">（仅限流程开启之前允许追加）</font>。

:::info
**<font style="color:#E8323C;">注意事项：</font>**

（1）<font style="color:#E8323C;">已开启</font>或<font style="color:#E8323C;">自动开启</font>的签署流程不允许追加待签文件，即发起签署时`autoStart`参数值为 true（自动开启）。

（2）本地文件需先经过[【上传本地文件】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256)至e签宝服务端，或通过[【填写模板生成文件】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/mv8a3i)/[【获取填写合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ub4ncy)制作填充的文件才可被添加到签署流程中。

（3）文件名称不可以含有以下9个特殊字符：/ \ : * " < > | ？以及所有emoji表情。

（4）单个签署流程中对签署文件要求如下：

4.1 单个签署流程中所添加的文件大小总和不要超过 500 MB。

4.2 单个签署流程中所添加的文件个数不超过50个。

4.3 单个文件大小不要超过 20 MB。

4.4 单个文件内单页大小不要超过 9 MB。文件内含图片时，需特别关注单页大小。

（5）追加的待签署文件，也将会按计费规则扣除合同份额。

（6）此接口所追加的文件需要签署方签章，若仅需签署方阅读而不签章，建议以附属材料形式添加，详见[【追加附属材料】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/huo44q)。

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/unsigned-files

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **<font style="color:black;">参数名称</font>** | | **<font style="color:black;">参数类型</font>** | **<font style="color:black;">必选</font>** | **参数位置** | **<font style="color:black;">参数说明</font>** |
| --- | --- | --- | :---: | :---: | --- |
| signFlowId | | string | 是 | path | 签署流程ID  |
| unsignedFiles<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | array | 是 | body | 追加待签署文件列表 |
| | fileId | string | 是 | body | 待签署文件ID |
| | fileName | string | 否 | body | <font style="color:#333333;">待签署文件名称（含扩展名，如合同.pdf）</font><br/><font style="color:#F5222D;">补充说明：</font><br/>（1）文件名称必须包含文件扩展名，否则后续发起签署时无法通过校验。<br/>（2）文件扩展名必须与实际文件类型一致，否则后续签署会出现异常。例如：<br/>实际文件类型是PDF，请填写XX.pdf而不是xx.docx。<br/>（3）文件名称不支持以下9个字符： / \ : * " < > | ? |
| | <font style="color:rgb(34, 34, 34);">neededPwd</font> | int32 | 否 | body | 是否需要密码<br/>0 - 不需要，1 - 需要，默认值为0<br/>[查看PDF编辑密码描述](https://qianxiaoxia.yuque.com/docs/share/1ee37430-b61f-4a6d-b1b2-40cbb32eecab)   <font style="color:#F5222D;">补充说明：</font><br/>（1）设置编辑密码的PDF文件需要输入密码才有权限进行盖章操作。<br/>（2）neededPwd填写1时，同时需要向<font style="color:rgb(34, 34, 34);">fileEditPwd</font>参数填写编辑密码。<br/>（3）支持自动盖章场景。<br/>（4）不支持手动盖章场景。 |
| | <font style="color:rgb(34, 34, 34);">fileEditPwd</font> | string | 否 | body | 文档编辑密码<br/>当<font style="color:rgb(34, 34, 34);">neededPwd</font>值为1时, <font style="color:rgb(34, 34, 34);">fileEditPwd</font>值必须填写。<br/>当<font style="color:rgb(34, 34, 34);">neededPwd</font>值为0时, <font style="color:rgb(34, 34, 34);">fileEditPwd</font>值允许为空。 |
| | contractBizTypeId | string | 否 | body | 合同类型ID<br/><font style="color:#F5222D;">补充说明：</font><br/>+ 通过[e签宝SaaS官网](https://www.esign.cn/)进行设置和复制ID：登录官网企业空间首页-<font style="color:rgb(38, 38, 38);">合同管理-智能台账-合同类型中设置（</font>[点击这里](https://help.esign.cn/detail?id=si03iqzsd4rcsl14&nameSpace=cs3-dept%2Fexboae)<font style="color:rgb(38, 38, 38);">了解更多智能台账功能）</font><br/>+ <font style="color:rgb(38, 38, 38);">合同类型ID必须在合同发起方的e签宝官网企业空间下建立</font> |
| | order | int | 否 | body | 文件在签署页面的展示顺序<br/>+ 按序展示时支持传入顺序值：**1 - 50（**值越小越靠前**）** |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data | | | | | object | 否 | 业务数据 |


### 请求示例
```json
POST https://openapi.esign.cn/v3/sign-flow/0b7e49**dfbc10bb1/unsigned-files
{
  "unsignedFiles": [
    {
      "fileId": "ea3151a8d***a53d3f4c",
      "fileName": "入职证明.pdf"
    }
  ]
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

