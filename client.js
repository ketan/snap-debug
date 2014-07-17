console.log(process.env.URL)
var socket = require('socket.io-client')(process.env.URL);

socket.on('connect', function() {
  console.log('connected...');

  socket.on('command-to-run', function(data) {
    console.log('got event' + data)
  });

  socket.on('disconnect', function() {
    console.log('disconnecting...')
  });
});
