import sqlite3
from flask import g
DATABASE = "db.sqlite"

# Easier query function
def query_db(conn: sqlite3.Connection, query, args=(), one=False):
    with conn:
        cur = conn.execute(query, args)
        rv = cur.fetchall()
        cur.close()
        return (rv[0] if rv else None) if one else rv

# Opens the database
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db 
