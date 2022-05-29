class Shape {
  draw() {
    console.log('draw shape');
  }
}

class Circle extends Shape {
  draw() {
    console.log('draw circle');
  }
}

class ColorfulShape extends Shape {
  constructor(shape) {
    super()
    this.shape = shape
  }
  draw() {
    this.shape.draw()
    console.log('draw red');
  }
}

const cs = new ColorfulShape(new Circle())
cs.draw()
