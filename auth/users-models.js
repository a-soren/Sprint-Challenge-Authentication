const db = require("../database/dbConfig");

module.exports = { add, getBy };

async function add(userData) {
  const [id] = await db("users").insert(userData);

  return db("users")
    .where({ id })
    .first();
}

async function getBy(filter) {
  return db("users")
    .where(filter)
    .first();
}