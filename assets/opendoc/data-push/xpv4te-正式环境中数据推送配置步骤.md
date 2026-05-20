### 步骤1：创建正式应用
如果开发者已创建正式应用，可忽略此步骤。

否则请参考[《正式生产环境使用说明》](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/mezw5n)完成正式应用创建。

### 步骤2：配置合同数据接收URL
开发者登录e签宝[开放平台](https://open.esign.cn)后点击【控制台】进入e签宝开发者控制台，在页面上方先选择【正式服务】，然后在页面下方左侧点击【应用管理】-【我的应用】后在右侧应用列表页面中点击【配置】进入“应用配置”页面，选择【消息推送】模块的“添加”按钮即可配置合同数据接收URL。如下图：

![](https://cdn.nlark.com/yuque/0/2021/png/432598/1639619150410-08f204c0-0143-4e45-85f8-b6379c47a739.png)

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1673576109628-da52397f-2b3d-49b8-924b-f4a46031c168.png)

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1673576223204-9d78b033-1234-445f-893c-7377f1904517.png)

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1675734243185-422ce0ac-026d-4c63-af64-6a62e9b1845a.png)

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1675734526781-2cdb2343-3833-4eec-a176-3f84a881c77f.png)

**步骤3：配置数据字段及台账**  
开发者登录[e签宝SaaS官网](https://web.esign.cn/standing-book/intelligent-ledger/ledge-records)后在【首页】下找到需要配置的企业，从左侧菜单【合同管理】分组中选择  
【智能台账】进行台账配置页面（[点击这里](https://help.esign.cn/detail?id=si03iqzsd4rcsl14&nameSpace=cs3-dept%2Fexboae) 了解智能台账如何配置）。台账设置后点击【推送台账】，选择需要推送的应用ID。

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1698807991935-9446dcfb-6827-4745-b1d8-eaadb74afe9b.png)

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1698808664322-c227fd97-77ad-48bc-8d08-24f4bc05b055.png)  
至此，已完成数据推送配置。当e签宝 SaaS 智能合同中发起的合同被签署完成时，e签宝服务端将按照开发者的配置进行数据提取和推送。

