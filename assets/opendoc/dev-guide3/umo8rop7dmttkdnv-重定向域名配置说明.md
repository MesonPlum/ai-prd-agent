在页面重定向跳转时，若开发者不希望被e签宝外链跳转风控拦截而弹出风险提示页（效果详见本文末尾的示例图），请参考下方示例添加配置相关重定向页面的域名。

#### 重定向域名格式及示例
| **重定向类型** | **域名格式** | **域名示例** | **特殊说明** |
| --- | --- | --- | --- |
| Web/H5 | http://域名 | http://www.esign.cn<br/>http://open.esign.cn | 末尾不允许带/或端口<br/><font style="color:#DF2A3F;">说明：</font><br/><font style="color:#DF2A3F;">域名级风控拦截，因此不需要携带端口</font> |
| Web/H5 | https://域名 | https://www.esign.cn<br/>https://open.esign.cn | 末尾不允许带/或端口<br/><font style="color:#DF2A3F;">说明：</font><br/><font style="color:#DF2A3F;">域名级风控拦截，因此不需要携带端口</font> |
| App/小程序 | scheme:// | esign://<br/>alipay://<br/>dingtalk://<br/>贵司App定义的Scheme名:// | |


:::color3
_**<font style="color:#DF2A3F;">说明：重定向URL中涉及的域名或Scheme已配置到列表中，则不会触发e签宝外链跳转风控，可直接跳转。否则，会弹出风险提示页需要用户手动点击后才可以跳转。</font>**_

:::

#### 跳转外链风险提示页示例图
![](https://cdn.nlark.com/yuque/0/2023/png/432598/1691118307171-a0295fcf-f6b6-496e-961c-5bd527b5e50d.png)

#### 重定向域名白名单配置步骤说明
1、使用e签宝企业账号登录e签宝[开放平台](https://open.esign.cn)。

2、登录成功后点击导航栏中的【控制台】进入企业开发者控制台。如下图：

![](https://cdn.nlark.com/yuque/0/2020/png/432598/1597223535465-8e76b482-9ee7-4958-b8f3-6b55054afc28.png)

3、沙箱模拟环境请在顶部选择【沙箱服务】，正式生产环境请在顶部选择【正式服务】，然后再点击【应用管理】-【我的应用】后在右侧应用列表页面中，找到当前需要添加重定向域名白名单的应用ID所在行，点击行尾【配置】进入【安全配置】页进行添加。如下图：

![](https://cdn.nlark.com/yuque/0/2023/png/432598/1681191844075-e57836ac-8dfe-46df-9f82-cd1ed9d5cf3a.png)

![](https://cdn.nlark.com/yuque/0/2023/png/432598/1681191043110-5cb5cc53-e9d3-4d68-802f-0c023d416997.png)

