# 基础介绍
当合同需要双方签署时，例如：销售合同、劳动合同、租赁合同、采购合同等等需要双方签字/盖章的场景可以参考本流程。其中发起签署前的合同生成可以参考左侧导航栏的**《生成合同》**模块。

# 效果展示
**用户签署操作页面效果：**[**点击查看 SaaS API V3版用户签署页操作手册**](https://open.esign.cn/doc/opendoc/helper/toh8ph)

**用户签署操作视频演示：**[**签署演示视频.mp4**](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/签署视频.mp4)

**双方签署后效果展示：**

![](https://cdn.nlark.com/yuque/0/2026/png/447795/1768974730527-12b19cf2-412c-4a5c-ac75-60ccf9c9bb1a.png)

测试文件下载：[软件销售合同 .docx](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/软件销售合同 .docx)

# API列表
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口获取签署方签署页面链接，可用于签署或预览。 | **<font style="color:#8C8C8C;">按需</font>** |
| [查询签署流程详情](https://open.esign.cn/doc/opendoc/pdf-sign3/xxk4q6) | 此接口可以根据发起签署接口返回的signFlowId，来查询签署状态、签署配置等信息。 | **<font style="color:#8C8C8C;">按需</font>** |
| [下载已签署文件及附属材料](https://open.esign.cn/doc/opendoc/pdf-sign3/kczf8g) | 此接口可在签署流程结束后，下载签署后的PDF文件以及其他查看类附件。 | **<font style="color:#52C41A;">建议</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
因基于文件发起签署接口<font style="color:rgb(63, 63, 63);">是发起签</font>署必需接口<font style="color:rgb(63, 63, 63);">，参数较多，不同的场景容易弄混。所以列举以下关键参数以及常用传参案例以供参考。</font>

### 关键参数
+ <font style="color:#DF2A3F;">signerType</font>（<font style="color:rgb(64, 64, 64);">签署方类型，0 - 个人，1 - 机构，2 - 法定代表人）</font>
+ <font style="color:#DF2A3F;">psnSignerInfo</font><font style="color:rgb(64, 64, 64);">（个人签署方信息）</font>
+ <font style="color:#DF2A3F;">orgSignerInfo</font><font style="color:rgb(64, 64, 64);">（机构签署方信息）</font><font style="color:#DF2A3F;">自动签署场景，建议不传此对象，e签宝后台会取默认值</font>
+ <font style="color:#DF2A3F;">autoSign</font><font style="color:rgb(64, 64, 64);">（是否后台自动落章）</font>
+ <font style="color:#DF2A3F;">signOrder</font><font style="color:rgb(64, 64, 64);">（设置签署方的签署顺序，按序签时传入顺序值 1 - 255，不需要顺序签可以指定相同顺序值，或者不指定该参数）</font>

#### 平台自身自动盖章和个人用户手动签署案例
+ **<font style="color:rgb(64, 64, 64);">签署方1（平台自身）</font>**<font style="color:rgb(64, 64, 64);">：当 </font><font style="color:#DF2A3F;">autoSign </font><font style="color:rgb(64, 64, 64);">设置为</font>：true（<font style="color:rgb(64, 64, 64);">后台自动签署）</font>，e签宝后台会自动获取当前appid所属公司的信息、印章，所以可以不传入签署方信息；平台属于机构类型，所以<font style="color:rgb(64, 64, 64);"> </font><font style="color:#DF2A3F;">signerType </font><font style="color:rgb(64, 64, 64);">设置为</font>：1 （机构）；<font style="color:rgb(64, 64, 64);">签署顺序 </font><font style="color:#DF2A3F;">signOrder </font><font style="color:rgb(64, 64, 64);">设置为：</font>1（顺序值小的数字先<font style="color:rgb(64, 64, 64);">签署）。</font>
+ **<font style="color:rgb(64, 64, 64);">签署方2（个人用户）</font>**<font style="color:rgb(64, 64, 64);">：</font><font style="color:#DF2A3F;">psnSignerInfo </font><font style="color:rgb(64, 64, 64);">传入个人用户的身份信息；个人用户属于个人类型，所以 </font><font style="color:#DF2A3F;">signerType </font><font style="color:rgb(64, 64, 64);">设置</font>为：0（个人）；签<font style="color:rgb(64, 64, 64);">署顺序 </font><font style="color:#DF2A3F;">signOrder </font><font style="color:rgb(64, 64, 64);">设置</font>为：2（顺序值大的<font style="color:rgb(64, 64, 64);">数字后签署）。</font>

```json
{
    "docs": [
        {
            "fileId": "请设置待签署文件的fileId",
            "fileName": "请设置待签署文件的文件名称.pdf"
        }
    ],
    "signFlowConfig": {
        "signFlowTitle": "请设置当前签署任务的主题：此场景演示平台自身、个人用户双方签署",
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
            "signConfig": {
                "signOrder": 1
            },
            "signerType": 1,
            "signFields": [
                {
                    "customBizNum": "自定义编码001",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "autoSign": true,
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "3",
                            "positionX": 200,
                            "positionY": 200
                        }
                    }
                }
            ]
        },
        {
            "psnSignerInfo": {
                "psnAccount": "请设置个人用户的手机号/邮箱",
                "psnInfo": {
                    "psnName": "个人用户的姓名"
                }
            },
            "signConfig": {
                "forcedReadingTime": 10,
                "signOrder": 2
            },
            "signerType": 0,
            "signFields": [
                {
                    "customBizNum": "自定义编码002",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "signFieldPosition": {
                            "positionPage": "3",
                            "positionX": 480,
                            "positionY": 200
                        },
                        "signFieldStyle": 1
                    }
                }
            ]
        }
    ]
}
```

#### 平台自身自动盖章和企业用户手动签署案例
+ **<font style="color:rgb(64, 64, 64);">签署方1（平台自身）</font>**<font style="color:rgb(64, 64, 64);">：当 </font><font style="color:#DF2A3F;">autoSign </font><font style="color:rgb(64, 64, 64);">设置为</font>：true（<font style="color:rgb(64, 64, 64);">后台自动签署）</font>，e签宝后台会自动获取当前appid所属公司的信息、印章，所以可以不传入签署方信息；平台属于机构类型，所以<font style="color:rgb(64, 64, 64);"> </font><font style="color:#DF2A3F;">signerType </font><font style="color:rgb(64, 64, 64);">设置为</font>：1 （机构）；<font style="color:rgb(64, 64, 64);">签署顺序 </font><font style="color:#DF2A3F;">signOrder </font><font style="color:rgb(64, 64, 64);">设置为：</font>1（顺序值小的数字先<font style="color:rgb(64, 64, 64);">签署）。</font>
+ **<font style="color:rgb(64, 64, 64);">签署方2（企业用户）</font>**<font style="color:rgb(64, 64, 64);">：</font><font style="color:#DF2A3F;">orgSignerInfo </font><font style="color:rgb(64, 64, 64);">传入企业用户的身份信息；企业用户属于机构类型，所以 </font><font style="color:#DF2A3F;">signerType </font><font style="color:rgb(64, 64, 64);">设置为</font>：1 （机构<font style="color:rgb(64, 64, 64);">）；</font>签<font style="color:rgb(64, 64, 64);">署顺序 </font><font style="color:#DF2A3F;">signOrder </font><font style="color:rgb(64, 64, 64);">设置为</font>：2（顺序值大的数<font style="color:rgb(64, 64, 64);">字后签署）。</font>

```json
{
    "docs": [
        {
            "fileId": "请设置待签署文件的fileId",
            "fileName": "请设置待签署文件的文件名称.pdf"
        }
    ],
    "signFlowConfig": {
        "signFlowTitle": "请设置当前签署任务的主题：此场景演示平台自身、企业用户双方签署",
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
            "signConfig": {
                "signOrder": 1
            },
            "signerType": 1,
            "signFields": [
                {
                    "customBizNum": "自定义编码001",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "autoSign": true,
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "3",
                            "positionX": 200,
                            "positionY": 200
                        }
                    }
                }
            ]
        },
        {
            "orgSignerInfo": {
                "orgName": "请设置企业用户企业名称",
                "orgInfo": {
                    "orgIDCardNum": "请设置企业用户的统一社会信用代码",
                    "orgIDCardType": "CRED_ORG_USCC"
                },
                "transactorInfo": {
                    "psnAccount": "请设置企业用户经办人的手机号",
                    "psnInfo": {
                        "psnName": "个人用户的姓名"
                    }
                }
            },
            "signConfig": {
                "forcedReadingTime": 10,
                "signOrder": 2
            },
            "signerType": 1,
            "signFields": [
                {
                    "customBizNum": "自定义编码001",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "3",
                            "positionX": 200,
                            "positionY": 200
                        }
                    }
                }
            ]
        }
    ]
}
```

#### 企业用户和个人用户手动签署案例
+ **<font style="color:rgb(64, 64, 64);">签署方1（企业用户）</font>**<font style="color:rgb(64, 64, 64);">：</font><font style="color:#DF2A3F;">orgSignerInfo </font><font style="color:rgb(64, 64, 64);">传入企业用户的身份信息；企业用户属于机构类型，所以 </font><font style="color:#DF2A3F;">signerType </font><font style="color:rgb(64, 64, 64);">设置为</font>：1 （机构<font style="color:rgb(64, 64, 64);">）；签署顺序 </font><font style="color:#DF2A3F;">signOrder </font><font style="color:rgb(64, 64, 64);">设置为</font>：1（顺序值小的<font style="color:rgb(64, 64, 64);">数字先签署）。</font>
+ **<font style="color:rgb(64, 64, 64);">签署方2（个人用户）</font>**<font style="color:rgb(64, 64, 64);">：</font><font style="color:#DF2A3F;">psnSignerInfo </font><font style="color:rgb(64, 64, 64);">传入个人用户的身份信息；个人用户属于个人类型，所以 </font><font style="color:#DF2A3F;">signerType </font><font style="color:rgb(64, 64, 64);">设置为</font>：0（个人）；签<font style="color:rgb(64, 64, 64);">署顺序 </font><font style="color:#DF2A3F;">signOrder </font><font style="color:rgb(64, 64, 64);">设置为</font>：2（顺序值大的数<font style="color:rgb(64, 64, 64);">字后签署）。</font>

```json
{
    "docs": [
        {
            "fileId": "请设置待签署文件的fileId",
            "fileName": "请设置待签署文件的文件名称.pdf"
        }
    ],
    "signFlowConfig": {
        "signFlowTitle": "请设置当前签署任务的主题：此场景演示企业用户、个人用户双方签署",
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
                "orgName": "请设置企业用户企业名称",
                "orgInfo": {
                    "orgIDCardNum": "请设置企业用户的统一社会信用代码",
                    "orgIDCardType": "CRED_ORG_USCC"
                },
                "transactorInfo": {
                    "psnAccount": "请设置企业用户经办人的手机号",
                    "psnInfo": {
                        "psnName": "个人用户的姓名"
                    }
                }
            },
            "signConfig": {
                "forcedReadingTime": 10,
                "signOrder": 1
            },
            "signerType": 1,
            "signFields": [
                {
                    "customBizNum": "自定义编码001",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "3",
                            "positionX": 200,
                            "positionY": 200
                        }
                    }
                }
            ]
        },
        {
            "psnSignerInfo": {
                "psnAccount": "请设置个人用户的手机号/邮箱",
                "psnInfo": {
                    "psnName": "个人用户的姓名"
                }
            },
            "signConfig": {
                "forcedReadingTime": 10,
                "signOrder": 2
            },
            "signerType": 0,
            "signFields": [
                {
                    "customBizNum": "自定义编码002",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "3",
                            "positionX": 480,
                            "positionY": 200
                        }
                    }
                }
            ]
        }
    ]
}
```

#### 企业用户和企业用户手动签署案例
+ **<font style="color:rgb(64, 64, 64);">签署方1（企业用户）</font>**<font style="color:rgb(64, 64, 64);">：</font><font style="color:#DF2A3F;">orgSignerInfo </font><font style="color:rgb(64, 64, 64);">传入企业用户A的身份信息；企业用户属于机构类型，所以 </font><font style="color:#DF2A3F;">signerType </font><font style="color:rgb(64, 64, 64);">设置为</font>：1 （机构<font style="color:rgb(64, 64, 64);">）；签署顺序 </font><font style="color:#DF2A3F;">signOrder </font><font style="color:rgb(64, 64, 64);">设置为</font>：1（顺序值小的<font style="color:rgb(64, 64, 64);">数字先签署）。</font>
+ **<font style="color:rgb(64, 64, 64);">签署方2（企业用户）</font>**<font style="color:rgb(64, 64, 64);">：</font><font style="color:#DF2A3F;">orgSignerInfo </font><font style="color:rgb(64, 64, 64);">传入企业用户B的身份信息；企业用户属于机构类型，所以 </font><font style="color:#DF2A3F;">signerType </font><font style="color:rgb(64, 64, 64);">设置为</font>：1 （机构<font style="color:rgb(64, 64, 64);">）；</font>签<font style="color:rgb(64, 64, 64);">署顺序 </font><font style="color:#DF2A3F;">signOrder </font><font style="color:rgb(64, 64, 64);">设置为</font>：2（顺序值大的数<font style="color:rgb(64, 64, 64);">字后签署）。</font>

```json
{
    "docs": [
        {
            "fileId": "请设置待签署文件的fileId",
            "fileName": "请设置待签署文件的文件名称.pdf"
        }
    ],
    "signFlowConfig": {
        "signFlowTitle": "请设置当前签署任务的主题：此场景演示两个企业用户双方签署",
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
                "orgName": "请设置企业用户A的企业名称",
                "orgInfo": {
                    "orgIDCardNum": "请设置企业用户A的统一社会信用代码",
                    "orgIDCardType": "CRED_ORG_USCC"
                },
                "transactorInfo": {
                    "psnAccount": "请设置企业用户A的经办人手机号",
                    "psnInfo": {
                        "psnName": "请设置企业用户A的经办人姓名"
                    }
                }
            },
            "signConfig": {
                "forcedReadingTime": 10,
                "signOrder": 1
            },
            "signerType": 1,
            "signFields": [
                {
                    "customBizNum": "自定义编码001",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "3",
                            "positionX": 200,
                            "positionY": 200
                        }
                    }
                }
            ]
        },
        {
             "orgSignerInfo": {
                "orgName": "请设置企业用户B的企业名称",
                "orgInfo": {
                    "orgIDCardNum": "请设置企业用户B的统一社会信用代码",
                    "orgIDCardType": "CRED_ORG_USCC"
                },
                "transactorInfo": {
                    "psnAccount": "请设置企业用户B的经办人手机号",
                    "psnInfo": {
                        "psnName": "请设置企业用户B的经办人姓名"
                    }
                }
            },
            "signConfig": {
                "forcedReadingTime": 10,
                "signOrder": 2
            },
            "signerType": 1,
            "signFields": [
                {
                    "customBizNum": "自定义编码002",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "3",
                            "positionX": 480,
                            "positionY": 200
                        }
                    }
                }
            ]
        }
    ]
}
```

#### 其他企业自动盖章和个人用户手动签署案例
<font style="color:rgb(63, 63, 63);">其他除平台自身外的其他企业（集团子公司、合作企业等）需要自动落章时，需要做印章授权（</font>[点击查看印章授权方案](https://qianxiaoxia.yuque.com/opendoc/helper/ryllt4y4x6bemr7b)<font style="color:rgb(63, 63, 63);">），将印章Id授权给开发者自身应用ID，需额外加上授权企业的 </font><font style="color:#E8323C;">assignedSealId</font><font style="color:rgb(63, 63, 63);">（印章ID）参数：</font>

+ **<font style="color:#E8323C;">assignedSealId</font>**<font style="color:rgb(63, 63, 63);">（指定印章ID）设置：被授权的印章ID值。</font>
+ **<font style="color:#DF2A3F;">autoSign</font>**<font style="color:#DF2A3F;"> </font><font style="color:rgb(64, 64, 64);">其他企业设置为</font>：true （后台自动签<font style="color:rgb(64, 64, 64);">署）。</font>
+ <font style="color:rgb(64, 64, 64);">其他企业属于机构类型，所以 </font>**<font style="color:#DF2A3F;">signerType</font>**<font style="color:#DF2A3F;"> </font><font style="color:rgb(64, 64, 64);">设置为：1 （机构）；</font>个人用户属于个人类型，所以 **<font style="color:#DF2A3F;">signerType</font>** 设置为：0 - 个人。
+ **<font style="color:#DF2A3F;">psnSignerInfo</font>**<font style="color:rgb(64, 64, 64);">：传入个人用户的身份信息。</font>
+ <font style="color:rgb(64, 64, 64);">其他企业自动落章</font>**<font style="color:#DF2A3F;">不需要传orgSignerInfo</font>**<font style="color:rgb(64, 64, 64);">此对象。</font>

```json
{
    "docs": [
        {
            "fileId": "请设置待签署文件的fileId",
            "fileName": "请设置待签署文件的文件名称.pdf"
        }
    ],
    "signFlowConfig": {
        "signFlowTitle": "请设置当前签署任务的主题：此场景演示其他企业自动盖章、个人用户双方签署",
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
            "signConfig": {
                "signOrder": 1
            },
            "signerType": 1,
            "signFields": [
                {
                    "customBizNum": "自定义编码001",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "autoSign": true,
                        "assignedSealId": "需传入其他企业授权的印章ID值",
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "3",
                            "positionX": 200,
                            "positionY": 200
                        }
                    }
                }
            ]
        },
        {
            "psnSignerInfo": {
                "psnAccount": "请设置个人用户的手机号/邮箱",
                "psnInfo": {
                    "psnName": "个人用户的姓名"
                }
            },
            "signConfig": {
                "signOrder": 2
            },
            "signerType": 0,
            "signFields": [
                {
                    "customBizNum": "自定义编码002",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "3",
                            "positionX": 480,
                            "positionY": 200
                        }
                    }
                }
            ]
        }
    ]
}
```

