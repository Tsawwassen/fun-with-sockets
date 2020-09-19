{//Express created code
    var express = require('express');
    var path = require('path');
    var cookieParser = require('cookie-parser');
    var logger = require('morgan');
}

const http = require("http");
const SOCKET_PORT = 5001;
const io = require("socket.io")(SOCKET_PORT);



{//Express created code
    var indexRouter = require('./routes/index');
    var usersRouter = require('./routes/users');
}
//TODO : Dont think i need the socket route
//var socketRouter = require('./routes/socket');

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
//TODO : Dont think i need the socket route
//app.use('/socket', socketRouter);

{//Socket Code from https://www.valentinog.com/blog/socket-react/
//Chat code from https://www.youtube.com/watch?v=rxzOqP9YwmM&t=548s
//Dev Note, not sure if this is where the code should be. there is similar code in the bin/www fine (example 'var server = http.createServer(app)')
//// Atm, you can make a get request to port 5000/socket and 5001/socket both get into the routes/socket.js file

//let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
{ /* Start simple socket code here */
//   if (interval) {
//     clearInterval(interval);
//   }

//   interval = setInterval(() => getApiAndEmit(socket), 1000);

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });

//     socket.on('FromClient', ()=>{
//         console.log('message received from client');
//         socket.emit("FromAPI", 'someone clicked the button');
//         clearInterval(interval);
//     });
 /* End simple socket code here */}

    socket.on('button-click-from-client', data => {
        console.log(data);
        socket.broadcast.emit('button-click-from-server', data); //socket.broadcast.emit will send a message to all clients listening on the socket, except the client that sent the original message to the server
    })

});


const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

/**Socket code end */}

module.exports = app;
