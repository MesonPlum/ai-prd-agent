## 方案介绍
为解决e签宝生态伙伴（eSignPartner）集成e签宝电子签名 SaaS API 周期长和投入研发资源多等问题，e签宝开放平台特推出 V3 EP 极速版集成对接方案。

V3 EP 极速版集成对接由前端 eSignPartner 组件和后端服务两部分组成。

前端 eSignPartner 组件**由e签宝开放平台负责**对e签宝公有云 Open API 相关接口封装成 eSignPartner.js，可被组件化直接嵌入到e签宝生态伙伴的平台前端来提供相关e签宝页面，方便用户进行界面交互操作。

后端服务**由开发者负责**对 SaaS API V3 版相关接口进行集成开发。可使用[集成对接示例Demo](#iZ7lx)中已封装的工具类进行快速集成开发。

## 集成对接步骤
采用V3 EP 极速版集成对接方案时，开发者可以按照以下步骤进行开发。

:::info
**步骤1：登录e签宝开放平台创建应用。**

登录并创建应用后可以在【我的应用】下查看到应用ID（App Id）和应用Secret。

本地开发调试时，可参考[沙箱模拟环境使用说明](https://open.esign.cn/doc/opendoc/dev-guide3/qwnnsb)获取沙箱应用ID。

上线正式使用时，可参考[正式生产环境使用说明](https://open.esign.cn/doc/opendoc/dev-guide3/mezw5n)获取正式应用ID。

准备调用接口时，我们建议开发者先阅读[e签宝公有云API调用说明](https://open.esign.cn/doc/opendoc/dev-guide3/el34xh)了解相关使用说明和注意事项。

:::

:::info
**步骤2：开发者的后端 Web 服务中将【获取JSSDK鉴权票据】接口封装成本地 Web 接口。**

前端 eSignPartner 组件中直接调用e签宝公有云 Open API 接口时需要使用 jsSdkTicket（授权票据）进行鉴权，因此需要开发者先在后端中集成对接【获取JSSDK授权数据】接口，并将接口返回结果传递给开发者的前端，以便 eSignPartner 组件可以获取到 jsSdkTicket（授权票据）。

如何对接，详见[【获取JSSDK授权数据】](https://qianxiaoxia.yuque.com/opendoc/apiv3-ep-guide/gs5yy4)接口文档。

:::

:::info
**步骤3：开发者的前端页面中集成 eSignPartner 组件。**

开发者的前端页面中通过引用 eSignPartner.js 将 eSignPartner 组件集成加载到页面的 <div> 容器中。

具体集成方法详见[【前端 eSignPartner 组件集成说明】](https://qianxiaoxia.yuque.com/opendoc/apiv3-ep-guide/yrrciv)。

:::

:::info
**步骤4：开发者的后端 Web 服务中按需集成电子签名 SaaS API V3 相关接口。**

开发者按照自身业务需求来集成开发e签宝电子签名 SaaS API V3 中相关接口，详见[生态伙伴对接指南-电子合同发起模块](https://qianxiaoxia.yuque.com/opendoc/apiv3-ep-guide/tfb6gn#f6lSw)按需对接。

:::

## 集成对接示例Demo下载
[点击跳转 下载对接示例DEMO下载](https://qianxiaoxia.yuque.com/opendoc/apiv3-ep-guide/sy04y7)

