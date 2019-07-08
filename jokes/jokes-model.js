const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findById,
  remove
};

function find() {
  return db("jokes").select("id", "joke");
}

function findById(id) {
  return db("jokes")
    .select("id", "joke")
    .where({ id })
    .first();
}

async function add(joke) {
  const [id] = await db("jokes").insert(joke);

  return findById(id);
}

function remove(id) {
  return db("jokes")
    .where({ id })
    .del();
}
