# 基础介绍
签署仅支持签署方主体是企业时，自动加盖其企业或法定代表人印章，独立的个人印章不支持自动落章。以下演示平台方或其他企业用户的自动落章场景。

**平台方/集成方：**开发者自身企业，e签宝开放平台应用appId所属的主体公司；

**其他企业用户：**除平台方外的所有其他企业（包含集团分子公司、合作企业等）。

:::info
**适用场景（以下场景都支持，可多选）：**

+ 自动加盖平台方的企业章，企业有公章、合同专用章、人事专用章、财务专用章 4个默认印章，也可以自主创建其他类型的企业印章（[点击了解 如何创建企业印章](https://help.esign.cn/detail?id=dg7rpb&nameSpace=cs3-dept%2Fexboae)）；
+ 自动加盖平台方的法定代表人印章，法定代表人印章不会自动创建，需要单独创建后才能使用。 （[点击了解 如何创建法定代表人印章](https://help.esign.cn/detail?id=cv1onk&nameSpace=cs3-dept%2Fexboae)）；
+ 自动加盖其他企业用户的企业章，需要做印章授权（[点击查看印章授权方案](https://qianxiaoxia.yuque.com/opendoc/helper/ryllt4y4x6bemr7b)）；
+ 自动加盖其他企业用户的法定代表人印章，跟企业章一样需要做印章授权（[点击查看印章授权方案](https://qianxiaoxia.yuque.com/opendoc/helper/ryllt4y4x6bemr7b)）。

:::

# 效果展示
左侧甲方盖章：分别是企业法定代表人印章和企业公章![](https://cdn.nlark.com/yuque/0/2024/png/447795/1735023246706-d71233e6-4c5d-4f47-9605-ba67cdb705bb.png)

# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口获取签署预览页面链接，可用于预览自动落章是否正确（body参数可以都不传即是获取平台预览链接）。 | **<font style="color:#8C8C8C;">按需</font>** |
| [查询签署流程详情](https://open.esign.cn/doc/opendoc/pdf-sign3/xxk4q6) | 此接口可以根据发起签署接口返回的signFlowId，来查询签署状态、签署配置等信息。 | **<font style="color:#8C8C8C;">按需</font>** |
| [下载已签署文件及附属材料](https://open.esign.cn/doc/opendoc/pdf-sign3/kczf8g) | 此接口可在签署流程结束后，下载签署后的PDF文件**。** | **<font style="color:#52C41A;">建议</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
### 平台或其他企业用户自动落章案例
**点击查看接口文档**[**【基于文件发起签署】**](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/su5g42)

+ <font style="color:#DF2A3F;">autoSign </font><font style="color:rgb(64, 64, 64);">（是否后台自动落章）设置为</font>：true （后台自动签<font style="color:rgb(64, 64, 64);">署）；</font>
+ <font style="color:#E8323C;">assignedSealId</font><font style="color:rgb(63, 63, 63);">（指定印章ID）指定：平台自身企业印章/法定代表人章，或被其他企业授权的企业印章/法定代表人章，可通过参数 </font><font style="color:#E8323C;">assignedSealId</font><font style="color:rgb(63, 63, 63);"> 区分盖哪个企业的哪个章（如不传印章ID，自动取平台方自身的默认企业印章）；</font>
+ <font style="color:#DF2A3F;">signerType </font>（签署方<font style="color:rgb(64, 64, 64);">类型）</font>一个签署方设<font style="color:rgb(64, 64, 64);">置为</font>：1（机构）<font style="color:rgb(64, 64, 64);">，另一个签署方设置为：2 （法定代表人），如果只需要盖一个类型就去掉另一个；</font>
+ <font style="color:#DF2A3F;">orgSignerInfo</font><font style="color:rgb(64, 64, 64);">（机构签署方信息）：</font><font style="color:#DF2A3F;">不传该参数</font>（自动签署场景，e签宝后台会取默认值）。

```json
{
    "docs": [
        {
            "fileId": "请设置待签署文件的fileId",
            "fileName": "请设置待签署文件的文件名称.pdf"
        }
    ],
    "signFlowConfig": {
        "signFlowTitle": "请设置当前签署任务的主题：此场景演示企业自动盖章",
        "autoFinish": true,
        "noticeConfig": {
            "noticeTypes": "1,2"
        },
        "notifyUrl": "请设置异步回调地址，以http/https开头(不需要通知可不设置)"
    },
    "signers": [
        {
            "signerType": 1, //自动落企业章
            "signFields": [
                {
                    "customBizNum": "自定义编码001",
                    "fileId": "请设置待签署文件的fileId",
                    "normalSignFieldConfig": {
                        "autoSign": true,
                        "assignedSealId": "需传入平台指定印章ID或者被企业用户授权的印章ID",
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "1",
                            "positionX": 236,
                            "positionY": 199
                        }
                    }
                },
                {
                    "signerType": 2, //自动落法定代表人印章
                    "signFields": [
                        {
                            "customBizNum": "自定义编码002",
                            "fileId": "请设置待签署文件的fileId",
                            "normalSignFieldConfig": {
                                "autoSign": true,
                                "assignedSealId": "需传入平台的法定代表印章ID或被企业用户授权的法定代表人印章ID",
                                "signFieldStyle": 1,
                                "signFieldPosition": {
                                    "positionPage": "1",
                                    "positionX": 120,
                                    "positionY": 168
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
```







