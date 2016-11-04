let server = require('http').createServer();
let url = require('url');
let WebSocketServer = require('ws').Server;

let express = require('express');
let app = express();
let port = 1337;

// -------------------- HTTP server --------------------
let index_html = `
<html>
<head>
	<meta charset="UTF-8">
	<title>WebSockets chat</title>
	<script src="https://code.jquery.com/jquery-3.0.0.js"></script>
</head>
<body>
	Welcome to ws-chat
</body>
</html>
`;

app.use(function (req, res) {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end(index_html);
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
	console.log('connection from', ws);
	ws.send('hello');
});

// -------------------- Server startup --------------------
server.on('request', app);
server.listen(port, _ => {
	console.log('Listening on ' + server.address().port);
});
