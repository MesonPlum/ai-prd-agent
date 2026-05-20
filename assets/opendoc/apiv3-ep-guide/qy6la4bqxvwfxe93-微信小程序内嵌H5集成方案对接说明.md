## 场景说明
:::info
**在开发者的微信小程序中内嵌e签宝H5页面，用户完成相关操作后回到开发者小程序。**

:::

## 接入前准备工作及注意事项
### 配置业务域名
微信小程序中规定必须成功配置业务域名后，才可以加载第三方域名下的网页。因此，开发者需要先配置业务域名，具体配置方法详见[小程序配置e签宝OpenAPI业务域名说明](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/oyzxrr)。

沙箱模拟环境中也可以[设置不校验业务域名进行开发调试](#Mu9Rn)，正式生产环境中必须设置业务域名。

## 内嵌H5页集成对接说明
### 对接示例DEMO参考
点击下载：[esign-wxmini-demo-ep.zip](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/esign-wxmini-demo-ep.zip)

### 开发者小程序与e签宝小程序交互说明
用户操作过程中如果使用到认证授权中的**<font style="color:#DF2A3F;">刷脸</font>**方式或者购买套餐的**<font style="color:#DF2A3F;">购买页</font>**跳转时，需要跳转到e签宝小程序中操作。

由于，小程序web-view组件能力限制，无法实现直接跳转到第三方小程序。因此，当页面上发起刷脸或者套餐购买时，需要先跳转到开发者的小程序中间页，再由开发者的小程序中间页跳转到e签宝小程序。

:::warning
**<font style="color:#DF2A3F;">【注意】</font>**

**<font style="color:#DF2A3F;">1）开发者的小程序中间页地址，需要自主登录</font>**[e签宝开放平台](https://open.esign.cn/)**<font style="color:#DF2A3F;">，对应用ID进行配置，具体配置方法详见</font>**[配置微信小程序刷脸中间页地址](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/oyzxrr#LG7PC)。

+ **<font style="color:#DF2A3F;">DEMO内的中间页地址为：</font>****<font style="color:#DF2A3F;">/pages/middle/index</font>**

**<font style="color:#DF2A3F;">2）按小程序规定，用户必须手动进行触发（点击小程序页面上任意位置）才可以进行跳转。因此，开发者的小程序中间页中需要放置一个按钮，引导用户进行点击跳转到e签宝小程序。</font>**

:::

#### 开发者中间页点击按钮跳至e签宝小程序代码
刷脸是跳转到e签宝合作的公证签小程序中操作，套餐购买是跳转到e签宝官网小程序中操作。

**<font style="color:#DF2A3F;">（DEMO参考：/pages/middle/index.js文件）</font>**

```javascript
onLoad(e) {
    console.log('---middle onLoad', e)
    if(e.payUrl){
      this.isFromPay = true
      this.setData(
        {
          payUrl:e.payUrl,
        },
        this.goOrder
      )
    }else{
      this.setData(
        {
          bizToken: e.bizToken,
          redirectUrl: decodeURIComponent(e.redirectUrl),
        },
        this.goFaceAuth
      )
    }
    
  },
  retryGo(){
    this.isFromPay ? this.goOrder() : this.goFaceAuth()
  },
  goOrder(e){
    const { payUrl } = this.data
    wx.navigateToMiniProgram({
      appId: 'wx77341f904ba02693', // e签小程序APPID
      path: decodeURIComponent(payUrl), // e签宝小程序下单页地址
    })
  },
  goFaceAuth(e) {
    const { bizToken } = this.data

    wx.navigateToMiniProgram({
      appId: 'wx1cf2708c2de46337', // 公证签小程序APPID
      path: `/pages/face/index?bizToken=${bizToken}`, // 刷脸页面地址
    })
  }
```

**小程序在短时间内拉起同一个小程序，需要用户手动点击**

**<font style="color:#DF2A3F;">（DEMO参考：/pages/middle/index.wxml文件）</font>**

```xml
<view class="btn-content">
    <text>如未成功跳转，</text>
    <text class="btn-click" bindtap="retryGo">点击此处</text>
    <text>手动跳转</text>
</view>
```

#### 跳回开发者小程序
开发者小程序检查到是e签宝小程序返回场景（刷脸场景会携带刷脸结果参数-faceResult），则页面回退到上一页（即 webview）且重新加载 redirectUrl。

**<font style="color:#DF2A3F;">（DEMO参考：/pages/middle/index.js文件）</font>**

```javascript
onShow() {
    const { redirectUrl } = this.data

    // getEnterOptionsSync 方法从基础库 2.9.4 开始支持，低版本需做兼容处理
    const options = wx.getEnterOptionsSync()

    // 从公证签小程序返回或者从e签宝小程序下单页返回
    if (options.scene === 1038 && options.referrerInfo.extraData && (options.referrerInfo.extraData.faceResult || options.referrerInfo.extraData.redirectUrl)) {
      const realRedirectUrl = redirectUrl || decodeURIComponent(options.referrerInfo.extraData.redirectUrl)
      const pages = getCurrentPages()
      const pre = pages[pages.length - 2]
      // 重新加载重定向地址页面
      if (pre.reloadPage && typeof pre.reloadPage === 'function') {
        pre.reloadPage(realRedirectUrl + `&timeStamp=${new Date().getTime()}`)
        wx.navigateBack({
          delta: 1,
        })
      }
    }
  }
```

**<font style="color:#DF2A3F;">（DEMO参考：/pages/webview/index.js文件）</font>**

```javascript
reloadPage(redirectUrl) {
    console.log('---webview reloadPage', redirectUrl)
    this.setData({
      src: redirectUrl,
    })
  }
```

**用户刷脸流程截图**

![](https://cdn.nlark.com/yuque/0/2021/png/447795/1626692392828-55c76135-814e-4350-9434-b6105bd3cd41.png)

## 附录
### 设置不校验业务域名进行开发调试
在e签宝沙箱模拟环境中进行开发调试时，也可在开发者模式下设置不校验业务域名的方式进行微信小程序调试。【设置】->【项目设置】->【本地设置】界面中勾选“不校验合法域名、web-view(业务域名)、TLS版本以及HTTPS证书”，如下图：

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1669966972431-e698beee-72b5-443a-9c39-97fd6fd25937.png)

