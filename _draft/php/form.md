---
        title: 无名
        ---
        # php表单处理



php 使用 $_GET 和 $_POST 收集表单数据。它们是全局变量。

在post提交表单时，会创建$_POST数组，如`Array ([name] => 12 [age] => 12 )`。

$_GET是通过URL参数传递给当前脚本的变量数组。 $_POST是通过HTTP POST方法传递给当前脚本的变量数组。

get相对不安全，因为参数显示在url上，别人可以看见，而且大小有限制，每个浏览器不一致，最好不超过2kb。好处是可以加为标签保存。

不要用get发送敏感数据。

post数据大小没有限制，而且支持高级功能，如文件上传的二进制数据。

## 表单验证

防止垃圾和被黑客攻击。

`$_SERVER["PHP_SELF"]`是一个超级全局变量，它返回当前正在执行的php脚本的文件名。因此，`$_SERVER["PHP_SELF"]`将提交的表单数据发送到页面本身，而不是跳转到不同的页面。这样，用户将在与表单相同的页面上收到错误消息。
                                                    
`htmlspecialchars()`函数将特殊字符转换为HTML实体。这意味着它将用`＆lt;`和`＆gt;`替换 <和> HTML字符。。这可以防止攻击者通过在表单中​​注入HTML或Javascript代码（跨站点脚本攻击）来利用代码。

```php
<form action="<?php echo $_SERVER['PHP_SELF'];?>" method='post'>
    姓名：<input type="text" name="name"> <br>
    年龄：<input type="text" name="age"> <br>
    <input type="submit" value="提交">
</form>
```

不过这样就有安全问题，比如在 url 中加入 script 脚本进行 xss 攻击。使用`htmlspecialchars()`可以避免这一攻击。

另外还需要做2件事情：
- 删除不必要的字符（额外空格，制表符，换行符），用`trim()`。
- 删除数据中的反斜杠\，使用`stripslashes()`。    

```php
<?php
// define variables and set to empty values
$name = $email = $gender = $comment = $website = "";

  // 页面提交时，在post提交后，刷新页面浏览器默认还是会post那些数据，哦get也是到地址上提交，所以一样
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = test_input($_POST["name"]);
  $email = test_input($_POST["email"]);
  $website = test_input($_POST["website"]);
  $comment = test_input($_POST["comment"]);
  $gender = test_input($_POST["gender"]);
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>
```

- 另外我们还要检查必填字段不能为空，使用`empty()`。
- 验证名称有效性，使用正则`pre_match('/^[a-zA-Z ]$/',$name)`。
- 验证电子邮件`filter_var($email, FILTER_VALIDATE_EMALL)`
- 验证url规则`preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i",$website)`。


```php
<input type="radio" name="gender"
<?php if (isset($gender) && $gender=="female") echo "checked";?>
value="female">
```
