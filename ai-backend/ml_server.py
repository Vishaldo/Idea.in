from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)

@app.route('/health', methods=['GET'])
def health_check():
    logging.info("Health check endpoint called.")
    return jsonify({"status": "Server is running"}), 200

@app.route('/analyze', methods=['POST'])
def analyze_idea():
    data = request.get_json()
    idea = data.get('idea', '')

    if not idea:
        logging.error("No idea provided in the request.")
        return jsonify({"error": "Idea is required"}), 400

    if len(idea) > 500:
        logging.error("Idea is too long.")
        return jsonify({"error": "Idea is too long. Please limit it to 500 characters."}), 400

    logging.info(f"Received idea: {idea}")

    # Custom AI logic to analyze the idea
    problem_statement = "General Problem"
    prizing = "$5,000 - General Value"

    if "environment" in idea.lower():
        problem_statement = "Environmental Problem - The idea addresses environmental issues."
        prizing = f"${len(idea) * 100} - High Value"
    elif "education" in idea.lower():
        problem_statement = "Educational Problem - The idea focuses on improving education."
        prizing = f"${len(idea) * 80} - Medium Value"
    elif "health" in idea.lower():
        problem_statement = "Healthcare Problem - The idea aims to improve healthcare systems."
        prizing = f"${len(idea) * 120} - Very High Value"
    elif "technology" in idea.lower():
        problem_statement = "Technological Problem - The idea involves technological innovation."
        prizing = f"${len(idea) * 150} - Extremely High Value"

    logging.info(f"Problem Statement: {problem_statement}")
    logging.info(f"Prizing: {prizing}")

    return jsonify({
        "problemStatement": problem_statement,
        "prizing": prizing
    })

if __name__ == '__main__':
    app.run(port=5001)