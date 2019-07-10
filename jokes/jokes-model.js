const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findById,
  update,
  remove,
  filter,
  intToBoolean,
  convertBoolean
};

function intToBoolean(int) {
  return int === 1 ? true : false;
}

function convertBoolean(jokes) {
  const result = {
    ...jokes,
    public: intToBoolean(jokes.public)
  };
  return result;
}

function filter() {
  let loadJokes = db("jokes").where({
    public: true
  });

  return loadJokes.then(jokes => {
    return jokes.map(joke => helper.convertBoolean(joke));
  });
}

function find() {
  return db("jokes").select("id", "joke", "punchline");
}

function findById(id) {
  return db("jokes")
    .select("id", "joke", "punchline")
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
    .update(changes, "*");
}

function remove(id) {
  return db("jokes")
    .where({ id })
    .del();
}
