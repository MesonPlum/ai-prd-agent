## 本文目录导航指引
_<font style="color:#8C8C8C;">锚点跳转定位可能存在轻微页面滚动偏差，跳转后请上下滚动页面查看。</font>_

[场景说明](#S2NKv)

[如何制作及填充PDF模板](#v56AU)

[API列表](#PeAag)

[控件填充示例说明](#Xd6Zh)

## 场景说明
:::info
**<font style="color:rgb(64, 64, 64);">当合同中有不固定的内容需要填充，需要提前制作合同模板并进行填充。当需要用e签宝接口获取的合同模板制作页面来制作和维护PDF模板，并通过接口传参或接口获取页面方式来填充不固定的内容时，可参考本流程。</font>**

**制作PDF模板：**希望可以通过e签宝接口获取的合同模板制作页面来制作和维护PDF模板。

**填写PDF模板：**希望可以通过e签宝接口传参方式直接填写PDF模板 或 通过接口获取用户填写页面来填写PDF模板。

**<font style="color:#E8323C;">对接场景符合以上两点时，开发者可参考本文进行相关接口对接。</font>**

:::

## 如何制作及填充PDF模板
### 步骤1：上传本地文件并转成PDF格式
<font style="color:rgb(38, 38, 38);">开发者参考</font>[【上传本地文件】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256)<font style="color:rgb(38, 38, 38);">将本地文件上传到e签宝服务端，此接口需要生成PDF格式文件，非PDF格式文件上传，接口中 </font>**convertToPDF** 参数值设置成 true，如下图：

**<font style="color:#e8323c;background-color:#f9efcd;">注意：</font>**<font style="color:#e8323c;background-color:#f9efcd;">如果上传的文件本身就是PDF格式文件则不需要转换，</font>**<font style="color:#e8323c;background-color:#f9efcd;">convertToPDF</font>**<font style="color:#e8323c;background-color:#f9efcd;"> 需设置为</font>**<font style="color:#e8323c;background-color:#f9efcd;">false</font>**<font style="color:#e8323c;background-color:#f9efcd;">。</font>

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1651718412877-1bc8dbbd-66b7-4859-93b1-42baf607f1cd.png)

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1651718668718-fd9f7a31-34ba-45db-8af0-72d80be133ec.png)

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1651718746655-23671840-ef0a-4421-93eb-8aa40483d9bc.png)

### 步骤2：查看文件上传详情
<font style="color:rgb(38, 38, 38);">开发者使用</font>[【查询文件上传状态】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/qz4aip)<font style="color:rgb(38, 38, 38);">接口根据文件状态 </font>**<font style="color:rgb(38, 38, 38);">fileStatus</font>**<font style="color:rgb(38, 38, 38);"> 判断文件上传或转换结果，也可以通过文件下载地址 </font>**<font style="color:rgb(38, 38, 38);">fileDownloadUrl</font>**<font style="color:rgb(38, 38, 38);"> 查看上传后的文件样式内容等是否有问题。</font>

## ![](https://cdn.nlark.com/yuque/0/2022/png/447795/1651723454273-33fa583f-f139-4b18-a21e-7ff9e77b27d0.png)
### 步骤3：获取制作合同模板页面链接
<font style="color:rgb(38, 38, 38);">开发者使用</font>[【获取制作合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xagpot)<font style="color:rgb(38, 38, 38);">接口获取PDF模板的制作页面链接，通过此页面链接可以向模板中添加相关控件，以便后续接口向PDF模板中填充内容使用。接口中的 </font>**<font style="color:rgb(38, 38, 38);">fileId</font>**<font style="color:rgb(38, 38, 38);"> 参数值请填写步骤1中获取到的 </font>**<font style="color:rgb(38, 38, 38);">fileId</font>**<font style="color:rgb(38, 38, 38);"> 值</font>。如下图：

<font style="color:#e8323c;background-color:#f9efcd;">注意：该接口返回的创建模板页面链接的有效期是24小时，若之后需再次编辑PDF模板中的控件时，可使用已保存的模板ID：</font>**<font style="color:#e8323c;background-color:#f9efcd;">docTemplateId</font>** <font style="color:#e8323c;background-color:#f9efcd;">调用</font>[【获取编辑合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/lgb2go)<font style="color:#e8323c;background-color:#f9efcd;">接口获取编辑文件模板页面链接后进行相关编辑修改操作。</font>

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1651719228453-caa242a3-c7fc-4249-982b-89ad4a99a165.png)

### 步骤4：制作含填充控件的PDF模板
访问[【获取制作合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xagpot)<font style="color:rgb(38, 38, 38);">接口返回的</font>创建文件模板页面链接（**docTemplateCreateUrl参数值**），并在页面中拖动控件来制作模板。见如下图：

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1734925035327-9fb43517-648e-49a7-aed3-982ecbd51ad9.png)

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1734925016017-f1921dd1-b5d5-4fe9-9aca-d7347ea4eab3.png)

### 步骤5：获取PDF模板中控件详情
<font style="color:rgb(38, 38, 38);">开发者使用</font>[【查询合同模板中控件详情】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/aoq509)<font style="color:rgb(38, 38, 38);">接口可获取 PDF模板中的控件ID（e签宝自动生成）或控件Key（开发者自定义）及控件类型等参数，以便后续向PDF模板中填充内容使用。如下图：</font>

