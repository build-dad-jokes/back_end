const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findById,
  update,
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

function update(id, changes) {
  return db("jokes")
    .where({ id })
    .update(changes)
    .then(() => {
      return db("jokes")
        .where({ id })
        .first();
    });
}

function remove(id) {
  return db("jokes")
    .where({ id })
    .del();
}
