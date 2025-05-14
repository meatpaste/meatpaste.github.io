export default [
  "#[Route('/users/{id}', methods: ['GET'], name: 'user_show')] class UserController { /* ... */ }",
  "class Container { private array $services = []; public function set(string $id, callable $factory): void { $this->services[$id] = $factory; } public function get(string $id) { return $this->services[$id]($this); } }",
  "final readonly class MoneyVO { public function __construct(public int $amount, public string $currency) {} }",
  "use Psr\\Log\\LoggerAwareInterface; use Psr\\Log\\LoggerAwareTrait;",
  "// Level 16: Focus on modern PHP features like attributes and value objects.",
  "spl_object_hash($objectInstance);"
];
