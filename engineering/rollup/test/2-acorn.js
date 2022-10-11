// astexplorer可以把代码转成语法树
// acorn 解析结果符合The Estree Spec规范

import { Parser } from "acorn";

const sourceCode = 'import $ from "jquery"';

const ast = Parser.parse(sourceCode, {
  sourceType: "module",
  ecmaVersion: 8,
});

let indent = 0;
const padding = () => " ".repeat(indent);
ast.body.forEach((statement) => {
  walk(statement, {
    enter(node) {
      if (node.type) {
        console.log(padding() + node.type + "进入");
        indent += 2;
      }
    },
    leave(node) {
      if (node.type) {
        indent -= 2;
        console.log(padding() + node.type + "离开");
      }
    },
  });
});

function walk(astNode, { enter, leave }) {
  visit(astNode, null, enter, leave);
}

function visit(node, parent, enter, leave) {
  if (enter) {
    enter.call(null, node, parent);
  }
  let keys = Object.keys(node).filter((k) => typeof node[k] === "object");
  keys.forEach((key) => {
    const value = node[key];
    if (Array.isArray(value)) {
      value.forEach((n) => {
        visit(n, node, enter, leave);
      });
    } else if (value && value.type) {
      visit(node[key], node, enter, leave);
    }
  });
  if (leave) {
    leave.call(null, node, parent);
  }
}

/**
{
  "type": "Program",
  "start": 0,
  "end": 22,
  "body": [
    {
      "type": "ImportDeclaration",
      "start": 0,
      "end": 22,
      "specifiers": [
        {
          "type": "ImportDefaultSpecifier",
          "start": 7,
          "end": 8,
          "local": {
            "type": "Identifier",
            "start": 7,
            "end": 8,
            "name": "$"
          }
        }
      ],
      "source": {
        "type": "Literal",
        "start": 14,
        "end": 22,
        "value": "jquery",
        "raw": "\"jquery\""
      }
    }
  ],
  "sourceType": "module"
}
 */
