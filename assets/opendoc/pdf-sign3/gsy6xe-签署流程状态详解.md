## 签署流程状态示意图
![](https://cdn.nlark.com/yuque/0/2022/jpeg/21775387/1659349099969-ecc3e085-c6e5-40bd-b0b2-23adb99ec2ee.jpeg)

## 签署流程状态说明
#### 流程状态的参数说明
+ 建议调用[【查询签署流程详情】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/xxk4q6)接口，查询流程的状态。

| **状态（****signFlowStatus****）** | 草稿 | 签署中 | 完成 | 撤销 | 过期 | 拒签 |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **对应值** | 0 | 1 | 2 | 3 | 5 | 7 |


#### <font style="color:#F5222D;">【草稿】</font>**signFlowStatus=**0
:::danger
流程的初始状态，进入草稿状态依据[【基于文件发起签署】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/su5g42)时设置的自动开启参数`<font style="color:rgb(64, 64, 64);">autoStart</font>`<font style="color:rgb(64, 64, 64);">：</font>

（1）自动开启参数`<font style="color:rgb(64, 64, 64);">autoStart</font>`<font style="color:#E8323C;">（默认值true）</font><font style="color:rgb(64, 64, 64);">，传入了true，则流程将直接进入</font>**<font style="color:rgb(64, 64, 64);">“签署中”</font>**<font style="color:rgb(64, 64, 64);">状态；</font>

<font style="color:rgb(64, 64, 64);">（2）</font>自动开启参数`<font style="color:rgb(64, 64, 64);">autoStart</font>`<font style="color:rgb(64, 64, 64);">，传入了false，此时流程为</font>**<font style="color:rgb(64, 64, 64);">“草稿”</font>**<font style="color:rgb(64, 64, 64);">状态。</font>

`<font style="color:rgb(64, 64, 64);">autoStart</font>`<font style="color:rgb(64, 64, 64);">设置为false，适用于发起签署流程时相关需求不明确的场景，允许开发者继续向流程中添加签署文件、签署方等，</font>**<font style="color:rgb(64, 64, 64);">草稿</font>**<font style="color:rgb(64, 64, 64);">状态下允许调用以下接口来添加流程内容：</font>

+ 添加或删除流程中的文件：[【追加待签文件】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/fuuzv5)、[【删除待签署文件】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/pvs0cm)、[【追加附属材料】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/huo44q)、[【删除附属材料】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/wvvyv8)
+ 添加或删除签署方（区）：[【追加签署区】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/ohzup7)、[【删除签署区】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/bd27ph)
+ 添加或删除抄送方：[【添加抄送方】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/pkicgm)、[【删除抄送方】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/bdn9yt)

<font style="color:#F5222D;">【注】确认添加完毕之后，务必调用</font>[【开启签署流程】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/pu4xsx)<font style="color:#F5222D;">接口，开启流程进入下一个状态“签署中”。</font>

:::

#### <font style="color:#F5222D;">【签署中】</font>**signFlowStatus=**1
:::danger
流程开始按既定配置项流转，**“签署中”**允许调用以下接口：

+ 获取单笔流程的签署链接：[【获取合同文件签署链接】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/pvfkwd)
+ 获取多笔流程的批量签署链接：[【获取批量签页面链接（多流程）】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/sq4xxq)
+ 向签署人发送催签提醒：[【催签流程中签署人】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/yws940)
+ 添加或删除签署方（区）：[【追加签署区】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/ohzup7)（仅限非自动完结的流程`autoFinish`=false）、[【删除签署区】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/bd27ph)（未签署状态下允许删除）
+ 添加流程中的附件：[【追加附属材料】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/huo44q)
+ 添加或删除抄送方：[【添加抄送方】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/pkicgm)（仅限非自动完结的流程`autoFinish`=false）、[【删除抄送方】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/bdn9yt)
+ 修改流程的截止时间：[【延长签署截止时间】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/idv0fv)
+ 撤销已发起的流程：[【撤销签署流程】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/klbicu)

:::

#### <font style="color:#F5222D;">【已完成】</font>**signFlowStatus=** 2
:::danger
当流程中设置的签署方全部完成了签署，依据[【基于文件发起签署】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/su5g42)时设置的自动完结参数`autoFinish`：

（1）自动完结参数`autoFinish`，传入了true，全部完成签署后流程自动进入**“已完成”**状态；

（2）自动完结参数`autoFinish`<font style="color:#E8323C;">（默认值false）</font>，传入了false，务必调用[【完结签署流程】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/ynwqsm)，流程状态才会变更为**“已完成”**。

+ 仅限**“已完成”**状态下，下载流程中的相关文件：[【下载已签署文件及附属材料】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/kczf8g)。

:::

#### 【撤销】**signFlowStatus=** 3
“签署中”的流程，调用[【撤销签署流程】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/klbicu)接口成功后触发，流程将变更为**“撤销”**状态，所有的签署均失效。

#### 【过期】**signFlowStatus=** 5
“签署中”的流程，如果超过了流程设置的截止时间，流程将自动变更为**“过期”**状态。

#### 【拒签】**signFlowStatus=** 7
当流程中的任一签署方拒绝签署文件后，流程将直接变更为**“拒签”**状态。

 

