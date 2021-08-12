const { Pool } = require("pg");

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'entries'
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
});

async function execute() {
  try {
    await pool.connect();
    console.log('postgreSQL pool connected successfully!');
  } catch (err) {
    console.log(`Error connecting to postgreSQL pool: ${err}`)
  }
};

execute();

module.exports = pool;