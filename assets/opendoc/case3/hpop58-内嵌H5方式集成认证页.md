## 场景适用说明
:::info
**在开发者的微信小程序中直接内嵌H5认证页，用户完成认证相关操作后重定向回开发者的小程序，可参考本流程进行集成对接。**

:::

:::warning
**<font style="color:#F5222D;">【提示】如果认证需要使用刷脸方式需要使用此种方式。具体见文中：</font>**[**内嵌H5页刷脸方式集成对接说明**](#DiVuX)

:::

## 集成对接示例DEMO
点击下载：[esign-wxmini-demo-v3.zip](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/esign-wxmini-demo-v3.zip)，请参照DEMO中的**场景二**进行集成对接。

## 接入前准备工作及注意事项
### 配置业务域名
微信小程序中规定必须成功配置业务域名后，才可以加载第三方域名下的网页。因此，开发者需要先配置业务域名，具体配置方法详见[小程序配置e签宝OpenAPI业务域名说明](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/oyzxrr)。

沙箱模拟环境中也可以[设置不校验业务域名进行开发调试](#Mu9Rn)，正式生产环境中必须设置业务域名。

### 后端接口注意事项
:::warning
（1）该对接文档适用SaaS API V3：[【获取个人认证&授权页面链接】](https://open.esign.cn/doc/opendoc/auth3/rx8igf)或[【获取机构认证&授权页面链接】](https://open.esign.cn/doc/opendoc/auth3/kcbdu7)接口获取的H5认证授权链接authUrl进行内嵌集成使用。

+ 后端发起认证授权的入参重定向地址：**<font style="color:#DF2A3F;">redirectUrl </font>**参数值需要传入固定值 **<font style="color:#DF2A3F;">wechat://back </font>**才能在认证授权完成后跳回开发者小程序。

（2）只有长链接才可以设置小程序业务域名，所有微信小程序中加载认证H5页的链接必须使用e签宝接口返回的**<font style="color:#DF2A3F;">长链接</font>**（即响应参数**<font style="color:#DF2A3F;">authUrl</font>**的值），不能使用短链接（即响应参数authShortUrl的值）。

（3）微信小程序中加载认证H5页，出现页面显示空白，可以先排查下认证长链接是否被截断。可从页面跳转 navigateTo 传参的时候，查看认证长链接是否被截断，如果被截断，可用 **<font style="color:#DF2A3F;">encodeURIComponent</font>** (url) 进行处理，防止长链接被截断。

:::

## 内嵌H5页认证集成对接说明
<font style="color:#DF2A3F;">【说明】请参照DEMO中的</font>**<font style="color:#DF2A3F;">场景二</font>**<font style="color:#DF2A3F;">进行集成对接。</font>场景二示例代码位置如下图：

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1671084326501-47885790-7a03-4829-88f7-5549de3efef8.png)

#### H5页认证完成后跳转回微信小程序指定页说明
如果开发者想要实现H5页认证完成后自动跳转回微信小程序，则需要分别在开发者的后端服务和微信小程序端进行相关代码处理。

##### 1）后端服务代码处理
开发者的后端服务在调用相关接口时，重定向地址**<font style="color:#DF2A3F;">redirectUrl</font>**参数值需要传入固定值**<font style="color:#DF2A3F;">wechat://back</font>**。

:::info
**重定向跳转逻辑说明：**

+ 重定向地址**<font style="color:#DF2A3F;">redirectUrl</font>**参数值传入固定值**<font style="color:#DF2A3F;">wechat://back</font>**，认证完成后自动跳转回开发者的微信小程序。

**e签宝H5认证页 -> 用户操作完成 -> e签宝认证结果页 -> 立即跳转回开发者小程序**

+ 重定向地址**<font style="color:#DF2A3F;">redirectUrl</font>**参数不传或传入""空字符串，认证完成后需要用户在结果页的左上角点击按钮手动返回到开发者的微信小程序。

**e签宝H5认证页 -> 用户操作完成 -> e签宝认证结果页 -> 用户手动点击左上角按钮返回开发者小程序**

:::

##### 2）微信小程序端代码处理
参考示例DEMO中代码进行处理，可实现认证完成后跳转到指定微信小程序页面。

**代码处理如下：**

在pages/webview/index.wxml中添加bindmessage属性

```javascript
<web-viewsrc="{{src}}" bindmessage="handleGetMessage"></web-view>
```

在pages/webview/index.js中新增handleGetMessage方法，对返回结果进行判断，若返回结果值为success则跳转到指定的微信小程序页面（如pages/redirect/bizpage）

```javascript
handleGetMessage:function(e){
  console.log('ddd',e)
  if(e.detail.data[0].result=='success'){
    wx.navigateTo({
       url:'/pages/redirect/bizpage'
    })
  }
},
```

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1650530054919-5f662e21-19b1-46f4-b312-edb925514f9a.png)

**接收到的数据示例：**

**授权认证模式：**

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1663135744401-1d0d4ef7-91f2-4c2a-ae2b-a270b9f4b597.png)

