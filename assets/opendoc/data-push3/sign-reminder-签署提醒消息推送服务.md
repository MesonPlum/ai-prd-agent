## 本文目录导航指引
_<font style="color:#8C8C8C;">锚点跳转定位可能存在轻微页面滚动偏差，跳转后请上下滚动页面查看。</font>_

[1.服务概述](#tebPX)

[2.应用场景](#dmmFK)

[3.使用前提](#wuKZv)

[4.接收签署提醒消息步骤说明](#hFZQ9)

[5.e签宝通知服务安全机制](#TvcMT)

## <font style="color:rgb(64, 64, 64);">1.</font>服务概述
<font style="color:rgb(64, 64, 64);">除发送短信和邮件进行签署提醒之外，e签宝开放平台还支持通过消息推送的方式，向开发者应用系统推送签署提醒消息。</font>

:::info
**<font style="color:#E8323C;">【注意事项】</font>**

<font style="color:rgb(64, 64, 64);">（1）支持</font>**<font style="color:#E8323C;">e签宝 SaaS 智能合同/钉签</font>**、**<font style="color:#E8323C;">e签宝 SaaS API/钉签 API</font>** 产品中的签署提醒通知推送。

<font style="color:rgb(23, 26, 29);">（2）贵司作为</font>**<font style="color:rgb(23, 26, 29);">签署方</font>**<font style="color:rgb(23, 26, 29);">角色所涉及的签署流程，本服务才会推送签署提醒消息。</font>

<font style="color:rgb(23, 26, 29);">（3）贵司仅作为抄送方、发起方（不参与签署）等角色所涉及的签署流程，本服务不会推送签署提醒消息。</font>

:::

## 2.应用场景
**<font style="color:rgb(64, 64, 64);">希望将签署通知与自身应用系统关联结合</font>**

<font style="color:rgb(64, 64, 64);">开发者想通过自身应用系统对签署通知消息进行录入、提醒等自动化方式处理签署通知时，可使用此服务。</font>

## <font style="color:rgb(64, 64, 64);">3.使用前提</font>
<font style="color:rgb(64, 64, 64);">开发者需同时满足以下条件才可以使用签署通知推送服务。</font>

条件1：开发者准备一个支持 POST 请求的Web服务，且此 Web 服务的 URL 可以被互联网访问。

条件2：开发者联系e签宝交付顾问申请开通签署通知推送服务并提供用于接收签署提醒消息的 Web Url 地址。

条件3：开发者想要接收来自e签宝 SaaS 智能合同版、e签宝 SaaS 钉签版和e签宝 SaaS API 产品中的签署通知。

## 4.接收签署提醒消息步骤说明
+ 首先，开发者联系e签宝交付顾问配置用于接收签署提醒消息的 Web Url 地址。
+ 然后，每当贵司作为签署方角色所涉及的签署流程被触发，即轮到贵司签署时，e签宝通知服务将会创建一个JSON对象，其中包含事件类型和相关的签署提醒等数据信息，并通过 POST 请求将 JSON 对象数据推送到开发者提供的 Web Url 中。
+ 最后，开发者应用系统在收到签署提醒消息数据后，可根据事件类型和相关数据做下一步的自身业务处理。

其步骤流程描述如下：

![](https://cdn.nlark.com/yuque/__puml/980bc6bcab15534e991dd44f91d05f3b.svg)

### 4.1 准备一个支持 POST 请求的 Web 服务
e签宝通知服务将以 POST 请求方式推送 JSON 格式的数据，因此开发者所提供的 Web 服务需要能够接收并解析来自 POST 请求的 JSON 数据并能够返回相应 HTTP 状态码。

### 4.2 配置用于接收签署提醒消息的Url地址
开发者联系e签宝交付顾问来配置用于接收签署提醒消息的 Web Url 地址。

:::info
**<font style="color:#E8323C;">【注意事项】</font>**

+ 用于接收签署提醒消息的 Url 地址格式需符合 {scheme}://{host}:{port}/{path}，详见文末[附1 回调通知URL格式说明](#kDrh0)。
+ 请确保用于接收签署提醒消息的 Url 地址拼接正确，且互联网可成功访问。

:::

### 4.3 接收并响应
#### 4.3.1 接收签署提醒消息通知
当签署流程中轮到贵司进行签署操作时，e签宝通知服务会主动以 POST 请求方式，向开发者所配置的Web Url 地址推送对应的签署提醒消息数据。

:::warning
**<font style="color:#E8323C;">【提示】</font>**

+ 若贵司有网络安全策略，请按照文末[附2 e签宝通知服务器信息](#KyEtR)配置防火墙，以便成功接收回调通知。

:::

**请求头**数据格式如下：

```http
Content-Type:application/json; charset=UTF-8
X-Tsign-Open-App-Id:7111XXX
X-Tsign-Open-TIMESTAMP:1563968035000
X-Tsign-Open-SIGNATURE-ALGORITHM:hmac-sha256
X-Tsign-Open-SIGNATURE:ZdTWCiDGlbJbDcOQbPEc0/BXKi+oGgNak97uc+7jbw8=
```

**请求Body**数据格式如下：

```json
{
   "action": "PARTNER_SIGN_NOTICE", 
   "signFlowId": "ac016***2bbe", 
   "signFlowTitle":"xx公司合作协议",
   "signFlowStatus":"1",
   "transactorPsnId": "217c64***cdd", 
   "orgId": "f9dbc***2de1", 
   "viewUrl": "https://openapi.esign.cn/mesign/contract-preview?context=xx&flowId=xx&organ=true&appId=xx&linkSource=1&bizType=1&tsign_source_type=SIGN_LINK_XUANYUAN&tsign_source_detail=16R2mv%x%x%2BS0DYxKqib5Qq%x%2Fnu7a2jDvi%x", 
   "signUrl": "https://openapi.esign.cn/mesign/guide?context=xx&flowId=xx&organ=true&appId=xx&linkSource=1&bizType=1&tsign_source_type=SIGN_LINK_XUANYUAN&tsign_source_detail=16R2mv%x%x%x%x%2Fnu7a2jDvi%x", 
   "copiers": [
        {
            "copierPsnId":"87f5a4***a97d94a",
            "copierPsnName":"抄送人姓名",
            "copierOrgId":"1868f***d8ae11",
            "copierOrgName":"抄送的企业名称",
        }
    ], 
  "signers": [
    {
      "signStatus": "2",
      "orgSigner": {
        "orgId": "e4dcd***df12f7",
        "orgName": "甲方企业名称",
        "transactor": {
          "psnName": "甲方经办人姓名",
          "psnId": "4cea92***5124",
          "psnMobile": "131****1111"
        }
      }
    },
    {
      "signStatus": "1",
      "orgSigner": {
        "orgId": "1868f***d8ae11",
        "orgName": "乙方企业名称",
        "transactor": {
          "psnName": "乙方经办人姓名",
          "psnId": "87f5a4***a97d94a",
          "psnMobile": "132****2222"
        }
      }
    }
  ],
  "signFlowInitiator": {
    "orgInitiator": {
      "orgId": "e4dcd***df12f7",
      "orgName": "这里是个发起方的企业名称",
      "transactor": {
        "psnId": "4cea92***5124",
        "psnName": "发起方经办人姓名"
      }
    }
  },
  "timestamp": 1656666157710
}
```

其中：

**action** 为业务事件类型，开发者可以通过判断返回 JSON 中的 action 业务事件类型，来进行下一步业务处理。

**签署提醒消息推送字段参数说明**

| **参数名** | | | | **参数类型** | **说明** |
| --- | --- | --- | --- | :---: | --- |
| action | | | | string | 通知业务事件类型，<br/>签署提醒消息事件的 action 固定值：**<font style="color:#52C41A;">PARTNER_SIGN_NOTICE</font>** |
| timestamp | | | | int64 | 消息推送触发时间，Unix时间戳格式，单位：毫秒。 |
| signFlowId | | | | string | 签署流程ID |
| signFlowTitle | | | | string | 签署流程标题 |
| signFlowStatus | | | | int32 | 签署流程状态<br/>**1 **- 签署中<br/>**2 **- 已完成（流程结束后触发）<br/>**3** - 已撤销（发起方撤销签署任务）<br/>**5 **- 已过期（<font style="background-color:#F8F8F8;">签署截止日到期后触发</font>）<br/>**7** - 已拒签（签署方拒绝签署） |
| transactorPsnId | | | | string | 当前经办人账号ID |
| orgId | | | | string | 当前签署机构账号ID |
| docDownloadUrl | | | | list | 文件下载地址列表（每份文件单独一个url）<br/><font style="color:#DF2A3F;">注：signFlowStatus状态为</font>**<font style="color:#DF2A3F;">2（已完成）</font>**<font style="color:#DF2A3F;">时才可返回</font> |
| viewUrl | | | | string | 合同预览链接<font style="color:#DF2A3F;">（无需登录可直接预览）</font><br/><font style="color:#DF2A3F;">注：signFlowStatus状态为</font>**<font style="color:#DF2A3F;">1（签署中）</font>**<font style="color:#DF2A3F;">时才可返回</font> |
| signUrl | | | | string | 合同签署链接<font style="color:#DF2A3F;">（无需登录可直接签署）</font><br/><font style="color:#DF2A3F;">注：signFlowStatus状态为</font>**<font style="color:#DF2A3F;">1（签署中）</font>**<font style="color:#DF2A3F;">时才可返回</font> |
| **signFlowInitiator** | | | | **object** | **签署流程发起方信息** |
| | orgInitiator | | | object | 机构发起方信息 |
| | <br/><br/> | orgId | | string | 机构账号ID |
| | | orgName | | string | 机构发起方企业名称 |
| | | transactor | | object | 机构发起方的经办人 |
| | | | psnId | string | 经办人账号ID |
| | | | psnName | string | 经办人姓名 |
| | psnInitiator | | | object | 个人发起方信息 |
| | | psnId | | string | 个人账号ID |
| | | psnName | | string | 个人发起方姓名 |
| **signers** | | | | **array** | **签署方信息** |
| | signStatus | | | int32 | 签署状态<br/>**1 **- 签署中, **2 **- 已完成 |
| | orgSigner | | | object | 机构签署方信息 |
| | | orgId | | string | 机构账号ID |
| | | orgName | | string | 机构名称（账号标识） |
| | | transactor | | object | 机构经办人信息 |
| | | | psnName | string | 经办人姓名 |
| | | | psnId | string | 经办人账号ID |
| | | | psnMobile | string | 经办人手机号（脱敏显示） |
| | | | psnEmail | string | 经办人邮箱（脱敏显示） |
| | psnSigner | | | object | 个人签署方信息 |
| | | psnName | | string | 个人姓名 |
| | | psnId | | string | 个人账号ID |
| | | psnMobile | | string | 个人手机号（脱敏显示） |
| | | psnEmail | | string | 个人邮箱（脱敏显示） |
| **copiers** | | | | **array** | **抄送方信息** |
|  | copierPsnId | | | string | 抄送人账号ID |
| | copierPsnName | | | string | 抄送人姓名 |
| | copierOrgId | | | string | 抄送企业账号ID |
| | copierName | | | string | 抄送企业名称 |


:::warning
<font style="color:#F5222D;">Action事件类型可能会出现新增，建议开发者考虑兼容性处理，防止出现代码异常造成业务卡死。</font>

例如，Action业务事件类型判断时，仅将贵司业务需要的类型进行判断并进入下一步业务，其他不需要的类型做忽略处理，这样可以防止新增类型对现有业务造成影响。

:::

#### 4.3.2 响应e签宝回调通知
当收到e签宝的回调通知后，开发者需返回 HTTP 状态码给e签宝通知服务。所返回的200 ~ 299之间的 HTTP 状态码均会被e签宝通知服务认定为通知成功。

除返回 HTTP 状态码之外，同时建议按以下 JSON 格式向e签宝通知服务返回 Body体数据。

```json
{"code":"200","msg":"success"}
```

:::info
**<font style="color:#E8323C;">【注意事项】</font>**

+ 开发者返回给e签宝的 HTTP 状态码介于<font style="color:#E8323C;">200~299</font>之间，e签宝认为通知成功，否则e签宝认为通知失败。
+ 通知失败后，e签宝通知服务将会进行<font style="color:#E8323C;">16次重试</font>通知。重试机制如下：

     ![](https://cdn.nlark.com/yuque/0/2022/png/21775387/1654686088049-f955e812-e9af-4897-a4dc-ec9dc826479b.png)

     （若中间重试通知成功，则中断不再继续重试）。

+ 为避免因e签宝通知服务解析 JSON 数据失败而导致重复通知，请确保返回的 JSON 数据中不含空格 \/等特殊字符，建议接收成功时直接返回`{"code":"200","msg":"success"}`。
+ 为了保障回调通知的时效性和可靠性，建议开发者在接收到回调通知后在<font style="color:#E8323C;">5秒内返回 HTTP 状态码（200）</font>给e签宝通知服务。
+ 若开发者无法在5秒内完成回调通知相关业务处理，请采用异步方式进行后续业务处理。

:::

## 5.e签宝通知服务安全机制
为了保证通知数据推送的安全，e签宝提供IP白名单模式和签名验签模式两种模式供开发者选择。

两种模式可以单独使用，也可以组合使用。

### 5.1 IP白名单模式
开发者可以采用IP白名单机制来保障回调通知接收服务的安全，开发者可以参考文末[附2 e签宝通知服务器信息](#KyEtR)来配置贵司的防火墙。

以下以Nginx服务器为例，介绍如何配置防火墙白名单来允许e签宝回调通知服务入站。

**（1）新建白名单文件 ip_white.conf**

新建文件ip_white.conf，内容如下：

```nginx
allow 47.96.79.204;
allow 118.31.35.8;
```

**（2）nginx.conf 配置示例**

```nginx
#geoIP的白名单设置
geo $remote_addr $ip_whitelist {
    default 0;
    include ip_white.conf;
}
location /console {
     proxy_redirect    off;
     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
     proxy_set_header X-Real-IP $remote_addr;
     proxy_set_header Host $http_host;
     if ( $ip_whitelist = 1 ) {
       proxy_pass http://127.0.0.1:8000;
       break;
     }
    return 403;
}
```

**（3）Java中获取请求IP代码示例**

```java
public static String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip != null && ip.length() != 0 && !"unknown".equalsIgnoreCase(ip)) {
            // 多次反向代理后会有多个ip值，第一个ip才是真实ip
            if( ip.indexOf(",")!=-1 ){
                ip = ip.split(",")[0];
            }
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
```

### 5.2 签名验签模式
开发者在接收到回调通知时，可以借助请求头 Header 中的信息对推送的数据进行签名验签。

请求头 Header 参数如下：

| **参数名称** | **参数类型** | **参数说明** |
| :--- | :---: | :--- |
| X-Tsign-Open-App-Id | header | 客户发生业务时的项目ID |
| X-Tsign-Open-SIGNATURE | header | 签名值 |
| X-Tsign-Open-TIMESTAMP | header | 时间戳 |
| X-Tsign-Open-SIGNATURE-ALGORITHM | header | 使用的算法,<br/>默认算法 hmac-sha256 |


以算法hmac-sha256签名验证做说明，验签的数据有四部分

+ 1、时间戳

回调header的X-Tsign-Open-TIMESTAMP

+ 2、query请求的数据

客户设置的回调地址可能包含query数据，例如callback?accountId=aaa&orderNo=001。（e签宝平台不会追加任何参数）

+ 3、body 数据

即通知实际内容，按照整体的字节流来处理

+ 4、项目ID对应的密钥

客户在e签宝开放平台生成项目ID时对应的密钥

**JAVA代码示例**

java demo

[【点击下载回调通知签名验签 JAVA Demo】](https://qianxiaoxia.yuque.com/docs/share/f3821397-0468-4392-864d-fb684d675ea3?#)

**PHP代码示例**

```php
<?php
callback();
//签署回调
function callback(){
    //    此处可以打印下日志  
    $file = fopen('callback.log', "a");
    fwrite($file, "startTime".date('Y-m-d H:i:s'));
  
    if($_SERVER['REQUEST_METHOD'] != 'POST'){
        fwrite($file,'非法回调');exit;
     }
  
    fwrite($file, json_encode($_SERVER));

//    校验签名 如果header里放入的值为X_TSIGN_OPEN_SIGNATURE，到header里会自动加上HTTP_，并且转化为大写，取值时如下
    if(!isset($_SERVER['HTTP_X_TSIGN_OPEN_SIGNATURE'])){
        echo "签名不能为空";exit;
    }
    $sign =  $_SERVER['HTTP_X_TSIGN_OPEN_SIGNATURE'];
    fwrite($file,'sign:'.$sign);

    $secret = 'xxxxx';//项目对应密钥

    //1.获取时间戳的字节流
    if(!isset($_SERVER['HTTP_X_TSIGN_OPEN_TIMESTAMP'])){
        echo "时间戳不能为空";exit;
    }
    $timeStamp =  $_SERVER['HTTP_X_TSIGN_OPEN_TIMESTAMP'];

    //2.获取query请求的字节流，对 Query 参数按照字典对 Key 进行排序后,按照value1+value2方法拼接
    $params = $_GET;
    if(!empty($params)){
        ksort($params);
    }

    $requestQuery = '';
    foreach($params as $val){
        $requestQuery .= $val;
    }
    fwrite($file,'获取query的数据:'.$requestQuery);

    //3. 获取body的数据
    $body = file_get_contents("php://input");
    fwrite($file,'获取body的数据:'.$body);

    //4.组装数据并计算签名
    $data = $timeStamp . $requestQuery . $body;
    fwrite($file,'组装数据并计算签名:'.$data);


    echo $sign;
    $mySign = hash_hmac("sha256", $data, $secret);

    echo $mySign;
    if($mySign != $sign){
        echo '验签失败';
        fwrite($file,"签名校验失败");
    }else{
        echo '验签成功';
    }

    $result = json_decode($body,true);
    switch ($result['action']){
        case 'SIGN_FLOW_UPDATE':
            //签署人签署完成回调
            // {"action":"SIGN_FLOW_UPDATE","flowId":"56090bd2057b4774aa43b4c90ed3991a","accountId":"bbd3ea11ef4d426b856348fb850613ff","authorizedAccountId":"bbd3ea11ef4d426b856348fb850613ff","order":1,"signTime":"2019-09-23 10:06:31","signResult":2,"resultDescription":"签署完成","timestamp":1569204391641}
            break;
        case 'SIGN_FLOW_FINISH':
            //流程结束逻辑处理
            //{"action":"SIGN_FLOW_FINISH","flowId":"56090bd2057b4774aa43b4c90ed3991a","businessScence":"合同名称","flowStatus":"2","createTime":"2019-09-23 10:06:31","endTime":"2019-09-23 10:06:32","statusDescription":"完成","timestamp":1569204391824}
            break;
    }
}
```

**.NET代码示例**

```json
 public static void notify()
        {
            //异步通知请求地址 "notifyUrl": "http://saledemo.tsign.cn:9090/asyn/notify?belong=tianyin",
            //异步通知获取到的签名值
            string signture = "xxxxxx31063db9f5e70f391445480b112f66ac728f19ff11755";
            //1578384199851:header头中的时间戳x-tsign-open-timestamp；
              tianyin:是异步请求地址拼接的请求参数值，如果请求地址没有？拼接参数，则只填写时间戳
            string a = "xxxxx51";
            //密钥
            string secret = "xxxx4d8f922b898ac519b4c    f";
           // body体请求参数
            string data = "{\"flowId\":\"xxxx8926460290884\",\"success\":true,\"contextId\":\"xxxd-c5f9-4652-a053-1130d86c8fa8\",\"verifycode\":\"xxx240623371c84becdc\",\"serviceId\":\"xxxx290884\",\"status\":true}";
            //最终参与验签的请求参数
            string data1 = a + data;
            //计算签名方法
            string mysign = GetSignature(data1, secret);
            string MYSIGN = mysign.ToLower();
            Console.Write("mysign=" + mysign);
           
            if (MYSIGN.Equals(signture))
                {
                MessageBox.Show("验签成功");
            }
            else
            {
                MessageBox.Show("验签失败");
            }
        }

        public static string GetSignature(string data, string secret)
        {
            byte[] keyByte = Encoding.UTF8.GetBytes(secret);
            byte[] messageBytes = Encoding.UTF8.GetBytes(data);
            using (var hmacsha256 = new HMACSHA256(keyByte))
            {
                byte[] hashmessage = hmacsha256.ComputeHash(messageBytes);
                StringBuilder sb = new StringBuilder();
                foreach (byte test in hashmessage)
                {
                    sb.Append(test.ToString("X2"));
                }
                return sb.ToString();
            }
        }
```

## 附1 回调通知URL格式说明
**URL格式：{scheme}://{host}:{port}/{path} **

:::info
**<font style="color:#F5222D;">【解释说明】</font>**

`**<font style="color:#000000;">scheme</font>**`指 https 或 http 协议

`**<font style="color:#000000;">host</font>**`指 贵司用来接收回调通知的域名或公网IP

`**<font style="color:#000000;">port</font>**`指 贵司用来接收回调通知的Web服务端口

`**<font style="color:#000000;">path</font>**`指 贵司用来接收回调通知的Web服务具体路径（允许含带Query参数，如path?type=xxx）

<font style="color:#F5222D;">注：回调通知Url中不能含有空格或其他特殊字符。</font>

:::

| **正确示例** |  |
| --- | --- |
| 正确的URL格式： | https://example.demo.cn:8080/notify/receive |
| 正确的URL格式： | http://223.X.X.5:8080/notify/receive |
| **错误示例** |  |
| 只有路径没有地址： | .notify/receive |
| 只有地址，没有具体服务路径： | https://example.demo.cn:8080 |
| 本地内网IP，互联网无法访问： | https://localhost:8080/notify/receive |
| 本地内网IP，互联网无法访问： | http://192.168.1.1:8080/notify/receive |
| 本地内网IP，互联网无法访问： | https://127.0.0.1:8080/notify/receive |
| 非URL格式： | test、123456等 |


## 附2 e签宝回调通知服务器信息
如果贵司需要防火墙配置后才允许e签宝消息通知服务推送数据，请根据下方信息进行贵司防火墙设置。

| **环境** | **公网IP** |
| :---: | :---: |
| 沙箱模拟环境 | <font style="color:rgb(38, 38, 38);">47.96.79.204</font> |
| 正式环境 | <font style="color:rgb(38, 38, 38);">118.31.35.8</font> |


