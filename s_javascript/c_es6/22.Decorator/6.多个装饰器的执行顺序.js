
const d1 = () => {
    console.log('d1')
}
const d2 = () => {
    console.log('d2')
}

// 首先生成装饰器，然后再执行装饰器函数

class Test {
    @d1
    @d2
    getAge() {

    }
}

const t = new Test
console.log(t.getAge)  // d2  d1