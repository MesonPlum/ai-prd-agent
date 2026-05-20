## 基础介绍
为满足签署过程中需补充材料的场景，本功能允许签署方在签署时上传附件。该类文件作为非签署性质的合同附属材料，仅作参考（如资质证明、补充说明等），不具备独立法律效力。

:::info
**<font style="color:rgb(15, 17, 21);">关键特性：</font>**

+ **<font style="color:rgb(15, 17, 21);">不计费</font>**<font style="color:rgb(15, 17, 21);">：附件不占用合同签署份数</font>
+ **<font style="color:rgb(15, 17, 21);">状态限制</font>**<font style="color:rgb(15, 17, 21);">：仅支持在合同「签署中」状态上传，完成后不可追加</font>
+ **<font style="color:rgb(15, 17, 21);">格式开放</font>**<font style="color:rgb(15, 17, 21);">：支持任意格式文件（文档、图片、音视频等）</font>
+ **<font style="color:rgb(15, 17, 21);">使用限制</font>**<font style="color:rgb(15, 17, 21);">：附件内容不支持签署操作（盖章/签字）</font>

:::

## 效果展示
### 不设置签署方上传附件的效果（默认）
#### 移动端展示效果
视频效果请参考本视频：[不设置上传附件_移动端.mp4](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/不设置上传附件_移动端.mp4)

#### 电脑PC端展示效果
视频效果请参考本视频：[不设置上传附件_PC端.mp4](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/不设置上传附件_PC端.mp4)

### 设置签署方上传附件的效果
#### 移动端展示效果
视频效果请参考本视频：[设置上传附件_移动端.mp4](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/设置上传附件_移动端.mp4)

#### 电脑PC端展示效果
视频效果请参考本视频：[设置上传附件_PC端.mp4](https://etreaty.oss-cn-hangzhou.aliyuncs.com/apps/open-platform-download/设置上传附件_PC端.mp4)

## API接口
| **<font style="color:rgb(64, 64, 64);">API接口</font>****<font style="color:rgb(140, 140, 140);">（点击直接跳转相关API文档）</font>** | **<font style="color:rgb(64, 64, 64);">API描述</font>** | **<font style="color:rgb(64, 64, 64);">是否必需</font>** |
| --- | --- | :---: |
| [基于文件发起签署](https://open.esign.cn/doc/opendoc/pdf-sign3/su5g42) | 此接口用来发起签署，发起成功后会返回签署流程标识：signFlowId。 | **<font style="color:#E8323C;">必需</font>** |
| [获取签署页面链接](https://open.esign.cn/doc/opendoc/pdf-sign3/pvfkwd) | <font style="color:rgb(64, 64, 64);">此接口获取签署方签署页面链接，可用于签署或预览。</font> | **<font style="color:rgb(140, 140, 140);">按需</font>** |


### 基于文件发起签署接口代码案例
#### 相关参数
+ **<font style="color:#DF2A3F;">uploadDescription</font>**  附件的标题描述，会显示在签署详情页内
+ **<font style="color:#DF2A3F;">required</font>**  此附件是否必传
+ **<font style="color:#DF2A3F;">fileOrder</font>**  附件展示顺序
+ **<font style="color:#DF2A3F;">multiple  </font>**当前标题下是否允许上传多个附件

![](https://cdn.nlark.com/yuque/0/2025/png/32742681/1756664696053-e9dd0a08-78e1-4f7f-9863-02d0a98c3fc7.png)

#### 代码示例
设置签署方在签署时上传的附件列表配置相关代码

```json
"signers": [
  {
    "signConfig": {
      "uploadFiles": [
        {
          "uploadDescription": "身份证信息面",
          "required": "true",
          "fileOrder": 1,
          "multiple": true
        },
        {
          "uploadDescription": "身份证国徽页",
          "required": "false",
          "fileOrder": 2,
          "multiple": false
        }
      ]
    }
]
```

