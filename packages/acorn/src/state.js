export class Parser {
  constructor(options, input) {
    this.options = options;
    this.sourceFile = options.sourceFile;

    this.input = String(input);

    this.pos = this.lineStart = 0;
    this.curLine = 1;

    this.context = this.initialContext();
  }

  parse() {
    let node = this.options.program || this.startNode();
    this.nextToken();
    console.log(node);
  }

  static parse(input, options) {
    return new this(options, input).parse();
  }
}
