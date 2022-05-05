import nearley from "nearley";
import "./grammar";

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
  let parsedAxiom;
  let parsedProd;

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

  return { parsedAxiom, parsedProd, iterations };
}
