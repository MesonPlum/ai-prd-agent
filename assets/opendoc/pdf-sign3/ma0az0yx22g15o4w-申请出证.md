### 接口描述
通过SaaS API接口的签署流程ID申请对应的电子版证据报告，与e签宝SaaS官网申请的电子版报告效果一致，需要购买对应的套餐后才可以使用。

:::warning
<font style="color:#DF2A3F;">注意：</font>

<font style="color:#DF2A3F;">1、接口为异步出证，出证成功后，会通过回调地址返回出证报告zip压缩包下载地址（包含出证报告以及存储的文件原文）。</font>

<font style="color:#DF2A3F;">2、会校验当前申请出证的应用ID（appID）对应的主体企业是否是签署流程的参与方（发起方或者签署方），必须是参与方才支持出证，暂不支持第三方平台代用户出证的场景。</font>

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/evidence-report/apply

**请求方法：**POST

**<font style="color:#333333;">请求域名：</font>**

| **开发环境** | **请求域名** | **公网IP** | **端口** |
| --- | --- | --- | --- |
| 沙箱环境 | https://smlopenapi.esign.cn | 114.55.17.44 | 443 |
| 正式环境 | https://openapi.esign.cn | <font style="color:#262626;background-color:#FFFFFF;">118.31.181.75</font> | 443 |


### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **<font style="color:black;">参数名称</font>** | | **<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **参数类型** | **<font style="color:black;">参数说明</font>** |
| --- | --- | :---: | :---: | --- | --- |
| signFlowId | | string | 是 | body | SaaS API接口的签署流程ID  |
| notifyUrl | | string | 否 | body | 回调通知地址<br/><font style="color:#DF2A3F;">系统异步出证，出完发送回调通知，通知里包含报告下载的zip包</font> |
| reportType | | string | 否 | body | 出证报告类型<br/>（[点击了解 存出证产品相关文件说明](https://qianxiaoxia.yuque.com/opendoc/helper/wukdssaps0fio55u)）<br/>**TSIGN_REPORT** - e签宝证据报告<font style="color:#DF2A3F;">（默认）</font><br/>**BLOCKCHAIN_REPORT** - 全流程区块链证据报告<br/>**FINANCIAL_VERIFY_REPORT** - e签宝电子文件验签报告<br/><font style="color:#DF2A3F;">注：</font><br/>上述类型对应的e签宝套餐分别是：e签宝证据报告-电子版、区块链全流程存证证据报告-电子版、验签报告-电子版 |
| applicantId | | string | 否 | body | 出证申请方账号ID（如不传此字段，证据报告内的出证申请人默认为平台方）<br/><font style="color:#DF2A3F;">【注】</font>：用户需提前完成授权（通过[《机构用户授权》](https://qianxiaoxia.yuque.com/opendoc/auth3/kcbdu7)或[《个人用户授权》](https://qianxiaoxia.yuque.com/opendoc/auth3/rx8igf)接口），并获取以下相应权限后方可指定本字段：<br/>+ apply_org_evidence（代表企业/组织申请出证）<br/>+ apply_psn_evidence（代表个人申请出证） |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#DF2A3F;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:#DF2A3F;">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
| | recordNum | | | | string | 否 | 申请出证编号 |


### 请求示例  
**POST请求地址示例：**

```http
https://openapi.esign.cn/v3/evidence-report/apply
```

**body体内JSON数据示例：**

```json
{
    "signFlowId": "f19810f*****2d0ed",
    "notifyUrl": "http://******/notify"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "recordNum": "13934******001"
    }
}
```

### 错误码
| **错误码** | **错误描述** | **解决方案** |
| --- | --- | --- |
| 1480201 | 余额不足 | 需购买“e签宝证据报告（电子版）”套餐后才可以使用。<br/>沙箱环境请联系群内交付顾问赠送；<br/>正式环境请联系客户经理购买。 |
| 1480203 | 经校验，您无权出证 | 非签署参与方，不支持出证。证据报告的申请方必须是流程的参与方（发起方或签署方），根据当前appid对应的企业进行校验。 |
| 1480205 | 签署过程存在不可信，需要线下联系客服人工办理，联系电话：400-087-8198 | 请联系e签宝客服或者对接群内的客户成功经理人工出证。 |
| 1480207 | 获取签署流程信息失败 | 签署流程ID（signFlowId）不存在或者不是当前环境创建的，请检查signFlowId是否正确。 |




## 异步出证回调通知参数说明
+ 目前通过HTTP协议，<font style="color:#DF2A3F;">POST</font><font style="color:#F5222D;"> </font>方法进行通知调用，内容为 <font style="color:#DF2A3F;">json</font><font style="color:#F5222D;"> </font>字符串；
+ 对接方在接收到回调请求时，需返回HTTP 状态码 200；
+ 为了保障异步通知的可靠性，建议业务方在回调请求处理中，尽可能减少业务操作，改用异步方式处理后续业务流程。

| **<font style="color:black;">参数名称</font>** | | **<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>** |
| --- | --- | :---: | --- | --- |
| action | | string | 是 | 标记该通知的业务类型，该通知固定为：**<font style="color:#52C41A;">EVIDENCE_REPORT_FINISH</font>** |
| recordNum | | string | 是 | 申请出证编号 |
| status | | string | 是 | 申请出证流程状态：<br/>**ISSUE_SUCCESS**（出证成功）<br/>**ISSUE_FAILED**（出证失败） |
| downloadUrl | | string | 否 | 出证报告zip压缩包下载地址（包含出证报告以及存储的文件原文） |
| failReason | | string | 否 | 失败原因 |


### 通知内容示例：
**成功示例：**

```json
{
    "downloadUrl": "https://esignoss.esign.cn/flash/811119d-ed2a-4ef8-8e90-96b2c2b7ad25/20230505094954576802.zip?Expires=1683337797&OSSAccessKeyId=LTAI4G23YViiKnxTC28ygQzF&Signature=nCoE4z2bFUM98FFQfAKItrq7JvQ%3D",
    "action": "EVIDENCE_REPORT_FINISH",
    "recordNum": "20230*****576802",
    "status": "ISSUE_SUCCESS"
}
```

**失败示例：**

```json
{
    "action": "EVIDENCE_REPORT_FINISH",
    "failReason": "出证失败",
    "recordNum": "20230*******576810",
    "status": "ISSUE_FAILED"
}
```

### 附 e签宝回调通知服务器信息
如果贵司需要防火墙配置后才允许e签宝消息通知服务推送数据，请根据下方信息进行贵司防火墙设置。

| **环境** | **公网IP** |
| :---: | :---: |
| 沙箱模拟环境 | <font style="color:rgb(38, 38, 38);">47.96.79.204</font> |
| 线上正式环境 | <font style="color:rgb(38, 38, 38);">118.31.35.8</font> |


