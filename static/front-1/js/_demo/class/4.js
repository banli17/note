// 多继承

var calculatorMixin = Base => class extends Base {
	calc() {
	}
};

var randomizerMixin = Base => class extends Base {
	randomize() {
	}
};

class Foo {
	
}

class Bar extends calculatorMixin(randomizerMixin(Foo)) {
	
}

console.dir(new Bar)