### 本文目录导航指引
_<font style="color:#8C8C8C;">锚点跳转定位可能存在轻微页面滚动偏差，跳转后请上下滚动页面查看。</font>_

[1.用于API接口调用的相关域名](#k3A17)

[2.用于文件上传下载的相关域名](#ilM0x)

[3.用于回调通知的相关域名](#IcoUA)

[4.nslookup命令的用法说明](#goCcX)

:::info
若开发者所处网络需配置防火墙后才可以正常访问互联网资源，请根据下方信息按需进行开发者防火墙设置。

:::

### <font style="color:rgb(38, 38, 38);">1.用于API接口调用的相关域名</font>
开发者在调用e签宝 API 相关接口时需要使用到的域名。

从开发者角度，以下信息需配置到**开发者防火墙**的**出站**规则中。

| **用途** | **环境** | **域名** | **公网IP** | **端口** |
| --- | --- | --- | --- | :--- |
| API接口调用 | 正式生产环境 | [https://openapi.esign.cn](https://openapi.esign.cn) | 118.31.181.75 | 443 |
| API接口调用 | 沙箱模拟环境 | [https://smlopenapi.esign.cn](https://smlopenapi.esign.cn) | 114.55.17.44 | 443 |


### <font style="color:rgb(38, 38, 38);">2.用于文件上传下载的相关域名</font>
开发者在上传或下载文件时需要使用到的域名。

从开发者角度，上传文件时以下信息需配置到**开发者防火墙**的**出站**规则中。

从开发者角度，下载文件时以下信息需配置到**开发者防火墙**的**入站**规则中。

| **用途** | **环境** | **域名** | **公网IP** | **端口** |
| --- | --- | --- | --- | :--- |
| 上传和下载 | 正式生产环境 | [https://oss.esign.cn](https://oss.esign.cn) | 杭州地域：183.131.227.223<br/>贵司服务器上执行 <br/>nslookup oss.esign.cn<br/>命令查看所在地域对应IP | 443 |
| 上传和下载 | 沙箱模拟环境 | [https://esignoss.esign.cn](https://esignoss.esign.cn) | 杭州地域：183.131.227.240<br/>贵司服务器上执行 <br/>nslookup esignoss.esign.cn<br/>命令查看所在地域对应IP | 443 |
| 上传和下载<br/>(加密模式)<br/>若未使用，可忽略 | 正式生产环境 | [https://upload.esign.cn](https://upload.esign.cn) | 杭州地域：112.124.209.161<br/>贵司服务器上执行<br/>nslookup upload.esign.cn<br/>命令查看所在地域对应IP | 443 |
| 上传和下载<br/>(加密模式)<br/>若未使用，可忽略 | 沙箱模拟环境 | [https://upload-pre.esign.cn](https://upload-pre.esign.cn) | 杭州地域：114.55.17.44<br/>贵司服务器上执行<br/>nslookup upload-pre.esign.cn<br/>命令查看所在地域对应IP | 443 |


### <font style="color:rgb(38, 38, 38);">3.用于回调通知的相关域名及IP</font>
开发者在接收e签宝推送的回调通知消息时需要关注的IP。

从开发者角度，以下信息需配置到**开发者防火墙**的**入站**规则中。

| **用途** | **环境** | **域名** | **公网IP** | **端口** |
| --- | --- | --- | --- | :--- |
| 消息通知推送 | 正式生产环境 | 无 | 118.31.35.8 | 随机 |
| 消息通知推送 | 沙箱模拟环境 | 无 | 47.96.79.204 | 随机 |


入站规则配置参考示例如下图（不同系统的配置界面略有不同）

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1671076974941-d70faf81-e3bf-4e8d-b1c1-d82c652a64cb.png)

### <font style="color:rgb(38, 38, 38);">4.nslookup命令的用法说明</font>
不同地域访问 esignoss.esign.cn、oss.esign.cn、upload-pre.esign.cn和upload.esign.cn域名时可能会解析到不同公网IP，我们建议开发者在配置防火墙时应该在业务服务器（实际网络出口服务器）上执行 nslookup 命令查看实际解析到的公网IP。



nslookup返回信息如下所示，返回信息中的Address即为公网IP。

```shell
~ % nslookup esignoss.esign.cn
Server:		192.168.2.5
Address:	192.168.2.5#53

Non-authoritative answer:
esignoss.esign.cn	canonical name = esignoss.oss-cn-hangzhou.aliyuncs.com.
esignoss.oss-cn-hangzhou.aliyuncs.com	canonical name = esignoss.oss-cn-hangzhou.aliyuncs.com.gds.alibabadns.com.
Name:	esignoss.oss-cn-hangzhou.aliyuncs.com.gds.alibabadns.com
Address: 183.131.227.240

~ % nslookup oss-cn-shanghai.aliyuncs.com
Server:		192.168.2.5
Address:	192.168.2.5#53

Non-authoritative answer:
Name:	oss-cn-shanghai.aliyuncs.com
Address: 106.14.228.198
Name:	oss-cn-shanghai.aliyuncs.com
Address: 106.14.228.194
```

