// 类型推断  
// 1.当赋值时会推断

let str = ''; // 不赋值时什么类型，会根据值进行推断
let age = 11;


// 2.函数默认会进行推断 函数会根据右边的赋值 推到左边的类型  不用特意标注类型
// 3.返回值的推断
const sum = (a:string,b:string)=>{
    return {a,b}
}

// 4.属性推断

let school = { // 需要限制必须要添加类型
    name:'zf',
    age:11,
}
let {name,age:ag1} = school; // 对象解构 取出属性会自动进行类型推到

interface ISchool { // 通过索引访问操作符获取类型
    name:string,
    age:number,
    address:{
        n:string
    }
}
type n = ISchool['address']['n']; // 接口中取属性 只能用[]

// 类型的反推  extends keyof typeof
type MySchool = typeof school;

// 类型保护

// typeof

export {}