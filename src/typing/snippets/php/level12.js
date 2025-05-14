export default [
  "$fileHandle = fopen('data.log', 'a+'); fwrite($fileHandle, date('[Y-m-d H:i:s] ') . $logMessage . PHP_EOL); fclose($fileHandle);",
  "preg_match('/^Bearer\\s+(.*)$/i', $request->getHeaderLine('Authorization'), $matches); $token = $matches[1] ?? null;",
  "class CsvExporter { public function export(string $filename, iterable $data): void { /* ... fputcsv logic ... */ } }",
  "if (is_readable($configFile) && is_writable(dirname($logFile))) { /* proceed */ }",
  "glob('/var/www/uploads/*.{jpg,png,gif}', GLOB_BRACE);",
  "// Level 12: Focus on file system interaction and more practical regex.",
  "stream_get_contents($resourceHandle, -1, 0);"
];
