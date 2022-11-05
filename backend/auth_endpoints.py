from main import app
from db import db
from flask import request, jsonify
from auth import auth

@app.route("/login", methods="POST")
def login():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    if not username or not password:
        return jsonify({ "error": "Missing username or password "}), 400
    result = auth.login(username, password, db.get_db())
    if result == None:
        return jsonify({ "error": "Invalid username/password "}), 401

    return jsonify({ "token": result }), 200
    

@app.route("/login", methods="POST")
def register():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    if not username or not password:
        return jsonify({ "error": "Missing username or password" }), 400
    
    result = auth.create_user(username, password, db.get_db())
    if result == None:
        return jsonify({ "error": "User already exists." }), 409

    return jsonify({ "token": result[1] }), 200
