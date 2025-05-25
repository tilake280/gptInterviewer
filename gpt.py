from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)  # Allow cross-origin from React frontend

# Set your OpenAI API key
openai.api_key = 'your-openai-key'

@app.route('/interview', methods=['POST'])
def interview():
    data = request.json
    role = data.get('role', 'Software Engineer')
    answer = data.get('answer', '')
    question = data.get('question', '')

    # Prompt GPT to simulate interviewer feedback
    prompt = f"""
You are a technical interviewer for a {role} position.
The candidate was asked: "{question}"
They responded: "{answer}"

Please evaluate their response in terms of:
- Clarity and confidence
- Relevance and structure (use of STAR method if behavioral)
- Use of technical concepts relevant to {role}
Then give a short overall rating (out of 10).
"""

    response = openai.ChatCompletion.create(
        model='gpt-4',
        messages=[
            {"role": "system", "content": "You are a helpful interview coach."},
            {"role": "user", "content": prompt}
        ]
    )

    feedback = response['choices'][0]['message']['content']
    return jsonify({"feedback": feedback})

if __name__ == '__main__':
    app.run(debug=True)
