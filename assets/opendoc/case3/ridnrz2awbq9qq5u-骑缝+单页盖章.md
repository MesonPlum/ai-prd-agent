## 基础介绍
<font style="color:rgb(15, 17, 21);">在电子合同签署中，若需同时为合同加盖骑缝章（</font>[点击了解 骑缝盖章](https://qianxiaoxia.yuque.com/opendoc/case3/yi2uzzogefr5lp1z)<font style="color:rgb(15, 17, 21);">）与单页印章，可参考本文进行配置。</font>

## 效果展示
![](https://cdn.nlark.com/yuque/0/2025/gif/40550546/1758596424352-5e8bcfd7-95e2-412f-b194-022aade67a7c.gif)![](https://cdn.nlark.com/yuque/0/2025/jpeg/40550546/1758596557709-aa5a2b9e-a032-4e86-ada4-717a6e518b0d.jpeg)

# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口获取签署方签署页面链接，可用于签署或预览。 | **<font style="color:#8C8C8C;">按需</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
### 相关参数
+ **<font style="color:#DF2A3F;">signFieldStyle  </font>**签章区样式；1 - 单页签章，2 - 骑缝签章
+ **<font style="color:#E8323C;">signFieldPosition</font>****<font style="color:#DF2A3F;"> </font>**<font style="color:#000000;"> </font><font style="color:rgb(64, 64, 64);">签章区位置信息</font>

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1764055972697-5b3c6b17-220d-4b60-8b9b-af9a3360f045.png)

**代码案例：**

signFields是数组，可以添加多个签署区，一个signFieldStyle指定1（单页签章），一个signFieldStyle指定2（骑缝签章）

```json
"signFields": [
  {
    "fileId": "请设置待签署文件的fileId",
    "normalSignFieldConfig": {
      "signFieldPosition": {
        "positionPage": "1",
        "positionX": 150.0,
        "positionY": 200.0
      },
      "signFieldStyle": 1
    }
  },
  {
    "fileId": "请设置待签署文件的fileId",
    "normalSignFieldConfig": {
      "signFieldPosition": {
        "acrossPageMode":"ALL",
        "positionY": 200.0
      },
      "signFieldStyle": 2
    }
  }
]
```

