# 基础介绍
附件：指签署合同的附属材料（无需签名的文件，仅用于查看）。

希望在发起签署合同的同时添加仅用于查看预览、无需签署的文件时，可以参考此流程。

:::warning
<font style="color:#E8323C;">注：附件文件的格式不限，可以是.doc、.docx、.</font><font style="color:#E8323C;">jpg等多种格式，无需转换成PDF文件。</font>

:::

# 效果展示
## 手机H5端展示效果
![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668392675469-8b958045-6cb6-4fa9-b1ea-d0ad53fc825b.png)![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668392946086-931b4109-ad8a-40ed-a7dc-54f6a9e4b286.png)![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668392750357-c7c76286-b7a1-4350-95f1-0c13577be59b.png)

## 电脑PC端展示效果
![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668392588236-87f9ef42-070d-42b3-8e74-0c2f93fdeaea.png)

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668392541545-46c81778-e01e-4c49-8184-e36f5d18828b.png)

# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [上传本地文件](https://open.esign.cn/doc/opendoc/pdf-sign3/rlh256) | 此接口用于<font style="color:rgb(64, 64, 64);">发起签署前的附件的上传与生成。</font> | **<font style="color:#E8323C;">必需</font>** |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | <font style="color:rgb(64, 64, 64);">此接口获取签署方签署页面链接，可用于签署或预览。</font> | **<font style="color:rgb(140, 140, 140);">按需</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
### 相关参数   
+ <font style="color:#E8323C;">attachments</font>（设置附属材料信息）

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668393055411-bf362977-fd57-4b06-8918-07261098f65b.png)

#### 添加附件案例
+ <font style="color:#E8323C;">fileId </font>传入[【上传本地文件】](https://open.esign.cn/doc/opendoc/file-and-template3/rlh256)接口返回的<font style="color:rgb(51, 51, 51);">文件ID。</font>
+ <font style="color:#E8323C;">fileName </font>传入<font style="color:rgb(64, 64, 64);">附属材料名称。</font>

```json
  "attachments": [
        {
            "fileId": "d49338cc*****528cc21",
            "fileName": "软件清单"
        }
    ]
```

```json
"attachments": [
        {
            "fileId": "d49338c****b528cc21",
            "fileName": "软件清单1"
        },
         {
            "fileId": "cc338ccac****8b528cc21",
            "fileName": "软件清单2"
        },
         {
            "fileId": "e59338cc****8b528cc21",
            "fileName": "软件清单3"
        }
    ],
```

#### 
