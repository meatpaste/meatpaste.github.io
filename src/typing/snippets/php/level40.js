export default [
  "if (pcntl_async_signals(true)) { pcntl_signal(SIGINT, fn() => exit('Caught SIGINT!')); }",
  "use parallel\\Runtime; $runtime = new Runtime(); $future = $runtime->run(function(int $a, int $b){ return $a + $b; }, [5, 7]); echo $future->value();",
  "FFI::new('struct complex_struct_t { int id; char name[50]; }');",
  "class MyFinalReadonlyClass { final public readonly string $immutableProperty; public function __construct() { $this->immutableProperty = 'set_once'; } }",
  "// Level 40: Asynchronous signals, parallel processing stubs, FFI structs, final readonly classes.",
  "inotify_init(); $watch_descriptor = inotify_add_watch($fd, '/tmp', IN_ALL_EVENTS);"
];
