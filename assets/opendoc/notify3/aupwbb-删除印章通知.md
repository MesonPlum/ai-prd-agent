回调通知Url地址配置方式和回调通知数据接收，详见[印章回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/ynu21s)。

当印章被删除后，e签宝将根据开发者设置的[印章回调通知地址](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/ynu21s)，发送业务类型`**<font style="color:#FFA940;background-color:#E9E9E9;">action</font>**`为 **<font style="color:#E8323C;">"</font>****<font style="color:#E8323C;">SEAL_DELETE</font>****<font style="color:#E8323C;">" </font>**的回调通知。

#### 回调参数
| **参数名称** | **必填** | **参数类型** | **参数说明** |
| --- | :---: | :---: | --- |
| action | 是 | string | 通知业务类型，固定值：**<font style="color:#E8323C;">SEAL_DELETE</font>** |
| sealId | 是 | string | 印章ID（印章编号） |
| sealName | 是 | string | 印章名称 |
| sealCreateMode | 是 | string | 制章方式<br/>**template** - 模板印章<br/>**file **- 图片印章（上传本地文件）<br/>**hand-draw **- 手绘印章 |
| psnId | 否 | string | 印章所属个人账号ID<font style="color:#E8323C;">（删除个人印章时返回此字段）</font> |
| orgId | 否 | string | 印章所属机构账号ID<font style="color:#E8323C;">（删除机构印章时返回此字段）</font> |
| sealBizType | 否 | string | 印章业务类型<br/>**PUBLIC **- 公章<br/>**CONTRACT **- 合同专用章<br/>**FINANCE **- 财务专用章<br/>**PERSONNEL** - 人事专用章<br/>**LEGAL_PERSON **- 法定代表人章<br/>**COMMON **- 其他 |
| bodyVersion | 是 | string | 印章回调通知版本，默认V3，开发者可忽略。 |
| sealStatus | 是 | string | 删除印章状态 <br/>**delete** - 已删除（该印章之前<font style="color:#DF2A3F;">未被使用过</font>，完全删除）<br/>**revoke** - 已吊销（该印章之前<font style="color:#DF2A3F;">被使用过</font>，用印记录保留） |


#### 回调示例
印章被删除时：

```json
{
    "action": "SEAL_DELETE",
    "bodyVersion": "V3",
    "orgId": "3c4047cc32b24ca111445940279134e7",
    "sealBizType": "PERSONNEL",
    "sealCreateMode": "template",
    "sealId": "146530fe-816d-1111-b3ba-3a9616f70833",
    "sealName": "测试人事专用章",
    "sealStatus": "delete"
}
```



