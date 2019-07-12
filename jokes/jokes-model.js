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
    return jokes.map(joke => convertBoolean(joke));
  });
}

function find() {
  let loadJokes = db("jokes")
    .join("users", "jokes.user_id", "users.id")
    .select("jokes.id", "jokes.joke", "jokes.punchline", "users.username as created_by");

  return loadJokes.then(jokes => {
    return jokes.map(joke => convertBoolean(joke));
  });
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
    .update(changes);
}

function remove(id) {
  return db("jokes")
    .where({ id })
    .del();
}