<font style="color:rgb(38, 38, 38);">控件类型与填充示例详见文中：</font>[控件填充示例说明](#Xd6Zh)

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1651721754933-975bbec3-de7d-40a2-a1ff-e928b4ffa1c7.png)

### 步骤6：填充数据将模板生成最终文件
<font style="color:rgb(38, 38, 38);">开发者使</font>用[【填充模板生成文件】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/mv8a3i)接<font style="color:rgb(38, 38, 38);">口 或者</font>[【获取填写合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ub4ncy)<font style="color:rgb(38, 38, 38);">接口，传入PDF模板中的控件ID或控件Key以及填充的数据即可填充模板生成文件。如下图：</font>

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1651721504656-3b2d1352-ce6d-40d6-aea9-077cc5de4815.png)

填充后打开**步骤6**返回的文件下载地址 **fileDownloadUrl **查看效果：

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1651721562081-e5bbe291-75d0-4dd0-888a-e24f6d2b8547.png)

开发者也可以通过**步骤2**的[【查询文件上传状态】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/qz4aip)接口随时查看下载填充后的文件（签署前）。

## API列表
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [上传本地文件](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256) | 此接口用来上传本地文件到e签宝服务端。 | **<font style="color:#E8323C;">必需</font>** |
| [查询文件上传状态](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/qz4aip) | 此接口可以查询文件的上传状态以及下载文件原文（模板填充后文件也可以下载检查填充内容）。 | **<font style="color:#52C41A;">建议</font>** |
| [获取制作合同模板页面](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xagpot) | <font style="color:rgb(64, 64, 64);">开发者或用户通过可视化的制作合同模板页面来添加各类控件。</font> | **<font style="color:#E8323C;">必需</font>** |
| [获取编辑合同模板页面](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/lgb2go) | <font style="color:rgb(64, 64, 64);">基于已创建的合同模板，可通过此接口再次获取模板的编辑页面修改模板控件。</font> | **<font style="color:#8C8C8C;">按需</font>** |
| [查询合同模板中控件详情](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/aoq509) | <font style="color:rgb(64, 64, 64);">此接口可以通过模板ID来获取模板中设置的所有控件信息，获取模板控件ID/控件Key等，用于后续填充具体的内容。</font> | **<font style="color:#52C41A;">建议</font>** |
| [填充模板生成文件](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/mv8a3i)<br/>[获取填写合同模板页面](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ub4ncy)<br/>**<font style="color:#DF2A3F;">（二选一即可）</font>** | <font style="color:rgb(64, 64, 64);">基于模板ID和模板中的控件来填充自定义的内容，最终生成一份待签署的PDF文件。</font> | **<font style="color:#E8323C;">必需</font>** |
| [删除合同模板](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/iwtpf3) | 此接口用于删除不需要的模板 | **<font style="color:#8C8C8C;">按需</font>** |
| [查询合同模板列表](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/mghz1g) | 查询当前appId下创建的所有文件模板列表 | **<font style="color:#8C8C8C;">按需</font>** |


## 控件填充示例说明
:::info
使用条件：使用e签宝在线模板制作方式制作的控件（包含本文中介绍的方式以及e签宝官网制作的模板）。

:::

| **<font style="color:#000000;">控件类型</font>** | **<font style="color:#000000;">控件描述</font>** | **<font style="color:#000000;">控件填充示例值</font>** | **<font style="color:#000000;">具体说明</font>** |
| --- | --- | --- | --- |
| <font style="color:#000000;">1</font> | 单行文本 | "具体文字XXXXX" | 填充的具体文字 |
| <font style="color:#000000;">2</font> | 数字 | "12345" | 支持整数和小数 |
| <font style="color:#000000;">3</font> | 日期 | "2022-04-20" | 日期支持yyyy/MM/dd，yyyy-MM-dd，yyyy年MM月dd日三种格式 |
| <font style="color:#000000;">8</font> | 多行文本 | "多行文字\n多行文字" | 填充的具体文字，\n进行换行 |
| <font style="color:#000000;">9</font> | 复选 | "[0,1,2]" | 从0开始排序，0代表选项1，1代表选项2.... |
| <font style="color:#000000;">10</font> | 单选 | "1" | 从0开始排序，0代表选项1，1代表选项2.... |
| <font style="color:#000000;">11</font> | 图片 | "ec71ce001a164066bfe11a66a9a001ca" | 需要将图片作为文件上传，获取到文件fileId作为value值传入（重复步骤1），[点击跳转 具体方法](https://qianxiaoxia.yuque.com/opendoc/helper/tdopf7x3me1hw4sy) |
| <font style="color:#000000;">14</font> | 下拉框 | "0" | 从0开始排序，0代表选项1，1代表选项2.... |
| <font style="color:#000000;">15</font> | 勾选框 | 旧版："true"、"false"<br/>新版："0"或"false" 、"1"或"true"、"2" | 旧版：true代表选勾选，false代表不选<br/>新版：0代表不选（false也支持），1代表选勾（true也支持），2代表选叉（模板配置需要开启叉选项才可用）<br/><font style="color:#DF2A3F;">【注】：若勾选框是必填项则不允许指定false和0</font> |
| <font style="color:#000000;">16</font> | 身份证号 | "11100019900101000X" | 18位身份证格式 |
| <font style="color:#000000;">19</font> | 手机号 | "13000000000" | 11位手机号码格式 |




