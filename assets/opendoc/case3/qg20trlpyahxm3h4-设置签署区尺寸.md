## 基础介绍
发起签署时，支持分别设置签署页面上签署区的显示尺寸与实际盖章的印章物理尺寸。此功能主要用于文件页面非标准A4大小的场景，确保印章的视觉比例与文件实际尺寸相匹配。

## 效果展示
### 1、不设置签署区尺寸（默认效果）
**不设置签署区尺寸参数时，以默认印章原始尺寸盖章效果：****<font style="color:#DF2A3F;">（个人印章76px，企业印章159px）</font>**

![](https://cdn.nlark.com/yuque/0/2025/png/1965556/1758695303771-ff31bb47-f9a4-40b7-8a4d-3a67941101bb.png)

![](https://cdn.nlark.com/yuque/0/2025/png/1965556/1758696954673-3d85ef73-8bd2-4774-9199-faf313bdbd8d.png)



### 2、设置印章尺寸
**设置签署区尺寸（即实际盖章的印章物理尺寸），signFieldSize=500px 盖章效果：****<font style="color:#DF2A3F;">（宽高等比例缩放）</font>**

![](https://cdn.nlark.com/yuque/0/2025/png/1965556/1758695448308-6eace80e-3bd6-4057-bacb-cfa98ed94098.png)

![](https://cdn.nlark.com/yuque/0/2025/png/1965556/1758697060692-38c7ce4f-76ce-4d6f-b3b7-4c6adb189a96.png)

****

### 3、设置签署区宽高
**设置签署区显示的宽高：signFieldWidth=300px，signFieldHeight=100px 盖章效果：**

![](https://cdn.nlark.com/yuque/0/2025/png/1965556/1758695628949-8da9e829-fe72-45bb-9b2d-400e532cc3b9.png)

![](https://cdn.nlark.com/yuque/0/2025/png/1965556/1758696752356-75f1cfcd-a65e-4723-a37b-6e469e1ddaa9.png)

:::warning
<font style="color:#DF2A3F;">注：</font>

+ <font style="color:#DF2A3F;">设置签署区尺寸不会导致实际盖章的印章图片出现畸变，始终以设置的最小尺寸为准保持等比例缩放。</font>
+ <font style="color:#DF2A3F;">以上效果为pdf文件尺寸为A4大小的显示效果，实际盖章的效果建议以实测为准。</font>
+ <font style="color:#DF2A3F;">如果实际业务需要根据PDF尺寸动态缩放获取印章尺寸可以参考该文档的算法自行动态计算：</font>[请点击跳转 根据PDF文件尺寸计算印章缩放比例](https://qianxiaoxia.yuque.com/opendoc/helper/lpretydv51dpkxan)

:::

# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口获取签署方签署页面链接，可用于签署或预览。 | **<font style="color:#8C8C8C;">按需</font>** |


### 基于文件发起签署接口代码案例
#### 相关参数
+ **<font style="color:#DF2A3F;">signFieldSize</font>**<font style="color:#DF2A3F;">  </font>签章区尺寸（正方形的边长，单位为px）
+ **<font style="color:#DF2A3F;">signFieldWidth   </font>**签署区宽度（矩形的左右边距距离，单位为px）
+ **<font style="color:#DF2A3F;">signFieldHeight</font>**<font style="color:#DF2A3F;">  </font>签署区高度（矩形的上下边距距离，单位为px）

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1764042174036-aacfacd6-6e51-4f09-bff2-602b87e0f3da.png)



**设置签署区尺寸（即实际盖章的印章物理尺寸）signFieldSize：**

```json
"normalSignFieldConfig": {
  "signFieldSize": 300,
  "signFieldPosition": {
    "positionPage": "1",
    "positionX": 200,
    "positionY": 478
  }
}
```

**设置签署区显示的宽高signFieldWidth、signFieldHeight：**

```json
"normalSignFieldConfig": {
  "signFieldWidth": "300",
  "signFieldHeight": "100",
  "signFieldPosition": {
    "positionPage": "1",
    "positionX": 200,
    "positionY": 478
  }
}
```







