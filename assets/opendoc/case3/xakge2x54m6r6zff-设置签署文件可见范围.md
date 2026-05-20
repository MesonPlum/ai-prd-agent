## 基础介绍
本场景用于控制签署人在签署流程中仅可查看需由其签署的合同文件，系统将自动隐藏其无需签署的其他合同，确保合同信息的隔离与隐私。基于这个场景下可设置签署文件可见范围相关参数。

:::warning
<font style="color:#DF2A3F;">注：签署方经办人不能同时是合同发起方的管理员、法定代表人或发起人。因发起方角色默认可查看全部合同，此时本配置对其不生效。</font>

:::

## 效果展示
#### 原始流程中能看到所有文件：
![](https://cdn.nlark.com/yuque/0/2025/png/447795/1763627297774-e2e84355-47b2-4ff1-9848-616a1d35566b.png)

#### 设置可见范围只可见其中两个文件效果：
#### ![](https://cdn.nlark.com/yuque/0/2025/png/447795/1763627321238-b427496b-5a66-4036-9918-08d11ab1701b.png)
## API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | <font style="color:rgb(64, 64, 64);">此接口获取签署方签署页面链接，可用于签署或预览。</font> | **<font style="color:rgb(140, 140, 140);">按需</font>** |


### 基于文件发起签署接口代码案例
#### 相关参数
+ **<font style="color:#DF2A3F;">docsViewLimited</font>**  是否开启签署方的文件查看范围限制，默认不开启
+ **<font style="color:#DF2A3F;">docsViewType</font>**  签署方可见文件类型：2：仅允许查看自身签署的文件和指定文件
+ **<font style="color:#DF2A3F;">viewableFileIds</font>**  指定签署方允许查看的文件id列表

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1763954756341-3fa77436-a866-435e-adec-58ae3380c5b8.png)

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1763954786709-7f586a76-0c8b-4bee-b12d-23f3fe4f57a2.png)

#### 指定签署文件可见范围的部分代码示例
```json
"docs":[
  {
    "fileid":"c4170102*******04fcfc630" 
  },
  {
    "fileid":"fcda5a4c2*********3699a339684"
  },
  {
    "fileid":"d286b6a24******c1d867fc56616"
  }
]
```

```json
"signFlowConfig":{
  "docsViewLimited":true,
}
```

```json
"signers": [
  {
    "signConfig": {
      "docsViewType":2,
      "viewableFileIds":[
        "c4170102*******04fcfc630",
        "fcda5a4c2*********3699a339684"
      ]
    }
  }
]
```































