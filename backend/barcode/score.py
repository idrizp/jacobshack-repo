import sqlite3
from db.db import query_db

# Used to get the score of an individual user
def get_score(user_id: int, database: sqlite3.Connection) -> int:
    row = query_db(database, "SELECT COUNT(user_id) AS score FROM used_barcodes WHERE user_id=?", (user_id,), one=True)
    return row[0]