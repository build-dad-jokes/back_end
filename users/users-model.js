const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
  getUserJokes,
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

function find() {
  return db("users").select("id", "username");
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes)
    .then(() => {
      return db("users")
        .where({ id })
        .first();
    });
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

function getUserJokes(id) {
  let loadJokes = db("jokes").where("user_id", id);

  return loadJokes.then(jokes => {
    return jokes.map(joke => convertBoolean(joke));
  });
}
