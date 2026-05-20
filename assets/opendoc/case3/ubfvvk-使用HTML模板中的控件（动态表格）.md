## 
## 场景说明
:::info
**当合同中有不固定的内容需要填充，需要提前制作合同模板并进行填充。**

**当模板中的表格需要动态增加行并填充内容时，可以参考本流程。**

:::

## 动态表格相关解释说明
![](https://cdn.nlark.com/yuque/0/2022/png/432598/1658342355993-94bd3d25-c00e-4179-97f5-b6c75588fa51.png)

:::info
<font style="color:#E8323C;">建议先</font>[点击此处观看上图所对应的《动态表格中行列及单元格介绍》视频](https://qianxiaoxia.yuque.com/docs/share/99b2a7c3-f697-4a78-92b1-6f5667c76f6a)<font style="color:#E8323C;">，快速了解一下动态表格的行、列及单元格知识，然后再阅读文中其他章节内容。</font>

:::

在JSON结构中，动态表格中的行用 row 来表示，列用 column 来表示，单元格用K-V键值对来表示。

单元格的Key值是由 column 和数字共同组成（如column1），单元格的Key值在页面设置动态表格控件后，由e签宝系统自动按规则生成。详见[单元格Key值解释说明](#VsJOp)。

开发者可通过[【查询合同模板中控件详情】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/aoq509)接口来查询单元格Key名称，并取返回JSON里 tableContent 下 row 对象中的 Key值，如下图所示：

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1650620870970-f0037529-1525-448c-b466-e2090a570718.png)

## 动态表格填充的步骤
### 步骤1：上传本地文件并转成HTML格式
开发者参考[【上传本地文件】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256)将本地文件上传到e签宝服务端，此接口需要生成HTML格式文件，非HTML格式文件上传，接口中 convertToHTML 参数值设置成 true，如下图：

:::warning
**<font style="color:#E8323C;">注意：</font>**

<font style="color:#E8323C;">1.上传的文件是.doc 或 .docx 格式时才可以被转换成 HTML 格式，其他文件均不支持转成 HTML 格式。</font>

<font style="color:#E8323C;">2.不支持直接上传HTML 格式的文件。</font>

:::

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1650595409534-1e278ed4-412a-4828-8f78-9327502e6e76.png)

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1650595672232-f0580299-a9f9-49c3-94f1-401e55e45615.png)

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1650769035307-f010cba3-d112-4744-beb4-0393538d5edd.png)

### 步骤2：查看文件上传状态及详情
<font style="color:rgb(38, 38, 38);">开发者使用</font>[【查询文件上传状态】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/qz4aip)<font style="color:rgb(38, 38, 38);">接口根据文件状态 </font>**<font style="color:rgb(38, 38, 38);">fileStatus</font>**<font style="color:rgb(38, 38, 38);"> 判断文件上传或转换结果，也可以通过文件下载地址 </font>**<font style="color:rgb(38, 38, 38);">fileDownloadUrl</font>**<font style="color:rgb(38, 38, 38);"> 查看上传后的文件样式内容等是否有问题。</font>

## ![](https://cdn.nlark.com/yuque/0/2023/png/447795/1693277695353-3f76968a-17b1-45b9-aadd-f8e2b70804b9.png)
### 步骤3：获取制作合同模板页面链接
开发者使用[【获取制作合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xagpot)接口获取HTML模板的制作页面链接，通过此页面链接可以向HTML模板中添加相关控件，以便后续接口向HTML模板中填充内容使用。

:::warning
<font style="color:#E8323C;">注意：</font>[【获取制作合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xagpot)<font style="color:#E8323C;">接口返回的创建模板页面链接的有效期是24小时，若之后需再次编辑HTML模板中的控件时，可使用已保存的模板ID调用</font>[【获取编辑合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/lgb2go)<font style="color:#E8323C;">接口获取编辑文件模板页面链接后进行相关编辑修改操作。</font>

:::

[【获取制作合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xagpot)接口中的 fileId 参数值请填写步骤1中获取到的 fileId 值，同时 docTemplateType 参数值请填写 1（HTML模板）。如下图：

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1650595909670-f481961f-48c7-4bf8-9a62-29122fb98d89.png)

### 步骤4：制作含动态表格控件的HTML模板
访问[【获取制作合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xagpot)<font style="color:rgb(38, 38, 38);">接口返回的</font>创建文件模板页面链接（**docTemplateCreateUrl参数值**），并在页面中拖动【动态表格】控件来制作模板。如下图：

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1734946948177-1c5c9f8f-12f7-4a9f-8406-5119923ee898.png)

