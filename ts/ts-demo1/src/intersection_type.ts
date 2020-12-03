interface DogInterface{
    run(): void
}
interface CatInterface{
    jump(): void
}

// 交叉类型，取并集
let pet: DogInterface&CatInterface = {
    run(){},
    jump(){}
}

// 联合类型
let intera: number|string = 1

// 字面量类型，限定取值范围
let b : 'a' | 'b' | 'c' = 'c';
let c : 1|2 | 3

class Dog implements DogInterface{
    run(){}
    eat(){}
}

class Cat implements CatInterface{
    jump(){}
    eat(){}
}

enum Master{Boy, Girl}

function getPet(master: Master){
    let pet = master === Master.Boy ? new Dog() : new Cat()
    // pet.run();
    pet.eat()
    return pet;
}


interface Square {
    kind: 'square';
    size: number
}
interface Rectangle{
    kind: 'rectangle'
    width: number
    height: number
}
interface Circle {
    kind: 'circle',
    r: number
}
type Shape = Square | Rectangle | Circle
function area(s: Shape) :number{
    switch(s.kind){
        case 'square':
            return s.size
        case 'rectangle':
            return s.width * s.height
        case 'circle':
            return s.r
        default: 
            // 永远不会执行，说明前面的分支都走到了
            return ((e: never) => {throw new Error(e)})(s)
    }
}
console.log(area({kind: 'circle', r: 1}))

export {}