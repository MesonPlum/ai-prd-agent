### 接口描述
开发者可以调用此接口获取用户实名/意愿认证过程中使用腾讯云刷脸、快捷刷脸、微信小程序刷脸返回的刷脸照片信息以及意愿认证使用智能视频认证的视频信息等。

**<font style="color:#DF2A3F;">2023年4月13日，e签宝刷脸更名为快捷刷脸</font>**

### 接口请求域名
<font style="color:rgb(38, 38, 38);">所有的接口请求调用时需使用</font>**<font style="color:rgb(0, 0, 0);">HTTPS协议</font>**<font style="color:rgb(0, 0, 0);">、</font>**<font style="color:rgb(0, 0, 0);">JSON数据格式</font>**<font style="color:rgb(0, 0, 0);">、</font>**<font style="color:rgb(0, 0, 0);">UTF8编码</font>**<font style="color:rgb(38, 38, 38);">。</font>

<font style="color:rgb(38, 38, 38);">域名信息如下：</font>

<font style="color:rgb(38, 38, 38);">正式环境域名：</font>**<font style="color:rgb(38, 38, 38);">https://openapi.esign.cn</font>**

<font style="color:rgb(38, 38, 38);">模拟环境（沙箱环境）域名：</font>**<font style="color:rgb(38, 38, 38);">https://smlopenapi.esign.cn</font>**

<font style="color:rgb(38, 38, 38);">如果贵司有安全要求需要防火墙配置后才可以访问电子签名 SaaS API 标准版的域名，请根据下方信息进行贵司防火墙设置。</font>

