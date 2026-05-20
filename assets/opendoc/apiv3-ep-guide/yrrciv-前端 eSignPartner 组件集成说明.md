## 引入 eSignPartner.js 文件
开发者可通过在线方式获取 eSignPartner.js 文件，在页面上引入 js 文件即可开始使用组件。方法如下：

```html
<!-- 引入 eSignPartner.js for 沙箱模拟环境 -->
<script src="https://asset.esign.cn/apps/epjssdk/sml/1.0.0/eSignPartner.js"></script>
<!-- 引入 eSignPartner.js for 正式生产环境 -->
<script src="https://asset.esign.cn/apps/epjssdk/prod/1.0.0/eSignPartner.js"></script>
```

移动端-H5集成，需要额外在html上加入meta标签。方法如下：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-sacle=1, maximum-scale=1" >
```

## 使用 eSignPartner 组件
### 唤起多菜单模式
唤起多菜单模式是指开发者在自己业务系统中通过按钮点击事件或超链接点击事件一次性直接唤起包含【购买套餐页】、【发起签署页】和【企业控制台】等多个菜单的e签宝页面，用户在此页面上点击不同菜单进入不同页面进行相关操作。

多菜单模式效果图如下：

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1664501402178-42f59c08-b225-467b-bdb8-0deec0d38560.png)

**集成对接方法如下：**

通过在线方式我们可以很容易地将 eSignPartner 组件嵌入到页面 <div> 容器中。

```html
<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-sacle=1, maximum-scale=1">
  <!-- 引入 eSignPartner.js for 沙箱模拟环境 -->
  <script src="https://asset.esign.cn/apps/epjssdk/sml/1.0.0/eSignPartner.js"></script>
</head>
<body>
  <div>
    <div id="eSignPartner"></div>
  </div>
  <script>
    // 创建 ESignPartner 对象并进行初始化
    const eSignPartner = new EsignPartner({
      orgName: '某某某科技有限公司',
      psnAccount: '152XXXX4800',
      initUrl: 'http://localhost:8080/v3/ep/jssdk-init',
      options: {
        menu: ['org_console', 'initiate_sign', 'place_order'],
        notifyUrl: 'http://xx.cn/sign/notify',
        redirectUrl: 'http://xx.cn/index.html',
        ... 其他参数详见文中【eSignPartner 组件初始化】章节 ...
      }
    },'#eSignPartner')
  </script>
</body>
</html>
```

### 唤起单页面模式
唤起单页面模式是指开发者在自己业务系统HTML页面中通过按钮点击事件或超链接点击事件一次只打开一个e签宝单独页面。例如仅想打开e签宝的【发起签署】页面。

#### 唤起【认证授权页】
```plain
// 新建 EsignPartner 对象并初始化
const eSignPartner = new EsignPartner({……})
// 调用 EsignPartner 对象的 openUrl 方法唤起页面
eSignPartner.openUrl('org_auth')
```

:::info
唤起【认证授权页】关键函数语句：openUrl('org_auth')

:::

**完整示例如下：**

```html
<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-sacle=1, maximum-scale=1">
  <!-- 引入 eSignPartner.js for 沙箱模拟环境 -->
  <script src="https://asset.esign.cn/apps/epjssdk/sml/1.0.0/eSignPartner.js"></script>
</head>
<body>
  <div>
    <div id="eSignPartner"></div>
  </div>
  <script>
    // 创建 ESignPartner 对象并进行初始化
    const eSignPartner = new EsignPartner({
      orgName: '某某某科技有限公司',
      psnAccount: '152XXXX4800',
      initUrl: 'http://localhost:8080/v3/ep/jssdk-init',
      options: {
        notifyUrl: 'http://xx.cn/sign/notify',
        redirectUrl: 'http://xx.cn/index.html',
        ... 其他参数详见文中【eSignPartner 组件初始化】章节 ...
      }
    });
    // 唤起【认证授权页】
    function openOrgAuthPage(){
        eSignPartner.openUrl('org_auth')
    }
  </script>
  <div>
      <button type="button" onclick="openOrgAuthPage();">认证授权</button>
  </div>
</body>
</html>
```

**集成后页面效果如下：**

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1664506789095-bfde6cff-ae79-4789-b193-91dc153b58e5.png)

#### 唤起【购买套餐页】
```plain
// 新建 EsignPartner 对象并初始化
const eSignPartner = new EsignPartner({……})
// 调用 EsignPartner 对象的 openUrl 方法唤起页面
eSignPartner.openUrl('place_order')
```

:::info
唤起【购买套餐页】关键函数语句：openUrl('place_order')

:::

**完整示例如下：**

```html
<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-sacle=1, maximum-scale=1">
  <!-- 引入 eSignPartner.js for 沙箱模拟环境 -->
  <script src="https://asset.esign.cn/apps/epjssdk/sml/1.0.0/eSignPartner.js"></script>
