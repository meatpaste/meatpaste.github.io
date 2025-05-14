export default [
  "$reflectionClass = new ReflectionClass(MyService::class); $constructor = $reflectionClass->getConstructor(); if ($constructor) { /* ... */ }",
  "function formatPhoneNumber(string $number): string { return preg_replace('/[^0-9]/', '', $number); /* ... more formatting ... */ }",
  "mb_convert_case($title, MB_CASE_TITLE, 'UTF-8');",
  "if (defined('MY_APP_ENV') && MY_APP_ENV === 'production') { error_reporting(0); }",
  "class MyCustomException extends \\RuntimeException implements MyErrorInterface {}",
  "// Level 14: Start touching on PHP's introspection capabilities.",
  "get_class_methods(new \\stdClass());"
];
