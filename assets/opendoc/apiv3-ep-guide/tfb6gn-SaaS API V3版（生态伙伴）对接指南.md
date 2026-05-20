## 名词解释
:::info
**平台方/集成方：**指自主接入电子签名服务的合作生态伙伴（类似于第三方服务角色），e签宝开放平台应用appId所属的主体公司。

**平台用户：**除平台方之外的客户和用户方，包含在平台购买套餐的客户（企业），也包含客户的签署用户（包含企业和个人）。

**发起方：**指在平台中发起签约的一方，合同的归属方，一般需要传入在平台购买签署套餐的客户。

**签署方：**指签署发起后，需要完成实名/意愿签署的一方。

:::

## 平台方准备工作
[点击查看 全流程电子合同服务介绍视频](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/全流程电子合同服务.mp4)

:::info
登录并创建应用后可以在【我的应用】下查看到应用ID（App Id）和应用Secret。

本地开发调试时，可参考[沙箱模拟环境使用说明](https://open.esign.cn/doc/opendoc/dev-guide3/qwnnsb)获取沙箱应用ID。

上线正式使用时，可参考[正式生产环境使用说明](https://open.esign.cn/doc/opendoc/dev-guide3/mezw5n)获取正式应用ID。

准备调用接口时，我们建议开发者先阅读[e签宝公有云API调用说明](https://open.esign.cn/doc/opendoc/dev-guide3/el34xh)了解相关使用说明和注意事项。

:::

## 四步接入电子合同服务
![画板](https://cdn.nlark.com/yuque/0/2022/jpeg/529506/1668408442326-102e336a-6705-4caf-9090-2844622be09e.jpeg)

### 第一步：e签宝服务开通/管理
[点击查看 电子合同服务开通介绍视频](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/电子合同服务开通.mp4)

开发者嵌入e签宝页面（支持PC/H5），使得用户可以直接在业务平台中完成，企业认证授权、服务购买及进入企业控制台进行成员管理、印章管理等操作；

![](https://cdn.nlark.com/yuque/0/2022/png/529506/1671186956028-fb684212-b21a-441e-8974-ba46548979a7.png)

前端引入eSignPartner 组件，具体集成方式参见 [【 EP极速版集成方案对接说明】](https://qianxiaoxia.yuque.com/opendoc/apiv3-ep-guide/kzw6gy)

注1：在eSignPartner 组件服务中配置 notifyUrl，用于通知用户认证和授权的完成情况；[【授权完成通知】](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/demod3)

注2：默认授权有效期180天，可联系e签宝交付顾问配置

### 第二步：电子合同发起
[点击查看 电子合同的发起介绍视频](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/电子合同的发起.mp4)

在需要发起签署的节点，有**二种发起**方式：

| 方式 | **通过页面发起签署** | **基于文件发起签署** |
| --- | --- | --- |
| 描述 | 通过**e签宝页面**去发起签署，在页面中指定文件及签署人信息，发起后默认短信/邮件通知，对接快速，无需考虑发起页面的开发 | 通过**API**发起签署，在参数中指定文件及签署人信息，无页面，更灵活，可根据业务流程深度集成 |
| 接入难度 | 一小时 | 一天 |
| 适用场景 | + 无业务系统<br/>+ 合同发起不依赖前置业务<br/>+ 非核心业务的合同或响应临时签署需求<br/>+ 希望快速对接上线 | + 已有前置业务或合同发起流程，如审批通过后发起<br/>+ 已收集好合同发起的必要信息，无需页面<br/>+ 希望与业务流程深度融合 |
| 接口文档 | [【通过页面发起签署】](https://open.esign.cn/doc/opendoc/pdf-sign3/lp54bn) | [【上传本地文件】](https://open.esign.cn/doc/opendoc/pdf-sign3/rlh256)<br/>[【基于文件发起签署】](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) |




### 第三步：电子合同签署
[点击查看 电子合同的签署介绍视频](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/电子合同签署.mp4)

签署发起后，默认短信/邮件推送，签署链接支持各类设备，也可[【获取签署页面链接】](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd)自行推送；

![](https://cdn.nlark.com/yuque/0/2022/png/529506/1662447113442-e260be9a-b5f9-4211-9617-5a3df1b3c051.png?x-oss-process=image%2Fresize%2Cw_1125%2Climit_0)

移动端签署效果

### 第四步：电子合同管理
[点击查看 电子合同的管理介绍视频](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/电子合同管理.mp4)

签署后的合同，e签宝提供多种接口能力，满足业务对合同管理的需求，如各类通知回调、签署流程查询、文件下载、签署催签、合同解约等；

| 接口名称 | **应用说明** |
| --- | --- |
| [【通知回调】](https://open.esign.cn/doc/opendoc/notify3/pmy852) | 提供各类回调服务，如[【签署通知回调】](https://open.esign.cn/doc/opendoc/notify3/sblzg8)、认证授权回调、文件模板回调等，可实时回调相关状态给业务系统 |
| [【查询签署流程详情】](https://open.esign.cn/doc/opendoc/pdf-sign3/xxk4q6) | 返回签署详情信息，包括文件信息、签署人信息、流程信息等； |
| [【获取签署页面链接】](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 返回签署页面和签署预览业务 |
| [【签署后的文件下载】](https://open.esign.cn/doc/opendoc/pdf-sign3/kczf8g) | 返回签署后的pdf文件 |
| [【查询签署流程列表】](https://open.esign.cn/doc/opendoc/pdf-sign3/kq4b2e) | 返回签署流程列表，开发者需根据返回列表，自行在前端显示 |
| [【催签】](https://open.esign.cn/doc/opendoc/pdf-sign3/yws940) | 可对流程中的签署人进行催签，再次发送签署短信 |
| [【合同解约】](https://open.esign.cn/doc/opendoc/pdf-sign3/dy90gx) | 可满足合同作废、解约的需求，合同解约后，旧合同流程的状态会更新为：已解约 |


## 文件模板服务
[点击查看 文件模板服务介绍视频](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/文件模板服务.mp4)

实际业务中，通常会涉及到模板的应用，**即通过模板去生成待签署文件pdf，**之后再基于文件去发起签署，

e签宝提供丰富的模板能力，支持PDF及HTML模板，主要能力包括：

| 接口名称 | **应用说明** |
| --- | --- |
| [【上传本地文件】](https://open.esign.cn/doc/opendoc/pdf-sign3/rlh256) | 将本地文件上传至e签宝服务端，可用于制作模板、发起合同签署等 |
| [【获取制作合同模板页面】](https://open.esign.cn/doc/opendoc/pdf-sign3/xagpot) | 获取模板制作的页面，可提供给平台及平台用户 一个制作模板的可视化工具，所见即所得，且支持自定义控件，支持版式模板和html模板 |
| [【获取填写合同模板页面】](https://open.esign.cn/doc/opendoc/pdf-sign3/ub4ncy) | 提供一个填写模板的页面，填写后可获得一个待签署pdf文件 |
| [【填写模板生成文件】](https://open.esign.cn/doc/opendoc/pdf-sign3/mv8a3i) | 通过接口，将业务变量填充到指定模板内，获得一个待签署pdf文件 |


## 如何确定印章位置
[点击查看 印章位置的确定介绍视频](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/印章位置的确定.mp4)

## 如何自动盖章
[点击查看 自动盖章介绍视频](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/如何自动盖章.mp4)

1 平台用户进入管理后台，将某个印章授权给平台；[【印章跨企业授权说明】](https://open.esign.cn/doc/opendoc/seal3/vk863c)

2 平台通过接口查询印章ID[【查询被外部企业授权印章】](https://open.esign.cn/doc/opendoc/seal3/czrua1)

3 在接口中指定印章ID及坐标即可自动盖章[【基于文件发起签署】](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42)

![](https://cdn.nlark.com/yuque/0/2022/png/529506/1667977249858-1141defe-6aa0-436e-bb71-0792eaf31e06.png)

**<font style="color:#DF2A3F;">【注】</font>** 签署方（signers）参数在设置时需注意：

机构信息（orgSignerInfo）中，**<font style="color:#DF2A3F;">orgId传入调用的应用ID所属主体企业的账号ID</font>**，transactorInfo经办人信息无需传入，自动签章参数autosign设置为true，assignedSealId设置被授权的印章ID。

---

## 关于计费的控制
目前付费逻辑的指定暂支持[【通过页面发起签署】【基于文件发起签署】](https://open.esign.cn/doc/opendoc/pdf-sign3/lp54bn)，具体参数参考如下：

:::info
**平台用户付费：**

signFlowInitiator = 付费主体；    chargeMode  = 1；  signers = 按需传入签署方



**平台付费  平台用户使用：**

signFlowInitiator = 按需传入（若不传，则为平台）；    chargeMode  = 0； signers = 按需传入签署方



**套餐类型指定：**

消耗生态伙伴订单（即消耗在平台中下的订单） orderType = DISTRIBUTION

消耗通用订单（消耗用户在e签宝官网买的套餐） orderType 不用传

:::

---

## [Demo下载](https://qianxiaoxia.yuque.com/opendoc/apiv3-ep-guide/sy04y7)
---

## 常见问题
### Q： 平台方去哪里查看订单记录及详情？
A：[【开放平台 - 对账中心】](https://open.esign.cn/reconciliation-center/home)

![](https://cdn.nlark.com/yuque/0/2022/png/529506/1667978357880-c7a21cfe-1bbc-4460-8968-6d465c12e6bf.png)

### Q： 平台用户的相对方不想使用电子签名怎么办？
A：可以使用半程无纸化，即平台方盖电子章，然后相对方打印pdf盖物理章，同样具备法律效力。

