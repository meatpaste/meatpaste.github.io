export default [
  "$logger = new class('debug.log') implements LoggerInterface { public function __construct(private string $file) {} public function log(string $msg): void { file_put_contents($this->file, $msg, FILE_APPEND); } };",
  "function* generateKeyValuePairs(array $data): Generator { foreach ($data as $key => $value) { yield strtoupper($key) => $value * 2; } }",
  "[$id, ['name' => $name, 'email' => $email], $status = 'active'] = $userDataArray;",
  "Closure::fromCallable([$this, 'privateHelperMethod']);",
  "if ($value instanceof Stringable) { echo (string) $value; }",
  "// Level 15: Introduce anonymous classes and more advanced generator usage.",
  "iterator_to_array($someGeneratorObject, true);"
];
