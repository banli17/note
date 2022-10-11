import { Parser } from "./state.js";

export class Token {
  constructor() {}
}

const pp = Parser.prototype;

pp.nextToken = function () {
  let curContext = this.curContext();
  console.log("curContext", curContext);

  this.start = this.pos;

  console.log("this.fullCharCodeAtPos()", this.fullCharCodeAtPos());
  this.readToken(this.fullCharCodeAtPos());
};

pp.readToken = function (code) {
  // Identifier or keyword. '\uXXXX' sequences are allowed in
  // identifiers, so '\' also dispatches to that.
  if (
    isIdentifierStart(code, this.options.ecmaVersion >= 6) ||
    code === 92 /* '\' */
  )
    return this.readWord();

  return this.getTokenFromCode(code);
};

pp.fullCharCodeAtPos = function () {
  let code = this.input.charCodeAt(this.pos);
  if (code <= 0xd7ff || code >= 0xdc00) return code;
  let next = this.input.charCodeAt(this.pos + 1);
  return next <= 0xdbff || next >= 0xe000
    ? code
    : (code << 10) + next - 0x35fdc00;
};
