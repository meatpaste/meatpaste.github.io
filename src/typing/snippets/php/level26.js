export default [
  "$jwt = JWT::encode(['sub' => $userId], $secret, 'HS256'); $decoded = JWT::decode($jwt, new Key($secret, 'HS256'));",
  "$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);",
  "$callback = function ($errno, $errstr) { throw new ErrorException($errstr, $errno); }; set_error_handler($callback);",
  "$inTransaction = $pdo->inTransaction();",
  "// Level 26: JWT, PDO, and error handler usage.",
  "spl_autoload_register(function ($class) { include $class . '.php'; });"
];
