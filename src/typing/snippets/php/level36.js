export default [
  "class UserEventSubscriber implements EventSubscriberInterface { public static function getSubscribedEvents(): array { return [UserCreatedEvent::class => [['onUserCreated', 10], ['sendWelcomeEmail', -10]]]; } /* ... */ }",
  "$response = $this->httpClient->request('POST', '/api/orders', ['json' => $orderData, 'auth_bearer' => $this->apiToken]);",
  "// Level 36: Event subscribers, HTTP client usage with options.",
  "new \\Elasticsearch\\ClientBuilder()->setHosts(['localhost:9200'])->build();"
];
