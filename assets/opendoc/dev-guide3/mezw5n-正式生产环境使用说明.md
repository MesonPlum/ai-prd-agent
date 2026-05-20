:::info
正式生产环境为已上线应用提供服务，开发者要保证正式业务全部切换到e签宝正式环境。

为保障正式环境服务稳定性，请您不要随意在正式环境进行压测及安全攻击。e签宝运维及安全团队监控到来自贵司应用ID异常请求时将采取相关措施以保障服务稳定性，<font style="color:#000000;">影响严重时e签宝安全团队将上报网警。</font>

**<font style="color:#F5222D;">注：以下转正式生产环境操作步骤需要由企业开发者来进行操作。</font>**

:::

### 步骤1：登录并进入e签宝开发者控制台
1、使用e签宝企业账号登录e签宝[开放平台（open.esign.cn）](https://open.esign.cn)。服务上线转正式前请确保已完成[开发者企业的实名认证](https://qianxiaoxia.yuque.com/opendoc/helper/ogfnv9)。

2、登录成功后点击导航栏中的【控制台】进入企业开发者控制台。如下图：

![](https://cdn.nlark.com/yuque/0/2020/png/432598/1597223535465-8e76b482-9ee7-4958-b8f3-6b55054afc28.png)

### 步骤2：正式应用创建
点击【正式服务】-【应用管理】-【我的应用】后，再点击【新建应用】按钮进入“新建应用”页面，填写“应用名称”和 选择“应用类型”后点击“提交”即可。如下图：

<font style="color:#DF2A3F;">注：这里如果没有新建应用的权限，需要提前将版本套餐（例如：SaaS专业版、SaaS高级版、集成版、应用拓展包等包含应用数量的套餐） 生效后才可以新建应用使用：</font>[点击查看 如何生效订购的套餐](https://qianxiaoxia.yuque.com/opendoc/helper/xw5hlihdd1zdrzx9)

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1715420293115-89423f68-531f-4d18-9eb8-b2d354f8cfef.png)

![](https://cdn.nlark.com/yuque/0/2026/png/447795/1767686967752-68786d3c-0eb0-461f-9e35-8138353f9008.png)

:::info
**<font style="color:#F5222D;background-color:#E8F7FF;">说明：</font>**

_**<font style="background-color:#E8F7FF;">应用名称：</font>**__<font style="background-color:#E8F7FF;">请结合自身业务情况填写，建议填写平台或系统名称。当使用e签宝短信服务时，短信中将显示此应用名称。</font>_

_**<font style="background-color:#E8F7FF;">短信内容如：</font>**__<font style="background-color:#E8F7FF;">验证码：123456，您正在某某某进行签署确认……</font>_

:::

### 步骤3：查看已创建正式应用信息
点击【正式服务】-【应用管理】-【我的应用】后在右侧应用列表页面中找到已创建的应用ID所在行，点击行尾的【配置】即可查看正式应用信息。如下图：

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1715419879261-db46731d-1b14-4ce1-bb2c-aef51bddb36b.png)

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1715419972101-25f31899-896c-40b4-aa27-146ce8a16a1a.png)

### 步骤4：添加请求IP白名单
<font style="background-color:transparent;">正式应用创建成功后，必须先将接口请求调用方公网出口IP添加到IP白名单中才可以成功访问、调用API接口。</font>

点击【正式服务】-【应用管理】-【我的应用】后在右侧应用列表页面中，找到当前需要添加IP白名单的应用ID所在行，点击行尾【配置】进入【安全配置】页进行添加。如下图：

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1651157363112-e0e930f3-729e-4e79-8c12-ca30efba131f.png)

