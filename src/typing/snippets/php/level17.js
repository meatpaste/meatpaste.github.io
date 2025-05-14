export default [
  "$sourceStream = fopen('php://input', 'r'); $destStream = fopen('output.gz', 'w'); stream_filter_append($destStream, 'zlib.deflate', STREAM_FILTER_WRITE); stream_copy_to_stream($sourceStream, $destStream);",
  "RecursiveIteratorIterator(new RecursiveDirectoryIterator($path, FilesystemIterator::SKIP_DOTS));",
  "fgetcsv($filePointer, 1024, ',', '\"', '\\');",
  "ini_get('upload_max_filesize'); ini_set('memory_limit', '512M');",
  "// Level 17: Deeper dive into stream and file system functionalities.",
  "mime_content_type($filename);"
];
