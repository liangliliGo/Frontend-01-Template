const http = require('http')

// Returns content-type = text/plain
const server = http.createServer((req, res) => {
  console.log('--------------start------------------')
  // console.log("req", req)
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/html', 'Charset': 'utf-8' });
  res.end(`<html><head><meta charset="utf-8"/><title>test</title></head><body>hello wrold!hello wrold!hello wrold!
hello wrold!hello wroldzxczxc!哈哈哈哈哈哈哈昂昂哈</body></html>`);
});

server.listen(8088)
