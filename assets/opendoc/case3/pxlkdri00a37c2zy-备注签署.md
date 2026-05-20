# 基础介绍
<font style="color:rgb(64, 64, 64);">发起签署接口支持添加普通签署区同时指定备注签署区，让用户在签章过程中</font>**<font style="color:rgb(232, 50, 60);">添加备注文字</font>**<font style="color:rgb(64, 64, 64);">信息。</font>

:::info
**<font style="color:rgb(245, 34, 45);">典型应用场景</font>**

1. 医疗行业：病历单、处方单、告知书等签署时，需要填写一段文字用于表明患者（患者家属）已知晓所签内容及风险，如“我已经阅读并悉知”，然后签字提交签署。

2. 保险行业：签署保单时，需要投保人抄录风险提示语，确保消费者对保险保障、收益的知情权，防止销售误导投保人。如：“本人已阅读保险条款、产品说明书和投保提示书，了解本产品的特点和保单利益的不确定性”。

3. 物流行业：在物流清单上备注清点信息，如“应收XX箱货物，实收XX箱”。

:::

:::warning
<font style="color:#E8323C;">注：备注签署区不支持自动签署，必须让用户在页面手动写入。且备注签署只支持个人签署方，不支持机构。</font>

:::

# 效果展示
其中【承诺】、【阅读】等字样为用户在备注区手写抄录的文字；承诺人签名：“张三”为用户在签章区手写的签名。

<font style="color:#DF2A3F;">（本图仅为效果展示案例，具体业务设计需遵照自身实际需求）</font>

## ![](https://cdn.nlark.com/yuque/0/2022/png/447795/1669011013689-f7457e3c-804d-4114-9102-531cf9e89391.png)
# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口获取签署方签署页面链接，可用于签署或预览。 | **<font style="color:#8C8C8C;">按需</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
### 相关参数   
+ <font style="color:#E8323C;">signFieldType</font>（签署区类型，默认值为 0；0 - 签章区（用于加盖印章或签名），**1** - 备注区（用于添加备注文字信息）
+ <font style="color:#E8323C;">remarkSignFieldConfig</font> 备注区配置项（指定<font style="color:#E8323C;">signFieldType</font>为** 1** - 备注区时，该参数为必传项）

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668739753769-2c1ba199-6512-4c2a-82c4-f8ce3b2e0fd3.png)

:::warning
<font style="color:#DF2A3F;">注：</font>备注区配置项中--<font style="color:#DF2A3F;">aiCheck</font>（是否开启手写抄录 AI 校验）参数解释：

+ 传入值为 0 ：代表不开启校验；
+ 传入值为 1 ：开启 AI 手写抄录校验，连续3次校验不通过将弹窗提醒“监测到多次识别未通过，是否直接使用当前手写笔迹？”，确定后跳过该字的校验，下一个字继续执行 AI 校验；
+ 传入值为 2 ：强制 AI 手绘校验，若校验不通过，则会一直提示“识别失败，请重新书写XX”，直至校验通过。

:::

#### 手写抄录
代码案例为用户在页面手写抄录方式备注签署，并由开发者提前指定好备注位置。

+ <font style="color:#E8323C;">signFieldType</font> 设置为：1（备注区）；
+ <font style="color:#E8323C;">inputType</font> 设置为：1（手写抄录方式）；
+ <font style="color:#DF2A3F;">aiCheck</font> 选择是否开启AI手绘；
+ <font style="color:#E8323C;">remarkContent</font> 设置：客户在页面需要待抄录的信息；
+ <font style="color:#E8323C;">movableSignField</font> （备注区是否可以移动）按照需求传入，如果希望用户在页面可以调整位置传入：true；
+ <font style="color:#DF2A3F;">remarkFontSize、signFieldWidth、signFieldHeight </font>传入需要的文字字号、备注区域宽高；
+ <font style="color:#E8323C;">signFieldPosition</font> 设置备注区的页码和坐标位置信息。

```json
"signFieldType": 1,
"remarkSignFieldConfig": {
    "freeMode": false,
    "inputType": 1,
    "aiCheck": 1,
    "remarkContent": "承诺",
    "movableSignField": true,
    "remarkFontSize": 12,
    "signFieldHeight": "20",
    "signFieldWidth": "30",
    "signFieldPosition": {
        "positionPage": "1",
        "positionX": 190,
        "positionY": 542
    }
}
```

#### 键盘输入
键盘输入方式不能预设待抄录信息，是由用户自由输入内容写入页面（一次最多输入50个字）。代码案例为用户在页面键盘输入方式备注签署，并由用户自由备注在任意位置，开发者不指定位置。

+ <font style="color:#E8323C;">signFieldType</font> 设置为：1（备注区）；
+ <font style="color:#E8323C;">freeMode</font> 设置为：true，自由备注在任意位置。
+ <font style="color:#E8323C;">inputType</font> 设置为：2（键盘输入方式）；
+ <font style="color:#DF2A3F;">remarkFontSize、signFieldWidth、signFieldHeight </font>传入需要的文字字号、备注区域宽高。

```json
"signFieldType": 1,
"remarkSignFieldConfig": {
    "freeMode": true,
    "inputType": 2,
    "remarkFontSize": 12,
    "signFieldHeight": "20",
    "signFieldWidth": "100"
}
```



