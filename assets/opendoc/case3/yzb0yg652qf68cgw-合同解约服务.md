# 基础介绍
当API发起的<font style="color:#E8323C;">双方或多方</font>合同文件在签署方<font style="color:#E8323C;">均已完成签署</font>后，其中任一签署方可以申请发起合同解约。解约发起成功后，原合同中的所有签署方需要重新手动签订一份<font style="color:#E8323C;">“解约协议”</font>来对原有的合同进行解约。“解约协议”在双方或多方签署成功后，原签署文件将失效。

:::warning
<font style="color:#E8323C;">注：</font><font style="color:#E8323C;">仅限已完结状态流程中的</font>**<font style="color:#E8323C;">签署方</font>**<font style="color:#E8323C;">来作为</font>**<font style="color:#E8323C;">发起方</font>**<font style="color:#E8323C;">进行发起合同解约；单方签署的流程不支持发起解约（流程中必须包含</font>**<font style="color:#E8323C;">2个及以上</font>**<font style="color:#E8323C;">的签署方）。</font>

:::

# 效果展示
![发起解约成功后，原签署方进行签署解约协议书](https://cdn.nlark.com/yuque/0/2022/png/447795/1669269472317-3e33249d-9012-4bd9-a630-4d93cf3fc9aa.png)

# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| + [发起合同解约](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rcgt2karhmz75k1i)<br/>+ [通过页面发起合同解约](https://open.esign.cn/doc/opendoc/pdf-sign3/dy90gx)<br/><font style="color:#DF2A3F;">（两个接口二选一）</font> | + [发起合同解约](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rcgt2karhmz75k1i)<font style="color:rgb(64, 64, 64);">：根据原合同流程的signFlowId来直接发起合同解约</font><br/>+ [通过页面发起合同解约](https://open.esign.cn/doc/opendoc/pdf-sign3/dy90gx)<font style="color:rgb(64, 64, 64);">：根据原合同流程的signFlowId获取e签宝发起合同解约页面链接来发起合同解约</font> | **<font style="color:#E8323C;">必需</font>** |
| [查询签署流程详情](https://open.esign.cn/doc/opendoc/pdf-sign3/xxk4q6) | + <font style="color:rgb(64, 64, 64);">此接口可以根据发起签署接口返回的原签署流程ID：signFlowId，来查询流程的签署状态、解约状态、解约协议签署流程ID等信息。</font><br/>+ <font style="color:rgb(64, 64, 64);">此接口可以根据解约协议发起成功后的解约签署流程ID：signFlowId，来查询解约协议的签署状态等信息。</font> | **<font style="color:rgb(82, 196, 26);">建议</font>** |


## <font style="color:rgb(64, 64, 64);">发起合同解约接口代码案例</font>
### 相关参数   
+ <font style="color:#E8323C;">signFlowId</font>（已完成状态的签署流程ID）：在请求URL的path路径上传入原有合同的签署流程ID。
+ <font style="color:#E8323C;">rescindReason</font>（解约原因）：在e签宝给出的几个原因中选择，其他可以在附加原因：**rescindReasonNotes**中说明。
+ <font style="color:#E8323C;">rescindFileList</font>（本次需要解约的签署文件ID列表）：需要解约的文件ID，必须是原签署流程中的文件。
+ <font style="color:#E8323C;">rescissionInitiator</font>（合同解约发起方信息）：对应[【基于文件发起签署】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/su5g42)接口中的**signers**（签署方）或者**signFlowInitiator**（发起方）参数，必须由原合同流程中的参与方来发起合同解约。

<font style="color:rgb(232, 50, 60);background-color:rgb(255, 251, 230);">注：指定发起方之前，需先给机构/个人发起方进行 </font>[<font style="background-color:rgb(255, 251, 230);">用户授权</font>](https://open.esign.cn/doc/opendoc/auth3/lmfokx)<font style="color:rgb(232, 50, 60);background-color:rgb(255, 251, 230);">（授权允许平台代表机构/个人用户发起合同签署权限： org_initiate_sign/psn_initiate_sign）。</font>

+ <font style="color:#E8323C;">signFlowConfig</font>（解约流程配置项）：可传入解约计费配置项、用户通知配置项，以及开发者回调通知地址。
+ <font style="color:#E8323C;">autoSignOrg</font>（指定本次解约使用自动签署的机构签署方）：平台或者授权平台的企业自动盖章时传入。
+ <font style="color:#E8323C;">orgSignerTransactor</font>**（**指定本次解约机构签署方经办人信息）：企业手动签署时可以传入进行指定本次签署解约协议的企业经办人信息。

### 代码案例
**由原合同中的机构签署方发起解约并自动盖章场景示例：**

```javascript
{
    "rescindReason": "1",
    "rescindFileList": [
        "a5f72*******038573a268"
    ],
    "rescissionInitiator": {
        "orgInitiator": {
            "orgId": "842ec8c******5fc91662f",
            "transactor": {
                "psnId": "7ffc******8f0ef0a8f6"
            }
        }
    },
    "signFlowConfig": {
        "chargeConfig": {
            "chargeMode": 0
        },
        "noticeConfig": {
            "noticeTypes": "1,2"
        },
        "notifyUrl": "http://*******/notify"
    },
    "autoSignOrg": [
        {
            "orgName": "XXXX有限公司",
            "sealId": "ac8ce1b0-08e9-****-ca82a343"
        }
    ]
}
```

**由原合同中的个人签署方发起解约并且机构签署方经办人手动签署示例：**

```javascript
{
    "rescindReason": "1",
    "rescindFileList": [
        "f78dd1****33f0d122b74"
    ],
    "rescissionInitiator": {
        "psnInitiator": {
            "psnId": "39c4d66******4438c8"
        }
    },
    "signFlowConfig": {
        "chargeConfig": {
            "chargeMode": 0
        },
        "noticeConfig": {
            "noticeTypes": "1,2"
        },
        "notifyUrl": "http://*******/notify"
    },
    "orgSignerTransactor": [
        {
            "orgName": "XXXX有限公司",
            "transactorInfo": {
                "psnAccount": "153****0000"
            }
        }
    ]
}
```



## <font style="color:rgb(64, 64, 64);">通过页面发起合同解约接口代码案例</font>
### 相关参数   
+ <font style="color:#E8323C;">signFlowId</font>（已完成状态的签署流程ID）：在请求URL的path路径上传入原有合同的签署流程ID。
+ <font style="color:#E8323C;">rescissionInitiator</font>（合同解约发起方信息）：对应[【基于文件发起签署】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/su5g42)接口中的**signers**（签署方）或者**signFlowInitiator**（发起方）参数，必须由原合同流程中的参与方来发起合同解约。

<font style="color:rgb(232, 50, 60);background-color:rgb(255, 251, 230);">注：指定发起方之前，需先给机构/个人发起方进行 </font>[<font style="background-color:rgb(255, 251, 230);">用户授权</font>](https://open.esign.cn/doc/opendoc/auth3/lmfokx)<font style="color:rgb(232, 50, 60);background-color:rgb(255, 251, 230);">（授权允许平台代表机构/个人用户发起合同签署权限： org_initiate_sign/psn_initiate_sign）。</font>

+ <font style="color:#E8323C;">signFlowConfig</font>（解约流程配置项）：可传入计费配置项、重定向配置项，解约协议通知配置项以及回调通知地址。

当解约协议发起成功后，会触发[【合同发起解约通知】](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/dlwpxm)发送消息给接口配置的回调通知地址。

当解约协议签署完成后，会触发[【合同解约成功通知】](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/fxvgkg)发送消息给接口配置的回调通知地址。

### 代码案例
**由原合同中的机构签署方发起解约场景示例：**

```javascript
{
    "rescissionInitiator": {
        "orgInitiator": {
            "orgId": "0c5bd49248***5648bfbf",
            "transactor": {
                "psnId": "c7e002947***310541e7"
            }
        }
    },
    "signFlowConfig": {
        "chargeConfig": {
            "chargeMode": 0
        },
        "noticeConfig": {
            "noticeTypes": "1,2"
        },
        "redirectConfig": {
            "redirectUrl": "https://web.esign.cn/"
        },
        "notifyUrl": "http://******/notify"
    }
}
```

**由原合同中的个人签署方发起解约场景示例：**

```javascript
{
    "rescissionInitiator": {
        "psnInitiator": {
            "psnId": "39c4d66******4438c8"
        }
    },
    "signFlowConfig": {
        "chargeConfig": {
            "chargeMode": 0
        },
        "noticeConfig": {
            "noticeTypes": "1,2"
        },
        "redirectConfig": {
            "redirectUrl": "https://web.esign.cn/"
        },
        "notifyUrl": "http://******/notify"
    }
}
```

### <font style="color:rgb(64, 64, 64);">通过页面发起合同解约</font>效果展示
页面版发起需要打开返回的链接，在e签宝页面里选择待解约文件，解约原因，解约签署方等信息。

![通过页面发起合同解约专有](https://cdn.nlark.com/yuque/0/2022/png/447795/1669269378347-412c4cda-14b7-451a-8ad4-273e2e4de2ae.png)

![通过页面发起合同解约专有](https://cdn.nlark.com/yuque/0/2022/png/447795/1669688915643-04defb11-1ec2-49d4-aae1-60a41ef419ef.png)

![通过页面发起合同解约专有](https://cdn.nlark.com/yuque/0/2022/png/447795/1669269438352-c568a42b-6ea6-4ba3-b6f3-ffd9b635b18f.png)

