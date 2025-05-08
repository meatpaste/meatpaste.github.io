// --- PHP Syntax Typing Tutor Snippets ---

const snippetsByDifficulty = {
    1: [
        "a;", "b;", "c;", "0;", "1;", "9;", "$;", "$a;", "z9;", "abc;"
    ],
    2: [
        "$foo = 42;", "$bar = 'hello';", "$num = $foo + 7;", "$name = 'World';", "$count = 0;",
        "$price = 9.99;", "$flag = true;", "$value = null;", "$greeting = 'Hi';", "$year = 2025;"
    ],
    3: [
        "function greet($name) {\n    echo 'Hello, ' . $name;\n}",
        "function add($a, $b) {\n    return $a + $b;\n}",
        "function multiply($x, $y) {\n    return $x * $y;\n}",
        "function concat($a, $b) {\n    return $a . $b;\n}",
        "function shout($msg) {\n    echo strtoupper($msg);\n}",
        "strlen('test');", "strpos('hello', 'e');", "str_replace('h', 'j', 'hello');",
        "array_map('strtoupper', ['a','b']);", "trim(' hello ');"
    ],
    4: [
        "if ($foo > 10) {\n    echo 'Big';\n} else {\n    echo 'Small';\n}",
        "switch ($a) {\n    case 1:\n        echo 'One';\n        break;\n    default:\n        echo 'Other';\n}",
        "for ($i = 0; $i < 5; $i++) {\n    echo $i;\n}",
        "while ($count < 3) {\n    $count++;\n}",
        "do {\n    $count--;\n} while ($count > 0);", "foreach ($arr as $item) {\n    echo $item;\n}",
        "if (!empty($arr)) {\n    echo 'Not empty';\n}",
        "elseif ($a === 0) {\n    echo 'Zero';\n}",
        "break;", "continue;"
    ],
    5: [
        "class Person {\n    public $name;\n    function __construct($name) {\n        $this->name = $name;\n    }\n}",
        "class Car {\n    public $make;\n    function drive() {\n        echo 'Driving';\n    }\n}",
        "class Animal {\n    protected $type;\n    public function getType() {\n        return $this->type;\n    }\n}",
        "class Test {\n    private $value;\n    public function setValue($v) {\n        $this->value = $v;\n    }\n}",
        "new Person('Alice');", "new Car();", "new Animal();", "new Test();",
        "public function index() {\n    return view('welcome');\n}",
        "protected function helper() {\n    // ...\n}"
    ],
    6: [
        "$arr = [1, 2, 3];", "array_push($arr, 4);", "$value = array_pop($arr);",
        "$assoc = ['a' => 1, 'b' => 2];", "foreach ($assoc as $key => $val) {\n    echo $key;\n}",
        "while (list($k, $v) = each($assoc)) {\n    echo $v;\n}",
        "for ($i = count($arr)-1; $i >= 0; $i--) {\n    echo $arr[$i];\n}",
        "sort($arr);", "ksort($assoc);", "$merged = array_merge($arr, [4,5,6]);"
    ],
    7: [
        "preg_match('/[A-Za-z]+[0-9]*/', $subject, $matches);",
        "preg_replace('/\\s+/', '_', $string);", "preg_split('/,\\s*/', $csv, -1);",
        "preg_grep('/^a/i', $array);", "preg_filter('/(foo)/', '<b>$1</b>', $text);",
        "preg_match_all('/\\d+/', $text, $nums);", "preg_quote($str, '/');", "preg_last_error();",
        "preg_replace_callback('/\\d+/', 'callback', $text);",
        "preg_match('/^(https?):\\/\\//', $url);"
    ],
    8: [
        "use Illuminate\\Support\\Facades\\Route;", "Route::get('/home', [HomeController::class, 'index']);",
        "Route::post('/login', [AuthController::class, 'login']);",
        "class User extends Model {\n    public function posts() {\n        return $this->hasMany(Post::class);\n    }\n}",
        "@if($user)\n    Hello, {{ $user->name }}\n@endif",
        "@foreach($items as $item)\n    {{ $item }}\n@endforeach",
        "php artisan make:controller TestController", "php artisan migrate",
        "use App\\Models\\User;", "$user = User::find(1);",
    ]
};
