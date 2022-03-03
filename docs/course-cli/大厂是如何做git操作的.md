# 大厂是如何做 git 操作的?

```
master |    dev     | release
不操作    dev/0.0.1     
								       release打tag0.0.1
				 dev/0.0.2
```

1. fork 到你的分支
2. git clone 到本地
3. 切换到新分支，git checkout -b 新分支
4. 修改代码, git add 和 git commit 
5. git pull
6. git push 
7. 发起 pr，合并 commit 到主仓库
8. codereview, 创建 tags 并删除开发分支