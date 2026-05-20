**<font style="color:#DF2A3F;">自2025年11月14日起，API最新动态统一迁移到统一入口更新：</font>**[**点击跳转 API更新日志概览**](https://qianxiaoxia.yuque.com/opendoc/api-updates/bz3mufkbrwpwy892)

### 2025年11月
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2025年11月7日</font> | `**<font style="color:#E8323C;">新增</font>**`[【 查询企业内部印章】](https://qianxiaoxia.yuque.com/opendoc/seal3/ups6h1)接口增加参数 | 新增请求参数：<br/>+  revocationSeal（是否需要查询已吊销印章 ） |
| <font style="color:#389E0D;">2025年11月7日</font> | `**<font style="color:#E8323C;">新增</font>**`[【 查询企业内部印章】](https://qianxiaoxia.yuque.com/opendoc/seal3/ups6h1)、[【查询企业指定印章详情】](https://qianxiaoxia.yuque.com/opendoc/seal3/picwop)接口增加参数枚举 | 新增响应参数枚举值：<br/>+ sealStatus（印章状态）新增枚举：<br/>**4** - 已停用，**6** - 已吊销 |


### 2025年10月
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2025年10月30日</font> | `**<font style="color:#E8323C;">新增</font>**`[【 删除机构印章】](https://qianxiaoxia.yuque.com/opendoc/seal3/qdfvs6)接口增加参数 | 新增响应参数：<br/>+  sealStatus（删除印章状态 ） |


### 2025年2月
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2025年2月14日</font> | `**<font style="color:#E8323C;">新增</font>**`[【内部成员印章授权】](https://qianxiaoxia.yuque.com/opendoc/seal3/fu6ov5)、[【跨企业印章授权】](https://qianxiaoxia.yuque.com/opendoc/seal3/qkxyha)、[【查询对内部成员印章授权详情】](https://qianxiaoxia.yuque.com/opendoc/seal3/totfte)、[【查询对外部企业印章授权详情】](https://qianxiaoxia.yuque.com/opendoc/seal3/ngvb5p)、[【修改印章授权期限】](https://qianxiaoxia.yuque.com/opendoc/seal3/giha96)接口增加参数 | 新增请求/响应参数：<br/>+  longTermEffective（印章授权是否长期有效（不限制授权时间），默认false） |
| <font style="color:#389E0D;">2025年2月14日</font> | `**<font style="color:#E8323C;">新增</font>**`[【创建个人图片印章】](https://qianxiaoxia.yuque.com/opendoc/seal3/yi2wca)、[【创建机构图片印章】](https://qianxiaoxia.yuque.com/opendoc/seal3/lggz9w)接口增加请求参数 | 新增请求参数：<br/>+ manualAudit（是否需要不经过AI直接走e签宝人工审核（人工审核需要上传印章备案材料），默认false）<br/>+ sealFilingMaterials（印章备案材料fileKey，此参数值在[上传印章图片](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/gd1tsb#GeZvg)接口进行图片上传后获取。） |


### 2024年11月
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2024年11月20日</font> | `**<font style="color:#E8323C;">新增</font>**`[【内部成员印章授权】](https://qianxiaoxia.yuque.com/opendoc/seal3/fu6ov5)接口增加参数 | 新增请求参数：<br/>+ applicationsIds（授权的开发者应用ID列表）<br/>+ authConfirmMethod（授权确认方式） |
| <font style="color:#389E0D;">2024年11月20日</font> | `**<font style="color:#E8323C;">新增</font>**`[【跨企业印章授权】](https://qianxiaoxia.yuque.com/opendoc/seal3/qkxyha)接口增加参数 | 新增请求参数：<br/>+ sealIds（授权印章ID列表）<br/>+ authorizedType（授权印章使用对象）<br/>+ applicationsId（被授权企业下的开发者应用ID）<br/>新增响应参数：<br/>+ sealAuthBizIds（授权业务流程编号列表） |
| <font style="color:#389E0D;">2024年11月20日</font> | `**<font style="color:#E8323C;">新增</font>**`[【查询对内部成员印章授权详情】](https://qianxiaoxia.yuque.com/opendoc/seal3/totfte)接口增加参数 | 新增响应参数：<br/>+ applicationsIds（指定授权的开发者应用ID） |
| <font style="color:#389E0D;">2024年11月20日</font> | `**<font style="color:#E8323C;">新增</font>**`[【查询对外部企业印章授权详情】](https://qianxiaoxia.yuque.com/opendoc/seal3/ngvb5p)接口增加参数 | 新增响应参数：<br/>+ authorizedType（授权印章使用对象）<br/>+ authorizedApplication（被授权企业下的开发者应用ID） |


### 2024年1月
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2024年1月19日</font> | `**<font style="color:#E8323C;">新增</font>**`[【查询被外部企业授权印章】](https://qianxiaoxia.yuque.com/opendoc/seal3/czrua1)接口增加印章制作方式返回 | 新增响应参数：<br/>+ sealStyle（印章制作方式） |


### 2023年12月
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2023年12月27日</font> | `**<font style="color:#E8323C;">新增</font>**`[【获取创建法定代表人印章页面链接】](https://qianxiaoxia.yuque.com/opendoc/seal3/mh48ch0fen8adxqg)接口 | 新增接口 |


### 2023年11月
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2023年11月9日</font> | `**<font style="color:#E8323C;">新增</font>**`[【创建机构图片印章】](https://qianxiaoxia.yuque.com/opendoc/seal3/lggz9w)接口增加请求参数 | 新增请求参数：<br/>+ imageProcess（是否需要对图片做背景处理） |


### 2023年8月
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2023年8月11日</font> | `**<font style="color:#E8323C;">新增</font>**`[【查询对内部成员授权详情】](https://qianxiaoxia.yuque.com/opendoc/seal3/totfte)接口增加印章是否设置自动落章参数返回 | 新增响应参数：<br/>+ autoSign（印章是否可用于自动签署） |
| <font style="color:#389E0D;">2023年8月11日</font> | `**<font style="color:#E8323C;">新增</font>**`[【创建机构模板印章】](https://qianxiaoxia.yuque.com/opendoc/seal3/igfmd2)与[【获取创建机构印章页面链接】](https://qianxiaoxia.yuque.com/opendoc/seal3/qxfxq0)接口新增印章样式和印章固定尺寸 | 新增请求参数枚举值：<br/>+ sealTemplateStyle（机构模板印章样式）：<br/>CONTRACT_ROUND_STAR - 合同专用章（圆形章，带五角星)<br/>PERSONNEL_ROUND_STAR - 人事专用章（圆形章，带五角星）<br/>FINANCE_ROUND_STAR - 财务专用章（圆形章，带五角星）<br/>+ sealSize（机构印章尺寸）：<br/>CONTRACT_ROUND_STAR 样式固定尺寸：38_38<br/>PERSONNEL_ROUND_STAR 样式固定尺寸: 38_38<br/>FINANCE_ROUND_STAR 样式固定尺寸: 38_38 |


### 2023年7月
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2023年7月31日</font> | `**<font style="color:#E8323C;">新增</font>**`[【内部成员授权】](https://qianxiaoxia.yuque.com/opendoc/seal3/fu6ov5)接口增加允许自动签署参数 | 新增请求参数：<br/>+ autoSign（印章是否可用于自动签署） |


### 2023年2月
| **发布日期** | **发布事项** | **内容简介** |
| :---: | :--- | :--- |
| <font style="color:#389E0D;">2023年2月9日</font> | `**<font style="color:#E8323C;">新增</font>**`[【查询被外部企业授权印章】](https://qianxiaoxia.yuque.com/opendoc/seal3/czrua1)接口增加印章宽度、印章高度返回 | 新增响应参数：<br/>+ sealHeight（印章高度）<br/>+ sealWidth（印章宽度） |
| <font style="color:#389E0D;">2023年2月9日</font> | `**<font style="color:#E8323C;">新增</font>**`[【内部成员授权】](https://qianxiaoxia.yuque.com/opendoc/seal3/fu6ov5)接口增加授权操作人的成员角色返回 | 新增响应参数：<br/>+ sealAuthorizeType（授权操作人的企业成员角色） |


