回调通知Url地址配置方式和回调通知数据接收，详见[印章回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/ynu21s)。

创建图片印章后，印章将经过e签宝人工审核，审核通过的印章方可变更为“已启用”状态。

当人工审核反馈结果时，e签宝将根据开发者设置的[印章回调通知地址](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/ynu21s)，发送业务类型`**<font style="color:#FFA940;background-color:#E9E9E9;">action</font>**`为 **<font style="color:#E8323C;">"</font>****<font style="color:#E8323C;">SEAL_AUDIT</font>****<font style="color:#E8323C;">" </font>**的回调通知，除此之外，开发者也可调用【查询个人印章】或【查询机构自有印章】接口获取印章状态相关信息。

#### 回调参数
| **参数名称** | **必填** | **参数类型** | **参数说明** |
| --- | :---: | :---: | --- |
| action | 是 | string | 通知业务类型，固定值：**<font style="color:#E8323C;">SEAL_AUDIT</font>** |
| sealId | 是 | string | 印章ID（印章编号） |
| sealName | 是 | string | 印章名称 |
| auditStatus | 是 | string | 图片印章审核结果 <br/>**1** - 通过 ，**0** - 驳回 |
| statusDescription | 是 | string | 审核结果的描述 |
| customBizNum | 否 | <font style="color:rgb(64, 64, 64);">string</font> | 自定义业务编号（通过**页面方式**创建个人/机构印章时传了此参数则返回此参数值；如果通过接口直接创建印章默认返回空字符串） |
| rejectReason | 否 | string | 驳回原因 |
| psnId | 否 | string | 印章所属个人账号ID<font style="color:#E8323C;">（个人图片印章时返回此字段）</font> |
| orgId | 否 | string | 印章所属机构账号ID<font style="color:#E8323C;">（机构图片印章时返回此字段）</font> |
| sealBizType | 否 | string | 印章业务类型<br/>**PUBLIC **- 公章<br/>**CONTRACT **- 合同专用章<br/>**FINANCE **- 财务专用章<br/>**LEGAL_PERSON **- 法定代表人章<br/>**COMMON **- 其他 |
| bodyVersion | 是 | string | 印章回调通知版本，默认V3，开发者可忽略。 |


#### 回调示例
图片印章审核通过时：

```json
{
    "action":"SEAL_AUDIT",
    "auditStatus":1,
    "bodyVersion": "V3",
    "psnId":"c7e00294**41e7",
    "rejectReason":"",
    "sealBizType":"COMMON",
    "sealId":"af80ba0f-xx-xx-xx-a2da292d7f7f",
    "sealName":"赵四的图片印章",
    "statusDescription":"通过"
}
```

图片印章审核不通过时：

```json
{
    "action":"SEAL_AUDIT",
    "auditStatus":0,
    "bodyVersion": "V3",
    "psnId":"c7e00294***41e7",
    "rejectReason":"印章内容不符合要求，请重新修改。",
    "sealBizType":"COMMON",
    "sealId":"61af34af-xx-xx-xx-7039b6c110a5",
    "sealName":"赵四的图片印章2",
    "statusDescription":"驳回"
}
```

