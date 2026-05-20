#### <font style="color:rgb(38, 38, 38);">📣</font><font style="color:rgb(38, 38, 38);"> 产品发布更新：</font>
<font style="color:rgb(38, 38, 38);">1、合同文件签署服务API V3-发起签署接口新增实名和意愿认证方式</font>

<font style="color:rgb(38, 38, 38);">2、合同文件签署服务API V3-短链接有效期从180天变更为90天</font>

---------------------------------------------------------------------------------------------------------------

### 1、<font style="color:rgb(38, 38, 38);">发起签署接口新增实名和意愿认证方式</font>
🚩[**《基于文件发起签署》**](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/su5g42)**、**[**《通过页面发起签署》**](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/lp54bn)**、**[**《追加签署区》**](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ohzup7)**接口新增请求参数枚举值：**

+ 新增请求参数 **<font style="background-color:#E7E9E8;">willingnessAuthModes</font>** （签署意愿认证方式）的枚举值：**<font style="background-color:#E7E9E8;">PSN_MOBILE_FACE_AUTH</font>** - 手机号多因子认证（运营商三要素验证+刷脸认证）
+ 新增请求参数 **<font style="background-color:#E7E9E8;">psnAvailableAuthModes</font>** （个人实名认证方式）的枚举值：**<font style="background-color:#E7E9E8;">PSN_AUDIO_VIDEO_ESIGN</font>**** **- H5智能视频认证（新版）

![](https://cdn.nlark.com/yuque/0/2026/png/447795/1772788721389-1bb8fda2-f27f-49e9-9c17-72c09c527213.png)

📘**效果展示：**

**意愿认证：****<font style="background-color:#E7E9E8;">PSN_MOBILE_FACE_AUTH</font>**** - 手机号多因子认证（运营商三要素验证+刷脸认证）:**

![](https://cdn.nlark.com/yuque/0/2026/png/447795/1772788813699-37b2976c-4bbe-4c83-b795-16a0c891bbc0.png)

**实名认证：****<font style="background-color:#E7E9E8;">PSN_AUDIO_VIDEO_ESIGN</font>**** - H5智能视频认证（新版）:**

![](https://cdn.nlark.com/yuque/0/2026/png/447795/1772789149905-db3a7044-211a-4ce0-a6dc-d6a05df47a8c.png)



### <font style="color:rgb(38, 38, 38);">2、短链接有效期从180天变更为90天</font>
🚩[**《获取签署页面链接》**](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/pvfkwd)**、**[**《 获取用印审批页面链接》**](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/gx7du8musow9xswe)**接口链接有效期变更：****<font style="color:#DF2A3F;">从原有180天变更为90天。</font>**

![](https://cdn.nlark.com/yuque/0/2026/png/447795/1773128582618-702047b4-9819-4a2f-b5b1-543dd7029a4f.png)

🚩**<font style="color:#DF2A3F;">短信/邮件通知中的短链接有效期也变更为90天（所有通知服务中涉及到e签宝短链接的都包含）。</font>**

