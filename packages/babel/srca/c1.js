import * as babel from "@babel/core";
import traverse from "@babel/traverse";
import { smart } from "@babel/template";
import * as types from "@babel/types";
import { codes } from "./code.js";
// const ast = t.program([t.arrayExpression([t.stringLiteral("xxx")])]);

// let result = babel.transformFromAstSync(ast)

/**
 * 给 class A 增加一个方法
 */

const ast = babel.parseSync(codes.classA);
console.log(typeof traverse);

traverse.default(ast, {
  ClassDeclaration(path) {
    // declare function classMethod(kind: "get" | "set" | "method" | "constructor" | undefined, key: Identifier | StringLiteral | NumericLiteral | BigIntLiteral | Expression, params: Array<Identifier | Pattern | RestElement | TSParameterProperty>, body: BlockStatement, computed?: boolean, _static?: boolean, generator?: boolean, async?: boolean): ClassMethod;

    console.log(types.classMethod("method", types.identifier("myMethod", [], [], false, false)))
    // path.node.body.body.push(
    //   types.classMethod("method", types.identifier("myMethod", [], [], false, false))
    // );
    // const body = path.get("body");
    // path.pushContainer("body", smart.ast(`/** aaaa **/`));
  },
});

const { code } = babel.transformFromAstSync(ast);

console.log("code", code);
