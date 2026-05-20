> [**必须确保企业用户已授予平台appId获取其印章资源管理权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/kcbdu7)
>
> + **manage_org_seal - 授权允许获取企业/组织用户的印章的查询、新增、编辑、授权、删除权限**
>

### 接口描述
上传本地印章图片来创建机构印章。

:::info
+ <font style="color:rgb(38, 38, 38);">图片印章的初始状态为</font>**<font style="color:rgb(38, 38, 38);">“待审核”</font>**<font style="color:rgb(38, 38, 38);">，创建成功后需经过e签宝AI校验审核或人工审核（1-2个工作日），审核通过后状态变更为</font>**<font style="color:rgb(38, 38, 38);">“已启用”</font>**<font style="color:rgb(38, 38, 38);">，用户也可在印章管理列表页中查看印章。</font>
+ <font style="color:rgb(38, 38, 38);">印章创建成功，e签宝将会向开发者推送</font>[【创建印章通知】](https://open.esign.cn/doc/opendoc/notify3/qgn8c6)<font style="color:rgb(38, 38, 38);">。</font>
+ <font style="color:rgb(38, 38, 38);">开发者可通过接收</font>[【图片印章审核结果通知】](https://open.esign.cn/doc/opendoc/notify3/fygpxq)<font style="color:rgb(38, 38, 38);">获取审核的结果。</font>

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/seals/org-seals/create-by-image

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| orgId | string | 是 | body | 机构账号ID<br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)接口通过组织机构名称/组织机构证件号进行查询 |
| sealImageFileKey | string | 是 | body | 印章图片的fileKey，此参数值在[上传印章图片](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/gd1tsb#GeZvg)接口进行图片上传后获取。 |
| sealName | string | 是 | body | 印章名称（用户自定义，且名称不可重复） |
| sealWidth | int32 | 是 | body | 印章宽度（单位：mm，上限为100mm） |
| sealHeight | int32 | 是 | body | 印章高度（单位：mm，上限为100mm） |
| sealColor | string | 否 | body | 印章颜色（默认值为 RED）<br/>**RED **- 红色，**BLUE **- 蓝色，**BLACK **- 黑色，**PURPLE **- 紫色 |
| sealBizType | string | 否 | body | 印章业务类型<br/>**PUBLIC **- 公章<br/>**CONTRACT **- 合同专用章<br/>**PERSONNEL **- 人事专用章<br/>**FINANCE **- 财务专用章<br/>**COMMON **- 其他 |
| imageProcess | boolean | 否 | body | 是否需要对图片做背景处理<font style="color:#DF2A3F;">（默认值 true）</font><br/>**true** - 需要处理（进行抠图和颜色绘制）<br/>**false** - 不需要处理（不进行抠图和颜色绘制） |
| manualAudit    | boolean | 否 | body | 是否需要不经过AI直接走e签宝人工审核（人工审核需要上传印章备案材料），默认false<br/>**true** - 是<br/>**false** - 否<br/><font style="color:#E8323C;">【注】当传true时，下方sealFilingMaterials必须传入</font> |
| sealFilingMaterials | list | 否 | body | 印章备案材料fileKey，此参数值在[上传印章图片](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/gd1tsb#GeZvg)接口进行图片上传后获取。<br/><font style="color:#E8323C;">【注】</font><br/>（1）支持jpg/jpeg/png/bmp/doc/pdf格式的文件<br/>（2）文件大小不超过2M |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | <font style="color:rgb(64, 64, 64);">sealId</font> | | | | string | 否 | 印章ID（开发者需妥善保存印章编号） |


### 请求示例
```json
{
  "orgId": "0c5bd492**48bfbf",
  "sealImageFileKey": "$c3c7170e-xx-xx-xx-xx",
  "sealName": "这是一个自定义的印章名称",
  "sealWidth": "20",
  "sealHeight": "10",
  "sealBizType": "CONTRACT"
}
```

### 响应示例
```json
{
    "message": "成功",
    "code": 0,
    "data": {
        "sealId": "6de1900f-xx-xx-xx-f3292b7b6599"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gqgb0gwznb2su405)

