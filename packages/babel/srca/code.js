const codes = {};

codes.classA = `

class A extends superA {
  constructor() {
    super();
    console.log("constructor");
  }

  onStart() {
    console.log("onStart");
  }
}
`;

export { codes };
