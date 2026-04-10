const messages = [];

const chatDisplay = document.getElementById('chatDisplay');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

function renderMessage(role, content) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', role);
  messageDiv.textContent = content;
  chatDisplay.appendChild(messageDiv);
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

async function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  messages.push({ role: "user", content: text });
  renderMessage("user", text);
  messageInput.value = "";

  renderMessage("assistant", "Thinking...");

  try {
    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });

    const data = await response.json();
    const reply = data.reply || "No response";

    const bubbles = chatDisplay.querySelectorAll('.message.assistant');
    bubbles[bubbles.length - 1].textContent = reply;

    messages.push({ role: "assistant", content: reply });
  } catch (error) {
    console.error(error);

    const bubbles = chatDisplay.querySelectorAll('.message.assistant');
    bubbles[bubbles.length - 1].textContent = "Error connecting to server";
  }
}

sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});