| **<font style="color:rgb(38, 38, 38);">环境</font>** | **<font style="color:rgb(38, 38, 38);">域名</font>** | **<font style="color:rgb(38, 38, 38);">公网IP</font>** | **<font style="color:rgb(38, 38, 38);">端口</font>** |
| --- | --- | --- | --- |
| <font style="color:rgb(38, 38, 38);">正式环境</font> | [openapi.esign.cn](https://openapi.esign.cn%2C/) | <font style="color:rgb(0, 0, 0);">118.31.181.75</font> | <font style="color:rgb(38, 38, 38);">443</font> |
| <font style="color:rgb(38, 38, 38);">模拟环境（沙箱环境）</font> | [smlopenapi.esign.cn](https://smlopenapi.esign.cn/) | <font style="color:rgb(38, 38, 38);">114.55.17.44</font> | <font style="color:rgb(38, 38, 38);">443</font> |


### 接口名称
/v2/signflows/identity/detail

### 请求方式
POST

### 请求头
提供两种安全接入方式，**开发者可选择其中一种方式进行对接**，对应参数如何获取，参考文档【[请点击](https://open.esign.cn/doc/detail?namespace=opendoc%2Fsaas_api&id=opendoc%2Fsaas_api%2Fqudd9a)】。

#### 方式一：请求签名鉴权
请求头入参示例如下：

| **<font style="color:black;">参数名称</font>** | **<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>** | **示例值** |
| --- | --- | --- | --- | --- |
| X-Tsign-Open-App-Id | string | 是 | 应用ID |  |
| Content-Type | string | 是 | application/json;charset=UTF-8 |  |
| X-Tsign-Open-Ca-Timestamp | string | 是 | API 调用者传递时间戳，值为当前时间的毫秒数，也就是从1970年1月1日起至今的时间转换为毫秒，时间戳有效时间为15分钟，为了防重放攻击 |  |
| Accept | string | 是 | <font style="color:#000000;">建议统一填写 */*</font> |  |
| X-Tsign-Open-Ca-Signature | string | 是 | 签名字符串 |  |
| Content-MD5 | string | 否 | 当请求 Body 非 Form 表单时，可以计算 Body 的 MD5 值传递给云网关进行 Body MD5 校验。建议当请求 Body 非 Form 表单时，加上此请求头。 |  |
| X-Tsign-Open-Auth-Mode | string | 是 | <font style="color:#262626;">选择请求方式进行鉴权，固定值，Signature</font> |  |


#### 方式二：OAuth2.0鉴权
当安全接入选择**OAuth2.0鉴权方式**，【[请点击](https://open.esign.cn/doc/detail?id=opendoc%2Fsaas_api%2Fyiiorw&namespace=opendoc%2Fsaas_api)】查阅详情，请求头入参示例如下：

| **<font style="color:black;">参数名称</font>** | **<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>** |
| --- | --- | --- | --- |
| X-Tsign-Open-App-Id | string | 是 | 应用ID |
| X-Tsign-Open-Token | string | 是 | 通过获取鉴权Token接口返回 |
| Content-Type | string | 是 | application/json; charset=UTF-8 |


### 请求参数
| **<font style="color:black;">参数名称</font>** | **<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **类型** | **<font style="color:black;">参数说明</font>** | **示例值** |
| --- | --- | --- | --- | --- | --- |
| flowId | string | 是 | <font style="color:#D4380D;background-color:#FFFFFF;">body</font> | 签署流程ID<font style="color:#DF2A3F;">（SaaS API V3版本是：signFlowId）</font> | **** |
| accountId | string | 是 | <font style="color:#D4380D;background-color:#FFFFFF;">body</font> | 签署人账号ID<font style="color:#DF2A3F;">（SaaS API V3版本是：psnId；可以通过</font>[【查询签署流程详情】](https://open.esign.cn/doc/opendoc/pdf-sign3/xxk4q6)<font style="color:#DF2A3F;">接口查询签署人的psnId）</font> |  |
| authorizedAccountId | string | 否 | <font style="color:#D4380D;background-color:#FFFFFF;">body</font> | 签署主体ID<font style="color:#DF2A3F;">（一般是企业签署，传机构账号ID；SaaS API V3版本是：orgId，默认不需要传入）</font> |  |


### 公共响应参数
| **<font style="color:black;">参数名称</font>** | **<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>** | **示例值** |
| --- | --- | --- | --- | --- |
| code | int | 是 | 业务码，0表示成功 |  |
| message | string | 是 | 信息 |  |
| data | array | 是 | 业务信息 |  |


### 响应参数
| **<font style="color:black;">参数名称</font>** | | | **<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>** |
| --- | --- | --- | --- | :---: | --- |
| identityFlowId | | | string | 否 | 签署中的实名/意愿认证ID |
| identityType | | | string | 否 | 实名/意愿认证方式，类型如下：<br/><font style="color:#E8323C;">意愿认证方式：</font><br/>CODE_SMS 短信验证码<br/>CODE_VOICE 语言短信验证码<br/>FACE_ZHIMA_XY 支付宝刷脸<br/>FACE_TECENT_CLOUD_H5 腾讯云刷脸FACE_FACE_LIVENESS_RECOGNITION 快捷刷脸<br/>FACE_WE_CHAT_FACE 微信小程序刷脸<br/>FACE_ALI_MINI_PROGRAM 支付宝小程序刷脸<br/>FACE_AUDIO_VIDEO_DUAL 支付宝智能视频认证<br/>VIDEO_WE_CHAT_VIDEO_DUAL 微信智能视频认证<br/>PSN_AUDIO_VIDEO_ESIGN H5 智能视频认证（新版）<br/><font style="color:#E8323C;">实名认证方式：</font><br/>INDIVIDUAL_TELECOM_3_FACTOR 个人运营商三要素<br/>INDIVIDUAL_BANKCARD_4_FACTOR 个人银行卡四要素<br/>FACEAUTH_ZMXY 支付宝刷脸<br/>FACEAUTH_TECENT_CLOUD 腾讯云刷脸<br/>FACEAUTH_ESIGN 快捷刷脸<br/>FACEAUTH_WE_CHAT_FACE 微信小程序刷脸<br/>PSN_AUDIO_VIDEO_ESIGN H5 智能视频认证（新版）<br/>INDIVIDUAL_ALIPAY_ONECLICK 个人支付宝一键认证（支付宝小程序实名）<br/>INDIVIDUAL_ARTIFICIAL 个人人工实名 |
| identityDetail | | | string | 否 | 实名/意愿认证数据<br/><font style="color:#F5222D;">其中包含的字符串数据需要开发者自行解析，字段内容如下：</font> |
| | | facePhotoUrl | string | 否 | 刷脸认证时刷脸照片（base64编码的照片图片数据）<br/><font style="color:#F5222D;">补充说明：</font><br/>+ <font style="color:#F5222D;">此字段默认不返回任何信息，需联系e签宝沟通业务场景通过后才可开通。</font><br/>+ <font style="color:#F5222D;">只有认证方式选择腾讯云刷脸、快捷刷脸、微信小程序刷脸和智能视频认证时，才可以返回照片。</font><br/>+ <font style="color:#F5222D;">地址有效期默认 </font>**<font style="color:#F5222D;">1个小时</font>**<font style="color:#F5222D;">，过期后可以重新调用接口获取新的地址。</font><br/>+ <font style="color:#F5222D;">照片保存 </font>**<font style="color:#F5222D;">180天</font>**<font style="color:#F5222D;">，请在刷脸完成后180天内进行下载。</font> |
| | | faceVideoUrl | string | 否 | 刷脸认证时刷脸视频（base64编码的mp4视频数据）<br/><font style="color:#F5222D;">补充说明：</font><br/>+ <font style="color:#F5222D;">此字段默认不返回任何信息，需联系e签宝沟通业务场景通过后才可开通。</font><br/>+ <font style="color:#F5222D;">只有认证方式选择腾讯云刷脸、快捷刷脸和智能视频认证时，才可以返回视频。</font><br/>+ <font style="color:#F5222D;">地址有效期默认1个小时，过期后可以重新调用接口获取新的地址。</font><br/>+ <font style="color:#F5222D;">视频保存 </font>**<font style="color:#F5222D;">180天</font>**<font style="color:#F5222D;">，请在刷脸完成后180天内进行下载。</font> |
| | | faceUrl | string | 否 | 扩展字段请忽略 |
| | | livingScore | string | 否 | 刷脸活体率分值 |
| | | similarity | string | 否 | 刷脸相似度分值 |
| identityBizType | | | string | 否 | 认证类型：<br/>1：意愿认证<br/>2：实名认证 |


### 请求示例  
```json
{
    "accountId": "ba857348****70cd5f1d3e001", 
    "flowId": "20639d****0585d2d5e614417001" 
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": [
        {
            "identityFlowId": "00176eeb7****81721161d2",
            "identityType": "VIDEO_WE_CHAT_VIDEO_DUAL",
            "identityDetail": "{\"facePhotoUrl\":\"https://upload.esign.cn/eproxy/1111564182/00018a15-6d25-4dad-8925-629c15f70d9b/5826fdbfb7ee40e5bc4fd31f1f54fb9f?signature=KR5MTO0lVqmDQWCCPOcoMFXEOaQ%3D&expire=1625024737070&bucket=esign-oss-release\",\"faceVideoUrl\":\"https://upload.esign.cn/eproxy/1111564182/00011c65-cfd5-4ecd-9091-d23af6ab1bad/385efde1679d4193966a2f0b3ab36412?signature=SQZhNh7Ry786eWfDvbmZEK5e9Mc%3D&expire=1625024737079&bucket=esign-oss-release\",\"livingScore\":\"100.0\",\"similarity\":\"85.0\"}",
            "identityBizType": 1
        }
    ]
}
```

****

