## 基础介绍
指定签署页面强制阅读到文件底部是指：当签署人签署时，必须将接口中指定的所有待签署文件都阅读到底部后，才允许提交签署。如需使用该场景，开发者可自主在e签宝[开发者控制台](https://open.esign.cn/my-apps/home)中配置开通使用。

## 开通步骤
1.登录e签宝[开发者控制台](https://open.esign.cn/my-apps/home)中，页面确认进入对应企业空间下-左侧进入【应用管理】-【我的应用】；

2.找到需要配置的应用ID，点击【配置】；

![](https://cdn.nlark.com/yuque/0/2025/png/46341124/1756724479364-7f3357cc-e877-416c-a901-19f851f7cb97.png)``

3.点击页面的【参数配置】-【签署服务】，找到【是否强制阅读到底部】从【不启用】改成【启用】。

![](https://cdn.nlark.com/yuque/0/2025/png/46341124/1756724633441-717ab68e-c590-4d1b-b239-cdbee3b23641.png)

### PC端效果展示
进入签署页面，会提示进行“阅读到底”，否则无法提交签署，可通过页面中的箭头按钮快速到达文件底部。

![](https://cdn.nlark.com/yuque/0/2025/png/46341124/1755229369618-04a036a9-4d73-4ece-a6af-00f96f26c561.png)

流程中若存在多个待签署文件，需要对每个文件都重复”阅读到底部“的操作，当所有待签署文件都为”已读“状态后，才允许提交签署。![](https://cdn.nlark.com/yuque/0/2025/png/46341124/1755227866679-70f78307-e5ae-4989-94f8-21d9cc83337a.png)![](https://cdn.nlark.com/yuque/0/2025/png/46341124/1755228027354-7ff305c1-2abe-40e4-80f4-10294841993d.png)

### 移动端效果展示
视频效果请参考本视频：[指定强制阅读到文件底部.mp4](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/指定强制阅读到文件底部.mp4)

## API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | <font style="color:rgb(64, 64, 64);">此接口获取签署方签署页面链接，可用于签署或预览。</font> | **<font style="color:rgb(140, 140, 140);">按需</font>** |


### 涉及接口及关键参数
<font style="color:#DF2A3F;">无需改动接口参数，仅需要开启应用ID的配置，签署即可达到强制阅读到文件底部效果。</font>

