### 接口描述
开发者将文件上传至e签宝服务端后获取到文件ID（PDF文件），通过该文件ID获取e签宝的拖章定位页面，设置好位置后，开发者可以在 [**回调通知：获取签章位置信息通知**](https://qianxiaoxia.yuque.com/opendoc/notify3/umvulch4szgrarh5)** **中接收位置坐标等信息，用于后续基于文件发起签署接口的辅助定位。页面样式如下：

![](https://cdn.nlark.com/yuque/0/2024/png/447795/1720082057410-147e1b8d-2199-486a-9c3f-2dad7226868a.png)

### 新接口地址&请求方法<font style="color:#DF2A3F;"></font>
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/files/get-seal-position-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | --- | :---: | :---: | :---: | --- |
| customBizNum | | | <font style="color:rgb(64, 64, 64);">string</font> | <font style="color:rgb(64, 64, 64);">是</font> | body | 自定义业务编码<font style="color:#DF2A3F;">（开发者自定义业务标识，定位后在回调通知中原样返回，可以区分具体是哪笔业务流程）</font><br/>[点击跳转 回调通知：获取签章位置信息通知](https://qianxiaoxia.yuque.com/opendoc/notify3/umvulch4szgrarh5) |
| fileId | | | <font style="color:rgb(64, 64, 64);">string</font> | <font style="color:rgb(64, 64, 64);">是</font> | body | 文件ID（文件需要提前上传到e签宝服务端，文件上传接口：[上传本地文件](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256)） |
| signerRoles | | | <font style="color:rgb(64, 64, 64);">list</font> | <font style="color:rgb(64, 64, 64);">是</font> | body | 签署方角色标识，用于关联签署区（可以自定义命名，如：甲方签署区、乙方签署区等）<br/><font style="color:#E8323C;">补充说明：</font><br/>+ 该字段主要为了区分不同的签署方的位置坐标<br/>+ 在同一次请求里，签署方角色标识不可以重复 |
| redirectUrl<br/><br/> | | | string | 否 | body | 定位完成后提交跳转的页面重定向跳转地址（需符合 https /http 协议地址） |
| clientType | | | string | 否 | body | 客户端对应的页面样式类型<br/>**H5 **- 固定移动端样式<br/>**PC **- 固定PC端样式<br/>**ALL **- 自动适配移动端或PC端<font style="color:#DF2A3F;">（默认值）</font><br/><font style="color:#DF2A3F;">【注】参数值均为大写的英文</font> |
| signFieldType | | | list | 否 | body | 展示的签署区类型，默认都展示<br/>**1** - 单页签章签署区<br/>**2** - 骑缝签章签署区<br/>**3** - 备注签署区 |
| urlType | | | int | 否 | body | 页面链接类型（默认值 2）<br/>1 - 预览链接（不可编辑签署区位置或添加签署区）<br/>2 - 编辑链接 |
| signComponents | | | array | 否 | body | 签署区控件列表，提前预设签署方角色的不同签署区及其位置 |
|  | signerRolesTag | | string | 否 | body | 当前签署区所属的签署方角色标识<font style="color:#DF2A3F;"></font><br/><font style="color:#DF2A3F;">【注】必须在签署方角色标识signerRoles入参范围内</font> |
| | signFieldTypeTag | | string | 是 | body | 当前签署区类型标识<font style="color:#DF2A3F;"></font><br/>**1 **- 普通签署区   **2 **- 备注签署区   <font style="color:#DF2A3F;">【注】必须在签署区类型signFieldType入参范围内</font> |
| | componentPosition | | object | 是 | body | 控件所在位置 |
| | | componentPageNum | int32 | 是 | body | 控件所在页码（只能传单个页码）<br/><font style="color:#DF2A3F;">补充说明：</font><br/>+ 当签署区样式为骑缝签章时，该参数不生效，可以不传 |
| | | componentPositionX | float | 是 | body | 控件位置X横坐标   <font style="color:#DF2A3F;">补充说明：</font><br/>+ 当签署区样式为骑缝签章时，该参数不生效，可以不传 |
| | | componentPositionY | float | 是 | body | 控件位置Y纵坐标 |
| | componentSize | | object | 否 | body | 控件尺寸<br/><font style="color:#DF2A3F;">【注】落章规则sealSpecs=2时必填；当sealSpecs=1时，该参数不生效，可以不传</font> |
| |  | componentWidth | float | 否 | body | 控件宽度（矩形的左右距离，单位为px） |
| | | componentHeight | float | 否 | body | 控件高度（矩形的上下距离，单位为px） |
| | normalSignField | | object | 否 | body | 普通签章区属性   <font style="color:#DF2A3F;">【注】当前签署区类型标识signFieldTypeTag=1时必填</font> |
| |  | showSignDate | int32 | 否 | body | 是否显示签署日期，默认：0<br/>**0** - 不显示<br/>**1** - 显示 |
| | | dateFormat | string | 否 | body | 日期格式，支持以下日期格式：<br/>yyyy年MM月dd日<br/>yyyy-MM-dd<br/>yyyy/MM/dd<br/>yyyy-MM-dd HH:mm:ss<br/><font style="color:#DF2A3F;">【注】是否显示签署日期showSignDate=1时必填</font> |
| | | signFieldStyle | int32 | 是 | body | 签章样式<br/>**1** - 单页签章<br/>**2** - 骑缝签章 |
| | | sealSpecs | int32 | 是 | body | 落章规则<br/>**1** - 以默认印章规格加盖<br/>**2** - 自定义印章规格加盖（根据指定的签署区宽高适配） |
| | remarkSignField | | object | 否 | body | 备注区属性   <font style="color:#DF2A3F;">【注】当前签署区类型标识signFieldTypeTag=2时必填</font> |
| |  | aiCheck | int32 | 否 | body | 是否开启手写抄录AI校验，默认值：**0 **<br/>**0 **- 不开启（不开启AI校验手写内容是否一致）<br/>**1 **- 开启 AI 校验（开启 AI 手写抄录校验，连续3次校验不通过将弹窗提醒“监测到多次识别未通过，是否直接使用当前手写笔迹？”，确定后跳过该字的校验，下一个字继续执行 AI 校验）<br/>**2** - 强制 AI 校验（强制 AI 手绘校验，若校验不通过，则会一直提示“识别失败，请重新书写XX”，直至校验通过） |
| | | inputType | int32 | 否 | body | 备注文字输入方式，默认：2<br/>**1 **- 手写抄录方式（指定输入内容）<br/>**2** - 键盘输入方式（不指定输入内容）   <font style="color:#DF2A3F;">【注】inputType=2（键盘输入方式）时，aiCheck和remarkContent参数值不生效</font> |
| | | remarkContent | string | 否 | body | 预设待抄录信息（最多支持100个汉字，含标点符号，内容中输入\n可以换行）<br/><font style="color:#DF2A3F;">【注】inputType=1时手写抄录方式此参数必须传值</font> |
| | | remarkFontSize | string | 否 | body | 备注文字的字号，单位pt，默认值12pt（小四字号）<br/><font style="color:#DF2A3F;">注：签署侧需要的字号单位是px，模板侧通用的都是pt，因此要做一次转换；pt与px间的换算关系是：0.75px=1pt</font> |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖message匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | getSealPositionUrl | | | | string | 否 | 拖章定位页面链接（该地址有效期一天，保存一次后失效） |


### 请求示例
```json
{
    "customBizNum": "自定义编码001",
    "fileId": "70a0b2e887101111156969f79535bb",
    "signerRoles": [
        "甲方签署区",
        "乙方签署区"
    ],
    "clientType":"ALL",
    "signFieldType":[1,2],
    "redirectUrl": "https://esign.cn"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "getSealPositionUrl": "https://smlfront.esign.cn:8880/template/seal-position?appId=7438111954&bizId=f1cc883a42934c511a975777cd41f9de&encryption=pyHNNMf3eEjqXnKErwsECyY%2BWDaMlFJ9%2BXUJfqRR2T1hibA3XV8yfWC6nG1hLo/9XcbIN7XcjN9qof%2BGCHJdbadA6%2B0pFZPP8goi9/QMrQ7zL3%2B6TkrxlugSBvdAFFup%0A&scene=api_seal_position&redirectUrl=https://esign.cn"
    }
}
```

### <font style="color:rgb(64, 64, 64);">错误码</font>
[点击查看错误码](https://qianxiaoxia.yuque.com/opendoc/codemsg-v3/px5yvgqf9glbs7o6)



