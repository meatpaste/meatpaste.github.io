export default [
  "$ch = curl_init('https://api.example.com/status'); curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); $response = curl_exec($ch); curl_close($ch);",
  "$xml = new SimpleXMLElement('<root><item>Value</item></root>'); echo $xml->item;",
  "$data = json_decode($jsonString, false, 512, JSON_THROW_ON_ERROR);",
  "new DOMDocument('1.0', 'UTF-8'); $doc->loadHTMLFile($htmlFilePath);",
  "// Level 18: Introduce interactions with external services and data formats.",
  "curl_getinfo($ch, CURLINFO_HTTP_CODE);"
];
