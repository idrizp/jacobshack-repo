from flask import Flask, jsonify, request

app = Flask(__name__)

page = 1

persons = [
    {"name": "userName", "points": 100}
]

leaderboard = [
    {"page": page, "persons": persons}
]

@app.route("/leaderboard/{page}")
def get_leaderboard():
    return jsonify(leaderboard)

@app.route("/leaderboard", methods=['POST'])
def add_leaderboard():

    persons.append(request.get_json())

    return '', 204
