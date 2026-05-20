回调通知Url地址配置方式和回调通知数据接收，详见签署回调通知接收说明。

【触发条件】当抄送人通过通知里的链接进入到合同详情页面时，则认为抄送人已经查看此链接。

:::warning
<font style="color:#DF2A3F;">【注意】：</font>

+ 请联系e签宝技术人员将签署完成页面配置从默认微信小程序端进入改为h5页面进入（如果抄送人默认从微信小程序端查看文件，开发者无法收到已读通知）。
+ 同一签署流程中，同一个抄送人仅在首次进入合同详情页面时触发已读回调通知，多次进入不会重复触发。 

:::



**回调参数：**

| **参数名** | | | **必填** | **参数类型** | **说明** |
| --- | --- | --- | :---: | :---: | --- |
| action | | | 是 | string | 标记该通知的业务类型，该通知固定为：**<font style="color:#52C41A;"></font>**<br/>**<font style="color:#52C41A;">COPIER_READ</font>** |
| timestamp | | | 是 | int64 | 回调通知触发时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| signFlowId | | | 是 | string | 签署流程ID |
| readTime | | | 是 | string | 已读时间，格式：yyyy-MM-dd HH:mm:ss |
| copier<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | 是 | object | 抄送人信息 |
| | psnId | | 否 | string | 抄送人账号ID |
| | psnAccount | | 否 | object | 抄送人账号 |
| | | accountMobile | 否 | string | 手机号（抄送人账号标识，登录e签宝官网的凭证） |
| | | accountEmail | 否 | string | 邮箱号（抄送人账号标识，登录e签宝官网的凭证） |


**通知示例：**

```json
{
    "action": "COPIER_READ",
    "signFlowId": "27061cb*******fc074",
    "readTime": "2023-10-13 18:05:12",
    "timestamp": 1697191512202,
    "copier": {
        "psnId": "c92520ec*****862246bd9b50f",
        "psnAccount": {
            "accountMobile": "159*****512"
        }
    }
}
```

