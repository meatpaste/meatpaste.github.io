export default [
  "$statement = $this->pdo->prepare('SELECT * FROM users WHERE email LIKE :email_pattern AND last_login BETWEEN :start_date AND :end_date ORDER BY last_login DESC LIMIT :limit OFFSET :offset'); $statement->execute([...]);",
  "#[ORM\\OneToMany(targetEntity: Address::class, mappedBy: 'user', cascade: ['persist', 'remove'], orphanRemoval: true)] private Collection $addresses;",
  "function complexAlgorithm(array &$data, int $flags = self::FLAG_DEFAULT | self::FLAG_OPTIMIZE, ?callable $progressCallback = null): bool { /* ... many lines of logic ... */ }",
  "// Level 45: Complex SQL queries with PDO, ORM relationship mapping, very complex function signatures.",
  "new \\SplPriorityQueue(); $pq->insert('task1', 10); $pq->insert('task2', 1);"
];
