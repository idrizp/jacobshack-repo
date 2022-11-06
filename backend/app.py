from flask import Flask, g, request, jsonify
from flask_cors import CORS
from db import db
from barcode import checker

app = Flask(__name__)

import auth_endpoints
import endpoint
import middleware.auth_middleware

CORS(app)

# done by: uncrownedking1
# route to get a name and image as input
@app.route("/leaderboard/entry", methods = ['POST'])
def entry():


    # this is not safe and the client can exploit this, this is a hackathon kshtuqe mos ma thij vllaqko 

    # calling the save_barcode() from check and using it 
    if checker.save_barcode(g.user.user_id, request.json["data"], db.get_db()):
        return jsonify({"success": "You have successfully added an entry."}), 200
    return jsonify({ "error": "Couldn't accept barcode." }), 400


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

