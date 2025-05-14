export default [
  "abstract class AbstractApiController { protected Request $request; public function __construct(Request $r) { $this->request = $r; } abstract protected function handle(): Response; }",
  "trait ErrorHandlerTrait { protected function logError(string $message, array $context = []): void { /* Log to file/service */ } }",
  "function calculateWeightedAverage(array $values, array $weights): float { /* ... complex calculation ... */ return 0.0; }",
  "if ($object instanceof JsonSerializable) { $jsonString = json_encode($object); }",
  "mb_strtolower($string_with_multibyte_chars, 'UTF-8');",
  "class UserDTO { public readonly int $id; public readonly string $email; /* ... */ }",
  "// Level 10: Introduce readonly properties and more specific type hints.",
  "new \\RecursiveArrayIterator($deepArray);"
];
