## 基础介绍
<font style="color:rgb(15, 17, 21);">合同备注是发起方在创建签署合同时，为合同添加的内部说明信息。该备注将展示在签署页面任务详情信息里，可用于记录合同的背景、紧急程度等内部信息。</font>

:::info
#### **核心特性：**
+ **内部可见**：备注信息<font style="color:#DF2A3F;">仅发起方可查看</font>，<font style="color:#DF2A3F;">签署方无法看到</font>。
+ **不可变更**：一经发起，<font style="color:#DF2A3F;">无法修改</font>。如需更新，必须重新发起签署。
+ **<font style="color:rgb(15, 17, 21);">内容建议</font>**<font style="color:rgb(15, 17, 21);">：建议填写如合同背景、紧急程度或特殊说明等关键信息。</font>

:::

## 效果展示
### 移动端展示效果
![](https://cdn.nlark.com/yuque/0/2025/png/12359635/1755677099038-c942df92-d67a-4c73-addd-891bf4d6f319.png)

### PC端展示效果
![](https://cdn.nlark.com/yuque/0/2025/png/447795/1763545957740-3ce37e69-7024-4e64-b551-f5e2f882610c.png)

## API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | <font style="color:rgb(64, 64, 64);">此接口获取签署方签署页面链接，可用于签署或预览。</font> | **<font style="color:rgb(140, 140, 140);">按需</font>** |


### 基于文件发起签署接口代码案例
#### 相关参数
+ **<font style="color:#DF2A3F;">signFlowInitiator</font>**  签署流程的发起方
+ **<font style="color:#DF2A3F;">initialRemarks</font>**<font style="color:#DF2A3F;">  </font> 合同备注信息

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1763530752636-355b73a7-c862-45aa-88f5-d9d7d502db90.png)

#### <font style="color:#000000;">指定合同备注信息相关代码</font>
**默认平台作为发起方示例**

```json
"signFlowInitiator": {
  "initialRemarks": [
    "这是一条合同备注信息"
  ]
}
```

**<font style="color:rgb(64, 64, 64);">指定其他企业</font>****作为****<font style="color:rgb(64, 64, 64);">发起方示例</font>**

```json
"signFlowInitiator": {
  "orgInitiator": {
    "orgId": "842ec8ce******fc91662f",
    "transactor": {
      "psnId": "7ffca******f0ef0a8f6"
    }
  },
  "initialRemarks": [
    "这是一条合同备注信息"
  ]
}
```

**<font style="color:rgb(64, 64, 64);">指定个人作为发起方示例</font>**

```json
"signFlowInitiator": {
  "psnInitiator": {
    "psnId": "a6241c84df******607298d3de"
  },
  "initialRemarks": [
    "这是一条合同备注信息"
  ]
}
```

##### 
