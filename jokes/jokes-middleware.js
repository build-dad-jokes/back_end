const jokesDB = require("./jokes-model.js");

module.exports = {
  checkPublic: async (req, res, next) => {
    try {
      const publicJokes = await jokesDB.filter();
      const token = req.headers.authorization;

      publicJokes && token ? next() : res.status(200).json(publicJokes);
    } catch (err) {
      res.status(500).json({ message: "Error. Something went wrong." });
    }
  },

  validateId: async (req, res, next) => {
    try {
      const { id } = req.params;
      const jokeID = await jokesDB.findById(id);

      jokeID ? next() : res.status(400).json({ message: "ID invalid" });
    } catch (err) {
      res.status(404).json({ message: "Joke ID missing" });
    }
  },

  validateBody: (req, res, next) => {
    const { question, answer } = req.body;

    question && answer
      ? next()
      : res.status(400).json({ message: "Required fields missing." });
  }
};
