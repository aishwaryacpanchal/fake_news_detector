from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend running"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    news = data.get("news")

    if not news:
        return jsonify({"error": "No news provided"})

    # Temporary fake news logic
    if "breaking" in news.lower() or "shocking" in news.lower():
        prediction = "Fake News"
        confidence = 0.82
    else:
        prediction = "Likely Real"
        confidence = 0.35

    return jsonify({
        "prediction": prediction,
        "confidence": confidence
    })

if __name__ == "__main__":
    app.run(debug=True)