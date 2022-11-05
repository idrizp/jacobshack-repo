from flask import Flask, jsonify
app = Flask(__name__)

page = 1

persons = [
    {'name' : 'name', 'points' : 100},
    {'name' : 'name', 'points' : 100},
    {'name' : 'name', 'points' : 100},
    {'name' : 'name', 'points' : 100}
]

leaderboard = [
    {'page' : page, 'persons' : persons},
]

@app.route("/leaderboard/<int:page>")
def get_leaderboard(page):

    return jsonify(leaderboard)