let Mixin1 = (superclass) => class extends superclass {
    foo() {
        console.log('foo from Mixin1');
        if (super.foo) super.foo();
    }
};

let Mixin2 = (superclass) => class extends superclass {
    foo() {
        console.log('foo from Mixin2');
        if (super.foo) super.foo();
    }
};

class S {
    foo() {
        console.log('foo from S');
    }
}

class C extends Mixin1(Mixin2(S)) {
    foo() {
        console.log('foo from C');
        super.foo();
    }
}

new C().foo()
// foo from C
// foo from Mixin1
// foo from Mixin2
// foo from S