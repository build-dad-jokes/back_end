const express = require("express");
const jokesDB = require("./jokes-model.js");
const router = express.Router();
const { restricted } = require("../auth/restricted-middleware.js");
const {
  checkPublic,
  validateBody,
  validateId
} = require("./jokes-middleware.js");

router.get("/", checkPublic, restricted, async (req, res) => {
  try {
    const jokes = await jokesDB.find();

    res.status(200).json(jokes);
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

router.get("/:id", restricted, validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const joke = await jokesDB.findById(id);

    res.status(200).json(joke);
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

router.post("/", restricted, validateBody, async (req, res) => {
  try {
    const newJoke = await jokesDB.add(req.body);

    res.status(201).json(newJoke);
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

router.put("/:id", restricted, validateId, validateBody, async (req, res) => {
  try {
    const { id } = req.params;
    const updateJoke = await jokesDB.update(id, req.body);

    updateJoke
      ? res.status(200).json({ message: "Updated Joke Successfully" })
      : res.status(404).json({ message: "Joke Missing" });
  } catch (err) {
    res.status(500).json({ message: "Error!!" });
  }
});

router.delete("/:id", restricted, validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const success = await jokesDB.remove(id);

    success ? res.status(204).json.end() : res.status(404).end();
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

module.exports = router;
