---
title: EditorConfig
---

EditorConfig 插件会查找当前目录和父目的`.editorconfig`文件，一直到找到根目录或者`root=true`的 EditorConfig 文件。

离文件最近的 EditorConfig 优先级最高，父级的 EditorConfig 优先级降低。

对于 Windows 用户：要.editorconfig 在 Windows 资源管理器中创建文件，需要创建一个名为的文件.editorconfig.，Windows Explorer 将自动重命名为.editorconfig。

## 文件格式详情

**通配符**

```
*	匹配任何字符串，除了路径分隔符（/）
**	匹配任何字符串
?	匹配任何单个字符
[name]	与名称中的任何单个字符匹配
[!name]	匹配任何不在名称中的单个字符
{s1,s2,s3}	匹配任何给定的字符串（以逗号分隔）（自EditorConfig Core 0.11.0起可用）
{num1..num2}	匹配num1和num2之间的任何整数，其中num1和num2可以是正值或负值
```

**支持的属性**

```
indent_style：tab为hard-tabs，space为soft-tabs。
indent_size：用来控制tab和空格占多少字符。
tab_width：可以覆盖indent_size中的tab，一般不需要指定。
end_of_line：设置为lf，cr或crlf来控制换行符形式。
charset：设置为latin1，utf-8，utf-8-bom，utf-16be或utf-16le来控制字符集。
trim_trailing_whitespace：是否删除换行符前面的空白字符。
insert_final_newline：是否在文件最后插入一个新行。
root：应该在任何部分之外的文件顶部指定的特殊属性。设置为true以停止.editorconfig在当前文件上搜索文件。
```

目前所有的属性和值都是不区分大小写的。分析时它们是小写的。通常，如果未指定属性，则将使用编辑器设置，即 EditorConfig 对该部分不起作用。

很多软件已经内置了 EditorConfig 插件，所以只需要加配置文件即可，比如 vscode、webstorm 等。

vscode 需要在设置中添加：

```
"editor.detectIndentation": false
```

## 参考

- [http://editorconfig.org/](http://editorconfig.org/)
- [【译】EditorConfig 介绍](http://www.alloyteam.com/2014/12/editor-config/)

## 参考资料

- [AlloyTeam ESLint 配置指南](http://www.alloyteam.com/2017/08/13065/)
- [ESLint 标准规则](https://github.com/AlloyTeam/eslint-config-alloy/blob/master/index.js)
