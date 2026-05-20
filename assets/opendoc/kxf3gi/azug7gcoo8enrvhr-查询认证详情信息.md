### 接口描述
开发者可以调用此接口获取用户实名/意愿认证过程中使用腾讯云刷脸、快捷刷脸、微信小程序刷脸返回的刷脸照片信息以及意愿认证使用智能视频认证的视频信息等。

:::warning
**<font style="color:#DF2A3F;">注意：</font>**

<font style="color:#DF2A3F;">1、业务流程ID在180天内实时返回视频/照片/文件下载地址</font>

<font style="color:#DF2A3F;">2、超过180天不实时返回视频/照片/文件下载地址，第一次查询后返回空下载地址，大约120秒后可通过异步回调通知告知开发者重新调用该接口进行认证信息查询获取下载地址。</font>

:::

### 接口请求域名
<font style="color:rgb(38, 38, 38);">所有的接口请求调用时需使用</font>**<font style="color:rgb(0, 0, 0);">HTTPS协议</font>**<font style="color:rgb(0, 0, 0);">、</font>**<font style="color:rgb(0, 0, 0);">JSON数据格式</font>**<font style="color:rgb(0, 0, 0);">、</font>**<font style="color:rgb(0, 0, 0);">UTF8编码</font>**<font style="color:rgb(38, 38, 38);">。</font>

<font style="color:rgb(38, 38, 38);">域名信息如下：</font>

