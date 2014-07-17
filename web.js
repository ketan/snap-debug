var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var logfmt = require('logfmt');

app.use(logfmt.requestLogger());
app.set('views', __dirname);

app.set('view engine', 'ejs');

var port = Number(process.env.PORT || 5000);

app.get('/', function(req, res) {
  res.sendfile('index.html');
});

app.get('/debug', function(req, res){
  var baseUrl = req.protocol + '://' + req.get('host');
  var requestUrl = baseUrl + req.originalUrl;
  console.log();
  res.render('debug', { baseUrl: baseUrl, requestUrl: requestUrl });
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
