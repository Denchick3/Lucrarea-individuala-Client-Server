const username = prompt('Introdu un nume:');
const socket = io();  // Inițializează socketul aici, după ce ai primit numele utilizatorului

function openChat(chatId, recipient) {
  var chatElement = document.getElementById(chatId);
  chatElement.style.display = "block";
  chatElement.setAttribute("data-recipient", recipient);
}

function sendMessage(chatId) {
  var chatElement = document.getElementById(chatId);
  var messageInput = chatElement.getElementsByClassName("message-input")[0];
  var messageText = messageInput.value;
  var recipient = chatElement.getAttribute("data-recipient");

  if (messageText.trim() !== "") {
    var chatMessages = chatElement.getElementsByClassName("chat-messages")[0];
    var newMessage = document.createElement("div");
    newMessage.innerHTML = "<strong>You:</strong> " + messageText;
    chatMessages.appendChild(newMessage);

    // Trimite mesajul către server, specificând destinatarul (chatId)
    sendMessageToServer(chatId, messageText, recipient);

    // Clear the input field after sending the message
    messageInput.value = "";
  }
}

function sendMessageToServer(chatId, messageText, recipient) {
  console.log('Sending message to server:', { chatId, messageText, recipient });  // Debug

  // Trimite mesajul către server
  socket.emit('chat message', { chatId, messageText, to: recipient, from: username });
}

socket.on('chat message', function (msg) {
  var chatMessages = document.getElementById(msg.chatId).getElementsByClassName("chat-messages")[0];
  var newMessage = document.createElement("div");
  newMessage.innerHTML = `<strong>${msg.from}:</strong> ${msg.messageText}`;
  chatMessages.appendChild(newMessage);
});


