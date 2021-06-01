import { query } from "../db/con";

export async function getUsers() {
  let quearyObject = { text: "select id , username from users" };
  let users = await query(quearyObject);
  return users.rows;
}
