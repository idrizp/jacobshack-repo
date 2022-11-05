from db import db
from sqlite3 import Connection, IntegrityError
import bcrypt

class User:
    def __init__(self, user_id: int, username: str, password: str):
        self.user_id = user_id
        self.username = username
        self.password = password


def create_user(username: str, password: str, connection: Connection) -> User | None:
    # db.query_db(connection, "INSERT INTO users(username, password) VALUES (?, ?)")
    hashed_password = bcrypt.hashpw(password.encode("utf-8"),  bcrypt.gensalt())
    with connection:
        try: 
            id = connection.execute("INSERT INTO users(username, password) VALUES (?, ?) RETURNING user_id", (
                username, 
                hashed_password
            ))
            return User(id, username, password)
        except IntegrityError:
            return None

