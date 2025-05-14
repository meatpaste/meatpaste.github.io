export default [
  "eval('$className = new class extends BaseClass { public function dynamicMethod() { return \\'dynamic!\\'; } };'); $instance = new $className();",
  "Closure::bind(function() { return $this->veryPrivateProperty; }, $someObject, get_class($someObject))();",
  "// Level 47: Metaprogramming, dynamic code execution (for typing, not real use).",
  "create_function('$a,$b', 'return \"Sum: \" . ($a+$b);'); // Deprecated, but for typing"
];
