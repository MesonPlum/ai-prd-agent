## 1.合同比对回调通知概述
+ 首先，开发者配置回调通知Web Url地址。
+ 每当，相关事件发生时（如合同比对结果），e签宝通知服务将会创建一个JSON对象，其中包含事件类型和与该事件相关的数据等信息。
+ 然后，e签宝通知服务通过 HTTP POST 请求将JSON对象发送到开发者配置的回调通知 Web Url中。
+ 开发者业务系统在收到回调通知后，可根据事件类型和相关数据做下一步的业务处理。

其流程描述如下：

![](https://cdn.nlark.com/yuque/__puml/05afe651f7ff60afee26404308744a18.svg)

## 2.接收合同比对类回调通知
### 2.1 准备一个支持 HTTP POST 的 Web 服务
e签宝通知服务将以 HTTP POST 方式推送 JSON 格式的数据，因此开发者所提供的 Web 服务需要能够接收并解析来自HTTP POST 请求的 JSON 数据并能够返回相应 HTTP 状态码。

### 2.2 设置回调通知Url地址
:::info
**<font style="color:#E8323C;">【注意事项】</font>**

+ 回调通知Url地址格式需符合 {scheme}://{host}:{port}/{path}，详见文末[附2 回调通知URL格式说明](#kDrh0)。
+ 请确保回调通知Url地址拼接正确，且互联网可成功访问。

:::

开发者登录e签宝 [**开放平台**](https://open.esign.cn) 后点击【控制台】进入e签宝开发者控制台，在页面上方先选择【正式服务】<font style="color:#DF2A3F;">（沙箱环境则选择【沙箱服务】，其他流程一致）</font>，然后在页面下方左侧点击【应用管理】-【我的应用】后在右侧应用列表页面中点击【配置】进入“应用配置”页面，选择【消息推送】模块的“添加”按钮即可配置接收回调通知的URL，并需要在事件订阅中勾选对应事件。如下图：

![](https://cdn.nlark.com/yuque/0/2021/png/432598/1639619150410-08f204c0-0143-4e45-85f8-b6379c47a739.png)

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1735270323490-d3163256-3726-4846-9d88-501446d4aa65.png)

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1765968269246-927fc4f7-3f78-4665-ab11-4ffd31f9af4a.png)

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1765968175951-b586f23e-48ad-4a54-b1d0-a9430dec842b.png)

### 2.3 接收并响应
#### 2.3.1 接收e签宝回调通知
当某个事件发生后，e签宝会主动 POST 请求开发者所设置的回调通知 Url 地址，并推送对应的事件数据信息。

:::warning
**<font style="color:#E8323C;">【提示】</font>**

