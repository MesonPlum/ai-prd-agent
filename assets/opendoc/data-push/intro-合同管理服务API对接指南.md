# 背景与功能介绍
为助力开发者打通自身业务系统的业务和e签宝SaaS的签署能力+合同管理，实现签管一体化。现从以下三个场景来帮助开发者进行合同管理：

:::info
[**1. 智能台账-数据推送**](#CEHdy)

+ 使用e签宝SaaS官网生成智能合同台账，需要把合同台账数据同步给开发者企业自有系统进行统计、报表展示、商业分析等。

[**2. 纸质合同管理**](#Kppqo)

+ 通过e签宝SaaS官网上传线下签署的纸质合同，同步到e签宝SaaS官网进行合同管理。
+ 通过e签宝SaaS API接口上传线下签署的纸质合同，同步到e签宝SaaS官网进行合同管理。

[**3. 合同自动归档分类**](#sHF65)

+ 通过e签宝SaaS官网设置合同自动归档规则，使合同根据设置的规则自动归档到官网指定的文件夹内。
+ 通过e签宝SaaS API 接口发起电子合同签署，指定归档文件夹，使合同自动归档到官网指定的文件夹内。

[**4. 接口下载e签宝SaaS发起的合同**](#GNMfx)

+ 通过API接口查询、下载自身企业在e签宝SaaS官网（Web、app、钉签等）发起的签署。

:::

# 功能对接指南
## 1. 智能台账-数据推送<font style="color:#DF2A3F;">（仅限SaaS 高级版）</font>
### 1.1 产品介绍
智能台账-数据推送服务可以借助e签宝从<font style="color:rgb(38, 38, 38);">模板控件及合同内容中自动提取所需的字段信息</font>来收集数据，并按照开发者提供的数据接收URL地址将数据推送给开发者的应用系统。（[点击这里](https://help.esign.cn/detail?id=si03iqzsd4rcsl14&nameSpace=cs3-dept%2Fexboae) 了解更多智能台账功能）

### 1.2 应用场景
**销售合同履约场景**

将销售合同中填写的数据提取并推送给销售/财务管理系统，方便销售跟进收款和财务稽核收款。

**员工信息建档场景**

将劳动合同中填写的数据提取并推送给HR系统，方便HR快速生成员工档案，免去HR手动再次录入数据。

......

### 1.3 对接流程
请参考**智能台账-数据推送**分组中的文档**《开发前必读》**，[点击这里跳转](https://qianxiaoxia.yuque.com/opendoc/data-push/odwxpu)。



## 2. 纸质合同管理<font style="color:#DF2A3F;">（仅限SaaS 高级版）</font>
### <font style="color:rgb(38, 38, 38);">功能说明</font>
<font style="color:rgb(38, 38, 38);">如果要对线下签署的纸质合同，同步到e签宝平台进行统一管理，可以通过该功能实现。</font>

### <font style="color:rgb(38, 38, 38);">实现方式</font>
#### 方式一：通过e签宝SaaS官网上传纸质合同
<font style="color:rgb(51, 51, 51);">操作说明请参考</font>e签宝SaaS帮助中心 -**《纸质文件管理》**<font style="color:rgb(51, 51, 51);">文档，</font>[点击这里跳转](https://help.esign.cn/detail?id=sy4sicgya95s976g&nameSpace=cs3-dept%2Fexboae)<font style="color:rgb(51, 51, 51);">。</font>

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1698910301473-d8e53485-7a55-40aa-bc33-d06b23f7d72c.png)

#### 方式二：通过e签宝SaaS API接口上传纸质文件<font style="color:#DF2A3F;"></font>
**1.对接前准备（创建e签宝应用）**

开发者可参考[《沙箱模拟环境使用说明》](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/qwnnsb)创建沙箱应用，参考[《正式生产环境使用说明》](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/mezw5n)创建正式应用。

**2.接口对接流程**

![](https://cdn.nlark.com/yuque/__puml/0e42f083fcf4a20baf095e0104022bdc.svg)

**接口列表**

| **API接口****<font style="color:#8C8C8C;">（点击直接跳转相关API文档）</font>** | **接口说明****<font style="color:#8C8C8C;">（点击直接跳转相关API文档）</font>** | |
| --- | --- | --- |
| [获取文件上传地址](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256#e0adY) | 返回 [上传文件流](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256#S0BEC) 接口所需的地址fileUploadUrl，和文件fileId<br/>接口参数可参考以下场景指南：<br/>+ [上传文件接口参数指引](https://qianxiaoxia.yuque.com/opendoc/case3/hxzn88wydyft769i) | **<font style="color:#E8323C;">必需</font>** |
| [上传文件流](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256#S0BEC) | 通过已获取到的fileUploadUrl，使用 PUT 请求方法把文件二进制字节流上传到服务端<br/>+ [文件上传常见报错及解决方法](https://qianxiaoxia.yuque.com/opendoc/helper/aw4g7hrxebahoq97) | **<font style="color:#E8323C;">必需</font>** |
| [查询文件上传状态](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/qz4aip) | 需要判断文件上传/转换是否完成，可循环调用此接口，间隔建议设置为500毫秒 | **<font style="color:#52C41A;">建议</font>** |
| [纸质合同-归档分类](https://qianxiaoxia.yuque.com/opendoc/data-push/brstv7hlnfv80whe) | 纸质合同上传到e签宝后，归档分类到e签宝SaaS官网进行合同管理 | **<font style="color:#E8323C;">必需</font>** |




## 3. 合同自动归档分类
### <font style="color:rgb(38, 38, 38);">功能说明</font>
当企业文件较多，需要在e签宝SaaS官网-企业合同内新建很多类目文件夹去分别管理，手动分类整理比较耗费时间，希望文件在发起时就可以按照提前设置好的规则自动分类归档到对应的文件夹内<font style="color:rgb(38, 38, 38);">，可以通过该功能实现。</font>

### <font style="color:rgb(38, 38, 38);">实现方式</font>
#### 方式一：通过e签宝SaaS官网的智能归档功能设置<font style="color:#DF2A3F;">（限SaaS 高级版）</font>
登录[e签宝SaaS官网-智能归档](https://web.esign.cn/standing-book/intelligent-file)选择合同需要自动归档的位置和归档的条件。通常智能归档会和智能台账功能结合使用。（[点击这里](https://help.esign.cn/detail?id=si03iqzsd4rcsl14&nameSpace=cs3-dept%2Fexboae) 了解<font style="color:rgb(51, 51, 51);">如何提取合同内容并自动归档</font>）

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1698919296363-c9b42a5e-89c8-4bae-bd34-53ac4892cb41.png)

#### 方式二：通过e签宝SaaS API接口发起签署并设置归档文件夹<font style="color:#DF2A3F;">（限SaaS 专业版及以上）</font>
**适用场景：**使用此方式是为了控制SaaS API接口发起的签署可以自动归档到指定的分类文件夹内。

1.登录[e签宝SaaS官网](https://web.esign.cn/standing-book/intelligent-file)-企业空间首页-合同管理-企业合同-已归档合同中新建分类-详情中复制分类ID

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1698980139097-d55917ba-5a14-4cf1-babc-58ac8bae3d0b.png)

2.通过[《基于文件发起签署》](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/su5g42)接口发起签署，在参数**contractGroupIds**中指定在e签宝官网复制的分类ID，发起签署后，文件将会自动归档到指定的文件夹中。

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1698979987180-52fb1c68-7772-4847-a32b-e96e89b56697.png)

## 4. 接口下载e签宝SaaS发起的合同<font style="color:#DF2A3F;">（限SaaS 专业版及以上）</font>
### <font style="color:rgb(38, 38, 38);">功能说明</font>
企业使用e签宝SaaS官网（Web、app、钉签等）发起签署，希望用户签署后可以把合同文件下载回企业自有系统内，可以通过调用API接口实现签署文件统一管理。

### <font style="color:rgb(38, 38, 38);">接口流程</font>
#### 4.1 查询自身企业发起的所有签署流程列表
通过[《查询集成方企业流程列表》](https://open.esign.cn/doc/opendoc/pdf-sign3/uhma1i)接口：查询某个时间段内集成方企业（应用ID对应的企业主体），通过API接口和e签宝SaaS官网发起的全部签署流程，拿到具体的签署流程ID（signFlowId）。

#### 4.2 查询具体某个流程的详情信息（可选）
通过[《查询签署流程详情》](https://open.esign.cn/doc/opendoc/pdf-sign3/xxk4q6)接口：根据具体某个签署流程ID（signFlowId）查询详细的流程信息。<font style="color:#DF2A3F;">（按需接入）</font>

#### 4.3 下载签署后的合同文件
通过[《下载已签署文件及附属材料》](https://open.esign.cn/doc/opendoc/pdf-sign3/kczf8g)接口：根据具体某个已完成的签署流程ID（signFlowId）下载用户签署后的合同文件。<font style="color:#DF2A3F;">（批量下载：使用不同的signFlowId多次调用该接口即可）</font>

