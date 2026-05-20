## 1.智能台账数据推送交互图
![](https://cdn.nlark.com/yuque/__puml/85a6f1fe85899eb7cdff1844d1b306b3.svg)

## 2.接收智能台账数据如何实现？
### 2.1 准备一个支持 HttpPost的 Web服务
e签宝服务端将以 POST 方式推送 JSON 数据格式的消息，因此企业开发者的Web服务需要能够支持 HttpPost和 JSON 数据解析。

### 2.2 设置智能台账数据的接收地址
开发者可登录e签宝[开放平台](https://open.esign.cn)后通过【控制台】-【我的应用】-【配置】-【应用配置】-【消息推送】来添加合同数据接收URL，然后进入【事件订阅】选择【台账提取】。

:::info
注：

+ 接收数据推送的地址URL格式为 schema://{host}:{port}/{path}，[点击查看URL格式说明](https://open.esign.cn/doc/detail?id=opendoc/data-push/pdscck&namespace=opendoc/data-push&page=kDrh0)。
+ 请保证接收数据推送的地址URL拼接正确，且互联网可成功访问。

:::

### 2.3 接收并响应
#### 2.3.1 接收e签宝数据推送
当e签宝SaaS智能合同中发起的合同被签署完毕后，e签宝会根据开发者的配置的URL发送POST请求，推送智能台账数据。

**智能台账数据推送时间如下**：

（1）**增量合同：**在合同签署完成时会触发推送，每份已签署的合同只会被一个台账提取数据，合同签署完成后e签宝服务端将主动进行数据推送。

（2）**存量合同：**当开发者已勾选“按照当前台账规则更新历史合同数据”且设置“推送应用”后，e签宝服务端将批量推送该台账提取的已签署完成合同数据。

:::tips
注：

+ 请按照 [e签宝数据推送服务器信息](https://open.esign.cn/doc/detail?id=opendoc/data-push/pdscck&namespace=opendoc/data-push&page=KyEtR) 配置贵司防火墙，以便成功接收e签宝数据推送。
+ 如果需校验所接收的数据是否e签宝服务端推送，可参考[《数据接收安全机制》](https://open.esign.cn/doc/detail?id=opendoc/data-push/ft8sqq&namespace=opendoc/data-push)进行设置。

:::



**请求头**数据格式如下：

```http
Content-Type:application/json; charset=UTF-8
X-Tsign-Open-App-Id:7111XXX
X-Tsign-Open-TIMESTAMP:1563968035000
X-Tsign-Open-SIGNATURE-ALGORITHM:hmac-sha256
X-Tsign-Open-SIGNATURE:ZdTWCiDGlbJbDcOQbPEc0/BXKi+oGgNak97uc+7jbw8=
```

**请求Body**数据格式如下：

```json
{"type":"LEDGER_EXTRACT","id":"test_ng_0001","created":1636956436000,"data":{"operation":0,"meta":[{"fieldId":"ledgerId","fieldType":1,"fieldName":"台账ID"},{"fieldId":"processTitle","fieldType":1,"fieldName":"合同任务标题"},{"fieldId":"processId","fieldType":1,"fieldName":"合同任务id"},{"fieldId":"flowId","fieldType":1,"fieldName":"子流程ID"},{"fieldId":"tenantName","fieldType":1,"fieldName":"租户名"},{"fieldId":"socialCreditCode","fieldType":1,"fieldName":"租户企业统一社会信用代码"},{"fieldId":"processFinishTime","fieldType":3,"fieldName":"合同签署完成时间"},{"fieldId":"amount","fieldType":2,"fieldName":"合同合同金额（自定义模板字段）"},{"fieldId":"expireTime","fieldType":3,"fieldName":"合同到期日期（自定义模板字段）"},{"fieldId":"goodsName","fieldType":1,"fieldName":"采购商品名（自定义模板字段）"}],"row":[{"ledgerId":["XXX"],"processTitle":["xxxxx"],"processId":["x0001"],"flowId":["XXX-XX"],"tenantName":["某某企业"],"socialCreditCode":["xxx"],"processFinishTime":[1636956300000],"amount":[3000.12],"expireTime":[1636358432],"goodsName":["空气开关"]}]}}
```

其中：

**type** 为数据推送事件类型，开发者可以通过判断返回body中的 **type** 数据推送事件类型，从而进行下一步业务处理。 

type枚举值如下：

| **type数据推送事件类型** | **type数据推送事件名称** |
| --- | :--- |
| LEDGER_EXTRACT | 台账数据已提取 |


<font style="color:#F5222D;">type事件类型可能会出现新增，建议开发者考虑兼容性处理，防止出现代码异常造成业务卡死。</font>

<font style="color:#F5222D;">例如，type数据推送事件类型判断时，仅将贵司业务需要的类型进行判断并进入下一步业务，其他不需要的类型做忽略处理，这样可以防止新增类型对现有业务造成影响。</font>

#### 2.3.2 智能台账数据字段说明
:::warning
随业务发展，我们推送给开发者的JSON数据中可能会增加参数，开发者请参考[《JSON反序列化处理方法》](https://open.esign.cn/doc/detail?id=opendoc%2Fdata-push%2Fbmeoew&namespace=opendoc%2Fdata-push)在JSON反序列化时进行容错处理。

:::

| **<font style="color:black;">参数名称</font>** | | |  | **<font style="color:black;">类型</font>** | **<font style="color:black;">必选</font>** | **<font style="color:black;">参数说明</font>** |
| --- | --- | --- | --- | :---: | :---: | --- |
| type | | | | string | 是 | 数据推送事件类型，LEDGER_EXTRACT 为台账数据已提取 |
| id | | | | string | 是 | 事件对象ID，由 e签宝 生成的64位长度的字符串。 |
| created | | | | int64 | 是 | 事件发生的时间 |
| data | | | | object | 是 | 数据信息 |
| | operation | | | int32 | 是 | operation枚举值<font style="color:#333333;background-color:#FFFFFF;"> </font><br/><font style="color:#333333;background-color:#FFFFFF;">0 - 新增   </font><br/><font style="color:#333333;background-color:#FFFFFF;">1 - 更新</font> |
| | meta | | | array | 是 | 台账元数据 |
| |  | fieldType | | int32<br/> | 是 | 字段类型枚举值<br/>1 - 文本<br/>2 - 数字（double类型）<br/>3 - 日期（UnixTime时间戳类型）<br/>4 - 单选（对应模板控件类型：单选框、下拉列表）<br/>5 - 复选（对应模板控件类型：复选框）<br/>8 - 图片下载地址<br/>9 - JSON对象 |
| | | <br/>fieldName | | string | 是 | 字段名称 |
| | | fieldId | | string | 是 | 字段ID<br/><font style="color:#E8323C;">ledgerId</font> - 台账ID<br/><font style="color:#E8323C;">processTitle</font> - 合同流程标题<br/><font style="color:#E8323C;">processId</font> - 合同流程ID<br/><font style="color:#E8323C;">flowId</font> - 子流程ID（可用于后续文件下载）<br/><font style="color:#E8323C;">tenantName</font> - 机构名称（对接e签宝的企业名称）<br/><font style="color:#E8323C;">socialCreditCode</font> - 统一社会信用代码<br/><font style="color:#E8323C;">processFinishTime</font> - 合同签署完成时间<br/><font style="color:#E8323C;">templateId</font> - 合同模板编号<br/><font style="color:#E8323C;">templateName</font> - 合同模板名称<br/><font style="color:#E8323C;">signer</font> - 签署人信息<br/>以上 10 个字段属于e签宝系统保留字段。<br/>如开发者额外自定义模板字段，则 fieldId 值为自定义的字段ID。 |
| | row | | | array | 是 | 台账行数据，Key-Value形式。<br/>每行数据有多个字段field,通过fieldId与meta元数据关联。Key为 meta 字段里的 fieldId，Value为meta 字段里的 fieldId所对应的值。Value值是array数组形式（复选框需要支持的场景）。 |
| | | 自定义的模板字段XXX | | string | 是 | Key为 meta 字段中 fieldId，对应Value为meta 字段里的 fieldId所对应的值。 |
| | | ledgerId | | string | 是 | 台账ID |
| | | processTitle | | string | 是 |  合同流程标题 |
| | | processId | | string | 是 | 合同流程ID |
| | | flowId | | string | 是 | 子流程ID（可用于后续文件下载） |
| | | tenantName | | string | 是 | 机构名称（对接e签宝的企业名称） |
| | | socialCreditCode | | string | 是 | 统一社会信用代码 |
| | | processFinishTime | | string | 是 | 合同签署完成时间 |
| | | templateId | | string | 是 | 合同模板编号 |
| | | templateName | | string | 是 | 合同模板名称 |
| | | signer | | object | 是 | 签署人信息 |
| | | | signSerialNumber | string | 是 | 签署方序号<br/>（1）若有设置顺序，按照设置的签署人顺序生成序号<br/>（2）若未设置顺序，系统随机生成序号 |
| | | | signerType | string | 是 | 签署方类型<br/>person - 个人 | company - 企业 |
| | | | personGid | string | 否 | e签宝SaaS个人账号GID |
| | | | personOid | string | 否 | e签宝SaaS个人账号OID |
| | | | personName | string | 否 | 个人姓名<br/><font style="color:#E8323C;">若 SaaS API 或第三方平台中未设置，此值为空。</font> |
| | | | contactType | string | 否 | 个人联系方式类型<br/>mobile - 手机 | email - 邮箱<br/><font style="color:#E8323C;">若 SaaS API 或第三方平台中未设置，此值为空。</font> |
| | | | contactInfo | string | 否 |  个人联系方式信息<br/><font style="color:#E8323C;">若 SaaS API 或第三方平台中未设置，此值为空。</font> |
| | | | companyGid | string | 否 | 组织机构GID<br/><font style="color:#E8323C;">个人签署时，此值为空。</font> |
| | | | companyOid | string | 否 | 组织机构OID<br/><font style="color:#E8323C;">个人签署时，此值为空。</font> |
| | | | companyName | string | 否 | 组织机构名称<br/><font style="color:#E8323C;">个人签署时，此值为空。</font> |
| | | | thirdPartyId | string | 否 |  e签宝SaaS账号创建来源<br/>（第三方平台ID）<br/><font style="color:#E8323C;">用户首次登录e签宝SaaS使用第三方平台（钉钉、支付宝、微信）时，此参数才会有值。</font> |
| | | | thirdPartyName | string | 否 |  e签宝SaaS账号创建来源<br/>（第三方平台名称）<br/>ALI_PAY - 支付宝平台<br/>WE_CHAT - 微信平台<br/>DING_TALK - 钉钉平台<br/><font style="color:#E8323C;">用户首次登录e签宝SaaS使用第三方平台（钉钉、支付宝、微信）时，此参数才会有值。</font> |


智能台账数据字段说明JSON示例如下：

```json
{
    "type":"LEDGER_EXTRACT",
    "id":"test_ng_0001",
    "created":1636956436000,
    "data":{
        "operation":0,
        "meta":[
            {
                "fieldId":"ledgerId",
                "fieldType":1,
                "fieldName":"台账ID"
            },
            {
                "fieldId":"processTitle",
                "fieldType":1,
                "fieldName":"合同任务标题"
            },
            {
                "fieldId":"processId",
                "fieldType":1,
                "fieldName":"合同任务id"
            },
            {
                "fieldId":"flowId",
                "fieldType":1,
                "fieldName":"子流程ID"
            },
            {
                "fieldId":"tenantName",
                "fieldType":1,
                "fieldName":"租户名"
            },
            {
                "fieldId":"socialCreditCode",
                "fieldType":1,
                "fieldName":"租户企业统一社会信用代码"
            },
            {
                "fieldId":"processFinishTime",
                "fieldType":3,
                "fieldName":"合同签署完成时间"
            },
            {
                "fieldId":"amount",
                "fieldType":2,
                "fieldName":"合同合同金额（自定义模板字段）"
            },
            {
                "fieldId":"expireTime",
                "fieldType":3,
                "fieldName":"合同到期日期（自定义模板字段）"
            },
            {
                "fieldId":"goodsName",
                "fieldType":1,
                "fieldName":"采购商品名（自定义模板字段）"
            }
        ],
        "row":[
            {
                "ledgerId":[
                    "XXX"
                ],
                "processTitle":[
                    "xxxxx"
                ],
                "processId":[
                    "x0001"
                ],
                "flowId":[
                    "XXX-XX"
                ],
                "tenantName":[
                    "某某企业"
                ],
                "socialCreditCode":[
                    "xxx"
                ],
                "processFinishTime":[
                    1636956300000
                ],
                "amount":[
                    3000.12
                ],
                "expireTime":[
                    1636358432
                ],
                "goodsName":[
                    "空气开关"
                ],
                "signer":[
                    {
                        "signSerialNumber":1,
                        "signerType":"company",
                        "contactType":"mobile",
                        "contactInfo":"186XXXX6617",
                        "personGid":"f0205eaXXXXXXXXXXXXXXXXXXXXXX788",
                        "personOid":"d6d08dXXXXXXXXXXXXXXXXXXXXXXX4df",
                        "companyName":"esigntest静嘉test",
                        "companyGid":"781a04XXXXXXXXXXXXXXXXXXXXXXabe",
                        "companyOid":"e04f80XXXXXXXXXXXXXXXXXXXXXXe5f",
                        "thirdPartyId":"s6XXXXXXXXXXX6T4NiiOwwQiEiE",
                        "thirdPartyName":"DING_TALK"
                    }
                ]
            }
        ]
    }
}
```

#### 2.3.3 响应e签宝回调通知
当收到e签宝的回调通知后，开发者返回介于200~299的HTTP状态码给e签宝，e签宝均认为推送成功。

建议返回给e签宝的响应Body数据格式如下：

```json
{"code":"200","msg":"success"}
```

:::tips
#### 注意事项
+ <font style="color:rgb(23, 26, 29);"> 当开发者返回给e签宝的http请求状态介于</font><font style="color:#E8323C;">200~299</font><font style="color:rgb(23, 26, 29);">之间，e签宝认为通知成功，否则e签宝认为通知失败，通知失败重试机制：</font>共重试<font style="color:#F5222D;">14</font>次。重试间隔时间：1s 5s 10s 10s 30s 1m 3m 6m 10m 20m 30m 1h 2h 2h（如果中间重试请求成功，则中断不再重试）。
+ <font style="color:#F5222D;">为避免json解析失败导致重复触发异步回调通知，</font>在接收到回调请求时，需返回HTTP 状态码 200，并保证返回的json数据不包含`<font style="color:#1890FF;">空格\/</font>`等特殊字符，建议返回`<font style="color:#F5222D;">{"code":"200","msg":"success"}</font>`即可；
+ 为了保障异步通知的可靠性，建议开发者在接收回调通知过程中，尽可能减少业务操作，改用异步方式处理后续业务流程。
+ 为了保障回调通知的时效性，请在5秒内返回HTTP状态码200给e签宝。如果贵司接收到回调通知后内部处理业务逻辑较长，建议采用异步方式进行处理。

:::

### 2.4 下载已签署合同文件
智能台账数据推送接收完毕后，如果还需要下已签署的合同文件，可以使用接收到的子流程flowId参数并搭配SaaS API 标准版中的[【流程文档下载】](https://open.esign.cn/doc/detail?id=opendoc/saas_api/oyqsoq_zknh6g&namespace=opendoc/saas_api)接口进行文件下载。

## 3.接收回调通知的地址URL格式说明
**格式：**

schema://{host}:{port}/{path}

**<font style="color:#F5222D;background-color:#D9D9D9;">注意url中不能包含空格或特殊字符</font>**

**说明：**

schema 指 https 或 http

host 指 贵司域名 或 贵司公网IP

port 指 服务对应的端口

path 指 贵司Web服务具体路径

| **正确的示例：** |  |
| --- | --- |
| 正确的URL格式 | [https://example.demo.cn:8080/notify/receive](https://example.demo.cn:8080/notify/receive) |
| 正确的URL格式 | [http://223.X.X.5:8080/notify/receive](http://223.X.X.5:8080/notify/receive) |
| **错误的示例：** |  |
| 只有地址，没有具体服务路径 | [https://example.demo.cn:8080](https://example.demo.cn:8080) |
| 只有路径没有地址 | [.notify/receive](.notify/receive) |
| 本地内网IP，互联网无法访问 | [https://localhost:8080/notify/receive](https://localhost:8080/notify/receive) |
| 本地内网IP，互联网无法访问 | [http://192.168.1.1:8080/notify/receive](http://192.168.1.1:8080/notify/receive) |
| 本地内网IP，互联网无法访问 | [https://127.0.0.1:8080/notify/receive](http://127.0.0.1:8080/notify/receive) |
| 非URL格式 | test、123456 |


## 4.e签宝回调通知服务器信息
如果贵司需要防火墙配置后才允许e签宝消息通知服务推送数据，请根据下方信息进行贵司防火墙设置。

| **环境** | **公网IP** |
| :---: | :---: |
| 沙箱模拟环境 | <font style="color:rgb(38, 38, 38);">47.96.79.204</font> |
| 正式环境 | <font style="color:rgb(38, 38, 38);">118.31.35.8</font> |


