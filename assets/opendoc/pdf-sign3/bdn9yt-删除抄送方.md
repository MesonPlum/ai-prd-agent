### 接口描述
向已发起的流程中删除抄送方的信息。

:::info
**注意事项：**

+ 流程若已开启，将不支持再删除抄送方信息。

:::

**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/copiers/delete

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#F5222D;">（请左右滑动查看完整描述）</font>** |
| --- | --- | --- | :---: | :---: | :---: | --- |
| signFlowId | | | string | 是 | path | 签署流程ID  |
| copiers | | | array | 是 | body | 需删除的抄送方信息 |
|  | copierPsnInfo | | object | 否 | body | 抄送人信息<font style="color:#E8323C;">（psnId与psnAccount二选一传入）</font> |
| |  | psnId | string | 否 | body | 抄送人账号ID |
| | | psnAccount | string | 否 | body | 抄送人账号标识（手机号或邮箱） |
| | copierOrgInfo | | object | 否 | body | 抄送机构信息<font style="color:#E8323C;">（orgId与orgName二选一传入）</font> |
| |  | orgId | string | 否 | body | 抄送机构账号ID |
| | | orgName | string | 否 | body | 抄送机构账号标识（企业名称） |


### 响应参数
| **参数名称** | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | :---: | :---: | --- |
| code | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data | object | 否 | 业务数据 |


### 请求示例
```json
{
    "copiers":[
        {
            "copierPsnInfo":{
                "psnId":"",
                "psnAccount":"151****0101"
            },
            "copierOrgInfo":{
                "orgId":"",
                "orgName":"这是个抄送方的企业名称"
            }
        }
    ]
}
```

### 响应示例
```json
{
    "code":0,
    "message":"成功",
    "data":null
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)

