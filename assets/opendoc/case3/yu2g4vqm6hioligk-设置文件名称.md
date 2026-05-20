## 基础介绍
<font style="color:rgb(15, 17, 21);">开发者在发起签署时传入文件名称 </font>`<font style="color:rgb(15, 17, 21);background-color:rgb(235, 238, 242);">fileName</font>`<font style="color:rgb(15, 17, 21);">，即可自定义签署页面及最终存储的文件名称。</font>

`<font style="color:rgb(15, 17, 21);background-color:rgb(235, 238, 242);">fileName</font>`<font style="color:rgb(15, 17, 21);"> </font><font style="color:rgb(15, 17, 21);">用于定义并显示待签署文件的名称，主要作用如下：</font>

+ <font style="color:rgb(15, 17, 21);">文件标识：在签署页面中向签署方清晰展示文件名称，便于识别当前签署内容。</font>
+ <font style="color:rgb(15, 17, 21);">文件存储：签署完成后，该名称将作为已签署文件的存储文件名。</font>

:::warning
**<font style="color:#DF2A3F;">文件名称</font>**`**<font style="color:#DF2A3F;">fileName</font>**`**<font style="color:#DF2A3F;">参数格式要求：</font>**

+ 禁止包含以下 9 种特殊字符：/ \ : * " < > | ？ 以及所有 emoji 表情符号。
+ 文件名长度限制：不超过 100 个字符（包括 .pdf 后缀）。

:::

## 效果展示
### PC端-单份文件展示效果
![](https://cdn.nlark.com/yuque/0/2025/png/447795/1762853218463-66530a94-d32b-4563-9c23-35f212765545.png)

### PC端-多份文件展示效果
![](https://cdn.nlark.com/yuque/0/2025/png/12359635/1755518369640-f903ff21-3a78-405f-adfa-656265e6e267.png)

### 移动端-单份文件展示效果
![](https://cdn.nlark.com/yuque/0/2025/png/12359635/1755517395175-a43019eb-60de-4832-9671-da2847efd972.png)

### 移动端-多份文件展示效果
![](https://cdn.nlark.com/yuque/0/2025/png/12359635/1755518748399-0558b7a9-0e91-49c7-ae45-ae103bc417ed.png)    ![](https://cdn.nlark.com/yuque/0/2025/png/12359635/1755518811266-e6751a31-6f20-4966-8f42-f85cc0f59098.png)

## API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | <font style="color:rgb(64, 64, 64);">此接口获取签署方签署页面链接，可用于签署或预览。</font> | **<font style="color:rgb(140, 140, 140);">按需</font>** |


### 基于文件发起签署接口代码案例
#### 相关参数
+ **<font style="color:#DF2A3F;">fileName</font>**<font style="color:#DF2A3F;">  </font>文件名称（需要添加PDF文件后缀名，“xxx.pdf”）

![](https://cdn.nlark.com/yuque/0/2025/png/12359635/1755517835673-83f984cd-7eef-456b-bcbc-6c3186978eac.png)

<font style="color:#DF2A3F;">注：如发起签署时未指定文件名称，则取</font>[《上传本地文件》](https://open.esign.cn/doc/opendoc/pdf-sign3/rlh256)<font style="color:#DF2A3F;">接口传入的文件名称（fileName）。</font>

##### 指定文件名称入参样例
```json
{
    "docs": [
        {
            "fileId": "文件id",
            "fileName": "测试1.pdf"
        },
         {
            "fileId": "文件id",
            "fileName": "测试2.pdf"
        }
    ]
}
```



