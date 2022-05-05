import nearley from "nearley";
// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley

function id(x) {
  return x[0];
}
const grammar = {
  Lexer: undefined,
  ParserRules: [
    { name: "main", symbols: ["axiom", "_"], postprocess: id },
    { name: "main", symbols: ["some_prod", "_"], postprocess: id },
    {
      name: "some_prod",
      symbols: ["prod", "_", { literal: "\n" }, "_", "some_prod"],
      postprocess: ([head, _1, _2, _3, tail]) => [head].concat(tail),
    },
    { name: "some_prod", symbols: ["prod"] },
    {
      name: "prod$string$1",
      symbols: [{ literal: "-" }, { literal: ">" }],
      postprocess: function joiner(d) {
        return d.join("");
      },
    },
    {
      name: "prod",
      symbols: ["expression", "_", "prod$string$1", "_", "some_exp"],
      postprocess: ([lhs, _1, _2, _3, rhs]) => ({
        lhs,
        rhs,
        production: true,
      }),
    },
    {
      name: "axiom",
      symbols: ["some_exp"],
      postprocess: ([val]) => ({ val, axiom: true }),
    },
    {
      name: "some_exp",
      symbols: ["expression", "__", "some_exp"],
      postprocess: ([head, _, tail]) => [head].concat(tail),
    },
    { name: "some_exp", symbols: ["expression"] },
    { name: "expression", symbols: ["command"], postprocess: id },
    { name: "expression", symbols: ["variable"], postprocess: id },
    {
      name: "variable",
      symbols: ["variableSymbol", "parameters"],
      postprocess: ([sym, params]) => ({ sym, params }),
    },
    {
      name: "command",
      symbols: ["commandSymbol", "parameters"],
      postprocess: ([sym, params]) => ({
        sym: sym[0],
        params,
        command: true,
      }),
    },
    { name: "variableSymbol", symbols: ["upper"], postprocess: id },
    {
      name: "commandSymbol$string$1",
      symbols: [{ literal: "+" }, { literal: "x" }],
      postprocess: function joiner(d) {
        return d.join("");
      },
    },
    { name: "commandSymbol", symbols: ["commandSymbol$string$1"] },
    {
      name: "commandSymbol$string$2",
      symbols: [{ literal: "-" }, { literal: "x" }],
      postprocess: function joiner(d) {
        return d.join("");
      },
    },
    { name: "commandSymbol", symbols: ["commandSymbol$string$2"] },
    {
      name: "commandSymbol$string$3",
      symbols: [{ literal: "+" }, { literal: "y" }],
      postprocess: function joiner(d) {
        return d.join("");
      },
    },
    { name: "commandSymbol", symbols: ["commandSymbol$string$3"] },
    {
      name: "commandSymbol$string$4",
      symbols: [{ literal: "-" }, { literal: "y" }],
      postprocess: function joiner(d) {
        return d.join("");
      },
    },
    { name: "commandSymbol", symbols: ["commandSymbol$string$4"] },
    {
      name: "commandSymbol$string$5",
      symbols: [{ literal: "+" }, { literal: "z" }],
      postprocess: function joiner(d) {
        return d.join("");
      },
    },
    { name: "commandSymbol", symbols: ["commandSymbol$string$5"] },
    {
      name: "commandSymbol$string$6",
      symbols: [{ literal: "-" }, { literal: "z" }],
      postprocess: function joiner(d) {
        return d.join("");
      },
    },
    { name: "commandSymbol", symbols: ["commandSymbol$string$6"] },
    {
      name: "commandSymbol$string$7",
      symbols: [
        { literal: "s" },
        { literal: "p" },
        { literal: "h" },
        { literal: "e" },
        { literal: "r" },
        { literal: "e" },
      ],
      postprocess: function joiner(d) {
        return d.join("");
      },
    },
    { name: "commandSymbol", symbols: ["commandSymbol$string$7"] },
    {
      name: "commandSymbol$string$8",
      symbols: [{ literal: "b" }, { literal: "o" }, { literal: "x" }],
      postprocess: function joiner(d) {
        return d.join("");
      },
    },
    { name: "commandSymbol", symbols: ["commandSymbol$string$8"] },
    {
      name: "commandSymbol$string$9",
      symbols: [
        { literal: "c" },
        { literal: "u" },
        { literal: "b" },
        { literal: "e" },
      ],
      postprocess: function joiner(d) {
        return d.join("");
      },
    },
    { name: "commandSymbol", symbols: ["commandSymbol$string$9"] },
    {
      name: "commandSymbol$string$10",
      symbols: [
        { literal: "c" },
        { literal: "o" },
        { literal: "n" },
        { literal: "e" },
      ],
      postprocess: function joiner(d) {
        return d.join("");
      },
    },
    { name: "commandSymbol", symbols: ["commandSymbol$string$10"] },
    { name: "commandSymbol", symbols: [{ literal: "[" }] },
    { name: "commandSymbol", symbols: [{ literal: "]" }] },
    { name: "commandSymbol", symbols: [{ literal: "s" }] },
    { name: "commandSymbol", symbols: [{ literal: "e" }] },
    { name: "commandSymbol", symbols: [{ literal: "f" }] },
    { name: "commandSymbol", symbols: [{ literal: "r" }] },
    { name: "commandSymbol", symbols: [{ literal: "t" }] },
    { name: "commandSymbol", symbols: [{ literal: "m" }] },
    {
      name: "parameters",
      symbols: [{ literal: "{" }, "some_params", { literal: "}" }],
      postprocess: (array) => array[1],
    },
    { name: "parameters", symbols: [] },
    {
      name: "some_params",
      symbols: ["param", { literal: "," }, "some_params"],
      postprocess: ([head, _, tail]) => [head].concat(tail),
    },
    { name: "some_params", symbols: ["param"] },
    { name: "param$ebnf$1", symbols: [/[a-zA-Z0-9 +\-*\/!^&|~><()]/] },
    {
      name: "param$ebnf$1",
      symbols: ["param$ebnf$1", /[a-zA-Z0-9 +\-*\/!^&|~><()]/],
      postprocess: function arrpush(d) {
        return d[0].concat([d[1]]);
      },
    },
    {
      name: "param",
      symbols: ["param$ebnf$1"],
      postprocess: (array) => array[0].join(""),
    },
    { name: "upper$ebnf$1", symbols: [/[A-Z]/] },
    {
      name: "upper$ebnf$1",
      symbols: ["upper$ebnf$1", /[A-Z]/],
      postprocess: function arrpush(d) {
        return d[0].concat([d[1]]);
      },
    },
    {
      name: "upper",
      symbols: ["upper$ebnf$1"],
      postprocess: (array) => array[0].join(""),
    },
    { name: "_$ebnf$1", symbols: [] },
    {
      name: "_$ebnf$1",
      symbols: ["_$ebnf$1", "wschar"],
      postprocess: function arrpush(d) {
        return d[0].concat([d[1]]);
      },
    },
    {
      name: "_",
      symbols: ["_$ebnf$1"],
      postprocess: function (d) {
        return null;
      },
    },
    { name: "__$ebnf$1", symbols: ["wschar"] },
    {
      name: "__$ebnf$1",
      symbols: ["__$ebnf$1", "wschar"],
      postprocess: function arrpush(d) {
        return d[0].concat([d[1]]);
      },
    },
    {
      name: "__",
      symbols: ["__$ebnf$1"],
      postprocess: function (d) {
        return null;
      },
    },
    { name: "wschar", symbols: [/[ \t\n\v\f]/], postprocess: id },
  ],
  ParserStart: "main",
};

