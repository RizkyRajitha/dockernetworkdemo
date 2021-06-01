import { query } from "../db/con";

export async function getUsers() {
  let quearyObject = { text: "select id , username from users" };
  try {
    let users = await query(quearyObject);
    return users.rows;
  } catch (error) {
    // console.log(error);
    throw new Error(error.message);
  }
}
