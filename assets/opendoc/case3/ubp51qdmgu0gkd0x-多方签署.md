# 基础介绍
当合同需要多方签署时，例如：合伙经营、股权转让等需要多方签字/盖章的场景可以参考本流程。其中发起签署前的合同生成可以参考左侧导航栏的**《生成合同》**模块。

# 效果展示
**用户签署操作页面效果：**[点击查看 SaaS API V3版用户签署页操作手册](https://open.esign.cn/doc/opendoc/helper/toh8ph)

**签署后效果展示：**

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1667963755006-8caaa7b4-2597-4039-85e8-1405868e1306.png)![](https://cdn.nlark.com/yuque/0/2022/png/447795/1667964678632-467db23f-58e9-4d9b-bef3-b7d030a8388e.png)

测试文件下载：[三人合伙经营协议书.doc](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/三人合伙经营协议书.doc)

# API列表
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口获取签署方签署页面链接，可用于签署或预览。 | **<font style="color:#8C8C8C;">按需</font>** |
| [查询签署流程详情](https://open.esign.cn/doc/opendoc/pdf-sign3/xxk4q6) | 此接口可以根据发起签署接口返回的signFlowId，来查询签署状态、签署配置等信息。 | **<font style="color:#8C8C8C;">按需</font>** |
| [下载已签署文件及附属材料](https://open.esign.cn/doc/opendoc/pdf-sign3/kczf8g) | 此接口可在签署流程结束后，下载签署后的PDF文件以及其他查看类附件。 | **<font style="color:#52C41A;">建议</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
因基于文件发起签署接口<font style="color:rgb(63, 63, 63);">是发起</font>签署必需接口，<font style="color:rgb(63, 63, 63);">参数较多，不同的场景容易弄混。所以列举以下关键参数以及常用传参案例以供参考。</font>

### 关键参数
+ <font style="color:#DF2A3F;">signerType</font>（<font style="color:rgb(64, 64, 64);">签署方类型，0 - 个人，1 - 机构，2 - 法定代表人）</font>
+ <font style="color:#DF2A3F;">psnSignerInfo</font><font style="color:rgb(64, 64, 64);">（个人签署方信息）</font>
+ <font style="color:#DF2A3F;">orgSignerInfo</font><font style="color:rgb(64, 64, 64);">（机构签署方信息）</font><font style="color:#DF2A3F;">自动签署场景，建议不传此对象，e签宝后台会取默认值</font>
+ <font style="color:#DF2A3F;">autoSign</font><font style="color:rgb(64, 64, 64);">（是否后台自动落章）</font>
+ <font style="color:#DF2A3F;">signOrder</font><font style="color:rgb(64, 64, 64);">（设置签署方的签署顺序，按序签时传入顺序值 1 - 255，不需要顺序签可以指定相同顺序值，或者不指定该参数）</font>

#### 三方个人用户签署案例
+ **<font style="color:rgb(64, 64, 64);">签署方1、2、3（个人用户）</font>**<font style="color:rgb(64, 64, 64);">：</font><font style="color:#DF2A3F;">psnSignerInfo </font><font style="color:rgb(64, 64, 64);">传入个人用户的身份信息；个人用户属于个人类型，所以 </font><font style="color:#DF2A3F;">signerType </font><font style="color:rgb(64, 64, 64);">设置为</font>：0（个人<font style="color:rgb(64, 64, 64);">）；签署顺序 </font><font style="color:#DF2A3F;">signOrder</font><font style="color:rgb(64, 64, 64);"> 统一设置</font>为：1（<font style="color:rgb(64, 64, 64);">同一个值为无序签署，谁先签署都可以，若需要指定顺序可依次配置：1、2、3）。</font>

```json
{
    "docs": [
        {
            "fileId": "请设置待签署文件的fileId",
            "fileName": "请设置待签署文件的文件名称.pdf"
        }
    ],
    "signFlowConfig": {
        "signFlowTitle": "请设置当前签署任务的主题：此场景演示三方个人用户签署",
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
            "psnSignerInfo": {
                "psnAccount": "请设置个人用户：张三的手机号/邮箱",
                "psnInfo": {
                    "psnName": "张三"
                }
            },
            "signConfig": {
                "forcedReadingTime": 10,
                "signOrder": 1
            },
            "signerType": 0,
            "signFields": [
                {
                    "customBizNum": "自定义编码001",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "5",
                            "positionX": 150,
                            "positionY": 200
                        }
                    }
                }
            ]
        },
        {
            "psnSignerInfo": {
                "psnAccount": "请设置个人用户：李四的手机号/邮箱",
                "psnInfo": {
                    "psnName": "李四"
                }
            },
            "signConfig": {
                "forcedReadingTime": 10,
                "signOrder": 1
            },
            "signerType": 0,
            "signFields": [
                {
                    "customBizNum": "自定义编码002",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "5",
                            "positionX": 300,
                            "positionY": 200
                        }
                    }
                }
            ]
        },
        {
            "psnSignerInfo": {
                "psnAccount": "请设置个人用户：王五的手机号/邮箱",
                "psnInfo": {
                    "psnName": "王五"
                }
            },
            "signConfig": {
                "forcedReadingTime": 10,
                "signOrder": 1
            },
            "signerType": 0,
            "signFields": [
                {
                    "customBizNum": "自定义编码003",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "5",
                            "positionX": 450,
                            "positionY": 200
                        }
                    }
                }
            ]
        }
    ]
}
```

#### 个人用户、企业用户、平台自身三方签署案例
+ **<font style="color:rgb(64, 64, 64);">签署方1（个人用户）</font>**<font style="color:rgb(64, 64, 64);">：</font><font style="color:#DF2A3F;">psnSignerInfo </font><font style="color:rgb(64, 64, 64);">传入个人用户的身份信息；个人用户属于个人类型，所以 </font><font style="color:#DF2A3F;">signerType </font><font style="color:rgb(64, 64, 64);">设置</font>为：0（个人<font style="color:rgb(64, 64, 64);">）；签署顺序 </font><font style="color:#DF2A3F;">signOrder </font><font style="color:rgb(64, 64, 64);">设置为</font>：1（顺序<font style="color:rgb(64, 64, 64);">值1的数字先签署）。</font>
+ **<font style="color:rgb(64, 64, 64);">签署方2（企业用户）</font>**<font style="color:rgb(64, 64, 64);">：</font><font style="color:#DF2A3F;">orgSignerInfo </font><font style="color:rgb(64, 64, 64);">传入企业用户的身份信息；企业用户属于机构类型，所以 </font><font style="color:#DF2A3F;">signerType </font><font style="color:rgb(64, 64, 64);">设置为</font>：1 （机构<font style="color:rgb(64, 64, 64);">）；签署顺序 </font><font style="color:#DF2A3F;">signOrder </font><font style="color:rgb(64, 64, 64);">设置为</font>：2（顺序<font style="color:rgb(64, 64, 64);">值2的数字在1签署之后签署）。</font>
+ **<font style="color:rgb(64, 64, 64);">签署方3（平台自身）</font>**<font style="color:rgb(64, 64, 64);">：当 </font><font style="color:#DF2A3F;">autoSign </font><font style="color:rgb(64, 64, 64);">设置</font>为：true（后台<font style="color:rgb(64, 64, 64);">自动签署），e签宝后台会自动获取当前appid所属公司的信息、印章，所以可以不传入签署方信息；平台属于机构类型，所以 </font><font style="color:#DF2A3F;">signerType </font><font style="color:rgb(64, 64, 64);">设置为</font>：1 （机构）<font style="color:rgb(64, 64, 64);">；签署顺序 </font><font style="color:#DF2A3F;">signOrder </font><font style="color:rgb(64, 64, 64);">设置为</font>：3（顺序<font style="color:rgb(64, 64, 64);">值3的数字在2签署之后签署）。</font>

```json
{
    "docs": [
        {
            "fileId": "请设置待签署文件的fileId",
            "fileName": "请设置待签署文件的文件名称.pdf"
        }
    ],
    "signFlowConfig": {
        "signFlowTitle": "请设置当前签署任务的主题：此场景演示个人用户、企业用户、平台自身三方签署",
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
            "psnSignerInfo": {
                "psnAccount": "请设置个人用户的手机号/邮箱",
                "psnInfo": {
                    "psnName": "张三"
                }
            },
            "signConfig": {
                "forcedReadingTime": 10,
                "signOrder": 1
            },
            "signerType": 0,
            "signFields": [
                {
                    "customBizNum": "自定义编码001",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "5",
                            "positionX": 150,
                            "positionY": 200
                        }
                    }
                }
            ]
        },
        {
            "orgSignerInfo": {
                "orgName": "请设置企业用户的企业名称",
                "transactorInfo": {
                    "psnAccount": "请设置企业用户经办人的手机号/邮箱",
                    "psnInfo": {
                        "psnName": "请设置企业用户经办人的姓名"
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
                            "positionPage": "5",
                            "positionX": 300,
                            "positionY": 200
                        }
                    }
                }
            ]
        },
        {
            "signConfig": {
                "signOrder": 3
            },
            "signerType": 1,
            "signFields": [
                {
                    "customBizNum": "自定义编码003",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "autoSign": true,
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "5",
                            "positionX": 450,
                            "positionY": 200
                        }
                    }
                }
            ]
        }
    ]
}
```

