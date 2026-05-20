## 名词解释
| **概念** | **解释** |
| --- | --- |
| **文件** | 所有本地的合同、处理后待签署合同以及合同附加查看预览的附件等都是文件。 |
| **文件模板   **（该模块中的**合同模板**即是文件模板） | 文件模板是适用于合同文件中某些内容需要针对不同的人填写不同值的情况，比如：甲乙方姓名、身份证、地址等。需要制作固定的模板，填写不同的内容（先上传本地原文件，然后制作生成固定模板，再进行填充不同的内容后形成最终待签署文件）。<br/>文件模板分为两种：<br/>①PDF模板<br/>PDF模板基于.pdf文件进行配置，用户可以在PDF模板的配置页面上拖拽控件，且控件是直接覆盖于PDF的内容之上。PDF模板的控件在填写后，不会对文件中的内容产生影响。<br/>②HTML模板<br/>HTML模板是基于.doc或.docx文件进行配置，用户可以在HTML模板的配置页面上拖拽控件，且拖放后的控件会根据文件中的内容格式自动嵌入到文件的内容之中而不会覆盖于内容上。HTML模板的控件在填写后，会使文件中的内容自适应展示，比如换行。 |
| **签署流程** | 当平台对合同文件发起签署时，会生成一个签署流程ID-signFlowId，这个signFlowId标识当时发起的这笔签署任务的全阶段流程即签署流程。（一模一样的任务信息重新发起签署，也会生成新的signFlowId，即是新的签署流程，与原流程无关联） |