![](https://cdn.nlark.com/yuque/0/2023/png/432598/1681185504438-adab47dc-7825-4661-aa3e-5b6c5a2bb59f.png)

![](https://cdn.nlark.com/yuque/0/2023/png/432598/1681190448438-b8480fca-5f92-4057-8f86-1934c83b03c9.png)

:::info
**<font style="color:#DF2A3F;">【说明/提示】</font>**

**限定公网出口 IP：**仅指定的网络运营商（移动、联通和电信）或云服务（阿里云、腾讯云、百度云和华为云）所分配的互联网 IP 才可以与 e签宝服务端进行网络通讯，请添加具体IP地址。

**任意公网出口IP：**如果不清楚公网 IP 信息，紧急情况下可以不限制IP，先添加一个*到 IP 白名单中。

<font style="color:#DF2A3F;">注意：为了保障 API 调用具有双重安全防护，不建议长期配置 * 。</font>

:::

### 步骤5：配置重定向域名白名单
_<font style="color:#DF2A3F;background-color:transparent;">若不存在从e签宝相关页面重定向跳转到贵司相关系统页面的情况，此步骤可忽略。</font>_

<font style="background-color:transparent;">若存在从e签宝相关页面重定向跳转到贵司相关系统页面时，</font>不希望被e签宝外链跳转风控拦截而弹出风险提示页（详见下方示例图）。请点击【应用服务】-【应用管理】-【我的应用】后在右侧应用列表页面中，找到当前需要添加重定向域名白名单的应用ID所在行，点击行尾【配置】进入【安全配置】页进行添加。如下图：

![](https://cdn.nlark.com/yuque/0/2023/png/432598/1681191043110-5cb5cc53-e9d3-4d68-802f-0c023d416997.png)

:::info
域名配置规则详见[重定向域名配置说明](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/umo8rop7dmttkdnv)。

:::

跳转外链风险提示页示例图如下：

![](https://cdn.nlark.com/yuque/0/2023/png/432598/1681191200456-be4e7d6e-9f09-4164-8931-1ace7a19a680.png)

### 步骤6：替换正式应用信息及服务访问地址
企业开发者应该将API集成开发代码中的**应用ID（AppId）**和**应用密钥（AppSecret）**替换成上述步骤3中所查询到的**正式应用信息**。

同时，按照下列信息将**请求域名地址**替换成**正式环境地址**。

|  | **<font style="color:#262626;">请求域名</font>** | **<font style="color:#262626;">公网IP</font>** | **<font style="color:#262626;">端口</font>** |
| :---: | --- | :---: | --- |
| **正式环境** | [https://openapi.esign.cn](https://openapi.esign.cn) | 118.31.181.75 | <font style="color:#262626;background-color:#FFFFFF;">443</font> |
| **沙箱环境** | [https://smlopenapi.esign.cn](https://smlopenapi.esign.cn) | 114.55.17.44 | <font style="color:#262626;background-color:#FFFFFF;">443</font> |


_**注：**__如果贵司有网络安全要求，需要进行安全防火墙配置，那么可以按照上述域名信息及_[_更多e签宝API域名信息_](https://qianxiaoxia.yuque.com/docs/share/f4058d46-08a1-4f07-a869-bc96241a32a4)_配置防火墙。沙箱环境不可用于正式业务。_

### 步骤7：正式套餐如何配置
<font style="color:rgb(0, 0, 0);">电子签名订单上线前，需要提前3天与e签宝工作人员沟通具体业务规划启用计划，以便上线期间及时支持。订单上线之后，</font>**<font style="color:#DF2A3F;">对应订单的有效期正式生效，且套餐不可更改</font>**<font style="color:rgb(0, 0, 0);">，请在订单有效期内使用完毕。</font>  
**<font style="color:#DF2A3F;">提醒尽量在系统全部对接完成或已计划业务正式启用，再操作订单上线。 </font>**

:::info
**自主配置套餐流程：**

+ [点击查看 如何生效订购的套餐](https://qianxiaoxia.yuque.com/opendoc/helper/xw5hlihdd1zdrzx9)
+ [点击查看 SaaS API产品计费模式说明](https://qianxiaoxia.yuque.com/opendoc/helper/glpgv5o3avqkgqo2)<font style="color:#DF2A3F;">（这一步需要应用ID的配置）</font>

:::

