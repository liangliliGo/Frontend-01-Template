const http = require('http')

const server = http.createServer(function(req, res){
    req.setHeader('content-type', 'text/html')
    res.writeHead(200, {'Content-type' : 'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<p>Hello World</p>');
}).listen(3000);

server.send()