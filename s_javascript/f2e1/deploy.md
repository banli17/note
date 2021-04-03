---
title: 打包和发布
---

## Android

### 签名

### 使用 jarsigner 对 APK 文件进行签名

可用于没有签名和已经签名的 apk，再次签名。

```
jarsigner -verbose -keystore [keystorePath] -signedjar [apkOut] [apkin] [alias]
```

命令格式及参数意义：

- `-verbose` -> 输出签名过程的详细信息
- `-keystore [keystorePath]` -> 密钥的库的位置
- `-signedjar [apkOut]` -> 签名后的输出文件名
- `[apkin]` -> 待签名的文件名
- `[alias]` -> 证书别名

签名命令

```sh
keytool -genkeypair -alias - mydemo.keystore -keyalg RSA -validity  100 -keystore mydemo.keystore

# 说明
-genkeypair  ：指定生成数字证实
-alias ：指定生成数字证书的别名
-keyalg：指定生成数字证书的算法   这里如 RSA 算法
-validity：指定生成数字证书的有效期
-keystore ：指定生成数字证书的存储路径。  （这里默认在 keytool.exe 目录下）
-verbose：指定生成详细输出
-keystore：指定数字证书存储路径
-signedjar：该选项的三个参数为   签名后的 apk 包   未签名的 apk 包   数字证书别名
```
