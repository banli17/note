---
title: "react-native 项目版本管理"
date: 2017-04-11 09:37:53
toc: true
---


现在我们的项目代码管理是使用git，然后新建了三个主要的分支：

```
- master: 用于每次大版本的备份，即deploy大版本
- deploy 分支: 线上版本，用于android, ios热更新
- next 分支: 下个版本的合并版本
```

1. 如果线上deploy版本有bug，那么从deploy新建一个分支，修改完测试，测试完成后合并到deploy分支，然后热更新。
2. 如果要开发新需求，则统一在下一个版本 next 新建分支`next_a`开发，开发完成后测试通过后发新版本。
3. 发新版本的时候，将 deploy 合并到 master，将 next 合并到 deploy，使用 deploy 分支打包 app 发布。

总之 deploy 负责线上版本管理，next用于下一个版本的开发。

