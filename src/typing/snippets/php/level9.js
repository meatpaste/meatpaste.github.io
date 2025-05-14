export default [
  "class CacheManager { use SingletonTrait; private array $cacheStore = []; public function getOrSet(string $k, callable $c) {} }",
  "function normalizeUserData(array $rawInput): array { $input = array_map('trim', $rawInput); /* ... more normalization ... */ return $input; }",
  "if (in_array($user->getRole(), [User::ROLE_ADMIN, User::ROLE_SUPERVISOR], true)) { /* elevated privileges */ }",
  "strpos($haystack, $needle, $offset_if_any) !== false;",
  "$this->eventDispatcher->dispatch(new UserRegisteredEvent($newUser));",
  "array_intersect_key($array1, $array2_to_compare_keys_with);",
  "// Level 9: Start combining multiple concepts in single lines.",
  "DateTime::createFromInterface($someDateTimeInterfaceObject);"
];
