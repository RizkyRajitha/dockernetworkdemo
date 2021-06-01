import express from "express";
import mogan from "morgan";
import { getUsers } from "./dbfunc/user";

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mogan("dev"));

app.get("/", (req, res) => {
  res.json({ nani: 10 });
});

app.get("/users", async (req, res) => {
  let users = await getUsers();
  res.json({ users });
});

app.listen(PORT, () => {
  console.log("listning");
});
