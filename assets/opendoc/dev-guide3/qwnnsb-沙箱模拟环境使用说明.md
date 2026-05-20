:::info
<font style="color:#000000;">沙箱模拟环境用于开发者进行接口开发、调试，沙箱应用仅可以在沙箱模拟环境中调用。</font><font style="color:#000000;background-color:transparent;">为保障沙箱环境服务稳定性，请您不要随意进行压力测试及安全攻击。如需，请先联系e签宝工作人员进行报备申请，否则e签宝运维及安全团队有权禁用异常应用或IP的请求来保障服务稳定性，影响严重时e签宝安全团队将上报网警。</font>

**<font style="color:rgb(223, 42, 63);">【注】</font>****<font style="color:#F5222D;">：</font>**

+ <font style="color:#F5222D;">沙箱环境中所产生的数据及操作仅用于接口联调测试，所签署文件不具法律效力，不可用于正式业务。</font>
+ <font style="color:#F5222D;">如需转到正式生成环境使用（正式环境上线），开发者需提前2-3天向e签宝工作人员报备上线计划，以便e签宝工作人员做上线引导。</font>

:::

### 步骤1：登录并进入e签宝开发者控制台
1、使用登录e签宝[开放平台（open.esign.cn）](https://open.esign.cn)。沙箱环境开通前请确保已完成[开发者企业的实名认证](https://qianxiaoxia.yuque.com/opendoc/helper/ogfnv9)。

**<font style="color:#DF2A3F;">特别说明：</font>**沙箱环境的应用ID是通过【正式开放平台（open.esign.cn）】里面的【沙箱服务】来开通创建的。

2、登录成功后点击导航栏中的【控制台】进入企业开发者控制台。如下图：

![](https://cdn.nlark.com/yuque/0/2020/png/432598/1597223535465-8e76b482-9ee7-4958-b8f3-6b55054afc28.png)

### 步骤2：沙箱环境开通
如果您已开通沙箱环境（或非首次创建沙箱应用），可忽略此步骤。

进入e签宝开发者控制台，页面上方先选择【沙箱服务】，然后在页面下方点击【立即开通】按钮来开通沙箱环境。如下图：

![](https://cdn.nlark.com/yuque/0/2023/png/432598/1681189945947-c7318546-e160-4d65-95b4-fef26b8e72b5.png)

### 步骤3：沙箱应用创建
点击【沙箱服务】-【沙箱应用】-【我的应用】后，再点击【新建应用】按钮进入“新建应用”页面，填写“应用名称”并选择对应“接入服务”即可。如下图：

![](https://cdn.nlark.com/yuque/0/2023/png/432598/1681190023087-debb3b5a-9a5c-44fc-a477-e7248a3425ac.png)

![](https://cdn.nlark.com/yuque/0/2026/png/447795/1767686967752-68786d3c-0eb0-461f-9e35-8138353f9008.png)

:::info
**<font style="color:#F5222D;background-color:#E8F7FF;">说明：</font>**

_**<font style="background-color:#E8F7FF;">应用名称：</font>**__<font style="background-color:#E8F7FF;">请结合自身业务情况填写，建议填写平台或系统名称。当使用e签宝短信服务时，短信中将显示此应用名称。</font>_

_**<font style="background-color:#E8F7FF;">短信内容如：</font>**__<font style="background-color:#E8F7FF;">验证码：123456，您正在某某某进行签署确认……</font>_

:::

### 步骤4：查看已创建沙箱应用信息
点击【沙箱服务】-【沙箱应用】-【我的应用】后在右侧应用列表页面中查看到应用ID（App Id）和应用Secret（App Secret），用于API接口调用。如下图：

![](https://cdn.nlark.com/yuque/0/2023/png/432598/1681190139858-3613a3e9-8a31-4b44-9f2b-2e4927979807.png)

### 步骤5：添加请求IP白名单
<font style="background-color:transparent;">沙箱应用创建成功后，必须先将接口请求调用方公网出口IP添加到IP白名单中才可以成功访问、调用API接口。</font>

点击【沙箱服务】-【沙箱应用】-【我的应用】后在右侧应用列表页面中，找到当前需要添加IP白名单的应用ID所在行，点击行尾【配置】进入【安全配置】页进行添加。如下图：

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1651156389793-d2f058b6-fed4-4575-877d-5b1b58048aab.png)

![](https://cdn.nlark.com/yuque/0/2023/png/432598/1681190277526-46c9cfec-d567-46d1-b37f-f0db81548ff9.png)

![](https://cdn.nlark.com/yuque/0/2023/png/432598/1681190462764-499476ab-7f0d-4c1e-b76c-860e58bd34a8.png)

:::info
**<font style="color:#DF2A3F;">【说明/提示】</font>**

**限定公网出口 IP：**仅指定的网络运营商（移动、联通和电信）或云服务（阿里云、腾讯云、百度云和华为云）所分配的互联网 IP 才可以与 e签宝服务端进行网络通讯，请添加具体IP地址。

**任意公网出口IP：**如果不清楚公网 IP 信息，紧急情况下可以不限制IP，先添加一个*到 IP 白名单中。

<font style="color:#DF2A3F;">注意：为了保障 API 调用具有双重安全防护，不建议长期配置 * 。</font>

:::

_**注：**__如果贵司有网络安全要求，需要进行安全防火墙配置，那么可以按照下述域名信息及_[_e签宝公有云API更多的相关域名信息_](https://qianxiaoxia.yuque.com/docs/share/f4058d46-08a1-4f07-a869-bc96241a32a4)_来配置防火墙。注意：沙箱环境不可用于正式业务。_

|  | **<font style="color:#262626;">请求域名</font>** | **<font style="color:#262626;">公网IP</font>** | **<font style="color:#262626;">端口</font>** |
| :---: | --- | :---: | --- |
| **正式环境** | [https://openapi.esign.cn](https://openapi.esign.cn) | 118.31.181.75 | <font style="color:#262626;background-color:#FFFFFF;">443</font> |
| **沙箱环境** | [https://smlopenapi.esign.cn](https://smlopenapi.esign.cn) | 114.55.17.44 | <font style="color:#262626;background-color:#FFFFFF;">443</font> |


### 步骤6：配置重定向域名白名单
_<font style="color:#DF2A3F;background-color:transparent;">若不存在从e签宝相关页面重定向跳转到贵司相关系统页面的情况，此步骤可忽略。</font>_

<font style="background-color:transparent;">若存在从e签宝相关页面重定向跳转到贵司相关系统页面时，</font>不希望被e签宝外链跳转风控拦截而弹出风险提示页（详见下方示例图）。请点击【应用服务】-【应用管理】-【我的应用】后在右侧应用列表页面中，找到当前需要添加重定向域名白名单的应用ID所在行，点击行尾【配置】进入【安全配置】页进行添加。如下图：

![](https://cdn.nlark.com/yuque/0/2023/png/432598/1681191043110-5cb5cc53-e9d3-4d68-802f-0c023d416997.png)

:::info
域名配置规则详见[重定向域名配置说明](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/umo8rop7dmttkdnv)。

:::

跳转外链风险提示页示例图如下：

![](https://cdn.nlark.com/yuque/0/2023/png/432598/1681191200456-be4e7d6e-9f09-4164-8931-1ace7a19a680.png)

### 沙箱应用余额/次数不足时如何充值
沙箱服务开通时，e签宝自动为其配置一定金额/次数的免费调试套餐，以便接口调试。如接口调试时出现余额/次数不足时请将应用ID（App Id）和所调用的产品名称一同告知e签宝工作人员<font style="color:rgb(38, 38, 38);">，可申请获取免费调试套餐。</font><font style="color:rgb(38, 38, 38);">  
</font><font style="color:rgb(38, 38, 38);">  
</font><font style="color:rgb(38, 38, 38);">  
</font><font style="color:rgb(38, 38, 38);">  
</font>

  


