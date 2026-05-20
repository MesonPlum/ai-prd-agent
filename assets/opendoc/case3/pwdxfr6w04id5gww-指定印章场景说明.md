## 基础介绍
接口发起签署时可通过availableSealIds、assignedSealId、orgSealBizTypes三个字段来指定印章（字段见下文），本文将具体介绍三个字段的效果及区别。

:::info
指定印章适用于以下场景：

1. 发起方自身业务需要去限制签署方盖章时使用的印章类型/印章ID ，可以使用availableSealIds或assignedSealId或orgSealBizTypes字段来实现，其中availableSealIds和orgSealBizTypes仅支持企业签署方，不支持个人签署方。
2. 希望简化签署方的操作步骤，进入签署页面后，印章自动在签署页面指定位置中展示，不需要额外进行手动拖拽或选择印章。可以使用assignedSealId字段来实现。

:::

## API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | <font style="color:rgb(64, 64, 64);">此接口获取签署方签署页面链接，可用于签署或预览。</font> | **<font style="color:rgb(140, 140, 140);">按需</font>** |


### [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42)接口相关参数
+ **<font style="color:#DF2A3F;">assignedSealId   </font>**指定印章ID（印章ID是e签宝SaaS官网的印章编号）
+ **<font style="color:#DF2A3F;">availableSealIds</font>**<font style="color:#DF2A3F;">  </font>手动签章时页面可选的印章列表
+ **<font style="color:#DF2A3F;">orgSealBizTypes</font>**<font style="color:#DF2A3F;">  </font>页面可选机构印章类型，默认全部展示

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1766042411880-12a41a55-1b05-46bc-8863-3a7ed25dc4b5.png)

## （1）assignedSealId
:::info
用于直接将印章落到签署区，无需手动再选择印章。**<font style="color:#DF2A3F;">支持个人和企业签署方类型。</font>**

:::

### 效果展示
未指定字段，默认展示个人所有印章：

![](https://cdn.nlark.com/yuque/0/2025/png/449512/1758694987512-eac44259-ad90-4550-8607-df118e46911e.png)

指定assignedSealId后，进入签署页面，印章自动会落到个人签署区中，无需人工手动拖拽。

![](https://cdn.nlark.com/yuque/0/2025/png/449512/1758695992620-f9791516-633a-4e89-bf97-24331dcd3ce2.png)



未指定字段，默认展示企业所有印章：

![](https://cdn.nlark.com/yuque/0/2025/png/449512/1758696868881-5a9e0bcf-8547-4f78-b209-732aa5975ab6.png)

指定assignedSealId后，进入签署页面，印章自动会落到企业签署区中，无需经办人手动拖拽：

![](https://cdn.nlark.com/yuque/0/2025/png/449512/1758696932847-88b9627e-b014-43bf-9762-206308d29724.png)

### [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42)接口代码案例
```json
"signFields": [
    {
        "fileId": "1b6ddce257884d469685db8053xxxxxxx",
        "normalSignFieldConfig": {
            "assignedSealId": "7524ab90-400c-4cd2-99cd-xxxxxxx",
            "signFieldPosition": {
                "positionPage": "1",
                "positionX": 470,
                "positionY": 200
            },
            "signFieldStyle": 1
        }
    }
]
```

## （2）availableSealIds 
:::info
用于指定签署页面中，经办人可选的企业印章列表。**<font style="color:#DF2A3F;">仅支持企业签署方，不支持个人签署方。</font>**

:::

### 效果展示
未指定字段，默认展示企业下所有的印章：

![](https://cdn.nlark.com/yuque/0/2025/png/449512/1758694759603-edaa1704-a0f4-4a97-9940-9ad187d7e0f8.png)

指定availableSealIds后，仅展示指定的印章id列表：

（如果希望仅展示一个，availableSealIds中仅传入一个印章id即可）

![](https://cdn.nlark.com/yuque/0/2025/png/449512/1758694624616-26666a3f-218d-4831-91e0-8a5041da7f24.png)

:::warning
**<font style="color:#DF2A3F;">注意：该字段不支持个人签署类型使用。否则报错：{"code":1435002,"message":"参数错误: 不支持指定印章列表的任务类型","data":null}</font>**

:::

### [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42)接口代码案例
```json
"signFields": [
    {
        "fileId": "1b6ddce257884d469685db8053xxxxxxx",
        "normalSignFieldConfig": {
            "availableSealIds": [
                "eab918fb-0931-447e-ba0f-xxxxx",
                "60026652-ce5b-4c06-b946-xxxxxx"
            ],
            "signFieldPosition": {
                "positionPage": "1",
                "positionX": 470,
                "positionY": 200
            },
            "signFieldStyle": 1
        }
    }
]
```

## （3）orgSealBizTypes
:::info
用于指定签署页面中，经办人可选的企业印章类型。**<font style="color:#DF2A3F;">仅支持企业签署方，不支持个人签署方。</font>**

:::

### 效果展示
未指定字段，默认展示企业下所有的印章：

![](https://cdn.nlark.com/yuque/0/2025/png/449512/1758694759603-edaa1704-a0f4-4a97-9940-9ad187d7e0f8.png)

指定orgSealBizTypes后，仅展示指定的印章类型（下图指定的是只要合同专用章）：

![](https://cdn.nlark.com/yuque/0/2025/png/449512/1758697761056-074cfe44-5cbb-4c30-aa86-7d1cfeab1581.png)

:::warning
**<font style="color:#DF2A3F;">注意：指定印章类型的方式可能存在部分企业下没有指定的印章类型，导致无可用印章。</font>**

:::

### [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42)接口代码案例
```json
"signFields": [
    {
        "fileId": "1b6ddce257884d469685db8053xxxxxxx",
        "normalSignFieldConfig": {
            "orgSealBizTypes": "CONTRACT",
            "signFieldPosition": {
                "positionPage": "1",
                "positionX": 470,
                "positionY": 200
            },
            "signFieldStyle": 1
        }
    }
]
```

