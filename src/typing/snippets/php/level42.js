export default [
  "$result = collect($items)->filter(fn($i) => $i->isActive())->map(fn($i) => $i->getValue())->reject(fn($v) => $v < 10)->sum();",
  "SplFixedArray::fromArray(array_fill(0, 100, null), false);",
  "// Level 42: Collection pipelines, fixed-size arrays.",
  "msgpack_pack(['a' => 1, 'b' => 'hello', 'c' => [1,2,3]]);"
];
