### 接口描述
使用signTemplateId（流程模板ID）发起合同的拟定（用户填写）和签署流程

### 接口地址&请求方法
> <font style="color:#333333;">点击下述蓝色字体{host}可跳转至API请求域名说明文档</font>
>

**接口地址：**https://[{host}](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#JsWHg)/v3/sign-flow/create-by-sign-template

**请求方法：**POST

### 请求头格式
<font style="color:rgb(64, 64, 64);">具体请求头参数，请查看</font>[公共请求头格式](https://qianxiaoxia.yuque.com/docs/share/5d0a9747-9e48-4854-9169-ae3710449aa5?#P4p3F)<font style="color:rgb(64, 64, 64);">。</font>

### 请求参数
| **参数名称****<font style="color:#8C8C8C;">（点击左侧“+”一键展开参数）</font>** | | | | | **参数类型** | **必选** | **参数位置** | **参数说明****<font style="color:#8C8C8C;">（请左右滑动查看完整描述）</font>** |
| --- | --- | --- | --- | --- | :---: | :---: | :---: | --- |
| **signTemplateId** | | | | | **string** | **是** | **body** | **流程模板ID** |
| **signFlowInitiator**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **object** | **否** | **body** | **发起方信息**（指在平台中发起合同签约的一方，合同的归属方，有权限查看签署的文件，签署通知中展示：“XXX 通知您签署... ”中的XXX即为发起方名字。）<br/>+ 发起方企业必须和流程模板ID的拥有企业一致，否则会报错：<font style="color:#DF2A3F;">“流程模板拥有者不匹配”</font>。<br/>+ 不传则默认为应用ID所属的企业来发起签署流程。<br/>+ 当指定发起方为非应用ID所属企业时，需先经过[【用户授权】](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/lmfokx)（代个人/企业用户发起合同签署权限）。 |
| | orgId | | | | string | 否 | body | 机构账号ID<br/><font style="color:#DF2A3F;">【注】用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用</font>[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)<font style="color:#DF2A3F;">接口通过组织机构名称/组织机构证件号进行查询</font> |
| | transactor | | | | object | 否 | body | 机构发起方的经办人<br/><font style="color:#DF2A3F;">【注】模板参与方设置的发起人本人时，必须在这里指定发起方经办人</font> |
| | | psnId | | | string | 否 | body | 经办人账号ID<br/><font style="color:#DF2A3F;">【注】用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用</font>[【查询个人认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/vssvtu)<font style="color:#DF2A3F;">接口通过个人账号标识（手机号或邮箱）/个人用户的证件号进行查询</font> |
| | initialRemarks | | | | list | 否 | body | 合同备注信息（显示到签署页面的任务详情信息里）<br/><font style="color:#E8323C;">【注】目前</font><font style="color:#DF2A3F;">最多支持1条备注，最多300个字符</font> |
| **signFlowConfig**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **object** | **是** | **body** | **签署流程配置项** |
| | signFlowTitle | | | | string | 是 | body | 签署任务主题<br/><font style="color:#DF2A3F;">【注】主题名称不可含有以下9个特殊字符：/ \ : * " < > | ？以及所有emoji表情</font> |
| | signFlowExpireTime | | | | int64 | 否 | body | 签署截止时间<br/><font style="color:#DF2A3F;">【注】Unix时间戳格式（单位：毫秒），默认在签署流程开启后的</font>**<font style="color:#DF2A3F;">90天</font>**<font style="color:#DF2A3F;">时截止</font> |
| | <font style="color:rgb(64, 64, 64);">autoStart</font> | | | | <font style="color:rgb(64, 64, 64);">boolean</font> | <font style="color:rgb(64, 64, 64);">否</font> | <font style="color:rgb(64, 64, 64);">body</font> | 合同拟定完成后是否自动开启签署流程，<font style="color:rgb(64, 64, 64);">默认值 true</font><br/>**<font style="color:rgb(64, 64, 64);">true</font>**<font style="color:rgb(64, 64, 64);"> - 自动开启</font><br/>**<font style="color:rgb(64, 64, 64);">false </font>**<font style="color:rgb(64, 64, 64);">- 非自动开启</font><br/><font style="color:#DF2A3F;">【注】如果有内部审批等流程需要确认填写内容是否正确，可以设置为非自动开启签署</font> |
| | autoFinish | | | | boolean | 否 | body | 所有签署方签署完成后签署流程自动完结，默认值 false<br/>**true **- 自动完结<br/>**false **- 非自动完结，需调用[【完结签署流程】](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/ynwqsm)接口完结<br/><font style="color:#DF2A3F;">【注】设置了自动完结的流程中不允许再追加签署区、抄送方，</font>[点击这里](https://qianxiaoxia.yuque.com/books/share/ab6f4376-8c8c-4422-9be6-713ab7d7b98b/gsy6xe)<font style="color:#DF2A3F;"> 了解更多签署流程状态说明。</font> |
| | notifyUrl | | | | string | 否 | body | 接收相关回调通知的Web地址，详见[【流程模板回调通知接收说明】](https://qianxiaoxia.yuque.com/opendoc/notify3/qbgdz62humots27s)、[【签署回调通知接收说明】](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/sblzg8) |
| | signConfig<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | body | 签署配置项 |
| | | availableSignClientTypes | | | string | 否 | body | 签署终端类型，默认值1和2（英文逗号分隔）<br/>**1** - 网页（自适配H5/PC样式），**2** - 支付宝<br/><font style="color:#E8323C;">【注】</font><font style="color:#DF2A3F;">如果是开发者自己的app或者支付宝小程序等端内嵌e签宝H5/PC，需要传：1（网页端）</font> |
| | | autoFillAndSubmit | | | boolean | 否 | body | 必填控件已预填值情况下是否自动跳过该参与方的填写步骤<br/>默认值：false<br/>**true **- 是（自动跳过）<br/>**false **- 否（仍需手动提交）<br/><font style="color:#DF2A3F;">【注】</font><br/>+ <font style="color:#DF2A3F;">参与方的必填控件需要全部有值才能自动跳过</font> |
| | | editComponentValue | | | boolean | 否 | body | 用户填写页面是否可以修改系统预填内容，默认值：**true**<br/>**true **- 可修改<br/>**false **- 不可修改 |
| | noticeConfig<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | body | 流程整体通知配置项 |
| | | noticeTypes | | | string | 否 | body | 通知类型，通知发起方、签署方、抄送方，<font style="color:#DF2A3F;">默认不通知</font>（值为""空字符串），允许多种通知方式，请使用英文逗号分隔<br/>传空 - 不通知<font style="color:#E8323C;">（默认值）</font><br/>**1** - 短信通知<font style="color:#DF2A3F;">（如果套餐内带“分项”字样，请确保开通【电子签名流量费（分项）认证】中的子项：【短信服务】，否则短信通知收不到）</font><br/>**2 **- 邮件通知<br/><font style="color:#E8323C;">【注】个人账号中需要绑定短信/邮件才有对应的通知方式。</font><font style="color:#DF2A3F;">需要绑定短信/邮件才有对应的通知方式。</font> |
| | | examineNotice | | | boolean | 否 | body | 通知给企业印章用印审批人员的通知类型，按照账号中的手机号或邮箱的填写情况进行通知。   **true** - 发送消息（短信+邮件+e签宝官网站内信）<br/><font style="color:#DF2A3F;">（如果套餐内带“分项”字样，请确保开通【电子签名流量费（分项）认证】中的子项：【短信服务】，否则短信通知收不到）</font>   **false** - 不发送消息<br/><font style="color:#E8323C;">【注】不传值默认取noticeTypes配置的通知方式</font> |
| | authConfig<font style="color:rgb(232, 50, 60);"></font> | | | | object | 否 | body | 流程整体认证配置项 |
| | | psnAvailableAuthModes | | | list | 否 | body | 个人实名认证方式，可选值：<br/>+ **PSN_MOBILE3 **- 个人运营商三要素认证<br/>+ **PSN_FACE **- 刷脸认证<br/>+ **PSN_BANKCARD4 **- 个人银行卡四要素认证 |
| | | orgAvailableAuthModes | | | list | 否 | body | 机构实名认证方式，可选值：<br/>+ **ORG_BANK_TRANSFER **- 组织机构对公账户打款认证<br/>+ **ORG_ALIPAY_CREDIT **- 企业支付宝认证<br/>+ **ORG_LEGALREP_AUTHORIZATION **- 组织机构授权委托书认证<br/>+ **ORG_LEGALREP **- 法定代表人本人认证 |
| | contractConfig | | | | object | 否 | body | 合同相关配置项 |
| |  | allowToRescind | | | boolean | 否 | body | 该签署流程是否允许发起解约，默认true<br/>**true **- 允许<br/>**false **- 不允许 |
| **participants**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **array** | **否** | **body** | **参与方信息**<br/>+ 如果模板设置页面的参与方配置为：**使用模板时指定 **和** 固定企业** 时，则此参数必传，需要用[【查询流程模板详情】](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/pfzut7ho9obc7c5r)接口查询参与方ID相关信息进行参与方绑定。<br/>+ 如果模板设置页面的参与方配置为：**固定成员 **和** 发起人本人 **时，则此参数不要指定，否则接口会报错。 |
| | participantId | | | | string | 是 | body | 参与方ID<br/><font style="color:#DF2A3F;">补充说明：</font><br/>+ 需要用[【查询流程模板详情】](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/pfzut7ho9obc7c5r)接口查询参与方ID<br/>+ 通过参与方ID绑定下述参与方，绑定企业传企业参与方，绑定个人传个人参与方 |
| | orgParticipant | | | | object | 否 | body | 企业参与方 |
| | | orgId | | | string | 否 | body | 企业ID<br/><font style="color:#DF2A3F;">【注】</font><br/>+ <font style="color:#DF2A3F;">orgName与orgId二选一传值</font><br/>+ <font style="color:#DF2A3F;">用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用</font>[【查询机构认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/xxz4tc)<font style="color:#DF2A3F;">接口通过组织机构名称/组织机构证件号进行查询</font> |
| | | orgName | | | string | 否 | body | 企业名称<br/><font style="color:#DF2A3F;">【注】orgName与orgId二选一传值</font> |
| | | sealOwnerId | | | string | 否 | body | 印章所属主体企业ID<br/><font style="color:#DF2A3F;">【注】</font><br/>+ <font style="color:#DF2A3F;">存在印章跨企业授权场景使用，需联系e签宝技术对接人员确认后才可使用</font><br/>+ <font style="color:#DF2A3F;">可使用</font>[【查询流程模板详情】](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/pfzut7ho9obc7c5r)<font style="color:#DF2A3F;">接口查询designatedSealIds参数中的orgId</font> |
| | | transactor | | | object | 否 | body | 企业参与方经办人 |
| | | | transactorPsnId | | string | 否 | body | 经办人个人ID<br/><font style="color:#DF2A3F;">【注】</font><br/>+ <font style="color:#DF2A3F;">当传入orgId时，transactorPsnId必传，transactorPsnAccount和transactorName不能传</font><br/>+ <font style="color:#DF2A3F;">用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用</font>[【查询个人认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/vssvtu)<font style="color:#DF2A3F;">接口通过个人账号标识（手机号或邮箱）/个人用户的证件号进行查询</font> |
| | | | transactorPsnAccount | | string | 否 | body | 经办人手机号/邮箱<br/><font style="color:#DF2A3F;">【注】当传入orgName时，transactorPsnAccount、transactorName必传，transactorPsnId不能传</font> |
| | | | transactorName | | string | 否 | body | 经办人姓名 |
| | | | transactorPsnIDCardNum | | string | 否 | body | 经办人证件号 |
| | | | transactorPsnIDCardType | | string | 否 | body | 经办人证件类型，可选值如下：<br/>**CRED_PSN_CH_IDCARD** - 中国大陆居民身份证<font style="color:#E8323C;">（默认值）</font><br/>**CRED_PSN_CH_HONGKONG** - 香港来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_MACAO **- 澳门来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_TWCARD **- 台湾来往大陆通行证（台胞证）<br/>**CRED_PSN_PASSPORT **- 护照<br/><font style="color:#DF2A3F;">【注】</font>**<font style="color:#DF2A3F;">CRED_PSN_CH_IDCARD</font>**<font style="color:#DF2A3F;"> 类型同时兼容港澳台居住证（81、82、83开头18位证件号）、外国人永久居住证（9开头18位证件号）</font> |
| | psnParticipant | | | | object | 否 | body | 个人参与方 |
| | | psnId | | | string | 否 | body | 个人ID<br/><font style="color:#DF2A3F;">【注】</font><br/>+ <font style="color:#DF2A3F;">psnAccount与psnId二选一传值</font><br/>+ <font style="color:#DF2A3F;">用户在e签宝注册实名后才有账号ID，账号ID获取方式请使用</font>[【查询个人认证信息】](https://qianxiaoxia.yuque.com/opendoc/auth3/vssvtu)<font style="color:#DF2A3F;">接口通过个人账号标识（手机号或邮箱）/个人用户的证件号进行查询</font> |
| | | psnAccount | | | string | 否 | body | 个人手机号/邮箱<br/><font style="color:#DF2A3F;">【注】psnAccount与psnId二选一传值</font> |
| | | psnName | | | string | 否 | body | 个人姓名<br/><font style="color:#DF2A3F;">【注】当传入psnAccount时，psnName必传；当传入psnId时，psnName不能传。</font> |
| | | psnIDCardNum | | | string | 否 | body | 个人证件号 |
| | | psnIDCardType | | | string | 否 | body | 个人证件类型，可选值如下：<br/>**CRED_PSN_CH_IDCARD** - 中国大陆居民身份证<font style="color:#E8323C;">（默认值）</font><br/>**CRED_PSN_CH_HONGKONG** - 香港来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_MACAO **- 澳门来往大陆通行证（回乡证）<br/>**CRED_PSN_CH_TWCARD **- 台湾来往大陆通行证（台胞证）<br/>**CRED_PSN_PASSPORT **- 护照<br/><font style="color:#DF2A3F;">【注】</font>**<font style="color:#DF2A3F;">CRED_PSN_CH_IDCARD</font>**<font style="color:#DF2A3F;"> 类型同时兼容港澳台居住证（81、82、83开头18位证件号）、外国人永久居住证（9开头18位证件号）</font> |
| **addCopiers** | | | | | **array** | **否** | **body** | **添加抄送方**<br/>支持场景：①抄送给个人 ②抄送给企业的接收人 |
|  | copierPsnInfo | | | | object | 否 | body | 个人抄送方信息 |
| |  | psnId | | | string | 否 | body | 个人抄送方ID（若已知用户的psnId，请传此参数） |
| | | psnAccount | | | string | 否 | body | 个人抄送方账号，手机号或邮箱（若未知用户的psnId，请传此参数） |
| | | psnName | | | string | 否 | body | 个人抄送方姓名（若未知用户的psnId，请传此参数） |
| | copierOrgInfo | | | | object | 否 | body | 机构抄送方信息 |
| |  | orgId | | | string | 否 | body | 机构抄送方ID（若已知机构的orgId，请传此参数） |
| | | orgName | | | string | 否 | body | 机构抄送方名称（若未知机构的orgId，请传此参数） |
| **addAttachments**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **array** | **否** | **body** | **添加合同附件信息**（指无需签名的文件，仅用于查看）<br/>+ 通过接口预设置的合同附件，发起签署页面仅限预览，无法修改删除 |
|  | fileId | | | | string | 否 | body | 合同附件的文件ID<br/><font style="color:#E8323C;">【注】</font><font style="color:#DF2A3F;">附件上传接口：</font>[上传本地文件](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/rlh256) |
| | fileName | | | | string | 否 | body | 合同附件名称<br/><font style="color:#E8323C;">【注】</font><font style="color:#DF2A3F;">名称不可含有以下9个特殊字符：/ \ : * " < > | ？以及所有emoji表情</font> |
| **components**<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | **array** | **否** | **body** | **控件列表**<br/><font style="color:#E8323C;">【注】用于模板控件的开发者预填内容</font> |
|  | fileId | | | | string | 否 | body | 控件所属文件ID<br/><font style="color:#E8323C;">【注】</font><font style="color:#DF2A3F;">可以用</font>[【查询流程模板详情】](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/pfzut7ho9obc7c5r)<font style="color:#DF2A3F;">接口查询控件所属的文件ID</font> |
| | componentId | | | | string | 否 | body | 控件ID（控件ID和控件key二选一） |
| | componentKey | | | | string | 否 | body | 控件key（控件ID和控件key二选一） |
| | componentValue | | | | string | 否 | body | 控件填充值<br/><font style="color:#E8323C;">【注】</font><font style="color:#DF2A3F;">不同类型的控件填充值示例</font>：[请点击跳转](https://qianxiaoxia.yuque.com/opendoc/helper/hznoxovemgf2nnuq) |


### 响应参数
| **参数名称** | | | | | **参数类型** | **必选** | **参数说明****<font style="color:#F5222D;"></font>** |
| --- | --- | --- | --- | --- | :---: | :---: | --- |
| code | | | | | int32 | 是 | 业务码，0表示成功，非0表示异常。 |
| message | | | | | string | 否 | 业务信息<br/><font style="color:#F5222D;">请根据 code 来判断错误情况，不应该依赖 message匹配，因为 message 可能会调整。</font> |
| data<font style="color:rgb(232, 50, 60);">（点击“+”展开详情）</font> | | | | | object | 否 | 业务数据 |
|  | signFlowId | | | | string | 否 | 签署流程ID |


### 请求示例
```json
{
  "signTemplateId": "请传入流程模板ID：11***087ee0",
  "signFlowConfig": {
    "signFlowTitle": "请传入本次签署任务的主题",
    "autoFinish": true,
    "autoStart": true,
    "noticeConfig": {
      "noticeTypes": "1"
    },
    "notifyUrl": "请传入回调通知推送地址（http或者https开头）：http://xx.xx.xx/notify",
    "signConfig": {
      "availableSignClientTypes": "1",
      "autoFillAndSubmit": true,
      "editComponentValue": false
    },
    "authConfig": {
      "psnAvailableAuthModes": [
        "PSN_MOBILE3",
        "PSN_FACE",
        "PSN_BANKCARD4"
      ],
      "orgAvailableAuthModes": [
        "ORG_BANK_TRANSFER",
        "ORG_LEGALREP",
        "ORG_LEGALREP_AUTHORIZATION",
        "ORG_ALIPAY_CREDIT"
      ]
    }
  },
  "participants": [
    {
      "participantId": "签署方是使用模板时指定必须传，通过【查询流程模板详情】接口查询参与方ID：7f***debe8fa",
      "orgParticipant": {
        "orgName": "企业签署方的企业名称：***有限公司",
        "transactor": {
          "transactorPsnAccount": "经办人联系方式：153***1110",
          "transactorName": "经办人姓名：张三"
        }
      }
    },
    {
      "participantId": "签署方是使用模板时指定必须传，通过【查询流程模板详情】接口查询参与方ID：1e9211****6",
      "psnParticipant": {
        "psnAccount": "个人签署方的联系方式：139****3333",
        "psnName": "个人姓名：李四"
      }
    }
  ],
  "components": [
    {
      "fileId": "通过【查询流程模板详情】接口查询文件底稿ID：b68a****12fg",
      "componentId": "dfdb9d7b84ba111112dd922ded7",
      "componentValue": "填充值001"
    },
    {
      "fileId": "通过【查询流程模板详情】接口查询文件底稿ID：b68a****12fg",
      "componentId": "27312dd3f0911111e581a18dba34",
      "componentValue": "填充值002"
    },
    {
      "fileId": "通过【查询流程模板详情】接口查询文件底稿ID：b68a****12fg",
      "componentId": "0a1fca39cbb1111f8f4c56c1a80c48",
      "componentValue": "填充值003"
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
        "signFlowId": "ae87ca*******0d3e25d"
    }
}
```





