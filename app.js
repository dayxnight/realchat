const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const usernameInput = document.getElementById('username');

let username = localStorage.getItem('chatUsername') || "Anonymous";
usernameInput.value = username;

usernameInput.addEventListener('input', (e) => {
    username = e.target.value || "Anonymous";
    localStorage.setItem('chatUsername', username);
});

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() !== "") {
        const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        const newMessage = {
            username: username,
            message: message,
            timestamp: new Date().toISOString()
        };
        messages.push(newMessage);
        localStorage.setItem('chatMessages', JSON.stringify(messages));
        messageInput.value = '';
        displayMessages();
    }
});

function displayMessages() {
    chatMessages.innerHTML = '';
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.forEach((messageData) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.innerHTML = `<span>${messageData.username}:</span> ${messageData.message}`;
        chatMessages.appendChild(messageElement);
    });
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

setInterval(displayMessages, 1000);
displayMessages();
