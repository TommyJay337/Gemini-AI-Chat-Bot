// Function to send message and display it in chat
function sendMessage() {
  const input = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const userText = input.value.trim();

  if (userText) {
      // Display user message
      const userMessage = document.createElement('div');
      userMessage.textContent = `User: ${userText}`;
      userMessage.classList.add('user-message');
      chatBox.appendChild(userMessage);
      
      // Clear the input field
      input.value = '';

      // Send message to server and get response
      fetch('http://127.0.0.1:5000/sendMessage', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userText }),
      })
      .then(response => response.json())
      .then(data => {
          // Display bot response
          const botMessage = document.createElement('div');
          botMessage.textContent = `Bot: ${data.answer}`;
          botMessage.classList.add('bot-message');
          chatBox.appendChild(botMessage);
          
          // Scroll to the last message
          chatBox.scrollTop = chatBox.scrollHeight;
      })
      .catch(error => {
          console.error('Error:', error);
          // Display error message in chatBox or alert
      });
  }
}

// Event listener for the Enter key
document.getElementById('user-input').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form from being submitted
      sendMessage();
  }
});

// Event listener for click on the Send button
document.querySelector('.input-area button').addEventListener('click', function() {
  sendMessage();
});

