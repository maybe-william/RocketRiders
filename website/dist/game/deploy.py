#!/usr/bin/python3
from flask import Flask, render_template
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route('/', strict_slashes=False)
def deploy():
    return render_template("index.html")

if __name__ == '__main__':
    app.run()

