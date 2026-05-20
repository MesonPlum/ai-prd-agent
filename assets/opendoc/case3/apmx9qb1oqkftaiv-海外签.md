# 基础介绍
+ **概述**：海外签是为涉及海外业务的文件提供的线上化签署解决方案，涵盖【中国大陆 - 海外】、【海外 - 中国大陆】、【海外 - 海外】三类签署场景。
+ **差异说明**：与纯中国大陆用户直接发起签署不同，海外签在认证流程、通知方式、签署证据等方面存在较大差异。其目的是匹配全球范围内主流的电子签名应用方式，方便用户便捷使用及合规举证。

:::info
<font style="color:rgba(0, 0, 0, 0.85);">本公司海外签署场景的适用性主要由各国/地区的电子签名法规决定。关于具体情况，请咨询与您对接的商务经理获取详细信息。</font>

:::

# 效果展示
## 海外签署（H5端）
**设置不使用大陆实名和意愿认证，采用访问口令方式进行验证演示：**

![](https://cdn.nlark.com/yuque/0/2024/gif/447795/1729144214386-10890fad-15be-47c1-9097-2e76c94dba48.gif)

<font style="color:#DF2A3F;">（以上演示是接口获取的免登录链接，该链接在集成开发者自身系统时使用体验更友好）</font>

**<font style="color:rgba(0, 0, 0, 0.85);">若通过指定的用户邮箱打开签署链接，需先进行邮箱验证后进入：</font>**

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1729144782393-df1f33b0-0e91-4339-a139-4480080d51d6.png)

### 《海外签补充条款》内容参考（PC端签署）：
### ![](https://cdn.nlark.com/yuque/0/2024/png/447795/1729132883182-cb15a257-9f61-4d9d-988b-61e2887ace38.png)
![](https://cdn.nlark.com/yuque/0/2024/png/447795/1729133734672-098959c9-bc09-4c73-825e-8664debaf018.png)

### 海外签证书报告示例：
![](https://cdn.nlark.com/yuque/0/2024/png/447795/1729145461717-cf34e025-b532-4fac-a148-eff1a7daa40f.png)

# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口获取签署方签署页面链接，可用于签署或预览。 | **<font style="color:#8C8C8C;">按需</font>** |
| [查询签署流程详情](https://open.esign.cn/doc/opendoc/pdf-sign3/xxk4q6) | 此接口可以根据发起签署接口返回的signFlowId，来查询签署状态、签署配置等信息。 | **<font style="color:#8C8C8C;">按需</font>** |
| [下载已签署文件及附属材料](https://open.esign.cn/doc/opendoc/pdf-sign3/kczf8g) | 此接口可在签署流程结束后，下载签署后的PDF文件以及**海外签证书报告。** | **<font style="color:#52C41A;">建议</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
### 相关参数   
+ **<font style="color:#DF2A3F;">signMode</font>**（签署模式）：指定**GLOBAL**（海外签）；
+ **<font style="color:#DF2A3F;">globalWillingness</font>**（是否需要意愿认证）：如果不需要刷脸、短信意愿、签署密码任意一种意愿方式，则传**false**；
+ **<font style="color:#DF2A3F;">globalAuthModes</font>**（海外签身份验证方式）：不需要身份验证，则传：**NO_NEED**，需要访问口令验证则传：**ACCESS_CODE；**
+ **<font style="color:#DF2A3F;">globalAccessCode</font>**（海外签访问口令）：访问口令验证方式的的口令码。

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1729145678338-7d53bea1-d22e-4990-bad1-51a05b25cb7c.png)

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1729145847998-18290203-4f81-49af-abb6-a23f4173d07e.png)

#### 代码案例
**平台自身自动签署和个人用户手动签署案例，个人是海外签认证方式（无意愿认证+访问口令方式）**

```json
{
    "docs": [
        {
            "fileId": "请设置待签署文件的fileId",
            "fileName": "请设置待签署文件的文件名称.pdf"
        }
    ],
    "signFlowConfig": {
        "signFlowTitle": "此场景演示平台方自身、个人用户双方签署",
        "noticeConfig": {
            "noticeTypes": "1,2"
        },
        "signConfig": {
            "signMode": "GLOBAL"
        },
        "notifyUrl": "请设置异步回调地址，以http/https开头",
        "redirectConfig": {
            "redirectUrl": "请设置重定向跳转地址，例如：https://www.esign.cn/"
        }
    },
    "signers": [
        {
            "signerType": 1,
            "signFields": [
                {
                    "customBizNum": "自定义编码001",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "signFieldStyle": 1,
                        "autoSign": true,
                        "signFieldPosition": {
                            "positionPage": "3",
                            "positionX": 234,
                            "positionY": 191
                        }
                    }
                }
            ]
        },
        {
            "signerType": 0,
            "psnSignerInfo": {
                "psnAccount": "请设置个人用户的邮箱/手机号",
                "psnInfo": {
                    "psnName": "请设置个人用户的名字"
                }
            },
            "authConfig": {
                "globalWillingness": false,
                "globalAuthModes": "ACCESS_CODE",
                "globalAccessCode": "123456"
            },
            "signFields": [
                {
                    "customBizNum": "自定义编码002",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "3",
                            "positionX": 480,
                            "positionY": 197
                        }
                    }
                }
            ]
        }
    ]
}
```

#### 
