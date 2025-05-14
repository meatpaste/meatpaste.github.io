export default [
  "class DataRepository extends BaseRepository implements Countable { /* ... */ }",
  "public function findUserById(int $id): ?UserEntity { return $this->db->fetchOne(/* ... */); }",
  "$results = array_column($multiDimensionalArray, 'column_key', 'index_key');",
  "if ($request->hasHeader('X-Custom-Auth') || $session->get('is_authenticated')) {}",
  "Route::get('/api/v1/items/{id}', [ItemController::class, 'showItemDetails']);",
  "function applyDiscount(float $price, callable $discountLogic): float { return $discountLogic($price); }",
  "trait RateLimiter { protected int $maxRequests = 100; /** @psalm-suppress TooManyArguments */ public function checkLimit(): bool { /* ... */ return true; } }",
  "$processed = preg_replace_callback_array(['/foo/' => fn() => 'bar'], $subject);",
  "// Level 8: Focus on slightly more complex class interactions and utility functions.",
  "new \\MyApp\\Services\\NotificationService($emailConfig);"
];
