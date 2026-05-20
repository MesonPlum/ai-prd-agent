## 1.OAuthToken鉴权简介
e签宝 API 网关对每次接口请求都进行调用鉴权验证，在调用API时，开发者需要使用应用ID（AppID ）和应用密钥（AppSecret ）获取 Token 访问令牌，并将Token 访问令牌添加到Header请求头的 X-Tsign-Open-Token 参数中传输给e签宝 API 网关进行 Token 有效性验证。e签宝 API 网关会对接收到的 Token 进行真实性和有效期进行核对，若 Token 真实性或有效期不正确，视为无效 Token 访问令牌，将拒绝本次API请求。

e签宝**<font style="color:#E8323C;">不推荐</font>**开发者**<font style="color:#E8323C;">使用 OAuthToken 鉴权方式</font>**调用 API 接口。

## 2.OAuthToken获取说明
### 2.1 Token访问令牌获取
**接口描述**

使用应用ID（AppID ）和应用密钥（AppSecret ）获取 Token 访问令牌。

+ Token 访问令牌仅120分钟有效，多次获取 Token 访问令牌会造成旧 Token 访问令牌有效期变为5分钟。
    - 举例：连续获取100个授权码Token（T1，T2，……，T99，T100），此时T1-T98个Token属于失效Token无权调用接口。而T99个Token有效时长为5分钟，T100个Token有效时长为120分钟。
+ 若开发者属于分布式部署，同时有多台服务器调用 API 接口时，需要集中管理 Token 访问令牌的获取和共享，确保所有服务器使用的 Token 访问令牌唯一。

**接口地址&请求方法**

**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v1/oauth2/access_token

**请求方法：**GET

**请求头格式：无需请求头**

**请求参数**

