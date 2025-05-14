export default [
  "class ServiceFactory { public static function create(string $serviceName): object { return new ('App\\Services\\' . $serviceName)(); } } // Late static binding in action",
  "$binaryData = pack('NnC*', 0x12345678, 0x9ABC, 65, 66); $unpacked = unpack('NintVal/nshortVal/C*chars', $binaryData);",
  "ReflectionProperty::setAccessible(true);",
  "mb_detect_encoding($str, ['UTF-8', 'ASCII', 'ISO-8859-1'], true);",
  "// Level 22: Deeper reflection, binary data, multi-byte string functions.",
  "class_alias('OldClassName', 'NewClassName');"
];
