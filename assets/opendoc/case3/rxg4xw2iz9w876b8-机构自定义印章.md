# 基础介绍
**<font style="color:rgb(64, 64, 64);">机构：</font>**<font style="color:rgb(64, 64, 64);">组织机构是企业、事业单位、机关、社会团体及其他依法成立单位的统称。</font>

在机构第一次使用e签宝时，e签宝会根据机构名称自动生成默认样式的模板印章，在签署时可以使用默认印章盖章。如果想要除默认样式以外的<font style="color:#DF2A3F;">其他自定义样式的机构模板印章</font>，或者需要使用和自己实体物理印章样式一样的印章<font style="color:#DF2A3F;">（可自主上传印章图片生成印章）</font>，可以参考本流程自定义创建机构用户印章。

:::warning
<font style="color:#DF2A3F;">注：平台方如果想要给机构用户自定义印章，需要提前给</font><font style="color:#E8323C;"> </font>[用户授权](https://qianxiaoxia.yuque.com/opendoc/case3/vvwxvh9gtdl30y3w)<font style="color:#E8323C;">（授权允许获取企业/组织用户的印章、组织成员等资源的管理权限）</font>

:::

# <font style="color:rgb(64, 64, 64);">效果展示</font>
## e签宝根据签署机构名称生成的默认印章样式
请点击：[机构默认印章样式展示](https://open.esign.cn/doc/opendoc/helper/rtbg98#vftRL)

### 签署页效果
#### PC端展示
![](https://cdn.nlark.com/yuque/0/2022/png/447795/1670381597825-0f4a1e62-1db2-458a-91d2-b66ec155c26e.png)

#### 移动端展示
![](https://cdn.nlark.com/yuque/0/2022/png/447795/1670381653592-3e29dbfc-40fc-44b9-8e76-f3b8fb31d0bb.png)![](https://cdn.nlark.com/yuque/0/2022/png/447795/1670381721238-b3a896ea-0ffe-48ad-81c1-987a83c77ca8.png)

## 接口自定义印章样式
请点击：[机构印章样式展示](https://open.esign.cn/doc/opendoc/seal3/xl2yiv#IOrtZ)

# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [获取机构认证&授权页面链接 ](https://open.esign.cn/doc/opendoc/auth3/kcbdu7) | 此接口用来获取企业机构用户的授权链接，发起成功后会返回认证授权流程标识：**authFlowId**。（权限范围必须包含：**manage_org_resource**） | **<font style="color:#E8323C;">必需</font>** |
| **获取e签宝页面自定义印章****<font style="color:#DF2A3F;">（推荐）</font>** | | |
| [获取创建机构印章页面链接](https://open.esign.cn/doc/opendoc/seal3/qxfxq0) | <font style="color:rgb(64, 64, 64);">通过接口获取e签宝可视化页面创建自定义印章，由机构用户选择印章的样式、内容等。</font> | **<font style="color:#8C8C8C;">按需</font>** |
| [获取管理机构印章页面链接](https://open.esign.cn/doc/opendoc/seal3/dcef94) | <font style="color:rgb(64, 64, 64);">通过接口获取e签宝可视化页面来操作管理机构印章。支持查看机构印章列表、创建印章、删除印章、设置默认印章、修改印章名称等操作。</font> | **<font style="color:#52C41A;">建议</font>** |
| **接口传参方式自定义印章** | | |
| [创建机构模板印章](https://open.esign.cn/doc/opendoc/seal3/igfmd2) | <font style="color:rgb(64, 64, 64);">使用e签宝提供的模板样式来制作机构印章。</font> | **<font style="color:#8C8C8C;">按需</font>** |
| [创建机构图片印章](https://open.esign.cn/doc/opendoc/seal3/lggz9w) | <font style="color:rgb(64, 64, 64);">上传本地印章图片来创建机构印章（需要提前将印章图片用接口上传到e签宝服务端）。</font> | **<font style="color:#8C8C8C;">按需</font>** |


## 获取管理机构印章页面链接案例
### 相关参数   
+ <font style="color:#DF2A3F;">orgId</font>（机构账号ID）：必须提前给 [【用户授权】](https://qianxiaoxia.yuque.com/opendoc/case3/vvwxvh9gtdl30y3w)（授权允许获取企业/组织用户的印章、组织成员等资源的管理权限），授权后可以通过 [【查询机构认证信息】](https://open.esign.cn/doc/opendoc/auth3/xxz4tc)接口或者通过[【授权完成通知】](https://open.esign.cn/doc/opendoc/notify3/demod3)的回调通知获取机构账号ID。
+ <font style="color:#DF2A3F;">transactorPsnId</font>（机构经办人账号ID）：必须确保经办人在该机构的成员中，拥有[【印章管理权限】](https://open.esign.cn/doc/opendoc/employee/qhbzzmq2a7r03kyo)。建议直接由法定代表人或者机构管理员来操作。

### <font style="color:rgb(64, 64, 64);">代码案例</font>
**请求参数**

```json
{
    "orgId":"3c4047c*****5940279134e7",
    "transactorPsnId": "7ffcaed8c*****f0ef0a8f6"
}


```

**响应参数**

```json
{
    "message": "成功",
    "code": 0,
    "data": {
        "orgSealManageUrl": "https://smlh5.esign.cn/auth/guide?loginId=3695343e-******-8363-f1d20fcfeae7"
    }
}
```

### 获取的印章页面链接展示参考
![](https://cdn.nlark.com/yuque/0/2022/png/447795/1670383491425-4525ecb8-22a2-45a1-9fe3-7bf31345449a.png)

**点击上图右上角的【新增企业印章】按钮后页面展示：**

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1670383320655-71a9ae70-a69e-4456-8899-a2fb258b8292.png)

