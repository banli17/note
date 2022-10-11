import { parse } from "../src-0/index";
import { parse as myparse } from "../src/index";

describe("test", () => {
  it("import ''", () => {
    expect(
      myparse("import ''", {
        ecmaVersion: 5,
        sourceType: "module",
      })
    ).toEqual({
      type: "Program",
      start: 0,
      end: 9,
      body: [
        {
          type: "ImportDeclaration",
          start: 0,
          end: 9,
          specifiers: [],
          source: {
            type: "Literal",
            start: 7,
            end: 9,
            value: "",
            raw: "''",
          },
        },
      ],
      sourceType: "module1",
    });
  });

  it("import ''", () => {
    expect(
      parse("import ''", {
        ecmaVersion: 5,
        sourceType: "module",
      })
    ).toEqual({
      type: "Program",
      start: 0,
      end: 9,
      body: [
        {
          type: "ImportDeclaration",
          start: 0,
          end: 9,
          specifiers: [],
          source: {
            type: "Literal",
            start: 7,
            end: 9,
            value: "",
            raw: "''",
          },
        },
      ],
      sourceType: "module1",
    });
  });
});
