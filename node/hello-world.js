var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200);
  res.end('Hello World!\n');
}).listen(8080);

console.log('Server running at http://localhost:8080/');
