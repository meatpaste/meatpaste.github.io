export default [
  "use League\\Csv\\Reader; $csv = Reader::createFromPath('data.csv', 'r'); $csv->setHeaderOffset(0); $records = $csv->getRecords(['column1', 'column2']);",
  "array_map(fn(MyEntity $e) => $e->setProcessed(true)->setUpdatedAt(new \\DateTimeImmutable()), $entities_to_update);",
  "// Level 37: Using specific methods from popular libraries, complex array_map.",
  "gmp_add('12345678901234567890', '98765432109876543210');"
];
