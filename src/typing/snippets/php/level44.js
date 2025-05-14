export default [
  "ini_set('default_socket_timeout', 120); ini_set('user_agent', 'MyCustomCrawler/1.0'); putenv('APP_ENV=staging');",
  "if (str_starts_with(PHP_VERSION, '8.2')) { /* PHP 8.2 specific logic */ } else if (version_compare(PHP_VERSION, '8.0.0', '>= ')) { /* PHP 8.0+ */ }",
  "// Level 44: Manipulating PHP runtime config, version-specific code.",
  "getopt('ab:c::', ['longopt', 'anotheropt:', 'optionalopt::'], $rest_index);"
];
