import vm from "virtual-module";
// import math from "./math";
// import eslib from "esm-lib";
import("esm-lib").then((res) => {
  console.log("ggg121aa");
});

class Index {}

console.log("vm", vm);

console.log("22222233");

export const a = "aa";
export const b = "b";

import("./math").then((res) => {
  console.log(res?.default);
});

export default Index;
