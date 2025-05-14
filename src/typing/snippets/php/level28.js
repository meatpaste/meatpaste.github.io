export default [
  "$proc = proc_open('ls -l', [['pipe', 'r'], ['pipe', 'w'], ['pipe', 'w']], $pipes); fclose($pipes[0]); $output = stream_get_contents($pipes[1]); fclose($pipes[1]); fclose($pipes[2]); proc_close($proc);",
  "$unserialized = unserialize($serializedData, ['allowed_classes' => ['MyClass']]);",
  "$zip->deleteName('old.txt');",
  "$db->exec('PRAGMA foreign_keys = ON;');",
  "// Level 28: proc_open, unserialize with allowed_classes, SQLite PRAGMA.",
  "stream_context_create(['http' => ['timeout' => 2]]);"
];
