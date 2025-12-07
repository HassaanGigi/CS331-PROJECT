from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS = CORS(app)   

@app.route("/api/hello")
def hello():
    return jsonify({"message": "Hello from Flask!"})

if __name__ == "__main__":
    app.run(debug=True)
