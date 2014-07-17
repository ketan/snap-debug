var socket = require('socket.io-client')(process.env.URL);
var spawn = require('child_process').spawn;
var sys = require('sys');
var path = require('path');
var colors = require('colors');
var pluralize = require('pluralize');

socket.on('connect', function() {
  console.log('Connected to ' + process.env.URL);

  socket.on('command-to-run', function(command) {
    var startTime = new Date();
    console.log((' debug@snap $ ' + command).green);

    if (command == 'exit' || command == 'quit') {
      console.log("Exiting...")
      process.exit(0);
    }

    var cmd = spawn("bash", ["-c", command], {
      cwd: path.join(__dirname, '..', '..')
    });

    cmd.stdout.on('data', function(data) {
      sys.print(data);
    });

    cmd.stderr.on('data', function(data) {
      sys.print(data);
    });

    cmd.on('close', function(code) {
      var endTime = function() {
        var duration = new Date() - startTime;
        if (duration < 1000) {
          return "Took " + duration + "ms.";
        }

        if (duration < 60000){
          var seconds = duration / 1000;
          return "Took " + seconds + " seconds."
        }
        if (duration > 60000) {
          var minutes = Math.floor(duration / 60000);
          var seconds = (duration - minutes * 60000)/1000;
          return "Took " + pluralize('minute', minutes, true) + " " + pluralize("second", seconds, true) + ".";
        }

        return formattedDuration + ".";
      };
      if (code == 0) {
        console.log("Command " + command.green + " exited successfully with status 0. " + endTime())
      } else {
        console.log("Command " + command.green + " failed with status " + code + ". " + endTime());
      }
    });

    cmd.on('error', function(err) {
      console.log(err)
    })

  });

  socket.on('disconnect', function() {
    console.log('disconnecting...')
  });
});
