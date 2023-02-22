const WebSocket = require('ws');

const ws = new WebSocket('ws://127.0.0.1:8899','pair.sp.nanomsg.org');
ws.binaryType = "arraybuffer";

ws.on('open', function open() {
  //ws.send('clientsend');
  console.log("open")
});

ws.on('message', function incoming(data) {
  //console.log(data);
  console.log("onmsg");
});

var bytes = [55,55,55,55,55,55]

setTimeout(()=>{

  var buffer = new ArrayBuffer(bytes.length + 4);
  var view = new DataView(buffer);
  view.setUint32(0, bytes.length);
  for (var i = 0; i < bytes.length; i++) {
      view.setUint8(i, bytes[i]);
  }
  console.log(view.getUint8(0))
  ws.send(view);
  console.log("end")
},3000)
