## 配置e签宝OpenAPI业务域名
开发者只需三大步即可完成e签宝OpenAPI业务域名配置，步骤如下：

![](https://cdn.nlark.com/yuque/__flowchart/97235870a7271955fa81f34d1b9f9498.svg)

_<font style="color:#DF2A3F;">【说明】若在操作步骤2之前已经获取了e签宝签署链接或实名认证链接，请在完成步骤2之后重新获取新的签署链接或实名认证链接，以便获取到以业务域名开头的链接。</font>_

_<font style="color:#DF2A3F;">假设，步骤2获取的业务域名是 https://abc1234.h5.esign.cn 那e签宝API接口返回的链接就是以此为开头的，如：https://abc1234.h5.esign.cn/mesign/guide?XXX</font>_

### 步骤1：下载小程序校验文件
开发者登录小程序管理后台，下载小程序校验文件。

[点击查看 微信小程序如何下载校验文件](https://qianxiaoxia.yuque.com/opendoc/case3/tthc3yo027d2fsde)、[点击查看 支付宝小程序如何下载校验文件](https://qianxiaoxia.yuque.com/opendoc/case3/xi618rovv7t2rzg5)

### 步骤2：上传小程序校验文件获取e签宝OpenAPI业务域名
登录[e签宝开放平台](https://open.esign.cn/)，在【正式服务】或【沙箱服务】-【应用管理】-【我的应用】中找到需要配置小程序业务域名的应用，点击【配置】按钮进入到【小程序校验】配置页后点击【立即添加】或【添加小程序校验】按钮后，即可进行微信小程序相关信息设置，上传微信小程序校验文件后，即可获取到e签宝OpenAPI的业务域名信息。

:::info
<font style="color:#DF2A3F;">【说明】沙箱模拟应用请选择【沙箱服务】后进行小程序校验文件配置。</font>

:::

详细步骤如下图：

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1669886463849-824108c2-a185-48b3-8d2b-195c17497cea.png)

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1669874935281-8ccf0035-dafd-40df-9f00-cd906dd29ffb.png)

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1669883369108-7793c965-eb99-4c2a-9567-720deb774893.png)

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1669883666484-844eb4ba-968d-4eba-93cd-d79938e23163.png)

:::info
【说明】若要在支付宝小程序中打开e签宝相关页面，此处请选择【支付宝】后上传支付宝小程序校验文件。支付宝小程序校验文件的后缀名为.html

微信小程序校验文件的后缀名为.txt

:::

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1669883982203-67501245-3e89-49c8-b180-aa13aca983c7.png)

:::info
【说明】小程序校验文件添加成功后，e签宝开放平台将自动生成对应的业务域名。开发者需要登录小程序管理后台配置此e签宝OpenAPI业务域名。

:::

_<font style="color:#DF2A3F;">假设：校验文件是 eF1234.txt，获取的业务域名是 https://abc1234.h5.esign.cn。</font>_

_<font style="color:#DF2A3F;">如果要检查校验文件是否放置成功，可以通过业务域名拼接校验文件名的方式访问查看，如访问 https://abc1234.h5.esign.cn/eF1234.txt 看下下图显示效果即说明校验文件放置成功。</font>_

![](https://cdn.nlark.com/yuque/0/2023/png/432598/1681398321793-32a5880c-3e92-43f7-8e2d-e0ece3e580ac.png)

### 步骤3：配置e签宝OpenAPI业务域名
开发者登录小程序管理后台，按照页面指引配置步骤2中获取到的e签宝OpenAPI业务域名。配置完成后即可在小程序中加载e签宝OpenAPI业务域名下的页面。

[点击查看微信小程序如何配置业务域名](https://qianxiaoxia.yuque.com/opendoc/other-docs/lxunbyue7481mnv7?singleDoc#IhKHE)

### 步骤4：配置微信小程序刷脸中间页地址
:::info
<font style="color:#DF2A3F;">【说明】当开发者微信小程序中会使用到刷脸场景时，才需要按照此步骤配置微信小程序刷脸中间页地址。</font>

:::

登录[e签宝开放平台](https://open.esign.cn/)，在【正式服务】或【沙箱服务】-【应用管理】-【我的应用】中找到需要配置小程序业务域名的应用，点击【配置】按钮进入到【参数配置】页后点击【认证服务】，即可配置微信小程序刷脸中间页地址。

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1671074709229-753bd46c-a27f-4bc3-901b-5e55e1a6fde8.png)

:::info
<font style="color:#DF2A3F;">【注意事项】</font>

+ <font style="color:#DF2A3F;">此中间页需要开发者自己编码实现，可参考e签宝所提供的示例DEMO进行编码开发。</font>
+ <font style="color:#DF2A3F;">上图中间页地址/pages/middle/index是e签宝示例DEMO中的页面地址，请开发者根据实际情况配置。点击跳转：</font>[微信小程序对接说明](https://qianxiaoxia.yuque.com/opendoc/case3/ahb0sg)

:::

