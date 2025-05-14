export default [
  "$phar = new Phar('my.phar'); $phar->addFile('index.php');",
  "$reflectionFunc = new ReflectionFunction('array_map'); $params = $reflectionFunc->getParameters();",
  "$image = imagecreatetruecolor(100, 100); imagefilledrectangle($image, 0, 0, 99, 99, imagecolorallocate($image, 255, 0, 0));",
  "$zip->addFromString('hello.txt', 'Hello World!');",
  "// Level 27: Phar, ReflectionFunction, and GD usage.",
  "$imageData = file_get_contents('php://input'); imagepng(imagecreatefromstring($imageData), 'output.png');"
];
