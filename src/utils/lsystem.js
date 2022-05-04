import nearley from "nearley";
import "./grammar";

export default function parseLsystem(iterations, axiom, productions) {
  let parsedAxiom = {};
  let parsedRules = [];

  try {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    parser.feed(axiom);
    parsedAxiom = parser.results[0];
  } catch (parseError) {
    console.log(parseError);
  }

  for (const rule of productions.split("\n")) {
    try {
      const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
      parser.feed(rule);
      parsedRules.push(parser.results[0]);
    } catch (parseError) {
      console.log(parseError);
    }
  }

  return { iterations, parsedAxiom, parsedRules };
}