+ 若贵司有网络安全策略，请按照文末[附3 e签宝通知服务器信息](#KyEtR)配置防火墙，以便成功接收回调通知。

:::

**请求头**数据格式如下：

```json
{
  "X-Tsign-Open-TIMESTAMP":"1713508339505",
  "X-Tsign-Open-SIGNATURE-ALGORITHM":"hmac-sha256",
  "X-Tsign-Open-App-Id":"74XXXXXX",
  "X-Tsign-Open-SIGNATURE":"60c6719d332420f251234d72631e93e83e80061f47f78bc483a851a710"
}
```

**请求Body**数据格式如下：

```json
{
    "action": "CONTRACT_COMPLETE_RESULT",
    "contractCompareBizId": "e819098fcc111fdfbccef373b67ee7e3",
    "contractCompareResult": "identical",
    "failReason": "",
    "timestamp": 1731050570000
}
```

其中：

**action** 为业务事件类型，开发者可以通过判断返回 JSON 中的 action 业务事件类型，来进行下一步业务处理。

可通过查看文末[附1 Action事件列表](#juMxj)了解相关事件的回调通知数据。

:::warning
<font style="color:#F5222D;">Action事件类型可能会出现新增，建议开发者考虑兼容性处理，防止出现代码异常造成业务卡死。</font>

例如，Action业务事件类型判断时，仅将贵司业务需要的类型进行判断并进入下一步业务，其他不需要的类型做忽略处理，这样可以防止新增类型对现有业务造成影响。

:::

#### 2.3.2 响应e签宝回调通知
e签宝的回调通知触发后，返回的**<font style="color:#DF2A3F;">200 ~ 299</font>**之间的 **<font style="color:#DF2A3F;">HTTP 状态码</font>**均会被e签宝通知服务认定为通知成功。

除返回 HTTP 状态码之外，同时建议开发者按以下 JSON 格式向e签宝通知服务返回 Body体数据<font style="color:#DF2A3F;">（e签宝不对开发者返回的Body体数据做判断）</font>。

```json
{"code":"200","msg":"success"}
```

:::info
**<font style="color:#E8323C;">【注意事项】</font>**

+ 返回给e签宝的 HTTP 状态码介于<font style="color:#E8323C;">200~299</font>之间，e签宝认为通知成功，否则e签宝认为通知失败。
+ 通知失败后，e签宝通知服务将会进行最多<font style="color:#E8323C;">16次重试</font>通知。重试机制如下：

（若中间重试通知成功，则中断不再继续重试）![](https://cdn.nlark.com/yuque/0/2024/png/447795/1706666848321-21b2cc93-9417-4f91-b7c1-01b604a86dad.png)

+ 为避免因e签宝通知服务解析 JSON 数据失败而导致重复通知，请确保返回的 JSON 数据中不含空格 \/等特殊字符，建议接收成功时直接返回`{"code":"200","msg":"success"}`。
+ 为了保障回调通知的时效性和可靠性，建议开发者在接收到回调通知后在<font style="color:#E8323C;">5秒内返回 HTTP 状态码（200）</font>给e签宝通知服务。
+ 若开发者无法在5秒内完成回调通知相关业务处理，请采用异步方式进行后续业务处理。

:::

## 3.e签宝回调通知安全机制
为了保证回调通知数据推送的安全，e签宝提供IP白名单模式和签名验签模式两种模式供开发者选择。

两种模式可以单独使用，也可以组合使用。

### 3.1 IP白名单模式
开发者可以采用IP白名单机制来保障回调通知接收服务的安全，开发者可以参考文末[附3 e签宝通知服务器信息](#KyEtR)来配置贵司的防火墙。

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

### 3.2 签名验签模式
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

开发者设置的回调地址可能包含query数据，例如callback?accountId=aaa&orderNo=001，多个 Query 参数需要对 key 按字典(ASCII码)升序排序后，再按照value1+value2方法拼接。<font style="color:#DF2A3F;">（e签宝平台不会追加任何参数）</font>

+ 3、body 数据

即通知实际内容，按照整体的字节流来处理

+ 4、应用secret

开发者在e签宝开放平台，生成应用ID时对应的应用secret

****

**JAVA代码示例**

【点击下载回调通知签名验签JAVA_Demo：[XYAPINotifySafe.zip](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/XYAPINotifySafe.zip)】

```java
import cn.tsign.hz.exception.DefineException;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

public class testNotify {
    public static void main(String[] args) throws DefineException {

        //应用secret
        String appSecret ="cfbcbb11112e1195655cd70caf3094b8";

        //异步通知获取到的header头中的签名值：X-Tsign-Open-SIGNATURE
        String signture =  "1a6d2568604be05b1111433e53d59a7337fcd081029950911a347e0b2f4dbef8";
        
        //异步通知获取到的header头中的时间戳：X-Tsign-Open-TIMESTAMP
        String timestamp = "1729489875363";
        
        //案例："pinjie"和"001"是开发者异步地址上拼接的Query参数值，多个Query参数需要对 key 按字典(ASCII码)升序排序后，再按照value1+value2方法拼接
        //如果异步通知地址没有拼接Query，那么这里不需要参与签名计算
        String requestQuery ="pinjie001";
        
        //通知内容的body的数据
        String rbody ="{\"action\":\"SIGN_MISSON_COMPLETE\",\"timestamp\":1729489875359,\"signFlowId\":\"903f7ebee9411105b7f01d0b97a5ebf5\",\"customBizNum\":\"自定义编码001\",\"signOrder\":1,\"operateTime\":1729489875000,\"signResult\":2,\"resultDescription\":\"签署完成\",\"organization\":{\"orgId\":\"eb75d38e61111c8e964aa308edaa7904\",\"orgName\":\"霁林测试有限公司\"}}";
        
        //按照规则进行加密
        String signdata = timestamp  + requestQuery + rbody;
        String mySignature= getSignature(signdata, appSecret,"HmacSHA256","UTF-8");
        System.out.println("加密出来的签名值：----------->>>>>>"+mySignature);
        System.out.println("header里面的签名值：---------->>>>>>"+signture);
        if(mySignature.equals(signture)) {
            System.out.println("校验通过");

        }else {
            System.out.println("校验失败");
        }
    }


    /***
         * 获取请求签名值
         *
         * @param data
         *            加密前数据
         * @param key
         *            密钥
         * @param algorithm
         *            HmacMD5 HmacSHA1 HmacSHA256 HmacSHA384 HmacSHA512
         * @param encoding
         *            编码格式
         * @return HMAC加密后16进制字符串
         * @throws Exception
         */
    public static String getSignature(String data, String key, String algorithm, String encoding) {
        Mac mac = null;
        try {
            mac = Mac.getInstance(algorithm);
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(encoding), algorithm);
            mac.init(secretKey);
            mac.update(data.getBytes(encoding));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            System.out.println("获取Signature签名信息异常：" + e.getMessage());
            return null;
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            System.out.println("获取Signature签名信息异常：" + e.getMessage());
            return null;
        } catch (InvalidKeyException e) {
            e.printStackTrace();
            System.out.println("获取Signature签名信息异常：" + e.getMessage());
            return null;
        }
        return byte2hex(mac.doFinal());
    }

    /***
     * 将byte[]转成16进制字符串
     *
     * @param data
     *
     * @return 16进制字符串
     */
    public static String byte2hex(byte[] data) {
        StringBuilder hash = new StringBuilder();
        String stmp;
        for (int n = 0; data != null && n < data.length; n++) {
            stmp = Integer.toHexString(data[n] & 0XFF);
            if (stmp.length() == 1)
                hash.append('0');
            hash.append(stmp);
        }
        return hash.toString();
    }

    }
```

****

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

    $secret = 'xxxxx';//应用对应密钥

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
        case 'SIGN_MISSON_COMPLETE':
            //签署人签署完成回调
            break;
        case 'SIGN_FLOW_COMPLETE':
            //流程结束逻辑处理
            break;
    }
}
```

****

**.NET代码示例**

```csharp
public static void notify()
{
    //异步通知获取到的header头中的签名值：X-Tsign-Open-SIGNATURE
    string signture = "4009ffb1c50d3c12c977b8XXXXXXX0605aaf5dc55dce1d4fc1c1f39c958";

    //异步通知获取到的header头中的时间戳：X-Tsign-Open-TIMESTAMP
    string timeStamp = "1703756522169";

    //案例：异步通知请求地址 "notifyUrl": "http://demo.tsign.cn/notify?orderNo=001&belong=pinjie",
    //案例："pinjie"和"001"是开发者异步地址上拼接的Query参数值，多个Query参数需要对 key 按字典(ASCII码)升序排序后，再按照value1+value2方法拼接
    //如果异步通知地址没有拼接Query，那么这里不需要参与签名计算
    string query = "pinjie001";

    //应用secret
    string secret = "xxxx4d8f922b898ac519b4cf";

    //异步通知获取到的body体请求参数
    string bodyData = "{\"action\":\"SIGN_MISSON_COMPLETE\",\"timestamp\":1703756522164,\"signFlowId\":\"5ed6b3******dcdeddc23ebf\",\"customBizNum\":\"自定义编码001\",\"signOrder\":1,\"operateTime\":1703756521000,\"signResult\":2,\"resultDescription\":\"签署完成\",\"organization\":{\"orgId\":\"842ec8c******91662f\",\"orgName\":\"测试有限公司\"}}";

    //最终参与验签的请求参数
    string data = timeStamp + query + bodyData;

    //计算签名方法
    string MYSIGN = GetSignature(data, secret);
    string mysign = MYSIGN.ToLower();
    Console.Write("mysign=" + mysign);

    if (mysign.Equals(signture))
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

## 附1 Action事件列表
开发者可通过判断e签宝通知服务推送的 JSON 中的 **Action **事件类型，从而进行下一步业务处理。

:::warning
<font style="color:#F5222D;">Action事件类型可能会出现新增，建议开发者考虑兼容性处理，防止出现代码异常造成业务卡死。</font>

例如，Action业务事件类型判断时，仅将贵司业务需要的类型进行判断并进入下一步业务，其他不需要的类型做忽略处理，这样可以防止新增类型对现有业务造成影响。

:::

| **Action 事件类型** | **Action 对应事件名称**<font style="color:#117CEE;"></font> |
| --- | :--- |
| CONTRACT_COMPLETE_RESULT | [合同比对结果回调通知](https://qianxiaoxia.yuque.com/opendoc/esignopenapi/fraaq2xawbtii9m9) |


## 附2 回调通知URL格式说明
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


## 附3 e签宝回调通知服务器信息
如果贵司需要防火墙配置后才允许e签宝消息通知服务推送数据，请根据下方信息进行贵司防火墙设置。

从开发者角度，以下信息需配置到**开发者防火墙**的**入站**规则中。

| **用途** | **环境** | **域名** | **公网IP** | **端口** |
| --- | --- | --- | --- | :--- |
| 消息通知推送 | 正式生产环境 | 无 | 118.31.35.8 | 随机 |
| 消息通知推送 | 沙箱模拟环境 | 无 | 47.96.79.204 | 随机 |


入站规则配置参考示例如下图（不同系统的配置界面略有不同）

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1671076974941-d70faf81-e3bf-4e8d-b1c1-d82c652a64cb.png)

