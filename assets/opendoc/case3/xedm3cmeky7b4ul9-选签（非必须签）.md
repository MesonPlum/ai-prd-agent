# 基础介绍
<font style="color:rgb(51, 51, 51);">在签署场景里可以指定签署方的某些签署区是必须签还是非必须签署的，假如一个人被指定了多个签字/盖章区域，均为非必须签署区，该用户可以在多个区域内选择一个或者多个区域进行签署，即为选签功能。</font>

:::info
例如：在工程行业等企业签署审批意见书时，签署文件上有2个区域，同意/不同意，审批签署人直接在对应区域签名表明意见，同意、不同意选择其一区域签署。要想达到这样的效果，接口指定的签署区就需要都是选签签署区，而不是必须签署的签署区。

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1689064215708-0b3e9e7e-c284-45d4-b745-4efc60da9aba.png)

:::



# 效果展示
## 签署后效果展示
以《询证函》为例，该流程是审计服务中常见的一种流程，它可以帮助审计单位（会计事务所）收集有效的凭证和账户信息，从而确定公司的财务状况。

业务角色涉及审计单位（会计事务所）、被审计单位及询证单位

 1.审计单位发起《询证函》

 2.被审计单位盖章

 3.询证单位选签盖章（信息无误/信息不符）

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1689070918746-b7d4435c-a9d5-45fd-ae16-568ba7c3b7e7.png)

测试文件下载：[询证函.docx](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/询证函.docx)

## 签署操作演示
签署区右上角会有“<font style="color:#DF2A3F;">选签</font>”字样

## ![](https://cdn.nlark.com/yuque/0/2023/gif/447795/1689069341930-420f7c29-4831-45b8-a9c7-f7b5c40bd271.gif)
# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口获取签署方签署页面链接，可用于签署或预览。 | **<font style="color:#8C8C8C;">按需</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
### 相关参数   
+ <font style="color:#E8323C;">mustSign</font>（该签署区是否必须签署，默认值为 true； true - 是，false - 否）

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1689069964860-d82b0083-4486-4a41-96e7-e81726f45f5e.png)

#### 代码案例
**案例说明：**被审计单位和询证单位双方手动盖章场景，被审计单位签署顺序1 先签署，设置为必须签，询证单位签署顺序2 后签署，并设置两个非必须的选签签署区，选择**信息证明无误** 或 **信息不符**其中一个签署区进行盖章签署。

```json
{
    "docs": [
        {
            "fileId": "请设置待签署文件的fileId",
            "fileName": "请设置待签署文件的文件名称.pdf"
        }
    ],
    "signFlowConfig": {
        "signFlowTitle": "此场景演示双方签署",
        "autoStart": true,
        "autoFinish": true,
        "noticeConfig": {
            "noticeTypes": "1,2"
        },
        "notifyUrl": "请设置异步回调地址，以http/https开头",
        "redirectConfig": {
            "redirectUrl": "请设置重定向跳转地址，例如：https://www.esign.cn/"
        }
    },
    "signers": [
        {
            "orgSignerInfo": {
                "orgName": "被审计单位盖章企业名称",
                "transactorInfo": {
                    "psnAccount": "请设置经办人的手机号/邮箱"
                }
            },
            "signConfig": {
                "signOrder": 1
            },
            "signerType": 1,
            "signFields": [
                {
                    "customBizNum": "自定义编码001",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "signFieldPosition": {
                            "positionPage": "1",
                            "positionX": 468,
                            "positionY": 346
                        },
                        "signFieldStyle": 1
                    },
                    "signDateConfig": {
                        "dateFormat": "yyyy-MM-dd HH:mm:ss",
                        "showSignDate": 1
                    }
                }
            ]
        },
        {
            "orgSignerInfo": {
                "orgName": "询证单位企业名称",
                "transactorInfo": {
                    "psnAccount": "请设置经办人的手机号/邮箱"
                }
            },
            "signConfig": {
                "signOrder": 2
            },
            "signerType": 1,
            "signFields": [
                {
                    "customBizNum": "自定义编码002",
                    "mustSign": false,
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "signFieldPosition": {
                            "positionPage": "1",
                            "positionX": 228,
                            "positionY": 179
                        },
                        "signFieldStyle": 1
                    },
                    "signDateConfig": {
                        "dateFormat": "yyyy-MM-dd HH:mm:ss",
                        "showSignDate": 1
                    }
                }
            ]
        },
        {
            "orgSignerInfo": {
                "orgName": "询证单位企业名称",
                "transactorInfo": {
                    "psnAccount": "请设置经办人的手机号/邮箱"
                }
            },
            "signConfig": {
                "signOrder": 2
            },
            "signerType": 1,
            "signFields": [
                {
                    "customBizNum": "自定义编码002",
                    "mustSign": false,
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "signFieldPosition": {
                            "positionPage": "1",
                            "positionX": 479,
                            "positionY": 179
                        },
                        "signFieldStyle": 1
                    },
                    "signDateConfig": {
                        "dateFormat": "yyyy-MM-dd HH:mm:ss",
                        "showSignDate": 1
                    }
                }
            ]
        }
    ]
}
```

#### 
