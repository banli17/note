// require的原理
// http://www.ruanyifeng.com/blog/2015/05/require.html

// 包是怎么查找的 
// 自己写的包 1)先找文件 js json node 2)找目录 package.json的main 3) 找index  
// 第三方包  module.paths