let server = require('http').createServer();
let WebSocketServer = require('ws').Server;

let express = require('express');
let app = express();
let port = 1337;

// -------------------- HTTP server --------------------

app.use(function (req, res) {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.sendFile(process.cwd() + '/web' + req.url);
});

// -------------------- WS server --------------------
let wss = new WebSocketServer({ server });
wss.on('connection', function connection(ws) {
	ws.on('message', function incoming(message) {
		console.log('received: %s', message);
		for (let clt of wss.clients)
			if (clt != ws)
				clt.send(message);
	});
	console.log('connection from WebSocket', ws && ws.upgradeReq ? ws.upgradeReq.headers : '');
	ws.send('hello');
});

// -------------------- Server startup --------------------
server.on('request', app);
server.listen(port, _ => {
	console.log('Listening on ' + server.address().port);
});
