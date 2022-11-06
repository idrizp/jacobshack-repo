import sqlite3
from db.db import query_db

def get_top_scores(database: sqlite3.Connection, page: int):
    with database:
        rows = query_db(database,          
            """
                SELECT ub.user_id, u.username, COUNT(ub.user_id) AS score FROM used_barcodes ub
                LEFT JOIN users u ON u.user_id = ub.user_id
                ORDER BY score DESC
                LIMIT 10
                OFFSET ? * 10
            """,
            (page,),
            one=False
        )
        # Map every tuple in rows to a dictionary
        return list(map(lambda row: { "user_id": row[0], "username": row[1], "score": row[2] }, rows))