可以将已经在e签宝签署完成的文件上传至e签宝服务端后，拿到文件ID（fileId）向e签宝申请验签报告证明。

:::warning
**<font style="color:#DF2A3F;">注意：</font>**

+ **<font style="color:#DF2A3F;">仅支持2022年7月份之后签署的文件申请e签宝验签报告</font>**
+ **<font style="color:#DF2A3F;">需要先将签署后的文件在e签宝进行上传，获取文件ID（fileId），文件上传接口：</font>**[**《文件上传》**](https://qianxiaoxia.yuque.com/opendoc/paas_api/hdk5ao)

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/service-report/apply-by-file

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | --- | :---: | :---: | :---: | --- |
| docs | | | list | 是 | body | fileId列表，最多50个<br/><font style="color:#DF2A3F;">注：</font><br/>+ 需要提前将签署完成的文件上传至e签宝；<br/>+ 文件上传接口：[《文件上传》](https://qianxiaoxia.yuque.com/opendoc/paas_api/hdk5ao)。 |
| notifyUrl | | | string | 否 | body | 接收相关回调通知的地址，最大长度255<br/>回调通知内容见下文-[点击跳转](#f9VbP) |
| applyConfig | | | object | 是 | body | 申请配置信息 |
| | reportTemplate | | string | 是 | body | 证据报告类型<br/>请传入固定值：15 |
| | realNameType | | string | 是 | body | 实名认证类型   请传入固定值：1 |
| | willingnessType | | string | 是 | body | 意愿认证类型<br/>请传入固定值：1 |
| | signProductType | | string | 是 | body | 签署产品类型<br/>请传入固定值：1 |
| publicKey | | | string | 否 | body | RSA公钥（base64编码）   <font style="color:#DF2A3F;">补充说明：</font><br/>+ 开发者如果不想验签报告下载地址可被直接访问，可使用该方式对文件加密<br/>+ 加密后的文件通过[《查询e签宝验签报告》](https://qianxiaoxia.yuque.com/opendoc/report/awpc8y4d46up93ni)接口返回的downloadUrl来下载<br/>+ 需要用RSA私钥解密响应参数中的encryptAesKey，并使用解密后的AES密钥来解密加密后的文件<br/>+ [点击跳转 RSA密钥对的生成和文件加解密的Java参考代码](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/EncryptUtils.java)  |


### 响应参数
| **<font style="color:black;">参数名称</font>** | | | **<font style="color:black;">参数类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 否 | 业务码，0表示成功 |
| message | | | string | 否 | 业务信息<br/><font style="color:#DF2A3F;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);"></font> | | | array | 否 | 业务数据 |
| | reportFlowId | | string | 否 | 申请流程ID<br/><font style="color:#DF2A3F;">注：每次调用都会生成新的申请流程ID，后续通过该ID调用</font>[《查询e签宝验签报告》](https://qianxiaoxia.yuque.com/opendoc/report/awpc8y4d46up93ni)<font style="color:#DF2A3F;">接口获取报告。</font> |
| | customBizNum | | string | 否 | 自定义业务编号<br/><font style="color:#DF2A3F;">注：标识e签宝订单，每次调用都会生成新的编号，开发者可忽略。</font> |
| | encryptAesKey | | string | 否 | 公钥加密后的AES密钥（base64编码）<br/><font style="color:#DF2A3F;">注：传入publicKey时返回</font> |


### 请求示例
```json
{
    "docs": [
        "48ed3357519843468961fa64fc1acb26",
        "55f83e257930475387c9d6ec2f7b3d4d"
    ],
    "notifyUrl": "https://xxx.esign.cn/notifyUrl",
    "applyConfig": {
        "reportTemplate": "15",
        "signProductType": "1",
        "realNameType": "1",
        "willingnessType": "1"
    }
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "reportFlowId": "f7c992f1-5f93-4793-a8f6-d25245ee2648",
        "customBizNum": "7817ddd0-ca89-45f3-8a23-ed966f2bbc63"
    }
}
```



## 异步回调通知参数说明
异步通知接收说明详见-[e签宝回调通知接收说明](https://qianxiaoxia.yuque.com/opendoc/report/va5ewg5vtu52zoz1)

+ 目前通过HTTP协议，<font style="color:#DF2A3F;">POST</font><font style="color:#F5222D;"> </font>方法进行通知调用，内容为 <font style="color:#DF2A3F;">json</font><font style="color:#F5222D;"> </font>字符串；
+ 对接方在接收到回调请求时，需返回HTTP 状态码 200；
+ 调用超时时间5秒，首次调用失败后，1s后重试；再次失败后间隔5s再次重试，再次失败则不再通知；
+ 为了保障异步通知的可靠性，建议业务方在回调请求处理中，尽可能减少业务操作，改用异步方式处理后续业务流程。

| **<font style="color:black;">参数名称</font>** | | | **<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>** |
| --- | --- | --- | :---: | --- | --- |
| action | | | string | 是 | 标记该通知的业务类型，该通知固定为：**<font style="color:#52C41A;">REPORT_FINISH</font>** |
| reportFlowId | | | string | 是 | 申请流程id |
|    status | | | int64 | 是 | 申请流程状态：（只有1-已完结状态才会触发回调通知）<br/>0-处理中<br/>1-已完结 |
| reportFlowCreateTime | | | int64 | 是 | 发起时间 |
| reportFlowFinishTime | | | int64 | 是 | 完结时间（成功/失败时间） |
| succeededNumber | | | int64 | 是 | 成功的数量 |
| failedNumber | | | int64 | 是 | 失败的数量 |
| customBizNum | | | string | 是 | 自定义业务编号 |
| reportList | | | array | 否 | 原文和出证报告的对应关系列表 |
|    <br/>   <br/>    | |    fileId | string | 否 | 原文fileId |
| | | status | int | 否 | 出证状态 ：<br/>1-出证成功 <br/>0-出证失败 |
| | | downloadUrl | string | 否 | 验签报告zip压缩包下载地址（包含报告以及存储的文件原文） |
| | | failReason | string | 否 | 失败原因<br/>（具体某份文件失败的原因，一般是文件的问题） |
| failReason | | | string | 否 | 失败原因<br/>（整个申请流程失败的原因，一般是订单的问题） |


### 通知内容示例：**（一份文件成功，一份文件失败）**
```json
{
    "succeededNumber": 1,
    "customBizNum": "49290efc-9b25-434b-aa01-159da09b1ce9",
    "failedNumber": 1,
    "reportList": [
        {
            "downloadUrl": "https://esignoss.esign.cn/docsign-pre/f9c7cdac-dffc-47a9-9397-c9e9e679174b/test_%E7%AD%BE%E7%BD%B2%E6%8A%A5%E5%91%8A.pdf?Expires=1718355632&OSSAccessKeyId=LTAI4G23YViiKnxTC28ygQzF&Signature=PGd4cAjMEcOEuG92MTa5Jh1j1G0%3D",
            "fileId": "9bad9574a553485b9a8b4b85401a0171",
            "status": 1
        },
        {
            "failReason": "无电子签名",
            "fileId": "ab0ca3f9cc284cfa831a9c6905995060",
            "status": 0
        }
    ],
    "reportFlowFinishTime": 1718269227000,
    "action": "REPORT_FINISH",
    "reportFlowId": "3c815818-7408-4b80-a48e-295309282fa6",
    "reportFlowCreateTime": 1718269227000,
    "status": 1
}
```

### 附 e签宝回调通知服务器信息
如果贵司需要防火墙配置后才允许e签宝消息通知服务推送数据，请根据下方信息进行贵司防火墙设置。

| **环境** | **公网IP** |
| :---: | :---: |
| 沙箱模拟环境 | <font style="color:rgb(38, 38, 38);">47.96.79.204</font> |
| 线上正式环境 | <font style="color:rgb(38, 38, 38);">118.31.35.8</font> |




## 验签报告样式参考如下：
![](https://cdn.nlark.com/yuque/0/2024/png/447795/1718275202724-d808a405-6823-44e0-b8f5-3aeaa83fac17.png)

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1718275293992-79e6a6ca-8305-4b40-ab66-9cd94d88e3d2.png)

