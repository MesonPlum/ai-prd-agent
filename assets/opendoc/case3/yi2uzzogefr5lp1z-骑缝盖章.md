# 基础介绍
线下签署场景中骑缝盖章是在签订合同的时候进行盖的一种印记，能够防止合同文件中有增减码的作用，防止文件发生意外以及保证文件的完整性，避免在签订合同之后产生不必要的麻烦。但其实电子签名只需要一个电子签章就可以保护整个PDF的所有内容的防篡改。故此，电子签名中的骑缝盖章主要是为了文件打印后能有骑缝章。

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668665882628-b5289d53-d416-41e3-9b6b-61a65e91e996.png)

# 效果展示
## 移动端骑缝盖章
#### ![](https://cdn.nlark.com/yuque/0/2022/gif/447795/1668669727675-54deddaa-f014-483b-9485-be3187829842.gif)
## PC端骑缝盖章
## ![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668669787736-7416a471-ff53-41f1-970b-eafe20890170.png)
## ![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668669813873-41dac299-6b5d-42d1-b52e-1a7c349db540.png)
# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口获取签署方签署页面链接，可用于签署或预览。 | **<font style="color:#8C8C8C;">按需</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
### 相关参数
+ <font style="color:#E8323C;">signFieldStyle</font>（<font style="color:rgb(64, 64, 64);">签章区样式；</font>**<font style="color:rgb(64, 64, 64);">1</font>**<font style="color:rgb(64, 64, 64);"> - 单页签章，</font>**<font style="color:rgb(64, 64, 64);">2</font>**<font style="color:rgb(64, 64, 64);"> - 骑缝签章</font>）
+ <font style="color:#E8323C;">signFieldPosition</font><font style="color:rgb(64, 64, 64);">（签章区位置信息）</font>

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668670142928-6f6e28dc-ef81-4856-b619-c30e67dfc3c3.png)

#### 全部页码盖骑缝盖
一般骑缝盖章是在文件右侧全部页码都盖，平分一个章。此方式不用指定具体的页码。

+ <font style="color:#E8323C;">signFieldStyle</font><font style="color:rgb(232, 50, 60);"> </font><font style="color:rgb(64, 64, 64);">设置为：2（骑缝签章）；</font>
+ <font style="color:#E8323C;">acrossPageMode</font><font style="color:rgb(232, 50, 60);"> </font><font style="color:rgb(64, 64, 64);">设置为：ALL（全部页盖骑缝章），默认值，不传也可以；</font>
+ <font style="color:#E8323C;">positionPage</font><font style="color:rgb(64, 64, 64);"> 和 </font><font style="color:#E8323C;">positionX</font><font style="color:rgb(64, 64, 64);"> 无需传入（传了也不生效）；</font>
+ <font style="color:#E8323C;">positionY</font><font style="color:rgb(64, 64, 64);"> 指定Y坐标值，确定印章的上下位置。</font>

```json
"signers": [
    {
        "signFields": [
            {
                "normalSignFieldConfig": {
                    "signFieldStyle": 2,
                    "signFieldPosition": {
                        "acrossPageMode": "ALL",
                        "positionY": 300
                    }
                }
            }
        ]
    }
]
```

#### 指定页码盖骑缝章
如果不希望全部页码平分一个章，可以自行指定盖章页码，平分一个章。（要签署完的文件才能看到效果，签署链接的展示页看不到具体盖在哪些页码）

+ <font style="color:#E8323C;">signFieldStyle</font><font style="color:rgb(232, 50, 60);"> </font><font style="color:rgb(64, 64, 64);">设置为：2（骑缝签章）；</font>
+ <font style="color:#E8323C;">acrossPageMode</font><font style="color:rgb(232, 50, 60);"> </font>设置为：AssignedPages（指定页码盖骑缝章）；
+ <font style="color:#E8323C;">positionPage</font><font style="color:rgb(64, 64, 64);"> 传入具体的盖章页码；</font>
+ <font style="color:rgb(64, 64, 64);"></font><font style="color:#E8323C;">positionX</font><font style="color:rgb(64, 64, 64);"> 无需传入（传了也不生效）；</font>
+ <font style="color:#E8323C;">positionY</font><font style="color:rgb(64, 64, 64);"> 指定Y坐标值，确定印章的上下位置。</font>

```json
"signers": [
    {
        "signFields": [
            {
                "normalSignFieldConfig": {
                    "signFieldStyle": 2,
                    "signFieldPosition": {
                        "acrossPageMode": "AssignedPages",
                        "positionPage": "1,3,5",
                        "positionY": 300
                    }
                }
            }
        ]
    }
]
```



