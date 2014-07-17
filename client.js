var socket = require('socket.io-client')('http://localhost:3000');

socket.on('connect', function() {
  console.log('connected...');

  socket.on('event', function(data) {
    console.log('got event')
  });

  socket.on('chat message', function(data) {
    console.log('got event' + data)
  });

  socket.on('disconnect', function() {
    console.log('disconnecting...')
  });
});
