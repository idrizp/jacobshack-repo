from main import app
from flask import request, jsonify, g
from db import db
from auth import auth

protected_endpoints = [
    "/leaderboard/entry",
    "/me"
]

@app.before_request
def before_request():
    if request.path in protected_endpoints:
        token = request.headers.get("Authorization")
        if token is None:
            return jsonify({ "error": "Missing token" }), 401
        user = auth.get_user(token[7:])
        if user == None:
            return jsonify({ "error": "Invalid token" }), 401
        g.user = user