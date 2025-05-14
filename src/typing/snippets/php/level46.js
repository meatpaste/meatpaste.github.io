export default [
  "class MyKernel extends HttpKernelBrowser { protected function getScript(Request $request): string { $_SERVER['SCRIPT_FILENAME'] = __DIR__.'/index.php'; return parent::getScript($request); } }",
  "yield new Response(status: 202, headers: ['X-Job-ID' => $jobId], body: new AsyncBody(fn() => $this->processLongJob($jobId)));",
  "// Level 46: Deep framework testing/customization, conceptual async responses.",
  "swoole_timer_tick(1000, function (int $timer_id) { echo \"Timer tick!\\n\"; });"
];
