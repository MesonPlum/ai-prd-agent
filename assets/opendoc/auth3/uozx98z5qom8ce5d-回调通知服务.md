#### [点击查看 认证授权回调通知接收说明](https://qianxiaoxia.yuque.com/opendoc/notify3/naksvv)
**开发者可通过判断e签宝通知服务推送的 JSON 中的 Action 事件类型，从而进行下一步业务处理。**

:::warning
<font style="color:#F5222D;">Action事件类型可能会出现新增，建议开发者考虑兼容性处理，防止出现代码异常造成业务卡死。</font>

例如，Action业务事件类型判断时，仅将贵司业务需要的类型进行判断并进入下一步业务，其他不需要的类型做忽略处理，这样可以防止新增类型对现有业务造成影响。

:::

| **Action 事件类型** | **Action 对应事件名称**<font style="color:#117CEE;">（点击下方蓝色字直接跳转相关通知文档）</font> |
| --- | --- |
| AUTH_PASS | [实名认证通过通知](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/tme3qi) |
| AUTHORIZE_FINISH | [授权完成通知](https://qianxiaoxia.yuque.com/books/share/65b717a4-b957-4d56-b165-f6efd49e7144/demod3) |
| AUTHORIZE_CHANGE | [授权范围变更通知](https://qianxiaoxia.yuque.com/opendoc/notify3/cgw9f3sa5dgoqynf) |


