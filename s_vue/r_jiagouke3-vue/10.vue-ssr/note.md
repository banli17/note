+ webpack-cli@4.1.0  webpack解析命令行
+ webpack@5.3.2 webpack核心打包工具
+ vue-loader@15.9.5 解析.vue文件
+ vue-template-compiler@2.6.12 编译vue-template模块 runtimeOnly
+ @babel/core@7.12.3 babel的核心模块
+ babel-loader@8.1.0 babel和webpack的桥梁
+ css-loader@5.0.0 解析样式
+ vue-style-loader@4.1.2 把样式插入到style标签中
+ @babel/preset-env@7.12.1 将高级语法转换成低级语法
+ html-webpack-plugin 自动将打包后的结果插入到html中
+ webpack-dev-server 启动本地开发服务


clientbundle 里面包含着动态js操作
serverbundle 是生成html字符串使用的。 生成的字符串没有js功能，需要将客户端代码挂在到html上

serverRender插件的左右时让打包的js生成成字符串
服务端渲染 还是可以用ajax的。 你希望一加载页面就能看到内容 那就服务端渲染，如果时渲染后在动态拉去还是ajax