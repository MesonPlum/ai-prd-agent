## 1.请求签名鉴权简介
e签宝 API 网关对每次接口请求都进行调用鉴权验证，在调用API时，开发者需要使用应用密钥（AppSecret ）按照e签宝 API 网关的约定方式对请求中的关键数据进行签名值计算，并将签名值添加到Header请求头的X-Tsign-Open-Ca-Signature参数中传输给e签宝 API 网关进行签名验证。e签宝 API 网关会对接收到的数据进行签名值计算，并与接收到请求签名值进行核对，若签名值不一致，视为无效签名，将拒绝本次API请求。

e签宝**<font style="color:#E8323C;">优先推荐</font>**开发者**<font style="color:#E8323C;">使用请求签名鉴权方式</font>**调用 API 接口。

:::info
关于请求签名鉴权的算法，e签宝目前提供两种加密方式， HmacSHA256 **和 **<font style="color:rgb(23, 43, 77);">HmacSM3 算法。</font>

+ 本篇文档是基于 **<font style="color:#DF2A3F;">HmacSHA256</font>** 算法的签名鉴权方式说明。
+ 如果需要 **<font style="color:#DF2A3F;">HmacSM3</font>**** **算法，[请点击跳转](https://qianxiaoxia.yuque.com/opendoc/dev-guide3/yx5a3g7og2962aqi) **《基于HmacSM3算法的签名鉴权方式说明》**。

:::

## 2.请求签名鉴权原理说明
**（1）开发者计算请求签名的步骤如下：**

1. 按照e签宝 API 网关的约定方式，拼接生成一个用来进行签名计算的**待签名字符串**；
2. 使用 **AppSecret** 对待签名字符串进行 **HmacSHA256** 加密处理，计算得出**请求签名值**；
3. 将请求签名值及其他头部信息添加到Header请求头中，同时将请求参数与Header请求头一起构造成最终HTTP请求并进行发送。

**（2）e签宝 API 网关验证签名的步骤如下：**

1. 从接收到的请求中提取关键数据，拼接生成一个用来进行签名计算的**待签名字符串**；
2. 从接收到的请求头 X-Tsign-Open-App-Id 参数中读取开发者AppID，并查询其对应的 AppSecret；
3. 使用 **AppSecret** 对待签名字符串进行 **HmacSHA256** 加密处理，计算得出**请求签名值**；
4. 从接收到的请求头 X-Tsign-Open-Ca-Signature 参数中读取开发者计算的签名值，并对比e签宝 API 网关计算的签名值和开发者计算的签名值是否一致。

## 3.请求签名值计算过程说明
### 3.1 拼接待签名字符串
待签名字符串由以下7个字段组合拼接生成：

| **字段** | **字段说明** |
| --- | --- |
| HTTPMethod | HTTP的请求方法，全部大写，例如：GET、POST。 |
| Accept | 请求头中 Accept 的值，建议统一为*/*。 |
| Content-MD5 | 请求头中 Content-MD5 的值，[点击查看 Content-MD5 计算方法](https://qianxiaoxia.yuque.com/opendoc/helper/piicat)<br/>GET 和 DELETE 请求且Body体无数据时，此参数可为 ""(空字符串)。 |
| Content-Type | 请求的与实体对应的MIME信息，例如：application/json; charset=UTF-8<br/>请求头中的 Content-Type 值<br/>GET 和 DELETE 请求且Body体无数据时，此参数可为 ""(空字符串)。 |
| Date | 请求头中的 Date 值，时间的描述格式需符合RFC822规范。<br/>例如，Thu, 11 Jul 2015 15:33:24 GMT。<br/>可为 ""(空字符串)。 |
| Headers | 用户可以选取指定的Header参与签名，将希望参与签名计算的Key与Value组合拼接成字符串，Key需按字典(ASCII码)升序排序。<br/>可为 ""(空字符串)。 |
| PathAndParameters | e签宝 API 的接口Url（注意不含https://{host}部分）<br/>PathAndParameters 字段包含Path 和 Query 中的所有参数。例如：<br/>/v3/files/123/keyword-positions?keywords=关键字1,关键字2<br/>Query 参数对的Key需按字典(ASCII码)升序排序。 |


待签名字符串拼接后格式如下所示：

```plain
HTTPMethod
Accept
Content-MD5
Content-Type
Date
Headers
PathAndParameters
```

**<font style="color:#DF2A3F;">字段之间使用\n间隔，若Headers为空，则不需要加\n，其他字段若为空都需要保留\n。注：大小写敏感。</font>**

```java
public static void main(String[] args) {
    
    String HTTPMethod = "POST";
    String Accept = "*/*";
    String ContentMD5 = "uxydqKBMBy6x1siClKEQ6Q==";
    String ContentType = "application/json; charset=UTF-8";
    String Date = "";
    String Headers = "";
    String PathAndParameters = "/v3/sign-flow/create-by-file";
    // 组合拼接待签名字符串
    StringBuffer strBuff = new StringBuffer();
    strBuff.append(HTTPMethod).append("\n").append(Accept).append("\n").append(ContentMD5).append("\n")
        .append(ContentType).append("\n").append(Date).append("\n");
    if ("".equals(Headers)) {
        strBuff.append(Headers).append(PathAndParameters);
    } else {
        strBuff.append(Headers).append("\n").append(PathAndParameters);
    }
    String StringToSign = strBuff.toString();
    System.out.println("待签名字符串:\n" + StringToSign);
    
}
```

```plain
- - -  拼接后示例 - - -
POST
*/*
uxydqKBMBy6x1siClKEQ6Q==
application/json; charset=UTF-8

/v3/sign-flow/create-by-file
```

#### 待签名字符串拼接规则
下面介绍下每个字段的提取规则：

+ **<font style="color:rgb(51, 51, 51);">HTTPMethod</font>**<font style="color:rgb(51, 51, 51);">：HTTP的请求方法，全部大写，例如：GET、POST。</font>
+ **<font style="color:rgb(51, 51, 51);">Accept</font>**<font style="color:rgb(51, 51, 51);">：请求头中的 Accept 值，建议显式设置 Accept Header。当 Accept 为空时，部分 HTTP 框架在未设置 Accept 请求头时会给 Accept 设置默认值为 */*，建议统一设置为 */*。</font>
+ **<font style="color:rgb(51, 51, 51);">Content-MD5</font>**<font style="color:rgb(51, 51, 51);">：</font>请求头中 Content-MD5 的值，可为 ""(空字符串)，[点击查看 Content-MD5 计算方法](https://qianxiaoxia.yuque.com/opendoc/helper/piicat)。
+ **<font style="color:rgb(51, 51, 51);">Content-Type</font>**<font style="color:rgb(51, 51, 51);">：请求头中的 Content-Type 值，</font>可为 ""(空字符串)。
+ **<font style="color:rgb(51, 51, 51);">Date</font>**<font style="color:rgb(51, 51, 51);">：请求头中的 Date 值，</font>可为 ""(空字符串)。时间的描述格式需符合RFC822规范。例如，Thu, 11 Jul 2015 15:33:24 GMT，[点击查看日期时间描述格式说明](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Date)。
+ **<font style="color:rgb(51, 51, 51);">Headers</font>**<font style="color:rgb(51, 51, 51);">：开发者选取指定的请求头 Header 参与请求签名计算时，</font>
+ 当开发者需要将一些请求头 Header 也参与请求签名计算时，<font style="color:rgb(51, 51, 51);">请求头 Header 的 </font>Key 需按字典(ASCII码)升序排序<font style="color:rgb(51, 51, 51);">后再按照下面格式进行组合拼接：</font>

<font style="color:#FF7A45;">HeaderKey1</font> + ":" + <font style="color:#FF7A45;">HeaderValue1</font> + "\n" + <font style="color:#FF7A45;">HeaderKey2</font> + ":" + <font style="color:#FF7A45;">HeaderValue2</font> + ...

    - <font style="color:rgb(51, 51, 51);">某个Header的Value为空，则使用 HeaderKey+":"+"\n" 参与签名，需要保留Key和英文冒号；</font>
    - <font style="color:rgb(51, 51, 51);">以下Header不参与Header签名计算：</font>X-Tsign-Open-Ca-Signature<font style="color:rgb(51, 51, 51);">、</font>X-Tsign-Open-Ca-Signature-Headers<font style="color:rgb(51, 51, 51);">、Accept、Content-MD5、Content-Type、Date。</font>
    - <font style="color:rgb(51, 51, 51);">所有参与签名的Header的Key使用英文逗号进行分割后放到请求头Header的</font>X-Tsign-Open-Ca-Signature-Headers<font style="color:rgb(51, 51, 51);">中；</font>
+ **<font style="color:rgb(51, 51, 51);">PathAndParameters</font>**<font style="color:rgb(51, 51, 51);"> 这个字段包含 Path 和 Query 的所有参数，简单说就是不包含https://{host}部分的e签宝 API 接口Url，Query 参数对的 </font>Key 需按字典(ASCII码)升序排序<font style="color:rgb(51, 51, 51);">后再按照下面格式进行组合拼接：</font>

<font style="color:#FF7A45;">Path</font> + "?" + <font style="color:#FF7A45;">Key1</font> + "=" + <font style="color:#FF7A45;">Value1</font> + "&" + <font style="color:#FF7A45;">Key2</font> + "=" + <font style="color:#FF7A45;">Value2</font>

    - <font style="color:rgb(51, 51, 51);">Query 和Form 参数为空时，则直接使用 Path，不需要添加？；</font>
    - <font style="color:rgb(51, 51, 51);">参数的 Value 为空时只保留 Key 参与签名，=不需要再加入签名；</font>
    - <font style="color:rgb(51, 51, 51);">Query 和 Form 存在数组参数时（Key相同，Value不同的参数） ，取第一个 Value 参与签名计算；</font>

### 3.2 计算请求签名值
[**点击下载demo-EsignGatewaySign.zip**](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/EsignGatewaySign.zip)

开发者使用 **AppSecret（应用密钥）** 对待签名字符串进行 **HmacSHA256** 加密处理，计算得出**请求签名值**；

#### 计算请求签名值代码示例
```java
/***
	 * 计算请求签名值
	 * 
	 * @param message 待签名字符串
	 * @param secret  应用密钥（AppSecret）
	 * @return HmacSHA256计算后摘要值的Base64编码
	 * @throws Exception 加密过程中的异常信息
	 */
	public String doSignatureBase64(String message, String secret) throws Exception {
		String algorithm = "HmacSHA256";
		Mac hmacSha256;
		String digestBase64 = null;
		try {
			hmacSha256 = Mac.getInstance(algorithm);
			byte[] keyBytes = secret.getBytes("UTF-8");
			byte[] messageBytes = message.getBytes("UTF-8");
			hmacSha256.init(new SecretKeySpec(keyBytes, 0, keyBytes.length, algorithm));
			// 使用HmacSHA256对二进制数据消息Bytes计算摘要
			byte[] digestBytes = hmacSha256.doFinal(messageBytes);
			// 把摘要后的结果digestBytes使用Base64进行编码
			digestBase64 = new String(Base64.encodeBase64(digestBytes), "UTF-8");
		} catch (NoSuchAlgorithmException e) {
			String msg = MessageFormat.format("不支持此算法: {0}", e.getMessage());
			Exception ex = new Exception(msg);
			ex.initCause(e);
			throw ex;
		} catch (UnsupportedEncodingException e) {
			String msg = MessageFormat.format("不支持的字符编码: {0}", e.getMessage());
			Exception ex = new Exception(msg);
			ex.initCause(e);
			throw ex;
		} catch (InvalidKeyException e) {
			String msg = MessageFormat.format("无效的密钥规范: {0}", e.getMessage());
			Exception ex = new Exception(msg);
			ex.initCause(e);
			throw ex;
		}
		return digestBase64;
	}
