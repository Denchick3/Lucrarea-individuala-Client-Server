const urlParams = new URLSearchParams(window.location.search);

const socket = io();

let username = null; // Variabila pentru a stoca numele de utilizator

function openChat(chatId) {
  if (username) {
    const chatBox = document.getElementById(chatId);
    if (chatBox) {
      chatBox.style.display = 'block';
    } else {
      console.error(`Elementul cu ID-ul '${chatId}' nu a fost găsit.`);
    }
  } else {
    alert('Introduceți un nume de utilizator pentru a intra în chat.');
  }
}

function connectUser() {
  const usernameInput = document.getElementById('username');
  username = usernameInput.value;

  if (username) {
    // Ascunde forma de introducere a numelui de utilizator
    const usernameForm = document.querySelector('.username-form');
    usernameForm.style.display = 'none';

    // Actualizează elementul DOM pentru a afișa numele utilizatorului în antetul chat-ului
    const chat1Username = document.getElementById('chat1-username');
    chat1Username.textContent = username;
  } else {
    alert('Introduceți un nume de utilizator pentru a intra în chat.');
  }
}

function closeChat(chatId) {
  // Închideți chat-ul selectat
  const chatBox = document.getElementById(chatId);
  chatBox.style.display = 'none';
}

   socket.on('chat message', ({ chatId, message }) => {
        const chatMessages = document.querySelector(`#${chatId} .chat-messages`);
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
      });

function sendMessage(chatId) {
  if (username) {
    const messageInput = document.querySelector(`#${chatId} .message-input`);
    const message = messageInput.value;

    if (message) {
      // Construiți mesajul care include numele utilizatorului
      const fullMessage = `${username}: ${message}`;

      // Trimiteți mesajul la server
      socket.emit('chat message', { chatId, message: fullMessage, username });

   

      // Goliți câmpul de introducere
      messageInput.value = '';
    }
  } else {
    alert('Introduceți un nume de utilizator pentru a trimite un mesaj.');
  }
}