function buildSyntaxError(error) {
  error.name = "SyntaxError";
  return error;
}

export function parse(expression) {
  try {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    parser.feed(expression);
    const results = parser.results;
    if (results.length === 0) {
      throw new SyntaxError("Unexpected end of input.");
    }
    return results[0];
  } catch (parseError) {
    throw buildSyntaxError(parseError);
  }
}

export function iterate(axiom, production, iterations) {
  let parsedAxiom = {};
  let parsedProd = [];

  try {
    parsedAxiom = parse(axiom);
    if (parsedAxiom.production) {
      throw new Error("Enter an axiom not a production.");
    }
  } catch (error) {
    throw new Error("Error parsing axiom.", { cause: error });
  }

  try {
    parsedProd = parse(production);
    if (parsedProd.axiom) {
      throw new Error("Enter a production not an axiom.");
    }
  } catch (error) {
    throw new Error("Error parsing production.", { cause: error });
  }

  const replacements = parsedProd;

  let repIdx = {};
  for (const [index, p] of replacements.entries()) {
    const sym = p.lhs.sym;
    if (repIdx[sym] === Array) {
      repIdx[sym].push(index);
    } else {
      repIdx[sym] = [index];
    }
  }

  let result = parsedAxiom.val;

  for (let i = 0; i < iterations; ++i) {
    result = result.flatMap((curr) => {
      const sym = curr.sym;
      if (!repIdx[sym]) return curr;
      const rule = replacements[repIdx[sym][0]];
      return rule.rhs;
    });
  }

  return result;
}
