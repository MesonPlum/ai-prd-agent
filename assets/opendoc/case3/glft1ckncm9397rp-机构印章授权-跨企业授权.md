:::warning
**<font style="color:#DF2A3F;">重要提示：自2024年9月12日起，跨企业印章授权自动签功能需要购买e签宝高级版或生态伙伴版本方可支持！</font>**

:::

# 基础介绍
:::warning
**<font style="color:rgb(64, 64, 64);">机构：</font>**<font style="color:rgb(64, 64, 64);">组织机构是企业、事业单位、机关、社会团体及其他依法成立单位的统称。</font>

**平台方/集成方：**指自主接入电子签名服务的开发方，e签宝开放平台应用appId所属的主体公司。

:::

## <font style="color:rgb(64, 64, 64);">为何要进行印章授权</font>
<font style="color:rgb(64, 64, 64);">	电子签名SaaS API V3版是一款标准的合规产品，对于企业的印章使用权限控制尤其严格，本文提供在API中跨企业间的印章授权方案来满足企业用户自动签署的诉求。</font>

_**<font style="color:rgb(245, 34, 45);">根据《电子签名法》中对可靠电子签名的要求，签署人需要明确表达同意签署此文件的意愿。</font>**_

**<font style="color:rgb(64, 64, 64);">当企业用户存在以下诉求时，可以使用印章跨企业授权的方式来表达签署意愿：</font>**

<font style="color:rgb(64, 64, 64);">（1）平台方的企业用户授权平台方通过接口自动加盖印章。</font>

