#### 【触发条件】当在页面进行法定代表人变更操作成功后触发
![](https://cdn.nlark.com/yuque/0/2024/png/447795/1704956634752-ed10c162-aaa9-499d-b1cc-58dd4dc19e32.png)

#### 回调参数
回调通知数据接收，详见[e签宝全网回调通知接收说明](https://qianxiaoxia.yuque.com/opendoc/notify3/etrrn6c04lb0294i)。

| **参数名称** | | **必选** | **参数类型** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| action | | 是 |   string | 通知的业务类型，固定值：**<font style="color:#52C41A;">UPDATE_LEGAL_REP</font>** |
| timestamp | | 是 | int64 | 回调通知发送时间（如重试多次均返回第一次时间，毫秒级时间戳格式） |
| orgId | | 是 | string | 机构账号ID |
| orgName | | 是 | string | 机构名称 |
| legalRepName | | 是 | string | 法定代表人姓名 |
| legalRepIDCardType | | 是 | string | 法定代表人证件类型<br/>+ **CRED_PSN_CH_IDCARD** - 中国大陆居民身份证（默认值）<br/>+ **CRED_PSN_CH_HONGKONG** - 香港来往大陆通行证（回乡证）<br/>+ **CRED_PSN_CH_MACAO** - 澳门来往大陆通行证（回乡证）<br/>+ **CRED_PSN_CH_TWCARD **- 台湾来往大陆通行证（台胞证）<br/>+ **CRED_PSN_PASSPORT** - 护照<br/><font style="color:#DF2A3F;">注：</font>[【获取机构认证&授权页面链接】](https://open.esign.cn/doc/opendoc/auth3/kcbdu7)接口指定授权范围：get_org_identity_info 才会返回该字段 |
| legalRepIDCardNum | | 是 | string | 法定代表人证件号<br/><font style="color:#DF2A3F;">注：</font>[【获取机构认证&授权页面链接】](https://open.esign.cn/doc/opendoc/auth3/kcbdu7)接口指定授权范围：get_org_identity_info 才会返回该字段 |


#### 通知示例
```json
{
  "action": "UPDATE_LEGAL_REP",
  "orgId": "c0e0574******56d65746b26398",
  "orgName": "杭州天谷信息科技有限公司",
  "legalRepName": "张三",
  "legalRepIDCardType": "CRED_PSN_CH_IDCARD",
  "legalRepIDCardNum": "2311*********29",
  "timestamp": 1680745281887
}
```



