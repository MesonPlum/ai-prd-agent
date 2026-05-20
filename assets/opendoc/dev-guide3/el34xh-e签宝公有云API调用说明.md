## 本文目录导航指引
_<font style="color:#8C8C8C;">锚点跳转定位可能存在轻微页面滚动偏差，跳转后请上下滚动页面查看。</font>_

[1.基本规则](#M9z9y)

[2.接口请求域名](#JsWHg)

[3.公共请求头格式](#P4p3F)

[4.公共响应参数格式](#lVsi0)

## 1.基本规则
+ e签宝公有云 API 是一套 RESTful Web API，通过标准 HTTP 方法（GET、POST、PUT、DELETE）调用，支持 HTTPS 加密传输。支持 Java、.NET、PHP、Python、Go 等主流开发语言。
+ 所有 API 接口调用请求时<font style="color:#DF2A3F;">必须使用</font> **<font style="color:#DF2A3F;">HTTPS</font>** 协议，发送 HTTPS 请求时所用 JDK/HTTPClient 或其他类库需<font style="color:#DF2A3F;">保证支持</font> **<font style="color:#DF2A3F;">TLS1.2</font>**（安全加密协议）。
+ 所有 API 接口调用请求时必须使用 **UTF8** 字符编码。
+ 无特别声明时，所有 API 接口均使用 **JSON** 进行数据交换。
+ 请不要依赖接口响应参数中的 message 进行业务处理，因为 e签宝可能会对 message 进行文案优化调整，请根据 code 进行业务处理。
+ API 接口中可能在响应中新增 JSON 键值对，开发者需考虑参数兼容性，[点击查看参数容错建议](https://qianxiaoxia.yuque.com/books/share/d58af0dd-fd27-4d17-8d60-04bacabf7b17/hnmqsc)。
+ API 接口入参和出参有可能包含用户输入的信息，为避免 [XSS](https://baike.baidu.com/item/XSS%E6%94%BB%E5%87%BB/954065?fr=aladdin) 攻击，开发者应该对数据进行适当的处理，增强用户输入校验，如使用 [WAF](https://baike.baidu.com/item/WAF/3239498?fr=aladdin) 进行系统防护。
+ 开发者应妥善保管 应用密钥（**AppSecret**） 防止泄露，如上传 [**Github**](https://github.com/) 或 [**Gitee**](https://gitee.com/) 时代码及注释需注意检查是否已删除AppSecret、身份证号、银行卡号等敏感信息。
+ 为保障服务稳定性，e签宝**正式生产环境**禁止进行**性能压测**和**安全渗透测试**。e签宝**沙箱模拟环境**进行性能压测和安全渗透测试时，需先向e签宝技术顾问报备，获得许可后才能进行相关操作。否则，e签宝安全团队有权采取相关措施进行拦截，影响严重时e签宝安全团队将上报网警。

:::warning
<font style="color:#DF2A3F;">若开发者在使用本API过程中未自行对API的调用次数进行合理限制，由此导致的任何安全问题、性能问题、计费问题或遭受攻击的情况，本API提供方不承担任何责任。</font>

:::

## 2.接口请求域名
**API 接口请求地址域名信息如下：**

| **环境** | **域名** | **公网IP** | **端口** |
| --- | :--- | :--- | :--- |
| 正式生产环境 | [https://openapi.esign.cn](https://openapi.esign.cn) | 118.31.181.75 | 443 |
| 沙箱模拟环境 | [https://smlopenapi.esign.cn](https://smlopenapi.esign.cn) | 114.55.17.44 | 443 |


:::info
**<font style="color:#F5222D;">【说明/提示】</font>**

+ 若开发者所处网络需配置防火墙后才可以正常访问互联网资源，除上述域名信息外请结合[e签宝公有云API更多的相关域名](https://qianxiaoxia.yuque.com/books/share/d58af0dd-fd27-4d17-8d60-04bacabf7b17/ggdqzx)并按需进行配置。
+ [**smlopenapi.esign.cn**](https://smlopenapi.esign.cn/)** **下的接口均属于沙箱模拟环境，此环境仅用于开发调试，所签合同文件及认证等操作均不具备法律效力。**<font style="color:#E8323C;">正式上线使用时请务必切换到正式生产环境使用</font>** [**openapi.esign.cn**](https://openapi.esign.cn) **<font style="color:#E8323C;">调用相关接口</font>**。
+ 沙箱模拟环境中所创建的数据不可以直接使用到正式生产环境中，正式上线使用时请注意重新创建相关数据。

:::

## 3.公共请求头格式
#### 3.1 请求签名鉴权方式-请求头格式<font style="color:#F5222D;">（优先推荐使用）</font>
通过请求参数签名鉴权，可以确保API请求是由持有应用密钥（AppSecret ）的开发者发送，还可以防止请求参数在传输中被篡改。

下方请求头格式为**请求签名鉴权方式**，[点击查看请求签名鉴权方式的详细说明](https://qianxiaoxia.yuque.com/books/share/d58af0dd-fd27-4d17-8d60-04bacabf7b17/tggw2e)。

| **参数名称** | **参数**<br/>**类型** | **参数必选** | **参数说明**<br/>**（左右拖动查询完整描述）** |
| --- | :---: | :---: | --- |
| X-Tsign-Open-App-Id | string | 是 | 应用ID，通过[e签宝开放平台](https://open.esign.cn/)获取。<br/>**沙箱模拟**的应用ID获取方式[详见此处](https://qianxiaoxia.yuque.com/books/share/d58af0dd-fd27-4d17-8d60-04bacabf7b17/qwnnsb)。<br/>**正式生产**的应用ID获取方式[详见此处](https://qianxiaoxia.yuque.com/books/share/d58af0dd-fd27-4d17-8d60-04bacabf7b17/mezw5n)。 |
| X-Tsign-Open-Auth-Mode | string | 是 | 接口鉴权方式，请填写固定值 Signature 。 |
| X-Tsign-Open-Ca-Signature | string | 是 | 请求签名值，[点击查看请求签名值计算说明](https://qianxiaoxia.yuque.com/books/share/d58af0dd-fd27-4d17-8d60-04bacabf7b17/tggw2e#LkseX)。 |
| X-Tsign-Open-Ca-Timestamp | string | 是 | 接口调用时的[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)，单位毫秒。<br/>时间戳有效期为15分钟，但建议传入每次接口调用时的当前时间戳。 |
| Accept | string | 是 | 响应数据类型，建议统一填写 */* |
| Content-Type | string | 是 | 请求Body体数据的格式类型<br/>建议填写 application/json; charset=UTF-8<br/>GET 和 DELETE 请求且Body体无数据时，参数值可为""空字符串或不传此参数。 |
| Content-MD5 | string | 否 | 请求Body体数据的 Content-MD5 值，[点击查看 Content-MD5 计算方法](https://open.esign.cn/doc/opendoc/helper/piicat)<br/>GET 和 DELETE 请求且Body体无数据时，此参数可为 ""(空字符串)或不传此参数。 |


#### 3.2 OAuthToken鉴权方式-请求头格式<font style="color:rgb(245, 34, 45);">（不推荐使用）</font>
通过OAuthToken鉴权，可以确保API请求是由持有应用密钥（AppSecret ）的开发者发送，但 Token 访问令牌仅120分钟有效。多次获取 Token 访问令牌会造成旧 Token 访问令牌有效期变为5分钟，若开发者属于分布式部署，同时有多台服务器调用 API 接口时，需要集中管理 Token 访问令牌的获取和共享，确保所有服务器使用的 Token 访问令牌唯一。

因此，e签宝**<font style="color:#E8323C;">不推荐</font>**开发者**<font style="color:#E8323C;">使用 OAuthToken 鉴权方式</font>**调用 API 接口。

下方请求头格式为**OAuthToken鉴权方式**，[点击查看OAuthToken鉴权方式的详细说明](https://qianxiaoxia.yuque.com/books/share/d58af0dd-fd27-4d17-8d60-04bacabf7b17/dvb866)。

| **<font style="color:black;">参数名称</font>** | **<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>**<br/>**（左右拖动查看完整描述）** |
| --- | --- | --- | --- |
| X-Tsign-Open-App-Id | string | 是 | 应用ID，通过[e签宝开放平台](https://open.esign.cn/)获取。 |
| X-Tsign-Open-Token | string | 是 | 通过获取鉴权Token接口返回 |
| Content-Type | string | 是 | application/json; charset=UTF-8 |


## 4.公共响应参数格式
| **<font style="color:black;">参数名称</font>** | | **<font style="color:black;">参数</font>**<br/>**<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>**<br/>**（左右拖动查看完整描述）** |
| --- | --- | --- | --- | --- |
| code | | int32 | 是 | 业务码，0表示成功 |
| message | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message</font><br/><font style="color:#F5222D;"> 匹配，因为 message 可能会调整。</font> |
| data | | object | 否 | 业务数据 |
| <font style="color:#333333;background-color:#FFFFFF;"></font> | <font style="color:#333333;background-color:#FFFFFF;">……</font> | …… | …… | …… |
|  | …… | …… | …… | …… |


:::info
**<font style="color:#E8323C;">【说明/提示】</font>**

+ e签宝可能会对 message 进行文案调整，<font style="color:#E8323C;">请不要根据 message 进行业务逻辑判断</font>。
+ code 非0时代表业务失败或异常，开发者可使用 code 进行业务逻辑判断。
+ 接口调用出现报错时，开发者可通过[错误码查询工具](https://open.esign.cn/tools/error-code)查找错误排查方法。
+ API 接口中可能在响应中新增 JSON 键值对，开发者需考虑参数兼容性，[点击查看参数容错建议](https://qianxiaoxia.yuque.com/books/share/d58af0dd-fd27-4d17-8d60-04bacabf7b17/hnmqsc)。

:::

