# 基础介绍
当企业文件较多，需要在e签宝SaaS官网-企业合同内新建很多类目文件夹去分别管理，手动分类整理比较耗费时间，希望文件在发起时就可以按照提前设置好的规则自动分类归档到对应的文件夹内，可以通过该功能实现。

:::warning
<font style="color:#DF2A3F;">使用e签宝SaaS官网注意区分所属的环境地址：</font><font style="color:#000000;">  
</font><font style="color:#000000;">1、线上正式环境-e签宝官网地址：</font>[https://web.esign.cn/workspace/home](https://web.esign.cn/workspace/home)

<font style="color:#000000;">2、模拟沙箱环境-e签宝模拟官网地址：</font>[https://smlfront.esign.cn:8880/workspace/home](https://smlfront.esign.cn:8880/workspace/home)

:::

# 效果展示
### 方式一：通过e签宝SaaS API接口发起签署并设置归档文件夹<font style="color:#DF2A3F;">（限SaaS 专业版及以上）</font>
:::info
**适用场景**：使用此方式是为了控制SaaS API接口发起的签署可以自动归档到指定的分类文件夹内。

:::

1.登录e签宝SaaS官网-企业空间首页-合同管理-企业合同-已归档合同中新建分类-详情中复制分类ID

![](https://cdn.nlark.com/yuque/0/2025/png/32742681/1758462288452-df50dcd9-c2b2-4ef3-9cae-2e216b002e98.png)

2.通过[《基于文件发起签署》](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42)接口发起签署，在参数**contractGroupIds**中指定在e签宝官网复制的分类ID，发起签署后，文件将会自动归档到指定的文件夹中。

![](https://cdn.nlark.com/yuque/0/2025/png/32742681/1758462135279-6008fdd4-a9ff-4f78-8a5c-ea3606717471.png)

![](https://cdn.nlark.com/yuque/0/2025/png/32742681/1758462691332-f888d89a-a44f-4cb9-ba0f-1c4e5da168a4.png)

### 方式二：通过e签宝SaaS官网的智能归档功能设置<font style="color:#DF2A3F;">（限SaaS 高级版）</font>
登录e签宝SaaS官网-智能归档选择合同需要自动归档的位置和归档的条件。通常智能归档会和智能台账功能结合使用。（[点击详细了解 官网智能归档](https://help.esign.cn/detail?id=si03iqzsd4rcsl14&nameSpace=cs3-dept%2Fexboae)）

**不结合智能台账功能：**

![](https://cdn.nlark.com/yuque/0/2025/png/32742681/1758462389265-7a10e8c7-e539-43fd-901b-688a3e155028.png)

**结合智能台账功能：**

![](https://cdn.nlark.com/yuque/0/2025/png/32742681/1758462463218-6c56ff2a-582a-4912-9821-2b91b2280163.png)

![](https://cdn.nlark.com/yuque/0/2025/png/32742681/1758462508065-970e1549-4fcc-429c-9315-6dd85eb93eea.png)

**规则配置后，当文件符合设置的规则时，文件将自动归档到企业合同的指定文件夹中。**

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1766393850424-7423cf7a-0d73-41bf-818c-a5d5c9335d59.png)

# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口获取签署方签署页面链接，可用于签署或预览。 | **<font style="color:#8C8C8C;">按需</font>** |


### 基于文件发起签署接口代码案例
#### 相关参数
+ **<font style="color:#DF2A3F;">contractGroupIds</font>**（设置企业合同归档文件夹ID）

![](https://cdn.nlark.com/yuque/0/2025/png/32742681/1758458697843-2fb651bf-4fee-49dc-94f7-723a36abeea5.png)

#### 代码示例
（签署文件分类归档e签宝官网对应的文件夹下部分代码）

```json
"signFlowConfig": {
    "contractGroupIds": [
        "2160b1fffef1111f8e1b44d318584326"
    ]
}
```

