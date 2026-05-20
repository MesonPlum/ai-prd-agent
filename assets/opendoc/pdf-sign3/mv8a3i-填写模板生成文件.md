### 接口描述
基于合同模板编号：<font style="color:rgb(232, 50, 60);"> </font>`**<font style="color:#FA8C16;background-color:#E9E9E9;">docTemplateId</font>**`和模板中的控件来填充自定义的内容，最终生成一份pdf文件。

:::warning
**<font style="color:#E8323C;">【注意事项】：使用HTML动态模板时，填充的表格行数不能超过2000行（性能限制），且HTML填充完样式可能产生变化，不能保证完全一致。</font>**

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/files/create-by-doc-template

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | :---: | :---: | :---: | --- |
| docTemplateId | | string | 是 | body | 待填充的模板ID<font style="color:#E8323C;">（通过</font>[【获取制作合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xagpot)<font style="color:#E8323C;">接口获取）</font> |
| fileName | | string | 是 | body | 填充后生成的文件名称<font style="color:#E8323C;">（可自定义文件名称）</font><br/><font style="color:#E8323C;">【注】</font><br/>+ 文件名称不可含有以下9个特殊字符：/ \ : * " < > | ？以及所有emoji表情<br/>+ 文件名称长度限制不能超过100字符 |
| components<font style="color:#E8323C;">（点击“+”展开详情）</font> | | array | 是 | body | 控件列表<font style="color:#E8323C;">（</font>**<font style="color:#E8323C;">控件ID</font>**<font style="color:#E8323C;">和 </font>**<font style="color:#E8323C;">控件Key </font>**<font style="color:#E8323C;">二选一传值）</font> |
| | componentId | string | 否 | body | 控件ID<font style="color:#F5222D;">（设置合同模板时由e签宝系统自动生成）</font> |
| | componentKey | string | 否 | body | 控件Key<font style="color:#F5222D;">（设置合同模板时由用户自定义）</font> |
| | componentValue | string | 否 | body | 控件填充值<br/><font style="color:#E8323C;">补充说明：</font><br/>（1）可根据控件类型进行填充，[点击查看](https://open.esign.cn/doc/opendoc/case3/rs709w?#CmoAk)填充值示例；<br/>（2）填充动态表格控件时，若需新增一行数据时 insertRow 参数值必须传 true；<br/>（3）[点击查看](https://qianxiaoxia.yuque.com/docs/share/90d092e6-1728-480a-81be-ad67dc8bf07d#Fhtbe)如何填充动态表格。 |
| requiredCheck | | boolean | 否 | body | 是否校验PDF模板中必填控件，默认：**false**<br/>**false**：不校验模板中必填控件（components必须传，可以传空数组）；<br/>**true**：校验模板中必填控件 ，必填控件不传值会报错："创建合同失败: 'XX控件名称'填充内容缺失" 。<br/><font style="color:#E8323C;">补充说明：</font><br/>该参数只针对**PDF**模板生效，**HTML**模板不生效，即：**HTML**模板会强制校验必填控件。 |


### 响应参数
| **参数名称** | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | object | 否 | 业务数据 |
|  | fileId | | string | 否 | 填充后生成的文件ID |
| | fileDownloadUrl | | string | 否 | 文件下载地址<font style="color:#F5222D;">（有效期为60分钟，过期后可以重新调用接口获取新的下载地址）</font><br/>+ 填充**PDF**模板时，返回填充后的文件下载地址。<br/>+ 填充**HTML**模板时，默认返回null，如需获取文件下载地址，建议调用[【查询文件上传状态】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/qz4aip)接口，传入上方参数“填充后生成的文件ID”的返回值来获取。 |


### 请求示例
```json
{
    "docTemplateId":"8726f6b***03a56d",
    "fileName":"某公司的交易协议签署文件",
    "components":[
        {
            "componentId":"59af7766***36ef41b",
            "componentKey":"",
            "componentValue":"这里是填充的文本"
        },
        {
            "componentId":"7315e9af**72d2dac40",
            "componentKey":"",
            "componentValue":"2022/01/01"
        }
    ]
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "fileId": "376977ed9***5d412b43",
        "fileDownloadUrl": "https://esignoss.esign.cn/1111564182/e775bca.pdf?Expires=**&OSSAccessKeyId=**&Signature=**%3D"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/px5yvgqf9glbs7o6)

