class A {
    static show() {
    }

    say() {

    }
}

let a1 = new A()
let a2 = new A()
console.log(a1.say === a2.say);  // true
