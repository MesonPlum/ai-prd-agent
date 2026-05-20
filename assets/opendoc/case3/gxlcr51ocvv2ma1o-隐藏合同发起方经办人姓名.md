## 基础介绍
当合同不是由平台默认企业发起，而是通过接口指定其他企业作为发起方时，若需在用户签署页面隐藏该企业经办人的姓名，可按以下指引配置：

:::info
**<font style="color:rgb(15, 17, 21);">操作流程：</font>**

**<font style="color:rgb(15, 17, 21);">1、发起合同时指定主体</font>**<font style="color:rgb(15, 17, 21);">  
</font><font style="color:rgb(15, 17, 21);">调用发起签署接口时，明确指定合同的发起方为其他企业主体（可参照</font>[【指定合同发起方】](https://open.esign.cn/doc/opendoc/case3/bgs7lwkpz0fezgup)<font style="color:rgb(15, 17, 21);">文档）。</font>

**<font style="color:rgb(15, 17, 21);">2、隐藏经办人姓名</font>**<font style="color:rgb(15, 17, 21);">  
</font><font style="color:rgb(15, 17, 21);">在e签宝官网或者开放平台，设置对应选项以隐藏发起方经办人在签署页面显示的姓名（见下文）。</font>

:::

## 效果展示
:::warning
**<font style="color:#DF2A3F;">【注】：</font>**

+ **签署详情页**是签署方进入签署页操作签署时，任务信息中的展示效果；
+ **中间页**是签署方进入签署前选择终端时的展示页，详见[【网页端OR支付宝端签署】](https://open.esign.cn/doc/opendoc/case3/km9lo5php780z8dk)

:::

**签署详情页-指定企业发起方默认展示效果：**

![](https://cdn.nlark.com/yuque/0/2025/png/45533369/1756641757003-31461e90-6ae1-42ec-bb96-57fcfefb6fc2.png)

**中间页-指定企业发起方默认展示效果：**

![](https://cdn.nlark.com/yuque/0/2025/png/45533369/1756642278406-cb7aa811-c520-4bb3-864c-5f4173143f85.png)

**签署详情页-隐藏发起方经办人姓名后展示效果：**

![](https://cdn.nlark.com/yuque/0/2025/png/45533369/1756641835968-c9fa80a8-a435-4a44-bb62-59b9c0b6a3bc.png)

**中间页-隐藏发起方经办人姓名后展示效果：**

![](https://cdn.nlark.com/yuque/0/2025/png/45533369/1756642149546-0d165fba-ec47-4a1a-abad-e0338553ba29.png)

## 如何配置
### 方式一（推荐）：
1.登录e签宝[开发者控制台](https://open.esign.cn/my-apps/home)中，页面确认进入对应企业空间下-左侧进入【应用管理】-【我的应用】；

2.找到需要配置的应用ID，点击【配置】；

![](https://cdn.nlark.com/yuque/0/2025/png/46341124/1756724479364-7f3357cc-e877-416c-a901-19f851f7cb97.png)

3.点击页面的【参数配置】-【签署服务】，找到<font style="color:rgb(51, 51, 51);">【是否展示合同发起方姓名】配置：不展示，即隐藏效果。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1764733331341-679940d1-4f7f-4375-90ed-b87670a6862c.png)

### 方式二：
进入e签宝官网：【合同偏好设置】中的【隐藏发起人】中设置：**是**，即隐藏发起人姓名。

<font style="color:#DF2A3F;">需要进入发起方的企业空间下设置，如果指定的发起方是不同的企业，需要分别进入对应的企业空间下去设置。</font>

:::warning
<font style="color:#DF2A3F;">注意区分所属的环境地址：</font><font style="color:#000000;">  
</font><font style="color:#000000;">1、线上正式环境-e签宝官网地址：</font>[https://web.esign.cn/workspace/home](https://web.esign.cn/workspace/home)

<font style="color:#000000;">2、模拟沙箱环境-e签宝模拟官网地址：</font>[https://smlfront.esign.cn:8880/workspace/home](https://smlfront.esign.cn:8880/workspace/home)

:::

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1764733057813-4ebb9ad2-2ad6-486a-997e-7d79e900ab7e.png)

<font style="color:#DF2A3F;"></font>

### 


