## 基础介绍
开发者在发起签署时，可通过指定签署声明参数，在用户的签署页面展示自定义提示弹框。该功能适用于向签署方呈现重要提示、协议条款或操作说明等场景。

<font style="color:#DF2A3F;">注：签署声明内容将在签署方进入签署页时主动弹出，需用户确认后方可继续签署操作。</font>

## 效果展示
### 效果一
其中<font style="color:#DF2A3F;">声明文案标题</font>、<font style="color:#DF2A3F;">声明文案内容</font>字样为开发者发起签署时入参可以自定义的内容，点击“我已知悉上述内容”按钮后关闭弹框，进入签署合同页。

![](https://cdn.nlark.com/yuque/0/2025/png/45533369/1755085153867-ec9076c6-abf0-477e-bc03-4e1868f00810.png)

### 效果二
如果发起的入参指定的是signTipsFileId上传的是文件，则声明弹框中展示的是文件内容，效果如下：

![](https://cdn.nlark.com/yuque/0/2025/png/45533369/1755174957071-5afd2ed1-6400-4b74-8736-a3cf39a7e34c.png)

### 效果三
发起签署时如果signers签署方维度和signFlowConfig流程维度同时配置了声明，则声明内容<font style="color:rgb(51, 51, 51);">会并排都展示出来效果如下：</font>

![](https://cdn.nlark.com/yuque/0/2025/png/45533369/1756631586217-9b9d0995-c417-4f89-acc2-ea940ca43a5f.png)

### 三者效果的区别
在signFlowConfig（签署流程配置项）和signers（签署方信息）中都存在签署声明的配置，组合的逻辑规则如下

| **配置场景** | **<font style="color:rgb(64, 64, 64);">触发对象</font>** | **展示效果** | **描述** |
| --- | --- | --- | --- |
| <font style="color:rgb(64, 64, 64);">仅配置签署方维度（</font>signers） | **<font style="color:rgb(64, 64, 64);">仅限</font>**<font style="color:rgb(64, 64, 64);">配置了声明内容的特定签署方</font> | **<font style="color:rgb(64, 64, 64);">效果一</font>**<font style="color:rgb(64, 64, 64);"> 或 </font>**<font style="color:rgb(64, 64, 64);">效果二</font>** | <font style="color:rgb(64, 64, 64);">只对需要额外告知或约束的特定签署方展示声明。</font> |
| 仅配置流程维度（signFlowConfig） | **<font style="color:rgb(64, 64, 64);">所有</font>**<font style="color:rgb(64, 64, 64);">签署方</font> | **<font style="color:rgb(64, 64, 64);">效果一</font>** | <font style="color:rgb(64, 64, 64);">流程中的所有签署方在签署前都必须阅读同一份声明。</font> |
| 两个维度都配置（signFlowConfig和signers） | **<font style="color:rgb(64, 64, 64);">所有</font>**<font style="color:rgb(64, 64, 64);">签署方（但展示内容不同）</font> | **<font style="color:rgb(64, 64, 64);">效果三</font>**<font style="color:rgb(64, 64, 64);">（内容并排展示）</font> | <font style="color:rgb(64, 64, 64);">所有签署方都会看到弹框，其中既包含流程通用声明，也包含针对某一方的特定声明。</font> |


## API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | <font style="color:rgb(64, 64, 64);">此接口获取签署方签署页面链接，可用于签署或预览。</font> | **<font style="color:rgb(140, 140, 140);">按需</font>** |


### 基于文件发起签署接口代码案例
#### 相关参数
+ **<font style="color:#E4495B;">signTipsTitle</font>**         用户进入签署页提示弹框自定义签署声明--文案标题<font style="color:#DF2A3F;">（最多20字）</font>
+ **<font style="color:#E4495B;">signTipsContent   </font>**用户进入签署页提示弹框自定义签署声明--文案内容<font style="color:#DF2A3F;">（最多500字）</font>
+ **<font style="color:#E4495B;">signTipsFileId </font>**      用户进入签署页提示弹框自定义签署声明--文案的文件ID（通过【[上传本地文件](https://open.esign.cn/doc/opendoc/pdf-sign3/rlh256)】接口获取，必须转成PDF格式）

**<font style="color:#E4495B;">【注】</font>**：signTipsContent与signTipsFileId字段二选一传入，不可同时传入。

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1762846456463-01a58253-9f81-41f1-849e-1f7ac2cccd86.png)

#### 代码示例
**传signTipsContent文案内容代码示例：**

```json
"signConfig": {
  "signTipsTitle":"声明文案标题",
  "signTipsContent":"声明文案内容"
}
```

**传signTipsFileId文件内容代码示例：**

**<font style="color:#E4495B;">【注】</font>**：signTipsFileId配置声明文件仅支持在signers签署方维度配置。

```json
"signConfig": {
  "signTipsTitle":"声明文案标题",
  "signTipsFileId":"ba8ffb4bf63e4c67bb777861d3f7b078"
}
```





### 


