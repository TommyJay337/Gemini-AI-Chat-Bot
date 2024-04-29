from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
load_dotenv()

genai.configure(
    api_key=os.getenv('GEMINI_API_KEY')
)

model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])

@app.route('/sendMessage', methods=['POST'])
def get_message():
    user_input = request.json['message']
    response = chat.send_message(user_input)
    return jsonify({'answer': response.text})

if __name__ == '__main__':
    app.run(debug=True)

