:::warning
**<font style="color:#DF2A3F;">【说明】</font>**<font style="color:#DF2A3F;">错误信息中的 %s 是一个占位符，用于表示具体的参数值。例如：“参数错误：文档不存在：%s”，其中 %s 会替换为文件ID。</font>

:::

## 文件类API
### 上传本地文件
<font style="color:rgb(51, 51, 51);">POST </font><font style="color:rgb(64, 64, 64);">/v3/files/file-upload-url</font>

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1430002 | 参数错误: 文件名字长度不能大于100 |
| 1430002 | 参数错误: 文件大小不能为0 |
| 1430012 | 服务异常，请联系客服咨询反馈 |
| 1430002 | 参数错误: 文件大小不能为空 |
| 1430002 | 参数错误: 当前文件类型不支持转换HTML |
| 1430601 | 创建合同失败: 文件名含有特殊字符 |


### 查询文件上传状态
GET /v3/files/{fileId}

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1430608 | 查询合同信息失败: 合同不存在 |
| 1430802 | 操作人无权限 |


### <font style="color:rgb(38, 38, 38);">签署前辅助定位</font>
#### **<font style="color:rgb(38, 38, 38);">获取拖章定位页面</font>**
POST  /v3/files/get-seal-position-url

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1430002 | customBizNum不能为空 |
| 1430002 | fileId不能为空 |
| 1435608 | 查询合同信息失败: 合同不存在 |
| 1430524 | 文件必须是pdf格式 |
| 1430012 | 服务异常，请联系客服咨询反馈 |


#### 检索文件关键字坐标
GET、POST  /v3/files/{fileId}/keyword-positions

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1435603 | 获取合同下载地址失败 |
| 1437509 | 解析文档关键字失败，PDF header not found. |
| 1435608 | 查询合同信息失败: 合同不存在 |
| 1435002 | 参数错误:未指定关键字 |
| 1437511 | 文档不存在：%s |


## 合同模板类API
### 通过页面制作模板
#### 获取制作合同模板页面
<font style="color:rgb(64, 64, 64);">POST /v3/doc-templates/doc-template-create-url</font>

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1430011 | 合同不存在 |
| 1430011 | 文件底稿还不是已经上传/转换的HTML |
| 1430011 | 模板操作异常 |
| 1430011 | 文件底稿还不是已经上传/转换的PDF |
| 1430011 | 用户没有操作权限 |
| 1430002 | templateName不能为空 |


#### 获取编辑合同模板页面
<font style="color:rgb(64, 64, 64);">POST /v3/doc-templates/{docTemplateId}/doc-template-edit-url</font>

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1430011 | 模板文件不存在 |
| 1430501 | 文件系统查询失败: 文件未上传 |
| 1430011 | 未查询到自定义控件(组), %s |


#### 获取预览合同模板页面
<font style="color:rgb(64, 64, 64);">POST /v3/doc-templates/doc-template-preview-url</font>

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1430011 | 模板文件不存在 |
| 1430501 | 文件系统查询失败: 文件未上传 |
| 1430011 | 模板操作异常 |


### 查询合同模板中控件详情
<font style="color:rgb(64, 64, 64);">GET /v3/doc-templates/{docTemplateId}</font>

| **code 错误码** | **message 错误信息** |
| --- | :--- |
| 1430011 | 模板文件不存在 |
| 1430011 | 模板拥有者不匹配 |


### 填写模板生成文件
POST /v3/files/create-by-doc-template

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1430601 | 创建合同失败: 参数不合法:合同名称参数超过100字符 |
| 1430002 | 参数错误: 参数componentValue不能为null |
| 1430011 | 模板文件不存在 |
| 1430601 | 创建合同失败: 身份证号码有误,请检查! |
| 1430011 | componentKey:%s无效 |
| 1430002 | 参数错误: 参数docTemplateId必填 |
| 1430002 | 参数错误: componentId和componentKey只允许其中一个有值 |
| 1430012 | 服务异常，请联系客服咨询反馈 |
| 1430002 | 参数错误: 文件名称包含特殊字符 |
| 1430011 | componentId：%s的值不能为空 |
| 1430002 | 参数错误: componentId和componentKey不能同时为空 |
| 1430011 | 参数错误：控件id或控件key重复,%s |
| 1430011 | 内部服务器错误 |
| 1430002 | 参数错误: 参数components必填 |
| 1430011 | 模板拥有者不匹配 |


### 通过页面填写模板
#### 获取填写合同模板页面
POST /v3/doc-templates/doc-template-fill-url

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1430011 | 模板文件不存在 |
| | 身份证号码有误 |
| | componentId：%s的不是有效的key |
| | componentId：%s的值：%s 不是数组 |
| 1430411 | 预填值校验失败: 控件不存在 |
| | 预填值校验失败: 控件填充内容过长 |
| | 预填值校验失败: 控件填充内容不合法 |
| | 预填值校验失败: 不支持的控件类型 |
| | 预填值校验失败: 日期控件预填内容不是一个有效的日期 |
| | 预填值校验失败: 勾选控件预填内容格式不合法 |
| | 预填值校验失败: 数字控件的预填内容不是一个有效的数值 |
| 1430012 | 服务异常，请联系客服咨询反馈 |


### **<font style="color:rgb(38, 38, 38);">查询填写合同模板任务结果</font>**
POST /v3/doc-templates/fill-task-result

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1430011 | fillTaskId不能为空 |
| 1430011 | templateId不能为空 |
| 1430011 | 模板文件不存在 |
| 1430790 | 填充任务不存在 |




### 查询HTML模板填写后文件
GET /v3/files/{fileId}/detail

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1430011 | fileId不是有效的模板填充后的fileId |


### 查询合同模板列表
GET /v3/doc-templates?pageNum=1&pageSize=20

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1430002 | 参数错误: 每页条数不能大于20 |


### 删除合同模板
DELETE /v3/doc-templates/{docTemplateId}

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1430011 | 模板不存在 |
| 1430011 | 模板拥有者不匹配 |


### 扩展功能API
#### 复制合同模板
POST <font style="color:rgb(64, 64, 64);">/v3/doc-templates/{docTemplateId}/copy</font>

| **code 错误码** | **message 错误信息** |
| --- | --- |
| 1430011 | 模板不存在 |
| 1430011 | 模板拥有者不匹配 |


