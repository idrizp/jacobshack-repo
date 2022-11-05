from typing import Tuple
from db import db
from sqlite3 import Connection, IntegrityError
import bcrypt
import jwt

# this is a hackathon, fuck off
JWT_SECRET = "supersecretkey"

class User:
    def __init__(self, user_id: int, username: str, password: str):
        self.user_id = user_id
        self.username = username
        self.password = password

def create_user(username: str, password: str, connection: Connection) -> Tuple[User, str] | None:
    # db.query_db(connection, "INSERT INTO users(username, password) VALUES (?, ?)")
    hashed_password = bcrypt.hashpw(password.encode("utf-8"),  bcrypt.gensalt())
    with connection:
        try: 
            id = db.query_db(connection, "INSERT INTO users(username, password) VALUES (?, ?) RETURNING user_id", (
                username, 
                hashed_password
            ), one=True)
            
            token = jwt.encode({"username": username, "user_id": id}, JWT_SECRET, algorithm="HS256")
            return (User(id, username, password), token)
        except IntegrityError:
            return None

def login(username: str, password: str, connection: Connection) -> str | None:
    with connection:
        row = db.query_db(connection, "SELECT FROM users(user_id, password) WHERE LOWER(username)=LOWER(?)", (username), one=True)
        if row == None:
            return None
        if not bcrypt.checkpw(password.encode("utf-8"), row["password"].encode("utf-8")):
            return None
        return jwt.encode({
            "username": row["username"],
            "user_id": row["user_id"],
        }, 
        JWT_SECRET, 
        algorithm="HS256")
