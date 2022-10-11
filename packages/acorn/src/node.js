import { Parser } from "./state.js";

export class Node {
  constructor(parser, pos, loc) {
    this.type = "";
    this.start = pos;
    this.end = 0;

    // if (parser.options.locations) {
    //   this.loc = new SourceLocation(parser, loc);
    // }

    if (parser.options.range) {
      this.range = [this.start, 0];
    }
  }
}

const pp = Parser.prototype;

pp.startNode = function () {
  return new Node(this, this.start, this.startLoc);
};
