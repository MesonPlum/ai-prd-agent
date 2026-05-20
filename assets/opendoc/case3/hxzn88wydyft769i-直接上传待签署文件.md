## 本文目录导航指引
_<font style="color:#8C8C8C;">锚点跳转定位可能存在轻微页面滚动偏差，跳转后请上下滚动页面查看。</font>_

[场景说明](#aYuOB)

[如何上传待签署文件](#OcO5C)

[API列表](#PeAag)

## 场景说明
:::info
**开发者可以自己获取（生成）最终待签署的合同文件，拿到文件后通过文件流方式上传到e签宝服务端，创建待签署的PDF文件。（**开发者可直接将Word、Excel、PPT、WPS、图片等格式文件上传给e签宝服务端，由e签宝服务端负责转换成PDF文件）

[点击查看哪些格式的文件支持转成PDF文件](https://open.esign.cn/doc/opendoc/helper/wg8quq)

:::

## 如何上传待签署文件
### 步骤1：上传本地文件并转成PDF格式
<font style="color:rgb(38, 38, 38);">开发者参考</font>[【上传本地文件】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256)<font style="color:rgb(38, 38, 38);">将本地文件上传到e签宝服务端，此接口需要生成PDF格式文件，非PDF格式文件上传，接口中 </font>**convertToPDF** 参数值设置成 true，如下图：

**<font style="color:#e8323c;background-color:#f9efcd;">注意：</font>**<font style="color:#e8323c;background-color:#f9efcd;">如果上传的文件本身就是PDF格式文件则不需要转换，</font>**<font style="color:#e8323c;background-color:#f9efcd;">convertToPDF</font>**<font style="color:#e8323c;background-color:#f9efcd;"> 需设置为</font>**<font style="color:#e8323c;background-color:#f9efcd;">false</font>**<font style="color:#e8323c;background-color:#f9efcd;">。</font>

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1651718412877-1bc8dbbd-66b7-4859-93b1-42baf607f1cd.png)

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1651718668718-fd9f7a31-34ba-45db-8af0-72d80be133ec.png)

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1651718746655-23671840-ef0a-4421-93eb-8aa40483d9bc.png)

### 步骤2：查看文件上传详情
<font style="color:rgb(38, 38, 38);">开发者使用</font>[【查询文件上传状态】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/qz4aip)<font style="color:rgb(38, 38, 38);">接口根据文件状态 </font>**<font style="color:rgb(38, 38, 38);">fileStatus</font>**<font style="color:rgb(38, 38, 38);"> 判断文件上传或转换结果，也可以通过文件下载地址 </font>**<font style="color:rgb(38, 38, 38);">fileDownloadUrl</font>**<font style="color:rgb(38, 38, 38);"> 查看上传后的文件样式内容等是否有问题。</font>

## ![](https://cdn.nlark.com/yuque/0/2022/png/447795/1651723454273-33fa583f-f139-4b18-a21e-7ff9e77b27d0.png)
## API列表
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [上传本地文件](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256) | 此接口用来上传本地文件到e签宝服务端。 | **<font style="color:#E8323C;">必需</font>** |
| [查询文件上传状态](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/qz4aip) | 此接口可以查询文件的上传状态以及下载上传、转换后的文件原文。 | **<font style="color:#52C41A;">建议</font>** |


