from flask import Flask, jsonify
from leaderboard import leaderboard
from barcode import score
from main import app
from db import get_db

@app.route("/leaderboard/<int:page>")
def get_leaderboard_page(page):
    return jsonify({
        "page" : page,
        "persons" : get_leaderboard_page(page)
    })

@app.route("/me")
def get_leaderboard_score(score):
    dataBase = get_db()
    return jsonify({
        # 0 is placeholder for userID
        "points" : score.get_score(0, dataBase)
    })