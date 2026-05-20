:::warning
**<font style="color:#DF2A3F;">重要提示：自2024年9月12日起，跨企业印章授权自动签署功能需要购买e签宝高级版或生态伙伴版本方可支持！</font>**

:::

### 印章跨企业授权介绍
在企业的日<font style="color:rgb(18, 18, 18);">常经营管理活动中，当某企业将印章授权给另一企业来实现在合同中自动落章签署时，即需要“印章授权”。印章授权操作可</font>规范管理企业印章的使用，<font style="color:rgb(18, 18, 18);">杜绝印章乱盖潜在的法律风险，以达到管控跨企业用印行为，进一步解决用印效率问题等。</font>  
**适用于合作企业、集团分子公司之间实现印章跨企业自动落章签署，其特点如下：**

+ 一次授权，有效期内均可使用；
+ 静默签署，提高用印效率。

:::danger
<font style="color:#F5222D;">【注意】</font><font style="color:#000000;">跨企业印章签署的文件所展示的对应签名信息，印章样式和数字证书均为授权企业（委托单位）所有。</font>

:::

#### 印章跨企业授权流程
![](https://cdn.nlark.com/yuque/0/2022/png/21775387/1660201495706-e82d6638-a8a3-4f7c-a650-9bc94384fd14.png)

### API调用须知 
#### 1. 印章跨企业授权
:::warning
+ 点击查看接口文档[【跨企业授权】](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/qkxyha)

（1）指定企业印章编号、被授权机构（受托单位）的信息（企业名称、统一社会信用代码），并设置印授权有效期限（最长不可超过3年），获取到授权书的签署链接和本次授权的业务流程编号，开发者注意此时保存返回的业务流程编号，可用于后续解除授权、查询授权等相关接口操作。

+ <font style="color:#E8323C;">【注】</font>目前受托机构建议设置为调用应用AppId所属企业。

（2）委托机构的企业管理员/法定代表人访问授权书的签署链接，完成签署<font style="color:#E8323C;">《电子印章跨企业委托使用授权书》</font>并进行意愿认证，表示印章授权成功。同时被授权机构管理员将收到e签宝发送的短信通知，开发者可接收回调：[印章授权书签署完成通知](https://qianxiaoxia.yuque.com/opendoc/notify3/cxx87o)<font style="color:#E8323C;">（签署完授权书时触发）</font>和 [印章授权生效通知](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/cwpqgv)<font style="color:#E8323C;">（指定的印章授权生效时间开始时触发）</font>。

（3）通过API接口进行授权管控：

+ 作为委托方机构，支持[【查询对外部企业授权详情】](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/ngvb5p)、[【修改印章授权期限】](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/giha96)、[【解除印章授权】](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/sgx0am)。
+ 作为受托方机构（应用AppId所属企业），支持[【查询被外部企业授权印章】](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/czrua1)。

:::

#### 2. 静默签署
:::warning
+ 点击查看接口文档[【基于文件发起签署】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/su5g42)

【场景】使用委托方机构的印章进行静默签署

<font style="color:#E8323C;">【注】  签署方（signers）参数在设置时需注意：</font>`signerType`需设置为 1（机构），机构信息（orgSignerInfo）不需要传入（后台会默认取appId所属主体企业盖章）<font style="color:rgb(64, 64, 64);">，</font>自动签章参数`autosign`设置为true，`assignedSealId`设置被授权的印章ID。

:::

### 附：《电子印章跨企业委托使用授权书》签约操作指引
[点击前往](https://open.esign.cn/doc/opendoc/seal3/akg1s3)查看《电子印章跨企业委托使用授权书》签约操作指引。

