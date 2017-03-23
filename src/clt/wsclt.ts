let url = 'ws://' + location.hostname + ':' + location.port;
let ws = new WebSocket(url);
ws.onmessage = m => console.log('=> Web socket message:', m.data);
console.log('Type ws.send("message text") to send a message');
