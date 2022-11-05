from flask import Flask, jsonify, request, g

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


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()