## 基础介绍
<font style="color:rgb(15, 17, 21);">支持在签署时添加独立的日期标识。该日期区域与签署区域分离，可自由设定其位置、字体样式及大小等，且不受签署区所在页码的限制。</font>

| **<font style="color:rgb(15, 17, 21);">对比项</font>** | **<font style="color:rgb(15, 17, 21);">签署区/备注区的签署日期（signDateConfig）</font>** | **<font style="color:rgb(15, 17, 21);">独立签署日期（dateSignFieldConfig）</font>** |
| --- | --- | --- |
| **<font style="color:rgb(15, 17, 21);">存在形式</font>** | <font style="color:rgb(15, 17, 21);">与签署区域紧密关联</font> | <font style="color:rgb(15, 17, 21);">与签署区域分离的独立区域</font> |
| **<font style="color:rgb(15, 17, 21);">位置限制</font>** | <font style="color:rgb(15, 17, 21);">默认显示在印章下方或同一页任意位置</font> | <font style="color:rgb(15, 17, 21);">可设置在文档任意页面，不受签署区页码限制</font> |


## 效果展示
### 签署区/备注区的签署日期
[点击跳转 添加签署日期](https://qianxiaoxia.yuque.com/opendoc/case3/yg6tb63yvnbdl7x3) 查看签署区/备注区的签署日期的效果展示

### 独立签署日期
![](https://cdn.nlark.com/yuque/0/2025/png/447795/1763969736301-741814e5-11fd-48ec-bad0-352b1cf14703.png)

## API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口获取签署方签署页面链接，可用于签署或预览。 | **<font style="color:#8C8C8C;">按需</font>** |


### <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
#### 相关参数   
+ **<font style="color:#DF2A3F;">signFieldType    </font>**签署区类型需指定：2（独立签署日期）
+ **<font style="color:#DF2A3F;">dateSignFieldConfig   </font>**独立签署日期配置项

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1763969971065-14f8a68e-2ad4-4574-a461-702e580811da.png)

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1763969902462-bd560125-9125-4cdf-8c27-225f7ea27d40.png)

**<font style="color:#000000;">指定独立签署日期代码案例：</font>**

```json
"signFields": [
  {
    "fileId": "请设置待签署文件的fileId",
    "signFieldType": 2,
    "dateSignFieldConfig": {
      "dateFormat":"yyyy年MM月dd日",
      "fontSize": 20,
      "signDatePositionPage": 2,
      "signDatePositionX": 150.0,
      "signDatePositionY": 200.0
    }
  }
]
```

