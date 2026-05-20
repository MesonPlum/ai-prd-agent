## 基础介绍
签署方在查看签署页时，如发现信息有误或对合同内容有异议，可主动点击“拒签”按钮拒绝签署，该操作将直接终止当前签署流程。

:::warning
**<font style="color:#DF2A3F;">附加配置：</font>**<font style="color:#DF2A3F;">如需隐藏拒签按钮，需联系e签宝的交付或运维经理针对开发者指定应用（appId）进行配置。</font>

:::

## 效果展示
用户打开签署页面-->浏览合同-->点击拒签按钮-->填写拒签原因-->提交后判断开发者发起签署时是否设置重定向地址（redirectUrl）：如果有重定向地址，跳转到重定向页面；如果没有重定向，重新加载签署合同，进入合同详情页。

| **** | **拒签按钮所在位置** | **不指定重定向地址-视频效果** | **指定重定向地址-视频效果** | **拒签后再次打开页面效果** |
| --- | --- | --- | --- | --- |
| **PC端效果** | ![](https://cdn.nlark.com/yuque/0/2025/png/449512/1756456132413-98b62f3d-6e56-4e05-b260-062771164ba9.png) | [点击查看 拒签_不传重定向_PC端.mp4](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/拒签_不传重定向_PC端.mp4) | [点击跳转 拒签_传重定向_PC端.mp4](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/拒签_传重定向_PC端.mp4) | ![](https://cdn.nlark.com/yuque/0/2025/png/449512/1756464481731-5fb04366-acdd-42d8-a690-a50d1aac6d2d.png) |
| **H5端效果** | ![](https://cdn.nlark.com/yuque/0/2025/png/449512/1756456217836-0375c10a-bc47-4ec5-b646-9e921759c152.png) | [点击查看 拒签_不传重定向_H5端.mp4](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/拒签_不传重定向_H5端.mp4) | [点击跳转 拒签_传重定向地址_H5端.mp4](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/拒签_传重定向地址_H5端.mp4) | ![](https://cdn.nlark.com/yuque/0/2025/png/449512/1756464516371-0fede670-9631-4962-a21c-adbf5457a80e.png) |


## API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | <font style="color:rgb(64, 64, 64);">此接口获取签署方签署页面链接，可用于签署或预览。</font> | **<font style="color:rgb(140, 140, 140);">按需</font>** |


### 涉及接口及关键参数
<font style="color:#DF2A3F;">无需改动接口参数。如果需要不允许用户拒签，仅需要联系e签宝技术对接人员配置隐藏拒签按钮即可。</font>

