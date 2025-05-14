export default [
  "$totalValue = array_reduce($cartItems, fn($carry, Item $item) => $carry + $item->getPrice() * $item->getQuantity(), 0.0);",
  "preg_match_all('/<a\\s[^>]*href=(\"??)([^\" >]*?)\\1[^>]*>(.*?)<\\/a>/siU', $htmlContent, $links, PREG_SET_ORDER);",
  "class ApiClient { public function __construct(private HttpClientInterface $client) {} public function fetchData(string $endpoint): array { /* ... */ } }",
  "array_walk_recursive($configArray, function(&$value, $key) { if (is_string($value)) $value = trim($value); });",
  "password_verify($submittedPassword, $storedHash);",
  "// Level 20: More intricate data processing and external API stubs.",
  "http_response_code(403);"
];
