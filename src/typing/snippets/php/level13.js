export default [
  "usort($users, function(User $a, User $b): int { return strcmp($a->getLastName(), $b->getLastName()); });",
  "try { $this->database->beginTransaction(); /* ... operations ... */ $this->database->commit(); } catch (PDOException $e) { $this->database->rollBack(); throw $e; } finally { /* cleanup */ }",
  "$app->map(['GET', 'POST'], '/contact', [ContactController::class, 'handleContactForm']);",
  "array_walk($items, fn(&$item, $key) => $item = strtoupper($item));",
  "setlocale(LC_ALL, 'en_US.UTF-8', 'en_US', 'en');",
  "// Level 13: Introduce more complex control flow with try-catch-finally.",
  "hash_hmac('sha256', $data, $secretKey);"
];
