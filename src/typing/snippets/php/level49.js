export default [
  "#[Security(\"is_granted('ROLE_ADMIN') and user.isVerified() and token.getProviderKey() === 'main'\")] public function sensitiveAdminAction(#[CurrentUser] UserInterface $adminUser): JsonResponse { /* ... */ }", // Symfony Security attribute
  "stream_context_create(['http' => ['method' => 'POST', 'header' => \"Content-Type: application/json\\r\\nAuthorization: Bearer {$token}\", 'content' => json_encode($payload), 'timeout' => 60.0, 'ignore_errors' => true]]);",
  "// Level 49: Very complex attributes, detailed stream context options.",
  "new \\MongoDB\\Driver\\Manager('mongodb://localhost:27017'); $bulk->insert(['x' => 1]); $manager->executeBulkWrite('db.collection', $bulk);"
];
