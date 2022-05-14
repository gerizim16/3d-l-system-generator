main -> axiom _ {% id %} | some_prod _ {% id %}
some_prod ->
    prod _ "\n" _ some_prod {%
        ([head, _1, _2, _3, tail]) => [head].concat(tail)
    %}
    | prod
prod -> expression _ "->" _ some_exp {%
    ([lhs, _1, _2, _3, rhs]) => ({lhs, rhs, production: true})
%}
axiom -> some_exp {%
    ([val]) => ({val, axiom: true})
%}
some_exp ->
    expression __ some_exp {%
        ([head, _, tail]) => [head].concat(tail)
    %}
    | expression
expression -> command {% id %} | variable {% id %}
variable -> variableSymbol parameters {%
    ([sym, params]) => ({sym, params})
%}
command -> commandSymbol parameters {%
    ([sym, params]) => ({sym: sym[0], params, command: true})
%}
variableSymbol -> upper {% id %}
commandSymbol -> "+x" | "-x" | "+y" | "-y" | "+z" | "-z" | "sphere" | "box" | "cube" | "cone" | "[" | "]" | "s" | "e" | "f" | "l" | "r" | "t" | "m"
parameters ->
    "{" some_params "}" {% array => array[1] %}
    | null
some_params ->
    param "," some_params {%
        ([head, _, tail]) => [head].concat(tail)
    %}
    | param
param -> [a-zA-Z0-9 +\-*\/!^&|~><()\.]:+ {%
    array => array[0].join("").trim()
%}

upper -> [A-Z]:+ {%
    array => array[0].join("")
%}

_  -> wschar:* {% function(d) {return null;} %}
__ -> wschar:+ {% function(d) {return null;} %}
wschar -> [ \t\n\v\f] {% id %}