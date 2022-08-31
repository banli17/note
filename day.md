
1、在测试时，将版本号修改为 `major.minor.patch-alpha.x` 发布带 tag 版本，如下:

```sh
npm publish --tag v3-test  # 用于 ui v3 版本测试
npm publish --tag v4-test  # 用于 ui v4 版本测试
```

2、测试通过后，将版本号修改为标准版本，然后通过 npm publish 发布，ui v3 版本号格式为 `major.minor.patch` ui v4 还在完善中，版本号格式为 `major.minor.patch-beta`。

优雅的防止页面文字选中拖拽问题？
document.body.ondragstart= ()=>{ return false }

```sh
# 清除缓存
pnpm store prune
```

本地调试命令包的方法
当 test 目录安装了两个本地包A、B(软链接，切两个包在同一个目录下平级)后，运行命令时，如果 A 里没有安装依赖 B，会报错 B 模块找不到。
这时，可以在 A 里增加 debug，在 debug 下重新设置 import(BPath) B 包的链接，通过下面方法引入。

```js
if(debug){
    BPath = path.resolve(__dirname, '../../', 'B')
}
import(BPath)

// 执行命令语句
cli --debug
```

<https://stackoverflow.com/questions/64573177/unable-to-resolve-dependency-tree-error-when-installing-npm-packages>
