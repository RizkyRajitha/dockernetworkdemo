import express from "express";
import mogan from "morgan";
import { getUsers } from "./dbfunc/user";

const app = express();

const PORT = process.env.PORT || 5000;

// console.log(process.env);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mogan("dev"));

app.get("/", (req, res) => {
  res.json({ nani: 10 });
});

app.get("/users", async (req, res) => {
  let users;
  try {
    users = await getUsers();
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
    return;
  }
  res.json({ users });
});

app.listen(PORT, () => {
  console.log(`listning on ${PORT}`);
});
