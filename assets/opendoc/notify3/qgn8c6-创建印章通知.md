回调通知Url地址配置方式和回调通知数据接收，详见[印章回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/ynu21s)。

印章创建成功后，e签宝将根据开发者设置的[印章回调通知地址](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/ynu21s#Ngtbv)，发送业务类型`**<font style="color:#FFA940;background-color:#E9E9E9;">action</font>**`为 **<font style="color:#E8323C;">"</font>****<font style="color:#E8323C;">SEAL_CREATE</font>****<font style="color:#E8323C;">" </font>**的回调通知，开发者可根据返回参数`**<font style="color:#FFA940;background-color:#E9E9E9;">psnId</font>**`（个人账号ID）和`**<font style="color:#FFA940;background-color:#E9E9E9;">orgId</font>**`（机构账号ID）判断印章归属个人还是机构。

#### 回调参数
| **参数名称** | **必填** | **参数类型** | **参数说明** |
| --- | :---: | :---: | --- |
| action | 是 | string | 通知业务类型，固定值：**<font style="color:#E8323C;">SEAL_CREATE</font>** |
| sealId | 是 | string | 印章ID（印章编号） |
| customBizNum | 否 | <font style="color:rgb(64, 64, 64);">string</font> | 自定义业务编号（通过**页面方式**创建个人/机构印章时传了此参数则返回此参数值；如果通过接口直接创建印章默认返回空字符串） |
| sealName | 是 | string | 印章名称 |
| sealCreateMode | 是 | string | 制章方式<br/>**template** - 模板印章<br/>**file **- 图片印章（上传本地文件）<br/>**hand-draw **- 手绘印章 |
| psnId | 否 | string | 印章所属个人账号ID<font style="color:#E8323C;">（创建个人印章时返回此字段）</font> |
| orgId | 否 | string | 印章所属机构账号ID<font style="color:#E8323C;">（创建机构印章时返回此字段）</font> |
| sealBizType | 否 | string | 印章业务类型<br/>**PUBLIC **- 公章<br/>**CONTRACT **- 合同专用章<br/>**<font style="color:rgb(64, 64, 64);">PERSONNEL </font>**<font style="color:rgb(64, 64, 64);">- 人事专用章</font><br/>**FINANCE **- 财务专用章<br/>**LEGAL_PERSON**<font style="color:rgb(23, 43, 77);"> </font>- 法定代表人章<br/>**COMMON **- 其他 |
| bodyVersion | 是 | string | 印章回调通知版本，默认V3，开发者可忽略。 |


#### 回调示例
创建个人模板印章成功时：

```json
{
    "action":"SEAL_CREATE",
    "bodyVersion": "V3",
    "customBizNum":"这是一串开发者内部系统自定义的编号",
    "psnId":"c7e0029***541e7",
    "sealBizType":"COMMON",
    "sealCreateMode":"template",
    "sealId":"407ebea9-xx-xx-xx-6edd90bace74",
    "sealName":"个人自定义印章"
}
```

创建机构模板印章成功时：

```json
{
    "action":"SEAL_CREATE",
    "bodyVersion": "V3",
    "customBizNum":"这是一串开发者内部系统自定义的编号",
    "orgId":"0c5bd42***8bfbf",
    "sealBizType":"CONTRACT",
    "sealCreateMode":"template",
    "sealId":"96977756-xx-xx-xx-f1d5da34b8db",
    "sealName":"xx企业合同专用章"
}
```

