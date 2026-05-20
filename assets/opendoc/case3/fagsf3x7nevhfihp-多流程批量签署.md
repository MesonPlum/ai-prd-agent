# 基础介绍
<font style="color:rgb(64, 64, 64);">当一个签署人名下有多笔流程需要签署时</font><font style="color:rgb(15, 17, 21);">（如张三需分别与不同的的人签署），常规流程需要多个签署链接、多次身份验证，操作繁琐。使用</font>**<font style="color:rgb(15, 17, 21);">多流程批量签署</font>**<font style="color:rgb(15, 17, 21);">功能，用户可通过一个链接一次性完成所有待签合同的签署，全程仅需</font>**<font style="color:rgb(15, 17, 21);">一次身份认证</font>**<font style="color:rgb(15, 17, 21);">。</font>

:::info
**<font style="color:rgb(15, 17, 21);">适用场景：</font>**

+ <font style="color:rgb(15, 17, 21);">同一自然人有多笔不同的流程待签；</font>
+ <font style="color:rgb(15, 17, 21);">签署类型可混合（个人签署、经办人代企业盖章等）。</font>

:::

# <font style="color:rgb(64, 64, 64);">效果展示</font>
## PC端批量签署操作展示
<font style="color:#E8323C;">（点击具体文件标题可以预览当前合同详情）</font>

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1669792738742-03f2873d-e100-4bff-af04-c2bfc2ca89bc.png)

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1669792761689-399068bf-c5ea-400f-9070-d3bcd585bc94.png)

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1669792506395-bb62fe5d-d8b3-4814-ab71-7c6ffb7d4462.png)

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1669792812400-eda7d9a1-c5ee-440b-b213-4a1842b8646c.png)

## 移动端批量签署操作展示
<font style="color:#E8323C;">（点击具体文件标题可以预览当前合同详情）</font>

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1669775115383-76282df9-a175-4e51-bf6d-608cd8e6a7b6.png)![](https://cdn.nlark.com/yuque/0/2022/png/447795/1669775143847-fac2bb9c-b741-4790-b519-51d4161e1552.png)![](https://cdn.nlark.com/yuque/0/2022/png/447795/1669775177864-e39b19d4-d8d9-41fa-9aa7-aa959f483ff5.png)

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1669775236590-04b573e0-c79e-4fea-bb38-56cd768e5454.png)![](https://cdn.nlark.com/yuque/0/2022/png/447795/1669775298865-3f098573-f3a5-496c-b850-7c80b80dd0fd.png)

# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [查询签署流程列表](https://open.esign.cn/doc/opendoc/pdf-sign3/kq4b2e) | <font style="color:rgb(64, 64, 64);">此接口可以查询某个签署方名下的指定时间范围内的所有签署中/已完成的签署流程列表。</font> | **<font style="color:rgb(82, 196, 26);">建议</font>** |
| [获取批量签页面链接（多流程）](https://open.esign.cn/doc/opendoc/pdf-sign3/sq4xxq) | <font style="color:rgb(64, 64, 64);">此接口用于获取指定签署人名下的多份待签合同页面，签署人进行一次认证即可同时完成多个流程签署。</font> | **<font style="color:#E8323C;">必需</font>** |


## 获取批量签页面链接（多流程）接口代码案例
### 相关参数   
+ <font style="color:#E8323C;">operatorId</font>（签署操作人的账号ID）：本次操作批量签署的签署人。
+ <font style="color:#E8323C;">signFlowIds</font>（待签署流程ID列表）：数组类型，可传入多个待签署流程<font style="color:#E8323C;">（默认最多支持10个流程）</font>。
+ <font style="color:#E8323C;">forcedRead</font>（是否强制阅读）：若传入true（强制阅读），则必须在页面点击每个文件标题进行合同预览后才可以选择印章签署。
+ <font style="color:#E8323C;">clientType</font>（指定客户端类型）：一般默认ALL，自动适配移动端或者PC端，也可以单独指定H5或者PC。
+ <font style="color:#E8323C;">redirectUrl</font>（重定向地址）：用户批量签署后，点击完成按钮自动跳转的重定向跳转地址。

### <font style="color:rgb(64, 64, 64);">代码案例</font>
```json
{
    "operatorId": "7ffcaed8c******8f0ef0a8f6",
    "redirectUrl": "https://www.esign.cn/",
    "forcedRead": true,
    "clientType": "ALL",
    "signFlowIds": [
        "20707914******18b6068",
        "7a18094d****4f589fe1f",
        "8c2d467*****e5f88094d7"
    ]
}
```



