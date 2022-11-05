from flask import Flask, jsonify, request

app = Flask(__name__)

page = 1

person = [
    {"name": "userName", "points": 100}
]

leaderboard = [
    {"page": page, "persons": person}
]

@app.route("/leaderboard/{page}")
def get_leaderbaord():
    return jsonify(leaderboard)

@app.route("/leaderboard", methods=['POST'])
def add_leaderbaord():

    persons.append(request.get_json())

    return '', 204
