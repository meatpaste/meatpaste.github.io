export default [
  "token_get_all(file_get_contents(__FILE__), TOKEN_PARSE);",
  "hrtime(true); // High resolution timer for performance measurement",
  "if (PHP_OS_FAMILY === 'Windows') { /* do windows specific stuff */ } else { /* do unix specific stuff */ }",
  "runkit7_method_add(MyClass::class, 'newDynamicMethod', fn() => 'Hello from runkit!'); // Requires runkit7",
  "// Level 24: More obscure PHP functions and environment-specific code.",
  "get_defined_constants(true)['user'];"
];
