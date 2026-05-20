### 接口描述
将两份OFD文件合并成一份OFD文件。<font style="color:#DF2A3F;">（有且仅支持两份文件，不允许单次合并多份文件）</font>

:::info
**该接口主要用于匹配电子保函场景：**

1、政府发起招标，企业A去投标，客户B为企业A做保，并盖了一份电子保函，但是保函里的投标内容和金额不能展示出来，需要隐藏掉，称之为【密文保函】；

2、政府开标之后，中标文件需要公示，此时需要将原保函中的投标内容和金额给展示出来，称之为【明文保函】；  
3、【密文保函】和【明文保函】需要合并为一份文件，再盖一次章，所以需要上述的合并接口。

:::

### 接口地址
> 点击下述蓝色字体{host}可跳转至API请求域名说明文档
>

接口地址：https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/files/merge-ofd-files

### 请求方式
<font style="color:#333333;">POST</font>

### 请求头
提供两种安全接入方式，**开发者可选择其中一种方式进行对接**，对应参数如何获取，参考文档【[请点击](https://qianxiaoxia.yuque.com/books/share/b9160fa7-723b-420f-805b-53fa1d49154a/qudd9a)】。

#### 方式一：请求签名鉴权<font style="color:#F5222D;">（优先推荐）</font>
请求头入参示例如下：

| **<font style="color:black;">参数名称</font>** | **<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>** |
| --- | --- | :---: | --- |
| X-Tsign-Open-App-Id | string | 是 | 项目ID |
| Content-Type | string | 是 | application/json;charset=UTF-8 |
| X-Tsign-Open-Ca-Timestamp | string | 是 | API 调用者传递时间戳，值为当前时间的毫秒数，也就是从1970年1月1日起至今的时间转换为毫秒，时间戳有效时间为15分钟，为了防重放攻击 |
| Accept | string | 是 | <font style="color:#000000;">建议统一填写 */*</font> |
| X-Tsign-Open-Ca-Signature | string | 是 | 签名字符串 |
| Content-MD5 | string | 否 | 当请求 Body 非 Form 表单时，可以计算 Body 的 MD5 值传递给云网关进行 Body MD5 校验。建议当请求 Body 非 Form 表单时，加上此请求头。 |
| X-Tsign-Open-Auth-Mode | string | 是 | <font style="color:#262626;">选择请求方式进行鉴权，固定值，Signature</font> |


#### 方式二：OAuth2.0鉴权<font style="color:#F5222D;">（不推荐使用）</font>
当安全接入选择**OAuth2.0鉴权方式**，[请点击](https://qianxiaoxia.yuque.com/books/share/b9160fa7-723b-420f-805b-53fa1d49154a/yiiorw)查阅详情。

### 请求参数
| **<font style="color:black;">参数名称</font>** | **<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **参数类型** | **<font style="color:black;">参数说明</font>** |
| --- | :---: | :---: | :---: | --- |
| finishFileId | string | 是 | body | 已完成签署的OFD文件（接口描述案例中的【密文保函】）<br/><font style="color:#DF2A3F;">【注】：</font><br/>+ 如果需要带入已签署文件内的电子签名，需要将签署后文件重新通过[《上传本地文件》](https://open.esign.cn/doc/opendoc/pdf-sign3/rlh256)接口上传获取新的fileId<br/>+ 如果不需要带入已签署文件内电子签名，只需要原始文件展示，可直接传入第一次签署时fileId |
| addFileId | string | 是 | body | 明文追加OFD文件（接口描述案例中的【明文保函】）<br/><font style="color:#DF2A3F;">【注】：</font><br/>+ 需要通过[《上传本地文件》](https://open.esign.cn/doc/opendoc/pdf-sign3/rlh256)接口上传获取追加文件的fileId<br/>+ 追加合并的OFD文件必须为不包含电子签名的文件，否则会导致签名失效 |
| mergeFileName | string | 是 | body | 合并后的文件名称 |


### 响应参数
| **参数名称** | | | | **类型** | **必选** | **参数说明** |
| --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | int | 是 | 业务码，0表示成功 |
| message | | | | string | 是 | 信息 |
| data | | | | object | 否 | 业务信息 |
|  | mergeFileId | | | string | 否 | 合并后的OFD文件ID<br/><font style="color:#DF2A3F;">(文件合并是异步过程，需要一定的时间，开发者可以轮询 </font>[《查询文件状态》](https://open.esign.cn/doc/opendoc/pdf-sign3/qz4aip)<font style="color:#DF2A3F;"> 接口进行查询)</font> |


### 请求示例  
```json
{
    "addFileId": "4e79e34324ef111111085b1f744629e4",
    "finishFileId": "5e4b2590d111111d8ab54ea7518d53a6",
    "mergeFileName": "合并后.ofd"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "mergedFileId": "e86c9b8c8fa1111a507e88e12e24b07"
    }
}
```

