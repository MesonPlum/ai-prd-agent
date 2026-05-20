# 基础介绍
抄送方：指不参与签署的机构或者个人，签署流程结束后将收到通知，允许查看签署文件。

希望在所有签署方签署后，将签署后的合同抄送给特定的可以查看、下载的人员，需要在发起合同签署时，使用此添加合同抄送方的功能。

:::warning
<font style="color:#E8323C;">注：必须配置通知方式（noticeTypes），否则不会发送抄送通知。且必须在所有签署方签署后，流程结束（完成）状态时才会触发抄送通知。可通过接口</font>[【查询签署流程详情】](https://open.esign.cn/doc/opendoc/pdf-sign3/xxk4q6)<font style="color:#E8323C;">确认流程状态。</font>

:::

# 效果展示
图1：展示短信抄送效果；图2：展示邮箱抄送效果；图3：展示内容中的查看链接点击查看进入后展示效果。

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668153972631-0483906a-c6d1-43c5-9a0c-7070fabe070f.png)![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668161494124-9248ad89-7d5e-43a6-825f-c74b12c0c6e9.png)![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668154356277-527d1da7-e922-432f-b4b9-63f98950aaa1.png)

# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口获取签署方签署页面链接，可用于签署或预览。 | **<font style="color:#8C8C8C;">按需</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
### 相关参数   
+ <font style="color:#E8323C;">copiers</font>（抄送方信息）

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668156720405-ededa694-6bec-46a3-8df0-73358c61a9f8.png)

#### 抄送给个人
抄送给个人的情况：e签宝会根据签署通知方式（noticeTypes）的配置，在签署结束后给抄送人发送短信/邮箱的抄送信息；同时抄送人在【[e签宝SaaS官网](https://web.esign.cn/index)】-【个人空间】-【经办合同】-【抄送我的】 中可以看到所有抄送给自己的合同。

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668161128864-ce827c3a-dff6-47ed-b5fe-1cc4c8a5883c.png)

+ <font style="color:#E8323C;">copierPsnInfo</font> 传入个人抄送方信息<font style="color:rgb(232, 50, 60);">（psnAccount与psnId，二选一传值）</font>。

```json
"copiers": [
        {
            "copierPsnInfo": {
                "psnAccount": "传入个人手机号或者邮箱"
            }
        }
    ]
```

#### 抄送给机构
抄送机构的情况：e签宝会根据签署通知方式（noticeTypes）的配置，在签署结束后给抄送经办人发送短信/邮箱的抄送信息；同时抄送机构在【[e签宝SaaS官网](https://web.esign.cn/index)】-【企业空间】-【经办合同】-【抄送我的】中可以看到所有抄送给自己的合同。

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668160385868-fd01b083-8387-4101-b875-3a90c7b5882d.png)

+ <font style="color:#E8323C;">copierOrgInfo </font>传入<font style="color:rgb(64, 64, 64);">机构抄送方信息</font><font style="color:rgb(232, 50, 60);">（orgName与orgId，二选一传值）。</font>
+ <font style="color:#E8323C;">copierPsnInfo</font> 传入经办人个人抄送方信息<font style="color:rgb(232, 50, 60);">（psnAccount与psnId，二选一传值）</font>。

```json
 "copiers": [
        {
             "copierOrgInfo": {
                "orgName": "机构名称"
            },
            "copierPsnInfo": {
                "psnAccount": "传入个人手机号或者邮箱"
            }
        }
    ]
```

#### 
