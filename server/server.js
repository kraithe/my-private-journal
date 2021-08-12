const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const pool = require('../db/index.js');
const port = 3950;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// ---------- add new entry ----------
app.post('/newEntry', async (req, res) => {

  const queryStr = 'INSERT INTO journal_entries(entry_text, entry_created) VALUES($1, $2) RETURNING *';
  const values = [req.body.entry_text, req.body.entry_created];
  try {
    let newEntry = await pool.query(queryStr, values);
    res.status(200).json(newEntry.rows[0]);
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      data: err.stack
    });
  }
});

// ----------- show all entries ------------
app.get('/entries', async (req, res) => {
  try {
    let entries = await pool.query('SELECT * FROM journal_entries ORDER BY entry_id DESC');
    res.json(entries.rows);
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      data: error
    });
  }
});

// ---------- delete an entry ----------
app.delete('/entry/:id', async (req, res) => {
  try {
    let { id } = req.params;
    let entry = await pool.query("DELETE FROM journal_entries WHERE entry_id = $1", [id]);
    res.json("Entry deleted!");
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      data: error
    });
  }
});

// ---------- edit an entry ----------
app.put('/entry/:id', async (req, res) => {
  try {
    const queryStr = 'UPDATE journal_entries SET entry_text = $1, entry_modified = $2 WHERE entry_id = $3';
    let { id } = req.params;
    let newValues = [req.body.entry_text, req.body.entry_modified, id];
    let updatedEntry = await pool.query(queryStr, newValues);
    res.json("Entry updated!");
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      data: error
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// ---------- show a single entry (unused) ----------
// app.get('/entry/:id', async (req, res) => {
//   try {
//     let { id } = req.params;
//     let entry = await pool.query("SELECT * FROM journal_entry WHERE entry_id = $1", [id]);
//   } catch (err) {
//     res.status(400).json({
//       status: 'Failed',
//       data: err
//     });
//   }
// });