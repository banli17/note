---
title: MongoDB 熟练到精通
---

## 用户管理

mongodb 的用户信息是存放在 system.users 表中。

```
// ❌ 错误做法，直接更新表
db.system.users.update({"_id" : ObjectId("529e67553992b24438d5e315")},{"user":"tank2","readOnly" : false,"pwd":"123"})

// ✅ db.addUser，如果用户名相同，密码不同的话，就会更新密码。
db.addUser('tank2','111')

// ✅ db.changeUserPassword
db.changeUserPassword('tank2','test');
```

## 安全性

https://www.cnblogs.com/fundebug/p/how-to-protect-mongodb.html
