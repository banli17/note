---
        title: 无名
        ---
        # session

由于http是无状态的，无法保存用户的登陆状态，所以出现了session。

新建会话时，服务器会给用户分配一个sessionId,对应的数据会在对应的文件中，用户下次链接时，通过 cookie 将 sessionId 发送过来，服务器从而找到对应的 session 信息。

session 是有持续时间的，默认是24分钟。会话过期会重新创建一个新的会话。
