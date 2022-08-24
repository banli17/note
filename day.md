
1、在测试时，将版本号修改为 `major.minor.patch-alpha.x` 发布带 tag 版本，如下:

```sh
npm publish --tag v3-test  # 用于 ui v3 版本测试
npm publish --tag v4-test  # 用于 ui v4 版本测试
```

2、测试通过后，将版本号修改为标准版本，然后通过 npm publish 发布，ui v3 版本号格式为 `major.minor.patch` ui v4 还在完善中，版本号格式为 `major.minor.patch-beta`。

优雅的防止页面文字选中拖拽问题？
document.body.ondragstart= ()=>{ return false }

```
# 清除缓存
pnpm store prune
```
