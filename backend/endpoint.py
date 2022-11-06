from flask import Flask, jsonify, g
from leaderboard import leaderboard
from barcode import score
from app import app
from db.db import get_db

@app.route("/leaderboard/<int:page>")
def get_leaderboard_page(page):
    persons = leaderboard.get_top_scores(get_db(), page - 1)
    print(persons)
    return jsonify({ "page" : page, "persons" :  persons}), 200

@app.route("/me")
def get_leaderboard_score():
    return jsonify({ "points" : score.get_score(g.user.user_id, get_db()) }), 200