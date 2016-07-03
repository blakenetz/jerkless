var io = require('socket.io')();

io.on('connection', function(socket) {
  console.log('connected');

  socket.on('route', function (response) {
    console.log(response);
  })

})


module.exports = io;
