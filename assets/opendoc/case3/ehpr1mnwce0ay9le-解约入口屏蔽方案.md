# 基础介绍
<font style="color:rgb(15, 17, 21);">解约用于对已签署完成的合同进行作废处理。默认情况下，完结的签署流程可通过调用解约接口（</font>[点击了解 接口发起合同解约服务](https://qianxiaoxia.yuque.com/opendoc/case3/yzb0yg652qf68cgw)<font style="color:rgb(15, 17, 21);">）、用户签署完成页面的解约按钮（</font>[见下文效果展示](#evNGI)<font style="color:rgb(15, 17, 21);">）以及e签宝官网（</font>[点击了解 官网如何进行合同解约](https://help.esign.cn/detail?id=xmmvdt&nameSpace=cs3-dept%2Fexboae)<font style="color:rgb(15, 17, 21);">）发起解约。</font>

:::info
**屏蔽解约入口的方案**

**1、接口参数控制****<font style="color:#DF2A3F;">（全部入口禁止解约）</font>**  
	基于文件发起签署接口时，通过设置 `allowToRescind` 参数直接屏蔽解约功能。

**2、e签宝技术配置开发者appId****<font style="color:#DF2A3F;">（只禁止用户签署完成页面的解约按钮）</font>**  
	提供e签宝接口对接的应用ID（appId），联系e签宝技术团队配置用户签署页面屏蔽解约按钮。

:::



## 1、接口参数控制屏蔽解约入口
### 效果展示
屏蔽解约入口前：e签宝解约接口、用户签署页面、e签宝官网后台均能正常发起解约；

屏蔽解约入口后：

+ 调用e签宝解约接口报错：<font style="color:#DF2A3F;">【该流程不支持解约！】</font>；

![](https://cdn.nlark.com/yuque/0/2025/png/1965556/1755244671506-34df7fe7-6ccf-40ab-b0e1-d37e1904d693.png)

+ 用户签署页面会屏蔽解约按钮（[可参考方法2的效果展示](#v6fRa)）。
+ e签宝后台仍会展示解约按钮，但点击按钮会出现报错<font style="color:#DF2A3F;">【该流程不支持或被发起方禁止发起解约】</font>；

![](https://cdn.nlark.com/yuque/0/2025/png/1965556/1755244521322-09e082ff-e190-45ef-af1c-c886269738ad.png)

### API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |


### 基于文件发起签署接口部分参数案例
+ **<font style="color:#DF2A3F;">allowToRescind</font>**<font style="color:#DF2A3F;"> </font> 该签署流程是否允许发起解约，默认true。true - 允许，false - 不允许

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1763001731244-f4485f9a-38cc-49c4-8471-3d8c04014cc6.png)

```json
"contractConfig":{
  "allowToRescind":false
},
```



## 2、通过appId维度配置屏蔽解约按钮
### 效果展示
应用ID配置屏蔽解约按钮之前的效果：

![](https://cdn.nlark.com/yuque/0/2025/png/449512/1755250039391-36021f32-83ae-4240-bd7a-c439f85417af.png)



配置屏蔽解约按钮之后的效果：

![](https://cdn.nlark.com/yuque/0/2025/png/449512/1755250087531-f092f2ea-5599-4ce1-b6d7-00d19efdd0af.png)



<font style="color:#DF2A3F;">注意：该方式仅屏蔽签署页面中的解约按钮，此时通过e签宝官网登录后仍会展示解约按钮，点击解约按钮仍能正常发起解约流程。且开发者也可主动调用接口发起解约。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/449512/1755250319229-673ad4e6-26db-4b86-9535-9fd7abaf0cc7.png)

