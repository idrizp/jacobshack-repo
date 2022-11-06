import hashlib
import sqlite3

# Gets the barcode hash of a barcode image
def get_barcode_hash(data):
    return hashlib.sha256(data.encode("ascii")).hexdigest()

# Saves a barcode, returns false if the barcode already exists.
def save_barcode(user_id: int, data, database: sqlite3.Connection):
    value = get_barcode_hash(data)
    with database:
        try:
            database.execute("INSERT INTO used_barcodes(user_id, barcode_hash) VALUES (?, ?)", (user_id, value))
            database.commit()
            return True
        except sqlite3.IntegrityError:
            return False