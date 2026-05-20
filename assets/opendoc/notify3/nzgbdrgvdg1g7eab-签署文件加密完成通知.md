回调通知Url地址配置方式和回调通知数据接收，详见[签署回调通知接收说明](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/sblzg8)。

当开发者调用[【下载已签署文件及附属材料】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/kczf8g)接口使用RSA文件加密时，需要通过该回调通知接收文件下载地址。

**回调参数**

| **参数名** | | | **必填** | **参数类型** | **说明** |
| --- | --- | --- | :---: | :---: | --- |
| action | | | 是 | string | 标记该通知的业务类型，该通知固定：**<font style="color:#52C41A;"></font>**<br/>**<font style="color:#52C41A;">FILE_ENCRYPT_FINISH</font>** |
| timestamp | | | 是 | int64 | 回调通知触发时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| signFlowId | | | 是 | string | 签署流程ID |
| rsaSecretKey | | | 是 | string | RSA公钥版本（开发者自定义唯一标识，可用该字段标识对应的rsaSecret加密版本） |
| aesSecret | | | 是 | string | 公钥加密后的AES密钥（base64编码） |
| files<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | 是 | array | 签署文件信息 |
|  | fileId | | 是 | string | 签署文件ID |
| | fileName | | 是 | string | 签署文件名称 |
| | downloadUrl | | 是 | string | 已签署文件下载链接<font style="color:#DF2A3F;">（默认有效期为60分钟，过期后可以重新调用接口获取新的下载地址）</font> |
| attachments<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | 否 | array | 附属材料信息 |
|  | fileId | | 否 | string | 附属材料文件ID |
| | fileName | | 否 | string | 附属材料文件名称 |
| | downloadUrl | | 否 | string | 附属材料文件下载链接<font style="color:#DF2A3F;">（默认有效期为60分钟，过期后可以重新调用接口获取新的下载地址）</font> |
| certificateDownloadUrl | | | 否 | string | 海外签证书报告下载地址<font style="color:#DF2A3F;">（默认有效期为60分钟，过期后可以重新调用接口获取新的下载地址）</font><br/><font style="color:#DF2A3F;">注：默认中国大陆签署不返回值</font> |


**通知示例**

```json
{
    "action": "FILE_ENCRYPT_FINISH",
    "timestamp": 1765275424334,
    "signFlowId": "0909afd063111b8e292b34f4124a2f",
    "rsaSecretKey": "自定义公钥编码1111111",
    "aesSecret": "dxKiAuzA/70bo/3RP58uo61JazqZNsAtLZfJJYNws18AfdAFt0mgrCOCD+43AI4Xb2kvFTqoz+HabShFMNCRKPdCuHK9iu1LozWqEklW9nQETexsevXdysrDmIcfPSn4JOr7LrWubwZLD+PsruUZDZGG40f3P1Vap2Go5jQrMWgpWS422NdDQ45pvd8LoR66wBzdvFcJjDfXsZz7MxzVt3CmJ6C+bKYkgt7KnV0shRwACEIUVT/OFeNJxrxIlOKy6y+lzzKe2sSVi2Wc+v+0zmpsOlPIutzIu0vc7pIJY9KW/x1oXyJJWr7ZAas889NPqa9+GyNq7wOm1NDhe/FuKw==",
    "files": [
        {
            "fileId": "673d8406b111141bbbcd4f776f4b693",
            "fileName": "请设置待签署文件的文件名称.pdf",
            "downloadUrl": "https://filesystem-tempfile-15days.oss-cn-hangzhou.aliyuncs.com/4438864954/7f6fc459-063e-47ab-ab66-2b23caa90239/%E8%AF%B7%E8%AE%BE%E7%BD%AE%E5%BE%85%E7%AD%BE%E7%BD%B2%E6%96%87%E4%BB%B6%E7%9A%84%E6%96%87%E4%BB%B6%E5%90%8D%E7%A7%B0.pdf?Expires=1765279024&OSSAccessKeyId=LTAI4G23YViiKnxTC28ygQzF&Signature=%2B30UF4dDk1CCHJS7DtTcpiGfh78%3D"
        }
    ]
}
```



