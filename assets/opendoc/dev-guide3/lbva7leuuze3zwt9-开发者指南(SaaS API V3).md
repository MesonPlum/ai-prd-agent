:::info
请各位开发者注意核对所要对接的 API 版本，以免造成不必要的返工。您可向e签宝技术顾问确认 API 版本。

:::

## 对接流程
> **开发者对接流程关键流程节点**
>

![画板](https://cdn.nlark.com/yuque/0/2025/jpeg/447795/1753080331526-aeea1349-b745-4867-a149-2f3a0e6667ea.jpeg)

## 对接节点详细说明
### <font style="background-color:#389E0D;"> </font> 对接启动
:::info
#### 1.企业账号注册实名
:::

:::danger
+ [企业开发者账号注册及实名认证流程](https://qianxiaoxia.yuque.com/opendoc/helper/ogfnv9)；对接前需要对接企业先注册e签宝账号并实名

:::



:::info
#### 2.开发者入驻开放平台
:::

:::danger
+ [带你了解e签宝开放平台](https://qianxiaoxia.yuque.com/opendoc/helper/ge7uhn)；e签宝的开放平台主要面向开发者使用，请阅读文档了解e签宝开放平台
+ [前往e签宝开放平台开发者控制台](https://open.esign.cn/my-apps/home)

:::



:::info
#### 3.沙箱应用创建
:::

:::danger
+ [沙箱模拟环境使用说明](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/qwnnsb)；开发调试前需要先申请对应的测试应用在e签宝沙箱模拟环境下进行调试
+ [如何设置开发者角色权限](https://qianxiaoxia.yuque.com/opendoc/helper/etspg7l01wy74nrm)；开通沙箱需要开发者有对应权限，需要找企业管理员（给企业注册实名的人）开通开发者权限

:::



### <font style="background-color:#389E0D;"> </font> 接入指南
:::info
#### 1.SaaS API V3 对接指南
:::

:::danger
+ [SaaS API V3版对接指南](https://qianxiaoxia.yuque.com/opendoc/apiv3-guide/tfb6gn)；阅读e签宝API对接产品指南，了解接口使用逻辑、接口[时序图](https://qianxiaoxia.yuque.com/opendoc/apiv3-guide/dtsgz1)、[API列表](https://qianxiaoxia.yuque.com/opendoc/apiv3-guide/zkgi4m)等
+ [e签宝SaaS API产品概念说明](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/fvey1bfux7vxtxgp)；阅读API产品概念说明对名词概念以及相关功能有所了解

:::

## 


:::info
#### 2.SaaS API V3 对接讲解视频
:::

:::danger
+ [SaaS API V3 对接讲解视频](https://qianxiaoxia.yuque.com/opendoc/other-docs/srsp8ruvaez296d7)：观看视频了解如何申请开发者测试应用、选择合适的签署服务API文档、以及使用Postman演示调用接口流程

:::

## 
:::info
#### 3.常见场景对接说明
:::

:::danger
+ [常见场景对接说明](https://qianxiaoxia.yuque.com/opendoc/apiv3-guide/al7kcc)；阅读e签宝的常见场景对接文档，了解场景下的展示效果、接口代码逻辑以及<font style="color:#DF2A3F;">小程序</font>、<font style="color:#DF2A3F;">app等</font>端的集成说明

:::



:::info
#### 4.接入助手
:::

:::danger
+ [接入助手](https://open.esign.cn/tools/helper)；根据e签宝开放平台接入助手，填写问卷选择自身场景，生成自己的接口接入方案

:::



### <font style="background-color:#389E0D;"> </font> 接口调试
:::info
#### 1.DEMO下载
:::

:::danger
+ [下载对接示例DEMO](https://qianxiaoxia.yuque.com/opendoc/apiv3-guide/kwsb88)；API接口基础流程的调用演示DEMO（DEMO仅用于参考）

:::



:::info
#### 2.对照API文档开发调试
:::

:::danger
+ [e签宝公有云API调用说明](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/el34xh)
+ [进入签署API文档](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/tv8gsiqwk2z00wwi)；进入到具体的API文档中进行开发（左上方目录栏API文档中可进行其它API文档切换）
+ [在线调试工具](https://open.esign.cn/tools/api-debug?categoryId=10&apiId=18155&platformType=saasapi3)；e签宝提供的接口在线调试工具可以进行测试接口请求

:::



:::info
#### 3.错误码查询等辅助工具
:::

:::danger
+ [错误码查询](https://open.esign.cn/tools/error-code)；调试e签宝接口中遇到报错可以查询报错信息和排查方法
+ [获取上传文件的MD5值](https://open.esign.cn/tools/file-md5)；上传本地文件接口的文件MD5值可以通过工具获取
+ [获取签章位置](https://open.esign.cn/tools/seal-position)；签署接口指定签署区的位置坐标可以通过工具辅助定位

:::



### <font style="background-color:#389E0D;"> </font> 验收上线
:::info
#### 1.正式应用创建
:::

:::danger
+ [正式生产环境使用说明](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/mezw5n)；注意应用配置的IP白名单配置，以及参数配置的特殊配置项配置（例如Logo、微信小程序中间页等）

:::



:::info
#### 2.套餐生效
:::

:::danger
+ [套餐生效步骤](https://qianxiaoxia.yuque.com/opendoc/helper/xw5hlihdd1zdrzx9)；套餐生效前请确保已经购买了对应的e签宝产品套餐
+ [SaaS API产品计费模式说明](https://qianxiaoxia.yuque.com/opendoc/helper/glpgv5o3avqkgqo2)；套餐中如果带分项字样（认证和签署两个套餐），需要单独配置扣费方式：【按单项扣费】 
+ [认证产品子服务开通流程](https://qianxiaoxia.yuque.com/opendoc/helper/anr9xy)；如有购买单独的认证服务，需要开通对应购买的子项（可以全部开通，不使用也不会计费）

:::