```

#### 请求签名鉴权完整代码示例
```java
package esign.gateway.demo;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.LinkedHashMap;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Base64;
import com.alibaba.fastjson.JSONObject;

public class Test {

  public static void main(String[] args) {
    // 应用ID
    String appId = "743*****";
    // 应用密钥（AppSecret）
    String appKey = "106***********43dbcf";
    // e签宝接口调用域名（模拟环境）
    String host = "https://smlopenapi.esign.cn";
    // e签宝接口调用域名（正式环境）
//  String host = "https://openapi.esign.cn";

    // 请求签名鉴权-POST请求
    testPost(appId, appKey, host);

    // 请求签名鉴权-GET请求
//  String signFlowId = "e622498****ebf72d57dbb";
//  testGet(appId, appKey, host, signFlowId);

  }


  /***
   * 请求签名鉴权-POST请求
   *
   * @param appId=应用ID
   * @param appKey=应用密钥（AppSecret）
   * @param host
   */
  public static void testPost(String appId, String appKey, String host) {
    // 计算签名拼接的url
    String postUrl = "/v3/files/file-upload-url";
    // 完整的请求地址
    String postAllUrl = host + postUrl;


    try {
      // 构建请求Body体
      JSONObject reqBodyObj = new JSONObject();
      reqBodyObj.put("contentMd5", "KMYh+0qU9/FDXf2TwCGbeg==");
      reqBodyObj.put("contentType", "application/octet-stream");
      reqBodyObj.put("convertToPDF", true);
      reqBodyObj.put("fileName", "销售合同.docx");
      reqBodyObj.put("fileSize", "81825");
      //reqBodyObj.put("convertToHTML", false);

      // 请求Body体数据
      String reqBodyData = reqBodyObj.toString();
      // 对请求Body体内的数据计算ContentMD5
      String contentMD5 = doContentMD5(reqBodyData);
      System.out.println("请求body数据:"+reqBodyData);
      System.out.println("body的md5值："+ contentMD5);

      // 构建待签名字符串
        String method = "POST";
      String accept = "*/*";
      String contentType = "application/json";
      String url = postUrl;
      String date = "";
      String headers = "";

      StringBuffer sb = new StringBuffer();
      sb.append(method).append("\n").append(accept).append("\n").append(contentMD5).append("\n")
          .append(contentType).append("\n").append(date).append("\n");
      if ("".equals(headers)) {
        sb.append(headers).append(url);
      } else {
        sb.append(headers).append("\n").append(url);
      }

      // 构建参与请求签名计算的明文
      String plaintext = sb.toString();
      // 计算请求签名值
      String reqSignature = doSignatureBase64(plaintext, appKey);
      System.out.println("计算请求签名值:"+reqSignature);

      // 获取时间戳(精确到毫秒)
      long timeStamp = timeStamp();

      // 构建请求头
      LinkedHashMap<String, String> header = new LinkedHashMap<String, String>();
      header.put("X-Tsign-Open-App-Id", appId);
      header.put("X-Tsign-Open-Auth-Mode", "Signature");
      header.put("X-Tsign-Open-Ca-Timestamp", String.valueOf(timeStamp));
      header.put("Accept", accept);
      header.put("Content-Type", contentType);
      header.put("X-Tsign-Open-Ca-Signature", reqSignature);
      header.put("Content-MD5", contentMD5);

      // 发送POST请求
      String result = HTTPHelper.sendPOST(postAllUrl, reqBodyData, header, "UTF-8");
      JSONObject resultObj = JSONObject.parseObject(result);
      System.out.println("请求返回信息： " + resultObj.toString());
    } catch (Exception e) {
      e.printStackTrace();
      String msg = MessageFormat.format("请求签名鉴权方式调用接口出现异常: {0}", e.getMessage());
      System.out.println(msg);
    }
  }

