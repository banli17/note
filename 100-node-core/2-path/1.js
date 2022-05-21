const path = require('path')

console.log(__filename);

// 1. basename
console.log(path.basename(__filename)); // 1.js
console.log(path.basename(__filename, '.js')); // 1
console.log(path.basename(__filename, '.css')); // 1.js, .css 不匹配，会被忽略
console.log(path.basename(__filename, 'js'));  // 1.

// 处理目录时
console.log(path.basename('/a/b/c'));  // c
console.log(path.basename('/a/b/c/')); // c, / 会被忽略掉

// 2. 获取路径目录名
// 返回路径中最后一个部分的上一层目录所在路径
console.log(path.dirname(__filename));
console.log(path.dirname('/a/b/c'));
console.log(path.dirname('/a/b/c/'));

// 3. 获取路径的扩展名    (\..+?)$
console.log(path.extname(__filename)); // .js
console.log(path.extname('/a/b')); // ''
console.log(path.extname('/a/b/index.html.js.css')); // .css
console.log(path.extname('/a/b/index.html.js.')); // .

// 4. 解析路径
const obj = path.parse('/a/b/c')
console.log(obj);
const obj1 = path.parse('./a/b/c')
console.log(obj1);

// 5. 序列化操作
console.log(path.format(obj1));

// 6. 判断绝对路径
console.log(path.isAbsolute('foo'));
console.log(path.isAbsolute('/foo'));
console.log(path.isAbsolute('///foo')); // /// 会合成1个 /, true

// 7. join
console.log(path.join('a/b', 'c', 'index.html'));
console.log(path.join('/a/b', 'c', 'index.html'));
console.log(path.join('/a/b', 'c', '../', 'index.html'));
console.log(path.join('a/b/', '/c', 'index.html'));
console.log(path.join('')); // . 当前工作目录

// 8. 规范化路径
console.log(path.normalize('a/b/c\d')); // a/b/cd
console.log(path.normalize('a/b/c\///d')); // a/b/c/d
console.log(path.normalize('a/b/c/../d')); // a/b/d
console.log(path.normalize('a/\b/c')); // a//d

// 9. 绝对路径 resolve([form], to) 将 to 变成绝对目录，如果不是，会加上 cwd 目录
console.log(path.resolve());  // cwd 目录
console.log(path.resolve('/a', '/b'));    // /b
console.log(path.resolve('/a', 'b'));  // /a/b