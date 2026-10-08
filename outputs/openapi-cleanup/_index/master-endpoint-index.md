# Master Endpoint Index（修正版）

> 生成时间: 2026-05-25

> **修正规则**:
> 1. 去除接口地址前缀 "*"（opendoc 富文本 ** 残留）
> 2. 去除 query string（?pageNum=1&pageSize=100 等不区分接口）
> 3. 仅分析 /v3/ 接口，非 V3 接口从孤儿列表中剔除
> 4. apifox 完整 URL 提取 path 部分
> 5. test_postman 与 apifox 合并为 test_source（同源：测试提供）

## 对齐表

| yaml_module | yaml_operationId | path | method | opendoc_file | docking_postman | test_source | 测试覆盖 |
|---|---|---|---|---|---|---|---|
| auth-api |  | /v3/psn-auth-url | POST | rx8igf-获取个人认证&授权页面链接.md | 实名认证和授权服务API/个人认证和授权/获取个人认证&授权页面链接 | 实名认证-test/授权认证 （个人）; 电签业务/标准签授权-个人 | ✅ |
| auth-api |  | /v3/org-auth-url | POST | kcbdu7-获取机构认证&授权页面链接.md | 实名认证和授权服务API/机构认证和授权/获取机构认证&授权页面链接 | 实名认证-test/授权认证 （企业）; 正式环境/开放平台授权; 电签业务/标准签授权-企业; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/模板授权; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/企业授权 Copy; 根目录/流程模板开放用例/流程模板开放用例/epaas测试环境流程模板/测试环境授权 | ✅ |
| auth-api |  | /v3/persons/identity-info | GET | vssvtu-查询个人认证信息.md | 实名认证和授权服务API/个人认证和授权/查询个人认证信息 |  | ❌ |
| auth-api |  | /v3/persons/{psnId}/authorized-info | GET | nurtvw-查询个人授权信息.md |  |  | ❌ |
| auth-api |  | /v3/organizations/identity-info | GET | xxz4tc-查询机构认证信息.md | 实名认证和授权服务API/机构认证和授权/查询机构认证信息 | 电签业务/查询企业用户认证信息 | ✅ |
| auth-api |  | /v3/organizations/{orgId}/authorized-info | GET | ytn2tt-查询机构授权信息.md | 实名认证和授权服务API/机构认证和授权/查询机构授权信息 |  | ❌ |
| auth-api |  | /v3/auth-flow/{authFlowId} | GET | hlrs7s-查询认证授权流程详情.md |  |  | ❌ |
| member-api |  | /v3/account-unbind-url | POST | smelh6m20a5fizu2-解绑e签宝SaaS账号登录凭证.md | 账号管理API/解绑e签宝SaaS账号登录凭证 |  | ❌ |
| member-api |  | /v3/account-binding-url | POST | vriragi8ohekdme0-修改_新增e签宝SaaS账号登录凭证.md |  |  | ❌ |
| member-api |  | /v3/organizations/{orgId}/member-list | GET | bzrzic-查询企业成员列表.md |  |  | ❌ |
| member-api |  | /v3/organizations/{orgId}/administrators | GET | fxm4ii-查询企业管理员.md |  |  | ❌ |
| member-api |  | /v3/organizations/{orgId}/members | POST | has759-添加企业机构成员.md | 企业机构成员服务API/成员管理/添加企业机构成员 |  | ❌ |
| member-api |  | /v3/organizations/{orgId}/members | DELETE | tz2uqp-移除企业机构成员.md |  |  | ❌ |
| member-api |  | /v3/organizations/member | GET | smmg6dwz7fyys2wl-查询个人用户是否为企业成员.md | 企业机构成员服务API/成员管理/查询个人用户是否为企业成员 |  | ❌ |
| member-api |  | /v3/organizations/{orgId}/member/add-role | POST | qhbzzmq2a7r03kyo-添加成员角色.md |  |  | ❌ |
| member-api |  | /v3/organizations/{orgId}/member/delete-role | POST | usgc6c1d2x6ofon1-删除成员角色.md |  |  | ❌ |
| seal-api |  | /v3/seals/psn-seal-create-url | POST | cwc95p-获取创建个人印章页面链接.md | 印章服务API/个人印章（页面版）/获取创建个人印章页面链接 |  | ❌ |
| seal-api |  | /v3/seals/psn-seals-manage-url | POST | qksso1-获取管理个人印章页面链接.md | 印章服务API/个人印章（页面版）/获取管理个人印章页面链接 | 电签业务/获取印章管理页链接-个人 | ✅ |
| seal-api |  | /v3/seals/psn-seals/create-by-template | POST | tmtccg-创建个人模板印章.md | 印章服务API/个人印章/创建/创建个人模板印章 |  | ❌ |
| seal-api |  | /v3/seals/psn-seals/create-by-image | POST | yi2wca-创建个人图片印章.md | 印章服务API/个人印章/创建/创建个人图片印章/创建个人图片印章 |  | ❌ |
| seal-api |  | /v3/seals/psn-seal | DELETE | pnr1w7-删除个人印章.md | 印章服务API/个人印章/变更/删除个人印章 | 电签业务/删除个人印章 | ✅ |
| seal-api |  | /v3/seals/psn-seal-info | GET | mksg88-查询指定印章详情（个人）.md | 印章服务API/个人印章/查询/查询指定印章详情（个人） |  | ❌ |
| seal-api |  | /v3/seals/psn-seal-list | GET | wvyyt7-查询个人印章列表.md | 印章服务API/个人印章/查询/查询个人印章列表 |  | ❌ |
| seal-api |  | /v3/seals/psn-seals/set-default-seal | POST | cotuo9-设置个人默认印章.md | 印章服务API/个人印章/变更/设置个人默认印章 |  | ❌ |
| seal-api |  | /v3/seals/org-seal-create-url | POST | qxfxq0-获取创建机构印章页面链接.md | 印章服务API/机构印章（页面版）/获取创建机构印章页面链接 | 电签业务/获取创建企业印章页链接 | ✅ |
| seal-api |  | /v3/seals/legal-rep-seal-create-url | POST | mh48ch0fen8adxqg-获取创建法定代表人印章页面链接.md |  | 电签业务/获取创建法人印章页链接 | ✅ |
| seal-api |  | /v3/seals/org-seals-manage-url | POST | dcef94-获取管理机构印章页面链接.md | 印章服务API/机构印章（页面版）/获取管理机构印章页面链接 | 电签业务/获取印章管理页链接-企业; 印章/印章授权-开放接口/印章管理开放页面; 印章/企业印章/印章管理开放页面 | ✅ |
| seal-api |  | /v3/seals/org-seals/create-by-template | POST | igfmd2-创建机构模板印章.md | 印章服务API/机构印章/创建/创建机构模板印章 | 印章/企业印章/创建模板章 | ✅ |
| seal-api |  | /v3/seals/org-seals/create-by-image | POST | lggz9w-创建机构图片印章.md | 印章服务API/机构印章/创建/创建机构图片印章/创建机构图片印章 | 电签业务/创建机构图片印章; 印章/企业印章/创建印章图片章 | ✅ |
| seal-api |  | /v3/seals/org-seal | DELETE | qdfvs6-删除机构印章.md | 印章服务API/机构印章/变更/删除机构印章 | 电签业务/删除机构印章 | ✅ |
| seal-api |  | /v3/seals/org-seal-info | GET | picwop-查询企业指定印章详情.md | 印章服务API/机构印章/查询/查询指定印章详情（机构） |  | ❌ |
| seal-api |  | /v3/seals/org-own-seal-list | GET | ups6h1-查询企业内部印章.md | 印章服务API/机构印章/查询/查询企业内部印章 | 电签业务/查询机构印章列表; 电签业务/查询机构印章列表 | ✅ |
| seal-api |  | /v3/seals/org-seals/enable-seal | POST | eyggvgw6g59wlg4k-启用机构印章.md |  | 电签业务/启用印章 | ✅ |
| seal-api |  | /v3/seals/org-seals/disable-seal | POST | bg74uaocvopgflw6-停用机构印章.md |  | 电签业务/停用印章 | ✅ |
| seal-api |  | /v3/seals/org-seals/set-default-seal | POST | ilroud-设置机构默认印章.md | 印章服务API/机构印章/变更/设置机构默认印章 | 电签业务/设置默认印章 | ✅ |
| seal-api |  | /v3/files/file-key | POST | gd1tsb-上传印章图片.md | 印章服务API/个人印章/创建/创建个人图片印章/获取印章图片上传地址fileUploadUrl; 印章服务API/机构印章/创建/创建机构图片印章/获取印章图片上传地址fileUploadUrl | 印章/企业印章/上传印章图片 | ✅ |
| seal-api |  | /v3/seals/org-seals/internal-auth | POST | fu6ov5-内部成员印章授权.md | 印章服务API/机构印章/授权/内部成员授权 | 印章/印章授权-开放接口/新增企业内授权 | ✅ |
| seal-api |  | /v3/seals/org-seals/internal-auth | GET | totfte-查询对内部成员印章授权详情.md | 印章服务API/机构印章/授权/查询对内部成员授权详情 |  | ❌ |
| seal-api |  | /v3/seals/org-seals/external-auth | POST | qkxyha-跨企业印章授权.md | 印章服务API/机构印章/授权/跨企业授权 | 电签业务/新增印章授权（跨企业）; 印章/印章授权-开放接口/新增跨企业印章授权 | ✅ |
| seal-api |  | /v3/seals/org-seals/external-auth | GET |  | 印章服务API/机构印章/授权/查询对外部企业授权详情 |  | ❌ |
| seal-api |  | /v3/seals/org-seals/reauthorization | POST |  | 印章服务API/机构印章/授权/修改印章授权期限 | 印章/印章授权-开放接口/修改授权记录期限 | ✅ |
| seal-api |  | /v3/seals/org-seals/auth-delete | POST | sgx0am-解除印章授权.md | 印章服务API/机构印章/授权/解除印章授权 |  | ❌ |
| seal-api |  | /v3/seals/org-seals/authorization-sign-url | GET | dszm8d-查询印章授权书签署链接.md | 印章服务API/机构印章/授权/查询授权书签署链接 | 印章/印章授权-开放接口/查询印章授权书签署链接 | ✅ |
| seal-api |  | /v3/seals/org-authorized-seal-list | GET | czrua1-查询被外部企业授权印章.md | 印章服务API/机构印章/查询/查询被外部企业授权印章 | 电签业务/查询机构被授权印章列表 | ✅ |
| file-template-api |  | /v3/sign-templates/sign-template-create-url | POST | ukznvprry5qvlxh3-获取《创建流程模板》页面链接.md | 流程模板签署服务API/流程模板类API/流程模板的制作与查询/获取《创建流程模板》页面链接 | 电签业务/创建流程模板; 电签业务/创建流程模板; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/专属云流程模板/创建流程模板 Copy; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/创建流程模板-0703新增字段epaas流程模板自定义控件+控件组; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/创建流程模板; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/创建流程模板 Copy; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/专属云专用/线上-创建模板 Copy; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/获取《创建流程模板》页面链接老模板-带参数; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/获取《创建流程模板》epaas新加参数带自定义控件; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/获取《创建流程模板》epaas新加参数带自定义控件 Copy; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/获取《创建流程模板》开白; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/获取《创建流程模板》页面链接 Copy; 根目录/流程模板开放用例/流程模板开放用例/epaas测试环境流程模板/获取《创建流程模板》带自定义控件验证epaas流程; 根目录/流程模板开放用例/流程模板开放用例/测试环境专属云三期项目/创建模板; 根目录/流程模板开放用例/流程模板开放用例/测试环境专属云三期-完整测试环境/创建模板-完整测试版; 根目录/流程模板开放用例/流程模板开放用例/获取《创建流程模板》页面链接; 根目录/流程模板开放用例/流程模板开放用例/获取《创建流程模板》页面链接-正道灰度; 根目录/流程模板开放用例/流程模板开放用例/获取《创建流程模板》使用钉签企业-明秀测试企业; 根目录/流程模板开放用例/流程模板开放用例/获取《创建流程模板》页面链接-测试白名单功能; 根目录/api3.0动态静态模板/创建流程模板 Copy | ✅ |
| file-template-api |  | /v3/sign-templates/enable | POST | ohk7cno35ozby9qt-开启流程模板.md | 流程模板签署服务API/流程模板类API/流程模板的制作与查询/开启流程模板 | 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/开启流程模板 Copy 2; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/开启流程模板 Copy; 根目录/流程模板开放用例/流程模板开放用例/测试环境专属云三期项目/开启模板; 根目录/流程模板开放用例/流程模板开放用例/开启流程模板 | ✅ |
| file-template-api |  | /v3/sign-templates/disable | POST | gyo1p6cg3yk1rv2g-停用流程模板.md | 流程模板签署服务API/流程模板类API/流程模板的制作与查询/停用流程模板 | 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/关闭流程模板 Copy; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/关闭流程模板 Copy; 根目录/流程模板开放用例/流程模板开放用例/epaas测试环境流程模板/关闭流程模板 Copy; 根目录/流程模板开放用例/流程模板开放用例/测试环境专属云三期项目/关闭模板 Copy; 根目录/流程模板开放用例/流程模板开放用例/关闭流程模板 | ✅ |
| file-template-api |  | /v3/sign-templates/{signTemplateId}/sign-template-edit-url | POST | fifg4ked5cqk6vgt-获取《编辑流程模板》页面链接.md | 流程模板签署服务API/流程模板类API/流程模板的制作与查询/获取《编辑流程模板》页面链接 | 电签业务/获取《编辑流程模板》页面链接; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/获取《编辑流程模板》页面链接 Copy; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/获取《编辑流程模板》页面链接-epaas版自定义控件; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/sixian-编辑链接; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/获取《编辑流程模板》页面链接-带老版自定义控件; 根目录/流程模板开放用例/流程模板开放用例/epaas测试环境流程模板/获取《编辑流程模板》页面链接 Copy; 根目录/流程模板开放用例/流程模板开放用例/测试环境专属云三期项目/编辑流程模板; 根目录/流程模板开放用例/流程模板开放用例/获取《编辑流程模板》页面链接; 根目录/流程模板开放用例/流程模板开放用例/获取《编辑流程模板》使用钉签企业 | ✅ |
| file-template-api |  | /v3/sign-templates/detail | GET | pfzut7ho9obc7c5r-查询流程模板详情.md | 流程模板签署服务API/流程模板类API/流程模板的制作与查询/流程模板-查询类/查询流程模板详情 | 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/API-查询流程模板详情 Copy; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/API-查询流程模板详情-1024坐标问题验证; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/API-查询流程模板详情 -泗县; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/专属云专用/查询模板详情; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/0102api文件模板添加控件 Copy; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/1219线上验证API-查询流程模板详情 Copy; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/0102详情; 根目录/流程模板开放用例/流程模板开放用例/测试环境专属云三期项目/查询流程模板详情; 根目录/流程模板开放用例/流程模板开放用例/API-查询流程模板详情 | ✅ |
| file-template-api |  | /v3/sign-templates | GET | al59g6n5oo75sl19-查询流程模板列表.md | 流程模板签署服务API/流程模板类API/流程模板的制作与查询/流程模板-查询类/查询流程模板列表 | 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/查询流程模板列表 Copy; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/查询流程模板列表 Copy; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/查询流程模板列表-无模板; 根目录/流程模板开放用例/流程模板开放用例/查询流程模板列表; 根目录/流程模板开放用例/流程模板开放用例/测试务校; 根目录/流程模板开放用例/流程模板开放用例/查询流程模板列表-正道; 根目录/流程模板开放用例/流程模板开放用例/查询流程模板列表-项目环境 | ✅ |
| file-template-api |  | /v3/sign-templates/permission | GET | qul915livl97eh6n-查询用户在某企业下能否编辑或使用某流程模板.md | 流程模板签署服务API/流程模板类API/流程模板的制作与查询/流程模板-查询类/查询用户在某企业下能否编辑或使用某流程模板 | 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/查询用户在某企业下能否编辑或使用某流程模板--都有权限 Copy; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/查询用户在某企业下能否编辑或使用某流程模板--都有权限 Copy; 根目录/流程模板开放用例/流程模板开放用例/查询用户在某企业下能否编辑或使用某流程模板--都有权限 | ✅ |
| file-template-api |  | /v3/sign-templates/delete | POST |  | 流程模板签署服务API/流程模板类API/流程模板的制作与查询/删除流程模板 | 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/删除流程模板 Copy; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/删除流程模板 Copy; 根目录/流程模板开放用例/流程模板开放用例/删除流程模板; 根目录/流程模板开放用例/流程模板开放用例/删除流程模板 Copy | ✅ |
| file-template-api |  | /v3/sign-templates/copy | POST |  | 流程模板签署服务API/流程模板类API/流程模板的制作与查询/复制流程模板 | 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/复制流程模板; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/专属云专用/线上-复制模板; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/线上-复制流程模板; 根目录/流程模板开放用例/流程模板开放用例/epaas测试环境流程模板/复制流程模板 Copy; 根目录/流程模板开放用例/流程模板开放用例/测试环境专属云三期项目/复制流程模板; 根目录/流程模板开放用例/流程模板开放用例/复制流程模板 | ✅ |
| file-template-api |  | /v3/sign-flow/create-by-sign-template | POST | megwsgkmpbg1tec1-通过流程模板创建合同拟定和签署流程.md | 流程模板签署服务API/流程模板类API/流程模板的合同拟定与签署/通过流程模板创建合同拟定和签署流程 | 电签业务/通过流程模板创建合同拟定和签署流程; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/专属云流程模板/发起流程-跳过填写; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/专属云流程模板/发起流程-控件填写; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/专属云流程模板/发起流程-仅签模板; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/专属云流程模板/发起流程-随便测试; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/专属云流程模板/发起流程-带附件填写; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/发起流程-使用0703新增带自定义控件模板; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/发起流程-使用0703新增参数-老版模板; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/发起流程-使用集测的模板 Copy; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/发起流程-使用epaas模板0605; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/发起流程-使用epaas模板-动态模板; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/发起流程-仅签模板; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/发起流程-一个控件填写 -复现交付问题; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/发起流程-使用0703新增带自定义控件模板 -复制出的模板; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/发起流程-固定企业方; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/发起流程-使用epaas模板-跳过填写; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/发起流程-使用epaas模板非实名填写; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/发起流程-使用epaas模板1226帮助回归; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/专属云专用/线上-发起流程; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/专属云专用/线上-发起流程-跳过填写; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/发起流程-使用epaas版无需填写人; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/发起流程-使用epaas版使用复制出的模板; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/发起流程-使用epaas模板动态模板1024; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/发起流程-使用epaas模板1128 预填写; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/0102发起流程-使用epaas模板1212跳过填写; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/发起流程-使用epaas模板1226非实名填写; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/发起流程-使用集测的模板老版带自定义控件; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/发起流程-使用epaas模板0614 Copy; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/发起流程-使用仅签模板; 根目录/流程模板开放用例/流程模板开放用例/epaas测试环境流程模板/发起流程-使用测试的模板-固定成员; 根目录/流程模板开放用例/流程模板开放用例/epaas测试环境流程模板/发起流程-使用复制出的模板; 根目录/流程模板开放用例/流程模板开放用例/epaas测试环境流程模板/发起流程-跳过填写; 根目录/流程模板开放用例/流程模板开放用例/测试环境专属云三期项目/发起流程; 根目录/流程模板开放用例/流程模板开放用例/测试环境专属云三期项目/发起流程-不用传参与人; 根目录/流程模板开放用例/流程模板开放用例/测试环境专属云三期项目/发起流程-使用仅签模板; 根目录/流程模板开放用例/流程模板开放用例/测试环境专属云三期项目/发起流程-不用传参与人带自定义控件; 根目录/流程模板开放用例/流程模板开放用例/测试环境专属云三期项目/发起流程-跳过填写; 根目录/流程模板开放用例/流程模板开放用例/测试环境专属云三期项目/发起流程-跳过一半; 根目录/流程模板开放用例/流程模板开放用例/测试环境专属云三期-完整测试环境/发起流程-不用传参与人 Copy; 根目录/流程模板开放用例/流程模板开放用例/使用流程模板发起流程-签署+填写-流程模板项目-冒烟用例模板4-多参与方; 根目录/流程模板开放用例/流程模板开放用例/发起流程-使用集测的模板; 根目录/流程模板开放用例/流程模板开放用例/发起流程-使用集测的模板-项目环境; 根目录/流程模板开放用例/流程模板开放用例/发起流程-0828跳过填写; 根目录/流程模板开放用例/流程模板开放用例/发起流程-经办人线上问题; 根目录/流程模板开放用例/流程模板开放用例/0921仅签模板; 根目录/流程模板开放用例/流程模板开放用例/发起流程-使用测试的模板; 根目录/流程模板开放用例/流程模板开放用例/发起流程-使用0215; 根目录/流程模板开放用例/流程模板开放用例/使用流程模板发起流程-A+A填写; 根目录/流程模板开放用例/流程模板开放用例/使用流程模板发起流程-预填 Copy; 根目录/流程模板开放用例/流程模板开放用例/发起流程-使用集测的模板-项目环境 Copy; 根目录/流程模板开放用例/流程模板开放用例/发起流程-0828跳过填写 Copy; 根目录/流程模板开放用例/流程模板开放用例/发起流程-固定企业-老版; 根目录/流程模板开放用例/流程模板开放用例/发起流程-固定企业-新版; 根目录/流程模板开放用例/流程模板开放用例/发起流程-验证非实名001; 根目录/流程模板开放用例/流程模板开放用例/发起流程-使用集测的模板 Copy | ✅ |
| file-template-api |  | /v3/sign-flow/{signFlowId}/draft-url | POST | gu4n9g6fcaenhmnw-获取填写页面链接.md | 流程模板签署服务API/流程模板类API/流程模板的合同拟定与签署/获取填写页面链接 | 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/获取填写链接 Copy; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/获取填写链接-交付问题; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/专属云专用/线上-获取填写链接; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/获取填写链接 Copy; 根目录/流程模板开放用例/流程模板开放用例/epaas测试环境流程模板/获取填写链接 Copy; 根目录/流程模板开放用例/流程模板开放用例/测试环境专属云三期项目/获取填写链接; 根目录/流程模板开放用例/流程模板开放用例/获取填写链接; 根目录/流程模板开放用例/流程模板开放用例/获取填写链接-7876607004; 根目录/流程模板开放用例/流程模板开放用例/获取填写链接 Copy; 根目录/流程模板开放用例/流程模板开放用例/获取填写链接-项目 | ✅ |
| file-template-api |  | /v3/sign-flow/{signFlowId}/draft-detail | GET | blg0lxnw6e136art-查询合同拟定详情.md | 流程模板签署服务API/流程模板类API/流程模板的合同拟定与签署/合同拟定-查询类/查询合同拟定详情 | 电签业务/查询填写流程详情; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/合同拟定详情 | ✅ |
| file-template-api |  | /v3/sign-flow/list | POST | rhyrpyflgfg4r8ef-查询合同拟定流程列表.md | 流程模板签署服务API/流程模板类API/流程模板的合同拟定与签署/合同拟定-查询类/查询合同拟定流程列表 | 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/v3/sign-flow/list; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/根据填写人状态查询10-26; 根目录/流程模板开放用例/流程模板开放用例/根据填写人状态查询10-26 | ✅ |
| file-template-api |  | /v3/sign-flow/{signFlowId}/status | GET | rw4epk8wc0tzilt3-查询合同拟定和签署流程状态.md | 流程模板签署服务API/流程模板类API/流程模板的合同拟定与签署/合同拟定-查询类/查询合同拟定和签署流程状态 |  | ❌ |
| file-template-api |  | /v3/sign-flow/{signFlowId}/rescind | POST | ktmf18mgqx8zr4uk-撤销合同拟定.md | 流程模板签署服务API/流程模板类API/流程模板的合同拟定与签署/撤销合同拟定 |  | ❌ |
| file-template-api |  | /v3/sign-flow/{signFlowId}/urge-filling | POST | smrt7qcdgmvqk8gg-催填流程中填写人.md | 流程模板签署服务API/流程模板类API/流程模板的合同拟定与签署/催填流程中填写人 |  | ❌ |
| file-template-api |  | /v3/custom-components/create | POST | agc4mx5ei2cg8qsc-创建自定义业务控件.md | 合同文件签署服务API/合同模板类API/自定义模板业务控件API/自定义控件/创建自定义业务控件; 流程模板签署服务API/自定义模板业务控件API/自定义控件/创建自定义业务控件 | 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/线上-创建自定义控件; 根目录/流程模板开放用例/流程模板开放用例/测试环境专属云三期项目/创建自定义控件; 根目录/api3.0动态静态模板/线上api3.0/api3.0线上静态模板创建自定义控件; 根目录/api3.0动态静态模板/线上api3.0/api3.0线上静态模板创建自定义控件; 根目录/api3.0动态静态模板/模拟流程/模拟环境4438762801-静态模板自定义控件 | ✅ |
| file-template-api |  | /v3/custom-components/rename | POST | cqb132urdqavgegv-编辑自定义业务控件.md; xg6mix582gwcfopp-编辑自定义业务控件.md | 合同文件签署服务API/合同模板类API/自定义模板业务控件API/自定义控件/编辑自定义业务控件; 流程模板签署服务API/自定义模板业务控件API/自定义控件/编辑自定义业务控件 |  | ❌ |
| file-template-api |  | /v3/custom-components/delete | POST | hcc56f290siduisx-删除自定义业务控件.md; axbmqwqd8at4d2mv-删除自定义业务控件.md | 合同文件签署服务API/合同模板类API/自定义模板业务控件API/自定义控件/删除自定义业务控件; 流程模板签署服务API/自定义模板业务控件API/自定义控件/删除自定义业务控件 |  | ❌ |
| file-template-api |  | /v3/custom-components/get-list | POST | kz8hg1btwnzpggbm-查询自定义业务控件列表.md; fdxvhhqg247ba4v5-查询自定义业务控件列表.md | 合同文件签署服务API/合同模板类API/自定义模板业务控件API/自定义控件/查询自定义业务控件列表; 流程模板签署服务API/自定义模板业务控件API/自定义控件/查询自定义业务控件列表 |  | ❌ |
| file-template-api |  | /v3/custom-component-group/create | POST | crxfb1zzefbt5166-创建控件组.md; pupwutihq20wss04-创建控件组.md | 合同文件签署服务API/合同模板类API/自定义模板业务控件API/自定义控件组/创建控件组; 流程模板签署服务API/自定义模板业务控件API/自定义控件组/创建控件组 | 根目录/api3.0动态静态模板/线上api3.0/api3.0线上自定义控件组 | ✅ |
| file-template-api |  | /v3/custom-component-group/update | POST | gg3rnagx2paxpku5-编辑控件组.md; bagac0octhfmuefk-编辑控件组.md | 合同文件签署服务API/合同模板类API/自定义模板业务控件API/自定义控件组/编辑控件组; 流程模板签署服务API/自定义模板业务控件API/自定义控件组/编辑控件组 |  | ❌ |
| file-template-api |  | /v3/custom-component-group/rename | POST | kg8p50dhr7n3swln-重命名控件组.md; ve3glnt1v4zx6qst-重命名控件组.md | 合同文件签署服务API/合同模板类API/自定义模板业务控件API/自定义控件组/重命名控件组; 流程模板签署服务API/自定义模板业务控件API/自定义控件组/重命名控件组 | 根目录/api3.0动态静态模板/线上api3.0/控件组名称修改 | ✅ |
| file-template-api |  | /v3/custom-component-group/delete | POST | gg5amde4mhsegket-删除控件组.md; shgyxkpccybh5uz6-删除控件组.md | 合同文件签署服务API/合同模板类API/自定义模板业务控件API/自定义控件组/删除控件组; 流程模板签署服务API/自定义模板业务控件API/自定义控件组/删除控件组 |  | ❌ |
| file-template-api |  | /v3/custom-component-group/get-list | POST | zn0z0cs7p9hh75pg-查询控件组列表.md; zttm2bsngxdahwk0-查询控件组列表.md | 合同文件签署服务API/合同模板类API/自定义模板业务控件API/自定义控件组/查询控件组列表; 流程模板签署服务API/自定义模板业务控件API/自定义控件组/查询控件组列表 | 根目录/api3.0动态静态模板/线上api3.0/查询控件组 | ✅ |
| file-template-api |  | /v3/custom-component-group/get-components | POST | ub5rxe7c32snl9xn-查询控件组中的控件.md; tlzngmohd08fpul1-查询控件组中的控件.md | 合同文件签署服务API/合同模板类API/自定义模板业务控件API/自定义控件组/查询控件组中的控件; 流程模板签署服务API/自定义模板业务控件API/自定义控件组/查询控件组中的控件 |  | ❌ |
| sign-api |  | /v3/sign-flow/create-by-file | POST | nxhgcl3bfgqz8qlz-（精简版）基于文件发起签署.md; su5g42-（完整版）基于文件发起签署.md | 合同文件签署服务API/签署流程-发起类/基于文件发起签署（平台自身单方自动盖章）; 合同文件签署服务API/签署流程-发起类/基于文件发起签署（双方签署）; 合同文件签署服务API/签署流程-发起类/基于文件发起签署（多方签署）; 合同文件签署服务API/签署流程-发起类/基于文件发起签署（备注签署） | 实名认证-test/基于文件发起签署-个人; 实名认证-test/基于文件发起签署-个人 Copy; 实名认证-test/基于文件发起签署-企业; 实名认证-sml/基于文件发起签署; 正式环境/基于文件发起签署; 电签业务/通过文件创建签署流程; 电签业务/通过文件创建签署流程; 电签业务/通过文件创建签署流程-个人发起-无文件和签名域; 电签业务/通过文件创建签署流程-平台方发起-无文件和签名域; 电签业务/通过文件创建签署流程; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/0102使用v3接口发起流程; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/发起签署流程1225; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/0102签署v3创建流程 | ✅ |
| sign-api |  | /v3/sign-flow/{signFlowId}/start | POST | pu4xsx-开启签署流程.md | 合同文件签署服务API/签署流程-变更类/开启签署流程 |  | ❌ |
| sign-api |  | /v3/sign-flow/sign-flow-initiate-url/by-file | POST | lp54bn-通过页面发起签署.md | 合同文件签署服务API/签署流程-发起类/通过页面发起签署 | 电签业务/获取发起流程页面链接; 电签业务/获取发起流程页面链接 | ✅ |
| sign-api |  | /v3/sign-flow/batch-sign-url | POST |  | 合同文件签署服务API/签署流程-发起类/获取批量签页面链接（多流程） | 电签业务/获取批量签署链接 | ✅ |
| sign-api |  | /v3/files/file-upload-url | POST | rlh256-上传本地文件.md | 合同文件签署服务API/文件类API/获取文件上传地址 | 电签业务/v3创建文件; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/专属云流程模板/发起流程-随便测试 Copy; 根目录/api3.0动态静态模板/线上api3.0/api3.0线上获取上传地址 | ✅ |
| sign-api |  | /v3/files/{fileId} | GET | oq5w1ug1algfeo90-查询PDF模板填写后文件.md; qz4aip-查询文件上传状态.md | 合同文件签署服务API/文件类API/查询文件上传状态; 合同文件签署服务API/合同模板类API/查询PDF模板填写后文件 | 电签业务/创建文件; 根目录/流程模板开放用例/流程模板开放用例/测试环境获取下载链接; 根目录/流程模板开放用例/流程模板开放用例/模拟环境获取下载链接; 根目录/api3.0动态静态模板/线上api3.0/线上-获取填充后的fileid; 根目录/api3.0动态静态模板/模拟流程/模拟环境4438773494-静态模板下载; 根目录/api3.0动态静态模板/测试查询静态模板详情 Copy | ✅ |
| sign-api |  | /v3/sign-flow/{signFlowId}/unsigned-files | POST | fuuzv5-追加待签文件.md | 合同文件签署服务API/待签文件及附属材料-变更类/追加待签文件 |  | ❌ |
| sign-api |  | /v3/sign-flow/{signFlowId}/unsigned-files | DELETE | pvs0cm-删除待签文件.md | 合同文件签署服务API/待签文件及附属材料-变更类/删除待签文件 |  | ❌ |
| sign-api |  | /v3/sign-flow/{signFlowId}/attachments | POST | huo44q-追加附属材料.md | 合同文件签署服务API/待签文件及附属材料-变更类/追加附属材料 |  | ❌ |
| sign-api |  | /v3/sign-flow/{signFlowId}/attachments | DELETE | wvvyv8-删除附属材料.md | 合同文件签署服务API/待签文件及附属材料-变更类/删除附属材料 |  | ❌ |
| sign-api |  | /v3/files/{fileId}/keyword-positions | POST |  | 合同文件签署服务API/文件类API/签署前辅助定位/检索文件关键字坐标 |  | ❌ |
| sign-api |  | /v3/files/{fileId}/keyword-positions | GET |  |  |  | ❌ |
| sign-api |  | /v3/sign-flow/{signFlowId}/signers/sign-fields | POST | ohzup7-追加签署区.md | 合同文件签署服务API/签署区-变更类/追加签署区 |  | ❌ |
| sign-api |  | /v3/sign-flow/{signFlowId}/signers/sign-fields | DELETE | bd27ph-删除签署区.md | 合同文件签署服务API/签署区-变更类/删除签署区 |  | ❌ |
| sign-api |  | /v3/files/get-seal-position-url | POST |  | 合同文件签署服务API/文件类API/签署前辅助定位/获取拖章定位页面 | 电签业务/获取拖章定位页面; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/线上-获取拖章页面; 根目录/api3.0动态静态模板/模拟流程/模拟环境-拖章页面; 根目录/api3.0动态静态模板/测试环境-拖章页面-非epaas; 根目录/api3.0动态静态模板/测试环境-拖章页面-epaas | ✅ |
| sign-api |  | /v3/sign-flow/{signFlowId}/sign-url | POST | pvfkwd-获取签署页面链接.md | 合同文件签署服务API/签署流程-发起类/获取签署页面链接 | 实名认证-test/获取签署页面链接; 实名认证-sml/获取签署页面链接 Copy; 正式环境/获取签署页面链接; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/获取签署链接; 根目录/流程模板开放用例/流程模板开放用例/模拟环境-流程模板/获取签署链接-测试微信获取 ; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/专属云专用/线上-获取签署链接; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/0102获取签署链接 Copy; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/0921获取签署链接; 根目录/流程模板开放用例/流程模板开放用例/测试环境专属云三期项目/获取签署链接; 根目录/流程模板开放用例/流程模板开放用例/0921获取签署链接 | ✅ |
| sign-api |  | /v3/approval/approval-url | POST | gx7du8musow9xswe-获取用印审批页面链接.md | 合同文件签署服务API/签署流程-审批类/获取用印审批页面链接 |  | ❌ |
| sign-api |  | /v3/sign-flow/{signFlowId}/detail | GET | xxk4q6-查询签署流程详情.md |  |  | ❌ |
| sign-api |  | /v3/sign-flow/sign-flow-list | POST | kq4b2e-查询签署流程列表.md | 合同文件签署服务API/签署流程-查询类/查询签署流程列表 | 电签业务/查询签署流程列表 | ✅ |
| sign-api |  | /v3/organizations/sign-flow-list | POST | uhma1i-查询集成方企业流程列表.md | 合同文件签署服务API/签署流程-查询类/查询集成方企业流程列表 |  | ❌ |
| sign-api |  | /v3/approval/{approvalFlowId}/detail | GET | sdy3p3ri3825u1xy-查询审批流程详情.md |  |  | ❌ |
| sign-api |  | /v3/approval/approval-task-list | POST | web2zee7wd1bzg8q-查询审批流程列表.md | 合同文件签署服务API/签署流程-审批类/查询审批流程列表 |  | ❌ |
| sign-api |  | /v3/sign-flow/{signFlowId}/preview-file-download-url | GET | gkgc4729sa67upfn-下载签署中文件.md | 合同文件签署服务API/签署流程-下载类/下载签署中文件 |  | ❌ |
| sign-api |  | /v3/sign-flow/{signFlowId}/file-download-url | POST |  |  |  | ❌ |
| sign-api |  | /v3/sign-flow/{signFlowId}/file-download-url | GET |  |  |  | ❌ |
| sign-api |  | /v3/files/{fileId}/detail | GET | gwdngc-查询HTML模板填写后文件.md | 合同文件签署服务API/合同模板类API/查询HTML模板填写后文件 | 根目录/api3.0动态静态模板/线上api3.0/线上-获取动态模板的下载地址; 根目录/api3.0动态静态模板/线上api3.0/线上-获取动态模板生成的fileid详情; 根目录/api3.0动态静态模板/模拟流程/模拟环境4438762801-获取动态模板的下载地址; 根目录/api3.0动态静态模板/模拟流程/模拟环境4438773494-获取动态模板的下载地址 Copy; 根目录/api3.0动态静态模板/测试环境7876712737-获取动态模板的下载地址 Copy Copy; 根目录/api3.0动态静态模板/测试环境-获取动态模板的下载地址; 根目录/api3.0动态静态模板/测试环境  获取动态模板的下载地址 3438757553; 根目录/api3.0动态静态模板/测试环境  获取动态模板的下载地址  7876625192 | ✅ |
| sign-api |  | /v3/sign-flow/{signFlowId}/urge | POST | yws940-催签流程中签署人.md |  | 电签业务/催签 | ✅ |
| sign-api |  | /v3/sign-flow/{signFlowId}/delay | POST | idv0fv-延长签署截止时间.md | 合同文件签署服务API/签署流程-变更类/延期签署截止时间 | 电签业务/签署流程延期 | ✅ |
| sign-api |  | /v3/sign-flow/{signFlowId}/finish | POST | ynwqsm-完结签署流程.md |  |  | ❌ |
| sign-api |  | /v3/sign-flow/{signFlowId}/revoke | POST |  |  |  | ❌ |
| sign-api |  | /v3/evidence-report/apply | POST | ma0az0yx22g15o4w-申请出证.md | 合同文件签署服务API/合同出证服务/申请出证 | 电签业务/申请出证 | ✅ |
| sign-api |  | /v3/evidence-report/query | GET | gpgpgih9n5growuu-查询出证流程详情.md | 合同文件签署服务API/合同出证服务/查询出证流程详情 | 电签业务/查询出证 | ✅ |
| sign-api |  | /v3/antchain-file-info | POST |  | 合同文件签署服务API/检验已签文件/获取区块链存证信息 |  | ❌ |
| sign-api |  | /v3/antchain-file-info/verify | POST |  | 合同文件签署服务API/检验已签文件/核验区块链存证文件 |  | ❌ |
| sign-api |  | /v3/files/{fileId}/verify | POST |  | 合同文件签署服务API/检验已签文件/核验合同文件签名有效性 |  | ❌ |
| sign-api |  | /v3/files/verify-result | POST |  |  |  | ❌ |
| sign-api |  | /v3/sign-flow/{signFlowId}/initiate-rescission | POST | rcgt2karhmz75k1i-发起合同解约.md | 合同文件签署服务API/合同解约服务/发起合同解约 |  | ❌ |
| sign-api |  | /v3/sign-flow/{signFlowId}/rescission-url | POST | dy90gx-通过页面发起合同解约.md | 合同文件签署服务API/合同解约服务/通过页面发起合同解约 |  | ❌ |
| sign-api |  | /v3/files/create-by-doc-template | POST | mv8a3i-填写模板生成文件.md | 合同文件签署服务API/合同模板类API/填写模板生成文件 | 电签业务/v3填充控件生成待签文件; 根目录/api3.0动态静态模板/线上api3.0/线上动态模板api填充; 根目录/api3.0动态静态模板/模拟流程/模拟动态模板api填写; 根目录/api3.0动态静态模板/模拟流程/模拟环境4439036246-预填写; 根目录/api3.0动态静态模板/v3模板填充 | ✅ |
| sign-api |  | /v3/doc-templates/fill-task-result | POST | ovhittqcf7cooxxv-查询填写合同模板任务结果.md | 合同文件签署服务API/合同模板类API/通过页面填写模板/查询填写合同模板任务结果 |  | ❌ |
| sign-api |  | /v3/files/merge-ofd-files | POST |  |  |  | ❌ |

