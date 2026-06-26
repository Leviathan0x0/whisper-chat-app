const path = require('path');
const { generateMessage, generateLocationMessage } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath, { index: false }));

io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options }, (existingId) => !io.sockets.sockets.has(existingId));

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit('message', generateMessage('SYSTEM', `Hello! ${user.username}.`), true);
    socket.broadcast.to(user.room).emit('message', generateMessage('SYSTEM', `${user.username} has joined.`), true);
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    const filter = new Filter();

    if (!user) {
      return callback('User not found!');
    }

    if (filter.isProfane(message)) {
      return callback('Swearing is not allowed.');
    }

    io.to(user.room).emit('message', generateMessage(user.username, message));
    callback();
  });

  socket.on('sendLocation', ({ lat, long }, callback) => {
    const user = getUser(socket.id);

    if (!user) {
      return callback('User not found!');
    }

    io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, lat, long));
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', generateMessage('SYSTEM', `${user.username} has left.`));
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, 'home.html'));
});

app.get('/join', (req, res) => {
  res.sendFile(path.join(publicDirectoryPath, 'index.html'));
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
