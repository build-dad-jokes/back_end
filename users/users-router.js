const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("./users-model");
const restricted = require("../auth/restricted-middleware");
const checkRole = require("../auth/check-role-middleware");

// tested - working
router.get("/", restricted, checkRole("User"), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => res.send(error));
});

// tested - working
router.get("/:id", restricted, checkRole("User"), (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(error => res.send(error));
});

// tested - working
router.get("/:id/jokes", restricted, checkRole("User"), async (req, res) => {
  try {
    const { id } = req.params;
    const userJokes = await Users.get(id);

    res.status(200).json(userJokes);
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

router.put("/:id", restricted, checkRole("User"), async (req, res) => {
  try {
    const { id } = req.params;
    let newUser = req.body;

    const hash = bcrypt.hashSync(newUser.password, 14);
    newUser.password = hash;

    const updateUser = await userDB.update(id, req.body);

    updateUser
      ? res.status(200).json({ message: "successfully updated credentials" })
      : res.status(404).json({ message: "missing required fields" });
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});

router.delete("/:id", restricted, checkRole("User"), (req, res) => {
  Users.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "user deleted" });
      } else {
        res.status(404).json({ message: " user not found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "server error deleting user" });
    });
});

module.exports = router;
