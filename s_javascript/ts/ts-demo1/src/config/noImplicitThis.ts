function add (x: number, y: number){

}

add(3, 4)
add.call(null,3, 4)
add.call(null,3, '4') // strictBindCallApply false 时可以

class A {
    a: number = 1
    getA(){
        // return function(){
        //     console.log(this.a)
        // }
        // 解决方法： 使用箭头函数，或者 关闭 noImplicitThis
        return ()=>{
            console.log(this.a)
        }
    }
}
let a = new A().getA()
a()

export {}