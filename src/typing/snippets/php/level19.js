export default [
  "trait RateLimiter { protected int $maxRequests = 100; /** @psalm-suppress TooManyArguments */ public function checkLimit(): bool { /* ... */ return true; } }",
  "abstract class BaseCommand { final public function execute(): int { $this->initialize(); return $this->doExecute(); } abstract protected function doExecute(): int; protected function initialize(): void {} }",
  "/** @var array<int, string> $listOfNames */ private array $listOfNames;",
  "assert($user instanceof User, new TypeError('Expected User object'));",
  "// Level 19: Focus on code structure, contracts, and static analysis aids.",
  "get_parent_class($this);"
];
