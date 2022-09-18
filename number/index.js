import MiniDecimal, {
  roundUpUnsignedDecimal,
  toFixed,
} from "./utils/MiniDecimal.js";

let a = new MiniDecimal("0.25");
let b = new MiniDecimal(".35664");

console.log(a);
console.log(a.add(b));

// Number.MAX_SAFE_INTEGER
// 9007199254740991

// console.log("roundUpUnsignedDecimal", roundUpUnsignedDecimal("1.4", 0)); // 2
// console.log("roundUpUnsignedDecimal", roundUpUnsignedDecimal("1.000000000000000000000001", 0));  // 2

console.log("-------------toFixed--------");
console.log(toFixed("1.5", ".", 0));
console.log(toFixed("1.3", ".", 2));


console.log(toFixed("1.0", ".")); // 1
console.log(toFixed("1.3", ".")); // 1.3
