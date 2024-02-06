const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('user-input');

function sendMessage() {
    const userMessage = userInput.value;
    displayMessage('user', userMessage);
    fetchChatGPTResponse(userMessage);
    userInput.value = '';
}

function displayMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = `<p>${message}</p>`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function fetchChatGPTResponse(userMessage) {
    const apiKey = 'Your Key';
    const endpoint = 'https://api.openai.com/v1/chat/completions';

    const data = {
        model: 'text-davinci-003',
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userMessage }
        ]
    };

    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(data)
    })
    .then(
        response => response.json())
    .then(
        data => {
        const chatGPTResponse = data.choices[0].message.content;
        displayMessage('chatbot', chatGPTResponse);
    })
    .catch(
        error => console.error('Erreur lors de la communication avec l\'API ChatGPT', error));
}

