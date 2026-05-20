# 基础介绍
当发起合同签署时，接口可以选择通过e签宝自带的短信/邮件通知告知用户签署，通知中会携带签署链接，用户打开链接即可签署。

:::warning
<font style="color:#DF2A3F;">注：</font>

+ <font style="color:#DF2A3F;">要实现“短信+邮件”双重通知，需提前为用户绑定第二种登录凭证（手机或邮箱），两种绑定方式如下：</font>

<font style="color:#DF2A3F;">1、用户登录e签宝官网操作，可参考</font>[【如何绑定手机号或邮箱】](https://help.esign.cn/detail?id=or21ad035sr34u3g&nameSpace=cs3-dept%2Fexboae)<font style="color:#DF2A3F;">。</font>

<font style="color:#DF2A3F;">2、开发者通过接口</font>[【修改/新增e签宝SaaS账号登录凭证】](https://open.esign.cn/doc/opendoc/account_3/vriragi8ohekdme0)<font style="color:#DF2A3F;">获取链接，给到用户进行新增绑定。</font>

+ <font style="color:#E8323C;">e签宝自带的短信/邮件通知里的签署链接需要用户登录e签宝，</font>[【获取签署页面链接】](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd)<font style="color:#E8323C;">接口获取的用户签署页面链接可以选择免登录e签宝，但是不带通知方式，需要开发者集成在自己的系统内或者自行通知。</font>

:::

# 效果展示
## 短信通知
![](https://cdn.nlark.com/yuque/0/2025/png/447795/1766470473947-9658ff56-0a68-4311-aab7-11fbcfe01089.png)

## 邮件通知
![](https://cdn.nlark.com/yuque/0/2025/png/447795/1766470684645-316af2a0-56b7-4de9-8112-e0158112699c.png)

# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | <font style="color:rgb(64, 64, 64);">此接口获取签署方签署页面链接，可用于签署或预览。</font> | **<font style="color:rgb(140, 140, 140);">按需</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
### 相关参数   
+ <font style="color:#E8323C;">noticeTypes</font>（<font style="color:rgb(64, 64, 64);">通知类型，允许多种通知方式，请使用英文逗号分隔：传空 - 不通知</font><font style="color:rgb(232, 50, 60);">（默认值）</font>，**<font style="color:rgb(64, 64, 64);">1</font>**<font style="color:rgb(64, 64, 64);"> - 短信通知，</font>**<font style="color:rgb(64, 64, 64);">2 </font>**<font style="color:rgb(64, 64, 64);">- 邮件通知</font>）

<font style="color:rgb(64, 64, 64);">该参数用于指定签署的通知方式，在</font>**<font style="color:rgb(64, 64, 64);">signFlowConfig</font>**<font style="color:rgb(64, 64, 64);">（签署流程配置项）和</font>**<font style="color:rgb(64, 64, 64);">signers</font>**<font style="color:rgb(64, 64, 64);">（签署方信息）中都存在该参数，这两个参数组合的逻辑规则如下：</font>

| **<font style="color:rgb(64, 64, 64);">外层signFlowConfig中配置的noticeTypes</font>** | **<font style="color:rgb(64, 64, 64);">内层signers中配置的noticeTypes</font>** | **<font style="color:rgb(64, 64, 64);">最终结果</font>** |
| --- | --- | :--- |
| <font style="color:rgb(64, 64, 64);">指定具体通知方式</font> | <font style="color:rgb(64, 64, 64);">指定具体通知方式（可以和外层指定的通知方式不同）</font> | <font style="color:rgb(64, 64, 64);">取内层signers中的通知方式</font> |
| <font style="color:rgb(64, 64, 64);">指定具体通知方式</font> | <font style="color:rgb(64, 64, 64);">不指定或者指定空值""</font> | <font style="color:rgb(64, 64, 64);">取外层signFlowConfig中的通知方式</font> |
| <font style="color:rgb(64, 64, 64);">不指定或者指定空值""</font> | <font style="color:rgb(64, 64, 64);">指定具体通知方式</font> | <font style="color:rgb(64, 64, 64);">取内层signers中的通知方式</font> |
| <font style="color:rgb(64, 64, 64);">不指定或者指定空值""</font> | <font style="color:rgb(64, 64, 64);">不指定或者指定空值""</font> | <font style="color:rgb(64, 64, 64);">不通知</font> |


#### 指定通知方式相关代码
**（以外层****<font style="color:rgb(64, 64, 64);">signFlowConfig中配置noticeTypes为例）</font>**

**不需要通知方式（默认）：**

```json
"signFlowConfig": {
    "noticeConfig": {
        "noticeTypes": ""
    }
}
```

**短信通知方式：**

```json
"signFlowConfig": {
    "noticeConfig": {
        "noticeTypes": "1"
    }
}
```

**邮件通知方式：**

```json
"signFlowConfig": {
    "noticeConfig": {
        "noticeTypes": "2"
    }
}
```

**短信和邮件通知方式：**

```json
"signFlowConfig": {
    "noticeConfig": {
        "noticeTypes": "1,2"
    }
}
```



