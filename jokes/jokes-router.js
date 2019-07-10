const router = require("express").Router();

const Jokes = require("./jokes-model");
const restricted = require("../auth/restricted-middleware");
const checkRole = require("../auth/check-role-middleware");

// tested - working
router.get("/", (req, res) => {
  Jokes.find()
    .then(jokes => {
      res.json(jokes);
    })
    .catch(error => res.send(error));
});

// tested - working
router.get("/:id", restricted, checkRole("User"), (req, res) => {
  Jokes.findById(req.params.id)
    .then(joke => {
      res.json(joke);
    })
    .catch(error => res.send(error));
});

// tested - working
router.post("/", restricted, checkRole("User"), (req, res) => {
  Jokes.add(req.body)
    .then(joke => {
      res.status(201).json(joke);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "server error posting joke" });
    });
});

// tested - working
router.put("/:id", restricted, checkRole("User"), (req, res) => {
  const { id } = req.params;

  Jokes.update(id, req.body)
    .then(joke => {
      if (joke) {
        res.json(joke);
      } else {
        res.status(404).json({ message: "joke not found, wrong id" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "server error updating joke" });
    });
});

router.delete("/:id", restricted, checkRole("User"), (req, res) => {
  Jokes.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "joke deleted" });
      } else {
        res.status(404).json({ message: "joke not found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "server error deleting joke" });
    });
});

module.exports = router;
