**【触发条件】**<font style="color:rgb(64, 64, 64);">用户填写模板完成并提交后，若最终生成待签署PDF文件失败，会触发。</font><font style="color:#E8323C;">（正常情况下不会触发，遇到极小可能出现服务异常、网络故障等情况会发生，如收到此回调需要重新发起模板填写页面给用户重新填写）</font>

#### 回调参数
| **参数名称** | | **必选** | **参数类型** | **参数说明** |
| --- | --- | --- | --- | --- |
| action | | 是 | string | 标记该通知的业务类型，该通知固定为：**<font style="color:#52C41A;">FILL_DOCTEMPLATE_FAIL</font>** |
| timestamp | | 是 | int64 | 回调通知发送时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| docTemplateId | | 是 | string | 待填充的模板ID |
| docTemplateName | | 是 | string | 文件模板名称 |
| customBizNum | | 否 | string | 开发者自定义业务编号，发起模板填写时定义的标识业务参数 |
| fileId | | 是 | string | 填充后生成的文件ID（该文件ID是不可用的） |
| fillTaskId | | 否 | string | 填写任务ID<br/><font style="color:#DF2A3F;">注：仅对新版模板生效</font> |
| decFillTaskId | | 否 | string | 填写任务ID（仅限专属云使用）<br/><font style="color:#DF2A3F;">注：仅对新版模板生效</font> |


#### 模板填写失败通知示例
```json
{
    "action": "FILL_DOCTEMPLATE_FAIL",
    "customBizNum": "01测试",
    "docTemplateId": "6b49867a****1b590803b800",
    "docTemplateName": "test3.pdf",
    "fileId": "2a94a07820c****361d569",
    "decFillTaskId": "46e4e8f8c976411115709e6caaa5ad66",
    "fillTaskId": "37a8f2baecd546011116c37c3345448c",
    "timestamp": 1665478351452
}
```

#### 
