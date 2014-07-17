console.log(process.env.URL)
var socket = require('socket.io-client')(process.env.URL);
var spawn = require('child_process').spawn;
var sys = require('sys')

socket.on('connect', function() {
  console.log('connected...');

  socket.on('command-to-run', function(command) {
    console.log(' $ ' + command)

    var cmd = spawn("bash", ["-c", command]);

    cmd.stdout.on('data', function(data) {
      sys.print(data);
    });

    cmd.stderr.on('data', function(data) {
      sys.print(data);
    });

    cmd.on('close', function(code) {
      console.log('child process exited with code ' + code);
    });

    cmd.on('error', function(err){
      console.log(err)
    })

  });

  socket.on('disconnect', function() {
    console.log('disconnecting...')
  });
});
