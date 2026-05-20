# 基础介绍
当发起合同签署后，用户默认有两种签署终端类型可以选择：

:::info
**网页端：**网页端可以直接浏览器打开或者内嵌在开发者自身系统直接签署，有PC和H5两种模式。

**支付宝小程序端：**支付宝端是跳转到e签宝支付宝小程序内进行签署，只支持移动端。

:::

:::warning
**<font style="color:#E8323C;">注：如开发者未特殊指定，默认是两种方式用户自选的。但在微信里打开签署链接会自动屏蔽支付宝，直接默认网页端进入签署页，无需选择。</font>**

:::

# 效果展示
## 移动端签署链接打开后默认展示效果
<font style="color:#E8323C;">(如果是短信/邮件里的签署链接，浏览器端签署是需要登录的，登录后才能查看签署文件。支付宝签署不需要登录，会自动校验支付宝登录账号信息)</font>

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668567403765-0f7811ab-30e5-4d1a-9b5f-a7d21c6d871d.png)![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668567554247-60aed9fd-3eff-4515-8b94-7d4ba70dd1be.png)![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668568187573-61c44439-e5e1-43a1-aa9c-7bd4bafcb659.png)

## PC端签署链接打开后默认展示效果
<font style="color:#E8323C;">（左侧可以选择“网页签署”直接PC端打开，或者右侧支付宝扫码手机端打开）</font>

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1736410049551-0187eab0-8d89-4723-b6ad-10c0d1212341.png)

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668566565296-7562efef-90f6-42e7-a564-ef7d927da6f9.png)  


# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口获取签署方签署页面链接，可用于签署或预览。 | **<font style="color:#8C8C8C;">按需</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
### 相关参数   
+ <font style="color:#E8323C;">availableSignClientTypes</font>（<font style="color:rgb(64, 64, 64);">签署终端类型，默认值1和2（英文逗号分隔）；</font>**<font style="color:rgb(64, 64, 64);">1</font>**<font style="color:rgb(64, 64, 64);"> - 网页（自适配H5/PC样式），</font>**<font style="color:rgb(64, 64, 64);">2</font>**<font style="color:rgb(64, 64, 64);"> - 支付宝</font>）

#### 默认两种方式都有
如果不传该参数，则直接取以下两种都有的默认值。

```json
"signFlowConfig": {
    "signConfig": {
        "availableSignClientTypes": "1,2"
    }
}
```

#### 指定网页签署
如果指定只要网页签署模式，会隐藏上述 [效果展示](#drdUL) 的第一个页面，不需要用户选择签署端，直接进入文件展示。

```json
"signFlowConfig": {
    "signConfig": {
        "availableSignClientTypes": "1"
    }
}
```

#### 指定支付宝签署
如果指定只要支付宝签署，上述 [效果展示](#drdUL) 的第一个页面会没有**“网页签署”/“打开浏览器签署”**的选项，只保留支付宝选项。

```json
"signFlowConfig": {
    "signConfig": {
        "availableSignClientTypes": "2"
    }
}
```







