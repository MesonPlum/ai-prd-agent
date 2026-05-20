## 基础介绍
一键落章即在一个签署流程中签署人只需拖拽一次印章，即可一次性完成所有签署区的落章。

:::info
**适用场景与配置说明：**

1、一个签署方在**单个文档**中有多个签署区。默认配置即支持“单文档一键落章”场景。

2、一个签署方在**多个文档**中各有签署区。如需支持“多文档一键落章”场景，<font style="color:#DF2A3F;">需登录e签宝开放平台配置开启</font>（[见下文](#Uv6Re)）。

:::

## 效果展示
签署页面的一键落章功能是通过控制页面内是否展示**<font style="color:#000000;">“同时盖在所有签署区”</font>**<font style="color:#000000;">按钮来实现的（PC端按钮命名是</font>**<font style="color:#000000;">“一键批量落章”</font>**<font style="color:#000000;">），默认是展示并开启的。</font>

### 单文档一键落章（移动端）
![](https://cdn.nlark.com/yuque/0/2025/gif/40550546/1755503694425-eb2f62a5-1b38-4cf2-8936-bcecc2ae08cf.gif)

### 多文档一键落章（移动端）
![](https://cdn.nlark.com/yuque/0/2025/gif/40550546/1755503735297-55005eb2-486c-465f-a90b-714a61c9487e.gif)

### 一键落章展示效果（PC端）
![](https://cdn.nlark.com/yuque/0/2025/png/447795/1763953335285-ba22ac3d-a8e7-4517-9a80-ec606a1e47ab.png)

## 开放平台配置说明
1、登录e签宝[开发者控制台](https://open.esign.cn/my-apps/home)中，页面确认进入对应企业空间下-左侧进入【应用管理】-【我的应用】；

2、找到需要配置的应用ID，点击【配置】；

![](https://cdn.nlark.com/yuque/0/2025/png/46341124/1756724479364-7f3357cc-e877-416c-a901-19f851f7cb97.png)

3、点击页面的【参数配置】-【签署服务】，找到【一键落章类型】，默认是：【单文档一键落章】，可改成【多文档一键落章】。

![](https://cdn.nlark.com/yuque/0/2025/png/40550546/1756951534526-ae891401-76aa-44b2-9d54-e405e18de9c0.png)

## API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | <font style="color:rgb(64, 64, 64);">此接口获取签署方签署页面链接，可用于签署或预览。</font> | **<font style="color:rgb(140, 140, 140);">按需</font>** |


### 基于文件发起签署接口代码案例
#### 相关参数
+ **<font style="color:#DF2A3F;">showBatchDropSealButton</font>**<font style="color:#000000;">   签署页面是否显示“同时盖在所有签署区”按钮（一键落章功能），默认值 true</font>

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1763952773211-db93367c-763b-491d-8b2d-693dbdcb7c78.png)

**<font style="color:#000000;">指定是否展示”同时盖在所有签署区“按钮相关代码：</font>**

```json
"signFlowConfig": {    
  "signConfig": {
    "showBatchDropSealButton": true
  }
}
```

<font style="color:#DF2A3F;"></font>

<font style="color:#DF2A3F;">注：如配置不展示“同时盖在所有签署区”按钮，则页面需要每个签署区单独选章，不能一键落章。</font>

```json
"signFlowConfig": {    
  "signConfig": {
    "showBatchDropSealButton": false
  }
}
```

