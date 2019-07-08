const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findById,
  remove
};

function find() {
  return db("users").select("id", "username");
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}
