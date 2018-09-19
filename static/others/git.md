# git使用总结


## 学习资料

- [git book pro](https://git-scm.com/book/zh/v2)

## git分支

1、git保存的是每个文件的快照。git commit 第一次提交前，会计算每个子目录的校验和，然后将这些目录保存成树对象。之后创建的提交对象，包含提交信息和这个树对象的指针。

2、提交的对象看起来像下图。

![](./imgs/git/3-1.png)

3、多次提交之后像下面这样。

![](./imgs/git/3-2.png)

4、分支实际是指向 commit 对象的可变指针。git 会使用 master 作为分支的默认名。多次提交后，HEAD指针会指向最后一次提交对象的 master 分支。每次提交，指针会向前移动。

![](./imgs/git/3-3.png)

5、创建分支

```bash
git branch testing
```

创建后，HEAD还是指向 master 分支，切换分支需要使用下面命令。

```bash
git checkout testing
```

6、每个分支都是相互独立的，可以在各个分支进行修改提交，只需要在最后合适的时候，将分支合并即可。




## 服务器上的git

### 生成SSH公钥

```bash
ssh-keygen
```

通过下面命令生成秘钥，会存储在用户主目录下的`~/.ssh`目录。`id_dsa`是秘钥，`id_dsa.pub`是公钥。

在window下，`ssh-keygen`如果不是内部命令，需要将`ssh-keygen.exe`的路径`C:\Program Files\Git\usr\bin`加入到环境变量中。


## 初始化

生成秘钥

```bash
ssh-keygen

git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```


## 切换版本

```
git log 查看当前版本之前的提交记录，如果回退了，就看不到后退之后提交的记录了。
git reflog  可以查看所有分支的所有操作记录，包括 commit 和 reset的操作。
git checkout fdss22
```

## 创建和合并分支

新建并切换到分支。

```
git checkout -b w0  // -b 表示切换到分支

// 相当于下面2条命令
git branch w0  // 创建分支
git checkout w0  // 切换到分支

git merge w0

git branch -d w0  // 删除w0分支
```

当产生冲突时，处理之后再add提交。

**创建忽略文件.gitignore**

新建一个名叫 `.gitignore` 的文件，并添加如下代码:

```
node_modules
.gitignore
```

这样在提交的时候，就会忽略上面的这些文件。

## 问题

1. 本地新建了很多文件夹和文件，`commit` 提交时报错 `error: pathspec 'html' did not match any file(s) known to git.`。

直接执行下面语句：

```
git commit -m "提交"
```

2. 不能直接 `push`，需要先 `commit`。


3. `git status` 时，中文转义了，解决方法是让 `git` 不处理 `utf-8` 文件名。

```
git config --global core.quotepath false
```


4. 删除github上所有文件

## 参考资料

- 清空提交记录https://stackoverflow.com/questions/13716658/how-to-delete-all-commit-history-in-github
- 教学全程使用git实现协同开发
- 深入学习和使用git
- 代码管理思想


## 一些报错的解决方法

**1. Updates were rejected because the tip of your current branch is behind**

```
git push -u origin master -f
```

**2. git warning: LF will be replaced by CRLF in**

```
git config core.autocrlf false
```


**3. windows上git提交的内容，在mac上报错了。env: bash\r: No such file or directory**

如果上Mac

```bash
brew install dos2unix # Installs dos2unix Mac
find . -type f -exec dos2unix {} \; # recursively removes windows related stuff
```

如果上Linux

```bash
sudo apt-get install -y dos2unix # Installs dos2unix Linux
sudo find . -type f -exec dos2unix {} \; # recursively removes windows related stuff
```

之后确保windows上首先配置一下提交始终使用linux行结束符\n。

```bash
git config --global core.autocrlf input
```