**实名认证模式：**

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1663135772670-c527c8a9-cf25-4cd7-ab52-dbb1e6957799.png)

## 内嵌H5页刷脸方式集成对接说明
:::warning
**<font style="color:#F5222D;">【注意】</font>**

**<font style="color:#F5222D;">只有认证中使用刷脸的方式才需要接入以下步骤，如果只使用短信认证方式则不需要接入。</font>**

:::

#### 认证时跳转刷脸效果示意图
在开发者小程序web-view内嵌H5认证页中人脸认证方式选择【微信小程序】后，点击【开始刷脸】时将外跳到e签宝上链公证签小程序进行相关刷脸操作，刷脸认证完成后再跳转回开发者微信小程序指定页面。

如下图：

![](https://cdn.nlark.com/yuque/0/2021/png/447795/1626692392828-55c76135-814e-4350-9434-b6105bd3cd41.png)

#### 跳转刷脸页说明
微信小程序上架审核时，对集成人脸识别的小程序主体有严格的行业限制，不符合要求将无法通过审核。

因此在内嵌H5方式集成认证页后，开发者还希望用户可以使用刷脸时，需要特别关注以下事项：

:::info
+ 使用刷脸方式将会外跳到e签宝上链公证签小程序内进行刷脸相关操作。用户刷脸完成后再跳回开发者小程序指定页面。
+ 受小程序web-view组件约束，无法直接跳转外部小程序。因此，开发者需要在小程序中增加一个中间页来负责跳转到e签宝上链公证签小程序。
+ 开发者通过监听wx.navigateBackMiniProgram实现刷脸后跳回小程序指定页面。

:::

##### 1）获取bizToken和redirectUrl参数值
在e签宝认证页上点击发起刷脸认证时，会携带**bizToken**和**redirectUrl**跳转到开发者小程序中间页中。

+ **bizToken**参数值用于中间页跳转e签宝上链公证签小程序时使用。
+ **redirectUrl**参数值用于用户刷脸完成之后中间页跳转回开发者小程序指定页时使用。

在pages/middle/index.js中通过onLoad来获取bizToken和redirectUrl参数值。

核心示例代码如下：

```javascript
  onLoad(e) {
    console.log('---middle onLoad', e)
    this.setData(
      {
        bizToken: e.bizToken,
        redirectUrl: decodeURIComponent(e.redirectUrl),
      },
      this.goFaceAuth
    )
  },
```

##### 2）跳转刷脸页核心代码逻辑
在pages/middle/index.js中通过wx.navigateToMiniProgram方法，用于跳转到e签宝上链公证签小程序。

核心示例代码如下：

```javascript
wx.navigateToMiniProgram({
  appId: 'wx1cf2708c2de46337', // 公证签小程序APPID
  path: `/pages/face/index?bizToken=${bizToken}`, // 刷脸页面地址
  ...
})
```

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1671144461311-717e0c73-2ebe-46fd-bc6d-90b2bbe2f7af.png)

:::color3
**<font style="color:#DF2A3F;">【注意】按小程序规定，用户必须手动进行触发（点击小程序页面上任意位置）才可以进行跳转。因此，开发者的小程序中间页中需要放置一个按钮，引导用户进行点击跳转到e签宝上链公证签小程序。</font>**

:::

```xml
<!--index.wxml-->
<view class="container">
  <view class="loading-content">
    <view class="image-content">
      <image src="/assets/loading.svg" class="image"></image>
    </view>
    <view class="loading-tect-content">
      <text class="loading-text">加载中</text>
    </view>
  </view>
  <view class="btn-content">
    <text>如未成功跳转，</text>
    <text class="btn-click" bindtap="goFaceAuth">点击此处</text>
    <text>手动跳转</text>
  </view>
</view>
```

