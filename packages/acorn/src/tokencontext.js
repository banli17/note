import { Parser } from "./state.js";
import { types as tt } from "./tokentype.js";

export class TokContext {
  constructor(token, isExpr, preserveSpace, override, generator) {
    this.token = token;
    this.isExpr = !!isExpr;
    this.preserveSpace = !!preserveSpace;
    this.override = override;
    this.generator = !!generator;
  }
}

export const types = {
  b_stat: new TokContext("{", false),
};

const pp = Parser.prototype;

pp.initialContext = function () {
  return [types.b_stat];
};

pp.curContext = function () {
  return this.context[this.context.length - 1];
};
