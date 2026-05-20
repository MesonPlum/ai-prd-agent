# 基础介绍
当开发者平台不确定签署的具体页码和位置坐标信息时，并想要通过e签宝的可视化页面选取盖章区域时，可参考本篇文档。

# 效果展示
## 一、通过拖章页面获取位置后再发起签署
:::info
**适用场景：由业务方提前选取合同盖章位置，再由开发者获取位置坐标后传入接口直接发起签署。**

:::

1、通过[《获取拖章定位页面》](https://open.esign.cn/doc/opendoc/pdf-sign3/gw0r0w5qb5cx2ft6)接口，获取可视化界面，然后嵌入在自己平台或者其他前端页面，然后由发起方在页面上面手动设置/拖拽签署区。

2、开发者需要接收e签宝发送的异步回调通知[《获取签章位置信息通知》](https://open.esign.cn/doc/opendoc/notify3/umvulch4szgrarh5)获取发起方设置的签署区坐标值和页码，再传到发起签署接口[《基于文件发起签署》](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42)。

:::warning
<font style="color:#DF2A3F;">注：开发者需要在e签宝开放平台提前给appid勾选“获取签章位置信息”事件（配置方式见</font>[《获取签章位置信息通知》](https://open.esign.cn/doc/opendoc/notify3/umvulch4szgrarh5)<font style="color:#DF2A3F;">）。</font>

:::

[《获取拖章定位页面》](https://open.esign.cn/doc/opendoc/pdf-sign3/gw0r0w5qb5cx2ft6)页面效果参考：

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1720082057410-147e1b8d-2199-486a-9c3f-2dad7226868a.png)

[《基于文件发起签署》](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42)接口指定坐标位置部分代码参考：

```json
"signFields": [
    {
        "fileId": "1b6ddce257884d469685db8053xxxxxxx",
        "normalSignFieldConfig": {
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



## 二、通过页面发起签署
:::info
**适用场景：开发者通过接口获取e签宝的发起签署页面，发起方可以在页面里上传文件，添加签署方、拖拽签署位置等，设置后直接在页面发起签署。**

:::

1、使用[《通过页面发起签署》](https://open.esign.cn/doc/opendoc/pdf-sign3/lp54bn)接口获取发起合同页面链接，把链接嵌入到平台或者其他前端界面，可由需要发起合同的操作人员在界面上传文件底稿、设置签署方信息。

2、页面发起签署成功后，开发者需要接收e签宝发送的异步回调通知[《签署发起成功通知》](https://open.esign.cn/doc/opendoc/notify3/llu8g1)获取签署流程signFlowId。

:::warning
<font style="color:#DF2A3F;">注：若平台方要固定签署文件或者某些签署方信息，需要在【通过页面发起签署】接口传docs和signers对应的参数信息。</font>

:::

![](https://cdn.nlark.com/yuque/0/2025/png/46102066/1758281033983-e2f8e804-76d8-4676-8d4d-573ee953f727.png)

![](https://cdn.nlark.com/yuque/0/2025/png/46102066/1758281094503-9e9bd914-ce97-4283-b2d8-f7fd07c28454.png)

[《通过页面发起签署》](https://open.esign.cn/doc/opendoc/pdf-sign3/lp54bn)接口代码参考：

```json
{
    "initiatePageConfig": {
        "customBizNum": "这是一串开发者自定义的业务编号",
        "redirectUrl": "https://xxx.cn",
        "uneditableFields": [
            "signFlowTitle",
            "signFlowExpireTime",
            "copiers",
            "attachments"
        ]
    },
    "signFlowConfig": {
        "signFlowTitle": "这是本次签署任务的主题",
        "autoFinish": true,
        "noticeConfig": {
            "noticeTypes": "1"
        },
        "redirectConfig": {
            "redirectUrl": "https://xxx.cn/"
        },
        "notifyUrl": "http://xx.xx.xx.xx:8081/notify"
    },
    "docs": [
        {
            "fileName": "如果要传签署文件可在这指定.pdf",
            "fileId": "349def13c0c84684a***b0aaf88adbc1"
        }
    ]
}
```