</head>
<body>
  <div>
    <div id="eSignPartner"></div>
  </div>
  <script>
    // 创建 ESignPartner 对象并进行初始化
    const eSignPartner = new EsignPartner({
      orgName: '某某某科技有限公司',
      psnAccount: '152XXXX4800',
      initUrl: 'http://localhost:8080/v3/ep/jssdk-init',
      options: {
        notifyUrl: 'http://xx.cn/sign/notify',
        redirectUrl: 'http://xx.cn/index.html',
        ... 其他参数详见文中【eSignPartner 组件初始化】章节 ...
      }
    });
    // 唤起【购买套餐页】
    function openPlaceOrderPage(){
        eSignPartner.openUrl('place_order')
    }
  </script>
  <div>
      <button type="button" onclick="openPlaceOrderPage();">购买套餐</button>
  </div>
</body>
</html>
```

**集成后页面效果如下：**

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1664519830056-f73930af-832c-4ff4-8ae4-ec048d6f2afb.png)

#### 唤起【企业控制台】
```plain
// 新建 EsignPartner 对象并初始化
const eSignPartner = new EsignPartner({……})
// 调用 EsignPartner 对象的 openUrl 方法唤起页面
eSignPartner.openUrl('org_console')
```

:::info
唤起【企业控制台】关键函数语句：openUrl('org_console')

:::

**完整示例如下：**

```html
<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-sacle=1, maximum-scale=1">
  <!-- 引入 eSignPartner.js for 沙箱模拟环境 -->
  <script src="https://asset.esign.cn/apps/epjssdk/sml/1.0.0/eSignPartner.js"></script>
</head>
<body>
  <div>
    <div id="eSignPartner"></div>
  </div>
  <script>
    // 创建 ESignPartner 对象并进行初始化
    const eSignPartner = new EsignPartner({
      orgName: '某某某科技有限公司',
      psnAccount: '152XXXX4800',
      initUrl: 'http://localhost:8080/v3/ep/jssdk-init',
      options: {
        notifyUrl: 'http://xx.cn/sign/notify',
        redirectUrl: 'http://xx.cn/index.html',
        ... 其他参数详见文中【eSignPartner 组件初始化】章节 ...
      }
    });
    // 唤起【企业控制台】
    function openOrgConsolePage(){
        eSignPartner.openUrl('org_console')
    }
  </script>
  <div>
      <button type="button" onclick="openOrgConsolePage();">企业控制台</button>
  </div>
</body>
</html>
```

**集成后页面效果如下：**

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1664520671796-04802919-4fc7-4ca1-b8ad-5cf9acb6ee3c.png)

#### 唤起【发起签署页】
```plain
// 新建 EsignPartner 对象并初始化
const eSignPartner = new EsignPartner({……})
// 调用 EsignPartner 对象的 openUrl 方法唤起页面
eSignPartner.openUrl('initiate_sign', {customBizNum: 'xxxx'})
说明：customBizNum 是自定义业务编号（用于关联开发者的业务系统，流程发起成功后将在签署发起成功通知中和签署流程ID一同返回），接口不对该参数的值做重复性校验，需开发者确保其唯一性。
```

:::info
唤起【发起签署页】关键函数语句：openUrl('initiate_sign', {customBizNum: 'xxxx'})

:::

**完整示例如下：**

```html
<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-sacle=1, maximum-scale=1">
  <!-- 引入 eSignPartner.js for 沙箱模拟环境 -->
  <script src="https://asset.esign.cn/apps/epjssdk/sml/1.0.0/eSignPartner.js"></script>
</head>
<body>
  <div>
    <div id="eSignPartner"></div>
  </div>
  <script>
    // 创建 ESignPartner 对象并进行初始化
    const eSignPartner = new EsignPartner({
      orgName: '某某某科技有限公司',
      psnAccount: '152XXXX4800',
      initUrl: 'http://localhost:8080/v3/ep/jssdk-init',
      options: {
        notifyUrl: 'http://xx.cn/sign/notify',
        redirectUrl: 'http://xx.cn/index.html',
        ... 其他参数详见文中【eSignPartner 组件初始化】章节 ...
      }
    });
    // 唤起【发起签署页】
    function openInitiateSignPage(){
        eSignPartner.openUrl('initiate_sign', {customBizNum: 'xxxx'})
    }
  </script>
  <div>
      <button type="button" onclick="openInitiateSignPage();">发起签署页</button>
  </div>
