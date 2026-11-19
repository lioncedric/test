const http = require("node:http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("<!DOCTYPE html>\n<html>\n<head><meta charset=\"utf-8\"><title>Hello</title></head>\n<body>\n<h1>Hello</h1>\n</body>\n</html>\n");
    return;
  }
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not Found");
});

// No host argument: Node binds dual-stack (IPv6 "::", which also accepts IPv4),
// so both localhost -> ::1 and published-port IPv4 traffic reach the server.
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
