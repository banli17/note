// 类型声明
declare let vue:string ; // declare 关键字 只是让我们的代码有提示功能而已
declare function sum():void // 没有实现
declare class Person{}
declare interface Tamoto{
    name:string
}
declare namespace A {
   const a:string // declare 里面的内容 不需要导出 也不需要在增加declare
}
declare enum Seansos {
    Spring,
    Summer
}
// --------------这些东西就是给你当提示用的 不需要实现-----------------


// console.log(Seansos.Spring); // 仅仅是一个提示作用

// 不是同名的就能合并 （接口同名的接口可以自动合并） (函数和命名空间能自动合并) （命名空间和 命名空间也能合并）
// declare function $(selector:string):{
//     height(val:number):void
//     width(val:number):void
// }
// declare namespace ${
//     namespace fn{
//         function extend():void
//     }
// }
// declare namespace ${
//     namespace xxx{
//         function extend():void
//     }
// }

// $('xxx').width(100);
// $('xxx').height(2000);
// $.xxx.extend()
// $.fn.extend();

// npm install @types/jquery (如果本身模块用的就是ts编写的就不需要安装 类型声明文件)
import $ from 'jquery'; // export default $

// import $  = require('jquery'); // export = jquery (为了兼容commonjs 规范来实现额) node中可以使用这套api

// commonjs 规范可以动态引入  es6 静态的 可以支持treeshaking 

// export = Jquery ts 准备好的到处方法  标识代码可以在commonjs规范中使用



// 扩展类型

