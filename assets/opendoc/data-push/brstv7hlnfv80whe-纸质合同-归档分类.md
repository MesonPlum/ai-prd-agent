### 接口描述
该接口支持将开发者平台线下签署的纸质合同上传到e签宝后，归档分类到e签宝SaaS官网进行合同管理。

:::warning
**<font style="color:#E8323C;">注意事项：</font>**

+ **<font style="color:#E8323C;">调用该接口之前必须先调用上传本地文件的两个接口：</font>**

**1：获取文件上传地址**[（点击跳转）](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256#e0adY)

先获取到服务端的上传地址`**<font style="color:#FA8C16;background-color:#E9E9E9;">fileUploadUrl</font>**`和文件`**<font style="color:#FA8C16;background-color:#E9E9E9;">fileId</font>**`

**2：上传文件流**[（点击跳转）](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256#S0BEC)

再将文件流上传至`**<font style="color:#FA8C16;background-color:#E9E9E9;">fileUploadUrl</font>**`

+ **<font style="color:#DF2A3F;">该接口的文件格式和大小要求：</font>**

**<font style="color:#DF2A3F;">支持格式pdf、png、jpg、jpeg、doc、docx；单份文件最大30M</font>**

:::

### 接口地址&请求方法
> <font style="color:#333333;">点击下述蓝色字体{host}可跳转至API请求域名说明文档</font>
>

接口地址：https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/contracts/paper-file-upload

<font style="color:#333333;">请求方法：POST</font>

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | :---: | :---: | :---: | --- |
| fileId | | string | 是 | body | <font style="color:rgb(64, 64, 64);">文件ID（已经成功上传至e签宝服务端的</font><font style="color:#333333;">fileId</font><font style="color:rgb(64, 64, 64);">）</font><br/><font style="color:#F5222D;">补充说明：</font><br/>+ 调用该接口之前必须先成功调用上传本地文件接口（[点击跳转 上传本地文件](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256)），并确保文件已经上传完成<br/>+ 必须是当前企业当前应用appId上传的文件ID<br/>+ 一次调用只能归档分类一份文件，多份文件需要逐一上传获取<font style="color:rgb(64, 64, 64);">文件ID，</font>多次调用 |
| contractGroupId | | string | 是 | body | 企业合同归档文件夹ID<br/><font style="color:#F5222D;">补充说明：</font><br/>+ 通过[e签宝SaaS官网](https://www.esign.cn/)进行设置和复制文件夹ID：登录官网企业空间首页-<font style="color:rgb(38, 38, 38);">合同管理-企业合同-</font>已归档合同中新建分类-详情中复制分类ID<br/>+ 归档文件夹ID<font style="color:rgb(38, 38, 38);">必须在合同发起方的e签宝官网企业空间下建立</font> |
| contractName | | string | 是 | body | 合同名称（不能超过50个字符）<br/><font style="color:#DF2A3F;">【注】合同名称不允许传入换行、缩进、表情及特殊字符 < > / \\ | : \ " * ?</font> |
| <font style="color:rgb(64, 64, 64);">contractBizTypeId</font> | | string | 否 | body | 合同类型ID<br/><font style="color:#F5222D;">补充说明：</font><br/>+ 通过[e签宝SaaS官网](https://www.esign.cn/)进行设置和复制ID：登录官网企业空间首页-<font style="color:rgb(38, 38, 38);">合同管理-智能台账-合同类型中设置（</font>[点击这里](https://help.esign.cn/detail?id=si03iqzsd4rcsl14&nameSpace=cs3-dept%2Fexboae)<font style="color:rgb(38, 38, 38);">了解更多智能台账功能）</font><br/>+ <font style="color:rgb(38, 38, 38);">合同类型ID必须在合同发起方的e签宝官网企业空间下建立</font> |
| contractNum | | string | 否 | body | 合同编号（不能超过50个字符）<br/><font style="color:#DF2A3F;">【注】只能传入字母、数字、横杠-和下划线_</font> |
| contractExpiryDate | | string | 否 | body | 合同到期时间<br/><font style="color:#DF2A3F;">【注】需要按照yyyy-MM-dd的格式传入</font> |
| signers | | array | 否 | body | 签署方信息 |
|  | orgName | string | 否 | body | 企业签署方名称（不能超过100个字符）<br/><font style="color:#F5222D;">补充说明：</font><br/>+ 若传入此参数，则认为是企业签署方，不传则认为是个人签署方<br/>+ 若传入此参数，则下方企业经办人姓名和联系方式都必须传入 |
| | psnName | string | 否 | body | 个人签署方姓名/企业签署方经办人姓名（不能超过50个字符）<br/><font style="color:#DF2A3F;">【注】如传入此参数，则下方个人联系方式必须传入</font> |
| | psnAccount | string | 否 | body | 个人签署方联系方式/企业签署方经办人联系方式<br/><font style="color:#DF2A3F;">【注】需符合大陆手机号或邮箱格式</font> |


### 响应参数
| **<font style="color:black;">参数名称</font>** | | **<font style="color:black;">参数类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>** |
| --- | --- | :---: | :---: | --- |
| code | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | object | 否 | 业务数据 |
|  | <font style="color:#333333;">fileId</font> | string | 否 | <font style="color:#333333;">文件ID</font>（跟入参里的fileId是同一个文件ID） |
| | contractBizId | string | 否 | <font style="color:rgb(64, 64, 64);">纸质合同业务ID （每个fileId产生的</font><font style="color:#333333;">contractBizId不同）</font><br/><font style="color:#DF2A3F;">【注】业务ID可以标识本次调用唯一性，无其他业务用途</font> |


### 请求示例
```json
{
    "fileId": "19541dcb71******5364c4f1299",
    "contractGroupId": "2d265008b*******883ee9e",
    "contractName":"合同名称1030",
    "contractNum":"jilin00001",
    "contractBizTypeId":"13997af*****b80eb11"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "fileId": "19541dc******64c4f1299",
        "contractBizId": "ee50342d******78e284284"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
| **code 错误码** | **message 错误信息** |
| --- | --- |
| 30802001 | 当前应用下不存在此fileId |
| 30802002 | 系统错误，请稍后重试 |
| 30802003 | 该文件未上传完成，请稍后重试 |
| 30802004 | 文件格式不符合要求：%s |
| 30802005 | 文件大小不能超过%sM |
| 30802006 | 该文件已经上传过，请勿重复上传 |
| 30802007 | contractGroupId：%s不属于当前企业 |
| 30802008 | contractBizTypeId：%s不属于当前企业 |
| 10000001 | 合同类型不存在或已删除 |
| 31300001 | 合同名称不能为空 |
| 31300001 | 归档文件夹id不能为空 |
| 31300001 | 文件id不能为空 |
| 31300001 | 个人签署方名称不能为空 |
| 31300001 | 个人签署方联系方式不能为空 |
| 31300001 | 参数错误：合同名称不能超过50位 |
| 31300001 | 参数错误：合同编号不能超过50位 |
| 31300001 | 参数错误：企业签署方名称不能超过100位 |
| 31300001 | 参数错误：个人签署方名称不能超过50位 |
| 31300001 | 参数错误：contractExpiryDate格式不符合要求 |
| 31300001 | 参数错误：psnAccount需符合大陆手机号和邮箱格式 |
| 31300001 | 参数错误：合同编号只能传入字母、数字、横杠-和下划线_ |
| 31300001 | 参数错误：合同名称不支持特殊字符 |


