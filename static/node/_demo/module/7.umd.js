// (function (root, factory) {
//     if (typeof define === 'function' && define.amd) {
//         // amd
//         define(factory)
//     } else if (typeof exports == 'object') {
//         // commonjs
//         module.exports = factory()
//     } else {
//         // 浏览器
//         root.util = factory()
//     }
// })(this, function () {
//     return {
//         say: function () {
//             console.log('say...')
//         }
//     }
// });


var a = 1
module.exports = a

console.log(typeof exports)