<font style="color:rgb(64, 64, 64);">（2）分子公司授权总公司（或总公司授权分子公司）通过接口自动加盖印章。（内部公司一次性操作的场景可以通过</font>[e签宝SaaS官网](https://www.esign.cn/)<font style="color:rgb(64, 64, 64);">-<企业控制台>-<印章管理>模块直接操作授权，无需开发API接口）</font>

:::info
**<font style="color:rgb(64, 64, 64);">典型企业印章授权案例</font>**

<font style="color:rgb(64, 64, 64);">（1）在外部服务商系统的使用中，企业需要自动加盖印章，需要企业印章授权给平台方（即外部服务商）后，平台方才可以调用接口自动加盖企业印章。</font>

<font style="color:rgb(64, 64, 64);">（2）集团总公司搭建的系统中需要自动加盖分子公司的企业印章时，需要分子公司印章授权给平台方（即集团总公司）后，平台方才可以调用接口自动加盖分子公司企业印章。平台方为分子公司时，同理需要集团总公司印章授权分子公司。</font>

:::

:::warning
<font style="color:#DF2A3F;">注：平台方如果想要实现跨企业使用印章，必须提前给【委托机构】进行</font><font style="color:#E8323C;"> </font>[用户授权](https://qianxiaoxia.yuque.com/opendoc/case3/vvwxvh9gtdl30y3w)<font style="color:#E8323C;">（授权允许获取企业/组织用户的印章、组织成员等资源的管理权限</font><font style="color:#DF2A3F;">、授权允许代表企业/组织用户发起合同签署）</font>

:::



## <font style="color:rgb(64, 64, 64);">印章跨企业授权流程</font>
![](https://cdn.nlark.com/yuque/0/2022/png/447795/1670807854618-51436a50-a8a5-43e0-a498-370d32152a1c.png)

[**点击查看下载 《电子印章跨企业委托使用授权书模板》**](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/跨企业印章授权书模板.pdf)

# <font style="color:rgb(64, 64, 64);">效果展示</font>
## 接口获取的授权链接中的<font style="color:black;">授权书</font>效果展示：
<font style="color:rgb(0, 0, 0);">授权书签署页上需</font><font style="color:#DF2A3F;">同时</font><font style="color:rgb(0, 0, 0);">加</font>盖委托单位法定代表人或e签宝账号管理员的**<font style="color:rgb(0, 0, 0);">个人印章</font>**<font style="color:rgb(0, 0, 0);">和</font>**<font style="color:rgb(0, 0, 0);">企业公章</font>**<font style="color:rgb(0, 0, 0);">来签署</font><font style="color:rgb(232, 50, 60);">《电子印章跨企业委托使用授权书》</font>：**<font style="color:black;"></font>**

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1670833371785-d512adab-b7e7-4d15-92f4-e88058632f64.png)

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1670825683394-f2eeec0e-7033-4f2d-b281-bb3f65268ff6.png)![](https://cdn.nlark.com/yuque/0/2022/png/447795/1670825725427-7835b032-bee0-4612-aac2-fd69c4d99ac1.png)

# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [获取机构认证&授权页面链接 ](https://open.esign.cn/doc/opendoc/auth3/kcbdu7) | 此接口用来获取企业机构用户的授权链接，发起成功后会返回认证授权流程标识：**authFlowId**。（权限范围必须包含：**manage_org_seal**、**org_initiate_sign**） | **<font style="color:#E8323C;">必需</font>** |
| [查询机构认证信息](https://open.esign.cn/doc/opendoc/auth3/xxz4tc) | <font style="color:rgb(64, 64, 64);">该接口可用于</font>查询委托机构（授权方）的机构账号ID：**orgId。** | **<font style="color:#8C8C8C;">按需</font>** |
| [查询企业成员列表](https://open.esign.cn/doc/opendoc/employee/bzrzic) | <font style="color:rgb(64, 64, 64);">该接口可用于</font>查询委托机构（授权方）的法定代表人或企业管理员个人账号ID：**psnId**。 | **<font style="color:#8C8C8C;">按需</font>** |
| [查询企业内部印章](https://open.esign.cn/doc/opendoc/seal3/ups6h1) | <font style="color:rgb(64, 64, 64);">该接口可用于</font>查询 orgId （机构企业）名下自身创建的内部自有企业印章ID：**sealId**。 | **<font style="color:#8C8C8C;">按需</font>** |
| [跨企业授权](https://open.esign.cn/doc/opendoc/seal3/qkxyha) | <font style="color:rgb(64, 64, 64);">该接口用于获取跨企业授权书的签署链接，由企业法定代表人/企业管理员进行签署授权。建议开发者保存授权业务流程编号：</font>**<font style="color:rgb(64, 64, 64);">sealAuthBizId</font>**<font style="color:rgb(64, 64, 64);">。</font> | **<font style="color:rgb(232, 50, 60);">必需</font>** |
| [查询授权书签署链接](https://open.esign.cn/doc/opendoc/seal3/dszm8d) | <font style="color:rgb(64, 64, 64);">当原授权书的签署链接未保存或者失效、未签署等情况，可通过该接口重新获取印章授权书的签署链接。</font> | **<font style="color:#8C8C8C;">按需</font>** |
| [查询对外部企业授权详情](https://open.esign.cn/doc/opendoc/seal3/ngvb5p) | <font style="color:rgb(64, 64, 64);">该接口用于查询对外部企业的印章授权的授权状态等相关信息。</font> | **<font style="color:#8C8C8C;">按需</font>** |
| [解除印章授权](https://open.esign.cn/doc/opendoc/seal3/sgx0am) | <font style="color:rgb(64, 64, 64);">该接口用于解除机构印章的授权。</font> | **<font style="color:#8C8C8C;">按需</font>** |
| [修改印章授权期限](https://open.esign.cn/doc/opendoc/seal3/giha96) | <font style="color:rgb(64, 64, 64);">可基于</font>[跨企业授权](https://open.esign.cn/doc/opendoc/seal3/qkxyha)<font style="color:rgb(64, 64, 64);">时返回的授权业务流程编号，重新修改印章授权的有效期限。</font> | **<font style="color:#8C8C8C;">按需</font>** |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">签署时必需</font>** |


## 1. 印章跨企业授权
:::warning
+ 点击查看接口文档[【跨企业授权】](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/qkxyha)

（1）指定企业印章编号、被授权机构（受托单位）的信息（企业名称、统一社会信用代码），并设置印授权有效期限（最长不可超过3年），获取到授权书的签署链接和本次授权的业务流程编号，开发者注意此时保存返回的业务流程编号，可用于后续解除授权、查询授权等相关接口操作。

+ <font style="color:#E8323C;">【注】</font>目前受托机构建议设置为调用应用AppId所属企业。

（2）委托机构的企业管理员/法定代表人访问授权书的签署链接，完成签署<font style="color:#E8323C;">《电子印章跨企业委托使用授权书》</font>并进行意愿认证，表示印章授权成功。同时被授权机构管理员将收到e签宝发送的短信通知，开发者可接收回调：[印章授权书签署完成通知](https://qianxiaoxia.yuque.com/opendoc/notify3/cxx87o)<font style="color:#E8323C;">（签署完授权书时触发）</font>和 [印章授权生效通知](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/cwpqgv)<font style="color:#E8323C;">（指定的印章授权生效时间开始时触发）</font>。

（3）通过API接口进行授权管控：

+ 作为委托方机构，支持[【查询对外部企业授权详情】](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/ngvb5p)、[【修改印章授权期限】](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/giha96)、[【解除印章授权】](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/sgx0am)。
+ 作为受托方机构（应用AppId所属企业），支持[【查询被外部企业授权印章】](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/czrua1)。

:::

## 2. 企业静默/自动签署
:::warning
+ 点击查看接口文档[【基于文件发起签署】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/su5g42)

【场景】使用委托方机构的印章进行静默签署

<font style="color:#E8323C;">【注】  签署方（signers）参数在设置时需注意：</font>`signerType`需设置为 1（机构），机构信息（orgSignerInfo）不需要传入（后台会默认取appId所属主体企业盖章）<font style="color:rgb(64, 64, 64);">，</font>自动签章参数`autosign`设置为true，`assignedSealId`设置被授权的印章ID。

:::

## 跨企业授权接口代码案例
### 相关参数   
**点击查看接口文档**[**【跨企业授权】**](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/qkxyha)

+ <font style="color:#DF2A3F;">orgId</font>（委托方机构账号ID，企业印章的拥有者）：传入委托印章授权企业的e签宝账号ID，印章对应的企业主体。
+ <font style="color:#DF2A3F;">transactorPsnId</font>（委托方授权操作人账号ID）：直接传入委托方企业管理员或法定代表人的e签宝账号ID。
+ <font style="color:#DF2A3F;">sealId</font>（授权印章ID）：传入授权印章的ID，可通过[【查询企业内部印章】](https://open.esign.cn/doc/opendoc/seal3/ups6h1)获取，或者登录e签宝官网获取（企业印章编号）。
+ <font style="color:#DF2A3F;">authorizedOrgInfo</font>（被授权的受托方机构信息）：传入被授权的企业名称和证件号（一般是平台方自身）。

### 代码案例
```json
{
    "orgId": "3c4047c******79134e7",
    "sealId": "f3a5504f-****-****-****-03594010",
    "transactorPsnId": "7ffcaed8******ef0a8f6",
    "authorizedOrgInfo": {
        "orgName": "XXXX企业",
        "orgIDCardNum": "911******493"
    },
    "effectiveTime": "1669084637000",
    "expireTime": "1697942237000",
    "redirectUrl": "https://esign.cn"
}
```

## 企业自动盖章代码案例
### 相关参数   
**点击查看接口文档**[**【基于文件发起签署】**](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/su5g42)

+ <font style="color:#E8323C;">assignedSealId</font><font style="color:rgb(63, 63, 63);">（指定印章ID）设置：被授权的印章ID值。</font>
+ <font style="color:#DF2A3F;">autoSign </font><font style="color:rgb(64, 64, 64);">设置为</font>：true （后台自动签<font style="color:rgb(64, 64, 64);">署）。</font>
+ <font style="color:#DF2A3F;">signerType </font><font style="color:rgb(64, 64, 64);">设置为</font>：1（机构）<font style="color:rgb(64, 64, 64);">。</font>
+ <font style="color:#DF2A3F;">orgSignerInfo</font><font style="color:rgb(64, 64, 64);">（机构签署方信息）</font><font style="color:#DF2A3F;">自动签署场景，不传此对象，e签宝后台会取默认值。</font>

### 代码案例
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

<font style="color:rgb(38, 38, 38);">  
</font>



