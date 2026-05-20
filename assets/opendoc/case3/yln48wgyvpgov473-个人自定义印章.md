# 基础介绍
在用户第一次使用e签宝时，e签宝会根据用户姓名自动生成默认样式的模板印章，在签署时可以使用默认印章盖章，也可以在签署页面选择手绘的方式手写签名。但如果想要除默认样式以外的<font style="color:#DF2A3F;">其他自定义样式的个人模板印章</font>，或者需要使用和自己实体物理印章样式一样的印章<font style="color:#DF2A3F;">（可自主上传印章图片生成印章）</font>，可以参考本流程自定义创建用户印章。

:::warning
<font style="color:#DF2A3F;">注：平台方如果想要给个人用户自定义印章，需要提前给</font><font style="color:#E8323C;"> </font>[用户授权](https://qianxiaoxia.yuque.com/opendoc/case3/vvwxvh9gtdl30y3w)<font style="color:#E8323C;">（授权允许获取个人用户的印章等资源的管理权限）</font>

:::

# <font style="color:rgb(64, 64, 64);">效果展示</font>
## e签宝根据签署姓名生成的默认印章样式
![](https://cdn.nlark.com/yuque/0/2022/png/447795/1670235624392-5196c57c-41b3-455e-9146-4ce199ce04f0.png)

### 签署页效果
![](https://cdn.nlark.com/yuque/0/2022/png/447795/1670378012710-b8b0cd5f-d962-43c5-9263-3ae2f4f81686.png)

## 接口自定义印章样式
请点击：[个人印章样式展示](https://open.esign.cn/doc/opendoc/seal3/xl2yiv#pUNP1)

（可自定义印章颜色）

# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [获取个人认证&授权页面链接](https://open.esign.cn/doc/opendoc/auth3/rx8igf) | 此接口用来获取个人用户的授权链接，发起成功后会返回认证授权流程标识：**authFlowId**。（权限范围必须包含：**manage_psn_resource**） | **<font style="color:#8C8C8C;"></font>****<font style="color:#E8323C;">必需</font>** |
| **获取e签宝页面自定义印章****<font style="color:#DF2A3F;">（推荐）</font>** | | |
| [获取创建个人印章页面链接](https://open.esign.cn/doc/opendoc/seal3/cwc95p) | <font style="color:rgb(64, 64, 64);">通过接口获取e签宝可视化页面创建自定义印章，由个人用户选择印章的样式、内容等。</font> | **<font style="color:#8C8C8C;">按需</font>** |
| [获取管理个人印章页面链接](https://open.esign.cn/doc/opendoc/seal3/qksso1) | <font style="color:rgb(64, 64, 64);">通过接口获取e签宝可视化页面来操作管理个人印章。支持查看个人印章列表、创建印章、删除印章、设置默认印章、修改印章名称等操作。</font> | **<font style="color:#52C41A;">建议</font>** |
| **接口传参方式自定义印章** | | |
| [创建个人模板印章](https://open.esign.cn/doc/opendoc/seal3/tmtccg) | <font style="color:rgb(64, 64, 64);">使用e签宝提供的模板样式来制作个人印章。</font> | **<font style="color:#8C8C8C;">按需</font>** |
| [创建个人图片印章](https://open.esign.cn/doc/opendoc/seal3/yi2wca) | <font style="color:rgb(64, 64, 64);">上传本地印章图片来创建个人印章（需要提前将印章图片用接口上传到e签宝服务端）。</font> | **<font style="color:#8C8C8C;">按需</font>** |


## 获取管理个人印章页面链接案例
### 相关参数   
+ <font style="color:#E8323C;">psnId</font>（个人账号ID）：必须提前给 [【用户授权】](https://qianxiaoxia.yuque.com/opendoc/case3/vvwxvh9gtdl30y3w)（授权允许获取个人用户的印章等资源的管理权限），授权后可以通过 [【查询个人认证信息】](https://open.esign.cn/doc/opendoc/auth3/vssvtu) 接口或者通过[【授权完成通知】](https://open.esign.cn/doc/opendoc/notify3/demod3)的回调通知获取个人账号ID。

### <font style="color:rgb(64, 64, 64);">代码案例</font>
**请求参数**

```json
{
    "psnId":"7ffcaed8c*****a1d8f0ef0a8f6"
}

```

**响应参数**

```json
{
    "message": "成功",
    "code": 0,
    "data": {
        "psnSealCreateUrl": "https://smlh5.esign.cn/auth/guide?loginId=66345861-4218-******-67298456c1c0"
    }
}
```

### 获取的印章页面链接展示参考
![](https://cdn.nlark.com/yuque/0/2022/png/447795/1670377652663-ae3d621d-4913-4241-96b9-9c425eb74a1c.png)

**点击上图右上角的【印章申请】按钮后页面展示：**

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1670377450620-c67d9b14-5d62-4423-9844-570504bf6075.png)

