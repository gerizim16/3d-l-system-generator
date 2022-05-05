main -> axiom _ {% id %} | some_rule _ {% id %}
some_rule ->
    rule _ "\n" _ some_rule {%
        ([head, _1, _2, _3, tail]) => [head].concat(tail)
    %}
    | rule
rule -> nonterminal _ "->" _ some_exp {%
    ([lhs, _1, _2, _3, rhs]) => ({lhs, rhs, production: true})
%}
axiom -> some_exp {%
    ([val]) => ({val, axiom: true})
%}
some_exp ->
    (terminal | nonterminal) __ some_exp {%
        ([head, _, tail]) => [head[0]].concat(tail)
    %}
    | (terminal | nonterminal)
nonterminal -> nonterminalSymbol parameters {%
    ([sym, params]) => ({sym, params})
%}
terminal -> "!" terminalSymbol parameters {%
    ([_, sym, params]) => ({sym: sym[0], params, term: true})
%}
nonterminalSymbol -> alpha {% id %}
terminalSymbol -> "x"i | "y"i | "z"i | "sphere"i | "box"i | "cube"i | "cone"i | "[" | "]" | "start"i | "end"i | "fwd"i | "rad"i | "tens"i | "mat"i
parameters ->
    "{" some_params "}" {% array => array[1] %}
    | null
some_params ->
    param "," some_params {%
        ([head, _, tail]) => [head].concat(tail)
    %}
    | param
param -> [a-zA-Z0-9 +\-*\/!^&|~><()]:+ {%
    array => array[0].join("")
%}

alpha -> [a-zA-Z]:+ {%
    array => array[0].join("")
%}

_  -> wschar:* {% function(d) {return null;} %}
__ -> wschar:+ {% function(d) {return null;} %}
wschar -> [ \t\n\v\f] {% id %}