  /***
   * 请求签名鉴权-GET请求
   *
   * @param appId=应用ID
   * @param appKey=应用密钥（AppSecret）
   * @param host
   */

  public static void testGet(String appId, String appKey, String host,String signFlowId) {
    // 计算签名拼接的url
    String getUrl = "/v3/sign-flow/"+signFlowId+"/detail";
    // 完整的请求地址
    String getAllUrl = host + getUrl;

    try {
      // GET请求时ContentMD5为""
      String contentMD5 = "";

      // 构建待签名字符串
      String method = "GET";
      String accept = "*/*";
      String contentType = "application/json; charset=UTF-8";
      String url = getUrl;
      String date = "";
      String headers = "";

      StringBuffer sb = new StringBuffer();
      sb.append(method).append("\n").append(accept).append("\n").append(contentMD5).append("\n")
              .append(contentType).append("\n").append(date).append("\n");
      if ("".equals(headers)) {
        sb.append(headers).append(url);
      } else {
        sb.append(headers).append("\n").append(url);
      }

      // 构建参与请求签名计算的明文
      String plaintext = sb.toString();
      // 计算请求签名值
      String reqSignature = doSignatureBase64(plaintext, appKey);
      System.out.println("计算请求签名值："+ reqSignature);
      // 获取时间戳(精确到毫秒)
      long timeStamp = timeStamp();

      // 构建请求头
      LinkedHashMap<String, String> header = new LinkedHashMap<String, String>();
      header.put("X-Tsign-Open-App-Id", appId);
      header.put("X-Tsign-Open-Auth-Mode", "Signature");
      header.put("X-Tsign-Open-Ca-Timestamp", String.valueOf(timeStamp));
      header.put("Accept", accept);
      header.put("Content-Type", contentType);
      header.put("X-Tsign-Open-Ca-Signature", reqSignature);
      header.put("Content-MD5", contentMD5);

      HashMap<String, Object> query = new HashMap<String, Object>();
     // query.put("orgIDCardNum", "9100*****0004");
     // query.put("orgIDCardType", "CRED_ORG_USCC");


      // 发送GET请求
      String result = HTTPHelper.sendGet(getAllUrl, query, header, "UTF-8");
      JSONObject resultObj = JSONObject.parseObject(result);
      System.out.println("请求返回信息： " + resultObj.toString());
    } catch (Exception e) {
      e.printStackTrace();
      String msg = MessageFormat.format("请求签名鉴权方式调用接口出现异常: {0}", e.getMessage());
      System.out.println(msg);
    }
  }




