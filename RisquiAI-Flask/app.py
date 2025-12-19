from flask import Flask
from routes.perfumes_routes import perfume_bp

app = Flask(__name__)

# Register blueprint for perfume routes
app.register_blueprint(perfume_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)