</body>
</html>
```

**集成后页面效果如下：**

![](https://cdn.nlark.com/yuque/0/2022/png/432598/1664520935888-7074780a-d4cd-4b3d-84ef-53446be87a0f.png)

## 组件初始化参数
| **参数名称** | | **参数类型** | **必填** | **参数说明** |
| --- | --- | :---: | :---: | --- |
| initUrl | | string | 是 | 开发者的后端Web服务地址。<br/>用于 eSignPartner 组件调用获取jsSdkTicket授权票据。 |
| orgName | | string | 是 | 组织机构名称 |
| psnAccount | | string | 是 | 经办人在e签宝的账号标识（手机号或邮箱） |
| options | | object | 否 | 选项 |
|     | menu | array | 否 | 集成菜单列表<br/>org_auth - 认证授权页<br/>place_order - 购买套餐页<br/>initiate_sign - 发起签署页<br/>org_console - 企业控制台<br/>认证授权页为固定项，其他页面可根据实际情况选择。<br/>若要集成所有页面，入参如下：<br/>['place_order', 'initiate_sign', 'org_console']<br/><font style="color:#E8323C;">说明：唤起单页面模式时不需要传递此参数。</font> |
| |  redirectUrl | string | 否 | 认证授权完成、购买完成、发起签署后的重定向地址<br/>为空，跳转当前页面地址 |
| | notifyUrl | string | 否 | 认证授权和签署完成的回调地址<font style="color:rgb(64, 64, 64);">（需符合 https /http 协议），通知开发者用户认证和授权的完成情况，</font>[点击](https://open.esign.cn/doc/opendoc/notify3/naksvv)<font style="color:rgb(64, 64, 64);">详见通知说明。</font> |
| | orgIDCardNum | string | 否 | 组织机构证件号 |
| | orgIDCardType | string | 否 | 组织机构证件类型：<br/>CRED_ORG_USCC - 统一社会信用代码<br/>CRED_ORG_REGCODE -工商注册号 |
| | legalRepName | string | 否 | 法定代表人姓名 |
| | legalRepIDCardNum | string | 否 | 法定代表人证件号 |
| | legalRepIDCardType | string | 否 | 法定代表人证件类型：<br/>CRED_PSN_CH_IDCARD - 中国大陆居民身份证<br/>CRED_PSN_CH_HONGKONG - 香港来往大陆通行证<br/>CRED_PSN_CH_MACAO - 澳门来往大陆通行证<br/>CRED_PSN_CH_TWCARD - 台湾来往大陆通行证<br/>CRED_PSN_PASSPORT - 护照 |
| | orgEditableFields | array | 否 | <font style="color:rgb(64, 64, 64);">设置页面中可编辑的机构信息字段，不传此参数，页面默认不允许编辑机构信息。</font><br/>+ **<font style="color:rgb(64, 64, 64);">orgName</font>****<font style="color:rgb(64, 64, 64);"> </font>**<font style="color:rgb(64, 64, 64);">- 机构名称</font><br/>+ **<font style="color:rgb(64, 64, 64);">orgType</font>****<font style="color:rgb(64, 64, 64);"> </font>**<font style="color:rgb(64, 64, 64);">- 机构类型</font><br/>+ **<font style="color:rgb(64, 64, 64);">orgNum</font>****<font style="color:rgb(64, 64, 64);"> </font>**<font style="color:rgb(64, 64, 64);">- 机构证件号</font><br/>+ **<font style="color:rgb(64, 64, 64);">legalRepName</font>****<font style="color:rgb(64, 64, 64);"> </font>**<font style="color:rgb(64, 64, 64);">- 法定代表人姓名</font><br/>+ **<font style="color:rgb(64, 64, 64);">legalRepIdNum </font>**<font style="color:rgb(64, 64, 64);">- 法定代表人证件号</font> |
| | psnIDCardNum | string | 否 | 个人证件号 |
| | psnName | string | 否 | 个人姓名 |
| | psnIDCardType | string | 否 | 个人证件类型：<br/>CRED_PSN_CH_IDCARD - 中国大陆居民身份证<br/>CRED_PSN_CH_HONGKONG - 香港来往大陆通行证<br/>CRED_PSN_CH_MACAO - 澳门来往大陆通行证<br/>CRED_PSN_CH_TWCARD - 台湾来往大陆通行证<br/>CRED_PSN_PASSPORT - 护照 |
| | bankCardNum | string | 否 | 个人银行卡号 |
| | psnEditableFields | array | 否 | <font style="color:rgb(64, 64, 64);">设置页面中可编辑的个人信息字段，不传此参数，页面默认不允许编辑个人信息。</font><br/>+ **<font style="color:rgb(64, 64, 64);">name</font>****<font style="color:rgb(64, 64, 64);"> </font>**<font style="color:rgb(64, 64, 64);">- 个人姓名</font><br/>+ **<font style="color:rgb(64, 64, 64);">IDCardNum</font>****<font style="color:rgb(64, 64, 64);"> </font>**<font style="color:rgb(64, 64, 64);">- 个人证件号</font><br/>+ **<font style="color:rgb(64, 64, 64);">mobile</font>****<font style="color:rgb(64, 64, 64);"> </font>**<font style="color:rgb(64, 64, 64);">- 个人手机号（仅针对实名认证手机号）</font><br/>+ **<font style="color:rgb(64, 64, 64);">bankCardNum </font>**<font style="color:rgb(64, 64, 64);">- 个人银行卡号</font> |


