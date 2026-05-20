## 基础介绍
<font style="color:rgb(15, 17, 21);">通过预定义可复用的“业务控件”，确保合同模板的规范统一，并提升模板制作和填充效率。</font>

:::info
**<font style="color:rgb(15, 17, 21);">适用场景</font>**

**<font style="color:rgb(15, 17, 21);">1、统一规范</font>**<font style="color:rgb(15, 17, 21);">：当多个模板制作人需要共用一套标准字段（如“公司全称”、“证件号码”）时，可将其定义为业务控件。确保所有模板中同一字段的规则、格式完全一致。</font>

**<font style="color:rgb(15, 17, 21);">2、一次定义，多处填充</font>**<font style="color:rgb(15, 17, 21);">：当同一内容（如“甲方名称”）需在合同模板的多个位置出现时，只需定义一个业务控件并拖入对应位置。在填写合同时，仅需填写一次，所有位置即可自动同步填充，避免重复制作与数据不一致的风险。</font>

:::

:::warning
**<font style="color:#DF2A3F;">注意：开发者在当前appId下，最多可以创建 30000个自定义控件， 1000个自定义控件组。</font>**

:::

## 效果展示
通过提前调用接口制作自定义业务控件以及业务控件组，在【[获取制作合同模板页面](https://open.esign.cn/doc/opendoc/pdf-sign3/xagpot)】或者【[获取编辑合同模板页面](https://open.esign.cn/doc/opendoc/pdf-sign3/lgb2go)】接口入参中进行指定展示的自定义控件信息，效果如下：

此模板制作界面中添加了两个业务控件组，每个控件组中有单独的业务控件，同一个自定义控件允许拖拽至不同位置中。

![](https://cdn.nlark.com/yuque/0/2025/png/449512/1756710043648-e79723f3-24b1-4eb6-834a-29016f80d51b.png)

![](https://cdn.nlark.com/yuque/0/2025/png/449512/1756710616687-f483b4b6-71e5-44df-a6c7-020d1dbaf03f.png)

## 涉及接口及关键参数
### 自定义控件相关
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [创建自定义业务控件](https://open.esign.cn/doc/opendoc/pdf-sign3/agc4mx5ei2cg8qsc) | 支持设置控件名称，控件类型、以及控件共用和特有属性，最终生成自定义控件ID。 | **<font style="color:#E8323C;">必需</font>** |
| [编辑自定义业务控件](https://open.esign.cn/doc/opendoc/pdf-sign3/xg6mix582gwcfopp) | 通过此接口进行修改自定义业务控件的控件名称。 | **<font style="color:#52C41A;">建议</font>** |
| [删除自定义业务控件](https://open.esign.cn/doc/opendoc/pdf-sign3/axbmqwqd8at4d2mv) | 通过此接口进行删除已创建的自定义控件。 | **<font style="color:#52C41A;">建议</font>** |
| [查询自定义业务控件列表](https://open.esign.cn/doc/opendoc/pdf-sign3/fdxvhhqg247ba4v5) | 查询当前appId下自定义的全部控件列表信息，也可以根据控件ID或控件名称查询单独某个自定义控件的详情信息。 | **<font style="color:#52C41A;">建议</font>** |


### 自定义控件组相关
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [创建控件组](https://open.esign.cn/doc/opendoc/pdf-sign3/pupwutihq20wss04) | 为自定义控件创建分组，让控件可以分组显示。同类的自定义控件可以放到一个分组里。 | **<font style="color:#8C8C8C;">按需</font>** |
| [删除控件组](https://open.esign.cn/doc/opendoc/pdf-sign3/shgyxkpccybh5uz6) | 删除已经存在的控件组ID，不会删除其中的控件，只是删除分组。删除后已经在使用的模板将无法使用该控件组。 | **<font style="color:#8C8C8C;">按需</font>** |
| [编辑控件组](https://open.esign.cn/doc/opendoc/pdf-sign3/bagac0octhfmuefk) | 编辑已经存在的控件组ID对应的控件列表。 | **<font style="color:#8C8C8C;">按需</font>** |
| [查询控件组中的控件](https://open.esign.cn/doc/opendoc/pdf-sign3/tlzngmohd08fpul1) | 查询某个控件组中的控件详情。 | **<font style="color:#8C8C8C;">按需</font>** |
| [查询控件组列表](https://open.esign.cn/doc/opendoc/pdf-sign3/zttm2bsngxdahwk0) | 可查询当前appId下自定义的全部控件组列表信息，可查询某个具体的控件组ID/控件组名称，也可根据控件ID查询其所在的控件组。 | **<font style="color:#8C8C8C;">按需</font>** |
| [重命名控件组](https://open.esign.cn/doc/opendoc/pdf-sign3/ve3glnt1v4zx6qst) | 修改已经存在的控件组ID对应的控件组名称。 | **<font style="color:#8C8C8C;">按需</font>** |


### 模板制作相关
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [获取制作合同模板页面](https://open.esign.cn/doc/opendoc/pdf-sign3/xagpot) | 开发者或用户通过可视化的制作合同模板页面（免登录）来添加各类控件，包括自定义控件。 | **<font style="color:#E8323C;">必需</font>** |
| [获取编辑合同模板页面](https://open.esign.cn/doc/opendoc/pdf-sign3/lgb2go) | 基于已创建的合同模板，可通过此接口再次获取模板的编辑页面链接，包括修改自定义控件。 | **<font style="color:#8C8C8C;">按需</font>** |


[**【获取制作合同模板页面】**](https://open.esign.cn/doc/opendoc/pdf-sign3/xagpot)**接口代码案例：**

（1）直接指定customComponentGroups字段来显示所有的控件组下的自定义控件，默认会同时展示【基础控件】以及【业务控件】（业务控件内展示自定义控件）：

```json
{
        "docTemplateName": "test.pdf",
        "docTemplateType": 0,
        "fileId": "e29c2ee561XXXXXXXXf54177",
        "redirectUrl": "https://esign.cn",
        "customComponentGroups":["71ee62XXXX50a2ef69c","1e6e78a4b5XXXX887505f8"]
}

```

![](https://cdn.nlark.com/yuque/0/2025/png/449512/1756710985082-7d236b0d-8e7a-430a-b03e-f1d8ea5a267e.png)

（2）支持隐藏基础控件，仅展示【业务控件】模块，通过hiddenOriginComponents-是否隐藏原始控件控制：

```json
{
        "docTemplateName": "test.pdf",
        "docTemplateType": 0,
        "hiddenOriginComponents":true,
        "fileId": "e29c2ee561XXXXXXXXf54177",
        "redirectUrl": "https://esign.cn",
        "customComponentGroups":["71ee62XXXX50a2ef69c","1e6e78a4b5XXXX887505f8"]
}

```

![](https://cdn.nlark.com/yuque/0/2025/png/449512/1756710239900-fea0aba1-2973-4fac-b6cd-cc038036c8df.png)



（3）仅指定customComponents-自定义控件id列表，那么模板制作界面中显示的控件组为【未分组控件】，即使该自定义控件id已通过【[创建控件组](https://open.esign.cn/doc/opendoc/pdf-sign3/pupwutihq20wss04)】接口加入到指定控件组内，也不生效：

```json
{
        "docTemplateName": "test.pdf",
        "docTemplateType": 0,
        "fileId": "e29c2ee561XXXXXXXXf54177",
        "redirectUrl": "https://esign.cn",
        "customComponents":["11ee62XXXX50a2ef22c"]
}

```

![](https://cdn.nlark.com/yuque/0/2025/png/449512/1756711113503-a2731558-7b97-4041-89c4-7c6443e5dddd.png)

### 模板填充相关
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [查询合同模板中控件详情](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/aoq509) | <font style="color:rgb(64, 64, 64);">此接口可以通过模板ID来获取模板中设置的所有控件信息，可以查询到自定义控件ID用于后续合并填充。</font> | **<font style="color:#52C41A;">建议</font>** |
| [填充模板生成文件](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/mv8a3i)<br/>[获取填写合同模板页面](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ub4ncy)<br/>**<font style="color:#DF2A3F;">（二选一即可）</font>** | <font style="color:rgb(64, 64, 64);">基于模板ID和模板中的控件来填充自定义的内容，最终生成一份待签署的PDF文件。</font> | **<font style="color:#E8323C;">必需</font>** |


**实现不同位置多个自定义控件填充多个相同内容**

（1）调用[【查询合同模板中控件详情】](https://open.esign.cn/doc/opendoc/pdf-sign3/aoq509)接口获取模板控件originCustomComponentId-自定义控件ID：

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1764904834608-86bd480d-45f6-44cf-a7e5-2ee125649fb8.png)

（2）<font style="color:rgb(64, 64, 64);">调用</font>[【填写模板生成文件】](https://open.esign.cn/doc/opendoc/pdf-sign3/mv8a3i)<font style="color:rgb(64, 64, 64);">接口传入</font>originCustomComponentId作为控件ID/Key<font style="color:rgb(64, 64, 64);">填充字段生成文件</font><font style="color:rgb(51, 51, 51);">fileId，最终实现所有使用该自定义控件的地方均会填充相同的值：</font>

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1764904801445-d6e7ccc5-c2fa-433e-b063-d77a2a8b86f6.png)

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1764904580004-cf715b68-9a90-45f8-89fe-c1b31243962b.png)

（3）如果用[【获取填写合同模板页面】](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/ub4ncy)接口获取填写链接，用户页面填写自定义控件的时候也会同时带入相同的值：

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1764905285204-fe8ad27e-b359-4e5c-9248-717deb07cb76.png)

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1764905206416-51d8345e-af1f-4092-8124-beb1bcff3a69.png)

