### 接口描述
检索PDF文件中所含关键字的所有XY坐标信息。

:::info
**请求说明：**

（1）适用于通过查找关键字的所在位置，来**定位**需要加盖印章（签名）的**坐标**。

（2）仅适用**文本类内容**的PDF文件，通过扫描或图片生成的PDF文件无法查询关键字坐标。

:::

:::warning
**为方便接口开发，该接口于****<font style="color:#DF2A3F;">2023年3月20日</font>****新增****<font style="color:#DF2A3F;">POST</font>****请求方式。**

**原有****<font style="color:#DF2A3F;">GET</font>****请求方式****<font style="color:#DF2A3F;">仍然保留</font>****，但因为请求头的签名计算涉及到URL编码问题，不够便捷不再推荐。**

:::

### 新接口地址&请求方法<font style="color:#DF2A3F;">（推荐）</font>
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/files/{fileId}/keyword-positions

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| <font style="color:rgb(64, 64, 64);">fileId</font> | <font style="color:rgb(64, 64, 64);">string</font> | <font style="color:rgb(64, 64, 64);">是</font> | path | 文件ID（文件需要提前上传到e签宝服务端，文件上传接口：[上传本地文件](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256)） |
| <font style="color:rgb(64, 64, 64);">keywords</font> | <font style="color:rgb(64, 64, 64);">list</font> | <font style="color:rgb(64, 64, 64);">是</font> | body | <font style="color:rgb(38, 38, 38);">关键字列表，能够通过该值定位到在文件中的位置坐标。</font><br/><font style="color:#F5222D;">补充说明：</font><br/><font style="color:rgb(38, 38, 38);">（1）允许一次查找多个关键字，例如："keywords":  ["甲方盖章","乙方签字"]，</font><font style="color:#DF2A3F;">最多30个关键字</font><font style="color:rgb(38, 38, 38);">。</font><br/><font style="color:rgb(38, 38, 38);">（2）关键字不支持特殊字符、符号等</font><font style="color:rgb(64, 64, 64);">Adobe无法解析的字符</font><font style="color:rgb(38, 38, 38);">；</font> |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | keywordPositions<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | | array | 否 | 关键字信息 |
| |  | keyword | | | string | 否 | 关键字 |
| | | searchResult | | | boolean | 否 | 关键字是否检索到坐标值 |
| | | positions<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | array | 否 | 关键字位置信息<br/><font style="color:#DF2A3F;">注：计算的是关键字第一个字的左下角坐标位置，例如：关键字是“甲方盖章处”，那么坐标值就是“甲”的左下角位置。</font> |
| | |  | pageNum | | int32 | 否 | 关键字所在页码 |
| | | | coordinates | | array | 否 | 关键字XY坐标值 |
| | | |  | positionX | float | 否 | X坐标 |
| | | | | positionY | float | 否 | Y坐标 |


### 请求示例
```json
{
  "keywords": [
    "甲方盖章/签字",
    "乙方盖章/签字"
  ]
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "keywordPositions": [
            {
                "keyword": "甲方盖章/签字",
                "searchResult": true,
                "positions": [
                    {
                        "pageNum": 3,
                        "coordinates": [
                            {
                                "positionX": 90.0,
                                "positionY": 190.611
                            }
                        ]
                    }
                ]
            },
            {
                "keyword": "乙方盖章/签字",
                "searchResult": true,
                "positions": [
                    {
                        "pageNum": 3,
                        "coordinates": [
                            {
                                "positionX": 351.24,
                                "positionY": 190.611
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/px5yvgqf9glbs7o6)

### 接口地址&请求方法<font style="color:#DF2A3F;">（不推荐）</font>
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/files/{fileId}/keyword-positions?keywords=关键字1,关键字2

**请求方法：**GET

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| <font style="color:rgb(64, 64, 64);">fileId</font> | <font style="color:rgb(64, 64, 64);">string</font> | <font style="color:rgb(64, 64, 64);">是</font> | path | 文件ID |
| <font style="color:rgb(64, 64, 64);">keywords</font> | <font style="color:rgb(64, 64, 64);">string</font> | <font style="color:rgb(64, 64, 64);">是</font> | query | <font style="color:rgb(38, 38, 38);">关键字列表，能够通过该值定位到在文件中的位置坐标。</font><br/><font style="color:#F5222D;">补充说明：</font><br/><font style="color:rgb(38, 38, 38);">（1）允许一次查找多个关键字，请使用英文逗号分隔；</font><br/><font style="color:rgb(38, 38, 38);">（2）关键字不支持特殊字符、符号等</font><font style="color:rgb(64, 64, 64);">Adobe无法解析的字符</font><font style="color:rgb(38, 38, 38);">；</font> |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。  |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | keywordPositions<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | | array | 否 | 关键字信息 |
| |  | keyword | | | string | 否 | 关键字 |
| | | searchResult | | | boolbean | 否 | 关键字是否检索到坐标值 |
| | | positions<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | array | 否 | 关键字位置信息 |
| | |  | pageNum | | int32 | 否 | 关键字所在页码 |
| | | | coordinates | | array | 否 | 关键字XY坐标值 |
| | | |  | positionX | float | 否 | X坐标 |
| | | | | positionY | float | 否 | Y坐标 |


### 请求示例
```http
GET https://openapi.esign.cn/v3/files/061778***701b7/keyword-positions?keywords=甲方
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "keywordPositions": [
            {
                "keyword": "甲方",
                "searchResult": true,
                "positions": [
                    {
                        "pageNum": 1,
                        "coordinates": [
                            {
                                "positionX": 90.024,
                                "positionY": 756.791
                            },
                            {
                                "positionX": 111.144,
                                "positionY": 756.791
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/px5yvgqf9glbs7o6)



