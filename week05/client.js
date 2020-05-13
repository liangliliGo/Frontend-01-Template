const net = require("net")

class Request {
    // method, url=host+port+path
    // body
    // headers
    constructor(options){
        this.method = options.method || "GET"
        this.host = options.host
        this.path = options.path || "/"
        this.port = options.port || 80;
        this.body = options.body || {};
        this.headers = options.headers || {};
        if(!this.headers['Content-Type']){
            this.headers['Content-Type'] = "application/x-www/form/urlencoded"
        }

        if(this.headers['Content-Type'] === 'application/json')
            this.bodyText = JSON.stringify(this.body)
        else if(this.headers['Content-Type'] === 'application/x-www/form/urlencoded')
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
        this.headers["Content-Length"] = this.bodyText.length
            
    }
    toString(){
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key=>`${key}: ${this.headers[key]}`).join('&')}\r
\r
${this.bodyText}
`
    }
    send(connection) {
        return new Promise((resolve, reject) => {
            let parser = new ResponseParser
            if (connection){
                connection.write(this.toString())
            }else{
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.toString())
                })
            }
            connection.on("data", (data) => {
                // new Response(data)
                parser.receive(data.toString())
                if(parser.idFinished){
                    resolve(parser)
                }
                // resolve(data.toString())
                connection.end()
            })
            connection.on("error", (err) => {
                reject(err);
                connection.end()
            })
        })
        
    }
}

class ResponseParser {
    constructor(){
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_SPACE = 3;
        this.WAITING_HEADER_VALUE = 4;
        this.WAITING_HEADER_LINE_END = 5;
        this.WAITING_HEADER_BLOCK_END = 6;
        this.WAITING_HEADER_BODY = 7;

        this.current = this.WAITING_STATUS_LINE;
        this.statusLine = ""
        this.headers = {}
        this.headerName = "";
        this.headerValue = "";
        this.bodyParser = null;
    }

    get isFinished(){
        return this.bodyParser && this.bodyParser.isFinished
    }
    get response() {
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/)
        return {
        statusCode: RegExp.$1,
        statusText: RegExp.$2,
        headers: this.headers,
        body: this.bodyParser.content.join('')
        }
    }

    receive(string){
        for(let i=0; i< string.length; i++){
            this.receiveChar(string.charAt(i))
        }
    }
    receiveChar(char){
        if(this.current === this.WAITING_STATUS_LINE){
            if(chart == '\r'){
                this.current = this.WAITING_STATUS_LINE_END
            }else if(chart == '\n'){
                this.current = this.WAITING_HEADER_NAME
            }else{
                this.statusLine += char
            }
        }else if(this.current === this.WAITING_STATUS_LINE_END){
            if(chart == '\n'){
                this.current = this.WAITING_HEADER_NAME
            }
        }else if(this.current === this.WAITING_HEADER_NAME){
            if(chart == ':'){
                this.current = this.WAITING_HEADER_SPACE
            }else if(chart = '\r'){
                this.current = this.WAITING_HEADER_BLOCK_END
                if(this.headers['Transfer-Encoding'] == "checked")
                    this.bodyParser = new TrunkedBodyParser();
            }else{
                this.headerName += char;
            }
        }else if(this.current === this.WAITING_HEADER_SPACE){
            if(chart == ' '){
                this.current = this.WAITING_HEADER_VALUE
            }
        }else if(this.current === this.WAITING_HEADER_VALUE){
            if(chart == '\r'){
                this.current = this.WAITING_HEADER_LINE_END
                this.headers[this.headerName] = this.headerValue;
                this.headerName = ""
                this.headerValue = ""
            }else{
                this.headerValue =+ char
            }
        }else if(this.current === this.WAITING_HEADER_LINE_END){
            if(chart == '\n'){
                this.current = this.WAITING_HEADER_NAME
            }
        }else if(this.current === this.WAITING_HEADER_BLOCK_END){
            if(chart == '\n'){
                this.current = this.WAITING_HEADER_BODY
            }
        }else if(this.current === this.WAITING_HEADER_BODY){
            this.bodyParser.receiveChar(char);
        }
    }
}

class TrunkedBodyParser {
    constructor(){
        // 状态机   
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.READING_TRUNK = 2;
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;

        this.length = 0;
        this.content = [];
        this.finished = false

        this.current = this.WAITING_LENGTH
    }
    receiveChar(char){
        if(this.current === this.WAITING_LENGTH){
            if(chart == '\r'){
                if(this.length === 0){
                    this.finished = true
                }
                this.current = this.WAITING_STATUS_LINE_END
            }else{
                this.length *= 10
                // this.length += char.charCodeAt(0) - '0'.charCodeAt(0)
                this.length += char.charCodeAt(0) - '0'.charCodeAt(0)
            }
        }else if(this.current === this.WAITING_LENGTH_LINE_END){
            if(chart == '\n'){
                this.current = this.READING_TRUNK
            }
        }else if(this.current === this.READING_TRUNK){
            if(/[^\r\n]/.test(char)){
                this.content.push(char)
            }
            this.length -- 
            if(this.length === 0){
                this.current = this.WAITING_NEW_LINE;
            }
        }else if(this.current === this.WAITING_NEW_LINE){
            if(chart == '\r'){
                this.current = this.WAITING_NEW_LINE_END
            }
        }else if(this.current === this.WAITING_NEW_LINE_END){
            if(chart == '\n'){
                this.current = this.WAITING_NEW_LINE_END
            }
        }
    }
}

void async function (){
    let request = new Request({
        method: 'POST',
        port: 8088,
        host: '127.0.0.1',
        path: '/',
        headers: {
            ["X-Name"]: 'I am Fuge'
        },
        body: {
            name: "winter"
        }
    })
    await request.send()
}();


/*const client = net.createConnection({ 
    port: 8124,
    host: '127.0.0.1'
  }, () => {
    // 'connect' listener.
    // console.log('connected to server!');
    // client.write('GET / HTTP/1.1\r\n');
    // client.write('Content-Length: 11 \r\n');
    // client.write('Host: 127.0.0.1\r\n');
    // client.write('Content-Type: application/x-www/form/urlencoded\r\n');
    // client.write('\r\n');
    // client.write('name=winter\r\n');

    let request = new Request({
        method: 'POST',
        port: 8088,
        host: '127.0.0.1',
        path: '/',
        headers: {
            ["X-Name"]: 'I am Fuge'
        },
        body: {
            name: "winter"
        }
    })
    console.log(request.toString())
    client.write(require.toString());
  });
  client.on('data', (data) => {
    console.log(data.toString());
    client.end();
  });
  client.on('end', () => {
    console.log('disconnected from server');
  });
  */