| **<font style="color:black;">参数名称</font>** | | **<font style="color:black;">参数类型</font>** | **<font style="color:black;">必选</font>** | **参数**<br/>**位置** | **<font style="color:black;">参数说明</font>** |
| --- | --- | :---: | :---: | :---: | --- |
| appId | | string | 是 | query | 应用ID，通过[e签宝开放平台](https://open.esign.cn/)获取。 |
| secret | | string | 是 | query | 应用Secret，妥善保管不可泄露，通过[e签宝开放平台](https://open.esign.cn/)获取。 |
| grantType | | string | 是 | query | 授权类型，固定值: client_credentials。 |


**响应参数**

| **<font style="color:black;">参数名称</font>** | | **<font style="color:black;">参数</font>**<br/>**<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>** |
| --- | --- | --- | --- | --- |
| code | | int | 是 | 业务码，0表示成功 |
| message | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message</font><br/><font style="color:#F5222D;"> 匹配，因为 message 可能会调整。</font> |
| data | | object | 否 | 业务数据 |
|  | token | string | 否 | token 访问令牌，有效期120分钟。<br/><font style="color:#F5222D;">注意：请在 expiresIn 参数的有效截止时间失效前重新获取token，建议提前5分钟重新获取。</font> |
| | expiresIn | string | 否 | token 访问令牌有效期截止时间（毫秒时间戳） |
| | refreshToken | string | 否 | 刷新 token 访问令牌的授权码。<br/>token 访问令牌即将过期时需用此重新获取新 token 访问令牌。 |


**请求示例**

```http
https://{host}/v1/oauth2/access_token?appId=111156XX41&secret=753b9XXXXXXXXXX3e3374c1&grantType=client_credentials
```

**POSTMAN示例**

![](https://cdn.nlark.com/yuque/0/2019/png/454261/1569204736809-dc676dab-da38-4989-9510-46ea74660171.png)

**响应示例**

```json
{
    "code":0,
    "message":"成功",
    "data":{
        "expiresIn":"1569211376807",
        "token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnSWQiOiI4N2I4YmJhNGY2N2U0ZjRiODQ3Njc2M2FmNTRjZGYxYSIsImFwcElkIjoiNDQzODc3MTgwOSIsIm9JZCI6ImJiZDNlYTExZWY0ZDQyNmI4NTYzNDhmYjg1MDYxM2ZmIiwidGltZXN0YW1wIjoxNTY5MjA0MTc2ODA2fQ.tiXdZeKPNWFrbt-i3fJfe8YiSIeouEIyt9i8TdQ85-Q",
        "refreshToken":"64924e629bc5923172dec8fca019fba9"
    }
}
```

### 2.2 使用 refreshToken 刷新 Token 访问令牌
**接口描述**

<font style="color:#333333;">在 token 访问令牌过期前，通过 refreshToken 获取新 token 访问令牌</font>。

+ 新获取的 Token 访问令牌仅120分钟有效，多次获取 Token 访问令牌会造成旧 Token 访问令牌有效期变为5分钟。
    - 举例：连续获取100个授权码Token（T1，T2，……，T99，T100），此时T1-T98个Token属于失效Token无权调用接口。而T99个Token有效时长为5分钟，T100个Token有效时长为120分钟。
+ 若开发者属于分布式部署，同时有多台服务器调用 API 接口时，需要集中管理 Token 访问令牌的获取和共享，确保所有服务器使用的 Token 访问令牌唯一。

**接口地址&请求方法**

**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)<font style="color:#333333;">/v1/oauth2/refresh_token</font>

**请求方法：**GET

**请求头格式：无需请求头**

**请求参数**

| **<font style="color:black;">参数名称</font>** | **<font style="color:black;">参数</font>**<br/>**<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **参数**<br/>**位置** | **<font style="color:black;">参数说明</font>** |
| --- | :---: | :---: | :---: | --- |
| appId | string | 是 | query | 应用ID，通过[e签宝开放平台](https://open.esign.cn/)获取。 |
| refreshToken | string | 是 | query | 刷新 Token 访问令牌的授权码。 |
| grantType | string | 是 | query | 授权类型，固定值 refresh_token。 |


**响应参数**

| **<font style="color:black;">参数名称</font>** | | **<font style="color:black;">参数</font>**<br/>**<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>** |
| --- | --- | :---: | :---: | --- |
| code | | int | 是 | 业务码，0表示成功 |
| message | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message</font><br/><font style="color:#F5222D;"> 匹配，因为 message 可能会调整。</font> |
| data | | object | 否 | 业务数据 |
|  | token | string | 否 | token 访问令牌，有效期120分钟。<br/><font style="color:#F5222D;">注意：请在 expiresIn 参数的有效截止时间失效前重新获取token，建议提前5分钟重新获取。</font> |
| | expiresIn | string | 否 | token 访问令牌有效期截止时间（毫秒时间戳） |
| | refreshToken | string | 否 | 刷新 token 访问令牌的授权码。<br/>token 访问令牌即将过期时需用此重新获取新 token 访问令牌。 |


**请求示例  **

```http
GET https://{host}/v1/oauth2/refresh_token?appId=4438771809&refreshToken=d1feeb03c7a635f11032d8f906e83b46&grantType=refresh_token
```

**Postman请求示例**

![](https://cdn.nlark.com/yuque/0/2019/png/454261/1569205743428-ad5e00f7-41d9-46f4-b9b7-fdf8544aae5d.png)

**响应示例**

```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "expiresIn": "1569212685506",
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnSWQiOiI4N2I4YmJhNGY2N2U0ZjRiODQ3Njc2M2FmNTRjZGYxYSIsImFwcElkIjoiNDQzODc3MTgwOSIsIm9JZCI6ImJiZDNlYTExZWY0ZDQyNmI4NTYzNDhmYjg1MDYxM2ZmIiwidGltZXN0YW1wIjoxNTY5MjA1NDg1NTA1fQ.pVUxWk7VskA6vo5ePQ1YWsIxLZh95xt57AvMoRbnaYs",
        "refreshToken": "4db9a6c275a089ae04315631d177aa8a"
    }
}
```

## 3.使用OAuthToken鉴权方式调用具体API接口
开发者请查阅接口文档中某个具体 API 的描述进行相关接口调用，HTTP请求发送时请参考[OAuthToken鉴权方式-请求头格式](https://qianxiaoxia.yuque.com/books/share/d58af0dd-fd27-4d17-8d60-04bacabf7b17/el34xh?#ONjMW)来设置请求头。

