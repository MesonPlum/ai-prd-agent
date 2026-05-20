**<font style="color:#DF2A3F;">该方式不会做迭代更新，不推荐开发者接入，建议直接用内嵌H5的方式集成！</font>**

## 场景适用说明
企业在自己的支付宝小程序中，通过<font style="color:#333333;">引用“e签宝电子合同插件”进行对接签署</font>。

## 获取插件
在支付宝小程序中实现电子签名之前，需要先在支付宝服务市场订购并 [获取插件](https://app.alipay.com/commodity/v2/ant/merchandise/merchandiseDetail.htm?merchandiseId=AM010401000000052964)（需要使用您的小程序所属的主体企业支付宝账号登录），详情请参考 [插件订购](https://opendocs.alipay.com/mini/plugin/plugin-order)。

也可以使用已登录企业支付宝账号的支付宝 APP 扫码订购。

![](https://cdn.nlark.com/yuque/0/2020/png/1325492/1593340912236-62befa41-31c5-45bb-bd52-f0a3797c74b1.png)

## 使用插件
使用前，可参考支付宝小程序 [插件文档](https://opendocs.alipay.com/mini/plugin/plugin-usage) 以及阅读以下插件使用说明。

#### 1. 插件使用声明
在小程序项目app.json中声明e签宝电子合同小程序插件，如下：

```jsx
{
  "plugins": {
    "esign": {
      "version": "*",
      "provider": "2021001115656413"
    }
  },
}
```

+ version：指定插件版本号，`*`表示最新版本，由于插件的上架版本只有一个版本，因此这里需始终指定`*`(最新版本)
+ provider：指定所引用的插件ID（2021001115656413表示e签宝电子合同小程序插件id）

#### 2.兼容处理
插件的运行要求小程序基础库为 [1.22.4](https://opendocs.alipay.com/mini/ide/framework-changelog) 及以上版本，支付宝客户端10.1.82及以上的版本，小程序在使用插件的时候，需要按照如下方式兼容（非常重要）：

```jsx
// app.js
if (!my.canIUse('plugin') && !my.isIDE) {
  my.ap && my.ap.updateAlipayClient && my.ap.updateAlipayClient();
}
App({
  onLaunch() {},
  onShow() {},
})
```

注意：兼容代码一定要放到 app.js 文件的开头处，不能放到生命周期方法中，如果不做上述兼容处理，在基础库版本低于 1.18.0 的时候可能会导致页面白屏。

#### 3. 跳转签署页面
<font style="color:#F5222D;">注：跳转插件页面前，需先发起签署流程，并手动拼接跳转插件页面URL。</font>

<font style="color:#333333;">跳转到插件页面时， URL 使用 </font>`plugin://`<font style="color:#333333;"> 前缀，格式为 </font>`plugin://PLUGIN_NAME/PLUGIN_PAGE`<font style="color:#333333;">，</font>**<font style="color:#333333;">如下所示</font>**<font style="color:#333333;">：</font>

```jsx
my.navigateTo({
  url: 'plugin://esign/esign?env=${env}&flowId=${flowId}&signerId=${signerId}&skipResult=${skipResult}&skipGuide=${skipGuide}',
})
```

**字段说明：**

| **<font style="color:#262626;">字段名称</font>** | **<font style="color:#262626;">必传</font>** | **<font style="color:#262626;">字段说明</font>** | **<font style="color:#262626;">案例</font>** |
| --- | --- | --- | --- |
| <font style="color:#262626;">flowId</font> | <font style="color:#262626;">是</font> | <font style="color:#262626;">签署流程ID（</font>**<font style="color:rgb(64, 64, 64);">signFlowId</font>**<font style="color:#262626;">），需要发起并开启签署流程后传入，才能进行跳转签署</font> |  |
| <font style="color:#262626;">signerId</font> | <font style="color:#262626;">是</font> | <font style="color:#262626;">签署人账号ID（</font>**<font style="color:rgb(64, 64, 64);">psnId</font>**<font style="color:#262626;">）</font><br/><font style="color:#F5222D;">注：如果签署主体是企业，需要传入企业签署操作人账号ID</font> |  |
| <font style="color:#262626;">env</font> | <font style="color:#262626;">是</font> | <font style="color:#262626;">e签宝对接的服务端接口环境变量，默认生产环境</font><br/>+ **sml****<font style="color:#DF2A3F;"> </font>**<font style="color:#262626;">- 沙箱模拟环境</font><br/>+ **prod****<font style="color:#DF2A3F;"> </font>**<font style="color:#262626;">- 正式生产环境</font> |  |
| <font style="color:#262626;">skipResult</font> | 否 | <font style="color:#262626;">是否忽略签署成功后的页面展示，直接返回母体小程序页面，默认：</font>**<font style="color:#262626;">false</font>**<br/>+ **<font style="color:#262626;">true </font>**<font style="color:#262626;">- 忽略签署成功后的页面</font><br/>+ **<font style="color:#262626;">false </font>**<font style="color:#262626;">- 展示签署成功后的页面</font> |  |
| <font style="color:#262626;">skipGuide</font> | 否 | <font style="color:#262626;">是否忽略签署前置页，默认：</font>**<font style="color:#262626;">false</font>**<br/>+ **<font style="color:#262626;">true </font>**<font style="color:#262626;">- 忽略签署前置页面</font><br/>+ **<font style="color:#262626;">false </font>**<font style="color:#262626;">- 展示签署前置页面</font><br/><font style="color:#F5222D;">（注：需保证当前登录用户已经实名，才可通过设置true来忽略签署前置页）</font> | 前置页如下图所示：<br/>![](https://cdn.nlark.com/yuque/0/2020/png/1325492/1593342684839-f995ab01-861d-4c65-bbaf-e6c80da2ef4b.png) |


#### 4. 通过js接口获取签署状态
**方式1**：

通过插件签署页签署成功后，会返回到母体小程序页面，母体小程序可以监听onShow事件，通过e签宝电子合同小程序插件提供的js接口来获取本次签署状态

```jsx
const esignPlugin = requirePlugin("esign");
 
Page({
  onShow() {
    // 通过插件js接口获取签署状态
    const {
      code,
      message,
    } = esignPlugin.getSignStatusInfo();
 
    console.log('code', code)
    console.log('message', message)
  },
});
```

**方式2：**

通过js接口addEventListener方法监听signStatusInfo事件，如下：

```jsx
const esignPlugin = requirePlugin("esign");
 
Page({
  onLoad() {
    // 监听签署状态信息事件
    esignPlugin.addEventListener('signStatusInfo', ({code, message}) => {
      console.log('code', code)
      console.log('message', message)
    });
  },
});
```

**响应示例：**

| **code** | **message** | **状态描述** |
| :--- | :---: | :---: |
| 000 | 签署成功 或者 等待用印审批 | <font style="color:#404040;">签署成功，包含用印审批</font> |
| 001 | 插件服务异常，请重新调用插件 | <font style="color:#404040;">插件服务异常，页面首次加载请求接口失败</font> |
| 002 | 签署失败的错误信息 | <font style="color:#404040;">签署失败，也可能是多份签署文件签署失败</font><br/>（如果是多份签署文件失败，message为：部分文件签署失败） |
| 003 | 签署失败的错误信息 | <font style="color:#404040;">未找到签署流程</font><br/><font style="color:#404040;">（</font><font style="color:#172B4D;">流程已</font><font style="color:#222222;">撤销 ，流程</font><font style="color:#222222;">已</font><font style="color:#222222;">终止 ，流程已过期 ，流程已删除</font><font style="color:#404040;">）</font> |
| 004 | 签署失败的错误信息 | <font style="color:#404040;">签署权限校验失败</font> |
| 005 | 签署流程查询失败 | <font style="color:#404040;">签署流程查询失败，获取不到签署链接</font> |
| 006 | 签署失败的错误信息 | <font style="color:#404040;">账号实名失败</font> |
| 007 | 签署失败的错误信息 | <font style="color:#404040;">没有需要签署的文件</font> |
| 008 | 签署人拒绝签署 | <font style="color:#404040;">签署人拒绝签署</font> |


## 注意事项
<font style="color:#F5222D;">请勿使用ide工具调试，ide获取插件的authCode有问题。需要使用手机扫码预览真机测试，工具直接调试会出现以下报错：</font>

![](https://cdn.nlark.com/yuque/0/2021/png/447795/1632386350470-ceb48c65-e9ef-443d-b3a2-0ddea65de812.png)

