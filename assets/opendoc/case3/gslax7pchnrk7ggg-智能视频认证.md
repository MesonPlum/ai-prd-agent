## 基础介绍
**场景简介：**在金融、不动产、政府服务、保险等行业中，涉及大额交易或重要文件签署时，监管部门及客户常要求对签署过程进行录音录像，以留存视听与电子数据记录。该措施旨在实现签署过程可回放、关键信息可追溯、责任可认定，从而规范业务操作，降低法律风险。

**技术解决方案：**为满足上述要求，可通过**“智能视频认证（视频双录）”**功能，在关键业务流程中实现对用户身份及签署行为的实时核验与存证。该方式可强化身份确认与操作留痕，确保认证过程真实、可信、可回溯，适用于各类高安全要求的线上业务场景。

## 效果展示
**（1）当没有自定义视频模板，默认朗读固定文案，需要用户语音回答：“是的”。**

**视频效果请参考本视频：**[**浏览器中默认智能视频认证演示视频.mp4**](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/浏览器中默认智能视频认证演示视频.mp4)<font style="color:#DF2A3F;">（此视频演示在浏览器里打开，同时也支持在客户app、小程序、公众号等各端内嵌使用，效果一样）</font>

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1728640968041-20de3542-bc87-4c06-95ab-bc1214643999.png)

:::warning
**<font style="color:#DF2A3F;">其中朗读内容《》中的内容，会根据产品自动适配，如果是独立的认证服务能力，则显示空（一般需要单独自定义配置视频模板使用）。如果是SaaS API 系列签署接口中的认证，会自动取签署流程主题名带入。</font>**

:::



**（2）当配置了自定义视频模板，可以自定义朗读内容文案，也可以将语音更改为动作：“点头”。**

**视频效果请参考本视频：**[**自定义朗读模板的智能视频认证演示视频.mp4**](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/自定义朗读模板的智能视频认证演示视频.mp4)<font style="color:#DF2A3F;">（此视频演示在微信里打开，签署中的意愿认证流程，朗读两个自定义问题，并需要用户点头同意）</font>

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1728641014423-303254ec-21d3-4806-b793-4b41f658b2c3.png)

:::warning
**<font style="color:#DF2A3F;">其中需要用户回答或点头的环节，支持自定义设置多个问题连续朗读并让用户做出对应回答或动作。</font>**

:::

## API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | <font style="color:rgb(64, 64, 64);">此接口获取签署方签署页面链接，可用于签署或预览。</font> | **<font style="color:rgb(140, 140, 140);">按需</font>** |


### <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
#### 相关参数   
+ <font style="color:#E8323C;">willingnessAuthModes </font>签署意愿认证方式，指定：<font style="color:#DF2A3F;">PSN_AUDIO_VIDEO_ESIGN - H5智能视频认证（新版）</font>
+ <font style="color:#E8323C;">audioVideoTemplateId  </font>智能视频认证模板ID（可以指定录制视频页面的朗读文案）
+ <font style="color:#E8323C;">audioVideoActiveField  </font>智能视频认证文案中的动态朗读内容，动态内容 Key:Value值（支持自定义key和Value）

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1763458087335-f3fa1366-c925-4cf9-b6d7-48aebfacd55c.png)

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1763458061464-9bf96b64-f9ad-47f7-b171-4999e5d6a5a1.png)

:::warning
<font style="color:#DF2A3F;">注：</font>

+ <font style="color:#DF2A3F;">智能视频认证方式默认不开启，需提供appId联系e签宝技术人员提前开启配置；</font>
+ <font style="color:#DF2A3F;">实名认证方式暂不支持接口指定只要智能视频认证方式，如果不需要显示支付宝刷脸、快捷刷脸等其他实名方式，请联系e签宝技术人员关闭appId的配置；</font>
+ <font style="color:#DF2A3F;">实名认证中的的智能视频认证暂不支持自定义模板ID和动态朗读内容。</font>

:::

**指定智能视频认证的相关代码片段如下：**

```json
"authConfig": {
  "psnAvailableAuthModes": [
    "PSN_FACE"
  ],
  "willingnessAuthModes": [
    "PSN_AUDIO_VIDEO_ESIGN"
  ],
  "audioVideoTemplateId": "4SP8817781",
  "audioVideoActiveField": [
    {
      "key": "name",
      "value": "张三"
    },
    {
      "key": "idno",
      "value": "12345678"
    }
  ]
}
```































