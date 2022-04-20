
1. 获取 auth 字符串, 命令行输入下面命令

```
echo -n 'username:password' | openssl base64
```

![](./imgs/2022-04-15-15-55-11.png)

2. 项目下新建 .npmrc 文件

```
registry=https://registry.npm.taobao.org/
_auth=aGV5dWhhbzpBSEhxxxxx(这个换一下)
always-auth=true
```

3. 就可以 npm i 了
https://stackoverflow.com/questions/35043155/how-should-i-set-auth-in-npmrc-when-using-a-nexus-https-npm-registry-proxy


https://stackoverflow.com/questions/64813775/is-there-any-way-to-fix-package-lock-json-lockfileversion-so-npm-uses-a-specific
