from flask import Flask, jsonify

app = Flask(__name__)

page = 1

persons = [
    {'name' : 'name', 'points' : 100}
]

leaderboard = [
    {'page' : page, 'persons' : persons}
]

@app.route("/leaderboard")
def get_leaderboard():
    return jsonify(leaderboard)


