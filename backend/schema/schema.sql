-- table for usernames and passwords
-- add index on hash

CREATE TABLE used_barcodes(
    user_id INT NOT NULL,
    barcode_hash TEXT NOT NULL
);