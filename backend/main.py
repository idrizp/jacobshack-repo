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

# done by: uncrownedking1
# route to get a name and image as input
@app.route("/leaderboard/entry", methods = 'POST')
def entry():
    # getting input with name = name in HTML form
    name = request.form.get("name")
    # getting input with image = image in HTML form
    image = request.files.get("image")
    # returning name and image side-by-side
    return name + image

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
