### 接口描述
当模板需要修改，可以通过原模板ID再次获取模板设置页面进行编辑。

:::warning
<font style="color:#DF2A3F;">【注】：</font>

<font style="color:#DF2A3F;">1.必须确保企业用户已授予资源管理权限（manage_org_resource），才可以获取对应企业的编辑流程模板页面，</font>[**点击跳转企业授权接口**](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/kcbdu7)

<font style="color:#DF2A3F;">2.模板需处于停用状态，才可以编辑流程模板，</font>[**点击跳转停用流程模板接口**](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/gyo1p6cg3yk1rv2g)

:::

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-templates/{signTemplateId}/sign-template-edit-url

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | :---: | :---: | :---: | --- |
| signTemplateId | string | 是 | path | 流程模板ID  |
| orgId | string | 是 | body | 机构用户ID<br/><font style="color:#E8323C;">【注】用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用</font>[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)<font style="color:#E8323C;">接口通过组织机构名称/组织机构证件号进行查询</font> |
| transactorPsnId | string | 是 | body | 经办人个人用户ID<br/><font style="color:#E8323C;">【注】通过</font> [【查询企业成员列表】](https://qianxiaoxia.yuque.com/opendoc/employee/bzrzic) <font style="color:#E8323C;">查询企业成员的账号ID（psnId），经办人必须有模板操作权限，建议直接使用管理员账号</font> |
| redirectUrl | string | 是 | body | 编辑完成后重定向地址 （最长1024字符） |
| hiddenOriginComponents | boolean | 否 | body | 是否隐藏原始控件，默认false<br/>true-隐藏<br/>false-不隐藏 |
| customComponentGroups | list | 否 | body | 要展示的自定义控件组ID列表<br/>自定义控件组请使用接口：[【创建控件组】](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/crxfb1zzefbt5166) |
| customComponents | list | 否 | body | 要展示的自定义控件ID列表<br/>自定义控件请使用接口：[【创建自定义业务控件】](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/gwthhipyuv3y7kry) |
| uneditableFields | list | 否 | body | 禁止用户在页面上修改或追加的内容<br/>+ **docs** - 待签文件（隐藏添加、替换、删除签署文件按钮）<br/>+ **participants** - 参与方（隐藏签署方区域的签署方名称编辑按钮、添加企业和添加个人按钮以及删除按钮、顺序设置按钮） |


### 响应参数
| **参数名称** | | **参数类型** | **必选** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| code | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message**** | | string | 否 | <font style="color:rgb(64, 64, 64);">业务信息</font><br/><font style="color:rgb(245, 34, 45);">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data<font style="color:#E8323C;">（点击“+”展开详情）</font> | | object | 否 | 业务数据 |
|  | signTemplateEditUrl | string | 是 | 编辑流程模板页面链接（该地址无需登录，有效期30分钟） |


### 请求示例
```json
POST https://openapi.esign.cn/v3/sign-templates/b7018f7e130***978925f2/sign-template-edit-url

{
    "orgId": "6b498644****11b590803b800",
    "transactorPsnId": "498644******b590803b120",
    "redirectUrl": "https://****.cn"
}
```

### 响应示例
```json
{
    "code": 0,
    "message": "成功",
    "data": {
        "signTemplateEditUrl": "https://smlh5.esign.cn/auth/guide?loginId=1cfb81fe-3***-4042-a8**-8a39b1***48"
    }
}
```

