export default [
  "class Greeter { public string $greeting; public function __construct(string $g) { $this->greeting = $g; } public function say(string $name): string { return \"{$this->greeting}, {$name}!\"; } }",
  "if (isset($_POST['username']) && !empty($_POST['username']) && strlen($_POST['username']) > 3) { /* valid username */ }",
  "$numbers = array_map(fn($n) => $n * $n, [1, 2, 3, 4, 5]);",
  "sort($myArray, SORT_NUMERIC | SORT_FLAG_CASE); rsort($anotherArray);",
  "$csvLine = explode(';', 'id;name;email;active');",
  "$jsonData = json_decode(file_get_contents('data.json'), true);",
  "preg_replace('/\\s+/', '-', strtolower($pageTitle));",
  "public function __toString(): string { return $this->name . ' (' . $this->id . ')'; }",
  "interface Serializable { public function serialize(): string; public function unserialize(string $s): void; }",
  "abstract class DatabaseModel { abstract protected function getTable(): string; public function findAll(): array { return []; } }",
  "$currentDateTime = (new DateTime('now', new DateTimeZone('UTC')))->format('Y-m-d H:i:sP');",
  "if ($object instanceof MyInterface && method_exists($object, 'process')) { $object->process(); }",
  "match (get_user_role()) { 'admin' => $this->grantFullAccess(), 'editor' => $this->grantEditAccess(), default => $this->grantReadAccess() };"
];
