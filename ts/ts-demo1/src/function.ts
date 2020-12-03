// 函数定义
function add1(x: number, y: number) {
    return x + y
}
let add2: (x:number, y:number) => number
type add3 = (x: number, y: number) => number

interface add4 {
    (x: number, y: number) : number
}

// add1(1, 2, 3)

// 可选参数，要在必须参数之后
function add5 (x: number, y?:number){

}
// 必选参数前的默认参数都要传，后面的可以不用传
function add6(x:number, y=0,z:number){

}

function add7(x: number, ...rest: number[]){
    // reduce 求和
    return x + rest.reduce((prev, cur) => prev + cur)
}
add7(1,2,3,4,5)

// 函数重载，貌似毫无意义
function add8(...rest: number[]): number
function add8(...rest: string[]): string
// 实现，需要使用 any
function add8(...rest: any[]): any {
    if(typeof rest[0] === 'string'){
        return 0
    }
    if(typeof rest[0] === 'number'){
        return 0
    }
}
add8('hi', 'hello')
// add8('hi', 5)  检查了参数
add8(1,2,3) // ts 碰到这个函数时会去查找函数的定义，并根据参数类型来匹配选择哪个定义