# 基础介绍
当发起合同签署后，个人用户默认是可以：手写签名或者姓名印章（后台会自动生成一个默认印章）两种方式二选一的。其中手写签名默认是普通手写方式，接口指定参数可以升级为AI校验手写签名。

# 效果展示
## 移动端个人签署
#### 普通手写
![](https://cdn.nlark.com/yuque/0/2022/gif/447795/1668649100761-e56c8863-e860-4db8-a25a-cb1e7a0cc625.gif)

#### AI校验手写
![](https://cdn.nlark.com/yuque/0/2022/gif/447795/1668653745291-9966ac6a-1a61-4875-9b6b-943628e4ef98.gif)

#### 姓名印章
![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668664470689-23122b29-cee9-43b4-b02f-35cc58925509.png)![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668664370071-80a2bd8e-86d7-4ef0-9026-7c2f6206c857.png)

## PC端个人签署
## ![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668649221903-cb895970-e994-4fb5-9215-85ca47c7730d.png)
## ![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668649336916-0169a749-6207-4ba2-9627-f43f0bf52c87.png)
# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口获取签署方签署页面链接，可用于签署或预览。 | **<font style="color:#8C8C8C;">按需</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
### 相关参数   
+ <font style="color:#DF2A3F;">psnSealStyles</font>（<font style="color:rgb(64, 64, 64);">页面可选个人印章样式，默认值：0和1（英文逗号分隔）；</font>**<font style="color:rgb(64, 64, 64);">0</font>**<font style="color:rgb(64, 64, 64);"> - 手写签名，</font>**<font style="color:rgb(64, 64, 64);">1</font>**<font style="color:rgb(64, 64, 64);"> - 姓名印章，</font>**<font style="color:rgb(64, 64, 64);">2</font>**<font style="color:rgb(64, 64, 64);"> - 手写签名AI校验</font>）

#### 升级AI校验手写方式
如果希望将普通手写升级为AI校验手写，那么按照以下案例方式传参数：

```json
"signers": [
    {
        "signFields": [
            {
                "normalSignFieldConfig": {
                    "psnSealStyles": "1,2"
                }
            }
        ]
    }
]
```

#### 只要手写签名或者只要姓名印章
只要普通手写签名方式：

```json
"signers": [
    {
        "signFields": [
            {
                "normalSignFieldConfig": {
                    "psnSealStyles": "0"
                }
            }
        ]
    }
]
```

只要AI校验手写签名方式：

```json
"signers": [
    {
        "signFields": [
            {
                "normalSignFieldConfig": {
                    "psnSealStyles": "2"
                }
            }
        ]
    }
]
```

只要姓名印章：

```json
"signers": [
    {
        "signFields": [
            {
                "normalSignFieldConfig": {
                    "psnSealStyles": "1"
                }
            }
        ]
    }
]
```



