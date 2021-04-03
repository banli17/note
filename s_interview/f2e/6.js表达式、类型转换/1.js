function foo() {
    console.log(arguments);
}
var name = "world";
foo`hello ${name}`;