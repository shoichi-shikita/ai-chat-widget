// main.js
document.getElementById('send-btn').addEventListener('click', async () => {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    appendMessage('user', text);
    input.value = '';

    const clientId = 'shop123'; // 仮固定、あとで動的に変更可

    const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, client_id: clientId })
    });

    const data = await response.json();
    appendMessage('bot', data.reply);
});

function appendMessage(sender, message) {
    const log = document.getElementById('chat-log');
    const div = document.createElement('div');
    div.className = sender;
    div.textContent = `${sender === 'user' ? '👤' : '🤖'} ${message}`;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
}
