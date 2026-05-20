# 基础介绍
当一个用户需要一次签署多个相关文件（开发者在一个签署流程中添加多个文件），或者文件有多个位置需要一次性签章时，可以参考本场景对接说明。

# 效果展示
## 多文件多位置签章演示
<font style="color:#DF2A3F;">单文件内多个签署位置只需要选一次章即可多位置自动添加。多个文件时每个文件都需要进行一次选章。</font>

![](https://cdn.nlark.com/yuque/0/2024/gif/447795/1735117537480-d2a4980a-100a-46b2-b003-99a979f28055.gif)

# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | <font style="color:rgb(64, 64, 64);">此接口获取签署方签署页面链接，可用于签署或预览。</font> | **<font style="color:rgb(140, 140, 140);">按需</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
****[**点击下载 案例中的文件001与002.zip**](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/案例文件001与002.zip)

### 相关参数   
+ <font style="color:#E8323C;">fileId</font>（待签署文件ID）、（签署区所在待签署文件ID），需要两处传参。
+ <font style="color:#E8323C;">signFieldStyle</font>（<font style="color:rgb(64, 64, 64);">签章区样式：</font>**<font style="color:rgb(64, 64, 64);">1</font>**<font style="color:rgb(64, 64, 64);"> - 单页签章，</font>**<font style="color:rgb(64, 64, 64);">2</font>**<font style="color:rgb(64, 64, 64);"> - 骑缝签章</font>），演示为单页签署。
+ <font style="color:#E8323C;">signFieldPosition</font>（<font style="color:rgb(64, 64, 64);">签章区位置信息</font>），传入具体的页码，X坐标和Y坐标。

发起签署的基础完整传参案例：

```json
{
    "docs": [
        {
            "fileId": "请设置待签署文件001的fileId",
            "fileName": "文件名称-001.pdf"
        },
        {
            "fileId": "请设置待签署文件002的fileId",
            "fileName": "文件名称-002.pdf"
        }
    ],
    "signFlowConfig": {
        "signFlowTitle": "请设置当前签署任务的主题：此场景演示多文件，多位置签署"
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
                    "fileId": "文件001的fileId",
                    "normalSignFieldConfig": {
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "1",
                            "positionX": 440,
                            "positionY": 703
                        }
                    }
                },
                {
                    "fileId": "文件001的fileId",
                    "normalSignFieldConfig": {
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "3",
                            "positionX": 480,
                            "positionY": 197
                        }
                    }
                },
                {
                    "fileId": "文件002的fileId",
                    "normalSignFieldConfig": {
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "1",
                            "positionX": 441,
                            "positionY": 138
                        }
                    }
                }
            ]
        }
    ]
}
```





