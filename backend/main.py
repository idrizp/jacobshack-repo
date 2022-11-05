from flask import Flask, jsonify, request, g

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


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
