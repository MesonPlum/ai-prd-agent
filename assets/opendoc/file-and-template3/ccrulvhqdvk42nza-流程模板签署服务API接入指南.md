## 名词解释
| **概念** | **解释** |
| --- | --- |
| **流程模板** | 模板是适用于合同中某些内容需要针对不同的人填写不同值的情况，比如：甲乙方姓名、身份证、地址等。需要在合同上设置填写控件生成模板，再通过控件填写不同的内容形成最终签署的合同。<br/>流程模板中除了具备普通模板的填写控件外，还支持在模板中设置填写方、签署方、参与顺序、抄送方、合同附件、签署区控件等内容，也就是可以和后续发起签署的信息相关联。<br/>流程模板是归属于企业用户的资源，与 [e签宝SaaS官网](https://web.esign.cn/templates-manage/manage) 的模板通用（[点击查看 e签宝SaaS官网如何创建模板](https://qianxiaoxia.yuque.com/opendoc/helper/ih4q808l3x7f5olw)），官网模板设置下的模板编号即为接口中的流程模板ID（signTemplateId）。<br/>![](https://cdn.nlark.com/yuque/0/2023/png/447795/1677738732616-53faa2f8-bc74-4cd8-8c33-aba633314c97.png)<br/>（开发者使用非自身企业的流程模板时，需要通过 [用户授权](https://open.esign.cn/doc/opendoc/auth3/kcbdu7) 获取企业资源的管理权限） |
| **合同拟定** | 流程模板制作后，用户可通过e签宝页面填写具体内容形成最终签署合同的过程就是合同拟定的过程。<br/>开发者系统每发起一次合同拟定，会返回一个新的流程标识signFlowId，signFlowId标记当前这笔任务的全阶段流程，建议开发者保存。 |
| **签署流程** | 当合同拟定过程完成后，会进入到用户的签署流程中，合同拟定和签署流程通过流程标识signFlowId绑定。 |


## 接入流程
### 接口调用示例Demo下载
[点击下载 SaaS_API_V3_流程模板Postman脚本](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/SaaS_API_V3_流程模板.zip)

[点击下载 SaaS_API_V3流程模板Java版本Demo](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/SaaSAPI_SignTemplate_V3_Demo_JAVA.zip)

### 接口列表
| **模块名称** | **功能概述** | **API接口****<font style="color:#8C8C8C;">（点击直接跳转相关API文档）</font>** | **接口集成** |
| --- | --- | --- | :---: |
| **认证&授权** | 开发者使用非自身企业的流程模板时，需要先通过企业的授权，获取开发者应用对企业资源的管理权限 | [获取机构认证&授权页面链接](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7) | **<font style="color:#8C8C8C;">按需</font>** |
| | | [查询机构认证信息](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc) | **<font style="color:#52C41A;">建议</font>** |
| | | [查询认证授权流程详情](https://qianxiaoxia.yuque.com/opendoc/auth3/ytn2tt) | **<font style="color:#8C8C8C;">按需</font>** |
| **企业成员管理** | 需要确保模板创建/编辑的经办人有该企业的模板管理权限（管理员或法定代表人默认会有该权限） | [查询企业成员列表](https://qianxiaoxia.yuque.com/opendoc/employee/bzrzic) | **<font style="color:#52C41A;">建议</font>** |
| | | [添加企业机构成员](https://qianxiaoxia.yuque.com/opendoc/employee/has759) | **<font style="color:#8C8C8C;">按需</font>** |
| | | [添加成员角色](https://qianxiaoxia.yuque.com/opendoc/employee/qhbzzmq2a7r03kyo) | **<font style="color:#8C8C8C;">按需</font>** |
| **流程模板** | 可获取模板制作、编辑的页面。进行模板的查询、状态修改。 | [获取《创建流程模板》页面链接](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/ukznvprry5qvlxh3) | **<font style="color:#E8323C;">必需</font>**<br/>**<font style="color:#8C8C8C;">（如在官网制作模板则不需要）</font>** |
| | | [查询流程模板详情](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/pfzut7ho9obc7c5r) | **<font style="color:#E8323C;">必需</font>** |
| | | [开启流程模板](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/ohk7cno35ozby9qt) | **<font style="color:#8C8C8C;">按需</font>** |
| | | [停用流程模板](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/gyo1p6cg3yk1rv2g) | **<font style="color:#8C8C8C;">按需</font>** |
| | | [获取《编辑流程模板》页面链接](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/fifg4ked5cqk6vgt) | **<font style="color:#8C8C8C;">按需</font>** |
| | | [查询流程模板列表](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/al59g6n5oo75sl19) | **<font style="color:#8C8C8C;">按需</font>** |
| **签署相关** | 可通过流程模板发起合同拟定和签署流程并通过接口查询，获取填写、签署链接、下载签署后的文件等。 | [通过流程模板创建合同拟定和签署流程](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/megwsgkmpbg1tec1) | **<font style="color:#E8323C;">必需</font>** |
| | | [获取填写页面链接](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/gu4n9g6fcaenhmnw) | **<font style="color:#8C8C8C;">按需</font>** |
| | | [查询合同拟定和签署流程状态](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/rw4epk8wc0tzilt3) | **<font style="color:#52C41A;">建议</font>** |
| | | [查询合同拟定详情](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/blg0lxnw6e136art) | **<font style="color:#52C41A;">建议</font>** |
| | | [获取签署页面链接](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/pvfkwd) | **<font style="color:#8C8C8C;">按需</font>** |
| | | [查询签署流程详情](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xxk4q6) | **<font style="color:#52C41A;">建议</font>** |
| | | [完结签署流程](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ynwqsm) | **<font style="color:#8C8C8C;">按需</font>** |
| | | [下载已签署文件及附属材料](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/kczf8g) | **<font style="color:#52C41A;">建议</font>** |
| **回调通知** | 当用户操作授权、合同填写、合同签署等事件后会触发给开发者配置的通知地址发送特定的事件通知。 | [授权完成通知](https://qianxiaoxia.yuque.com/opendoc/notify3/demod3) | **<font style="color:#8C8C8C;">按需</font>** |
| | | [流程填写人填写状态通知](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/wg4lh0m89cyg4a6y) | **<font style="color:#52C41A;">建议</font>** |
| | | [合同拟定结果通知](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/fc9qmvfbe6yu1g7q) | **<font style="color:#52C41A;">建议</font>** |
| | | [签署方-已读通知](https://qianxiaoxia.yuque.com/opendoc/notify3/ok58qr) | **<font style="color:#8C8C8C;">按需</font>** |
| | | [签署方-签署结果通知](https://qianxiaoxia.yuque.com/opendoc/notify3/zzcdf8) | **<font style="color:#52C41A;">建议</font>** |
| | | [流程结束通知](https://qianxiaoxia.yuque.com/opendoc/notify3/glqgy1) | **<font style="color:#52C41A;">建议</font>** |


### 接口说明与页面效果
#### 一.企业资源的管理权限获取
当需要获取非应用ID所属的自身企业的流程模板管理的权限时，需要提前对企业进行授权。企业需授权给开发者自身的应用ID的资源管理权限。

[获取机构认证&授权页面链接](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7) 接口获取的企业授权链接打开效果如下：

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1678071608074-293feb5f-bd60-4923-8e1f-707dc3c6fb5e.png)

**企业用户授权操作页面效果：**[点击查看 企业认证｜授权操作手册](https://open.esign.cn/doc/opendoc/helper/vo3s51#eKrbT)

授权通过后开发者可直接通过 [授权完成通知](https://qianxiaoxia.yuque.com/opendoc/notify3/demod3) 接收企业用户的账号ID（orgId）和经办人的个人账号ID（psnId），或者通过 [查询机构认证信息](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc) 接口查询企业用户的账号ID（orgId），再通过 [查询企业成员列表](https://qianxiaoxia.yuque.com/opendoc/employee/bzrzic) 查询企业的成员信息，需要确认经办人个人账号ID（psnId）有模板管理权限（如果成员没有权限需要通过 [添加成员角色](https://qianxiaoxia.yuque.com/opendoc/employee/qhbzzmq2a7r03kyo) 接口去添加模板管理权限），建议经办人直接用管理员或者法定代表人账号，无需单独分配权限。**<font style="color:#DF2A3F;">（应用ID所属的平台自身企业账号无需单独做授权）</font>**

#### 二.流程模板的制作
:::info
**可登录e签宝SaaS官网进行模板设置体验（**[**点击查看 e签宝SaaS官网如何创建模板**](https://qianxiaoxia.yuque.com/opendoc/helper/ih4q808l3x7f5olw)**）：**  
**<font style="color:#DF2A3F;">（注意：不同的环境之间数据是隔离的，不通用）</font>**

**沙箱模拟环境地址：**[**https://smlfront.esign.cn:8880/templates**](https://smlfront.esign.cn:8880/templates)**（首次登录需用短信验证码方式）**

**正式生产环境地址：**[**https://web.esign.cn/templates**](https://web.esign.cn/templates)**（首次登录需用短信验证码方式）**

:::

[获取《创建流程模板》页面链接](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/ukznvprry5qvlxh3) 接口获取的链接打开后操作效果展示如下：

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1693531806987-c5e1796e-502f-4266-ac0d-034f4aab02d6.png)

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1677744643965-428240d6-ff5c-4ad0-ac4b-a6b938cd96af.png)

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1677744685951-b1dc5fc1-0973-4e67-9e05-ea39c6287171.png)

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1677744712827-e7aebe70-bc24-44c3-a477-366936e15de0.png)

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1677744752531-f26cb848-54c5-448e-8b53-15d5afb8c95c.png)

可以通过 [获取《创建流程模板》页面链接](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/ukznvprry5qvlxh3) 接口中开发者自定义的重定向跳转地址获取此次模板制作的流程模板ID（signTemplateId），再通过 [查询流程模板详情](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/pfzut7ho9obc7c5r) 接口获取流程模板制作的参与方信息（participants）、控件列表（components）等信息。

后续如果需要做模板列表展示时可以通过 [查询流程模板列表](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/al59g6n5oo75sl19) 接口查询企业下全部的模板信息。需要编辑模板时，需要先 [停用流程模板](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/gyo1p6cg3yk1rv2g) 再 [获取《编辑流程模板》页面链接](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/fifg4ked5cqk6vgt) 进行模板的修改。再次使用前需要 [开启流程模板](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/ohk7cno35ozby9qt) 才可以发起合同拟定和签署流程。

#### 三.用户的填写与签署
[通过流程模板创建合同拟定和签署流程](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/megwsgkmpbg1tec1) 接口发起合同拟定（用户填写）和签署流程后，如果发起时设置了通知方式，e签宝会自动给用户发送短信/邮件，通知用户填写合同内容，开发者也可以通过接口获取用户的填写链接。

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1678070572289-f1ef1e58-1190-4a50-9640-c78b4a0232f8.png)

[获取填写页面链接](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/gu4n9g6fcaenhmnw) 接口获取的用户填写链接打开效果如下（与短信/邮件通知里的链接打开效果一样）：

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1678070683060-69b155a4-0f60-4d7c-9639-4a7f4be1bd82.png)![](https://cdn.nlark.com/yuque/0/2023/png/447795/1678070756675-df5d47e9-97ec-4859-be0f-40d7f2ad7e2f.png)![](https://cdn.nlark.com/yuque/0/2023/png/447795/1678070791383-6bcf2d1f-f48c-4142-b806-6cab88b2084c.png)

当单方、双方或者多方用户填写完成后，合同拟定完成（用户每次填写后会触发 [流程填写人填写状态通知](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/wg4lh0m89cyg4a6y) 所有人填写完成后触发 [合同拟定结果通知](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/fc9qmvfbe6yu1g7q) ，开发者可以在回调通知中接受具体的节点信息），合同拟定完成后流程将进入签署阶段。如果发起时设置了通知方式，e签宝会自动给用户发送短信/邮件，通知用户进行签署，开发者也可以通过接口获取用户的签署链接。

[获取签署页面链接](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/pvfkwd) 接口获取的用户签署链接打开效果如下（与短信/邮件通知里的链接打开效果一样）：

**用户签署操作页面效果：**[点击查看 SaaS API V3版用户签署页操作手册](https://open.esign.cn/doc/opendoc/helper/toh8ph)

**用户签署操作视频演示：**[签署演示视频.mp4](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/签署视频.mp4)

**整个过程建议开发者接入查询接口查询流程的具体信息：**

[查询合同拟定和签署流程状态](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/rw4epk8wc0tzilt3) 接口可以查询流程处于什么阶段。

[查询合同拟定详情](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/blg0lxnw6e136art)  接口查询合同拟定阶段的具体信息。

[查询签署流程详情](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xxk4q6)  接口查询签署阶段的具体信息。

当用户签署完成后，开发者可以进行最终签署合同的下载：[下载已签署文件及附属材料](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/kczf8g)（当发起流程时没有设置自动完结时，需要调用 [完结签署流程](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ynwqsm) 接口进行签署流程的完结，流程完结后签署完的合同才允许下载）。

#### 四.企业如何自动落章
流程模板是根据模板来发起合同拟定和签署的，如果模板配置开启了自动落章，接口会自动识别到配置，签署接口无需额外的参数来控制。

[点击查看 流程模板如何自动落章](https://qianxiaoxia.yuque.com/opendoc/helper/si1ih3va3oilpd24)

 

