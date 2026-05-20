# 基础介绍
当合同仅需要单方盖章时，例如：证明材料，对账单等单方企业盖章场景，可以参考本流程。其中发起签署前的合同生成可以参考左侧导航栏的**《生成合同》**模块。

# 效果展示
**用户签署操作页面效果：**[点击查看 SaaS API V3版用户签署页操作手册](https://open.esign.cn/doc/opendoc/helper/toh8ph)

**签署后效果展示：**

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1666836016383-15121533-55bc-41db-ad78-5d8e2a7ef619.png)

测试文件下载：[离职证明.pdf](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/离职证明.pdf)

# API列表
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口获取签署方签署页面链接，可用于签署或预览。 | **<font style="color:#8C8C8C;">按需</font>** |
| [查询签署流程详情](https://open.esign.cn/doc/opendoc/pdf-sign3/xxk4q6) | 此接口可以根据发起签署接口返回的signFlowId，来查询签署状态、签署配置等信息。 | **<font style="color:#8C8C8C;">按需</font>** |
| [下载已签署文件及附属材料](https://open.esign.cn/doc/opendoc/pdf-sign3/kczf8g) | 此接口可在签署流程结束后，下载签署后的PDF文件以及其他查看类附件。 | **<font style="color:#52C41A;">建议</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
### 关键参数
+ <font style="color:#DF2A3F;">autoSign</font><font style="color:rgb(64, 64, 64);">（是否后台自动落章）</font>
+ <font style="color:#DF2A3F;">signerType</font>（<font style="color:rgb(64, 64, 64);">签署方类型，</font>**<font style="color:rgb(64, 64, 64);">0 </font>**<font style="color:rgb(64, 64, 64);">- 个人，</font>**<font style="color:rgb(64, 64, 64);">1 </font>**<font style="color:rgb(64, 64, 64);">- 机构，</font>**<font style="color:rgb(64, 64, 64);">2</font>**<font style="color:rgb(64, 64, 64);"> - 法定代表人）</font>
+ <font style="color:#DF2A3F;">orgSignerInfo</font><font style="color:rgb(64, 64, 64);">（机构签署方信息）</font><font style="color:#DF2A3F;">自动签署场景，建议不传此对象，e签宝后台会取默认值</font>
+ <font style="color:#E8323C;">assignedSealId</font><font style="color:rgb(64, 64, 64);">（指定印章ID）</font>

#### 平台自身企业自动盖章案例
平台方/集成方：指自主接入电子签名服务的开发方，e签宝开放平台应用appId所属的主体公司。

+ <font style="color:#DF2A3F;">autoSign </font><font style="color:rgb(64, 64, 64);">设置为</font>：true （后台自动签<font style="color:rgb(64, 64, 64);">署），e签宝后台会自动获取当前appid所属公司的信息、印章，所以可以不传入签署方信息。</font>
+ <font style="color:rgb(64, 64, 64);">平台属于机构类型，所以 </font><font style="color:#DF2A3F;">signerType </font><font style="color:rgb(64, 64, 64);">设置为</font>：1（机构）<font style="color:rgb(64, 64, 64);">。</font>
+ <font style="color:#E8323C;">assignedSealId</font><font style="color:rgb(63, 63, 63);"> 不传会取默认印章，如需指定其他样式印章可以登录e签宝官网获取</font><font style="color:rgb(64, 64, 64);">【</font>[请点击](https://open.esign.cn/doc/opendoc/helper/xvglqhiq48prkf4m)<font style="color:rgb(64, 64, 64);">】</font><font style="color:rgb(63, 63, 63);">。</font>

```json
{
    "docs": [
        {
            "fileId": "请设置待签署文件的fileId",
            "fileName": "请设置待签署文件的文件名称.pdf"
        }
    ],
    "signFlowConfig": {
        "signFlowTitle": "请设置当前签署任务的主题：此场景演示平台自身企业自动盖章",
        "autoFinish": true,
        "noticeConfig": {
            "noticeTypes": "1,2"
        },
        "notifyUrl": "请设置异步回调地址，以http/https开头(不需要通知可不设置)"
    },
    "signers": [
        {
            "signerType": 1,
            "signFields": [
                {
                    "customBizNum": "自定义编码001",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "autoSign": true,
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "1",
                            "positionX": 458,
                            "positionY": 466
                        }
                    }
                }
            ]
        }
    ]
}
```

#### 其他企业自动盖章案例
<font style="color:rgb(63, 63, 63);">其他除平台自身外的其他企业（集团子公司、合作企业等）需要自动落章时，需要做印章授权（</font>[点击查看印章授权方案](https://qianxiaoxia.yuque.com/opendoc/helper/ryllt4y4x6bemr7b)<font style="color:rgb(63, 63, 63);">），将印章Id授权给开发者自身应用ID，需额外加上授权企业的 </font><font style="color:#E8323C;">assignedSealId</font><font style="color:rgb(63, 63, 63);">（印章ID）参数：</font>

+ <font style="color:#E8323C;">assignedSealId</font><font style="color:rgb(63, 63, 63);">（指定印章ID）设置：被授权的印章ID值。</font>
+ <font style="color:#DF2A3F;">autoSign </font><font style="color:rgb(64, 64, 64);">设置为</font>：true （后台自动签<font style="color:rgb(64, 64, 64);">署）。</font>
+ <font style="color:rgb(64, 64, 64);">企业用户属于机构类型，所以 </font><font style="color:#DF2A3F;">signerType </font><font style="color:rgb(64, 64, 64);">设置为：1 （机构）。</font>

```json
{
    "docs": [
        {
            "fileId": "请设置待签署文件的fileId",
            "fileName": "请设置待签署文件的文件名称.pdf"
        }
    ],
    "signFlowConfig": {
        "signFlowTitle": "请设置当前签署任务的主题：此场景演示其他授权企业自动盖章",
        "autoFinish": true,
        "noticeConfig": {
            "noticeTypes": "1,2"
        },
        "notifyUrl": "请设置异步回调地址，以http/https开头(不需要通知可不设置)"
    },
    "signers": [
        {
            "signerType": 1,
            "signFields": [
                {
                    "customBizNum": "自定义编码001",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "autoSign": true,
                        "assignedSealId": "需传入被授权的印章ID值",
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "1",
                            "positionX": 458,
                            "positionY": 466
                        }
                    }
                }
            ]
        }
    ]
}
```

#### 企业用户手动盖章案例
当签署方企业需要在e签宝合同签署页面手动盖章时，可以参考此参数案例：

+ <font style="color:#DF2A3F;">orgSignerInfo </font><font style="color:rgb(64, 64, 64);">传入企业用户的身份信息。</font>
+ <font style="color:#DF2A3F;">autoSign</font><font style="color:rgb(64, 64, 64);"> 默认：false（非后台自动落章），可不传。</font>
+ <font style="color:rgb(64, 64, 64);">企业用户属于机构类型，所以 </font><font style="color:#DF2A3F;">signerType </font><font style="color:rgb(64, 64, 64);">设置为：1 （机构）。</font>

```json
{
    "docs": [
        {
            "fileId": "请设置待签署文件的fileId",
            "fileName": "请设置待签署文件的文件名称.pdf"
        }
    ],
    "signFlowConfig": {
        "signFlowTitle": "请设置当前签署任务的主题：此场景演示企业用户手动盖章",
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

#### 个人用户手动签署案例
当签署方个人需要在e签宝合同签署页面手动签署时，可以参考此参数案例：

+ <font style="color:#DF2A3F;">psnSignerInfo</font>  传入个人用户的身份信息。
+ 个人用户需指定个人签署类型，所以 <font style="color:#DF2A3F;">signerType</font> 设置为：0 - 个人。
+ <font style="color:#DF2A3F;">psnSealStyles</font>  可选个人印章样式，0 - 手写签名，1 - 姓名印章，2 - 手写签名AI校验。[点击了解 个人手写签名与姓名印章](https://open.esign.cn/doc/opendoc/case3/vq3nv0cxyuv3pba4)

```json
{
  "docs": [
    {
      "fileId": "请设置待签署文件的fileId",
      "fileName": "请设置待签署文件的文件名称.pdf"
    }
  ],
  "signFlowConfig": {
    "signFlowTitle": "请设置当前签署任务的主题：此场景演示个人用户手动签署场景",
    "autoFinish": true,
    "noticeConfig": {
      "noticeTypes": "1,2"
    },
    "notifyUrl": "请设置异步回调地址，以http/https开头(不需要通知可不设置)"
  },
  "signers": [
    {
      "psnSignerInfo": {
        "psnAccount": "请设置个人用户的手机号/邮箱",
        "psnInfo": {
          "psnName": "个人用户的姓名"
        }
      },
      "signerType": 0,
      "signFields": [
        {
          "customBizNum": "自定义编码001",
          "fileId": "请设置待签署文件的fileId",
          "normalSignFieldConfig": {
            "psnSealStyles":"1,2",
            "signFieldPosition": {
              "positionPage": "1",
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

