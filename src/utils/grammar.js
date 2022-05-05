// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main", "symbols": ["axiom", "_"], "postprocess": id},
    {"name": "main", "symbols": ["some_rule", "_"], "postprocess": id},
    {"name": "some_rule", "symbols": ["rule", "_", {"literal":"\n"}, "_", "some_rule"], "postprocess": 
        ([head, _1, _2, _3, tail]) => [head].concat(tail)
            },
    {"name": "some_rule", "symbols": ["rule"]},
    {"name": "rule$string$1", "symbols": [{"literal":"-"}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "rule", "symbols": ["nonterminal", "_", "rule$string$1", "_", "some_exp"], "postprocess": 
        ([lhs, _1, _2, _3, rhs]) => ({lhs, rhs, production: true})
        },
    {"name": "axiom", "symbols": ["some_exp"], "postprocess": 
        ([val]) => ({val, axiom: true})
        },
    {"name": "some_exp$subexpression$1", "symbols": ["terminal"]},
    {"name": "some_exp$subexpression$1", "symbols": ["nonterminal"]},
    {"name": "some_exp", "symbols": ["some_exp$subexpression$1", "__", "some_exp"], "postprocess": 
        ([head, _, tail]) => [head[0]].concat(tail)
            },
    {"name": "some_exp$subexpression$2", "symbols": ["terminal"]},
    {"name": "some_exp$subexpression$2", "symbols": ["nonterminal"]},
    {"name": "some_exp", "symbols": ["some_exp$subexpression$2"]},
    {"name": "nonterminal", "symbols": ["nonterminalSymbol", "parameters"], "postprocess": 
        ([sym, params]) => ({sym, params})
        },
    {"name": "terminal", "symbols": [{"literal":"!"}, "terminalSymbol", "parameters"], "postprocess": 
        ([_, sym, params]) => ({sym: sym[0], params, term: true})
        },
    {"name": "nonterminalSymbol", "symbols": ["alpha"], "postprocess": id},
    {"name": "terminalSymbol$subexpression$1", "symbols": [/[xX]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "terminalSymbol", "symbols": ["terminalSymbol$subexpression$1"]},
    {"name": "terminalSymbol$subexpression$2", "symbols": [/[yY]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "terminalSymbol", "symbols": ["terminalSymbol$subexpression$2"]},
    {"name": "terminalSymbol$subexpression$3", "symbols": [/[zZ]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "terminalSymbol", "symbols": ["terminalSymbol$subexpression$3"]},
    {"name": "terminalSymbol$subexpression$4", "symbols": [/[sS]/, /[pP]/, /[hH]/, /[eE]/, /[rR]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "terminalSymbol", "symbols": ["terminalSymbol$subexpression$4"]},
    {"name": "terminalSymbol$subexpression$5", "symbols": [/[bB]/, /[oO]/, /[xX]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "terminalSymbol", "symbols": ["terminalSymbol$subexpression$5"]},
    {"name": "terminalSymbol$subexpression$6", "symbols": [/[cC]/, /[uU]/, /[bB]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "terminalSymbol", "symbols": ["terminalSymbol$subexpression$6"]},
    {"name": "terminalSymbol$subexpression$7", "symbols": [/[cC]/, /[oO]/, /[nN]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "terminalSymbol", "symbols": ["terminalSymbol$subexpression$7"]},
    {"name": "terminalSymbol", "symbols": [{"literal":"["}]},
    {"name": "terminalSymbol", "symbols": [{"literal":"]"}]},
    {"name": "terminalSymbol$subexpression$8", "symbols": [/[sS]/, /[tT]/, /[aA]/, /[rR]/, /[tT]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "terminalSymbol", "symbols": ["terminalSymbol$subexpression$8"]},
    {"name": "terminalSymbol$subexpression$9", "symbols": [/[eE]/, /[nN]/, /[dD]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "terminalSymbol", "symbols": ["terminalSymbol$subexpression$9"]},
    {"name": "terminalSymbol$subexpression$10", "symbols": [/[fF]/, /[wW]/, /[dD]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "terminalSymbol", "symbols": ["terminalSymbol$subexpression$10"]},
    {"name": "terminalSymbol$subexpression$11", "symbols": [/[rR]/, /[aA]/, /[dD]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "terminalSymbol", "symbols": ["terminalSymbol$subexpression$11"]},
    {"name": "terminalSymbol$subexpression$12", "symbols": [/[tT]/, /[eE]/, /[nN]/, /[sS]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "terminalSymbol", "symbols": ["terminalSymbol$subexpression$12"]},
    {"name": "terminalSymbol$subexpression$13", "symbols": [/[mM]/, /[aA]/, /[tT]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "terminalSymbol", "symbols": ["terminalSymbol$subexpression$13"]},
    {"name": "parameters", "symbols": [{"literal":"{"}, "some_params", {"literal":"}"}], "postprocess": array => array[1]},
    {"name": "parameters", "symbols": []},
    {"name": "some_params", "symbols": ["param", {"literal":","}, "some_params"], "postprocess": 
        ([head, _, tail]) => [head].concat(tail)
            },
    {"name": "some_params", "symbols": ["param"]},
    {"name": "param$ebnf$1", "symbols": [/[a-zA-Z0-9 +\-*\/!^&|~><()]/]},
    {"name": "param$ebnf$1", "symbols": ["param$ebnf$1", /[a-zA-Z0-9 +\-*\/!^&|~><()]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "param", "symbols": ["param$ebnf$1"], "postprocess": 
        array => array[0].join("")
        },
    {"name": "alpha$ebnf$1", "symbols": [/[a-zA-Z]/]},
    {"name": "alpha$ebnf$1", "symbols": ["alpha$ebnf$1", /[a-zA-Z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "alpha", "symbols": ["alpha$ebnf$1"], "postprocess": 
        array => array[0].join("")
        },
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
