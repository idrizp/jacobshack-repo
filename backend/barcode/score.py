import sqlite3
import db.db

# Used to get the score of an individual user
def get_score(user_id: int, database: sqlite3.Connection) -> int:
    row = db.query_db(database, "SELECT COUNT(user_id) AS score FROM used_barcodes WHERE user_id=?", user_id, one=True)
    return row["score"]

"""
    SELECT COUNT(user_id) AS score FROM used_barcodes
    ORDER BY score DESC
    LIMIT 10
    OFFSET ? * 10
"""