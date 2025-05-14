export default [
  "preg_match('/(?P<protocol>https?):\\/\\/(?P<domain>[^\\/]+)(?P<path>\\/[^?#]*)?(?:\\?(?P<query>[^#]*))?(?:#(?P<fragment>.*))?/', $url, $components);",
  "preg_replace_callback('/\\b([a-z])([a-z]+)\\b/i', fn($m) => strtoupper($m[1]).strtolower($m[2]), $text_to_title_case);",
  "// Level 43: Complex regex for URL parsing, title casing.",
  "Normalizer::normalize($unicode_string, Normalizer::FORM_C);"
];
