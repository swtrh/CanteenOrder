var http = require('http');
var port = process.env.PORT || 13337;

var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
});

// Make server list on 'port'
server.listen(port);
