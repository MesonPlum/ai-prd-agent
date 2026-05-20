### 接口描述
获取企业 [用户授权](https://open.esign.cn/doc/opendoc/auth3/kcbdu7) 后，可以获取对应企业的模板创建页面**<font style="color:#DF2A3F;">（应用ID所属的平台自身企业无需做授权）</font>**，该接口获取的流程模板制作链接参考图如下：

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1716774152914-88c90b1c-5e3b-47a0-820a-7f76e34f8382.png)

### 接口地址&请求方法
> <font style="color:#333333;">点击下述蓝色字体{host}可跳转至API请求域名说明文档</font>
>

**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-templates/sign-template-create-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | --- | --- | :---: | :---: | :---: | --- |
| orgId | | | | string | 是 | body | 机构账号ID <br/><font style="color:#E8323C;">【注】用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用</font>[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)<font style="color:#E8323C;">接口通过组织机构名称/组织机构证件号进行查询</font> |
| transactorPsnId | | | | string | 是 | body | 经办人账号ID<br/><font style="color:#E8323C;">【注】通过</font> [【查询企业成员列表】](https://qianxiaoxia.yuque.com/opendoc/employee/bzrzic) <font style="color:#E8323C;">查询企业成员的账号ID（psnId），经办人必须有模板操作权限，建议直接使用管理员账号</font> |
| redirectUrl | | | | string | 是 | body | 创建完成后重定向地址 （最长1024字符）<br/><font style="color:#DF2A3F;">【注】开发者需要在重定向地址上获取拼接的流程模板ID（signTemplateId）</font> |
| hiddenOriginComponents | | | | boolean | 否 | body | 是否隐藏原始控件，默认false<br/>true-隐藏<br/>false-不隐藏 |
| customComponentGroups | | | | list | 否 | body | 要展示的自定义控件组ID列表<br/>自定义控件组请使用接口：[【创建控件组】](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/crxfb1zzefbt5166) |
| customComponents | | | | list | 否 | body | 要展示的自定义控件ID列表<br/>自定义控件请使用接口：[【创建自定义业务控件】](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/gwthhipyuv3y7kry) |
| customBizNum | | | | string | 否 | body | 自定义业务编号<br/>用于标识自身业务与模板对应关系，在回调通知：[《流程模板创建完成通知》](https://qianxiaoxia.yuque.com/opendoc/notify3/wtfka4flb5570t9b)里原样返回 |
| uneditableFields | | | | list | 否 | body | 禁止用户在页面上修改或追加的内容<br/>+ **docs** - 待签文件（隐藏添加、替换、删除签署文件按钮）<br/>+ **participants** - 参与方（隐藏签署方区域的签署方名称编辑按钮、添加企业和添加个人按钮以及删除按钮、顺序设置按钮）<br/><font style="color:#DF2A3F;">【注】禁止页面修改的前提是接口传入对应内容</font><br/>+ <font style="color:#DF2A3F;">docs - 待签文件对应以下fileIds字段</font><br/>+ <font style="color:#DF2A3F;">participants - 参与方对应以下participants字段</font> |
| fileIds | | | | list | 否 | body | 待签署底稿文件ID列表<font style="color:#DF2A3F;">（最多上传50份文件；目前仅支持pdf文件）</font><br/><font style="color:#E8323C;">【注】</font><font style="color:#DF2A3F;">需提前调用</font> [《上传本地文件》](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256)<font style="color:#DF2A3F;">接口将文件进行上传至e签宝；</font>[点击跳转 如何上传文件](https://open.esign.cn/doc/opendoc/case3/hxzn88wydyft769i) |
| participants<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | array | 否 | body | 参与方信息 |
| | participantFlag | | | string | 是 | body | 参与方标识，同一个模板中不可重复<br/>会展示到模板页面上，所以建议设置为：甲方、乙方等容易理解的业务名词 |
| | participantType | | | int | 是 | body | 参与方类型<br/>**1** - 企业 <br/>**2** - 个人 |
| | participateBizType | | | string | 是 | body | 参与方式<br/>**1** - 填写 <br/>**2** - 签署<br/>既要填写也要签署，用英文逗号分隔："1,2" |
| | draftOrder | | | int | 否 | body | 填写顺序，默认值1<br/>+ 可指定：1-255，不同参与人<font style="color:#DF2A3F;">不可重复</font><br/>+ 顺序小的先填写 |
| | signOrder | | | int | 否 | body | 签署顺序，默认值1<br/>+ 可指定：1-255，不同参与人<font style="color:#DF2A3F;">可重复（重复就是可以同时签，不要求顺序）</font><br/>+ 顺序小的先签署 |
| | participantSetMode | | | int | 是 | body | 参与要求（参与人指定方式）<br/>**1** - 使用模板时指定（由使用模板的人自行指定），[通过流程模板创建合同拟定和签署流程](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/megwsgkmpbg1tec1)接口发起流程时，<font style="color:#DF2A3F;">需要在</font>**<font style="color:#DF2A3F;">participants</font>**<font style="color:#DF2A3F;">内传入具体参与方信息</font><br/>**2** - 固定成员（写死到模板中不可更改），<font style="color:#DF2A3F;">在下方</font>**<font style="color:#DF2A3F;">orgParticipant</font>**<font style="color:#DF2A3F;">或</font>**<font style="color:#DF2A3F;">psnParticipant</font>**<font style="color:#DF2A3F;">参与方里指定具体的参与人信息</font><br/>**3** - 发起人本人（发起模板的是谁就指定谁），[通过流程模板创建合同拟定和签署流程](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/megwsgkmpbg1tec1)接口发起流程时，<font style="color:#DF2A3F;">不需要传具体参与方信息，但需要在</font>**<font style="color:#DF2A3F;">signFlowInitiator</font>**<font style="color:#DF2A3F;">内指定发起人信息</font> |
| | orgParticipant<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | object | 否 | body | 企业参与方<br/>+ <font style="color:#DF2A3F;">participantType=1时传入此对象</font><br/>+ <font style="color:#DF2A3F;">仅在participantSetMode=2，即固定成员时生效</font> |
| | | orgName | | string | 是 | body | 企业名称 |
| | | transactor<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | object | 是 | body | 企业参与方经办人 |
| | | | transactorPsnAccount | string | 是 | body | 经办人手机号/邮箱 |
| | | | transactorName | string | 是 | body | 经办人姓名 |
| | psnParticipant<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | object | 否 | body | 个人参与方<br/>+ <font style="color:#DF2A3F;">participantType=2时传入此对象</font><br/>+ <font style="color:#DF2A3F;">仅在participantSetMode=2，即固定成员时生效</font> |
| | | psnAccount | | string | 是 | body | 个人手机号/邮箱 |
| | | psnName | | string | 是 | body | 个人姓名 |
| dedicatedCloudId | | | | string | 否 | body | 专属云项目ID<br/><font style="color:#E8323C;">补充说明：</font><br/>（1）专属云：文件需要存储在开发者本地系统，购买了专属云服务时使用；<br/>（2）专属云项目ID获取方式：请先联系对接群内技术获取； |


### 响应参数
| **参数名称** | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | --- | --- |
| code | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | object | 否 | 业务数据 |
|  | signTemplateCreateUrl | string | 是 | 流程模板创建页面（该地址无需登录，有效期30分钟） |


### 请求示例
```json
{
        "orgId": "6b498644****11b590803b800",
        "transactorPsnId": "498644******b590803b120",
        "redirectUrl": "https://****.cn"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "signTemplateCreateUrl": "https://smlh5.esign.cn/auth/guide?loginId=2a8***-3f**-4b60-a***-ded31***d61"
    }
}
```

