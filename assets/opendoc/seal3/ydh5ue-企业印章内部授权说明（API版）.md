### 印章授权目的
为保障签署合规、安全，规避企业印章盗用签署风险，根据企业日常用印管理，设置企业内部成员用印权限以满足企业用印流程、审批需求。

### 印章授权方式
**<font style="color:#52C41A;">对企业内部成员授权</font>****  **

实现企业用印流程数字化管理，帮助企业通过印章权限角色分配、用印审批流程方式，使内部用印权限更加透明，高效便捷完成签署，省去线下用印繁琐步骤。

:::danger
**<font style="color:#F5222D;">  </font>****<font style="color:#F5222D;">印章角色介绍</font>**<font style="color:#F5222D;"> </font> 按企业内部印章权限（大 >> 小）划分：

+ **印章管理员：**印章相关权限中最大的角色，默认为企业的法定代表人以及设定的企业管理员角色，可以创建、编辑、删除企业章，同时拥有印章审批权限、使用权限、印章角色分配权限。
+ **印章审批员****（SEAL_EXAMINER）****：**拥有印章审批权限、使用权限，负责企业日常的用印管理，企业印章的签署场景，用印均会触发用印审批流程，印章审批员则可通过线上审批流程，选择是否同意企业某成员使用此印章签署文件。
+ **印章使用员****（SEAL_USER）****：**印章管理员将企业印章使用权限分配给企业成员，并且可根据实际业务需求，设置可使用的合同模板范围。印章使用员在日常的签署场景中则可直接授权签署文件，无需经过用印审批。
+ **普通成员：**在签署场景中需要使用企业章时提出[用印审批](https://open.esign.cn/doc/opendoc/helper/qi453w)申请。（确保企业印章权限规范化管理，企业用印审批流程默认开启，其他特殊情况请线下联系e签宝工作人员评估处理）

<font style="color:#F5222D;">注：API接口</font>[【内部成员授权】](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/fu6ov5)<font style="color:#F5222D;">支持设置印章审批员</font><font style="color:#F5222D;">（SEAL_EXAMINER）</font><font style="color:#F5222D;">、印章使用员</font><font style="color:#F5222D;">（SEAL_USER）两</font><font style="color:#F5222D;">种角色。</font>

:::

### 授权内部成员流程
![](https://cdn.nlark.com/yuque/0/2022/png/21775387/1660125287509-52e7013b-4c39-4d77-bd8e-7c39377b1ff4.png)

### API调用须知 
#### 1. 印章内部授权
:::warning
+ 点击查看接口文档[【内部成员授权】](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/fu6ov5)

（1）指定企业印章编号、被授权人员的账号信息（每次授权可授权多个企业成员、或全部企业成员），并设置印章角色，授权印章的使用范围（指定合同模板或不限）、授权有效期限（最长不可超过3年），获取到授权书的签署链接和本次授权的业务流程编号，开发者注意此时保存返回的业务流程编号，可用于后续解除授权、查询授权等相关接口操作。

（2）企业管理员/法定代表人访问授权书的签署链接，完成签署《电子印章授权书》表示印章授权成功，同时被授权成员将收到e签宝发送的短信通知，开发者也可同时接收到[授权生效信息回调](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/cwpqgv)通知。

+ 被授权企业成员确保已加入到印章所属组织下，点击前往[【添加企业成员API】](https://qianxiaoxia.yuque.com/books/share/5f5d0c9f-0af8-4ded-b32c-cae4086a587c/has759)。
+ 其他可搭配使用接口：[【查询对内授权详情】](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/totfte)、[【查询授权书签署链接】](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/dszm8d)、[【修改印章授权期限】、【解除印章授权】](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/giha96)

:::

#### 2. 指定印章进行签署
:::warning
+ 点击查看接口文档[【基于文件发起签署】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/su5g42)

【场景】企业成员使用授权印章签署文件

<font style="color:#F5222D;">【注】</font>签署方 `signerType`需设置为 1（机构），经办人`psnId`设置为被授权的成员账号ID，自动签章`autosign`设置为false，自由模式`freeMode`设置为false，`assignedSealId`设置被授权的印章ID。

:::

### 附：《电子签章授权书》签约操作指引
[点击前往](https://open.esign.cn/doc/opendoc/seal3/akg1s3)查看《电子签章授权书》签约操作指引。

