from flask import Flask, url_for, send_file

app = Flask(__name__, static_url_path="/", static_folder='frontend')


@app.route('/')
def index():
    return send_file('frontend/index.html')
