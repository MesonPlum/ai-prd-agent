## 基础介绍
<font style="color:rgb(15, 17, 21);">当指定签署人无法亲自完成签署时，可将合同转交给他人代签。</font>

:::info
**<font style="color:rgb(15, 17, 21);">适用场景：</font>**

+ <font style="color:rgb(15, 17, 21);">签署人已离职或暂无企业用印权限</font><font style="color:#DF2A3F;">（常见）</font>
+ <font style="color:rgb(15, 17, 21);">签署人出差/休假，无法及时处理</font>
+ <font style="color:rgb(15, 17, 21);">需委托家人、同事或管理员代为签署</font>

**<font style="color:rgb(15, 17, 21);">使用流程：</font>**

**<font style="color:rgb(15, 17, 21);">1、发起转交</font>**<font style="color:rgb(15, 17, 21);">：原签署人在收到合同后，通过转交功能将合同转给代签人</font>

**<font style="color:rgb(15, 17, 21);">2、代签人签署</font>**<font style="color:rgb(15, 17, 21);">：被转交人收到通知后，代表原签署方完成签署</font>

**<font style="color:rgb(15, 17, 21);">3、流程推进</font>**<font style="color:rgb(15, 17, 21);">：签署完成后，原合同流程继续推进</font>

:::

:::warning
**<font style="color:#DF2A3F;">注意事项：</font>**

+ <font style="color:rgb(15, 17, 21);">被转交人应具备代表原签署方签署的资格或权限</font>
+ <font style="color:rgb(15, 17, 21);">建议双方提前沟通确认转交事宜</font>
+ <font style="color:rgb(15, 17, 21);">转交后原签署人不再参与该合同签署环节</font>

:::

