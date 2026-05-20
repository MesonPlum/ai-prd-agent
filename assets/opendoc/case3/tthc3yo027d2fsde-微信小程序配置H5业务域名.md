:::warning
**<font style="color:#DF2A3F;">【注】：该文档仅开发者自己的小程序内嵌e签宝H5页面方式需要</font>**

:::

**本文目录导航指引**

[下载微信小程序校验文件](#an60x)

[配置e签宝OpenAPI业务域名](#IhKHE)

### 下载微信小程序校验文件
_<font style="color:#E8323C;">【温馨提示】只有企业主体注册的小程序才可以配置业务域名，个人主体注册的小程序无此功能。</font>_

开发者登录小程序管理后台（[微信公众平台](https://mp.weixin.qq.com)） ，选择【开发管理】->【开发设置】 ->【业务域名】后点击新增即可进入到【配置业务域名】界面，点击页面中的下载校验文件即可得到扩展名为.txt的微信小程序校验文件。

如下图：

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1669945440124-d70bf01c-a803-485d-b162-2ef1d8bc5938.png)

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1669945719361-46c22521-c6d0-4705-84e5-d53bbbbb9b8c.png)

### 配置e签宝OpenAPI业务域名到微信小程序管理后台
_<font style="color:#E8323C;">【温馨提示】只有企业主体注册的小程序才可以配置业务域名，个人主体注册的小程序无此功能。</font>_

开发者登录小程序管理后台（[微信公众平台](https://mp.weixin.qq.com)） ，选择【开发管理】->【开发设置】 ->【业务域名】后点击新增即可进入到【配置业务域名】界面，添加已获取的e签宝OpenAPI业务域名。

如下图：

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1669945440124-d70bf01c-a803-485d-b162-2ef1d8bc5938.png)

开发者需要先在e签宝开放平台配置自定义业务域名：[点击跳转 小程序配置e签宝OpenAPI业务域名说明](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/oyzxrr)

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1669946159825-0d88f177-f05c-4cd4-8cd3-c12a0cd38ff4.png)

### 附录
#### 微信小程序业务域名限制说明
1）每个小程序帐号支持配置最多200个域名；

2）每个域名支持绑定最多100个主体的小程序；

3）域名只支持 https 协议，不支持 IP 地址；

4）业务域名需经过 ICP 备案，新备案域名需24小时后才可配置；

5）域名格式只支持英文大小写字母、数字及“- ”；

6）配置业务域名后，可打开任意合法的子域名；

:::danger
【说明】最新微信小程序业务域名限制说明，请查阅[微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/domain.html)。

:::

#### [微信小程序校验文件检查失败自查指引](https://developers.weixin.qq.com/community/develop/doc/00084a350b426099ab46e0e1a50004)
