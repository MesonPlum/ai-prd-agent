## 本文目录导航指引
_<font style="color:#8C8C8C;">锚点跳转定位可能存在轻微页面滚动偏差，跳转后请上下滚动页面查看。</font>_

[1.服务简介](#vqdzY)

[2.电子签名使用核心流程示意图](#UFfj1)

[3.对接流程指引说明](#AcMXD)

[3.3 常见场景对接说明](#JJ9VI)

[4.电子签名 SaaS API V3版API列表](#RL4ZJ)

:::warning
建议开发者先仔细阅读本文再查阅相关接口文档，整体了解电子签名流程后，可提高后续接口开发效率。

:::

## 1.服务简介
### 1.1 服务概述
<font style="color:rgb(64, 64, 64);">电子签名 SaaS_API_V3 版是e签宝推出的一套全新的开放服务，在电子签名场景中方便企业开发者快速集成。</font>

目前 SaaS_API_V3 版可对外提供的服务如下：

+ 实名认证和授权服务API V3
+ 合同文件签署服务API V3
+ 流程模板服务API V3
+ 印章服务API V3
+ 企业机构成员服务API V3
+ 企业控制台服务API V3
+ 合同管理服务API V3
+ 回调通知服务 V3

### 1.2 应用场景
+ <font style="color:rgb(64, 64, 64);">企业开发者已有自己的业务系统，希望在其系统中集成 SaaS_API_V3 版相关接口，实现电子签名功能。</font>
+ <font style="color:rgb(64, 64, 64);">电子签名 SaaS_API_V3 版适用于多种电子合同/协议在线签章的场景。</font>
+ [法律法规中不允许使用的文书类型](https://qianxiaoxia.yuque.com/books/share/cc4fc4f1-de3d-43c3-bfdc-4fede4d6a1f6/wd9tgv)不可以使用<font style="color:rgb(64, 64, 64);">电子签名 SaaS_API_V3 版。</font>

## 2.电子签名使用核心流程示意图
### 2.1 整体流程概览
<font style="color:#8C8C8C;">点击下图，可全屏查看大图。</font>

![](https://cdn.nlark.com/yuque/__puml/e296a6582d052b8e76d54ae5af094837.svg)

### 2.2 用户签署页面流程图
**个人签署流程：**

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1709536145726-7991bc93-d8c7-4bf5-93bc-8fb3bad0e34a.png)

**企业签署流程：**

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1709536185588-d182f352-9cef-451c-a850-6b4e2ce297b5.png)

### 2.3 用户签署操作页面效果
**用户签署页面操作手册：**[**点击查看 SaaS API V3版用户签署页操作手册**](https://open.esign.cn/doc/opendoc/helper/toh8ph)

**用户签署操作视频演示：**[**签署演示视频.mp4**](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/签署视频.mp4)

## 3.对接流程指引说明
### 3.1 应用接入流程
![](https://cdn.nlark.com/yuque/0/2021/png/432598/1617354523478-bae061d5-eae0-4698-a692-44804379e4a0.png)

### 3.2 开发前须知
+ 开发者在进行接口开发调试前，请务必先阅读[e签宝公有云 API 调用说明](https://qianxiaoxia.yuque.com/books/share/d58af0dd-fd27-4d17-8d60-04bacabf7b17/el34xh)来大致学习了解如何调用API接口。
+ 用户身份信息认证核验时，因各地数据上报机制或其他特殊情况，无法保证用户实名认证可100%核验通过。因此，开发者应根据实际业务情况增加线下人工核验用户身份方式，以防止因特殊情况造成业务阻塞。
+ 为确保应用正式上线过程中问题可以及时得到技术支持，开发者应**提前2-3天联系e签宝交付顾问报备上线计划**，以便双方做好上线前相关准备工作。

### 3.3 常见场景对接说明
授权&认证、生成合同、签署功能、小程序和App集成等场景详见[《常见场景对接说明》](https://open.esign.cn/doc/opendoc/apiv3-guide/al7kcc)模块。

## 4.电子签名 SaaS API V3版API列表
| **模块名称** | | **功能概述** | **接口集成** |
| --- | --- | --- | :---: |
| [实名认证和授权服务API](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/rx8igf) | | 单独对用户进行实名认证或者需要授权自身应用获取用户在e签宝的身份信息等资源权限（在发起签署前接入） | **<font style="color:#52C41A;">建议接入</font>** |
| [合同文件签署服务API](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/tv8gsiqwk2z00wwi) | | 发起签署前的待签署文件上传与生成；对用户发起合同文件签署以及后续签署流程查询、变更，签署文件下载等 | **<font style="color:#E8323C;">必需接入</font>** |
| [回调通知服务](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/pmy852) | | 用于接收用户实名认证、授权，签署等动作结束触发的接口通知请求 | **<font style="color:#52C41A;">建议接入</font>** |
| [流程模板服务API](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/ccrulvhqdvk42nza) | | 流程模板是归属于企业用户的资源，与e签宝SaaS官网模板互通，可以根据模板发起合同拟定和签署流程 | **<font style="color:#8C8C8C;">按需接入</font>** |
| [企业机构成员服务API](https://qianxiaoxia.yuque.com/books/share/5f5d0c9f-0af8-4ded-b32c-cae4086a587c/has759) | | 需要管理企业用户在e签宝的成员信息<br/>（需要提前接入[认证和授权服务API](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/rx8igf)） | **<font style="color:#8C8C8C;">按需接入</font>** |
| [印章服务API](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/tmtccg) | | 需要自定义生成以及管理用户的e签宝印章，或者需要授权印章给其他机构或者成员协助完成盖章的场景<br/>（需要提前接入[认证和授权服务API](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/rx8igf)） | **<font style="color:#8C8C8C;">按需接入</font>** |
| [企业控制台服务API](https://qianxiaoxia.yuque.com/opendoc/console/rhoap2) | | 可以获取用户免登录进入e签宝SaaS官网企业控制台的页面链接 | **<font style="color:#8C8C8C;">按需接入</font>** |
| [合同管理服务API V3](https://open.esign.cn/doc/opendoc/data-push/intro) | | 助力开发者打通自身业务系统的业务和e签宝SaaS的签署能力+合同管理，实现签管一体化 | **<font style="color:#8C8C8C;">按需接入</font>** |


