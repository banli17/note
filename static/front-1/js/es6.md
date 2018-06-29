# es6


## let和const

看下面一段代码运行 getClothing(false) 后的输出是什么？

```
function getClothing(isCold) {
  if (isCold) {
    var freezing = 'Grab a jacket!';
  } else {
    var hot = 'It's a shorts kind of day.';
    console.log(freezing);
  }
}
```

输出是undefined，是不是很奇怪？因为浏览器解析 JavaScript 时，进行了变量提升。在执行任何 JavaScript 代码之前，所有变量都会被“提升”，也就是提升到函数作用域的顶部。

使用 let 和 const 声明的变量解决了这种提升问题，因为它们的作用域是到块，而不是函数。之前，当你使用 var 时，变量要么为全局作用域，要么为本地作用域，也就是整个函数作用域。

如果在代码块（用花括号 { } 表示）中使用 let 或 const 声明变量，那么该变量会陷入暂时性死区，直到该变量的声明被处理。这种行为会阻止变量被访问，除非它们被声明了。


let 和 const 还有一些其他有趣特性。

- 使用 let 声明的变量可以重新赋值，但是不能在同一作用域内重新声明。
- 使用 const 声明的变量必须赋初始值，但是不能在同一作用域内重新声明，也无法重新赋值。

最大的问题是何时应该使用 let 和 const？一般法则如下：

当你打算为变量重新赋值时，使用 let，以及
当你不打算为变量重新赋值时，使用 const。
因为 const 是声明变量最严格的方式，我们建议始终使用 const 声明变量，因为这样代码更容易读懂，你知道标识符在程序的整个生命周期内都不会改变。如果你发现你需要更新变量或更改变量，则回去将其从 const 切换成 let。

还有必要使用 var 吗？没有了。

## 模板字面量

```
const i = {name:'zs'};
const a = `hello
    world ${i.name}`;
a.indexOf('\n')  // 5
a.includes('\n') // true
```

模板字面量将换行符也当做字符处理了。模板字面量中的嵌入式表达式不仅仅可以用来引用变量。你可以在嵌入式表达式中进行运算、调用函数和使用循环！

```
a = `${1+2}`   // 3
```

## 解构

解构数组中的值
解构对象中的值
```
const point = [10, 25, -34];
const [x, y, z] = point;
console.log(x, y, z);  // 10 25 -34

const [x, , z] = point; //忽略了 y 坐标
```

## 对象字面量简写法

简写属性和方法名称。
```
let gemstone = {
  type,
  color,
  carat,
  calculateWorth() { ... }
};
```

## 迭代

迭代就是依次访问一个对象。比如循环时定义的i，就是迭代器，它一个接一个的访问对象的每一项。

for...of循环结合了for和for...in循环的优势。可以循环任何可迭代类型的数据，默认情况下，包括String、Array、Map、Set,不包括Object。默认情况下，对象不可迭代。

for 循环的最大缺点是需要跟踪计数器和退出条件。

在此示例中，我们使用变量 i 作为计数器来跟踪循环并访问数组中的值。我们还使用 digits.length 来判断循环的退出条件。如果只看一眼这段代码，有时候会比较困惑，尤其是对于初学者而言。

虽然 for 循环在循环数组时的确具有优势，但是某些数据结构不是数组，因此并非始终适合使用 loop 循环。

for...in 循环改善了 for 循环的不足之处，它消除了计数器逻辑和退出条件。

但是依然需要使用 key 来访问数组的值，这样很麻烦；几乎比之前更让人迷惑。此外，当你需要向数组中添加额外的方法（或另一个对象）时，for...in 循环会带来很大的麻烦。因为 for...in 循环循环访问所有可枚举的属性，意味着如果向数组的原型中添加任何其他属性，这些属性也会出现在循环中。


但是等等，还有更多优势！for...of 循环还具有其他优势，解决了 for 和 for...in 循环的不足之处。

你可以随时停止或退出 for...of 循环。

```
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (const digit of digits) {
  if (digit % 2 === 0) {
    continue;
  }
  console.log(digit);
}
```

