## 基础介绍
<font style="color:rgb(15, 17, 21);">开发者可通过指定签署方的顺序值（</font>**<font style="color:rgb(15, 17, 21);background-color:rgb(235, 238, 242);">signOrder</font>**<font style="color:rgb(15, 17, 21);">）来控制签署流程：</font>

+ **<font style="color:rgb(15, 17, 21);">有序签署</font>**<font style="color:rgb(15, 17, 21);">：当各签署方顺序值不同且依次递增时，系统将按顺序执行签署流程，即前一方完成签署后，后一方方可操作。</font>
+ **<font style="color:rgb(15, 17, 21);">无序签署</font>**<font style="color:rgb(15, 17, 21);">：当不指定顺序值，或顺序值重复时，所有签署方可同时进行签署。</font>

:::warning
<font style="color:#DF2A3F;">注：顺序值从1开始依次递增，数值越小优先级越高。</font>

:::

## 效果展示
### 有序签署
指定签署顺序的情况下，签署详情页面会展示具体的签署方顺序，需要上一个签署方签署完成后，下一个签署方才会收到签署通知，这时才可以操作签署。

![](https://cdn.nlark.com/yuque/0/2025/png/40550546/1754450059404-9f431097-7a2e-4bbd-b07a-22ce5cfd9ab7.png)

### 无序签署
没有指定签署顺序或者签署顺序指定相同值的情况下，流程中签署顺序相同值的签署方可以同时签署。

![](https://cdn.nlark.com/yuque/0/2025/png/40550546/1754450573956-2eda1a76-4e78-4746-8451-c1e0a815982a.png)

### 未轮到签署，接口获取签署链接时查看效果
![](https://cdn.nlark.com/yuque/0/2025/png/40550546/1756953579688-4366d6e4-8738-46d8-a3f0-a0f3c4141fc1.png)

## API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | <font style="color:rgb(64, 64, 64);">此接口获取签署方签署页面链接，可用于签署或预览。</font> | **<font style="color:rgb(140, 140, 140);">按需</font>** |


### 基于文件发起签署接口代码案例
#### 相关参数
+ **<font style="color:#DF2A3F;">signOrder </font>**<font style="color:#000000;">设置签署方的签署顺序，按序签时支持传入顺序值 1 - 255（值小的先签署）；同时签时，允许值重复。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1762846539365-59a0343c-0444-4ef1-b655-e51a6c9ecb30.png)

**<font style="color:#000000;">指定签署顺序相关代码</font>**

（signers中signConfig中配置signOrder）

```json
{
  "docs": [
    {
      "fileId": "请设置待签署文件的fileId",
      "fileName": "请设置待签署文件的文件名称.pdf"
    }
  ],
  "signFlowConfig": {
    "signFlowTitle": "请设置当前签署任务的主题：此场景演示平台自身、个人用户双方签署",
    "autoFinish": true,
    "noticeConfig": {
      "noticeTypes": "1,2"
    },
    "notifyUrl": "请设置异步回调地址，以http/https开头",
    "redirectConfig": {
      "redirectUrl": "请设置重定向跳转地址，例如：https://www.esign.cn/"
    }
  },
  "signers": [
    {
      "signConfig": {
        "signOrder": 1
      },
      "signerType": 1,
      "signFields": [
        {
          "customBizNum": "自定义编码001",
          "fileId": "请设置待签署文件的fileId",
          "normalSignFieldConfig": {
            "autoSign": true,
            "signFieldStyle": 1,
            "signFieldPosition": {
              "positionPage": "3",
              "positionX": 200,
              "positionY": 200
            }
          }
        }
      ]
    },
    {
      "psnSignerInfo": {
        "psnAccount": "请设置个人用户的手机号/邮箱",
        "psnInfo": {
          "psnName": "个人用户的姓名"
        }
      },
      "signConfig": {
        "signOrder": 2
      },
      "signerType": 0,
      "signFields": [
        {
          "customBizNum": "自定义编码002",
          "fileId": "请设置待签署文件的fileId",
          "normalSignFieldConfig": {
            "signFieldPosition": {
              "positionPage": "3",
              "positionX": 480,
              "positionY": 200
            },
            "signFieldStyle": 1
          }
        }
      ]
    }
  ]
}
```

