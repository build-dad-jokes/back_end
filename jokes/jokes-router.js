const router = require("express").Router();

const Jokes = require("./jokes-model");
const restricted = require("../auth/restricted-middleware");
const checkRole = require("../auth/check-role-middleware");

// tested - working
router.get("/", (req, res) => {
  Jokes.find()
    .then(jokes => {
      res.status(200).json(jokes);
    })
    .catch(error => res.send(error));
});

// tested - working
router.get("/:id", restricted, checkRole("User"), (req, res) => {
  Jokes.findById(req.params.id)
    .then(joke => {
      res.status(200).json(joke);
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

// test -
router.put("/:id", restricted, checkRole("User"), async (req, res) => {
  try {
    const updateJoke = await Jokes.update(req.params.id, req.body);
    if (updateJoke) {
      res.status(200).json(updateJoke);
    } else {
      res.status(404).json({ message: "joke not found" });
    }
  } catch ({ message }) {
    console.log({ message });
    res.status(500).json({ message: "server error updating joke" });
  }
});

//  Mylynh code
// router.put("/:id", restricted, checkRole("User"), async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateJoke = await Jokes.update(id, req.body);

//     updateJoke
//       ? res.status(200).json({ message: "successfully updated joke" })
//       : res.status(404).json({ message: "joke not found" });
//   } catch ({ message }) {
//     res.status(500).json({ message: "something is funky", message });
//   }
// });

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
