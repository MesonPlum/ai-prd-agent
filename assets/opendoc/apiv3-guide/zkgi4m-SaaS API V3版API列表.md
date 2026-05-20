| **模块名称** | | **功能概述** | **接口集成** |
| --- | --- | --- | :---: |
| [实名认证和授权服务API](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/rx8igf) | | 单独对用户进行实名认证或者需要授权自身应用获取用户在e签宝的身份信息等资源权限（在发起签署前接入） | **<font style="color:#52C41A;">建议接入</font>** |
| [合同文件签署服务API](https://qianxiaoxia.yuque.com/opendoc/pdf-sign3/tv8gsiqwk2z00wwi) | | 发起签署前的待签署文件上传与生成；对用户发起合同文件签署以及后续签署流程查询、变更，签署文件下载等 | **<font style="color:#E8323C;">必需接入</font>** |
| [回调通知服务](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/pmy852) | | 用于接收用户实名认证、授权，签署等动作结束触发的接口通知请求 | **<font style="color:#52C41A;">建议接入</font>** |
| [流程模板服务API](https://qianxiaoxia.yuque.com/opendoc/file-and-template3/ccrulvhqdvk42nza) | | 流程模板是归属于企业用户的资源，与e签宝SaaS官网模板互通，可以根据模板发起合同拟定和签署流程 | **<font style="color:#8C8C8C;">按需接入</font>** |
| [企业机构成员服务API](https://qianxiaoxia.yuque.com/books/share/5f5d0c9f-0af8-4ded-b32c-cae4086a587c/has759) | | 需要管理企业用户在e签宝的成员信息<br/>（需要提前接入[认证和授权服务API](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/rx8igf)） | **<font style="color:#8C8C8C;">按需接入</font>** |
| [印章服务API](https://qianxiaoxia.yuque.com/books/share/c275c79d-6a0c-4d82-a88e-d0d0ef107c49/tmtccg) | | 需要自定义生成以及管理用户的e签宝印章，或者需要授权印章给其他机构或者成员协助完成盖章的场景<br/>（需要提前接入[认证和授权服务API](https://qianxiaoxia.yuque.com/books/share/66e3a742-d03c-445a-89cc-622ecfce55a0/rx8igf)） | **<font style="color:#8C8C8C;">按需接入</font>** |
| [企业控制台服务API](https://qianxiaoxia.yuque.com/opendoc/console/rhoap2) | | 可以获取用户免登录进入e签宝SaaS官网企业控制台的页面链接 | **<font style="color:#8C8C8C;">按需接入</font>** |
| [合同管理服务API V3](https://open.esign.cn/doc/opendoc/data-push/intro) | | 助力开发者打通自身业务系统的业务和e签宝SaaS的签署能力+合同管理，实现签管一体化 | **<font style="color:#8C8C8C;">按需接入</font>** |


