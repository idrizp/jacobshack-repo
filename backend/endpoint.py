from flask import Flask, jsonify
from leaderboard import leaderboard
from barcode import get_score

app = Flask(__name__)

@app.route("/leaderboard/<int:page>")
def get_leaderboard_page(page):
    return jsonify({
        "page" : page,
        "persons": get_leaderboard_page(page)
    })

@app.route("/leaderboard/<int:score>")
def get_leaderboard_score(score):
    return jsonify({
        "name" : "name",
        "points" : get_leaderboard_score(score)
    })