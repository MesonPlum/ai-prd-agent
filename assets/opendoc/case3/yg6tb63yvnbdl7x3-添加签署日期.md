# 基础介绍
当发起合同签署时，可以在签章/签字的同时，添加签署的日期。可以默认显示在印章下方，也可以自由指定其他位置、大小、格式。

:::warning
<font style="color:#E8323C;">注：印章和签署时间必须在同一页码内。建议直接默认指定在印章下方，无需额外计算签署时间的坐标位置。</font>

:::

# 效果展示
![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668061134621-50e7d372-4229-406a-b404-099252dc738b.png)![](https://cdn.nlark.com/yuque/0/2025/png/447795/1763969601190-b093f199-4501-47cb-a7bd-b0d4781ebd99.png)

# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口获取签署方签署页面链接，可用于签署或预览。 | **<font style="color:#8C8C8C;">按需</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
### 相关参数   
+ <font style="color:#E8323C;">signDateConfig</font>（<font style="color:rgb(64, 64, 64);">签署日期配置项</font>）

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1690439695722-2189e329-96ac-47dd-8012-b4de1536e99e.png)

#### 签署日期默认在印章下方
+ <font style="color:#E8323C;">dateFormat</font>（日期格式）和 <font style="color:#E8323C;">fontSize</font>（日期大小）按需传值。
+ <font style="color:#E8323C;">showSignDate</font> 设置为：1（固定位置显示）。
+ <font style="color:#E8323C;">signDatePositionX</font>（签署日期位置X坐标）<font style="color:rgb(64, 64, 64);"> 和 </font><font style="color:#E8323C;">signDatePositionY</font>（签署日期位置X坐标） 不需要指定具体的值，签署时间默认会在印章下方（但用户手动签署时可自主移动日期位置，自动签署时固定在印章下方）。

```json
"signers": [
    {
        "signFields": [
            {
                "signDateConfig": {
                    "dateFormat": "yyyy年MM月dd日",
                    "fontSize": 20,
                    "showSignDate": 1
                }
            }
        ]
    }
]
```

#### 固定签署日期位置--坐标固定
+ <font style="color:#E8323C;">dateFormat</font>（日期格式）和 <font style="color:#E8323C;">fontSize</font>（日期大小）按需传值。
+ <font style="color:#E8323C;">showSignDate</font> 设置为：1（固定位置显示）。
+ <font style="color:#E8323C;">signDatePositionX</font>（签署日期位置X坐标）<font style="color:rgb(64, 64, 64);"> 和 </font><font style="color:#E8323C;">signDatePositionY</font>（签署日期位置X坐标） <font style="color:rgb(64, 64, 64);">传入具体的坐标位置，坐标定位点为日期左下角。</font>

```json
"signers": [
    {
        "signFields": [
            {
                "signDateConfig": {
                    "dateFormat": "yyyy-MM-dd HH:mm:ss",
                    "fontSize": 20,
                    "showSignDate": 1,
                    "signDatePositionX": 200,
                    "signDatePositionY": 50
                }
            }
        ]
    }
]
```

#### 不固定签署日期位置--用户自由编辑
+ <font style="color:#E8323C;">showSignDate</font> 设置为：2（不固定位置显示）。
+ <font style="color:#E8323C;">signDatePositionX</font><font style="color:#E8323C;">、</font><font style="color:#E8323C;">signDatePositionY</font><font style="color:#E8323C;">、</font><font style="color:#E8323C;">dateFormat、</font><font style="color:#E8323C;"> </font><font style="color:#E8323C;">fontSize </font>均不传值，传了也不会生效。

```json
"signers": [
    {
        "signFields": [
            {
                "signDateConfig": {
                    "showSignDate": 2
                }
            }
        ]
    }
]
```

**不固定签署时间位置--用户自由编辑效果如下**

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1699867725783-c989bafc-2750-427e-8126-b3bcdebbca0a.png)![](https://cdn.nlark.com/yuque/0/2023/png/447795/1699867646540-b18e4880-4374-4c09-b996-ac070723630a.png)![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668073969061-88015930-741c-4192-a8d6-31160f833e7f.png)![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668074007963-43e5eee3-6e01-4425-be11-28668b5113a2.png)![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668074120446-7f5b6c33-4436-44f8-a142-b81b59e8af06.png)v

