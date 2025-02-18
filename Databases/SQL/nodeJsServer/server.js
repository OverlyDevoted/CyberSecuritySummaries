const pg = require("pg");
const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "lol",
  port: 5432,
});

async function insert() {
  const { rows } = await pool.query(`SELECT * FROM ingredients`);
  console.log(rows);
}

insert();
pool.end();
