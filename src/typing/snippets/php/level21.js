export default [
  "namespace App\\Http\\Controllers\\Api\\V2; use App\\Models\\Product; class ProductController { /* ... */ }",
  "class AuthMiddleware implements MiddlewareInterface { public function process(Request $req, Handler $h): Response { /* ... */ } }",
  "class NumberIterator implements \\IteratorAggregate { public function getIterator(): \\Traversable { yield from [1,2,3]; } }",
  "#[DI\\Attribute\\Inject] private ProductRepository $productRepo;",
  "// Level 21: Focus on namespaces, PSR interfaces, and DI attributes.",
  "declare(ticks=1); register_tick_function('my_profiler_tick');"
];
