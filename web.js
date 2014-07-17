var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var logfmt = require('logfmt');
app.use(logfmt.requestLogger());
var port = Number(process.env.PORT || 5000);

app.get('/', function(req, res) {
  res.sendfile('index.html');
});

io.on('connection', function(socket) {
  socket.on('command-to-run', function(msg) {
    console.log('message: ' + msg);
    io.emit('command-to-run', msg);
  });
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});
