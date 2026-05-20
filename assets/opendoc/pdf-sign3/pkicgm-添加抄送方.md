### 接口描述
向已发起的流程中添加抄送方的信息，以使未参与到签署流程中的个人或企业接收到已发起的签署相关信息。

:::info
**“抄送方”的概念：**

+ 指不参与签署文件的机构或个人，可以进行查看签署流程中的签署文件以及附属材料等信息，当流程中的签署方全部完成签署，抄送方也会收到签署完成的通知。

**接口注意事项：**

+ 自动完结的流程（autoFinish设置为true）不支持添加抄送方，否则将会报错：“自动归档流程开启后，不允许添加签署区”。
+ 添加的抄送方不可与流程中已有的抄送方重复。

:::

**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/{signFlowId}/copiers

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#F5222D;">（请左右滑动查看完整描述）</font>** |
| --- | --- | --- | :---: | :---: | :---: | --- |
| signFlowId | | | string | 是 | path | 签署流程ID（通过[【基于文件发起签署】](about:blank)接口获取） |
| copiers<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | array | 是 | body | 添加的抄送方信息  |
| | copierOrgInfo<font style="color:rgb(232, 50, 60);"></font> | | object | 否 | body | 抄送机构信息**<font style="color:#E8323C;">（orgId与orgName二选一传入）</font>**<br/>+ <font style="color:#E8323C;">抄送给企业/机构场景时，copierPsnInfo必须传入接收人信息</font> |
| | | orgId | string | 否 | body | 抄送机构账号ID |
| | | orgName | string | 否 | body | 抄送机构账号标识（企业名称） |
| | copierPsnInfo<font style="color:rgb(232, 50, 60);"></font> | | object | 否 | body | 抄送人信息**<font style="color:#E8323C;">（psnId与psnAccount二选一传入）</font>**<br/>+ <font style="color:#E8323C;">抄送给个人</font><br/>+ <font style="color:#E8323C;">抄送给企业的接收人</font> |
| |  | psnId | string | 否 | body | 抄送人账号ID |
| | | psnAccount | string | 否 | body | 抄送人账号标识（手机号或邮箱） |


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
            "copierOrgInfo":{
                "orgName":"这是个抄送通知企业的名称",
                "orgId":""
            },
            "copierPsnInfo":{
                "psnAccount":"153****7650",
                "psnId":""
            }
        }
    ]
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": null
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/gts2lir7t1hwyndy)