## 接入流程
### 签署文件示意图
![](https://cdn.nlark.com/yuque/0/2024/png/447795/1709533878321-5c8970fc-e937-42f9-8fb3-2b623787aced.png)

:::info
生成一份签署文件至少需要 **生成合同 **和采集签署方信息去 **发起签署流程 **两大步骤。

**关于印章/签名：**e签宝会根据用户名字生成默认印章，个人手写签名也可以在e签宝签署页面自主进行。

<font style="color:#DF2A3F;">（可以不用另外对接印章服务相关接口）</font>

[e签宝官网验签地址 请点击跳转](https://www.esign.cn/pcgw/cp/htyz/)

:::

### 接口调用示例Demo下载
[**点击跳转 下载对接示例DEMO**](https://qianxiaoxia.yuque.com/opendoc/apiv3-guide/kwsb88)

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1730425489618-e7c34910-a475-4db2-9c6c-f093c4723d21.png)

### 接口列表
<font style="color:#DF2A3F;">以下接口列表和接口流程说明是对接基础的正向流程，开发者还应根据自身需求关注其他的功能内容，例如：合同模板的编辑、签署流程的变更、追加签署区等。</font>

| **API模块** | | **API接口****<font style="color:#8C8C8C;">（点击直接跳转相关API文档）</font>** | **接口说明****<font style="color:#8C8C8C;">（点击直接跳转相关API文档）</font>** |
| --- | --- | --- | --- |
| **第一步：生成合同**<br/>**<font style="color:#DF2A3F;">（二选一即可）</font>** | **方式一：本地制作合同**<br/>**（非制式合同）** | [获取文件上传地址](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256#e0adY) | 返回 [上传文件流](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256#S0BEC) 接口所需的地址fileUploadUrl<br/>参考以下场景指南：<br/>+ [直接上传待签署文件](https://qianxiaoxia.yuque.com/opendoc/case3/hxzn88wydyft769i) |
| | | [上传文件流](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256#S0BEC) | 通过已获取到的fileUploadUrl，使用 PUT 请求方法把文件二进制字节流上传到服务端<br/>+ [文件上传常见报错及解决方法](https://qianxiaoxia.yuque.com/opendoc/helper/aw4g7hrxebahoq97) |
| | | [查询文件上传状态](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/qz4aip) | 需要判断文件上传/转换是否完成，可循环调用此接口，间隔建议设置为500毫秒 |
| | | [检索文件关键字坐标](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ze0ahv) | 可选接入，适用于通过查找关键字的所在位置坐标，回传到 [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) 接口中的设置签署区坐标 |
| | | | |
| | **方式二：模板方式生成合同   ****（API接口制作模板）** | [获取文件上传地址](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256#e0adY) | 返回 [上传文件流](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256#S0BEC) 接口所需的地址fileUploadUrl<br/>参考以下场景指南：<br/>+ [直接上传待签署文件](https://qianxiaoxia.yuque.com/opendoc/case3/hxzn88wydyft769i) |
| | | [上传文件流](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256#S0BEC) | 通过已获取到的fileUploadUrl，使用 PUT 请求方法把文件二进制字节流上传到服务端<br/>+ [文件上传常见报错及解决方法](https://qianxiaoxia.yuque.com/opendoc/helper/aw4g7hrxebahoq97) |
| | | [查询文件上传状态](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/qz4aip) | 需要判断文件上传/转换是否完成，可循环调用此接口，间隔建议设置为500毫秒 |
| | | [获取制作合同模板页面](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xagpot) | 参考以下场景指南：<br/>+ [使用合同模板制作页面制作PDF模板及填充](https://qianxiaoxia.yuque.com/opendoc/case3/rs709w)<br/>+ [使用HTML模板中的控件（动态表格）](https://qianxiaoxia.yuque.com/opendoc/case3/ubfvvk) |
| | | [查询合同模板中控件详情](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/aoq509) | 查询合同模板详情信息：<br/>+ 获取模板中的自定义控件编码，使用 [填写模板生成文件](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/mv8a3i) 接口生成待签署文件<br/>+ 获取模板中的签署区的位置坐标，回传到 [基于文件发起签署](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/su5g42) 接口中的设置签署区坐标 |
| | | [模板填充生成文件](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/mv8a3i)<br/>[获取填写合同模板页面](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ub4ncy)<br/>**<font style="color:#DF2A3F;">（二选一即可）</font>** | 通过模板填充具体内容后生成最终待签署的合同文件<br/>+ 不同控件类型 [填充示例说明](https://qianxiaoxia.yuque.com/opendoc/case3/rs709w#Xd6Zh) |
| | | | |
| **第二步：发起签署流程** | | [基于文件发起签署](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/su5g42)<br/>[通过页面发起签署](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/lp54bn)<br/>**<font style="color:#DF2A3F;">（二选一即可）</font>** | 参数案例可参考[【常见场景对接说明】](https://qianxiaoxia.yuque.com/opendoc/apiv3-guide/al7kcc)中“**发起签署**”和“**签署可选功能**”模块<br/>用户签署完成后根据回调通知判断签署流程状态：<br/>+ [签署人签署完成回调通知](https://qianxiaoxia.yuque.com/opendoc/notify3/zzcdf8)（判断每个签署方签署状态） <br/>+ [流程结束回调通知](https://qianxiaoxia.yuque.com/opendoc/notify3/glqgy1)（判断整个流程是否完结） |
| | | [获取签署页面链接](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/pvfkwd) | 根据每个签署人账号获取签署人的签署链接（每个签署人的链接都不同）<br/>当签署方需要在业务系统（ERP，APP，微信小程序等）中访问签署链接，可通过此接口获取合同的签署/预览链接。<br/>+ [微信小程序集成签署链接对接说明](https://qianxiaoxia.yuque.com/opendoc/case3/ahb0sg)<br/>+  [APP集成签署链接对接说明](https://qianxiaoxia.yuque.com/opendoc/case3/ovb0e40do4fnrr61)<br/>+  [支付宝小程序对接说明](https://qianxiaoxia.yuque.com/opendoc/case3/yr55bsgstskebvxc) |
| | | [查询签署流程详情](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xxk4q6) | 开发者可以主动查询签署流程详情信息<br/>+ [点击这里](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/gsy6xe)了解更多流程状态说明 |
| | | [完结签署流程](https://open.esign.cn/doc/opendoc/pdf-sign3/ynwqsm) | 全部签署方签署完成后，可以完结签署流程<br/>+ 当 [基于文件发起签署](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/su5g42) 中autoFinish设置了自动完结，则不需要接入此接口 |
| | | [下载已签署文件及附属材料](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/kczf8g) | 下载、查看签署后的合同文件<br/>+ 接收到 [流程结束回调通知](https://qianxiaoxia.yuque.com/opendoc/notify3/glqgy1)（签署流程完结）后，才能下载签署文件 |


### 接口流程说明
#### 一.生成待签署的合同文件
开发者系统要使用e签宝完成一次完整合规的电子合同的签署，至少需要准备待签署文件和发起签署流程两步，这两步共有两种实现方式：

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1692946234947-7bacb3f6-3606-426c-9e45-345b3e1f2330.png)

**①直接上传完整的待签署文件，并发起签署流程：**

开发者可在系统中自动生成文件，或由开发者系统中的用户上传文件，并直接使用该文件发起签署。

接口参考流程：[直接上传待签署文件](https://qianxiaoxia.yuque.com/opendoc/case3/hxzn88wydyft769i)

<font style="color:#DF2A3F;">该方式适用于系统能够直接生成或获取待签署文件的场景。</font>

②**通过文件模板生成待签署文件，并发起签署流程：**

开发者可在系统中自动生成文件，或由开发者系统中的用户上传文件后，将该文件作为模板底稿获取e签宝的文件模板配置页面，并提供给系统用户。用户在页面中将需要填写的控件拖拽到合适的位置并保存为文件模板。

在使用时，可以由系统自动对控件进行填写，或者让用户在e签宝提供的填写页面中进行填写，填写完成后即可生成待签署文件，文件模板可以反复使用。生成待签署文件后，开发者系统可以使用该文件发起签署。

接口参考流程：

① PDF模板：[使用合同模板制作页面制作PDF模板及填充](https://qianxiaoxia.yuque.com/opendoc/case3/rs709w)

② HTML模板：[使用HTML模板中的控件（动态表格）](https://qianxiaoxia.yuque.com/opendoc/case3/ubfvvk)

<font style="color:#DF2A3F;">该方式适用于待签署文件需要让用户根据每次发起签署所需信息的不同进行填写完善的场景。</font>



#### 二.发起签署流程与用户的签署
**1.开发者可以选择以下两种方式的其中一种来发起签署：**

**①**[**基于文件发起签署**](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/su5g42)** ****<font style="color:#DF2A3F;">（大多数客户的选择）</font>**

纯接口传参发起签署，获取签署流程signFlowId。

如果使用功能比较常规，可以看参数精简后的文档： [（精简版）基于文件发起签署](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/nxhgcl3bfgqz8qlz)

参数案例可参考[【常见场景对接说明】](https://qianxiaoxia.yuque.com/opendoc/apiv3-guide/al7kcc)中“**发起签署**”和“**签署可选功能**”模块

**②**[**通过页面发起签署**](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/lp54bn)

通过接口获取e签宝的发起签署页面，可以在页面里上传文件，添加签署方、签署位置等，页面信息填入后通过接收 [签署发起成功通知](https://qianxiaoxia.yuque.com/opendoc/notify3/llu8g1) 获取签署流程signFlowId。

:::warning
**<font style="color:#DF2A3F;">用户侧一般默认为手动签署，个人用户只能手动签署，企业用户可以通过印章授权后完成自动盖章。</font>**

**<font style="color:#DF2A3F;">（核心参数传递见 </font>**[**附录**](#WhfU4)**<font style="color:#DF2A3F;">）</font>**

:::



**2.开发者接口发起签署成功，用户侧的签署链接可以有以下两种方式获取：**

**①接口获取签署链接：**

开发者可以通过 [获取签署页面链接](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/pvfkwd) 接口获取用户手动签署的链接PC/H5，内嵌在自己的系统内，或者用自己的短信等通知方式封装好发送给用户。（通过接口获取的签署链接，<font style="color:#DF2A3F;">支持</font>隐藏e签宝登录页面）

**②e签宝通知发送签署链接：**

开发者也可以在发起签署时设置使用e签宝自带的通知方式noticeTypes：通过e签宝的短信/邮件给用户的个人账号标识：手机号/邮箱发送签署链接。（通过e签宝通知方式发送的签署链接，<font style="color:#DF2A3F;">不支持</font>隐藏e签宝登录页面）

:::info
**用户签署操作页面效果：**[**点击查看 SaaS API V3版用户签署页操作手册**](https://open.esign.cn/doc/opendoc/helper/toh8ph)

**用户签署操作视频演示：**[**签署演示视频.mp4**](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/签署视频.mp4)

:::



**3.用户签署完成，开发者获取签署状态和签署后的文件：**

**用户签署后，开发者可以根据回调通知判断签署流程状态：**

+ [签署人签署完成回调通知](https://qianxiaoxia.yuque.com/opendoc/notify3/zzcdf8)（判断每个签署方签署状态） 
+ [流程结束回调通知](https://qianxiaoxia.yuque.com/opendoc/notify3/glqgy1)（判断整个流程是否完结，[完结签署流程](https://open.esign.cn/doc/opendoc/pdf-sign3/ynwqsm) 后触发）

**同时可通过 **[**查询签署流程详情**](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xxk4q6)** 接口主动查询签署流程状态。**

**流程结束后，开发者可以通过 **[**下载已签署文件及附属材料**](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/kczf8g)** 接口进行签署后文件的下载、查看。**



### 附录
[基于文件发起签署](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/su5g42) 参数较多，不同的场景容易弄混，所以结合四种签署场景，整理了关键参数signers（签署方信息）中的传参规则。

signers中参数设置规则如下（signers本身是数组，多场景可以传多个）：

| **<font style="color:rgb(0, 0, 0);">参数字段\签署场景</font>** | **<font style="color:rgb(0, 0, 0);">appId对应的自身机构自动落章</font>** | **<font style="color:rgb(0, 0, 0);">机构用户自动落章</font>** | **<font style="color:rgb(0, 0, 0);">机构用户手动签署</font>** | **<font style="color:rgb(0, 0, 0);">个人用户手动签署</font>** |
| --- | :---: | :---: | :---: | :---: |
| **<font style="color:rgb(0, 0, 0);">signerType</font>** | <font style="color:rgb(0, 0, 0);">传值：1</font> | <font style="color:rgb(0, 0, 0);">传值：1</font> | <font style="color:rgb(0, 0, 0);">传值：1</font> | <font style="color:rgb(0, 0, 0);">传值：0</font> |
| **<font style="color:rgb(0, 0, 0);">orgSignerInfo</font>** | <font style="color:rgb(0, 0, 0);">不传</font> | <font style="color:rgb(0, 0, 0);">不传</font> | <font style="color:rgb(0, 0, 0);">（1）传入机构用户的账号orgId或者</font><font style="color:rgb(64, 64, 64);">orgName</font><br/><font style="color:rgb(0, 0, 0);">（2）传入代机构签署的经办人信息</font><font style="color:rgb(64, 64, 64);">transactorInfo</font><br/><font style="color:rgb(232, 50, 60);">（1）和（2）均须</font> | <font style="color:rgb(0, 0, 0);">不传</font> |
| **<font style="color:rgb(0, 0, 0);">psnSignerInfo</font>** | <font style="color:rgb(0, 0, 0);">不传</font> | <font style="color:rgb(0, 0, 0);">不传</font> | <font style="color:rgb(0, 0, 0);">不传</font> | <font style="color:rgb(0, 0, 0);">个人签署账号</font><font style="color:rgb(64, 64, 64);">psnAccount或者psnId</font> |
| **<font style="color:rgb(0, 0, 0);">autoSign</font>** | <font style="color:rgb(0, 0, 0);">true</font> | <font style="color:rgb(0, 0, 0);">true</font> | <font style="color:rgb(0, 0, 0);">false</font> | <font style="color:rgb(0, 0, 0);">false</font> |
| **<font style="color:rgb(0, 0, 0);">assignedSealId</font>** | <font style="color:rgb(0, 0, 0);">（1）不传此字段取默认印章</font><br/><font style="color:rgb(0, 0, 0);">（2） 传入appId对应的自身机构账号的印章ID</font><br/><font style="color:rgb(232, 50, 60);">（1）或者（2）</font> | <font style="color:rgb(0, 0, 0);">传入机构用户授权给appId对应的自身机构的印章ID</font><br/>（[跨企业印章授权与自动签署流程](https://qianxiaoxia.yuque.com/opendoc/helper/ryllt4y4x6bemr7b)） | <font style="color:rgb(0, 0, 0);">不传</font> | <font style="color:rgb(0, 0, 0);">不传</font> |




