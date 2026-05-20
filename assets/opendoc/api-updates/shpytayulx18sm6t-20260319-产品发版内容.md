#### <font style="color:rgb(38, 38, 38);">📣</font><font style="color:rgb(38, 38, 38);"> 产品发布更新：</font>
<font style="color:rgb(38, 38, 38);">1、合同文件签署服务API V3-查询签署流程详情增加返回签署人IP和城市</font>

<font style="color:rgb(38, 38, 38);">2、合同文件签署服务API V3-下载已签署文件增加</font>使用AES加密文件方式

---------------------------------------------------------------------------------------------------------------

### 1、<font style="color:rgb(38, 38, 38);">查询签署流程详情增加返回签署人IP和城市</font>
🚩[**《查询签署流程详情》**](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/xxk4q6)**接口新增响应参数：**

+ 新增响应参数 **<font style="background-color:#D8DAD9;">signerIp</font>** （签署人IP）
+ 新增响应参数 **<font style="background-color:#D8DAD9;">signerLocation</font>** （签署人IP所属城市）

<font style="color:#DF2A3F;">注：以上两个字段需要联系e签宝对接人员开启相关配置项后才可返回</font>

📘**效果展示：**

签署页面在签署任务详情中记录可增加展示IP<font style="color:#DF2A3F;">（需要联系e签宝对接人员开启相关配置项后才可展示）</font>





### <font style="color:rgb(38, 38, 38);">2、下载已签署文件增加</font>使用AES加密文件方式
🚩[**《下载已签署文件及附属材料》**](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/kczf8g)**接口新增请求参数：**

+ 新增请求参数 **<font style="background-color:#D8DAD9;">aesEncrypt</font>** （是否使用AES加密文件）

