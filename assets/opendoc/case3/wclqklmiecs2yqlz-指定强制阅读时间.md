## 基础介绍
设开发者可在发起签署时设置文件强制阅读时间。设置后，签署方进入签署页面时，右上角的“提交签署”按钮将显示倒计时，在倒计时结束前不可操作签署。

:::warning
<font style="color:#DF2A3F;">注：</font>

+ <font style="color:#DF2A3F;">该设置针对整个签署页面生效，签署方需等待倒计时结束后方可提交签署。</font>
+ <font style="color:#DF2A3F;">批量签署也是同样的要逐一打开每个流程进行阅读后才可以进行批量签署。</font>

:::

## 效果展示
### 单流程签署阅读倒计时
视频效果请参考本视频：[h5端-单流程签署指定强制阅读时间.mp4](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/h5端-单流程签署指定强制阅读时间.mp4)

<font style="color:rgb(0, 0, 0);">打</font><font style="color:rgb(0, 0, 0);">开签署页之后，右上角的【提交</font><font style="color:rgb(0, 0, 0);">签署】按钮有倒计时显示，倒计时完毕后才能提交签署。</font>

### 多流程批量签署阅读倒计时
视频效果请参考本视频：[pc端-批量签署指定强制阅读时间.mp4](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/pc端-批量签署指定强制阅读时间.mp4)

需要把指定签署阅读倒计时的流程点开查看到指定时间后，才能继续操作。

## API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | 此接口获取签署方签署页面链接，可用于签署或预览。 | **<font style="color:rgb(140, 140, 140);">按需</font>** |
| [获取批量签页面链接（多流程）](https://open.esign.cn/doc/opendoc/pdf-sign3/sq4xxq) | 用于获取指定签署人名下的待签合同文件列表页面，签署人进行一次意愿认证即可同时完成多个流程签署。 | **<font style="color:rgb(140, 140, 140);">按需</font>** |


### 基于文件发起签署接口代码案例
#### 相关参数<font style="color:#DF2A3F;">（以下两个参数二选一）</font>
+ **<font style="color:#DF2A3F;">forcedReadingTime	</font>**设置签署页面的强制阅读倒计时时间，默认值为 0（单位：秒，最大值999）
+ **<font style="color:#DF2A3F;">fileForcedReadingTime</font>**	设置签署页面每份文件的阅读倒计时时间，默认值为0（单位：秒，最大值999）

![](https://cdn.nlark.com/yuque/0/2025/png/447795/1762846107870-ff0f48ac-6204-41f8-a041-9c57b10d0889.png)

#### 代码示例
**设置流程中****<font style="color:#DF2A3F;">页面整体</font>****的阅读时间：**

```json
"signers": [
  {
    "signConfig": {
      "forcedReadingTime":5
    }
  }
]
```

**设置流程中****<font style="color:#DF2A3F;">每份文件</font>****的阅读时间：**

```json
"signers": [
  {
    "signConfig": {
      "fileForcedReadingTime":3
    }
  }
]
```