  /***
   *
   * @param str 待计算的消息
   * @return MD5计算后摘要值的Base64编码(ContentMD5)
   * @throws Exception 加密过程中的异常信息
   */
  public static String doContentMD5(String str) throws Exception {
    byte[] md5Bytes = null;
    MessageDigest md5 = null;
    String contentMD5 = null;
    try {
      md5 = MessageDigest.getInstance("MD5");
      // 计算md5函数
      md5.update(str.getBytes("UTF-8"));
      // 获取文件MD5的二进制数组（128位）
      md5Bytes = md5.digest();
      // 把MD5摘要后的二进制数组md5Bytes使用Base64进行编码（而不是对32位的16进制字符串进行编码）
      contentMD5 = new String(Base64.encodeBase64(md5Bytes), "UTF-8");
    } catch (NoSuchAlgorithmException e) {
      String msg = MessageFormat.format("不支持此算法: {0}", e.getMessage());
      Exception ex = new Exception(msg);
      ex.initCause(e);
      throw ex;
    } catch (UnsupportedEncodingException e) {
      String msg = MessageFormat.format("不支持的字符编码: {0}", e.getMessage());
      Exception ex = new Exception(msg);
      ex.initCause(e);
      throw ex;
    }
    return contentMD5;
  }

  /***
   * 计算请求签名值
   *
   * @param message 待计算的消息
   * @param secret 密钥
   * @return HmacSHA256计算后摘要值的Base64编码
   * @throws Exception 加密过程中的异常信息
   */
  public static String doSignatureBase64(String message, String secret) throws Exception {
    String algorithm = "HmacSHA256";
    Mac hmacSha256;
    String digestBase64 = null;
    try {
      hmacSha256 = Mac.getInstance(algorithm);
      byte[] keyBytes = secret.getBytes("UTF-8");
      byte[] messageBytes = message.getBytes("UTF-8");
      hmacSha256.init(new SecretKeySpec(keyBytes, 0, keyBytes.length, algorithm));
      // 使用HmacSHA256对二进制数据消息Bytes计算摘要
      byte[] digestBytes = hmacSha256.doFinal(messageBytes);
      // 把摘要后的结果digestBytes使用Base64进行编码
      digestBase64 = new String(Base64.encodeBase64(digestBytes), "UTF-8");
    } catch (NoSuchAlgorithmException e) {
      String msg = MessageFormat.format("不支持此算法: {0}", e.getMessage());
      Exception ex = new Exception(msg);
      ex.initCause(e);
      throw ex;
    } catch (UnsupportedEncodingException e) {
      String msg = MessageFormat.format("不支持的字符编码: {0}", e.getMessage());
      Exception ex = new Exception(msg);
      ex.initCause(e);
      throw ex;
    } catch (InvalidKeyException e) {
      String msg = MessageFormat.format("无效的密钥规范: {0}", e.getMessage());
      Exception ex = new Exception(msg);
      ex.initCause(e);
      throw ex;
    }
    return digestBase64;
  }

