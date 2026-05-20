为了保证通知的安全，系统提供2种方式供用户选择：IP白名单模式和签名验签模式。 两种模式可以单独使用，也可以共同使用。

### 一、IP白名单模式
为防止回调接口被攻击，可使用IP白名单的机制进行访问限制。

所有e签宝系统回调通知的IP地址：

:::info
测试环境：47.96.79.204

正式环境：118.31.35.8

:::



以下以Nginx服务器为例，介绍如何配置e签宝白名单

#### 1、新建白名单 ip_white.conf
新建文件ip_white.conf，内容如下：

```nginx
allow 47.96.79.204;
allow 118.31.35.8;
```

#### 2、nginx.conf 配置示例
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

##### 3、java获取回调请求IP示例


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



### 二、签名验签模式


#### 验签说明
在回调客户服务时，在请求header里面系统新增四个参数



| **参数名称** | **说明** | **参数类型** |
| --- | --- | --- |
| X-Tsign-Open-App-Id | 客户发生业务时的项目ID | header |
| X-Tsign-Open-SIGNATURE | 签名值 | header |
| X-Tsign-Open-TIMESTAMP | 时间戳 | header |
| X-Tsign-Open-SIGNATURE-ALGORITHM | 使用的算法, 默认算法hmac-sha256 | header |


以算法hmac-sha256签名验证做说明，验签的数据有四部分

+ 1、时间戳

回调header的X-Tsign-Open-TIMESTAMP

+ 2、query请求的数据

客户设置的回调地址可能包含query数据，例如callback?accountId=aaa&orderNo=001。（e签宝平台不会追加任何参数）

+ 3、body 数据

即通知实际内容，按照整体的字节流来处理

+ 4、项目ID对应的密钥

客户在e签宝开放平台生成项目ID时对应的密钥

#### JAVA示例代码
java demo

【[点击下载](https://qianxiaoxia.yuque.com/docs/share/f3821397-0468-4392-864d-fb684d675ea3?#)】



#### PHP示例代码


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



#### .NET示例


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

