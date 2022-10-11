import babel from "@babel/core";
import traverse from "@babel/traverse";
import { smart } from "@babel/template";
import * as t from "@babel/types";

let A = 0;
/**
 * 给 class 添加方法
 */
export default function () {
  return {
    name: "c1",
    transform(source) {
      const ast = babel.parseSync(source);

      traverse(ast, {
        enter(path) {
          // console.log("path", path.g);
        },
        Program(path) {
          path.scope.rename('A', '_A')
        },

        // ReferencedIdentifier(path, state) {
        //   const { node } = path;
        //   if (
        //     t.isExportSpecifier(path.parent) &&
        //     path.parentPath.parent.source !== null
        //   ) {
        //     node.name = 'C';
        //     return;
        //   }

        //   if (node.name === 'A') {
        //     node.name = 'C';
        //   }
        // },
        Identifier(path) {
          if (
            path.node.name === "A" &&
            !A &&
            path?.scope?.bindings?.A?.referencePaths
          ) {
            // path.scope.bindings.C = path?.scope?.bindings?.A
            // delete path?.scope?.bindings?.A
            // path.node.name = 'C'
            // path.scope.bindings.A.referencePaths[0].node.name = 'C'
            // console.log(path.scope.bindings.A.referencePaths[1])
            // path.scope.bindings.A.referencePaths[1].node.name = 'C'
            // path.scope.bindings.A.referencePaths[1].node.loc.identifierName= 'C'
            // path.scope.bindings.A.referencePaths.forEach((p) => {
            //   console.log(p)
            //   p.node.name = "C";
            //   // p.replaceWith(t.identifier("C"))
            // });
            // console.log(path.scope.bindings.A);
            // if (!A) {
            //   A = path;
            //   path.replaceWith(t.identifier("C"));
            // } else if (path.scope.bindings.A === A) {
            //   console.log('bbb', )
            //   // path.replaceWith(t.identifier("C"));
            //   path.node.name = 'C'
            //   path.node.loc.identifierName = 'C'
            // }else {
            // }
          }
        },
        ClassDeclaration(path, state) {
          const addMethod = t.classMethod(
            "method",
            t.identifier("addMethod"),
            [],
            t.blockStatement(smart.ast(`var a = 1; var b = 2;return a+b;`))
            // computed,
            // static,
            // generator,
            // async
          );

          const body = path.get("body"); // classBody
          // body 数组
          body.unshiftContainer("body", addMethod);
        },
      });
      const { code } = babel.transformFromAstSync(ast);

      return code;
    },
  };
}
