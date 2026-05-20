#### [点击查看 文件和模板回调通知接收说明](https://qianxiaoxia.yuque.com/opendoc/notify3/qv82pc) 、[点击查看 签署回调通知接收说明](https://qianxiaoxia.yuque.com/opendoc/notify3/sblzg8)、[点解查看 审批回调通知接收说明](https://qianxiaoxia.yuque.com/opendoc/notify3/tr6cur0c658inqu0)
**开发者可通过判断e签宝通知服务推送的 JSON 中的 Action 事件类型，从而进行下一步业务处理。**

:::warning
<font style="color:#F5222D;">Action事件类型可能会出现新增，建议开发者考虑兼容性处理，防止出现代码异常造成业务卡死。</font>

例如，Action业务事件类型判断时，仅将贵司业务需要的类型进行判断并进入下一步业务，其他不需要的类型做忽略处理，这样可以防止新增类型对现有业务造成影响。

:::

| **Action 事件类型** | **Action 对应事件名称**<font style="color:#117CEE;">（点击下方蓝色字直接跳转相关通知文档）</font> |
| --- | --- |
| **<font style="color:#E8323C;">文件模板类通知事件</font>** | |
| EDIT_DOCTEMPLATE | [文件模板创建或编辑完成通知](https://qianxiaoxia.yuque.com/opendoc/notify3/gvtpgmlugb0fb1la) |
| FILL_DOCTEMPLATE | [文件模板填写完成通知](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/smamg4) |
| FILL_DOCTEMPLATE_FAIL | [文件模板填写失败通知](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/gexig4) |
| **<font style="color:#E8323C;">签署类通知事件</font>** | |
| OPERATOR_READ | [签署方-已读通知](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/ok58qr) |
| SIGN_MISSON_COMPLETE | [签署方-签署结果通知](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/zzcdf8) |
| SIGN_FLOW_COMPLETE | [流程结束通知](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/glqgy1) |
| SIGN_FLOW_INITIATED | [签署发起成功通知](https://open.esign.cn/doc/opendoc/notify3/llu8g1) |
| OPERATOR_CORRECT_IDENTITY | [签署人更正个人信息回调通知](https://open.esign.cn/doc/opendoc/notify3/waqf917gq1h56ct8) |
| TRANSMISS_SIGN | [经办人转交签署任务通知](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/deotva) |
| SIGN_SEAL_EXAMINE_REJECTED | [用印审批驳回通知](https://open.esign.cn/doc/opendoc/notify3/ameyct) |
| SIGN_FILE_RESCISSION_INITIATE | [合同发起解约通知](https://open.esign.cn/doc/opendoc/notify3/dlwpxm) |
| SIGN_FILE_RESCINDED | [合同解约成功通知](https://open.esign.cn/doc/opendoc/notify3/fxvgkg) |
| COPIER_READ | [抄送方-已读通知](https://qianxiaoxia.yuque.com/opendoc/notify3/yfx966alfsgg3803) |
| BATCH_SIGN_FLOW_COMPLETE | [批量签署结果通知](https://qianxiaoxia.yuque.com/opendoc/notify3/ctdi52o8g7ffsx8g) |
| **<font style="color:#E8323C;">审批类通知事件</font>** | |
| INITIATE_APPROVAL | [发起审批流程通知](https://qianxiaoxia.yuque.com/opendoc/notify3/kh35wwaiuiw2nxxu) |
| APPROVAL_FINISH | [完结审批流程通知](https://qianxiaoxia.yuque.com/opendoc/notify3/emi859b4g7p48xsu) |
| APPROVAL_TASK_START | [审批任务开启通知](https://qianxiaoxia.yuque.com/opendoc/notify3/pylk5ceaig3cdxev) |
| APPROVAL_TASK_COMPLETE | [审批任务完成通知](https://qianxiaoxia.yuque.com/opendoc/notify3/ld8isoxwz44rfegg) |
| APPROVAL_TASK_TRANS | [审批任务转交通知](https://qianxiaoxia.yuque.com/opendoc/notify3/zvxqs630ui9gvquv) |




