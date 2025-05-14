export default [
  "if($a>$b){};", "if($x==$y){};", "if($m!=$n){};", "if(true){};",
  "for($i=0;$i<3;$i++){};", "function hi(){};", "function go($p){};",
  "if ($isValid) echo 'OK';", "else echo 'Fail';", "if ($count > 0) return true;",
  "for ($j=1; $j<=5; $j++) { print $j; }", "foreach($arr as $v){};",
  "while($c<10){$c++;};", "do {$d--;} while($d>0);", "switch($opt){case 1:break;}",
  "function add($a,$b){return $a+$b;}", "function getVal(){return $this->val;}",
  "class MyObj {}", "new MyObj();", "$obj = new stdClass();", "return $result;",
  "global $config;", "static $counter=0;", "define('MAX_USERS', 10);",
  "if (isset($arr['key'])) {}", "if (!empty($str)) {}", "if ($num === 0) {}",
  "for ($k = 10; $k > 0; $k--) {}", "foreach ($map as $key => $val) {}",
  "while (true) { break; }", "function isEven(int $n): bool { return $n % 2 == 0; }",
  "class Simple { public $prop; }", "$s = new Simple();", "$s->prop = 1;",
  "if ($err) { throw new Exception(); }", "$_SESSION['uid'] = 123;",
  "if ($a === true && $b === false) {}", "for ($idx = 0; $idx < count($list); $idx++) {}",
  "function say($what) { echo $what; }", "class TestClass { public $id; }",
  "new DateTime();", "if ($x instanceof MyType) {}", "yield $i;", "clone $original;"
];
