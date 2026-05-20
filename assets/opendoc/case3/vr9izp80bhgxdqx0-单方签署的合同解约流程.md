## 基础介绍
<font style="color:rgb(15, 17, 21);">当前e签宝接口暂不支持对“单方签署合同”（即原流程仅有一个签署方）直接发起线上解约。若需作废此类合同，请按以下步骤操作：</font>

:::info
**<font style="color:rgb(15, 17, 21);">操作流程：</font>**

**<font style="color:rgb(15, 17, 21);">1、线下拟定解约协议</font>**<font style="color:rgb(15, 17, 21);">  
</font><font style="color:rgb(15, 17, 21);">准备一份《合同解约协议》或《合同作废声明》，明确说明原合同作废。</font>

**<font style="color:rgb(15, 17, 21);">2、发起新解约流程</font>**<font style="color:rgb(15, 17, 21);">  
</font><font style="color:rgb(15, 17, 21);">通过e签宝接口，将上述解约协议发起为新签署流程，并确保：</font>

+ <font style="color:rgb(15, 17, 21);">签约主体包含</font>**<font style="color:rgb(15, 17, 21);">原合同所有签署方</font>**<font style="color:rgb(15, 17, 21);">（单方合同时即为原唯一签署方）</font>
+ <font style="color:rgb(15, 17, 21);">所有方完成签署后，解约协议生效，视为原合同作废</font>

:::

## 效果展示
**作废合同协议模板****<font style="color:#DF2A3F;">（仅供参考）</font>****：**[点击下载 作废合同模板.doc](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/作废合同模板.doc)

### 单方签署-原协议：
![](https://cdn.nlark.com/yuque/0/2025/jpeg/12359635/1756982314708-7dadc722-c2a1-43f3-96bd-5e3cbb03ed97.jpeg)

### 单方签署-解约协议：
![](https://cdn.nlark.com/yuque/0/2025/jpeg/12359635/1757038705188-fdea371c-a7a5-4187-9d44-1f040e1a9d61.jpeg)  
 

## API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口获取签署方签署页面链接，可用于签署或预览。 | **<font style="color:#8C8C8C;">按需</font>** |


### 基于文件发起签署接口代码案例（单方签署）
#### 解约流程的签署方是平台或其他企业签署方（自动签署）：
```json
{
  "docs": [
    {
      "fileId": "解约协议文件id",
      "fileName": "企业单方签署-解约协议-自动.pdf"
    }
  ],
  "signFlowConfig": {
    "signFlowTitle": "企业单方签署-解约协议-自动",
    "autoFinish": true,
    "noticeConfig":{
      "noticeTypes":"1,2"
    }
  },
  "signers": [
    {
      "signerType": 1,
      "signFields": [
        {
          "fileId": "解约协议文件id",
          "normalSignFieldConfig": {
            "autoSign": true,
            "assignedSealId": "需盖章的印章ID值",
            "signFieldStyle": 1,
            "signFieldPosition": {
              "positionX": "x坐标",
              "positionY": "y坐标",
              "positionPage": "签署页码"
            }
          }
        }
      ]
    }
  ]
}
```

#### 解约流程的签署方是企业签署方（手动签署）：
```json
{
  "docs": [
    {
      "fileId": "解约协议文件id",
      "fileName": "企业单方签署-解约协议-手动.pdf"
    }
  ],
  "signFlowConfig": {
    "signFlowTitle": "企业单方签署-解约协议-手动",
    "autoFinish": true,
    "noticeConfig":{
      "noticeTypes":"1,2"
    }
  },
  "signers": [
    {
      "signerType": 1,
      "orgSignerInfo":{
        "orgName":"企业名称",
        "transactorInfo":{
          "psnAccount":"经办人手机号",
          "psnInfo":{
            "psnName":"经办人姓名"
          }
        }
      },
      "signFields": [
        {
          "fileId": "解约协议文件id",
          "normalSignFieldConfig": {
            "signFieldStyle": 1,
            "signFieldPosition": {
              "positionX": "x坐标",
              "positionY": "y坐标",
              "positionPage": "签署页码"
            }
          }
        }
      ]
    }
  ]
}
```

#### 解约流程签署方是个人签署方（只能手动签署）：
```json
{
  "docs": [
    {
      "fileId": "解约协议文件id",
      "fileName": "个人单方签署-解约协议-手动.pdf"
    }
  ],
  "signFlowConfig": {
    "signFlowTitle": "个人单方签署-解约协议-手动.pdf",
    "autoFinish": true,
    "noticeConfig":{
      "noticeTypes":"1,2"
    }
  },
  "signers": [
    {
      "signerType": 0,
      "psnSignerInfo":{
        "psnAccount":"联系方式",
        "psnInfo":{
          "psnName":"姓名"
        }
      },
      "signFields": [
        {
          "fileId": "解约协议文件id",
          "normalSignFieldConfig": {
            "signFieldStyle": 1,
            "signFieldPosition": {
              "positionX": "x坐标",
              "positionY": "y坐标",
              "positionPage": "签署页码"
            }
          }
        }
      ]
    }
  ]
}
```

