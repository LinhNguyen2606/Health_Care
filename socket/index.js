const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

const io = require('socket.io')(8900, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUsers = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
    //when connect
    console.log('a user connected');

    //take userId and socketId from user
    socket.on('addUser', (userId) => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });

    //send and get message
    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
        const user = getUsers(receiverId);
        io.to(user?.socketId).emit('getMessage', {
            senderId,
            text,
        });
    });

    //when disconnect
    socket.on('disconnect', () => {
        console.log('a user disconnected!');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });

    socket.emit('me', socket.id);

    socket.on('disconnect', () => {
        socket.broadcast.emit('callEnded');
    });

    socket.on('callUser', (data) => {
        io.to(data.userToCall).emit('callUser', { signal: data.signalData, from: data.from, name: data.name });
    });

    socket.on('answerCall', (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    });
});

server.listen(5000, () => console.log('Server is running on port 5000'));
