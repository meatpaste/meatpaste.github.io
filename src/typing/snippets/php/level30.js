export default [
  "$client = new SoapClient('http://example.com/wsdl'); $result = $client->SomeMethod(['param' => 'value']);",
  "$zip->extractTo('/tmp/extracted/');",
  "$pdo->query('VACUUM');",
  "$image = imagecreatefrompng('image.png'); imagefilter($image, IMG_FILTER_NEGATE);",
  "// Level 30: SOAP client, ZIP extract, PDO VACUUM, GD image filter.",
  "$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);"
];
