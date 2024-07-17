require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuração básica do Socket.io
io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    socket.on('chat message', (msg) => {
        console.log('Mensagem recebida: ', msg);
        io.emit('chat message', msg); // Envia a mensagem de volta para todos os clientes conectados
    });
});

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor Socket.io escutando na porta ${PORT}`);
});
