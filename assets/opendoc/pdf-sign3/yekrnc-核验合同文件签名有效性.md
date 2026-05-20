### 接口描述
解析合同PDF文件中签署者数字证书信息，验证已签署的合同PDF文件内容或签名是否存在篡改。

:::info
<font style="color:#E8323C;">【注意事项】</font>

+ 可同时指定<font style="color:#E8323C;">状态为已完成的签署流程ID</font>和<font style="color:#E8323C;">签署流程中的文件ID</font>来验证合同文件签名有效性；
+ 若不指定签署流程ID，仅对本地PDF文件验签时，请先将待验签文件通过[【上传本地文件】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256)接口上传来获取fileId,再传入此 fileId 进行签名有效性验证。

:::

**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/files/{fileId}/verify

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#E8323C;">（请左右滑动查看完整描述）</font>** |
| --- | :---: | :---: | :---: | --- |
| fileId | string | 是 | path | 待验签文件ID <br/>+ 若验签本地PDF文件时，请先将待验签文件通过[【上传本地文件】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256)接口上传来获取 fileId，signFlowId 参数值请传""空字符。<br/>+ 若验签签署流程中PDF文件时，请先通过[【下载已签署文件及附属材料】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/kczf8g)接口来获取待验签文件 fileId，signFlowId 参数值请传具体签署流程ID。 |
| signFlowId | string | 否 | body | 签署流程ID<br/>+ 若验签本地PDF文件时，此参数值请传""空字符串。<br/>+ 若验签签署流程中PDF文件时，此参数值必须传入具体签署流程ID，且需保证签署流程状态为已完成。 |
| async | boolean | 否 | body | 是否异步返回验签结果，默认：false<br/>**true** - 异步返回<br/>**false** - 同步返回<br/><font style="color:#DF2A3F;">补充说明：</font><br/>+ 专属云文件只支持异步返回验签结果<br/>+ 异步结果可以通过接收[ 【文件异步验签结果通知】](https://qianxiaoxia.yuque.com/opendoc/notify3/gosre9rwztld2gui)和主动调用[【查询异步验签结果】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ay2e53w33k635tgb)获取（根据响应参数中的verifyTaskId判断本次任务） |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data | | | | | object | 否 | 业务数据 |
| | verifyTaskId | | | | string | 否 | 验签任务ID（async为true异步验签时返回） |
| | signInfos | | | | array | 否 | PDF文件中签署信息 |
| |  | cert | | | object | 否 | 数字证书信息 |
| | | | certOwner | | string | 否 | 数字证书所有者 |
| | | | certSN | | string | 否 | 数字证书序列号 |
| | | | effectiveTime | | string | 否 | 数字证书有效期开始时间 |
| | | | expireTime | | string | 否 | 数字证书有效期结束时间 |
| | | | issuerCN | | string | 否 | 数字证书颁发者名称 |
| | | | certBase64 | | string | 否 | 证书信息（base64编码） |
| | | signature | | | object | 否 | 签名信息 |
| | |  | modify | | boolean | 否 | 文件内容或签名是否篡改<br/>**false** - 未篡改<br/>**true** - 已篡改 |
| | | | signTimeSource | | string | 否 | 签署时间来源<br/>返回 tsa 表示时间源取自遵循RFC3161规范的时间戳 |
| | | | signTime | | string | 否 | 签署时间 |
| | | sealData | | | string | 否 | 印章图片的Base64编码 |


### 请求示例
```json
POST https://openapi.esign.cn/v3/files/b2cb7**3cc54/verify
{
  "signFlowId":"8009cead07*****0dc02f6d5"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "verifyTaskId": null,
        "signInfos": [
            {
                "cert": {
                    "certOwner": "证书持有者",
                    "certSN": "35ded1f****f0f20e4",
                    "effectiveTime": "2022-10-31 17:17:30",
                    "expireTime": "2023-10-31 17:17:30",
                    "issuerCN": "TEST ZHCA RSA CA",
                    "certBase64": "MIIEnzCC**********MAWkhDQSBSU0EgQ0ExDTALBgNVBAoMBFpIQ0ExCzAJBgNVBAYTAkNOMB4XDTIyMTAzMTA5MTczMFoXDTIzMTAzMTA5MTczMFowOTEqMCgGA1UEAwwhZXNpZ250ZXN06ZyB5p6X5rWL6K+V5pyJ6ZmQ5YWs5Y+4MQswCQYDVQQGEwJDTjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALTh7Uv40UO40BQc4PDNEk0MJh7k0KW8NSxnhZkyQBlEjRlNfFtL6+c9UPlQmGk/knCkFVgFx41AvSteRUey3JpDmIs7o/cUFzGBS1c5RDgjg6DsYuymBH8j+Aue5w586jsKSUEY8aqvmNEnsWLPse/LKB/IR9wuwfir2jUS0zrEONJeB7UL3M/O2n6NNMp3XHC3usqHg++H+qwPWHKfn38muyAyniSAKY00UnpcfrE6ITRhmk74VcdUbYyW1+YvxZouqglDGpp+mveIap5krRqHU8jhFTAU22EgVqEU1IRK20/pCpsJiaernH23Gi2N8gCUYUQyNl11jx9r3ITTx08CAwEAAaOCAacwggGjMB8GA1UdIwQYMBaAFP1x5HTU+5Ept+gBtOjfYN66piwaMFUGA1UdIAROMEwwSgYEVR0gADBCMEAGCCsGAQUFBwIBFjRodHRwczovL3d3dy50anpoY2EuY29tL0JhY2tQYWdlL0Rvd25Mb2FkRmlsZXM/aWQ9ODA1MIGUBggrBgEFBQcBAQSBhzCBhDBCBggrBgEFBQcwAYY2aHR0cHM6Ly93d3cudGp6aGNhLmNvbS9Gb3JlUGFnZS9TdXBwb3J0U2VydmljZXM/dHlwZT00MD4GCCsGAQUFBzAChjJodHRwczovL3d3dy50anpoY2EuY29tL0JhY2tQYWdlL0Rvd25Mb2FkRmlsZXM/aWQ9MTA5BgNVHR8EMjAwMC6gLKAqhihodHRwOi8vdGVzdGNhLnRqemhjYS5jb206MTAwMjEvMS8zMDQuY3JsMAkGA1UdEwQCMAAwIAYIKoEc0BQEAQQEFBMSMjMxMTgyMTk5NDAzMTI4ODg4MB0GA1UdDgQWBBSIDdSHBtSTKyJKcxqhWuifP1bLPjALBgNVHQ8EBAMCBsAwDQYJKoZIhvcNAQELBQADggEBAC37b9Hv5NpfgdNpOHOKyq6w5NgE758XX2fjWE0WFwy9h1V2+X4zdEuFNT5SemQXd4sVcUjXTCT0D9sAA4VI6UG+a24+i9u0GMI0ahPy7c2As3gleATd6KtbX94yubWvf8JifgIdiDowJdcU155nqglhsTQnCK8xfJ2JmFN1d9vr23dOUrbN9+BnLUbRUcFktNOa/wOvOikO+0O/X9T8RpAIlg+M4YGOpbOaDWmcuKAZDZel1RmuDTGxj+4l5uWNfFJCHL5jqjkysw9vxs2zzS8GaT3Eq9UBZFNehN6SWQQtbns5D6It/bNulbFVveGcm01q3oGqSu/mAbRBT0/nLeM="
                },
                "signature": {
                    "modify": false,
                    "signTimeSource": "tsa",
                    "signTime": "2022-12-07 18:02:25"
                },
                "sealData": "iVBORw0*******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"
            },
            {
                "cert": {
                    "certOwner": "证书持有者@1",
                    "certSN": "6e83c18*****79ad0",
                    "effectiveTime": "2022-04-13 11:46:25",
                    "expireTime": "2023-04-13 11:46:25",
                    "issuerCN": "SmartCA RSA CA1_SUBCA4",
                    "certBase64": "MIIEJTC********O1wYYQQGEwJDTjEwMC4GA1UELQwnYmJkZmVmOTM2OGE4NGM1ZmE3Mjg5YWI0YTU1NjhmNzIyMDIyMDRGMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAisWl9RxnFobMIatX+YNYWdOhVRSvcAz9nyuTmQyH4ouXn3zQ4+GgN/tOTJICJ1pswLt85BBlDbS6BcZA/cmbKyEgWdAw79k2cfL65FPSOA8UaeUHtHa8pbnDfwMQNAPPwbiYxftj85i71RXH4NUU4XZqqWviYCUS6+WGdRm/p2iwntn8p/9AaVRSslVMgwcs1uf6ibj/pReNCuT24T9iHaPa7d57+a5RSZ5eLqFIAoGX6CC9coWKwACkx6XoJieegRqx1NX/pTVcL5AZ0cLnkgEwDwueFuxv/oNmiuprdMfupsKZGZ3kWHPnqpIWXlyOmU4AGeeIACZ7qTnqp6q0bwIDAQABo38wfTAfBgNVHSMEGDAWgBQhj19RjX771zLmgcGz0U2f0e7RbDAgBggqgRzQFAQBAwQUExI5MTMzMDEwODc0NTgzMDYwNzcwDAYDVR0TAQH/BAIwADAdBgNVHQ4EFgQUPqIE7LRP/R8YzhANuALbiGA9OrYwCwYDVR0PBAQDAgbAMA0GCSqGSIb3DQEBCwUAA4IBAQC2MArrDqe41ew3ceEaDvr101idEOuU3erqt2LpgJBqwvHdHmlWae2jW7ixSb5eIp96+np+b6wjzewtK7oxTYGaOJP1cVl6tIeTll7X74PIfMHThyWj5Grgq4/GTTzMDDUBzjGvjPm1zgDoFfTrvC8S8Sc3i/d3FBYxrW3kQCEXPGLnxyG0Qp9idxUqAbFVLJ8RsKcgGE/8NmflD8MiJF+4xlCJt6mMVTZE+FiZFsbDeD2re/g8CBvHIAZqNfpOcD/bZuAZ44KnufZWyeI1utCe1/HtS5nE4pw5H+WVHeMCHmNPqHpswzBWxrfTk//gJktvbYrxp8PQ/ia+wkWnA3Wt"
                },
                "signature": {
                    "modify": false,
                    "signTimeSource": "tsa",
                    "signTime": "2022-12-07 18:02:26"
                },
                "sealData": "iVBORw0KGgoA*******AEiUlEQVR42u2d247bMACGk1lL9+abs8ZmfR75Ddq1fEl5HAAEQAAGQiYBkpLzBV+u6IN45n93jsgIQAJkFSCYUZG+wKmxk19oBNgNIMqSeD0jkSbw6YddNvXMtAAEQAHkKkEwIi66VzQXcawEIgAAIgADIMYAom1EKZao2AAEQAFH3QToC4qzaRgCi6qRmu5SuHMYFIa12AAEQ5ZxDGb+rbf3qZ2VzLsb9gwHJ/i6AAMi7AFkHSWHWiaxVLeVN1wBAAARApM2p7DEAYgJE8fQ95WV1eFLvcL0BCID0BySbnaugqV58V45TadEnvtssQJS7iuLpdJuLAQRAACRSxSgzfKU3NDsTUU6kq9PpEWUugADIKwFRmJ6qYaUdINWTrFY2ynG/+jhVqT8iSQUQAGkJiHPdzHm/AhClKab6pLo6scrcyDXXARAA6Q+IKhPPlojKcb4yhLja9S1mMZ0AUZTMAAIgAPIUIJG8Qdn8cozz1U636s8BBEAARNmydgMS+QwAMb8i0gGA27zkeghaN8oABEDC01xHE0vVdPv2MzfYkaop2evpCYhx9nDrO1VdOx+AAAiAVKeeSjOO66YrG4OZ3GeEo8xlNAYQACm9nkntEwWQA8pcZadUPQ+q+lcza43LQQAEQOyNsrcDUgm/LT2piptW7VgqcqLMCF/pf03mXAACIM0th86KRhXfn5rrKMYPn06vf3AD4koAAQRAAKQDIEpPqmsE73aXKTrHozyppwKi7EcAyAt3EJexB0AKr1k4qUtZ2YVUxwvKawABkBcA4vaeZq1/1d/dgSe6fvAzzs9BlN1TJyAqsJU7k2AtAAGQpv/bgyOOn1YRPV19tfakVp8YAAEQAAEQycg69VKYbInoyo0c9od2ZS6AAMgWINHKYDfcRC5YpJ+hCBt3ARJM8HuVudVYfUeuodwFszuXsAIEEABpmoM4nOaKnsrTDTZlxdLOk/o0INFxvQoQ1VzGYB0AEAAZ5GqvGmRco3ZF5XFnnhS4tgACIMMByW7vADL8DUPKC1k12LhKU9c5jC1zAQRARgLy7bioLRFAgo6yakez+qRmO7zZeZDyfAEEQOYDUg0l2YuvrIgy311RlQmbbgACIAACIJMByc5PFGA5XGDVfOUOnyqAAAiATAXEBQmAiHIBJYBKA7SyUfbfvwEIgACI9F3uEUORYyKtsFAG1gIQAAEQAJkMiLsaUcOWvVHVcb/pHAAEQABEOq09HRBFGH3duF/p7VTmAtUZ0Q35CoAASC9AEELobK3hn4duumFRQ82vn/2K5wu4zgUk4qJaG3//BcO6uNFr4zuhh8DYeWLXJiy/YFiJ3QAoDgkxaxOQtXHzv637146wNnYbQGkQYnZuemSH2glfhJgDwNi9YSsQTj4Xx67NkAUUB1cxS5BErj8A+QDIPEB2ktp1sWtEdxp0SJIazUF2YFuBxPgKEGA5OAfZWetqR4g21+iFIIQQQgghdIf+AQkOspN86k6yAAAAAElFTkSuQmCC"
            }
        ]
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)