## 孤儿端点（原始数据有 / yaml 无，仅 V3）

> 共 16 个（非 V3 接口已剔除），PM 决定是否补入 yaml

| path (normalized) | method | opendoc_file | docking_postman | test_source |
|---|---|---|---|---|
| /v3/organizations/org-console-url | POST | rhoap2-获取免登录企业控制台页面.md | 企业控制台服务API/获取免登录企业控制台页面 | 正式环境/获取开放平台控制台地址; 电签业务/获取免登录企业控制台页面; 电签业务/获取免登录企业控制台页面; 印章/印章授权-开放接口/获取企业控制台链接 |
| /v3/contracts/paper-file-upload | POST | brstv7hlnfv80whe-纸质合同-归档分类.md | 合同管理服务API/纸质合同管理/纸质合同-归档分类 | 电签业务/查询文件 |
| /v3/ledger/image-download-urls | GET | ruxdeg-获取台账提取的图片下载地址.md | 合同管理服务API/获取智能台账数据/获取台账提取的图片下载地址 |  |
| /v3/orders/org-place-order-url | POST | ncbgcr-获取购买e签宝套餐链接.md |  | 电签业务/获取EP页面 |
| /v3/orders/org-order-manage-url | POST | ynxq2o-查询套餐订单列表（页面版）.md |  | 电签业务/查询套餐订单列表（页面版） |
| /v3/doc-templates/{xxx} | GET | aoq509-查询合同模板中控件详情.md |  | 根目录/api3.0动态静态模板/线上api3.0/使用非epaas模板/api3.0查询模板详情; 根目录/api3.0动态静态模板/线上api3.0/使用非epaas模板/api3.0查询模板详情 Copy; 根目录/api3.0动态静态模板/线上api3.0/线上-获取模板详情24-0821验证线上报错; 根目录/api3.0动态静态模板/模拟流程/模拟查询模板详情-签署区; 根目录/api3.0动态静态模板/模拟流程/模拟查询静态模板详情; 根目录/api3.0动态静态模板/测试查询静态模板详情; 根目录/api3.0动态静态模板/测试查询静态模板详情 Copy |
| /v3/doc-templates/import | POST | cdsn3un5g0bmy64c-导入合同模板.md | 合同文件签署服务API/合同模板类API/扩展功能API/导入合同模板 | 根目录/api3.0动态静态模板/线上api3.0/api3.0线上导入模板; 根目录/api3.0动态静态模板/模拟流程/模拟环境4438762801-导入模板; 根目录/api3.0动态静态模板/模拟流程/模拟环境4438762801-导入模板 Copy |
| /v3/doc-templates/export | POST | eh5l0eibugqw4x4r-导出合同模板.md | 合同文件签署服务API/合同模板类API/扩展功能API/导出合同模板 | 根目录/api3.0动态静态模板/模拟流程/模拟环境4438762801-导出模板 Copy Copy |
| /v3/doc-templates/{xxx}/copy | POST | hgcwhl-复制合同模板.md |  | 根目录/api3.0动态静态模板/线上api3.0/线上/v3/doc-templates/{docTemplateId}/copy |
| /v3/doc-templates/doc-template-preview-url | POST | le6t3e7fbsrdmtx6-获取预览合同模板页面.md | 合同文件签署服务API/合同模板类API/通过页面制作模板/获取预览合同模板页面 | 电签业务/获取文件模板预览页面接口; 根目录/api3.0动态静态模板/线上api3.0/使用非epaas模板/预览链接; 根目录/api3.0动态静态模板/线上api3.0/api3.0线上预览链接; 根目录/api3.0动态静态模板/线上api3.0/api3.0线上静态模板获取预览链接 |
| /v3/doc-templates/{xxx}/doc-template-edit-url | POST | lgb2go-获取编辑合同模板页面.md |  | 根目录/api3.0动态静态模板/线上api3.0/使用非epaas模板/编辑链接; 根目录/api3.0动态静态模板/线上api3.0/api3.0线上静态模板编辑模板链接; 根目录/api3.0动态静态模板/线上api3.0/api3.0线上华峰获取编辑链接; 根目录/api3.0动态静态模板/线上api3.0/线上doc-template-edit-url; 根目录/api3.0动态静态模板/模拟流程/模拟环境4438762801-静态模板获取编辑链接; 根目录/api3.0动态静态模板/模拟流程/模拟动态模板编辑链接; 根目录/api3.0动态静态模板/测试环境 获取编辑链接 |
| /v3/doc-templates | GET | mghz1g-查询合同模板列表.md | 合同文件签署服务API/合同模板类API/查询合同模板列表 |  |
| /v3/doc-templates/doc-template-fill-url | POST | ub4ncy-获取填写合同模板页面.md | 合同文件签署服务API/合同模板类API/通过页面填写模板/获取填写合同模板页面 | 电签业务/获取填写页; 根目录/api3.0动态静态模板/线上api3.0/使用非epaas模板/api3.0线上动态模板填写链接; 根目录/api3.0动态静态模板/线上api3.0/使用非epaas模板/1219api3.0线上静态模板填写链接; 根目录/api3.0动态静态模板/线上api3.0/使用非epaas模板/0109动态模板; 根目录/api3.0动态静态模板/线上api3.0/api3.0线上静态模板不带预填获取填写链接; 根目录/api3.0动态静态模板/线上api3.0/1219api3.0线上静态带预填获取填写链接; 根目录/api3.0动态静态模板/线上api3.0/api3.0线上静态串场景; 根目录/api3.0动态静态模板/线上api3.0/api3.0线上静态模板空白模板获取填写链接; 根目录/api3.0动态静态模板/线上api3.0/api3.0线上动态模板不带预填获取填写链接老版; 根目录/api3.0动态静态模板/线上api3.0/api3.0线上动态模板串场景; 根目录/api3.0动态静态模板/线上api3.0/api3.0线上动态模板不带预填获取填写链接新版; 根目录/api3.0动态静态模板/线上api3.0/api3.0线上动态模板华峰填写链接; 根目录/api3.0动态静态模板/线上api3.0/api3.0模拟静态空白模板; 根目录/api3.0动态静态模板/线上api3.0/线上动态模板填写链接; 根目录/api3.0动态静态模板/线上api3.0/线上动态模板填写链接 Copy; 根目录/api3.0动态静态模板/线上api3.0/线上动态模板填写链接 Copy; 根目录/api3.0动态静态模板/模拟流程/模拟动态模板填写链接; 根目录/api3.0动态静态模板/api模板迁移/测试环境 获取填写链接 Copy; 根目录/api3.0动态静态模板/测试环境 获取填写链接 |
| /v3/doc-templates/doc-template-create-url | POST | xagpot-获取制作合同模板页面.md | 合同文件签署服务API/合同模板类API/通过页面制作模板/获取制作合同模板页面 | 电签业务/获取《创建文件模板》页面链接; 根目录/流程模板开放用例/流程模板开放用例/线上环境-流程模板/线上-创建模板; 根目录/api3.0动态静态模板/线上api3.0/使用非epaas模板/api3.0线上创建静态模板使用非epaas模板; 根目录/api3.0动态静态模板/线上api3.0/使用非epaas模板/api3.0线上创建动态模板链接 Copy; 根目录/api3.0动态静态模板/线上api3.0/api3.0线上创建动态模板链接; 根目录/api3.0动态静态模板/线上api3.0/api3.0线上创建静态模板链接; 根目录/api3.0动态静态模板/线上api3.0/非专属云-api3.0线上创建动态模板链接; 根目录/api3.0动态静态模板/线上api3.0/线上doc-template-create-url; 根目录/api3.0动态静态模板/线上api3.0/api3.0线上创建静态模板链接-5111947670 |
| /v3/service-report/query | GET | awpc8y4d46up93ni-查询e签宝验签报告.md |  | 电签业务/查询验签 |
| /v3/service-report/apply-by-file | POST | mgr3wt2qb1ulqpep-申请e签宝验签报告.md |  | 电签业务/验签报告 |

## 幽灵端点（yaml 有 / 三源全无）

> 共 6 个，PM 决定是否从 yaml 删除

| yaml_module | yaml_operationId | path | method |
|---|---|---|---|
| sign-api |  | /v3/files/{fileId}/keyword-positions | GET |
| sign-api |  | /v3/sign-flow/{signFlowId}/file-download-url | POST |
| sign-api |  | /v3/sign-flow/{signFlowId}/file-download-url | GET |
| sign-api |  | /v3/sign-flow/{signFlowId}/revoke | POST |
| sign-api |  | /v3/files/verify-result | POST |
| sign-api |  | /v3/files/merge-ofd-files | POST |

## 摘要

- yaml 总端点数: 111
- 孤儿端点: 16（非 V3 已剔除）
- 幽灵端点: 6
- 测试覆盖: 52/111

## 过滤统计

| 数据源 | 原始记录 | 过滤后（V3） |
|---|---|---|
| opendoc | 137 | 134 |
| docking | 139 | 133 |
| test_postman | 544 | 157 |
| apifox | 263 | 229 |
| **test_source（合并）** | **807** | **386** |
