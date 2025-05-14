export default [
  "class InvalidConfigurationException extends \\LogicException { public function __construct(string $key, string $message = '') { parent::__construct(\"Invalid config for '{$key}': {$message}\"); } }",
  "register_shutdown_function(function() { $error = error_get_last(); if ($error && in_array($error['type'], [E_ERROR, E_PARSE])) { /* log fatal */ } });",
  "SimpleXMLIterator::xpath('/bookstore/book[price>35.00]');",
  "// Level 32: Custom exceptions, shutdown functions, advanced XML.",
  "yaml_parse_file('config/parameters.yaml', 0, $ndocs, [Yaml::PARSE_EXCEPTION_ON_INVALID_TYPE]);"
];
