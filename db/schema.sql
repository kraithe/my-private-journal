CREATE DATABASE entries;

CREATE TABLE journal_entries (
  entry_id SERIAL PRIMARY KEY,
  entry_text TEXT,
  entry_created TEXT,
  entry_modified TEXT
);