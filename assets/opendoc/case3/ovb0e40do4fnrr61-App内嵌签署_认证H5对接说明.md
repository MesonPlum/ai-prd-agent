## 场景说明
:::info
当使用自身原生App集成e签宝的签署或认证服务时，需要通过后端API接口获取到签署/认证地址URL，然后App端进行H5-URL内嵌集成。

:::

## 效果展示
![](https://cdn.nlark.com/yuque/0/2022/gif/447795/1671178455328-baca5616-0212-4655-a0ce-72a2f3bca50c.gif)

## 集成说明
:::info
**<font style="color:#DF2A3F;">注意：</font>**在后端接口[【基于文件发起签署】](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42)时，需要字段：<font style="color:#DF2A3F;">availableSignClientTypes</font>（签署终端类型） 传：<font style="color:#DF2A3F;">1</font> （网页端）。

当签署时，使用手机号短信认证方式时，app端不需要做特殊处理。但当使用刷脸方式时需要额外处理。

支付宝刷脸需要跳转到支付宝App中进行认证，结束后再跳回开发者自身App，需要做url的Scheme的监听。具体流程参考：[<u>认证使用支付宝人脸识别方式</u>](https://qianxiaoxia.yuque.com/opendoc/case3/to35zrqhp7ak1pd8)<font style="color:#DF2A3F;"></font>

腾讯云刷脸是纯H5的方式进行的，需要开启摄像头等相关权限。具体流程参考：[<u>认证使用腾讯云/快捷人脸识别方式</u>](https://qianxiaoxia.yuque.com/opendoc/case3/qhgc0gy5d9d6k94o)

:::

:::warning
**<font style="color:#DF2A3F;">注意：</font>**如果在app内涉及到企业认证使用对公打款方式，需要上传授权书文件，安卓端需要适配机型（在 onShowFileChooser 方法适配。<font style="color:#DF2A3F;">（代码详细说明可以参考DEMO内文档）</font>

因为腾讯刷脸和快捷刷脸在降级场景下都会上传视频会调 onShowFileChooser ，因此和普通文件上传在逻辑上会有一定的冲突，解决方法如下供参考：

根据 fileChooserParams 的 acceptType 内容可以进行区分

+ 腾讯刷脸返回的 acceptType 值是 video/kyc
+ 快捷刷脸返回的 acceptType 值是 video/*
+ 而上传文件返回的 acceptType 是””

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1703661965027-d1439ee1-f8c6-4aa7-a0ea-fdf3696d612f.png)

_<font style="color:#DF2A3F;">认证页面的用户手册请参考：</font>_[_<u>SaaS API V3版用户认证&授权操作手册</u>_](https://open.esign.cn/doc/opendoc/helper/vo3s51)

:::

## 集成对接示例DEMO
**点击下载：**[**App认证和签署内嵌H5对接Demo_V3.zip**](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/App认证和签署内嵌H5对接Demo_V3.zip)**（更新时间：2025年01月21日）**

<font style="color:#DF2A3F;">（详细说明可以参考DEMO内文档）</font>

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1730794248576-868f56d5-3840-4aaf-bdbf-81be633dc696.png)

