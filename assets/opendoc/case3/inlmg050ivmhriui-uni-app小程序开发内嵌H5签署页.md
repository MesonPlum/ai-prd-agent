## 场景适用说明
:::info
**在开发者的微信小程序中使用uniapp框架内嵌H5签署页，用户完成签署相关操作后重定向回开发者的小程序，可参考本流程进行集成对接。**

:::

:::warning
**<font style="color:#F5222D;">【提示】签署中的认证服务（包括实名认证以及意愿认证）需要使用刷脸，具体对接方法详见文中</font>**[**内嵌H5页签署时刷脸认证集成对接说明**](#I9xLn)

:::

## 集成对接示例DEMO
点击下载：[uniapp微信小程序对接demo.zip](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/uniapp微信小程序对接demo.zip)

## 接入前准备工作及注意事项
### 配置业务域名
微信小程序中规定必须成功配置业务域名后，才可以加载第三方域名下的网页。因此，开发者需要先配置业务域名，具体配置方法详见小程序[配置e签宝OpenAPI业务域名说明](https://open.esign.cn/doc/opendoc/dev-guide3/oyzxrr)。

沙箱模拟环境中也可以[设置不校验业务域名进行开发调试](#Mu9Rn)，正式生产环境中必须设置业务域名。

### 后端接口注意事项
:::warning
（1）该对接文档适用SaaS API V3：[【获取签署页面链接】](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd)接口获取的H5签署链接url进行集成内嵌使用。

+ 后端发起签署入参的重定向地址：**<font style="color:#DF2A3F;">redirectUrl </font>**参数值需要传入固定值 **<font style="color:#DF2A3F;">wechat://back </font>**才能在签署完成后跳回开发者小程序。

（2）只有签署长链接才可以设置小程序业务域名，所有微信小程序中加载签署H5页的链接必须使用e签宝接口返回的**<font style="color:#DF2A3F;">长链接</font>**（即响应参数**<font style="color:#DF2A3F;">url</font>**的值），不能使用短链接（即响应参数shortUrl的值）。

（3）微信小程序中加载签署H5页，出现页面显示空白，可以先排查下签署长链接是否被截断。可从页面跳转 navigateTo 传参的时候，查看签署长链接是否被截断，如果被截断，可用 **<font style="color:#DF2A3F;">encodeURIComponent</font>** (url) 进行处理，防止长链接被截断。

:::

## 内嵌H5页签署集成对接说明
#### H5页签署完成后跳转回微信小程序指定页说明
如果开发者想要实现H5页签署完成后自动跳转回微信小程序，则需要分别在**开发者的后端服务**和**微信小程序端**进行相关代码处理。

##### 1）后端服务代码处理
开发者的后端服务在调用相关接口时，关于重定向地址：**<font style="color:#DF2A3F;">redirectUrl </font>**的逻辑处理

:::info
**重定向跳转逻辑说明：**

+ 重定向地址**<font style="color:#DF2A3F;">redirectUrl</font>**参数值传入固定值**<font style="color:#DF2A3F;">wechat://back</font>**，用户签署完成后自动跳转回开发者的微信小程序。

**e签宝H5签署页 -> 用户操作完成 -> e签宝签署结果页 -> 立即跳转回开发者小程序**

+ 重定向地址**<font style="color:#DF2A3F;">redirectUrl</font>**参数不传或传入""空字符串，用户签署完成后跳转到e签宝签署完成的文件详情页，在此页的左上角点击按钮手动返回到开发者的微信小程序。

**e签宝H5签署页 -> 用户操作完成 -> e签宝签署完成的文件详情页 -> 用户手动点击左上角按钮返回开发者小程序**

:::

##### 2）微信小程序端代码处理
参考示例DEMO中代码进行处理，可实现签署完成后跳转到指定微信小程序页面。  
在webview内嵌页面中新增 @message事件，如下：

```html
 <web-view src="https://smlt.esign.cn/xxx" @message="handleGetMessage" ></web-view>
```

同时在该页面中定义对应的处理方法，用于对接收到的数据进行判断，并进行自身业务处理（比如跳转到指定小程序页面）：

```javascript
handleGetMessage:function(e){
				console.log(e,'进入handleGetMessage方法')
				 if(e.detail.data[0].result == 'success'&& e.detail.data[0].type == 'signdone'){ //进行业务处理
				      wx.navigateTo({
				        url: '../logs/logs' //需重定向到的小程序指定页面地址
				      })
				    }
			}
```

#### ![](https://cdn.nlark.com/yuque/0/2023/png/22781961/1696671879344-5a690bfa-6c8e-4be2-9c80-aeba9ee9e358.png)


### 内嵌H5页签署时刷脸认证集成对接说明
:::info
<font style="color:#DF2A3F;">【注意】</font>

<font style="color:#DF2A3F;">1）仅在签署中实名/意愿时使用刷脸的方式，开发者才需要集成对接以下步骤。只使用其他认证方式（短信认证）则不需要集成对接以下步骤。</font>

<font style="color:#DF2A3F;">2）实名/意愿认证时刷脸方式只能选择微信小程序刷脸，不支持腾讯云和支付宝刷脸方式。</font>

:::

#### 签署时跳转刷脸效果示意图
在开发者小程序web-view内嵌H5签署页中人脸认证方式选择【微信小程序】后，点击【开始刷脸】时将外跳到e签宝上链公证签小程序进行相关刷脸操作，刷脸认证完成后再跳转回开发者微信小程序指定页面。

如下图：  
![](https://cdn.nlark.com/yuque/0/2024/png/447795/1705460577772-b1b6f7e8-6158-45ee-a538-b8626f85f0dc.png)

#### 跳转刷脸页说明
微信小程序上架审核时，对集成人脸识别的小程序主体有严格的行业限制，不符合要求将无法通过审核。

因此在内嵌H5方式集成签署页后，开发者还希望用户可以使用刷脸时，需要特别关注以下事项：

:::info
+ 使用刷脸方式将会外跳到e签宝上链公证签小程序内进行刷脸相关操作。用户刷脸完成后再跳回开发者小程序指定页面。
+ 受小程序web-view组件约束，无法直接跳转外部小程序。因此，开发者需要在小程序中增加一个中间页来负责跳转到e签宝上链公证签小程序。
+ 开发者通过监听onShow，使用uni.redirectTo实现刷脸后跳回小程序指定页面。

:::

##### 1）获取bizToken和redirectUrl参数值
在e签宝实名/意愿页上点击发起刷脸认证时，会携带bizToken和redirectUrl跳转到开发者小程序中间页中。

+ bizToken参数值用于中间页跳转e签宝上链公证签小程序时使用。
+ redirectUrl参数值用于用户刷脸完成之后中间页跳转回开发者小程序指定页时使用。

在pages/middle/index.vue中通过onLoad函数来获取bizToken和redirectUrl参数值。

**核心示例代码如下：**

```javascript
onLoad: function(option) {
    // 设置 bizToken 和 redirectUrl
    this.bizToken = option.bizToken;
    this.redirectUrl = option.redirectUrl;
	this.goFaceDone=false
  }
```

##### 2）跳转刷脸页核心代码逻辑
在pages/middle/index.vue中通过uni.navigateToMiniProgram方法，用于跳转到e签宝上链公证签小程序。

```javascript
uni.navigateToMiniProgram({
  appId: 'wx1cf2708c2de46337',
  path: 'pages/face/index?bizToken=' + this.bizToken,
  success: (res) => {
    // 打开成功

    console.log('跳转成功,this.goFaceDone', this.goFaceDone);
  },
  fail(res) {
    // 打开失败
    console.log(res);
  },
```

:::info
<font style="color:#DF2A3F;">【注意】按小程序规定，用户必须手动进行触发（点击小程序页面上任意位置）才可以进行跳转。因此，开发者的小程序中间页中需要放置一个按钮，引导用户进行点击跳转到e签宝上链公证签小程序。</font>

:::

```html
<template>
  <view class="container">
    <!-- 唤起上链公证签刷脸小程序提示文本 -->
    <view class="btn-content">
      <text>中间页唤起上链公证签刷脸小程序</text>
      <!-- 点击按钮跳转刷脸小程序 -->
      <button type="default" @click="goFaceAuth()">未自动唤起，手动点击跳转刷脸小程序</button>
    </view>
  </view>
</template>

```

##### 3）配置微信小程序刷脸中间页地址
开发者登录[e签宝开放平台](https://open.esign.cn/)配置微信小程序刷脸中间页地址，详见《小程序配置e签宝OpenAPI业务域名说明》中的[步骤4：配置微信小程序刷脸中间页地址](https://open.esign.cn/doc/opendoc/dev-guide3/oyzxrr#LG7PC)。

:::info
<font style="color:#DF2A3F;">【注意】</font>

<font style="color:#DF2A3F;">/pages/middle/index是示例DEMO内的中间页地址，e签宝开放平台配置时请根据实际情况进行修改。</font>

<font style="color:#DF2A3F;">中间页的代码逻辑请参考示例DEMO内的/pages/middle/index.js文件。</font>

:::

##### 4）刷脸完成后跳回小程序指定页
完成刷脸后，公证签小程序会跳回开发者小程序，并携带刷脸结果faceResult。

在pages/middle/index.vue中onShow方法中进行相关业务处理。

如：开发者通过options.referrerInfo.extraData.faceResult拿到刷脸结果，按照获取bizToken和redirectUrl参数值步骤中已获取的redirectUrl参数值通过web-view组件进行重定向跳转到指定页面。

```javascript
onShow: function(option) {
  // 如果已经跳转过了，直接返回

  console.log('this.goFaceDonedddddddddddddddddddddddddddddd',this.goFaceDone)
  if (!this.goFaceDone) {

    this.goFaceAuth() 

  }

  // 自动请求跳转刷脸小程序

  console.log('this.goFaceDoneccccc',this.goFaceDone)


  // 从公证签小程序返回判断刷脸结果
  const options = uni.getEnterOptionsSync();
  console.log('---options', options);
  if (
    options.scene === 1038 &&
    options.referrerInfo.extraData &&
    options.referrerInfo.extraData.faceResult
  ) {
    // 刷脸成功跳转签署页面，并携带重定向地址
    uni.redirectTo({
      url: '/pages/view/index?redirectUrl=' + this.redirectUrl,
      success: () => {},
      fail: (err) => {
        console.log('Failed to navigate back:', err);
      },
    });
  }
}
```

:::color3
<font style="color:#DF2A3F;">【说明】</font>

+ <font style="color:#DF2A3F;">开发者不需要关注faceResult的具体值内容，只需要判断faceResult值是否为空即可。</font>
+ <font style="color:#DF2A3F;">faceResult值不为空时，使用web-view组件进行重定向跳转。</font>
+ <font style="color:#DF2A3F;">用户直接退出上链公证签小程序时，faceResult值为空。当faceResult值为空时，不需做相关业务处理。</font>

:::

## 附录
### 设置不校验业务域名进行开发调试
在e签宝沙箱模拟环境中进行开发调试时，也可在开发者模式下设置不校验业务域名的方式进行微信小程序调试。【设置】->【项目设置】->【本地设置】界面中勾选“不校验合法域名、web-view(业务域名)、TLS版本以及HTTPS证书”，如下图：

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1669966972431-e698beee-72b5-443a-9c39-97fd6fd25937.png)

### 签署中刷脸认证内部流转图
![](https://cdn.nlark.com/yuque/0/2021/png/447795/1626692362927-7d7aeabb-18d8-49db-b7f6-968c46d55ee6.png)

**<font style="color:#1890FF;"><此图中的客户小程序即为开发者的小程序></font>**

