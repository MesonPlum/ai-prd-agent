:::warning
**<font style="color:#DF2A3F;">重要提示：自2024年9月12日起，仅e签宝高级版和生态伙伴版本支持指定非应用ID所属企业作为机构发起方，仅e签宝生态伙伴版本支持指定个人发起方。</font>**

:::

# 基础介绍
发起方：指在平台中发起合同签约的一方，合同的归属方，有权限查看签署的文件，签署通知中展示：**“XXX 通知您签署... ”**中的**XXX**即为发起方名字。（一般发起方都为企业主体，个人较少）

当发起合同签署时，默认是由平台方发起，如需指定其他的发起方，需要参考此流程。

:::warning
**<font style="color:#E8323C;">注：</font>**

（1）**<font style="color:#DF2A3F;">e签宝生态版本 </font>**需先经过[【用户授权】](https://qianxiaoxia.yuque.com/opendoc/case3/vvwxvh9gtdl30y3w)（代企业和经办人用户发起合同签署权限）/（代个人用户发起合同签署权限）；

（2）**<font style="color:#DF2A3F;">e签宝宝高级版 </font>**需经过e签宝官网的[【关联企业】](https://help.esign.cn/detail?id=kgkucwnnk6whzv82&nameSpace=cs3-dept%2Fexboae)开通（仅支持企业发起方）。

:::

# 效果展示
## 短信通知中的发起方效果
![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668394270911-390fe1fb-45b9-43f2-9cf3-b9563b21dba9.png)

## e签宝SaaS官网的发起方效果
![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668398462893-5a0b8442-5c78-4e93-b448-1b5e70201680.png)

# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [获取机构认证&授权页面链接](https://open.esign.cn/doc/opendoc/auth3/kcbdu7) | 此接口用来给机构进行授权认证，授权允许平台代表机构用户发起合同签署权限 | **<font style="color:#8C8C8C;">按需</font>**<br/>**<font style="color:#E8323C;">（需要指定机构发起方的e签宝生态伙伴版本需要）</font>** |
| [查询机构认证信息](https://open.esign.cn/doc/opendoc/auth3/xxz4tc) | 此接口可以通过组织机构名称查询到机构的e签宝账号ID以及其他实名信息。 | **<font style="color:#8C8C8C;">按需</font>** |
| [获取个人认证&授权页面链接](https://open.esign.cn/doc/opendoc/auth3/rx8igf) | 此接口用来给个人进行授权认证，授权允许平台代表个人用户发起合同签署权限 | **<font style="color:#8C8C8C;">按需</font>** |
| [查询个人认证信息](https://open.esign.cn/doc/opendoc/auth3/vssvtu) | 此接口可以通过手机号/邮箱查询到个人的e签宝账号ID以及其他实名信息。 | **<font style="color:#8C8C8C;">按需</font>** |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | <font style="color:rgb(64, 64, 64);">此接口获取签署方签署页面链接，可用于签署或预览。</font> | **<font style="color:rgb(140, 140, 140);">按需</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
### 相关参数   
+ <font style="color:#E8323C;">signFlowInitiator</font>（签署流程的发起方）

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1727070775297-d4b8ad42-4b1f-4873-a763-40e24ebe10fc.png)

机构账号ID和个人账号ID可由授权后查询或者回调通知中获取。

#### 指定机构发起方
+ <font style="color:#E8323C;">orgInitiator</font>（机构发起方信息）中传入发起方机构的 <font style="color:#E8323C;">orgId</font> 和经办人信息 <font style="color:#E8323C;">psnId</font>（transactor对象下）。
+ <font style="color:#E8323C;">psnInitiator </font>（个人发起方信息）<font style="color:rgb(64, 64, 64);">不要传。</font>

```json
"signFlowInitiator": {
		"orgInitiator": {
			"orgId": "当前发起方机构的e签宝账号ID值",
			"transactor": {
				"psnId": "当前发起方机构的经办人e签宝账号ID值"
			}
		}
	}
```

#### 指定个人发起方
+ <font style="color:#E8323C;">psnInitiator </font>（个人发起方信息）传入 <font style="color:#E8323C;">psnId</font>。

```json
 "signFlowInitiator": {
        "psnInitiator": {
            "psnId": "当前发起方个人的e签宝账号ID值"
        }
    }
```



