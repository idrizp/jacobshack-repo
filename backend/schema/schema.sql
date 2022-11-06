-- table for usernames and passwords
-- add index on hash

CREATE TABLE used_barcodes(
    user_id INTEGER NOT NULL,
    barcode_hash TEXT NOT NULL
);

CREATE TABLE users(
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE UNIQUE INDEX users_username ON users(username);
CREATE UNIQUE INDEX used_barcodes_barcode_hash ON used_barcodes(barcode_hash);
CREATE INDEX used_barcodes_user_id ON used_barcodes(user_id);