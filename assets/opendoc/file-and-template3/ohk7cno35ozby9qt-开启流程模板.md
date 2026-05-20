### 接口描述
<font style="color:rgb(51, 51, 51);">流程模板开启之后，模板才可以用于后续发起合同拟定、签署流程等。如在设置模板后已点击开启按钮，此接口可以不调用。但模板被停用编辑后，需要通过此接口再次开启。制作模板后的开启按钮，如图：</font>

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1676874956982-d04cddff-8457-48b0-bc66-ba0bbddef4bf.png)

<font style="color:rgb(51, 51, 51);">当前接口对应官网的启用按钮，如图：</font>

![](https://cdn.nlark.com/yuque/0/2023/png/447795/1676875103527-09d3c128-70ca-413b-9341-09597596dc42.png)

### 接口地址&请求方法
**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-templates/enable

**请求方法：**post

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称** | | **参数类型** | **必选** | **参数位置** | **参数说明** |
| --- | --- | :---: | :---: | :---: | --- |
| orgId | | string | 是 | body | 机构用户ID<br/><font style="color:#E8323C;">【注】用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用</font>[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)<font style="color:#E8323C;">接口通过组织机构名称/组织机构证件号进行查询</font> |
| transactorPsnId | | string | 是 | body | 经办人个人用户ID<br/><font style="color:#E8323C;">【注】通过</font> [【查询企业成员列表】](https://qianxiaoxia.yuque.com/opendoc/employee/bzrzic) <font style="color:#E8323C;">查询企业成员的账号ID（psnId），经办人必须有模板操作权限，建议直接使用管理员账号</font> |
| signTemplateId | | string | 是 | body | 流程模板ID |


### 响应参数
| **参数名称** | | | **参数类型** | **必选** | **参数说明** |
| --- | --- | --- | :---: | :---: | --- |
| code | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message 匹配，因为 message 可能会调整。</font> |
| data | | | string | 否 | 业务数据 |


### 请求示例
```json
{
    "orgId": "842ec8ce3fc*****fc91662f",
    "transactorPsnId": "7ffca******1d8f0ef0a8f6",
    "signTemplateId": "a3924a089******fd8203aa2"
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





