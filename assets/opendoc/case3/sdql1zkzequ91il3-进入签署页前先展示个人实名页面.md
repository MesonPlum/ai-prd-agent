## 基础介绍
当个人用户首次使用e签宝签署合同时，若开发者要求用户在签署前完成实名认证，并在签署过程中进行意愿认证，可参考本流程。

:::warning
<font style="color:#DF2A3F;">注：仅未实名的个人用户在访问签署链接时，会触发前置实名认证环节；已实名用户将直接进入签署页。开发者可提前调用</font>[【查询个人认证信息】](https://open.esign.cn/doc/opendoc/auth3/vssvtu)<font style="color:#DF2A3F;">接口，确认个人用户的实名状态。</font>

:::

## 效果展示
### PC端签署效果展示：
视频效果请参考本视频：[pc端-签署页前先展示个人实名页面.mp4](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/pc端-签署页前先展示个人实名页面.mp4)

### H5端签署效果展示：
视频效果请参考本视频：[h5端-签署页前先展示个人实名页面.mp4](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/h5端-签署页前先展示个人实名页面.mp4)

## API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | <font style="color:rgb(64, 64, 64);">此接口获取签署方签署页面链接，可用于签署或预览。</font> | **<font style="color:rgb(140, 140, 140);">按需</font>** |


### 涉及接口及关键参数
<font style="color:#DF2A3F;">无需改动接口参数，仅需要联系e签宝技术对接人员开启个人签署页前先展示实名页配置项即可。</font>

