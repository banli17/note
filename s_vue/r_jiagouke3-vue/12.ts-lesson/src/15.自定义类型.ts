// 第三方的 有其他人专门写了一些扩展方法

// 求差集
let person1 = {
    name: 'zf',
    age: 11,
    address: '回龙观'
}
let person2 = {
    address: '回龙观',
}
type Diff<T extends object, K extends object> = Omit<T, keyof K>
type MyDiff = Diff<typeof person1, typeof person2>;


type InterSection<T extends object, K extends object> = Pick<T, Extract<keyof T, keyof K>>
type myInter = InterSection<typeof person1, typeof person2>


// Overwrite 覆盖属性 如果存在了属性 用新的覆盖掉
interface Person11 {
    a: number,
    name: string,
    age: number
}
interface Person22 {
    age: string,
    address: string
}
// address不会覆盖 但是age会覆盖掉原有的, 同样原来的还需要有

//                               先比较两个人差异    在person2中忽略掉 两个人的差异 （新的里面的和老的公有的部分，以新的为主）
// 去老的中选，选出差异的部分保留
type Overwrite<T extends object, K extends object> = Omit<T, keyof Diff<T, K>> & Pick<K, keyof Diff<K, T>>
type myWrite = Overwrite<Person22, Person11>
let myType: myWrite = {
    a: 1,
    name: 'string',
    age: 'string'
}

// merge对象合并 
let t1 = { name: 'zf', a: 1 };
let t2 = { age: 11, a: 'string' };

type t1 = typeof t1;
type t2 = typeof t2
type Compute<T> = { [K in keyof T]: T[K] }; // 循环里面的属性 重新赋值
type Merge<T, K> = Omit<T, keyof K> & K
type t3 = Compute<Merge<t1, t2>>
let t: t3 = {
    name: 'zf',
    a: 'xxx',
    age: 11
}
export default {}



// 有一个组件它接口 age 、name 、company 三个属性，都是可选的，但是如果传入了 name 那就必须要传入 age
interface Test1 {
    age?: string,
    name?: string,
    company?: string
}
interface Test2 {
    age: string,
    name: string,
    company?: string
}
type NewType<T> = T extends { name: string } ? Test2 : Test1;

function getFn<T>(v: NewType<T>) {
}
let person = { }
getFn<typeof person>(person);