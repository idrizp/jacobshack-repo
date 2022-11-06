import sqlite3
from db.db import query_db

def get_top_scores(database: sqlite3.Connection, page: int):
    with database:
        rows = query_db(database,          
            """
            SELECT 
                users.user_id, 
                users.username,
            COUNT(used_barcodes.user_id) AS barcodes_used 
                FROM users 
            LEFT JOIN used_barcodes ON users.user_id = used_barcodes.user_id 
                GROUP BY users.user_id 
                ORDER BY barcodes_used DESC
            LIMIT 10
            OFFSET ? * 10
            """,
            (page,),
            one=False
        )
        print(rows)
        # Map every tuple in rows to a dictionary
        return list(map(lambda row: { "user_id": row[0], "username": row[1], "score": row[2] }, rows))