from flask import Flask, request, jsonify, abort
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests

from utils import MessageStore, GPTInstance

load_dotenv()
app = Flask(__name__)
CORS(app, support_credentials=True)
app.secret_key = 'random secret key!'
socketio = SocketIO(app, cors_allowed_origins="*")
message_store = MessageStore()
gpt_instance = GPTInstance(debug=True)

@socketio.on('connect')
def handle_connect():
    print(request.sid)
    print('Client connected')
    emit('connected', {'data': f'{request.sid} is connected'})

@socketio.on('data')
def handle_message(data):
    """event listener when client types a message"""
    print("data from the front end: ",data)
    sessionId = data['sessionId']
    new_message = ""
    if data['transcribedList'] and 'text' in data['transcribedList'][-1]:
        new_message = data['transcribedList'][-1]['text']

    # add the message to the message store
    message_store.add_message(data)

    # process the message with llm
    ai_response = gpt_instance.process_message(new_message)
    if ai_response != "":
        # add the ai response to the message store
        message_store.add_ai_message({
            'sessionId': sessionId,
            'aiMessage': ai_response
        })

        # emit the ai response to the client
        emit('ai-response', {
            'aiMessage': ai_response
        })


@app.route("/api/get-messages", methods=["GET"])
def get_messages():
    sessionId = request.form.get('sessionId') # must be x-www-form-urlencoded
    messages = message_store.get_messages(sessionId)
    return jsonify(messages)

@app.route("/api/get-token", methods=["GET"])
def get_token():
    speechKey = os.environ.get('SPEECH_KEY')
    speechRegion = os.environ.get('SPEECH_REGION')

    if (speechKey == '' or speechRegion == ''):
        abort(400, description="You forgot to add your speech key or region to the .env file.")
    else:
        headers = {
            'Ocp-Apim-Subscription-Key': speechKey,
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        try:
            token_url = f'https://{speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken'
            token_response = requests.post(token_url, headers=headers)
            token_data = token_response.text.strip()

            return jsonify({
                'token': token_data,
                'region': speechRegion
            })
        except requests.exceptions.RequestException as e:
            abort(500, description=str(e))

@app.errorhandler(400)
def bad_request(error):
    return jsonify({
        "error": "Bad Request",
        "message": error.description
    }), 400

@app.errorhandler(500)
def bad_request(error):
    return jsonify({
        "error": "Internal Server Error",
        "message": error.description
    }), 500

if __name__ == '__main__':
    port = 9000
    print('Server is running on http://localhost:{}/'.format(port))
    socketio.run(app, host="0.0.0.0", port=port)