const test = (age) => (target) => {
    target.prototype.age = age
}

@test(18)
class Test { }

const t = new Test()
console.log(t.age)  // 18