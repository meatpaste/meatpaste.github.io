export default [
  "function readLargeFile(string $filePath): \\Generator { $handle = fopen($filePath, 'r'); while (($line = fgets($handle)) !== false) { yield trim($line); } fclose($handle); }",
  "Fiber::suspend('waiting_for_io'); $result = Fiber::resume($data_from_io);",
  "WeakMapExample::$cache[$objectKey] = $expensiveComputationResult;",
  "// Level 33: Practical generator usage, introduction to Fibers and WeakMaps.",
  "apache_get_modules(); // If running under Apache"
];
