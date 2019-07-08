const router = require("express").Router();

const Jokes = require("./jokes-model");
const restricted = require("../auth/restricted-middleware");
const checkRole = require("../auth/check-role-middleware");

router.get("/", (req, res) => {
  Jokes.find()
    .then(jokes => {
      res.json(jokes);
    })
    .catch(error => res.send(error));
});

router.get("/:id", restricted, checkRole("User"), (req, res) => {
  Jokes.findById(req.params.id)
    .then(joke => {
      res.json(joke);
    })
    .catch(error => res.send(error));
});