可自由添加或者删除行和列。<font style="color:#E8323C;">列是制作的表格的时候就要固定的（后续填充内容时无法新增列）</font>，行可以在添加内容的时候通过入参来插入新行。

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1734947265518-fb7639d0-0c6c-4831-990a-97e1b0f5b685.png)

可以固定一些不需要填充到表格的文本内容（点击表格输入的内容即是固定不需要填充的值）

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1734947361270-7a1985b3-aa2b-4d97-b359-cb3f95c37daa.png)

输入后案例如下：

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1650599423575-e00abd14-b927-486d-8dde-e8973a6723a6.png)

也可以加一些非动态表格外的其他控件：

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1734947505176-fbd045a2-d51d-4849-93b6-9e9f263bac8e.png)

### 步骤5：获取 HTML 模板中控件ID和控件Key
开发者使用[【查询合同模板中控件详情】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/aoq509)接口获取 HTML 模板中的控件ID和控件Key，以便后续向HTML模板中填充内容使用。如下图：

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1650597054202-afdf0384-4cc9-43b2-b2b9-31545ab23498.png)

:::info
关于动态表格控件的解释说明，详见 [tableContent 的解释说明](#AWzvV)。

:::

### 步骤6：构造数据并填充模板生成文件
<font style="color:rgb(38, 38, 38);">开发者使用</font>[【填充模板生成文件】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/mv8a3i)<font style="color:rgb(38, 38, 38);">或者</font>[【获取填写合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ub4ncy)<font style="color:rgb(38, 38, 38);">接口，传入HTML 模板中的控件ID或控件Key以及构造的数据即可填充模板生成文件。如下图：</font>

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1650598860846-79baa2fb-ac96-49eb-b413-97b687f7a7b7.png)

```json
{
    "components": [
        {
            "componentKey": "tableKey",
            "componentValue": "[{\"row\":{\"column1\":\"姓名\",\"column2\":\"联系电话\",\"column3\":\"家庭住址\",\"column4\":\"健康情况\"}},{\"row\":{\"column1\":\"e签宝\",\"column2\":\"0571-XXXXX\",\"column3\":\"杭州\",\"column4\":\"健康\"}},{\"row\":{\"column1\":\"张三\",\"column2\":\"\",\"column3\":\"北京\",\"column4\":\"亚健康\"}},{\"row\":{\"column1\":\"李四\",\"column2\":\"13000000000\",\"column3\":\"上海\",\"column4\":\"不健康\"}},{\"insertRow\":\"true\",\"row\":{\"column1\":\"王五\",\"column2\":\"\",\"column3\":\"广州\",\"column4\":\"可能健康\"}},{\"insertRow\":\"true\",\"row\":{\"column1\":\"不知道\",\"column2\":\"\",\"column3\":\"深圳\",\"column4\":\"健康么\"}}]"
        },
        {
            "componentKey": "text1",
            "componentValue": "你好，杭州"
        },
        {
            "componentKey": "mobile",
            "componentValue": "13000001111"
        }
    ],
    "docTemplateId": "634dceaf16064a35b9efb2f842940b42",
    "fileName": "填充模板-测试"
}
```



若表格行数据超过了HTML模板中动态表格控件已设置的行数，构造表格数据时**<font style="color:#E8323C;">insertRow必须填写为true（"insertRow":"true"）</font>**，要先插入行后进行填充，否则内容填充不到表格中。

例如：表格只有四行，那么想要加入第五行或者在表格中间插入一行，必须加入 **<font style="color:#E8323C;">"insertRow":"true"</font>**。如不加，则无法新增行进行填充。

**<font style="color:#E8323C;">（案例中前两行的内容设置模板时已经写入，所以前两行就算填充时更改内容，表格内容也不会变）</font>**

```json
[
    {
        "row":{
            "column1":"姓名",
            "column2":"联系电话",
            "column3":"家庭住址",
            "column4":"健康情况"
        }
    },
    {
        "row":{
            "column1":"e签宝",
            "column2":"0571-XXXXX",
            "column3":"杭州",
            "column4":"健康"
        }
    },
    {
        "row":{
            "column1":"张三",
            "column2":"",
            "column3":"北京",
            "column4":"亚健康"
        }
    },
    {
        "row":{
            "column1":"李四",
            "column2":"13000000000",
            "column3":"上海",
            "column4":"不健康"
        }
    },
    {
        "insertRow":"true",
        "row":{
            "column1":"王五",
            "column2":"",
            "column3":"广州",
            "column4":"可能健康"
        }
    },
    {
        "insertRow":"true",
        "row":{
            "column1":"不知道",
            "column2":"",
            "column3":"深圳",
            "column4":"健康么"
        }
    }
]
```

