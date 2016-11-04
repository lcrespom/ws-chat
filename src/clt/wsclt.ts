let url = 'ws://' + location.hostname + ':' + location.port;
let ws = new WebSocket(url);
ws.onmessage = m => console.log('=> Web socket message:', m.data);
