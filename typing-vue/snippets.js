// snippets.js
// Maps level numbers to arrays of PHP code strings
export const snippetsByDifficulty = {
  1: ["$a", "$b", "$x = 1;", "$foo = 42;"],
  2: ["$x = 2;", "$y = $x + 3;", "$z = $x * $y;"],
  3: ["if ($a > $b) {\n  echo $a;\n}", "for ($i = 0; $i < 10; $i++) {\n  echo $i;\n}", "function foo() {\n  return 1;\n}"]
  // ...add more levels up to 50+
};