传入 componentValue 的表格填充内容必须是JSON格式的字符串（注意JSON字符串需进行转义处理），详见[动态表格的 componentValue 参数值解释说明](#wqYLa)。示例如下：

```json
{
    "componentValue": "[{\"row\":{\"column1\":\"姓名\",\"column2\":\"联系电话\",\"column3\":\"家庭住址\",\"column4\":\"健康情况\"}},{\"row\":{\"column1\":\"e签宝\",\"column2\":\"0571-XXXXX\",\"column3\":\"杭州\",\"column4\":\"健康\"}},{\"row\":{\"column1\":\"张三\",\"column2\":\"\",\"column3\":\"北京\",\"column4\":\"亚健康\"}},{\"row\":{\"column1\":\"李四\",\"column2\":\"13000000000\",\"column3\":\"上海\",\"column4\":\"不健康\"}},{\"insertRow\":\"true\",\"row\":{\"column1\":\"王五\",\"column2\":\"\",\"column3\":\"广州\",\"column4\":\"可能健康\"}},{\"insertRow\":\"true\",\"row\":{\"column1\":\"不知道\",\"column2\":\"\",\"column3\":\"深圳\",\"column4\":\"健康么\"}}]"
}
```

填充效果如下：

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1650598922588-73e94243-4664-4445-8f94-5ea9a850efeb.png)

<font style="color:rgb(38, 38, 38);">开发者使用</font>[【查询文件上传状态】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/qz4aip)接<font style="color:rgb(38, 38, 38);">口获取填充后文件链接，通过此链接可查看填充后文件效果。如下图：</font>

## ![](https://cdn.nlark.com/yuque/0/2022/png/447795/1650598897076-578e09b6-af19-4e9a-93e9-141ddc07ed24.png)
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


## 文末附录
### tableContent 的解释说明
[【查询合同模板中控件详情】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/aoq509)接口返回JSON中的 tableContent （表格行列内容）是一个JSON数组对象，其格式如下：

```json
"tableContent":[{"row":{"column1":"value1"}}]
```

**解释说明：** 

tableContent 中的 row 就是动态表格中的行数据，row 的个数就是动态表格制作时所添加的表格行数。 row 中的 column1 就是当前行中列为column1上的单元格Key值，column2就是列为column2上的单元格Key值。 row 中的 value1 就是当前行中某个单元格的Value值，单元格未设置固定值时此value1为""空字符串，当单元格已设置了固定值时此value1就是所设置的固定值。如下图：

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1650738187336-dcdc263b-a171-4ce1-a4da-cb714f557ae1.png)

### 动态表格的 componentValue 参数值解释说明
在填充HTML模板中的动态表格控件时，componentValue 参数值必须是一个JSON格式的字符串，因此，开发者需要先将待填充表格数据构建成一个JSONArray对象，然后再转成JSON格式字符串后作为 componentValue 参数值传入接口。

动态表格的 JSONArray 结构如下：

```json
[
  {
    "insertRow":"true=新增行并填充内容 | false=向已有行填充内容", 
    "row":{
      "column1":"当前行中第一列上单元格要填充的内容",
      "column2":"当前行中第二列上单元格要填充的内容",
      "columnN":"当前行中第N列上单元格要填充的内容"
    }
  }
]
```

**<font style="color:#E8323C;">重要说明：</font>**

上述结构中 row 节点下的 Key值 为当前行的单元格Key名称，由 column 和 数字 共同组成。

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1650623788971-4ef5570e-6916-462c-9c69-584d734c1590.png)

```json
{
  "components":[
    {
      "componentId":"c8e21XXX",
      "componentValue":"[{\"insertRow\":\"true\",\"row\":{\"column1\":\"《JSON必知必会》\",\"column2\":\"28.00\",\"column3\":\"人民邮电出版社\",\"column4\":\"平装\",\"column5\":\"1本\"}}]"
    }
  ],
  "docTemplateId":"bcb20ca793ea47a0b22d575eff4b0c85",
  "fileName":"综合填充模板-测试.pdf"
}
```

### 单元格Key值解释说明
单元格Key值是由 column 和数字共同组成（如column1），在页面设置动态表格控件后，由e签宝系统自动按规则生成。开发者可通过[【查询合同模板中控件详情】](https://open.esign.cn/doc/opendoc/file-and-template3/aoq509)接口来查询单元格Key名称，并取返回JSON里 tableContent 下 row 对象中的 Key值，如下图所示：

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1650620870970-f0037529-1525-448c-b466-e2090a570718.png)

