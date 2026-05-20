# 基础介绍
<font style="color:rgb(15, 17, 21);">在签署流程中，当企业经办人除代表企业盖章外，还需以个人身份附加签名或签章时（合同主体仍归属企业），可使用“经办人签章”功能实现。</font>

# 效果展示
**经办人+企业章效果：**

<font style="color:#DF2A3F;">注意：指定经办人签章需要同时加盖企业章</font>

![](https://cdn.nlark.com/yuque/0/2025/png/35806242/1758611412867-b709a0b4-29ae-48d1-9caa-a30537d66bbe.png)

**盖章后文件效果：**

（左侧甲方盖章：分别是企业公章和经办人个人印章）

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1735023246706-d71233e6-4c5d-4f47-9605-ba67cdb705bb.png)

# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口获取签署预览页面链接，可用于预览自动落章是否正确（body参数可以都不传即是获取平台预览链接）。 | **<font style="color:#8C8C8C;">按需</font>** |
| [查询签署流程详情](https://open.esign.cn/doc/opendoc/pdf-sign3/xxk4q6) | 此接口可以根据发起签署接口返回的signFlowId，来查询签署状态、签署配置等信息。 | **<font style="color:#8C8C8C;">按需</font>** |
| [下载已签署文件及附属材料](https://open.esign.cn/doc/opendoc/pdf-sign3/kczf8g) | 此接口可在签署流程结束后，下载签署后的PDF文件**。** | **<font style="color:#52C41A;">建议</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
+ **<font style="color:#DF2A3F;">signerType</font>**<font style="color:#DF2A3F;"> </font>（签署方<font style="color:rgb(64, 64, 64);">类型）</font>一个签署方设<font style="color:rgb(64, 64, 64);">置为</font>：1（机构）<font style="color:rgb(64, 64, 64);">，另一个签署方设置为：3 （经办人）</font>

![](https://cdn.nlark.com/yuque/0/2025/png/35806242/1758265954200-2aabd485-df0c-4fd5-ab1b-bd580d8e3152.png)

**<font style="color:rgb(64, 64, 64);">代码案例：</font>**

<font style="color:#DF2A3F;">注意企业和经办人的签署方信息需要传同样的（同一个企业，同一个经办人）</font>

```json
{
    "docs": [
        {
            "fileId": "请设置待签署文件的fileId",
            "fileName": "请设置待签署文件的文件名称.pdf"
        }
    ],
    "signFlowConfig": {
        "signFlowTitle": "请设置当前签署任务的主题：此场景演示经办人签章",
        "autoStart": true,
        "autoFinish": true,
        "noticeConfig": {
            "noticeTypes": "1"
        }
    },
    "signers": [
        {
            "signConfig": {
                "signOrder": 1,
                "forcedReadingTime": 3
            },
            "orgSignerInfo": {
                "orgName": "请设置企业用户的企业名称",
                "orgInfo": {
                    "orgIDCardNum": "请设置企业用户的证件号",
                    "orgIDCardType": "CRED_ORG_USCC"
                },
                "transactorInfo": {
                    "psnAccount": "请设置企业用户经办人的手机号/邮箱",
                    "psnInfo": {
                        "psnName": "请设置企业用户经办人的姓名"
                    }
                }
            },
            "signerType": 1,
            "signFields": [
                {
                    "customBizNum": "自定义编码001",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "autoSign": false,
                        "signFieldPosition": {
                            "positionPage": "3",
                            "positionX": 228,
                            "positionY": 197
                        },
                        "signFieldStyle": 1
                    }
                }
            ]
        },
        {
            "orgSignerInfo": {
                "orgName": "跟上边的企业保持一致",
                "orgInfo": {
                    "orgIDCardNum": "跟上边的企业保持一致",
                    "orgIDCardType": "CRED_ORG_USCC"
                },
                "transactorInfo": {
                    "psnAccount": "跟上边的企业经办人保持一致",
                    "psnInfo": {
                        "psnName": "跟上边的企业经办人保持一致"
                    }
                }
            },
            "signConfig": {
                "forcedReadingTime": 3,
                "signOrder": 1
            },
            "signerType": 3,
            "signFields": [
                {
                    "customBizNum": "自定义编码002",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "psnSealStyles": "1,2",
                        "signFieldPosition": {
                            "positionPage": "3",
                            "positionX": 480,
                            "positionY": 197
                        },
                        "signFieldStyle": 1
                    }
                }
            ]
        }
    ]
}
```



# 特殊场景说明
基于这个经办人落个人印章+企业印章并且合同归属于企业的场景下，衍生出另一个场景：经办人只落自己的印章，企业章自动加盖或者由其他经办人单独落章。

## 配置方式
进入e签宝官网的自身企业空间下：【合同偏好设置】中设置【企业经办人盖章】选择：“允许仅经办人盖章”。

**<font style="color:#DF2A3F;">注意：本企业必须既是appId所属的企业又是当前签署方企业才可生效；如果当前签署方不是appId所属的企业，那么无法实现经办人只落自己的印章，只能落经办人+企业印章。</font>**

![](https://cdn.nlark.com/yuque/0/2025/png/35806242/1758265803358-f1b58e71-a62f-45b1-b82c-70594f9fbbaa.png)

:::warning
<font style="color:#DF2A3F;">注意区分所属的环境地址：</font><font style="color:#000000;">  
</font><font style="color:#000000;">1、线上正式环境-e签宝官网地址：</font>[https://web.esign.cn/workspace/home](https://web.esign.cn/workspace/home)

<font style="color:#000000;">2、模拟沙箱环境-e签宝模拟官网地址：</font>[https://smlfront.esign.cn:8880/workspace/home](https://smlfront.esign.cn:8880/workspace/home)

:::

## 效果展示
**仅经办人落个人章场景效果（合同归属于企业不归属于个人）：**

#### ![](https://cdn.nlark.com/yuque/0/2025/png/35806242/1758611291736-385bd84b-4ad6-4644-824f-9e9ecd4376ba.png)
## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
```json
{
    "docs": [
        {
            "fileId": "请设置待签署文件的fileId",
            "fileName": "请设置待签署文件的文件名称.pdf"
        }
    ],
    "signFlowConfig": {
        "signFlowTitle": "请设置当前签署任务的主题：此场景演示经办人签章",
        "autoStart": true,
        "autoFinish": true,
        "noticeConfig": {
            "noticeTypes": "1"
        }
    },
    "signers": [
        {
            "signConfig": {
                "signOrder": 1,
                "forcedReadingTime": 3
            },
            "orgSignerInfo": {
                "orgName": "appid所属的企业名称（平台方自身）",
                "orgInfo": {
                    "orgIDCardNum": "appid所属的企业证件号（平台方自身）",
                    "orgIDCardType": "CRED_ORG_USCC"
                },
                "transactorInfo": {
                    "psnAccount": "经办人的手机号/邮箱",
                    "psnInfo": {
                        "psnName": "经办人的姓名"
                    }
                }
            },
            "signerType": 3,
            "signFields": [
                {
                    "customBizNum": "自定义编码001",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "autoSign": false,
                        "signFieldPosition": {
                            "positionPage": "3",
                            "positionX": 228,
                            "positionY": 197
                        },
                        "signFieldStyle": 1
                    }
                }
            ]
        }
    ]
}
```































