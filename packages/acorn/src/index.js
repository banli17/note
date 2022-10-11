import { Parser } from "./state";
import { Node } from "./node";
import "./tokencontext";
import "./tokenize";
import "./tokentype";

export function parse(input, options) {
  return Parser.parse(input, options);
}
