# 场景说明
开发者通过内嵌e签宝H5签署/认证页面方式进行APP集成。当用户选择支付宝人脸识别方式进行实名/意愿操作时，用户会从开发者APP跳转到支付宝APP进行人脸识别，刷脸识别通过后，自动返回开发者APP完成本次操作。

# 对接流程图
![](https://cdn.nlark.com/yuque/0/2022/png/447795/1671605507593-dcb9e708-f6f7-4b69-8021-fe56b88fc07a.png)

# <font style="color:rgb(38, 38, 38);">集成对接示例DEMO</font>
**点击下载：**[**App认证和签署内嵌H5对接Demo_V3.zip**](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/App认证和签署内嵌H5对接Demo_V3.zip)**（更新时间：2025年01月21日）**

# 步骤简要说明
**1.后端接口获取签署/认证的H5地址**

:::info
+ 通过接口[【基于文件发起签署】](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42)时，需要字段：<font style="color:#DF2A3F;">availableSignClientTypes</font>（签署终端类型） 传：<font style="color:#DF2A3F;">1</font> （网页端）。
+ 通过接口[【获取签署页面链接】](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd)获取签署H5地址；<font style="color:#DF2A3F;">appScheme</font>字段传入开发者自己的<font style="color:#DF2A3F;">app的scheme地址</font>，demo参考示例值：esign://demo/signBackdemo
+ 通过接口[【获取个人认证&授权页面链接】](https://open.esign.cn/doc/opendoc/auth3/rx8igf)或[【获取机构认证&授权页面链接】](https://open.esign.cn/doc/opendoc/auth3/kcbdu7)获取认证H5地址；<font style="color:#DF2A3F;">appScheme</font>字段传入开发者自己的<font style="color:#DF2A3F;">app的scheme地址</font>，demo参考示例值：esign://demo/realBack

:::

**2.开发者APP webview 加载url**

**3.加载url后显示签署/认证页面（签署需选择印章再提交）**

**4.点击提交后会出现实名/意愿认证界面，选择支付宝人脸识别方式**

**5.跳转到支付宝中进行认证，认证后从支付宝回到开发者APP**

:::info
app通过拦截webview加载的地址进行相关处理：

+ 需要监听url的scheme如果是alipays，要跳到支付宝进行认证；
+ 从支付宝认证结束后从返回的uri里获取对应的地址进行加载，拦截到url的scheme是开发者APP的，通过url上拼接的字段值来获取签署/认证结果。

:::

<font style="color:#DF2A3F;">（详细代码说明可以参考DEMO内文档）</font>

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1730794248576-868f56d5-3840-4aaf-bdbf-81be633dc696.png)



