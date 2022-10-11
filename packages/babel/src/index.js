class A {
  constructor() {
    console.log("constructor");
  }

  minus() {
    console.log("A minus", A);
  }
}

// 这里实际上 export { A: A }
export { A };
