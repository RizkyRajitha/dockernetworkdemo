import { Pool } from "pg";

console.log(process.env.NODE_ENV);
console.log(process.env.DBURL);

let dburl =
  process.env.DBURL ||
  `postgres://dockernetworkdemo:123@localhost:5432/dockernetworkdemo`;

const pool = new Pool({ connectionString: dburl });

export const query = ({ text, params = [] }) => {
  return new Promise((resolve, reject) => {
    if (!text) {
      reject({ message: "invalid query" });
      return;
    }
    const start = Date.now();
    pool.query(text, params, (err, res) => {
      const duration = Date.now() - start;

      if (process.env.NODE_ENV !== "production") {
        console.log("executed query", {
          text,
          duration,
          top2rows: res ? res.rows.slice(0, 2) || [] : [],
        });
      }

      if (err) {
        // console.log(err);
        reject(err);
        return;
      }
      // console.log(res.command);
      resolve(res);
    });
  });
};
