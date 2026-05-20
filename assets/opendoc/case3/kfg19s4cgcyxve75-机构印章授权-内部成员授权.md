# 基础介绍
**<font style="color:rgb(64, 64, 64);">机构：</font>**<font style="color:rgb(64, 64, 64);">组织机构是企业、事业单位、机关、社会团体及其他依法成立单位的统称。</font>

 为<font style="color:rgb(64, 64, 64);">实现机构用印流程数字化管理，使内部用印权限更加透明，高效便捷完成签署，并保障签署合规、安全，规避机构印章盗用签署风险，e签宝可根据机构日常用印管理，帮助机构设置内部成员用印权限以满足内部用印流程、审批需求。</font>

<font style="color:rgb(64, 64, 64);">本文主要介绍e签宝接口集成机构的内部成员授权流程。e签宝的印章权限角色分为以下几种：</font>

:::info
**<font style="color:rgb(245, 34, 45);">印章角色介绍</font>**<font style="color:rgb(245, 34, 45);"> </font>**<font style="color:rgb(38, 38, 38);">按机构内部印章权限（大 -> 小）划分：</font>**

+ **<font style="color:rgb(38, 38, 38);">印章管理员：</font>**<font style="color:rgb(38, 38, 38);">印章相关权限中最大的角色，默认为机构的法定代表人以及设定的机构管理员角色，可以创建、编辑、删除机构章，同时拥有印章审批权限、使用权限、印章角色分配权限。</font><font style="color:#DF2A3F;">（帮助机构做实名的经办人会默认变成该机构的印章管理员）</font>
+ **<font style="color:rgb(38, 38, 38);">印章审批员：</font>**<font style="color:rgb(38, 38, 38);">拥有使用印章兼印章审批权限，除印章使用员之外的员工申请使用机构印章，需要经过印章审批员的审批，选择是否同意使用此印章签署文件。</font>
+ **<font style="color:rgb(38, 38, 38);">印章使用员：</font>**<font style="color:rgb(38, 38, 38);">印章管理员将机构印章使用权限分配给机构成员。印章使用员在日常的签署场景中则可直接授权签署文件，无需经过用印审批。</font>
+ **<font style="color:rgb(38, 38, 38);">普通成员：</font>**<font style="color:rgb(38, 38, 38);">在签署场景中需要使用机构印章时需要提出</font>[用印审批](https://open.esign.cn/doc/opendoc/helper/qi453w)<font style="color:rgb(38, 38, 38);">申请。</font>
+ <font style="color:#DF2A3F;">注：API接口支持设置印章审批员、印章使用员两种角色。印章审批员的权限大于印章使用员。</font>

:::

:::warning
<font style="color:#DF2A3F;">注：平台方如果想要给机构用户内部成员授权印章，需要提前给机构</font><font style="color:#E8323C;"> </font>[用户授权](https://qianxiaoxia.yuque.com/opendoc/case3/vvwxvh9gtdl30y3w)<font style="color:#E8323C;">（授权允许获取企业/组织用户的印章、组织成员等资源的管理权限</font><font style="color:#DF2A3F;">、授权允许代表企业/组织用户发起合同签署）</font>

:::

## <font style="color:rgb(64, 64, 64);">印章授权内部成员流程</font>
![](https://cdn.nlark.com/yuque/0/2022/png/21775387/1660125287509-52e7013b-4c39-4d77-bd8e-7c39377b1ff4.png)

# <font style="color:rgb(64, 64, 64);">效果展示</font>
## 接口获取的授权链接中的<font style="color:black;">授权书</font>效果展示：
<font style="color:rgb(0, 0, 0);">授权书签署页上需</font><font style="color:#DF2A3F;">同时</font><font style="color:rgb(0, 0, 0);">加</font>盖机构法定代表人或机构管理员的**<font style="color:rgb(0, 0, 0);">个人印章</font>**<font style="color:rgb(0, 0, 0);">和</font>**<font style="color:rgb(0, 0, 0);">机构公章</font>**<font style="color:rgb(0, 0, 0);">来签署</font>《电子签章授权书》：**<font style="color:black;">  
</font>**

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1670556478013-c5f03e27-66a1-4f88-a602-a55de54ca59f.png)

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1670576815909-1af87ac8-d9f6-4807-a148-d5f9facb36ee.png)

<font style="color:#DF2A3F;">注：如果机构管理员有做过变更，旧管理员进行的印章使用员/印章审批员授权状态会变成失效，需要新管理员重新进行授权。</font>

# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [获取机构认证&授权页面链接 ](https://open.esign.cn/doc/opendoc/auth3/kcbdu7) | 此接口用来获取企业机构用户的授权链接，发起成功后会返回认证授权流程标识：**authFlowId**。（权限范围必须包含：**manage_org_resource**、**org_initiate_sign**） | **<font style="color:#E8323C;">必需</font>** |
| [内部成员授权](https://open.esign.cn/doc/opendoc/seal3/fu6ov5) | <font style="color:rgb(64, 64, 64);">该接口用于获取内部成员授权书的签署链接，由企业法定代表人/企业管理员进行签署授权。建议开发者保存授权业务流程编号。</font> | **<font style="color:rgb(232, 50, 60);">必需</font>** |
| [查询授权书签署链接](https://open.esign.cn/doc/opendoc/seal3/dszm8d) | <font style="color:rgb(64, 64, 64);">当原授权书的签署链接未保存或者失效、未签署等情况，可通过该接口重新获取印章授权书的签署链接。</font> | **<font style="color:#8C8C8C;">按需</font>** |
| [查询对内部成员授权详情](https://open.esign.cn/doc/opendoc/seal3/totfte) | <font style="color:rgb(64, 64, 64);">该接口用于查询企业内部的印章授权的授权状态等相关信息。</font> | **<font style="color:#8C8C8C;">按需</font>** |
| [解除印章授权](https://open.esign.cn/doc/opendoc/seal3/sgx0am) | <font style="color:rgb(64, 64, 64);">该接口用于解除机构印章的授权。</font> | **<font style="color:#8C8C8C;">按需</font>** |
| [修改印章授权期限](https://open.esign.cn/doc/opendoc/seal3/giha96) | <font style="color:rgb(64, 64, 64);">可基于</font>[内部成员授权](https://open.esign.cn/doc/opendoc/seal3/fu6ov5)<font style="color:rgb(64, 64, 64);">时返回的授权业务流程编号，重新修改印章授权的有效期限。</font> | **<font style="color:#8C8C8C;">按需</font>** |


## 内部成员授权接口代码案例
<font style="color:rgb(0, 0, 0);">被授权的成员须确保已加入到印章所属企业组织下，</font><font style="color:rgb(38, 38, 38);">通过</font>[【企业成员服务API】](https://open.esign.cn/doc/opendoc/employee/has759)<font style="color:rgb(0, 0, 0);">添加管理企业成员。</font>

### 相关参数   
+ <font style="color:#DF2A3F;">sealId</font>（授权印章ID）：传入授权印章的ID，可通过[【查询企业内部印章】](https://open.esign.cn/doc/opendoc/seal3/ups6h1)获取，或者登录e签宝官网获取（企业印章编号）。
+ <font style="color:#DF2A3F;">authorizedPsnIds</font>（被授权成员（账号ID或ALL））：传入被授权企业成员的e签宝账号ID（一般不会授权ALL-全部成员，授权全部成员必须指定合同模板范围，对接口发起签署无效）。
+ <font style="color:#DF2A3F;">transactorPsnId</font>（授权操作人账号ID）：一般直接传入企业管理员或法定代表人的e签宝账号ID。
+ <font style="color:#DF2A3F;">sealRole</font>（指定印章角色）：**SEAL_USER** - 印章使用员（印章使用权限）；**SEAL_EXAMINER** - 印章审批员（印章使用权限+用印审批权限）。
+ <font style="color:#DF2A3F;">sealAuthScope</font>（授权印章使用范围）：一般templateIds（模板编号或ALL）直接传入ALL-全部模板，指定模板编号不会带到接口发起的签署中，只对e签宝官网的流程生效。

### 代码案例
```json
{
    "orgId": "3c4047cc3****0279134e7",
    "sealId": "f3a5504*****318f8594010",
    "authorizedPsnIds": [
        "50d5ed*****4100b1bd29c"
    ],
    "sealRole": "SEAL_USER",
    "transactorPsnId": "626629f******299f1d8c1d",
    "sealAuthScope": {
        "templateIds": [
            "ALL"
        ]
    },
    "effectiveTime": "1670237490000",
    "expireTime": "1701773490000",
    "redirectUrl": "https://esign.cn"
}
```





