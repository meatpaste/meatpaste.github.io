export default [
  "$ffi = FFI::cdef('int printf(const char *format, ...); void usleep(unsigned int);', 'libc.so.6'); $ffi->printf('Hello from C via FFI!\\n');",
  "$msg_queue = msg_get_queue(ftok(__FILE__, 'a')); msg_send($msg_queue, 1, 'My Message');",
  "$ldap_conn = ldap_connect('ldap.example.com'); ldap_bind($ldap_conn, $userDn, $password);",
  "// Level 34: Interacting with C libraries, IPC, LDAP.",
  "shmop_open(0xff3, 'c', 0644, 100); // Shared memory (requires extension)"
];