不用担心向对象中添加新的属性。for...of 循环将只循环访问对象中的值。


## 展开运算符

展开运算符（用三个连续的点 ( ... ) 表示）是 ES6 中的新概念，使你能够将字面量对象展开为多个元素。

使用 concat 方法结合数组麻烦了，如果有简写方法，会不会更好？

如果你可以使用展开运算符将数组展开为多个元素，那么肯定有一种方式将多个元素绑定到一个数组中吧？

实际上，的确有！叫做剩余参数，它是 ES6 中新加的另一个运算符。

剩余参数也用三个连续的点 ( ... ) 表示，使你能够将不定数量的元素表示为数组。它在多种情形下都比较有用。


```
const order = [20.17, 18.67, 1.50, "cheese", "eggs", "milk", "bread"];
const [total, subtotal, tax, ...items] = order;
console.log(total, subtotal, tax, items);
// Prints: 20.17 18.67 1.5 ["cheese", "eggs", "milk", "bread"]
```

- 可变参数函数

```
function sum(...nums) {
  let total = 0;
  for(const num of nums) {
    total += num;
  }
  return total;
}
```

上面nums是个[]，没有参数，就是个空数组。

## 函数的变化

箭头函数，单条语句不需要return

普通函数可以是函数声明或函数表达式，但是箭头函数始终是表达式。实际上，它们的全称是“箭头函数表达式”，因此仅在表达式有效时才能使用，包括：
- 存储在变量中，const greet = name => `Hello ${name}!`;
- 当做参数传递给函数，
- 存储在对象的属性中。

name => `Hello ${name}!`
如果你还记得，参数列表出现在箭头函数的箭头（即 =>）前面。如果列表中只有一个参数，那么可以像上述示例那样编写代码。但是，如果列表中有两个或多个参数，或者有零个，则需要将参数列表放在圆括号内：const sayHi = () => console.log('Hello Udacity Student!');

简写主体语法和常规主体语法

const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map(
  name => name.toUpperCase()
);
这种函数主体形式称为"简写主体语法"。简写语法：

在函数主体周围没有花括号
自动返回表达式。
如果箭头函数的主体内需要多行代码，则可以使用"常规主体语法"。

const upperizedNames = ['Farrin', 'Kagure', 'Asser'].map( name => {
  name = name.toUpperCase();
  return `${name} has ${name.length} characters in their name`;
});
对于常规主体语法需要记住的重要事项：

它将函数主体放在花括号内
需要使用 return 语句来返回内容。

this 关键字的价值完全取决于它的函数（或方法）是如何被调用的。this 可以是以下任何内容：

- 如果函数使用 new 被调用,this 的值是新创建的对象
- 如果函数使用 call/apply 被调用，第一个参数明确设定 this 指代的是什么
- 如果函数是对象方法，this 的值将指代这个对象
- 如果函数被调用时没有上下文，this将是全局对象或严格模式下是 undefined

