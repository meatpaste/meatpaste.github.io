export default [
  "use Monolog\\Logger; use Monolog\\Handler\\RotatingFileHandler; $log = new Logger('app'); $log->pushHandler(new RotatingFileHandler('logs/app.log', 10));",
  "set_exception_handler(function (Throwable $exception) { /* Log to Sentry/Bugsnag */ echo 'Critical error!'; });",
  "opcache_get_status(false)['memory_usage']['used_memory'];",
  "if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 | FILTER_FLAG_NO_PRIV_RANGE) === false) {}",
  "// Level 23: Introduce popular library usage examples and advanced error/opcache handling.",
  "gc_enable(); gc_collect_cycles();"
];
