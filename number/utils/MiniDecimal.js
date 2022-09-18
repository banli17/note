/* eslint-disable max-classes-per-file */

import {
  getNumberPrecision,
  isE,
  num2str,
  trimNumber,
  validateNumber,
} from "./numberUtil.js";
import { supportBigInt } from "./supportUtil.js";

/**
 * We can remove this when IE not support anymore
 */
export class NumberDecimal {
  constructor(value) {
    if ((!value && value !== 0) || !String(value).trim()) {
      this.empty = true;
      return;
    }

    this.origin = String(value);
    this.number = Number(value);
  }

  negate() {
    return new NumberDecimal(-this.toNumber());
  }

  add(value) {
    if (this.isInvalidate()) {
      return new NumberDecimal(value);
    }

    const target = Number(value);

    if (Number.isNaN(target)) {
      return this;
    }

    const number = this.number + target;

    // [Legacy] Back to safe integer
    if (number > Number.MAX_SAFE_INTEGER) {
      return new NumberDecimal(Number.MAX_SAFE_INTEGER);
    }

    if (number < Number.MIN_SAFE_INTEGER) {
      return new NumberDecimal(Number.MIN_SAFE_INTEGER);
    }

    const maxPrecision = Math.max(
      getNumberPrecision(this.number),
      getNumberPrecision(target)
    );
    return new NumberDecimal(number.toFixed(maxPrecision));
  }

  isEmpty() {
    return this.empty;
  }

  isNaN() {
    return Number.isNaN(this.number);
  }

  isInvalidate() {
    return this.isEmpty() || this.isNaN();
  }

  equals(target) {
    return target.toNumber && this.toNumber() === target.toNumber();
  }

  lessEquals(target) {
    return this.add(target.negate().toString()).toNumber() <= 0;
  }

  toNumber() {
    return this.number;
  }

  toString(safe = true) {
    if (!safe) {
      return this.origin;
    }

    if (this.isInvalidate()) {
      return "";
    }

    return num2str(this.number);
  }
}

export class BigIntDecimal {
  constructor(value) {
    // ?? || ''
    if ((!value && value !== 0) || !String(value).trim()) {
      this.empty = true;
      return;
    }

    this.origin = String(value);

    // Act like Number convert
    if (value === "-") {
      this.nan = true;
      return;
    }

    let mergedValue = value;

    // We need convert back to Number since it require `toFixed` to handle this
    if (isE(mergedValue)) {
      mergedValue = Number(mergedValue);
    }

    mergedValue =
      typeof mergedValue === "string" ? mergedValue : num2str(mergedValue);

    if (validateNumber(mergedValue)) {
      const trimRet = trimNumber(mergedValue);
      this.negative = trimRet.negative;
      const numbers = trimRet.trimStr.split(".");
      this.integer = BigInt(numbers[0]);
      const decimalStr = numbers[1] || "0";
      this.decimal = BigInt(decimalStr);
      this.decimalLen = decimalStr.length;
    } else {
      this.nan = true;
    }
  }

  getMark() {
    return this.negative ? "-" : "";
  }

  getIntegerStr() {
    return this.integer.toString();
  }

  getDecimalStr() {
    return this.decimal.toString().padStart(this.decimalLen, "0");
  }

  /**
   * Align BigIntDecimal with same decimal length. e.g. 12.3 + 5 = 1230000
   * This is used for add function only.
   */
  alignDecimal(decimalLength) {
    const str = `${this.getMark()}${this.getIntegerStr()}${this.getDecimalStr().padEnd(
      decimalLength,
      "0"
    )}`;
    console.log("alignDecimal", str, this.getDecimalStr());
    // alignDecimal 025000 25
    // alignDecimal 035664 35664
    return BigInt(str);
  }

  negate() {
    const clone = new BigIntDecimal(this.toString());
    clone.negative = !clone.negative;
    return clone;
  }

