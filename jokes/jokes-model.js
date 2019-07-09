const db = require("../data/dbConfig.js");
const jokeHelper = require("./joke-helper.js");

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
  filter
};

function find() {
  let loadJokes = db("jokes");

  return loadJokes.then(jokes => {
    return jokes.map(joke => jokeHelper.convertBoolean(joke));
  });
}

function findById(id) {
  return db("jokes")
    .where({ id })
    .first();
}

function filter() {
  let loadJokes = db("jokes").where({ public: true });
  return loadJokes.then(jokes => {
    return jokes.map(joke => jokeHelper.convertBoolean(joke));
  });
}

async function add(joke) {
  const [id] = await db("jokes").insert(joke);

  return findById(id);
}

function update(id, changes) {
  return db("jokes")
    .where({ id })
    .update(changes, "*");
}

function remove(id) {
  return db("jokes")
    .where({ id })
    .del();
}
