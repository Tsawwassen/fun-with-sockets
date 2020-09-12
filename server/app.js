{//Express created code
    var express = require('express');
    var path = require('path');
    var cookieParser = require('cookie-parser');
    var logger = require('morgan');
}
const http = require("http");
const socketIo = require("socket.io");

const SOCKET_PORT = 5001;

{//Express created code
    var indexRouter = require('./routes/index');
    var usersRouter = require('./routes/users');
}
var socketRouter = require('./routes/socket');

var app = express();

{//Express created code
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
}
{//Express created code
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
}
app.use('/socket', socketRouter);

{//Socket Code from https://www.valentinog.com/blog/socket-react/
//Dev Note, not sure if this is where the code should be. there is similar code in the bin/www fine (example 'var server = http.createServer(app)')
//// Atm, you can make a get request to port 5000/socket and 5001/socket both get into the routes/socket.js file
const server = http.createServer(app);

const io = socketIo(server); 

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(SOCKET_PORT, () => console.log(`Listening on port ${SOCKET_PORT}`));
}

module.exports = app;
