const { Client } = require("pg");
const fs = require("fs");

let dburl = `postgres://postgres:123@localhost:6543/postgres`;
// let dburl = `postgres://dockernetworkdemo:123@localhost:5432/dockernetworkdemo`;

console.log(dburl);

const client = new Client({
  connectionString: dburl,
});

async function migrate() {
  try {
    console.log("migration initialized");

    await client.connect();
    console.log("connected to database");

    let script = fs.readFileSync(__dirname + "/db.sql").toString();

    console.log(script);

    let query = {
      text: script,
      values: [],
    };

    let res = await client.query(query);
    console.log(res.command);
    console.log(res.rowCount);
    await client.end();
    console.log("disconnected from database");
    console.log("migration ran successfully");
  } catch (e) {
    console.log(e);
    console.error("error occured \ncould not run migration successfully");
    console.log(e.message);
    process.exit(1);
  }
}

migrate()
  .then(() => process.exit())
  .catch((err) => console.error(err));
