## 1.前提条件
（1）开发者需要先购买e签宝 SaaS 智能合同的<font style="color:#E8323C;">高级版</font>。

（2）开发者需要准备一个支持 HTTP POST 请求的Web服务来接收e签宝推送的数据。

## 2.对接流程
![](https://cdn.nlark.com/yuque/0/2023/png/447795/1698984201592-3702c9d3-1752-42f3-99b4-8be7694aaf26.png)

### 2.1 创建e签宝应用
开发者可参考[《沙箱模拟环境使用说明》](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/qwnnsb)创建沙箱应用，参考[《正式生产环境使用说明》](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/mezw5n)创建正式应用。

### 2.2 <font style="color:rgb(38, 38, 38);">配置数据推送</font>
开发者可参考[《沙箱环境中数据推送配置步骤》](https://open.esign.cn/doc/detail?id=opendoc/data-push/mf02y2&namespace=opendoc/data-push)和[《正式环境中数据推送配置步骤》](https://open.esign.cn/doc/detail?id=opendoc/data-push/xpv4te&namespace=opendoc/data-push)配置合同数据接收URL、配置字段及台账和设置推送应用等操作。

### 2.3 <font style="color:rgb(38, 38, 38);">准备接收智能台账数据的Web服务</font>
开发者可参考[《如何接收智能台账数据》](https://open.esign.cn/doc/detail?id=opendoc/data-push/pdscck&namespace=opendoc/data-push)来搭建Web服务，用于接收e签宝推送的智能台账数据。

