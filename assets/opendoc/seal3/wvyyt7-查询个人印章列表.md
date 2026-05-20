> [**必须确保个人用户已授予平台appId获取其印章资源管理权限，点击查看如何授权**](https://qianxiaoxia.yuque.com/opendoc/auth3/rx8igf)
>
> + **manage_psn_resource - 授权允许获取个人用户的印章等资源的管理权限**
>

### 接口描述
查询个人账号下的印章列表信息。

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/seals/psn-seal-list?psnId=xx&pageNum=1&pageSize=20

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| psnId | string | 是 | query | 个人账号ID<br/><font style="color:#E8323C;">【注】</font>用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用[【查询个人认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/vssvtu)接口通过个人账号标识（手机号或邮箱）/个人用户的证件号进行查询 |
| pageNum | int32 | 是 | query | 查询页码 |
| pageSize | int32 | 是 | query | 每页显示的数量，最大值：20 |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | total | | | | int64 | 否 | 查询印章记录条数 |
| | seals<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | array | 否 | 印章列表信息 |
| |  | sealId | | | string | 否 | 印章ID |
| | | sealName | | | string | 否 | 印章名称 |
| | | sealCreateTime | | | int64 | 否 | 印章创建时间，[Unix时间戳](https://baike.baidu.com/item/unix%E6%97%B6%E9%97%B4%E6%88%B3/2078227?fr=aladdin)格式，单位毫秒。 |
| | | defaultSealFlag | | | boolean | 否 | 是否为个人默认印章<br/>**true **-默认印章，**false **-非默认印章 |
| | | sealHeight | | | int32 | 否 | 印章高度（单位毫米mm） |
| | | sealWidth | | | int32 | 否 | 印章宽度（单位毫米mm） |
| | | sealStyle | | | int32 | 否 | 印章制作方式<br/>**2 **- 个人模板印章<br/>**3** - 图片印章<br/>**4** - 个人手绘印章 |
| | | sealStatus | | | int32 | 否 | 印章状态<br/>**1 **- 已启用，**2 **- 待审核，**3 **- 审核不通过 |
| | | statusDescription | | | string | 否 | 印章状态描述 |
| | | rejectReason | | | string | 否 | 审核意见，审核不通过时此参数会返回审核不通过的原因 |
| | | sealImageDownloadUrl | | | string | 否 | 印章图片（带水印）下载地址<font style="color:#E8323C;">（有效期60分钟）</font> |


### 请求示例
```http
GET https://openapi.esign.cn/v3/seals/psn-seal-list?psnId=c7e007**41e7&pageNum=1&pageSize=20
```

### 响应示例
```json
{
  "message": "成功",
  "code": 0,
  "data": {
    "total": 1,
    "seals": [
      {
        "sealId": "1caebb40-xx-xx-xx-31f7f95087de",
        "sealName": "这是一个自定义的名称",
        "sealCreateTime": 1651731716000,
        "defaultSealFlag": false,
        "sealWidth": 20,
        "sealHeight": 20,
        "sealStyle": 2,
        "sealStatus": 1,
        "statusDescription": "已启用",
        "rejectReason": "",
        "sealImageDownloadUrl": "https://esignoss.esign.cn/seal-service/xx-xx-xx-xx-xx/xx-xx-xx-xx-xx-openseal.png?Expires=xx&OSSAccessKeyId=xx&Signature=xx"
      }
    ]
  }

```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gqgb0gwznb2su405)

