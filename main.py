import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

genai.configure(
    api_key = os.getenv('GEMINI_API_KEY')
)

model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history = [])

while True:
    question = input('You: ')

    if question == ['exit', 'quit', 'bye', 'goodbye','']:
        break

    response = chat.send_message(question)
    print(f"Bot: {response.text}")
