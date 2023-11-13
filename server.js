const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configurați serverul pentru a asculta pe un anumit port (de exemplu, 3000)
server.listen(8000, '0.0.0.0', () => {
  console.log('Serverul de chat rulează pe portul 8000');
});

io.on('connection', (socket) => {
  console.log('Utilizator conectat');

  // Ascultați evenimentul 'chat message' și trimiteți mesajul către toți utilizatorii
  socket.on('chat message', ({ chatId, message, username }) => {
    io.emit('chat message', { chatId, message, username });
  });

  socket.on('disconnect', () => {
    console.log('Utilizator deconectat');
  });
});

app.get('/chat/:chatId', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/', (req, res) => {
  // Returnați pagina HTML pentru ruta "/"
  res.sendFile(__dirname + '/public/index.html');
});

// Pentru fișierul style.css
app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/public/style.css');
});

// Pentru fișierul script.js
app.get('/script.js', (req, res) => {
  res.sendFile(__dirname + '/script.js');
});