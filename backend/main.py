from flask import Flask, jsonify, request, g
import auth_endpoints
import endpoint
from db import db
from barcode import checker

app = Flask(__name__)

# done by: uncrownedking1
# route to get a name and image as input
@app.route("/leaderboard/entry", methods = 'POST')
def entry():
    # getting input with image = image in HTML form
    image = request.files.get("image")
    # calling the save_barcode() from check and using it 
    if checker.save_barcode(user_id, image, db.get_db()):
        return jsonify({"success": "You have successfully added an entry."}), 200
    return jsonify({ "error": "Couldn't accept barcode." }), 400


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
