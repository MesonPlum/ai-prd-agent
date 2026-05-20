# 基础介绍
当发起合同签署时，用户默认有90天的签署有效期，如需要指定**<font style="color:#E8323C;">小于90天</font>**的截止签署日期，需要额外通过参数接口控制。当用户在指定时间内未签后签署任务将过期作废，需要重新发起。

# 效果展示
## 签署链接PC端打开任务信息里的截止日期
![](https://cdn.nlark.com/yuque/0/2024/png/447795/1716272542939-bb9ec2ca-8606-459b-9323-dd967ed0575e.png)

## 签署链接手机端打开首页里的签署截止日期
![](https://cdn.nlark.com/yuque/0/2024/png/447795/1716272421650-c8fb8238-af21-4b58-8515-227be79d2755.png)

# API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [延期签署截止时间](https://open.esign.cn/doc/opendoc/pdf-sign3/idv0fv) | 如发起签署时的截止日期不够，可以调用此接口进行一次延期，可在流程中原设置的签署截止时间的基础上最多延长90天。 | **<font style="color:#8C8C8C;">按需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | <font style="color:rgb(64, 64, 64);">此接口获取签署方签署页面链接，可用于签署或预览。</font> | **<font style="color:rgb(140, 140, 140);">按需</font>** |


## <font style="color:rgb(64, 64, 64);">基于文件发起签署接口代码案例</font>
### 相关参数   
+ <font style="color:#E8323C;">signFlowExpireTime</font>（签署截止时间， unix时间戳（毫秒）格式）

#### 指定签署截止时间相关代码
需要指定签署截止日期的毫秒级时间戳，例如指定：2023-01-10 09:38:50，转换成毫秒时间戳为：1673314730000，那么接口就指定这个时间戳。

![](https://cdn.nlark.com/yuque/0/2022/png/447795/1668045718388-a31f9339-1a88-470f-b5f5-dfcf4e08c59a.png)

```json
  "signFlowConfig": {
        "signFlowExpireTime":1673314730000
    }
```

#### 


