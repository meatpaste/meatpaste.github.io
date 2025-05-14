export default [
  "$redis = new Redis(); $redis->connect('127.0.0.1', 6379); $redis->set('key', 'value');",
  "$zip->addFile('file.txt'); $zip->close();",
  "$reflectionMethod = new ReflectionMethod(MyClass::class, 'myMethod'); $reflectionMethod->invoke($object, $arg1);",
  "$pdo->exec('CREATE INDEX idx_name ON users(name)');",
  "// Level 29: Redis, ReflectionMethod, PDO index creation.",
  "$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);"
];