## 效果展示
### PC端效果
签署页中点击右上角的“转交”按钮（默认不显示，需按下文[配置方式](#s0Qcr)配置后才有）：

![](https://cdn.nlark.com/yuque/0/2025/png/46102066/1756614227382-62792da1-a674-4137-9ede-15c15b93b5ce.png)

需要当前签署方输入要转交人的姓名和账号：

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1764744577855-eb18d016-bc87-48f9-8bb4-0aab336075e5.png)

转交人收到新的签署通知：

![](https://cdn.nlark.com/yuque/0/2025/png/46102066/1756614655585-16b7c964-d282-4cb8-abf2-ac71c81bb577.png)

### H5端效果
![](https://cdn.nlark.com/yuque/0/2025/png/46102066/1756614888570-b11fe5d4-2810-4961-933f-27abf1062f4d.png)![](https://cdn.nlark.com/yuque/0/2025/png/46102066/1756615138785-e9eac619-f930-407c-9b98-60e3bf492ca7.png)

## 配置方式
1.登录e签宝[开发者控制台](https://open.esign.cn/my-apps/home)中，页面确认进入对应企业空间下-左侧进入【应用管理】-【我的应用】；

2.找到需要配置的应用ID，点击【配置】；

![](https://cdn.nlark.com/yuque/0/2025/png/46341124/1756724479364-7f3357cc-e877-416c-a901-19f851f7cb97.png)

3.点击页面的【参数配置】-【签署服务】，找到【是否显示手动转交按钮】选择“显示转交按钮”，即可在签署页面内展示“转交”按钮。

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1764743761146-626d321f-d6ac-4d69-95a7-03c73a91fce4.png)



## 官网自动转交功能介绍（接口与官网效果一致）
除上述个人在签署页面手动转交功能之外，e签宝官网的企业管理中也支持针对自身企业的经办人设置自动转交。

### 配置方式如下：
进入e签宝官网的自身企业空间下：【合同偏好设置】中搜索“转交”，有三个不同情形可以针对自身需求设置，设置完成之后，合同发起符合对应情形时，会自动转交给偏好里面设置的合同接收人。

![](https://cdn.nlark.com/yuque/0/2025/png/46102066/1756621766538-7a32fd3a-782a-4df8-8438-1324e05c4da0.png)

:::warning
<font style="color:#DF2A3F;">注意区分所属的环境地址：</font><font style="color:#000000;">  
</font><font style="color:#000000;">1、线上正式环境-e签宝官网地址：</font>[https://web.esign.cn/workspace/home](https://web.esign.cn/workspace/home)

<font style="color:#000000;">2、模拟沙箱环境-e签宝模拟官网地址：</font>[https://smlfront.esign.cn:8880/workspace/home](https://smlfront.esign.cn:8880/workspace/home)

:::

#### 1、合同偏好设置里面选择第一个：“<font style="color:rgb(51, 51, 51);">未指定经办人合同自动转交</font>”对应的效果图
![](https://cdn.nlark.com/yuque/0/2025/png/46102066/1756623706420-2ae3160b-5e7f-4f56-b3fd-d6153e170f60.png)

:::warning
**<font style="color:#DF2A3F;">注意：这里如果是接口发起的签署，默认企业经办人是必须指定的，如需不指定，请联系e签宝技术人员配置后才可使用。</font>**

:::

![](https://cdn.nlark.com/yuque/0/2025/png/46102066/1756623535480-8b9845c6-8905-4141-953c-a22092ef29fc.png)

![](https://cdn.nlark.com/yuque/0/2025/png/46102066/1756623541721-e73fa153-3f12-4dce-adf4-708ee07f76e5.png)

（若是接口发起的签署，会自动转给转交人进行通知签署）

![](https://cdn.nlark.com/yuque/0/2025/png/46102066/1756622924124-807ac65c-7250-4a90-addc-aa5cc092beb7.png)

#### 2、合同偏好设置里面选择第二个：“<font style="color:rgb(51, 51, 51);">非企业成员的合同自动转交</font>”对应的效果图
![](https://cdn.nlark.com/yuque/0/2025/png/46102066/1756623684779-ad426050-d59a-4ef1-9223-583b9737e586.png)

![](https://cdn.nlark.com/yuque/0/2025/png/46102066/1756623394286-10405052-cc23-4c60-861d-8c6e9034f58f.png)

![](https://cdn.nlark.com/yuque/0/2025/png/46102066/1756622643758-90a5000b-028e-4c07-ac13-419063af0128.png)

![](https://cdn.nlark.com/yuque/0/2025/png/46102066/1756622700761-1736f011-3c74-4040-8322-12a54e7357a0.png)

（若是接口发起的签署，会自动转给转交人进行通知签署）

![](https://cdn.nlark.com/yuque/0/2025/png/46102066/1756622924124-807ac65c-7250-4a90-addc-aa5cc092beb7.png)

#### 3、合同偏好设置里面选择第三个：“<font style="color:rgb(51, 51, 51);">外部合同发送给企业成员自动转交</font>”对应的效果图
:::warning
**<font style="color:#DF2A3F;">注意：在A企业设置好合同接收人，被指定的经办人需要是已加入A企业的企业成员，并且发起方账号需要是非管理员账号，否则不生效。</font>**

:::

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1764749938696-8f76d629-5500-4cec-b38d-eeb083ca18e9.png)

### ![](https://cdn.nlark.com/yuque/0/2025/png/46102066/1756626439299-3c0bae3c-392d-4b4b-ac88-b1467014428d.png)
![](https://cdn.nlark.com/yuque/0/2025/png/447795/1764750428536-7dcefeec-9ca0-4993-849c-8c09b3360c5a.png)

（若是接口发起的签署，会自动转给转交人进行通知签署）

![](https://cdn.nlark.com/yuque/0/2025/png/46102066/1756627724734-04f9ced9-a9ff-474c-b812-297f9c35ac47.png)

## 官网离职转交功能介绍
离职转交适合合同已经发送，但是签署人已经离职的情况，需要把合同转给有权限去签署的经办人。

进入e签宝官网的自身企业空间下：【企业管理】-【人员列表】中找到对应的离职人员，点击【更多】可以选择【全部转交】或【分批转交】。

![](https://cdn.nlark.com/yuque/0/2025/png/46102066/1756630224382-3d759913-e3ba-4685-81a0-4e2735355742.png)

# ![](https://cdn.nlark.com/yuque/0/2025/png/46102066/1756630266613-4e1ed0e1-6352-4e22-a9c6-6b0e219dddc2.png)
## API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | <font style="color:rgb(64, 64, 64);">此接口获取签署方签署页面链接，可用于签署或预览。</font> | **<font style="color:rgb(140, 140, 140);">按需</font>** |


## 涉及接口及关键参数
<font style="color:#DF2A3F;">无需改动接口参数，仅需要开启应用ID的配置或者进入e签宝官网自行配置。</font>

