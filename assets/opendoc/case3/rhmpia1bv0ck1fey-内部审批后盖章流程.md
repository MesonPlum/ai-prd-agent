## 基础介绍
本场景适用于开发者需要先完成对方签署，再根据内部审批结果自动完成己方盖章（也可手动盖章）的流程。

**典型流程：**

1、乙方（个人/企业用户）先完成签署

2、甲方（开发者）内部系统审批签署文件

3、审批通过后，系统自动完成甲方盖章

<font style="color:#DF2A3F;">注：流程中的甲方、乙方以及是否自动盖章可根据自身场景调整，非固定流程。</font>

## API接口调用流程
以下流程中的甲方、乙方只是方便区分的代称，真实场景需根据自身业务调整：

 ![](https://cdn.nlark.com/yuque/0/2025/png/447795/1762928629744-3e16684c-02c5-4eee-b6c0-7ab3bb375d51.png)

## API接口列表
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起乙方的签署，该接口中<font style="color:rgb(15, 17, 21);background-color:rgb(235, 238, 242);"> </font>**<font style="color:rgb(15, 17, 21);background-color:rgb(235, 238, 242);">autoFinish</font>**<font style="color:rgb(15, 17, 21);background-color:rgb(235, 238, 242);"> </font>参数设置 **<font style="color:rgb(15, 17, 21);background-color:rgb(235, 238, 242);">false</font>**，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [签署方-签署结果（含拒签）通知](https://open.esign.cn/doc/opendoc/notify3/zzcdf8) | 此回调通知用来接收签署方签完之后的状态通知。 | **<font style="color:rgb(140, 140, 140);">按需</font>** |
| [查询签署流程详情](https://open.esign.cn/doc/opendoc/pdf-sign3/xxk4q6) | 此接口用来查询签署流程中签署方的状态。 | **<font style="color:rgb(140, 140, 140);">按需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口用来获取平台方预览文件链接（签署方的签署链接也是该接口）。 | **<font style="color:rgb(140, 140, 140);">按需</font>** |
| [撤销签署流程](https://open.esign.cn/doc/opendoc/pdf-sign3/klbicu) | 此接口用来撤销有问题的签署中的流程，撤销后签署流程将终止，变为已撤销状态。 | **<font style="color:rgb(140, 140, 140);">按需</font>** |
| [追加签署区](https://open.esign.cn/doc/opendoc/pdf-sign3/ohzup7) | 此接口用来向审批后的签署流程中添加甲方的签署（一般是平台自身的自动盖章）。 | **<font style="color:#E8323C;">必需</font>** |
| [完结签署流程](https://open.esign.cn/doc/opendoc/pdf-sign3/ynwqsm) | 此接口用来将所有签署方签署完成后的流程完结（完结后流程才结束，可下载）。 | **<font style="color:#E8323C;">必需</font>** |
| [下载已签署文件及附属材料](https://open.esign.cn/doc/opendoc/pdf-sign3/kczf8g) | 此接口用来获取流程完结后的签署文件以及相关附属材料的下载链接。 | **<font style="color:rgb(140, 140, 140);">按需</font>** |


:::warning
<font style="color:#DF2A3F;">注：请在确认所有签署方均完成签署后，再调用</font>[《完结签署流程》](https://open.esign.cn/doc/opendoc/pdf-sign3/ynwqsm)<font style="color:#DF2A3F;">接口。建议通过</font>[《签署结果回调通知》](签署方-签署结果（含拒签）通知)<font style="color:#DF2A3F;">或</font>[《主动查询签署状态》](https://open.esign.cn/doc/opendoc/pdf-sign3/xxk4q6)<font style="color:#DF2A3F;">的方式进行确认，避免因系统处理延迟导致接口报错“签署区没有全部完成”。</font>

:::

