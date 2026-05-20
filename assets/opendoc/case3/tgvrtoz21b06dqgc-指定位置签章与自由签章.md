# 基础介绍
当发起合同签署时，有两种用户签署模式可选择：

:::info
**指定位置签章：**接口提前指定固定签署位置，用户在签署页面直接点击签署在固定位置。

**自由签章：**接口不指定固定签署位置，用户在签署页面自由拖拽印章在任意位置签署。

:::

开发者可以根据自身需求，选择用以上哪种方式。一般建议使用：指定位置签章方式。

:::warning
**<font style="color:#E8323C;">开发者可以提前获得签字/盖章位置的XY坐标值，通过接口传入XY坐标值进行指定签署位置。</font>**

**<font style="color:#E8323C;">提前获取签署位置坐标参考方法：</font>**

**e签宝接口获取方式：**

+ [**获取拖章定位页面**](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/gw0r0w5qb5cx2ft6)**：**接口获取e签宝的拖章定位页面，设置好后开发者可以在 [获取签章位置信息通知](https://qianxiaoxia.yuque.com/opendoc/notify3/umvulch4szgrarh5) 中接收位置坐标等信息；
+ [**检索文件关键字坐标接口**](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ze0ahv)**：**检索PDF文件中所含关键字的所有XY坐标信息。例如：关键字是“甲方签名处”，则通过接口查询检索PDF文件中所有出现“甲方签名处”的位置对应XY坐标值。

**使用e签宝小工具：**

+ [**盖章位置XY坐标值计算小工具**](https://open.esign.cn/tools/seal-position)：页面上传文件拖章，右侧显示坐标位置和页码信息。（适用于签署文件比较固定，不需要开发程序定位场景）

**根据页面尺寸自己计算：**

+ [**印章图片尺寸和坐标**](https://qianxiaoxia.yuque.com/opendoc/helper/pqzqnf)**：**根据页面和印章大小自己计算盖章的X、Y坐标。

:::

# 效果展示
## 指定位置签章操作展示
![](https://cdn.nlark.com/yuque/0/2022/gif/447795/1667983134952-fe47c391-f4bf-49bf-803b-6fcb54d78418.gif)

## 自由签章操作展示
![](https://cdn.nlark.com/yuque/0/2022/gif/447795/1667983461198-ab18ecb3-c711-4c22-8723-bc0daea2ff24.gif)  


# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | <font style="color:rgb(64, 64, 64);">此接口获取签署方签署页面链接，可用于签署或预览。</font> | **<font style="color:rgb(140, 140, 140);">按需</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
### 相关参数   
+ <font style="color:#E8323C;">freeMode</font>（是否自由签章）
+ <font style="color:#E8323C;">movableSignField</font>（<font style="color:rgb(64, 64, 64);">页面是否可移动签章区</font>）
+ <font style="color:#E8323C;">signFieldStyle</font>（<font style="color:rgb(64, 64, 64);">签章区样式：</font>**<font style="color:rgb(64, 64, 64);">1</font>**<font style="color:rgb(64, 64, 64);"> - 单页签章，</font>**<font style="color:rgb(64, 64, 64);">2</font>**<font style="color:rgb(64, 64, 64);"> - 骑缝签章</font>）
+ <font style="color:#E8323C;">signFieldPosition</font>（<font style="color:rgb(64, 64, 64);">签章区位置信息</font>）

#### 指定位置签章--用户页面不可移动位置
+ <font style="color:#E8323C;">freeMode </font>默认：false（非自由签章），可不传；
+ <font style="color:#E8323C;">movableSignField </font>默认：false（不可移动签署区），可不传；
+ <font style="color:#E8323C;">signFieldStyle </font>设置为：1（<font style="color:rgb(64, 64, 64);">单页签章）；</font>
+ <font style="color:#E8323C;">signFieldPosition</font> 内传入具体的页码，X坐标和Y坐标。

```json
"signers": [
        {
            "signFields": [
                {
                    "normalSignFieldConfig": {
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "具体的签署区所在页码",
                            "positionX": 签署区X坐标值,
                            "positionY": 签署区Y坐标值
                        }
                    }
                }
            ]
        }
    ]
```

#### 指定位置签章--用户页面可移动位置
+ <font style="color:#E8323C;">freeMode </font>默认：false（非自由签章），可不传；
+ <font style="color:#E8323C;">movableSignField </font>设置为：true（可移动签署区）；
+ <font style="color:#E8323C;">signFieldStyle </font>设置为：1（<font style="color:rgb(64, 64, 64);">单页签章）；</font>
+ <font style="color:#E8323C;">signFieldPosition</font> 内传入具体的页码，X坐标和Y坐标。

```json
"signers": [
        {
            "signFields": [
                {
                    "normalSignFieldConfig": {
                        "movableSignField": true,
                        "signFieldStyle": 1,
                        "signFieldPosition": {
                            "positionPage": "具体的签署区所在页码",
                            "positionX": 签署区X坐标值,
                            "positionY": 签署区Y坐标值
                        }
                    }
                }
            ]
        }
    ]
```

#### 自由签章
+ <font style="color:#E8323C;">freeMode </font>设置为：true（自由签章）；
+ <font style="color:#E8323C;">movableSignField、signFieldStyle、signFieldPosition </font>均可不传。

```json
"signers": [
        {
            "signFields": [
                {
                    "normalSignFieldConfig": {
                        "freeMode": true
                    }
                }
            ]
        }
    ]
```