[You Don't Know JS: this & Object Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch2.md)

对于普通函数，this 的值基于函数如何被调用。对于箭头函数，this 的值基于函数周围的上下文。换句话说，箭头函数内的，this 的值与函数外面的 this 的值一样。
（undefined + 1 结果为 NaN

默认函数参数

```
function greet(name, greeting) {
  name = (typeof name !== 'undefined') ?  name : 'Student';
  greeting = (typeof greeting !== 'undefined') ?  greeting : 'Welcome';

  return `${greeting} ${name}!`;
}

greet(); // Welcome Student!
greet('James'); // Welcome James!
greet('Richard', 'Howdy'); // Howdy Richard!
```
greet() 函数中混乱的前两行的作用是什么？它们的作用是当所需的参数未提供时，为函数提供默认的值。但是看起来很难看……

幸运的是，ES6 引入了一个新的方式来创建默认值。它叫做默认函数参数。

```
function greet(name = 'Student', greeting = 'Welcome') {
  return `${greeting} ${name}!`;
}
```

默认值和解构数组

你可以将默认函数参数和解构结合到一起， 创建非常强大的函数！

```
function createGrid([width = 5, height = 5]) {
  return `Generates a ${width} x ${height} grid`;
}

createGrid([]); // Generates a 5 x 5 grid
createGrid([2]); // Generates a 2 x 5 grid
createGrid([2, 3]); // Generates a 2 x 3 grid
createGrid([undefined, 3]); // Generates a 5 x 3 grid
```

但是存在一个问题，下面的代码将不可行：
```
createGrid(); // Uncaught TypeError: Cannot read property 'Symbol(Symbol.iterator)' of undefined

```

出现错误，因为 createGrid() 预期传入的是数组，然后对其进行解构。因为函数被调用时没有传入数组，所以出现问题。但是，我们可以使用默认的函数参数！
```
function createGrid([width = 5, height = 5] = []) {
  return `Generating a grid of ${width} by ${height}`;
}
```

默认值和解构对象

就像使用数组默认值解构数组一样，函数可以让对象成为一个默认参数，并使用对象解构：

```
function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) {
  const scoopText = scoops === 1 ? 'scoop' : 'scoops';
  return `Your sundae has ${scoops} ${scoopText} with ${toppings.join(' and ')} toppings.`;
}

createSundae({}); // Your sundae has 1 scoop with Hot Fudge toppings.
createSundae({scoops: 2}); // Your sundae has 2 scoops with Hot Fudge toppings.
createSundae({scoops: 2, toppings: ['Sprinkles']}); // Your sundae has 2 scoops with Sprinkles toppings.
createSundae({toppings: ['Cookie Dough']}); // Your sundae has 1 scoop with Cookie Dough toppings.
```

默认函数参数只是个简单的添加内容，但是却带来很多便利！与数组默认值相比，对象默认值具备的一个优势是能够处理跳过的选项。看看下面的代码：

function createSundae({scoops = 1, toppings = ['Hot Fudge']} = {}) { … }
在 createSundae() 函数使用对象默认值进行解构时，如果你想使用 scoops 的默认值，但是更改 toppings，那么只需使用 toppings 传入一个对象：

createSundae({toppings: ['Hot Fudge', 'Sprinkles', 'Caramel']});
将上述示例与使用数组默认值进行解构的同一函数相对比。

function createSundae([scoops = 1, toppings = ['Hot Fudge']] = []) { … }
对于这个函数，如果想使用 scoops 的默认数量，但是更改 toppings，则必须以这种奇怪的方式调用你的函数：

createSundae([undefined, ['Hot Fudge', 'Sprinkles', 'Caramel']]);
因为数组是基于位置的，我们需要传入 undefined 以跳过第一个参数（并使用默认值）来到达第二个参数。

除非你有很充足的理由来使用数组默认值进行数组解构，否则建议使用对象默认值进行对象解构！

类

将函数转换为类
es6的类是es5构造函数的语法糖，实际是将构造函数里的属性定义在了construct中，在new的时候自动执行，原型上的方法定义在了类中。

```
class Plane{}
typeof Plane  // function
```

在类中，不用逗号来区分属性或方法。如果添加逗号，将出现 SyntaxError：unexpected token

静态方法，在方法前加static关键字

```
class Plane {
  constructor(numEngines) {
    this.numEngines = numEngines;
    this.enginesActive = false;
  }

  static badWeather(planes) {
    for (plane of planes) {
      plane.enginesActive = false;
    }
  }

  startEngines() {
    console.log('starting engines…');
    this.enginesActive = true;
  }
}

Plane.badWeather([plane1, plane2, plane3]);
```

类的优势
- 写法简单了
- 更加清晰
- 更加聚合

extends 用来继承类，

super不能单独访问，否则报错。它在构造函数里需要以函数调用，super()，继承构造函数。如果一个类有构造函数同时使用了extends，必须要调用super。在方法里，它当做对象调用，比如super.say()。super的作用：
1. super()是在实例化父类
2. super是那个实例

super必须在this之前被调用，否则报错

```
class Apple {}
class GrannySmith extends Apple {
  constructor(tartnessLevel, energy) {
    this.tartnessLevel = tartnessLevel; // `this` before `super` will throw an error!
    super(energy);
  }
}

```

使用类时需要注意的事项
- class 不是魔术: 关键字 class 带来了其它基于类的语言中的很多思想观念。它没有像变魔术一样向 JavaScript 类添加了此功能。
- class 是原型继承的抽象形式:我们已经多次提到，JavaScript 类实际上使用的就是原型继承。
- 使用类需要用到 new: 在创建 JavaScript 类的新实例时，必须使用关键字 new，否则报错Uncaught TypeError: Class constructor Toy cannot be invoked without 'new'




## Symbol
Symbol 是一种独特的且不可变的数据类型，经常用来标识对象属性。

要创建 Symbol，输入 Symbol()，并添加一个可选的字符串作为其描述。

```
const sym1 = Symbol('apple');
console.log(sym1);
```
它将创建唯一的标识符，并将其存储在 sym1 中。描述 "apple" 只是用来描述标识符的一种方式，但是不能用来访问标识符本身。

```
const sym2 = Symbol('banana');
const sym3 = Symbol('banana');
console.log(sym2 === sym3); // false
```

当然，依然很难弄明白，所以，我们来看一个之前视频中的示例，看看标识符的作用。下面是代表该示例中的 bowl（碗）的代码。

const bowl = {
  'apple': { color: 'red', weight: 136.078 },
  'banana': { color: 'yellow', weight: 183.15 },
  'orange': { color: 'orange', weight: 170.097 }
};
碗中包含水果，它们是 bowl 的属性对象。但是，当我们添加第二个香蕉时，遇到了问题。

const bowl = {
  'apple': { color: 'red', weight: 136.078 },
  'banana': { color: 'yellow', weight: 183.151 },
  'orange': { color: 'orange', weight: 170.097 },
  'banana': { color: 'yellow', weight: 176.845 }
};
console.log(bowl);
Object {apple: Object, banana: Object, orange: Object}

新添加的香蕉将上一个香蕉覆盖了。为了解决该问题，我们可以使用标识符。

const bowl = {
  [Symbol('apple')]: { color: 'red', weight: 136.078 },
  [Symbol('banana')]: { color: 'yellow', weight: 183.15 },
  [Symbol('orange')]: { color: 'orange', weight: 170.097 },
  [Symbol('banana')]: { color: 'yellow', weight: 176.845 }
};
console.log(bowl);
Object {Symbol(apple): Object, Symbol(banana): Object, Symbol(orange): Object, Symbol(banana): Object}

通过更改 bowl 的属性并使用标识符，每个属性都是唯一的标识符，第一个香蕉不会被第二个香蕉覆盖。

Symbol不能被for...in循环到。

用处不了解。


## 迭代器协议和可迭代协议

可迭代协议用来定义和自定义对象的迭代行为。也就是说在 ES6 中，你可以灵活地指定循环访问对象中的值的方式。对于某些对象，它们已经内置了这一行为。例如，字符串和数组就是内置可迭代类型的例子。
```
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
for (const digit of digits) {
  console.log(digit);
}
```

任何可迭代的对象都可以使用新的 for...of 循环。Set（集合）和 Map（映射），它们也是内置可迭代类型。

为了使对象可迭代，它必须实现可迭代接口。接口其实就是为了让对象可迭代，它必须包含默认的迭代器方法。该方法将定义对象如何被迭代。

迭代器方法（可通过常量 [Symbol.iterator] 获得）是一个无参数的函数，返回的是迭代器对象。迭代器对象是遵守迭代器协议的对象。

迭代器协议用来定义对象生成一系列值的标准方式。实际上就是现在有了定义对象如何迭代的流程。通过执行 .next() 方法来完成这一流程。

工作原理
当对象执行 .next() 方法时，就变成了迭代器。.next() 方法是无参数函数，返回具有两个属性的对象：

value：表示对象内值序列的下个值的数据
done：表示迭代器是否已循环访问完值序列的布尔值
如果 done 为 true，则迭代器已到达值序列的末尾处。
如果 done 为 false，则迭代器能够生成值序列中的另一个值。

```
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const arrayIterator = digits[Symbol.iterator]();

console.log(arrayIterator.next());
console.log(arrayIterator.next());
console.log(arrayIterator.next());
```



## Set和Map


### 数学意义上的集合（Set）

回忆下之前的数学知识，Set 就是唯一项的集合。例如，{2, 4, 5, 6} 是 Set，因为每个数字都是唯一的，只出现一次。但是，{1, 1, 2, 4} 不是 Set，因为它包含重复的项目（1 出现了两次！）。

在 JavaScript 中，我们已经可以使用数组表示类似于数学意义上的集合。但是，数组并不要求项目必须唯一。
在 ES6 中，有一个新的内置对象的行为和数学意义上的集合相同，使用起来类似于数组。这个新对象就叫做“Set”。Set 与数组之间的最大区别是：

- Set 不基于索引，不能根据集合中的条目在集合中的位置引用这些条目
- Set 中的条目不能单独被访问

基本上，Set 是让你可以存储唯一条目的对象。你可以向 Set 中添加条目，删除条目，并循环访问 Set。这些条目可以是原始值或对象。

```
const games = new Set();  // 此代码会创建空的 Set
```

如果你想根据值列表创建 Set，则使用数组：
```
const games = new Set(['Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart', 'Super Mario Bros.']);
// Set {'Super Mario Bros.', 'Banjo-Kazooie', 'Mario Kart'}
```

注意上述示例在创建 Set 时，会自动移除重复的条目 "Super Mario Bros."，很整洁！

操作Set
```
games.add('Banjo-Tooie');  // 返回Set对象
games.add('Age of Empires');
games.delete('Super Mario Bros.');  // true
games.clear()
```
创建 Set 后，你可能想要添加或删除条目。如何操作呢？可以使用名称对应的 .add() 和 .delete() 方法。另一方面，如果你想要删除 Set 中的所有条目，可以使用 .clear() 方法。如果你尝试向 Set 中 .add() 重复的条目，系统不会报错，但是该条目不会添加到 Set 中。此外，如果你尝试 .delete() Set 中不存在的条目，也不会报错，Set 保持不变。.add() 添加不管成功与否，都会返回该 Set 对象。另一方面，.delete() 则会返回一个布尔值，该值取决于是否成功删除（即如果该元素存在，返回true，否则返回false）。

使用 .size 属性可以返回 Set 中的条目数。注意，不能像数组那样通过索引访问 Set，因此要使用 .size 属性，而不是 .length 属性来获取 Set 的大小。

使用 .has() 方法可以检查 Set 中是否存在某个条目。如果 Set 中有该条目，则 .has() 将返回 true。如果 Set 中不存在该条目，则 .has() 将返回 false。

```
console.log(games.has('September'));
```

使用 .values() 方法可以返回 Set 中的值。.values() 方法的返回值是 SetIterator 对象。

.keys() 方法将和 .values() 方法的行为完全一样：将 Set 的值返回到新的迭代器对象中。.keys() 方法是 .values() 方法的别名，和 Map（映射）中的类似。

处理 Set 的最后一步是循环访问 Set。

如果还记得之前介绍的 ES6 中的新可迭代协议和迭代器协议，那么你会想起 Set 是内置可迭代类型。这意味着循环时的两件事：

你可以使用 Set 的默认迭代器循环访问 Set 中的每一项。
你可以使用新的 for...of 循环来循环访问 Set 中的每一项。
使用 SetIterator
因为 .values() 方法返回新的迭代器对象（称为 SetIterator），你可以将该迭代器对象存储在变量中，并使用 .next() 访问 Set 中的每一项。

const iterator = months.values();
iterator.next();
Object {value: 'January', done: false}

如果再次运行 .next() 呢？

iterator.next();
Object {value: 'February', done: false}

等等，一直运行到 done 等于 true 时，标志着 Set 的结束。

一种更简单的方法去循环访问 Set 中的项目是 for...of 循环。

const colors = new Set(['red', 'orange', 'yellow', 'green', 'blue', 'violet', 'brown', 'black']);
for (const color of colors) {
  console.log(color);
}

### WeakSet

WeakSet 和普通 Set 很像，但是具有以下关键区别：

WeakSet 只能包含对象
WeakSet 无法迭代，意味着不能循环访问其中的对象
WeakSet 没有 .clear() 方法

```
const student1 = { name: 'James', age: 26, gender: 'male' };
const student2 = { name: 'Julia', age: 27, gender: 'female' };
const student3 = { name: 'Richard', age: 31, gender: 'male' };

const roster = new WeakSet([student1, student2, student3]);
console.log(roster);

roster.add('Amanda');// 报错Uncaught TypeError: Invalid value used in weak set(…)
```

但是如果你尝试添加对象以外的内容，系统将报错！这是预期到的行为，因为 WeakSet 只能包含对象。但是为何只能包含对象？如果普通 Set 可以包含对象和其他类型的数据，为何还要使用 WeakSet？这个问题的答案与为何 WeakSet 没有 .clear() 方法有很大的关系……

在 JavaScript 中，创建新的值时会分配内存，并且当这些值不再需要时，将自动释放内存。这种内存不再需要后释放内存的过程称为垃圾回收。

WeakSet 通过专门使用对象作为键值来利用这一点。如果将对象设为 null，则本质上是删除该对象。当 JavaScript 的垃圾回收器运行时，该对象之前占用的内存将被释放，以便稍后在程序中使用。

```
student3 = null;
console.log(roster);
```
由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历

## Map
类似于对象

如果说 Set 类似于数组，那么 Map 就类似于对象，因为 Map 存储键值对，和对象包含命名属性及值相类似。要创建 Map，只需输入：

```
const employees = new Map();
console.log(employees);  // Map {}
```

和 Set 不同，你无法使用值列表创建 Map；而是使用 Map 的 .set() 方法添加键值。

```
const employees = new Map();

employees.set('james.parkes@udacity.com', {
    firstName: 'James',
    lastName: 'Parkes',
    role: 'Content Developer'
});
employees.set('julia@udacity.com', {
    firstName: 'Julia',
    lastName: 'Van Cleve',
    role: 'Content Developer'
});
employees.set('richard@udacity.com', {
    firstName: 'Richard',
    lastName: 'Kalehoff',
    role: 'Content Developer'
});
```

.set() 方法有两个参数。第一个参数是键，用来引用第二个参数，即值。

要移除键值对，只需使用 .delete() 方法。

构建 Map 后，可以使用 .has() 方法并向其传入一个键来检查 Map 中是否存在该键值对。还可以通过向 .get() 方法传入一个键，检索 Map 中的值。
```
console.log(members.get('Evelyn'));
```
你已经创建了 Map，添加了一些键值对，现在你想循环访问该 Map。幸运的是，可以通过以下三种方式循环访问：

- 使用 Map 的默认迭代器循环访问每个键或值
- 使用新的 for...of 循环来循环访问每个键值对
- 使用 Map 的 .forEach() 方法循环访问每个键值对

在 Map 上使用 .keys() 和 .values() 方法将返回新的迭代器对象，叫做 MapIterator。你可以将该迭代器对象存储在新的变量中，并使用 .next() 循环访问每个键或值。你所使用的方法将决定迭代器是否能够访问 Map 的键或值。

let iteratorObjForKeys = members.keys();
iteratorObjForKeys.next();
Object {value: 'Evelyn', done: false}

使用 .next() 获得下个键值对。

iteratorObjForKeys.next();
Object {value: 'Liam', done: false}

等等。

Map 的第二种循环访问方式是使用 for...of 循环。

```
for (const member of members) {
  console.log(member);  // member是一个键值对数组 ['Marcus', 10.25]
}
```
但是，在对 Map 使用 for...of 循环时，并不会得到一个键值或一个值。键值对会拆分为一个数组，第一个元素是键，第二个元素是值。有没有什么方法可以解决这一问题？

最后一种循环访问 Map 的方式是使用 .forEach() 方法。

```
members.forEach((value, key) => console.log(value, key));
```

WeakMap 和普通 Map 很像，但是具有以下关键区别：

- WeakMap 只能包含对象作为键，
- WeakMap 无法迭代，意味着无法循环访问，并且
- WeakMap 没有 .clear() 方法。

WeakMap 通过专门处理对象作为键来利用这一点。如果将对象设为 null，则本质上是删除该对象。当 JavaScript 的垃圾回收器运行时，该对象之前占用的内存将被释放，以便稍后在程序中使用。

book1 = null;
console.log(library);

## Proxy

它接受2个参数
- 代理对象
- 处理器，如果处理器为空对象，则请求是直接传递给源对象

```
var richard = {status: 'looking for work'};
var agent = new Proxy(richard, {});

agent.status; // returns 'looking for work'
```

上述代码并没有对 Proxy 执行任何特殊操作，只是将请求直接传递给源对象！如果我们希望 Proxy 对象截获请求，这就是 handler 对象的作用了！

让 Proxy 变得有用的关键是当做第二个对象传递给 Proxy 构造函数的 handler 对象。handler 对象由将用于访问属性的方法构成。我们看看 get：

get 用来截获对属性的调用

```
const richard = {status: 'looking for work'};
const handler = {
    get(target, propName) {
        console.log(target); // the `richard` object, not `handler` and not `agent`
        console.log(propName); // the name of the property the proxy (`agent` in this case) is checking
    }
};
const agent = new Proxy(richard, handler);
agent.status; // logs out the richard object (not the agent object!) and the name of the property being accessed (`status`)
```

在上述代码中，handler 对象具有一个 get 方法（因为被用在 Proxy 中，所以将"function"（方法）称之为"trap"（捕获器））。当代码 agent.status; 在最后一行运行时，因为存在 get 捕获器，它将截获该调用以获得 status（状态）属性并运行 get 捕获器方法。这样将会输出 Proxy 的目标对象（richard 对象），然后输出被请求的属性（status 属性）的名称。它的作用就是这些！它不会实际地输出属性！这很重要 —— 如果使用了捕获器，你需要确保为该捕获器提供所有的功能。

- get trap - 使 proxy 能处理对属性访问权的调用
- set trap - 使 proxy 能将属性设为新值
- apply trap - 使 proxy 能被调用（被代理的对象是函数）
- has trap - 使 proxy 能使用 in 运算符
- deleteProperty trap - 使 proxy 能确定属性是否被删除
- ownKeys trap - 使 proxy 能处理当所有键被请求时的情况
- construct trap - 使 proxy 能处理 proxy 与 new 关键字一起使用当做构造函数的情形
- defineProperty trap - 使 proxy 能处理当 defineProperty 被用于创建新的对象属性的情形
- getOwnPropertyDescriptor trap - 使 proxy 能获得属性的描述符
- preventExtenions trap - 使 proxy 能对 proxy 对象调用 Object.preventExtensions()
- isExtensible trap - 使 proxy 能对 proxy 对象调用 Object.isExtensible
- getPrototypeOf trap - 使 proxy 能对 proxy 对象调用 Object.getPrototypeOf
- setPrototypeOf trap - 使 proxy 能对 proxy 对象调用 Object.setPrototypeOf

一开始，可能不太清楚的是，ES5 中已经提供了 getter 和 setter 方法，为何还要 Proxy。对于 ES5 的 getter 和 setter 方法，你需要提前知道要获取/设置的属性：

```
var obj = {
    _age: 5,
    _height: 4,
    get age() {
        console.log(`getting the "age" property`);
        console.log(this._age);
    },
    get height() {
        console.log(`getting the "height" property`);
        console.log(this._height);
    }
};
```

对于 ES6 中的 Proxy，我们不需要提前知道这些属性。

