import sqlite3

def get_top_scores(database: sqlite3.Connection, page: int):
    with database:
        rows = database.query_db(database,          
            """
                SELECT COUNT(user_id) AS score FROM used_barcodes
                ORDER BY score DESC
                LIMIT 10
                OFFSET ? * 10
            """,
            (page),
            one=False
        )
        return rows