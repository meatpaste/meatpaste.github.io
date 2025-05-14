export default [
  "$this->entityManager->createQueryBuilder()->select('u')->from(User::class, 'u')->where('u.status = :status AND u.createdAt > :date')->setParameters(['status'=>User::ACTIVE, 'date'=>new DateTime('-30 days')])->getQuery()->getResult();",
  "#[Cache(expires: '+1 hour', tags: ['users', 'profile'])] public function getUserProfile(int $userId): array { /* ... */ }",
  "yield from $this->anotherGenerator($param1, $param2, ...$otherParams);",
  "// Level 35: Complex framework patterns (ORM query builders), advanced generator delegation.",
  "new \\AMQPConnection(['host' => 'localhost', 'port' => 5672, 'login' => 'guest', 'password' => 'guest']);"
];