  /***
   * 获取时间戳(毫秒级)
   *
   * @return 毫秒级时间戳,如 1578446909000
   */
  public static long timeStamp() {
    long timeStamp = System.currentTimeMillis();
    return timeStamp;
  }

}

```

#### HTTP网络请求代码示例
```json
package esign.gateway.demo;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.UnknownHostException;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map.Entry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HTTPHelper {
  // slf4j日志记录器
  private static final Logger LOG = LoggerFactory.getLogger(HTTPHelper.class);

  /***
   * 向指定URL发送GET方法的请求
   *
   * @param apiUrl
   * @param data
   * @param projectId
   * @param signature
   * @param encoding
   * @return
   * @throws Exception
   */
  public static String sendGet(String apiUrl, HashMap<String, Object> param,
      LinkedHashMap<String, String> headers, String encoding) throws Exception {
    // 获得响应内容
    String http_RespContent = null;
    HttpURLConnection httpURLConnection = null;
    int http_StatusCode = 0;
    String http_RespMessage = null;
    try {
      // 实际请求完整Url
      StringBuffer fullUrl = new StringBuffer();
      if (null != param) {
        if (0 != param.size()) {
          StringBuffer params = new StringBuffer();
          for (Entry<String, Object> entry : param.entrySet()) {
            params.append(entry.getKey());
            params.append("=");
            params.append(entry.getValue().toString());
            params.append("&");
          }
          if (params.length() > 0) {
            params.deleteCharAt(params.lastIndexOf("&"));
          }
          fullUrl.append(apiUrl).append((params.length() > 0) ? "?" + params.toString() : "");
        } else {
          fullUrl.append(apiUrl);
        }
      } else {
        fullUrl.append(apiUrl);
      }

      LOG.info(">>>> 实际请求Url: " + fullUrl.toString());

      // 建立连接
      URL url = new URL(fullUrl.toString());
      httpURLConnection = (HttpURLConnection) url.openConnection();
      // 需要输出
      httpURLConnection.setDoOutput(true);
      // 需要输入
      httpURLConnection.setDoInput(true);
      // 不允许缓存
      httpURLConnection.setUseCaches(false);
      // HTTP请求方式
      httpURLConnection.setRequestMethod("GET");
      // 设置Headers
      if (null != headers) {
        for (String key : headers.keySet()) {
          httpURLConnection.setRequestProperty(key, headers.get(key));
        }
      }
      // 连接会话
      httpURLConnection.connect();
      // 获得响应状态(HTTP状态码)
      http_StatusCode = httpURLConnection.getResponseCode();
      // 获得响应消息(HTTP状态码描述)
      http_RespMessage = httpURLConnection.getResponseMessage();
      // 获得响应内容
      if (HttpURLConnection.HTTP_OK == http_StatusCode) {
        // 返回响应结果
        http_RespContent = getResponseContent(httpURLConnection);
      } else {
        // 返回非200状态时响应结果
        http_RespContent = getErrorResponseContent(httpURLConnection);
        String msg =
            MessageFormat.format("请求失败: Http状态码 = {0} , {1}", http_StatusCode, http_RespMessage);
        LOG.info(msg);
      }
    } catch (UnknownHostException e) {
      String message = MessageFormat.format("网络请求时发生异常: {0}", e.getMessage());
      Exception ex = new Exception(message);
      ex.initCause(e);
      throw ex;
    } catch (MalformedURLException e) {
      String message = MessageFormat.format("格式错误的URL: {0}", e.getMessage());
      Exception ex = new Exception(message);
      ex.initCause(e);
      throw ex;
    } catch (IOException e) {
      String message = MessageFormat.format("网络请求时发生异常: {0}", e.getMessage());
      Exception ex = new Exception(message);
      ex.initCause(e);
      throw ex;
    } catch (Exception e) {
      String message = MessageFormat.format("网络请求时发生异常: {0}", e.getMessage());
      Exception ex = new Exception(message);
      ex.initCause(e);
      throw ex;
    } finally {
      if (null != httpURLConnection) {
        httpURLConnection.disconnect();
      }
    }
    return http_RespContent;
  }

  /***
   * 向指定URL发送POST方法的请求
   *
   * @param apiUrl
   * @param data
   * @param projectId
   * @param signature
   * @param encoding
   * @return
   * @throws Exception
   */
  public static String sendPOST(String apiUrl, String data, LinkedHashMap<String, String> headers,
      String encoding) throws Exception {
    // 获得响应内容
    String http_RespContent = null;
    HttpURLConnection httpURLConnection = null;
    int http_StatusCode = 0;
    String http_RespMessage = null;
    try {
      // 建立连接
      URL url = new URL(apiUrl);
      httpURLConnection = (HttpURLConnection) url.openConnection();
      // 需要输出
      httpURLConnection.setDoOutput(true);
      // 需要输入
      httpURLConnection.setDoInput(true);
      // 不允许缓存
      httpURLConnection.setUseCaches(false);
      // HTTP请求方式
      httpURLConnection.setRequestMethod("POST");
      // 设置Headers
      if (null != headers) {
        for (String key : headers.keySet()) {
          httpURLConnection.setRequestProperty(key, headers.get(key));
        }
      }
      // 连接会话
      httpURLConnection.connect();
      // 建立输入流，向指向的URL传入参数
      DataOutputStream dos = new DataOutputStream(httpURLConnection.getOutputStream());
      // 设置请求参数
      dos.write(data.getBytes(encoding));
      dos.flush();
      dos.close();
      // 获得响应状态(HTTP状态码)
      http_StatusCode = httpURLConnection.getResponseCode();
      // 获得响应消息(HTTP状态码描述)
      http_RespMessage = httpURLConnection.getResponseMessage();
      // 获得响应内容
      if (HttpURLConnection.HTTP_OK == http_StatusCode) {
        // 返回响应结果
        http_RespContent = getResponseContent(httpURLConnection);
      } else {
        // 返回非200状态时响应结果
        http_RespContent = getErrorResponseContent(httpURLConnection);
        String msg =
            MessageFormat.format("请求失败: Http状态码 = {0} , {1}", http_StatusCode, http_RespMessage);
        LOG.info(msg);
      }
    } catch (UnknownHostException e) {
      String message = MessageFormat.format("网络请求时发生异常: {0}", e.getMessage());
      Exception ex = new Exception(message);
      ex.initCause(e);
      throw ex;
    } catch (MalformedURLException e) {
      String message = MessageFormat.format("格式错误的URL: {0}", e.getMessage());
      Exception ex = new Exception(message);
      ex.initCause(e);
      throw ex;
    } catch (IOException e) {
      String message = MessageFormat.format("网络请求时发生异常: {0}", e.getMessage());
      Exception ex = new Exception(message);
      ex.initCause(e);
      throw ex;
    } catch (Exception e) {
      String message = MessageFormat.format("网络请求时发生异常: {0}", e.getMessage());
      Exception ex = new Exception(message);
      ex.initCause(e);
      throw ex;
    } finally {
      if (null != httpURLConnection) {
        httpURLConnection.disconnect();
      }
    }
    return http_RespContent;
  }

  /***
   * 读取HttpResponse响应内容
   *
   * @param httpURLConnection
   * @return
   * @throws UnsupportedEncodingException
   * @throws IOException
   */
  private static String getResponseContent(HttpURLConnection httpURLConnection)
      throws UnsupportedEncodingException, IOException {
    StringBuffer contentBuffer = null;
    BufferedReader responseReader = null;
    try {
      contentBuffer = new StringBuffer();
      String readLine = null;
      responseReader =
          new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream(), "UTF-8"));
      while ((readLine = responseReader.readLine()) != null) {
        contentBuffer.append(readLine);
      }
    } finally {
      if (null != responseReader) {
        responseReader.close();
      }
    }
    return contentBuffer.toString();
  }

  /***
   * 读取HttpResponse响应内容
   *
   * @param httpURLConnection
   * @return
   * @throws UnsupportedEncodingException
   * @throws IOException
   */
  private static String getErrorResponseContent(HttpURLConnection httpURLConnection)
      throws UnsupportedEncodingException, IOException {
    StringBuffer contentBuffer = null;
    BufferedReader responseReader = null;
    try {
      contentBuffer = new StringBuffer();
      String readLine = null;
      responseReader =
          new BufferedReader(new InputStreamReader(httpURLConnection.getErrorStream(), "UTF-8"));
      while ((readLine = responseReader.readLine()) != null) {
        contentBuffer.append(readLine);
      }
    } finally {
      if (null != responseReader) {
        responseReader.close();
      }
    }
    return contentBuffer.toString();
  }
}

```

## 4.使用请求签名鉴权方式调用具体API接口
开发者请查阅接口文档中某个具体 API 的描述进行相关接口调用，HTTP请求发送时请参考[请求签名鉴权方式-请求头格式](https://qianxiaoxia.yuque.com/books/share/d58af0dd-fd27-4d17-8d60-04bacabf7b17/el34xh?#dpE1m)来设置请求头。