##### 3）配置微信小程序刷脸中间页地址
开发者登录[e签宝开放平台](https://open.esign.cn/)配置微信小程序刷脸中间页地址，详见《小程序配置e签宝OpenAPI业务域名说明》中的[步骤4：配置微信小程序刷脸中间页地址](https://open.esign.cn/doc/opendoc/dev-guide3/oyzxrr#LG7PC)。

:::warning
**<font style="color:#F5222D;">【注意】</font>**

+ **<font style="color:#F5222D;">/pages/middle/index是</font>****<font style="color:#F5222D;">示例DEMO内的中间页地址，e签宝开放平台配置时请根据实际情况进行修改。</font>**
+ **<font style="color:#F5222D;">中间页的代码逻辑请参考示例DEMO内的</font>****<font style="color:#F5222D;">/pages/middle/index.js文件。</font>**

:::

##### 4）刷脸完成后跳回小程序指定页
完成刷脸后，公证签小程序会通过wx.navigateBackMiniProgram跳回开发者小程序，并携带刷脸结果**faceResult**。

在pages/middle/index.js中onShow方法中进行相关业务处理。

如：开发者通过**<font style="background-color:#E8F7CF;">options.referrerInfo.extraData.faceResult</font>**拿到刷脸结果，按照[获取bizToken和redirectUrl参数值](#aEAtQ)步骤中已获取的**redirectUrl参数值**通过web-view组件进行重定向跳转到指定页面。

核心示例代码如下：

```javascript
onShow() {
    console.log('---middle onShow')
    const { goFaceDone, redirectUrl } = this.data
    // 防止从实名/意愿页进入后直接返回
    if (!goFaceDone) return

    // 如果已经跳转过，重置
    this.setData({
      goFaceDone: false,
    })

    // getEnterOptionsSync 方法从基础库 2.9.4 开始支持，低版本需做兼容处理
    const options = wx.getEnterOptionsSync()
    console.log('---options', options)
    // 从公证签小程序返回
    if (options.scene === 1038 && options.referrerInfo.extraData && options.referrerInfo.extraData.faceResult) {
      const pages = getCurrentPages()
      const pre = pages[pages.length - 2]
      // 重新加载实名页面
      if (pre.reloadPage && typeof pre.reloadPage === 'function') {
        pre.reloadPage(redirectUrl + `&timeStamp=${new Date().getTime()}`)
        wx.navigateBack({
          delta: 1,
        })
      }
    }
  }
```

:::warning
**<font style="color:#F5222D;">【说明】</font>**

+ **<font style="color:#F5222D;">开发者不需要关注faceResult的具体值内容，只需要判断faceResult值是否为空即可。</font>**
+ **<font style="color:#F5222D;">faceResult值不为空时，使用web-view组件进行重定向跳转。</font>**
+ **<font style="color:#F5222D;">用户直接退出上链公证签小程序时，faceResult值为空。当faceResult值为空时，不需做相关业务处理。</font>**

:::

web-view组件重定向跳转方法，可参考示例DEMO内pages/webview/index.js文件中reloadPage方法，核心示例代码如下：

```javascript
  // 刷脸完成后重新加载实名页面
  reloadPage(redirectUrl) {
    console.log('---webview reloadPage', redirectUrl)
    this.setData({
      src: redirectUrl,
    })
  }
```

## 附录
### 设置不校验业务域名进行开发调试
在e签宝沙箱模拟环境中进行开发调试时，也可在开发者模式下设置不校验业务域名的方式进行微信小程序调试。【设置】->【项目设置】->【本地设置】界面中勾选“不校验合法域名、web-view(业务域名)、TLS版本以及HTTPS证书”，如下图：

### ![](https://cdn.nlark.com/yuque/0/2022/png/432598/1669966972431-e698beee-72b5-443a-9c39-97fd6fd25937.png)刷脸认证内部流转图
![](https://cdn.nlark.com/yuque/0/2022/png/447795/1671619529653-a67e196d-35be-4cb8-9934-2e13cdd37b51.png)

**<font style="color:#1890FF;"><此图中的客户小程序即为贵司小程序></font>**

