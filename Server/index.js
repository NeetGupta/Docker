const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());

io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('chat', (msg) => {
    io.emit('chat', msg); // Broadcast message
  });
});

app.get('/', (req, res) => res.send('Server is running'));

server.listen(5000, () => console.log('Server on port 5000'));
