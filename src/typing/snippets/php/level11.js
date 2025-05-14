export default [
  "$user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);",
  "array_udiff($array1, $array2, fn($a, $b) => $a->id <=> $b->id);",
  "public function processPayment(Order $order, PaymentGatewayInterface $gateway): bool { return $gateway->charge($order->getTotal(), $order->getCurrency()); }",
  "if (!ctype_alnum($username_to_validate)) { throw new InvalidArgumentException('Username must be alphanumeric.'); }",
  "parse_ini_string($ini_data_as_string, true, INI_SCANNER_TYPED);",
  "// Level 11: More framework-style method chaining and specific flags.",
  "openssl_digest('Hello World', 'sha256', false);"
];
