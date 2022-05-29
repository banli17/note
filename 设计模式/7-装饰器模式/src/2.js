function flyable(target) {
  target.prototype.fly = function () {
    console.log('i can fly');
  }
}

function walk(speed) {
  return function (target) {
    target.prototype.walk = function () {
      console.log(`i can walk with speed: ${speed}`);
    }
  }
}

@flyable
@walk(2)
class Animal {
  constructor() {

  }
}

let a1 = new Animal()

a1.fly()
a1.walk()
