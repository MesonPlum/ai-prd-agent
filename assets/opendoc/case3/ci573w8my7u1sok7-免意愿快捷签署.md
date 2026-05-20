# 基础介绍
免意愿快捷签署是指用户在e签宝页面签署过程中勾选同意《快捷签署服务协议》后，当前用户在约定时间内（默认7天）再次在当前开发者appId、当前终端设备下签署即可免除意愿认证，直接签署成功。

:::info
**适用于医疗处方单、物流承运协议等需要个人频繁签署的低风险场景，需要联系e签宝业务人员进行开通后使用。**

:::

# 效果展示
## 第一次勾选协议签署操作演示（H5端）
<font style="color:#DF2A3F;">（第一次授权签署需要做意愿/实名认证）</font>

![](https://cdn.nlark.com/yuque/0/2024/gif/447795/1712644494129-321eef59-b91d-4630-9fcc-d7c1c9f0f0d0.gif)

### 《快捷签署服务协议》内容参考（PC端签署）：
### ![](https://cdn.nlark.com/yuque/0/2024/png/447795/1712728852553-0940394a-1c8d-4c2c-8f65-dbf54c563f74.png)
![](https://cdn.nlark.com/yuque/0/2024/png/447795/1712653337543-ed9c1ecc-1edf-4e0a-aa8a-cf6dfc129bac.png)

## 约定时间内再次签署操作演示（H5端）
## ![](https://cdn.nlark.com/yuque/0/2024/gif/447795/1712644537355-d72ff122-3f9b-4c4b-9a0e-7597133a69c4.gif)
# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口获取签署方签署页面链接，可用于签署或预览。 | **<font style="color:#8C8C8C;">按需</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
### 相关参数   
+ **<font style="color:#DF2A3F;">agreeSkipWillingness</font>**（签署人是否需要免意愿快捷签署，默认false； true - 需要，false - 不需要）

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1714460504191-d765b0ff-82ef-4692-a0a2-eb503fca4d79.png)

#### 代码案例
#### 平台自身和个人用户签署案例，个人设置免意愿快捷签署
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
                "signOrder": 2,
                "agreeSkipWillingness":true
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

#### 