  add(value) {
    // 自身无效，返回 value
    if (this.isInvalidate()) {
      return new BigIntDecimal(value);
    }

    // value无效，直接返回 this
    const offset = new BigIntDecimal(value);
    if (offset.isInvalidate()) {
      return this;
    }

    // 1. 取两个数的小数位 大的
    const maxDecimalLength = Math.max(
      this.getDecimalStr().length,
      offset.getDecimalStr().length
    );

    // 2. 对齐
    const myAlignedDecimal = this.alignDecimal(maxDecimalLength); // BigInt
    const offsetAlignedDecimal = offset.alignDecimal(maxDecimalLength);

    // 3. 相加
    // (1n + 2n).toString() -> '3'
    const valueStr = (myAlignedDecimal + offsetAlignedDecimal).toString();
    console.log("valueStr", valueStr);
    // valueStr 60664

    // 4. 不懂
    // We need fill string length back to `maxDecimalLength` to avoid parser failed
    const { negativeStr, trimStr } = trimNumber(valueStr);
    const hydrateValueStr = `${negativeStr}${trimStr.padStart(
      maxDecimalLength + 1,
      "0"
    )}`;
    console.log("hydrateValueStr", hydrateValueStr); // hydrateValueStr 060664

    // 5. 截取整数小数，重新创建
    console.log("maxDecimalLength", maxDecimalLength); // 5
    // 0 .  60664
    // '060664'.slice(0, -5) -> 0
    let ret = new BigIntDecimal(
      `${hydrateValueStr.slice(0, -maxDecimalLength)}.${hydrateValueStr.slice(
        -maxDecimalLength
      )}`
    );
    // console.log(ret); 0 .  60664
    return ret;
  }

  isEmpty() {
    return this.empty;
  }

  isNaN() {
    return this.nan;
  }

  isInvalidate() {
    return this.isEmpty() || this.isNaN();
  }

  equals(target) {
    return this.toString() === (target && target.toString());
  }

  lessEquals(target) {
    return this.add(target.negate().toString()).toNumber() <= 0;
  }

  toNumber() {
    if (this.isNaN()) {
      return NaN;
    }
    return Number(this.toString());
  }

  toString(safe = true) {
    if (!safe) {
      return this.origin;
    }

    if (this.isInvalidate()) {
      return "";
    }

    return trimNumber(
      `${this.getMark()}${this.getIntegerStr()}.${this.getDecimalStr()}`
    ).fullStr;
  }
}

export default function getMiniDecimal(value) {
  // We use BigInt here.
  // Will fallback to Number if not support.
  if (supportBigInt()) {
    return new BigIntDecimal(value);
  }
  return new NumberDecimal(value);
}

/**
 * round up an unsigned number str, like: 1.4 -> 2, 1.5 -> 2
 */
export function roundUpUnsignedDecimal(numStr, precision) {
  const { integerStr, decimalStr } = trimNumber(numStr);
  const advancedDecimal = getMiniDecimal(integerStr + "." + decimalStr).add(
    `0.${"0".repeat(precision)}${5}`
  );
  return toFixed(advancedDecimal.toString(), ".", precision);
}

/**
 * round up an unsigned number str, like: 1.4 -> 1, 1.5 -> 1
 */
export function roundDownUnsignedDecimal(numStr, precision) {
  const { negativeStr, integerStr, decimalStr } = trimNumber(numStr);
  const numberWithoutDecimal = `${negativeStr}${integerStr}`;
  if (precision === 0) {
    return integerStr;
  }
  return `${numberWithoutDecimal}.${decimalStr
    .padEnd(precision, "0")
    .slice(0, precision)}`;
}

// 1.2.toFixed(22)  -> '1.1999999999999999555911'
// 1.6.toFixed(0) '2'
// 1.3.toFixed(0) '1'
/**
 * 保留多少位小数
 * Align the logic of toFixed to around like 1.5 => 2
 */
export function toFixed(numStr, separatorStr, precision) {
  if (numStr === "") {
    return "";
  }
  const { negativeStr, integerStr, decimalStr } = trimNumber(numStr);
  const precisionDecimalStr = `${separatorStr}${decimalStr}`;

  const numberWithoutDecimal = `${negativeStr}${integerStr}`;

  if (precision >= 0) {
    // We will get last + 1 number to check if need advanced number
    const advancedNum = Number(decimalStr[precision]);

    if (advancedNum >= 5) {
      // toFixed(1.5, '.', 0) 变成 1.5 + 0.5 -> 2
      const advancedDecimal = getMiniDecimal(numStr).add(
        `${negativeStr}0.${"0".repeat(precision)}${10 - advancedNum}`
      );
      console.log("advancedDecimal", advancedDecimal);
      return toFixed(advancedDecimal.toString(), separatorStr, precision);
    }

    if (precision === 0) {
      return numberWithoutDecimal; // toFixed(1.3, '.', 0) -> 1
    }

    // toFixed(1.3, '.', 2)  -> 1.30
    let ret = `${numberWithoutDecimal}${separatorStr}${decimalStr
      .padEnd(precision, "0")
      .slice(0, precision)}`;
    return ret;
  }

  // 没有小数
  // toFixed("1.0", ".") -> 1
  if (precisionDecimalStr === ".0") {
    return numberWithoutDecimal;
  }

  // toFixed("1.3", ".") -> 1.3
  return `${numberWithoutDecimal}${precisionDecimalStr}`;
}
