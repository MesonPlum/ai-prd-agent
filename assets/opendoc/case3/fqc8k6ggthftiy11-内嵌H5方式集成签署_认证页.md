## 场景适用说明
:::info
企业在自己的支付宝小程序中通过内嵌e签宝H5页面，来对接e签宝网页版认证、授权或签署服务。

:::

## 集成对接示例DEMO
点击下载：[esign-zfb-demo.zip](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/esign-zfb-demo.zip)

## <font style="color:rgb(38, 38, 38);">接入前准备工作及注意事项</font>
### 配置业务域名
支付宝小程序中规定必须成功配置业务域名后，才可以加载第三方域名下的网页。因此，开发者需要先配置业务域名，具体配置方法详见[小程序配置e签宝OpenAPI业务域名说明](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/oyzxrr)。

沙箱模拟环境中也可以[设置不校验业务域名进行开发调试](#Mu9Rn)，正式生产环境中必须设置业务域名。

### 后端接口注意事项
:::warning
1.只有接口返回的长链接才可以设置小程序业务域名，所以小程序中加载的H5页必须使用e签宝接口返回的长链接，不能使用短链接。

2.平台appId默认会开启快捷刷脸认证方式，该刷脸方式在支付宝小程序里兼容性较差，可以联系e签宝技术人员关闭此刷脸方式，只使用支付宝刷脸与短信认证方式。

3.该对接文档支持SaaS API V3：[【获取签署页面链接】](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd)接口使用。

+ <font style="color:#DF2A3F;">注意</font>：在[【基于文件发起签署】](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42)时，需要字段：<font style="color:#DF2A3F;">availableSignClientTypes（签署终端类型） 传：1 （网页端）</font>。

4.该对接文档支持SaaS API V3：[【认证授权】](https://open.esign.cn/doc/opendoc/auth3/rx8igf)接口使用。

+ <font style="color:#DF2A3F;">注意</font>：如果需要小程序接收onWebviewMessage通知，则在[【认证授权】](https://open.esign.cn/doc/opendoc/auth3/rx8igf)接口不可以传重定向地址<font style="color:#DF2A3F;">（redirectUrl不要传）</font>，企业认证和个人认证同理。

5.该对接文档支持单独的认证服务：[【实名认证】](https://open.esign.cn/doc/opendoc/paas_api/eaug1b)/[【核身认证】](https://open.esign.cn/doc/opendoc/identity_service/sg2nty)接口使用。

+ <font style="color:#DF2A3F;">注意</font>：如果需要小程序接收onWebviewMessage通知，则接口需要配置不显示实名完成页<font style="color:#DF2A3F;">（showResultPage=false）</font>并且不传重定向地址<font style="color:#DF2A3F;">（redirectUrl不要传）</font>，企业认证和个人认证同理。

:::

## 小程序端内嵌H5页集成对接说明
<font style="color:#000000;">1.开发者小程序内web-view接收消息，url为认证、授权或签署的链接</font>

```json
# pages/webview/index.axml

<view>
  //认证、授权或签署链接
  <web-view src="{{url}}" id="webview" onMessage="onWebviewMessage">
  </web-view>
</view>
```

2.开发者可以通过通知的消息类型做判断，使用navigateTo函数跳转到开发者自身小程序页面<font style="color:#DF2A3F;">（如果不使用web-view通知方式，也可以在后端接口发起时指定H5的重定向地址，跳转自己的H5地址）</font>

```javascript
# pages/webview/index.js

onWebviewMessage(message) {
    console.log('onWebviewMessage>>>>>', message)
    // message && my.alert({
    //   title: '收到H5消息',
    //   content: JSON.stringify(message)
    // })
    const {
      detail: {
        type,
        token,
        url,
        authFlowId
      }
    } = message
    switch (type) {
      case 'IDENTITY_ALI_FACE_AWAKE':
        // 拉起支付宝刷脸
        my.startAPVerify({
          url,
          certifyId: token,
          success: function (res) {
            console.log('success', res)
          },
          fail: function (res) {
            console.log('fail', res)
          },
          complete: function (res) {
            console.log('complete', res)
          }
        })
        break;
      case 'RN_DONE':
        // 实名认证完成
        break;
      case 'E_AUTH_FINISHED':
        // 授权认证完成 
        break;
      case 'SIGN_SUCCESS':
        // 签署成功
        // 要跳转的页面或进行其他操作
        my.navigateTo({
          url: '/pages/index/index',
        });
        break;
      case 'SIGN_FAIL':
        // 签署失败
        break;
      case 'SEAL_EXAMINE':
        // 等待用印审批
        break;
      case 'REVOKE':
        // 签署流程撤销
        break;
      case 'REFUSE':
        // 拒签
        break;
      default:
        break;
    }
  }
```

### 详细的签署状态说明
| **type** | **message** | **消息体** |
| :--- | :--- | :--- |
| **SIGN_SUCCESS** | 签署成功 | {<br/>type:"SIGN_SUCCESS",<br/>message:"签署成功",<br/>signFlowId:"", //签署流程ID<br/>redirectUrl:"", // 重定向地址<br/>} |
| **SEAL_EXAMINE** | 等待用印审批 | {<br/>type:"SEAL_EXAMINE",<br/>message:"等待用印审批",<br/>signFlowId:"", //签署流程ID<br/>redirectUrl:"", // 重定向地址<br/>} |
| **REFUSE** | 拒签成功 | {<br/>type:"REFUSE",<br/>message:"拒签成功",<br/>signFlowId:"", //签署流程ID<br/>redirectUrl:"", // 重定向地址<br/>} |
| **REVOKE** | 签署流程撤销成功 | {<br/>type:"REVOKE",<br/>message:"签署流程撤销成功",//只有发起方在签署页有撤销按钮显示<br/>signFlowId:"", //签署流程ID<br/>redirectUrl:"", // 重定向地址<br/>} |
| **SIGN_FAIL** | 签署失败的错误信息 | {<br/>type:"SIGN_FAIL",<br/>message:"XXX", // 后端返回的报错信息，<font style="color:#404040;">一般都是异常情况才会返回</font><br/>signFlowId:"", //签署流程ID<br/>redirectUrl:"", // 重定向地址<br/>} |


### 详细的授权&认证状态说明
| **type** | **说明** | **消息体** |
| :--- | :--- | :--- |
| **E_AUTH_FINISHED** | 授权认证完成 | {<br/>type:"E_AUTH_FINISHED",<br/>authFlowId:"OF-2*****04c",//本次认证授权流程ID<br/>} |
| **RN_DONE** | 实名认证完成 | {<br/>type:""RN_DONE"",<br/>result:""success"",<br/>} |


## 附录
### FAQ
Q:认证页面选择刷脸认证点击下一步，一直转圈加载

A：需要企业支付宝小程序体验者模式测试，不支持个人小程序测试

### 设置不校验业务域名进行开发调试
在e签宝沙箱模拟环境中进行开发调试时，也可在开发者模式下设置不校验业务域名的方式进行支付宝小程序调试。【详情】界面中勾选“忽略http请求域名合法性检查，忽略webview域名合法性检查”，如下图：

![](https://cdn.nlark.com/yuque/0/2022/png/450218/1658145527374-c886efab-f1e0-47d1-b6e2-b37d8cb75bf6.png)

### <font style="color:rgb(38, 38, 38);">支付宝刷脸认证内部流转图</font>
![](https://cdn.nlark.com/yuque/0/2022/png/450218/1656501334544-c616d14b-79dd-4ed0-8855-708ce4fa7c1b.png)

**<font style="color:rgb(24, 144, 255);"><此图中的客户小程序即为开发者小程序></font>**

