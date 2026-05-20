## 场景说明
:::info
**在开发者的微信小程序中跳转到e签宝****<font style="color:#DF2A3F;">上链公证签小程序</font>****内加载签署/认证授权页，用户完成相关操作后再跳回开发者的小程序，可参考本流程。**

:::

:::warning
**<font style="color:#DF2A3F;">【提示】</font>****该对接方式是直接跳转到e签宝上链公证签小程序做的签署/认证授权，无需与H5页面通信，无需放行业务域名，对接流程相对简单。****<font style="color:#DF2A3F;">（签署有e签宝登录页，暂不支持免登）</font>**

:::

## 后端开发如何传参数？
### 1.后端发起签署字段说明
**点击查看接口文档：**[**【基于文件发起签署】**](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/su5g42)

重定向地址 **<font style="color:rgb(153, 51, 0);">redirectUrl </font>**需要传入固定值：**<font style="color:rgb(153, 51, 0);">wechat://back</font>**

**重定向跳转逻辑：**

重定向地址传入(**<font style="color:rgb(153, 51, 0);">wechat://back</font>**),   =>  签署/认证授权完成会自动回到贵司小程序

重定向地址不传  =>   签署/认证授权完成到结果页  => 左上角手动返回到贵司小程序

### 2.记录与传递参数
#### 签署场景：
后端接口发起签署后拿到签署流程ID：**<font style="color:rgb(153, 51, 0);">signFlowId </font>**，以及指定的签署人/经办人账号ID：**<font style="color:rgb(153, 51, 0);">psnId </font>**传给微信小程序端。

:::warning
**<font style="color:#DF2A3F;">【注】</font>**开发者如用 **psnAccount** （手机号或邮箱）发起的签署，可以调用查询接口：[**【查询签署流程详情】**](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xxk4q6)，根据**signFlowId **查询用户 **psnId** 。

:::

#### 认证授权场景：
**点击查看接口文档：**[**【获取个人认证&授权页面链接】**](https://open.esign.cn/doc/opendoc/auth3/rx8igf)**或**[**【获取机构认证&授权页面链接】**](https://open.esign.cn/doc/opendoc/auth3/kcbdu7)

后端接口发起认证授权后拿到认证授权流程ID：**<font style="color:rgb(153, 51, 0);">authFlowId </font>**传给微信小程序端。

## 微信小程序demo
点击下载：[esign-wxmini-demo-v3.zip](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/esign-wxmini-demo-v3.zip)，请参照DEMO中的**场景一**进行集成对接。

## 微信小程序端接入流程
### 1.唤起“e签宝上链公证签”小程序完成签署/认证授权
关于微信小程序获取后端接口的传参：

+ **flowId**和**accountId**需要按照文档上方描述，后端接口获取。
+ **type**根据场景选择，签署场景：**<font style="color:rgb(153, 51, 0);">SIGN</font>**，认证授权场景：**<font style="color:rgb(153, 51, 0);">AUTH</font>**。
+ **env**根据当前使用环境选择，沙箱环境为：**<font style="color:rgb(153, 51, 0);">sml</font>**，正式环境为：**<font style="color:rgb(153, 51, 0);">prod</font>**。

```javascript
wx.navigateToMiniProgram({
      appId: 'wx1cf2708c2de46337', // 公证签小程序APPID
      path: '/pages/index/index', // webview页面地址
      extraData: {
        // 入参
        requestObj: {
          flowId, // 签署：signFlowId，认证授权：authFlowId
          accountId, // 个人账号ID（即：psnId ，仅签署需要）
          type, // 业务类型：签署 SIGN（默认）, 认证授权 AUTH
          env, // 环境，沙箱环境为：sml，正式环境为：prod
          group, // 项目环境分组标识，开发者可忽略
        },
        // 回传数据：签署/授权认证完成后会将此数据完整回传
        callbackObj: {
          from:'esign',
          flag:'某个开发者自定义的唯一标识，如业务编号'
        },
      },
      envVersion:'release',// 仅针对开发或体验版有效，线上无效
      success(res) {
        // 根据客户自身需要
      },
      fail(res) {
        // 根据客户自身需要
      },
      complete(res) {
        // 根据客户自身需要
      },
    })
```

### 2.用户操作完成后“e签宝上链公证签”小程序会使用以下方式跳回贵司自己的小程序
```javascript
wx.navigateBackMiniProgram({
  extraData: {
    isSuccess: true, // 签署/认证授权是否成功，true/false
    msg: 'success',// message，成功 success，失败 fail
    callbackObj: { // 回传之前传入的数据（自定义）  
      from:'esign',
      flag:'某个开发者自定义的唯一标识，如业务编号'
  }
}
})
```

#### 接收到的数据示例：
![](https://cdn.nlark.com/yuque/0/2022/png/447795/1650531768588-637883dd-ae08-4f45-84a5-1d63d362cb31.png)

贵司小程序在 **onShow** 方法中可接收到上链公证签小程序返回的 extraData 数据，从而完成后续业务逻辑。

:::warning
<font style="color:#F5222D;">注意：默认操作完成后跳回贵司自己的小程序的页面为跳转“上链公证签”小程序前的贵司的初始页面，如果想要签署/认证授权完成跳到贵司小程序指定页面可以用以下方式：</font>

<font style="color:#F5222D;">（</font><font style="color:#F5222D;">1</font><font style="color:#F5222D;">）可以在跳转前设置自定义数据</font><font style="color:#F5222D;">callbackObj</font><font style="color:#F5222D;">，用于后续判断跳回小程序的来源。</font>

<font style="color:#F5222D;">（2）跳回小程序时，会触发onShow方法，在该方法中做逻辑判断，确定来源后，进行跳转到指定页面。</font>

:::

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1650531966124-859844ae-2226-4a6c-a6c3-8276b97b229a.png)



**onShow方法代码示例：**

```javascript
onShow: function (options) {
    console.log(options,'options');
    let result = '';
    let flag = '';
    // 接收 公证签小程序 返回的数据
    if( typeof options.referrerInfo.extraData != 'undefined' ){
       result = options.referrerInfo.extraData.isSuccess;
      if(options.referrerInfo.extraData.callbackObj != undefined 
        && options.referrerInfo.extraData.callbackObj.from !='undefined' 
        && options.referrerInfo.extraData.callbackObj.from == 'esign'){
        flag = options.referrerInfo.extraData.callbackObj.flag;
        console.log(result,'result')
        //如果需要进行跳转的话，可以在这边处理，跳转到开发者自己的小程序某个页面
         wx.redirectTo({
            url: '/pages/redirect/bizpage?flag=' + flag + '&result=' + result
          })          
      }
    }
  }
```

## 微信小程序刷脸方式内部流转流程图
![](https://cdn.nlark.com/yuque/0/2021/png/447795/1625814252996-24302e79-9dc2-4121-8935-17854ae8a0a6.png)

**<font style="color:#1890FF;"><此图中的客户小程序即为贵司小程序></font>**

### 用户刷脸图片
![](https://cdn.nlark.com/yuque/0/2021/png/447795/1625812581426-c6af41fc-3747-4351-88c7-13a83b56b4d4.png)



