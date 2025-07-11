from flask import Flask, request, send_file, jsonify
from gtts import gTTS
import io
import os

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def serve_index():
    return app.send_static_file('index.html')

@app.route('/api/voiceover', methods=['POST'])
def generate_voice():
    data = request.json
    text = data.get('text', '').strip()

    if not text:
        return jsonify({'error': 'টেক্সট দিতে হবে'}), 400

    try:
        tts = gTTS(text=text, lang='bn')
        mp3_fp = io.BytesIO()
        tts.write_to_fp(mp3_fp)
        mp3_fp.seek(0)
        return send_file(mp3_fp, mimetype='audio/mpeg', as_attachment=True, download_name='voiceover.mp3')
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
