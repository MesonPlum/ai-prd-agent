随着业务的发展，我们在进行数据推送过程中会出现增加某些数据字段的情况，这时我们推送给开发者的JSON中会增加一些参数，开发者进行JSON反序列化时有可能出现因JavaBean中无某个字段属性造成解析报错。



我们建议开发者在进行JSON反序列化时考虑容错性，容错方法可参考下方示例。

****

**假设 JSON 和 User 如下：**

```java
// JSON 数据
{"name":"张三","address":"杭州市西湖区"}

// JavaBean 结构
public class User {
    private String name;
}
```

**Java 语言中 JSON 反序列化转JavaBean 示例代码如下：**

| **** | **示例代码** | **备注说明** |
| --- | --- | --- |
| **Gson** | User user = new Gson().fromJson(jsonStr, User.class); | json中的某字段在Bean中没有,无法匹配时，不会报错抛出异常。 |
| **fastjson** | User user =  JSON.parseObject(jsonStr, User.class); | json中的某字段在Bean中没有,无法匹配时，不会报错抛出异常。 |
| **Jackson** | ObjectMapper objMapper = new ObjectMapper();<br/>// jsonToBean时,json中的某字段在Bean中没有,无法匹配时,忽略此字段,不抛出异常<br/>objMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);<br/>User user = objMapper.readValue(jsonStr, User.class); | 如果不设置<br/>objMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);<br/>会出现以下报错：<br/>com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException:<br/>Unrecognized field "address" (class Test$User),<br/>not marked as ignorable (one known property: "name"]) |


:::warning
<font style="color:#E8323C;">Java 开发者如果使用的非 Gson 、 fastjson 和 Jackson，请开发者自行进行容错处理。</font>

<font style="color:#E8323C;">非 Java 开发者请结合各自开发语言进行容错处理。</font>

:::



