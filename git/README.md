# git

## 修改文件或文件夹名称大小写

git 默认对大小写敏感，但是会在仓库克隆或初始化时，根据当前系统来设置是否忽略大小写，比如 Windows 下会设置为 true，即不敏感，而 Linux 中不会忽略；相信有不少开发者的项目开发与协同工作都是在 Windows 系统下进行的，下面就列出 git 的这种机制会导致的问题与解决思路；

- https://knightyun.github.io/2021/01/18/git-ignorecase

### 规范重命名

```
# 修改文件名, git 会识别为 rename 操作
git mv test.txt TEST.txt

# 修改文件夹名, windows 会忽略大小写, 可以迂回通过改2次文件夹名解决
git mv test-dir tmp
git mv tmp TEST-DIR
```

注：windows 下 git pull 后可能会文件夹名称还是没有变，这时可以将文件夹删除，再撤销一下。