| **<font style="color:rgb(38, 38, 38);">环境</font>** | **<font style="color:rgb(38, 38, 38);">域名</font>** | **<font style="color:rgb(38, 38, 38);">公网IP</font>** | **<font style="color:rgb(38, 38, 38);">端口</font>** |
| --- | --- | --- | --- |
| <font style="color:rgb(38, 38, 38);">线上正式环境</font> | [https://openapi.esign.cn](https://openapi.esign.cn) | <font style="color:rgb(0, 0, 0);">118.31.181.75</font> | <font style="color:rgb(38, 38, 38);">443</font> |
| <font style="color:rgb(38, 38, 38);">模拟沙箱环境</font> | [https://smlopenapi.esign.cn](https://smlopenapi.esign.cn) | <font style="color:rgb(38, 38, 38);">114.55.17.44</font> | <font style="color:rgb(38, 38, 38);">443</font> |


<font style="color:rgb(38, 38, 38);">如果贵司有安全要求需要防火墙配置后才可以访问请求的域名，请根据下方信息进行贵司防火墙设置。</font>

### 接口地址&请求方法
> **<font style="color:#333333;">点击下述蓝色字体{host}可跳转至API请求域名说明文档</font>**
>

**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/identity/flow/resources

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>



### 请求参数
| **<font style="color:black;">参数名称</font>** | **<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **类型** | **<font style="color:black;">参数说明</font>** |
| --- | --- | --- | --- | --- |
| flowType | string | 是 | <font style="color:#D4380D;background-color:#FFFFFF;">body</font> | 实名认证业务流程类型：<br/>**auth** - 实名~~~~认证业务流程 <br/>**willingness** - 意愿任务业务流程<br/>**oauth** - 认证授权业务流程<br/>**willingBizId** - 独立意愿业务流程 |
| value | string | 是 | <font style="color:#D4380D;background-color:#FFFFFF;">body</font> | 对应业务流程ID<br/>**flowId**（**auth**类型对应的实名流程ID值）<br/>**willAuthId**（**willingness**类型对应的意愿认证子任务ID值）<br/>**authFlowId（oauth**类型对应的认证授权流程ID值**）**<br/>**bizId（willingBizId**类型对应的独立意愿认证任务业务ID值**）** |
| needCallback | boolean | 否 | <font style="color:#D4380D;background-color:#FFFFFF;">body</font> | 文件资源激活完成后，是否需要后端异步回调通知，详见[【OSS文件解冻完成通知】](https://qianxiaoxia.yuque.com/opendoc/kxf3gi/xalg7pvg24n1kreu)（超过180天业务流程需要获取相关文件下载地址时，需要进行文件激活）。默认：false<br/>**true** - 需要通知<br/>**false** - 不需要通知<br/><font style="color:#DF2A3F;">注：异步通知配置请参考</font>[【e签宝回调通知接收说明】](https://qianxiaoxia.yuque.com/opendoc/notify3/pmy852)<font style="color:#DF2A3F;">，需要勾选【Webhook】-【独立实名认证服务】-【实名认证资源-oss文件解冻完成通知】后，此字段传true，才会有通知。</font> |


### 公共响应参数
| **<font style="color:black;">参数名称</font>** | **<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>** | **示例值** |
| --- | --- | --- | --- | --- |
| code | int | 是 | 业务码，0表示成功 |  |
| message | string | 是 | 信息 |  |
| data | array | 是 | 业务信息 |  |


### 响应参数
| **<font style="color:black;">参数名称</font>** | | | **<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>** |
| --- | --- | --- | --- | --- | --- |
| fileActivationStatus | | | string | 否 | 照片/视频等文件提取状态<br/> freeze - 冻结中，需等待120秒激活后再次调用即可获取<br/> active - 已激活，文件可实时提取 |
| identity | | | object | 否 | 个人基本信息<br/><font style="color:#F5222D;">其中包含的字符串数据需要开发者自行解析，字段内容如下：</font> |
| | | name | string | 否 | 姓名 |
| | | certNo | string | 否 | 证件号 |
| | | facePhotoUrl | string | 否 | 刷脸认证时刷脸照片（base64编码的照片图片数据）<br/><font style="color:#F5222D;">补充说明：</font><br/>+ <font style="color:#F5222D;">此字段默认不返回任何信息，需联系e签宝沟通业务场景通过后才可开通</font><br/>+ <font style="color:#F5222D;">只有认证方式选择腾讯云刷脸、快捷刷脸、微信小程序刷脸和智能视频认证时，才可以返回照片</font><br/>+ <font style="color:#F5222D;">fleActivationStatus为freeze时（流程超过180天），返回空</font><br/>+ <font style="color:#F5222D;">地址有效期默认1个小时，过期后可以重新调用接口获取新的地址</font> |
| | | facePhotoAllUrl | <font style="color:rgb(64, 64, 64);">list</font> | 否 | 腾讯云人脸识别时的多张刷脸照片（<font style="color:#F5222D;"></font>最多返回3张照片，base64编码照片图片数据）<br/><font style="color:#F5222D;">补充说明：</font><br/>+ <font style="color:#F5222D;">此字段默认不返回任何信息，需联系e签宝沟通业务场景通过后才可开通</font><br/>+ <font style="color:#F5222D;">只有认证方式选择腾讯云刷脸时，才可以返回</font><br/>+ <font style="color:#F5222D;">fleActivationStatus为freeze时（流程超过180天），返回空</font><br/>+ <font style="color:#F5222D;">地址有效期默认1个小时，过期后可以重新调用接口获取新的地址</font> |
| | | similarity | string | 否 | 刷脸照片相似度得分<font style="color:rgb(23, 43, 77);"></font><br/><font style="color:#F5222D;">补充说明：</font><br/>+ <font style="color:#F5222D;">认证方式选择腾讯云刷脸、快捷刷脸、微信小程序刷脸、抖音小程序刷脸或者智能视频认证时，才会返回该字段</font><br/>+ <font style="color:#F5222D;">fleActivationStatus为freeze时（流程超过180天），返回空</font> |
| | | livingScore | string | 否 | 刷脸活体检测得分<font style="color:rgb(23, 43, 77);"></font><br/><font style="color:#F5222D;">补充说明：</font><br/>+ <font style="color:#F5222D;">认证方式选择腾讯云刷脸、快捷刷脸、微信小程序刷脸、抖音小程序刷脸或者智能视频认证时，才会返回该字段</font><br/>+ <font style="color:#F5222D;">fleActivationStatus为freeze时（流程超过180天），返回空</font> |
| | | faceVideoUrl | string | 否 | 刷脸认证时刷脸视频（base64编码的mp4视频数据）<br/><font style="color:#F5222D;">补充说明：</font><br/>+ <font style="color:#F5222D;">此字段默认不返回任何信息，需联系e签宝沟通业务场景通过后才可开通</font><br/>+ <font style="color:#F5222D;">只有认证方式选择腾讯云刷脸、快捷刷脸和智能视频认证时，才可以返回视频</font><br/>+ <font style="color:#F5222D;">fleActivationStatus为freeze时（流程超过180天），返回空</font><br/>+ <font style="color:#F5222D;">地址有效期默认1个小时，过期后可以重新调用接口获取新的地址</font> |
| | | faceType | string | 否 | 腾讯云刷脸时的刷脸模式<font style="color:#F5222D;"></font>：<br/>+ **Action_Liveness_Detection** 实时动作活体检测<br/>+ **Video_Liveness_Detection** 录制视频活体检测（默认是实时检测，因为机型兼容性等问题降级到录制视频后返回该方式）<br/><font style="color:#F5222D;">补充说明：</font><br/>+ <font style="color:#F5222D;">只有认证方式选择腾讯云刷脸时，才可以返回</font><br/>+ <font style="color:#F5222D;">fleActivationStatus为freeze时（流程超过180天），返回空</font> |
| | | idCardFrontPicUrl | string | 否 | 微信小程序刷脸认证时上传的身份证正面照片（base64编码照片图片数据）<br/><font style="color:#F5222D;">补充说明：</font><br/>+ <font style="color:#F5222D;">此字段默认不返回任何信息，需联系e签宝沟通业务场景通过后才可开通</font><br/>+ <font style="color:#F5222D;">认证方式仅限微信小程序使用e签宝微信小程序刷脸时，才会返回该字段</font><br/>+ <font style="color:#F5222D;">fleActivationStatus为freeze时（流程超过180天），返回空</font><br/>+ <font style="color:#F5222D;">地址有效期默认1个小时，过期后可以重新调用接口获取新的地址</font> |
| | | idCardBackPicUrl | string | 否 | 微信小程序刷脸认证时上传的身份证反面照片（base64编码照片图片数据），有效期默认1个小时（过期可重新获取）<br/><font style="color:#F5222D;">补充说明：</font><br/>+ <font style="color:#F5222D;">此字段默认不返回任何信息，需联系e签宝沟通业务场景通过后才可开通</font><br/>+ <font style="color:#F5222D;">认证方式仅限微信小程序使用e签宝微信小程序刷脸时，才会返回该字段</font><br/>+ <font style="color:#F5222D;">fleActivationStatus为freeze时（流程超过180天），返回空</font><br/>+ <font style="color:#F5222D;">地址有效期默认1个小时，过期后可以重新调用接口获取新的地址</font> |
| organInfo | | | object | 否 | 企业组织基本信息 |
| <br/><br/> | name | | string | 否 | 组织机构名称 |
| | certNo | | string | 否 | 组织机构证件号 |
| | certType | | string | 否 | 组织机构证件号类型<br/>CRED_ORG_USCC - 统一社会信用<br/>CRED_ORG_REGCODE - 工商注册号 |
| | legalRepName | | string | 否 | 法定代表人姓名 |
| | corporateAccount | | string | 否 | 机构对公账户名称<br/><font style="color:#F5222D;">补充说明：</font><br/>+ <font style="color:#F5222D;">仅对公打款认证方式可返回，且发起授权认证时需要授权：get_org_identity_info 权限</font> |
| | orgBankAccountNum | | string | 否 | 机构对公打款银行卡号信息<br/><font style="color:#F5222D;">补充说明：</font><br/>+ <font style="color:#F5222D;">仅对公打款认证方式可返回，且发起授权认证时需要授权：get_org_identity_info 权限</font> |
| | cnapsCode | | string | 否 | 机构对公打款银行联行号（开户行银行支行）<br/><font style="color:#F5222D;">补充说明：</font><br/>+ <font style="color:#F5222D;">仅对公打款认证方式可返回，且发起授权认证时需要授权：get_org_identity_info 权限</font> |
| | authorizationDownloadUrl | | string | 否 | 构对公打款单位实名认证授权委托书文件下载地址<br/><font style="color:#F5222D;">补充说明：</font><br/>+ <font style="color:#F5222D;">仅对公打款认证方式可返回，且发起授权认证时需要授权：get_org_identity_info 权限</font><br/>+ <font style="color:#F5222D;">地址有效期默认1个小时，过期后可以重新调用接口获取新的地址</font> |
| | licenseDownloadUrl | | string | 否 | 机构营业执照照片文件下载地址<br/><font style="color:#F5222D;">补充说明：</font><br/>+ <font style="color:#F5222D;">需要联系e签宝交付顾问开启页面OCR-营业执照上传功能，用户在认证页面上传后才能返回</font><br/>+ <font style="color:#F5222D;">发起授权认证时需要授权：get_org_identity_info 权限才能返回</font><br/>+ <font style="color:#F5222D;">地址有效期默认1个小时，过期后可以重新调用接口获取新的地址</font> |


### 请求示例  
```json
{
    "flowType": "auth", 
    "value": "4206189679777153429",
    "needCallback":true
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "fileActivationStatus": "active",
        "organInfo": null,
        "identity": {
            "name": "张贺",
            "certNo": "23118*****124329",
            "facePhotoUrl": "https://upload-pre.esign.cn/eproxy/1111564182/06399f5d-4b0d-41aa-9117-6eb07966ab90/6b37bf5443b3459c96fd20662c54e8c9?signature=jc8D%2FjMmZyhmr51MmeQr1WnQzEM%3D&expire=1765448126925&bucket=esignoss",
            "facePhotoAllUrl": null,
            "similarity": "96.2",
            "livingScore": "99.0",
            "faceVideoUrl": null,
            "faceType": "Action_Liveness_Detection",
            "idCardFrontPicUrl": null,
            "idCardBackPicUrl": null
        }
    }
}
```

****

