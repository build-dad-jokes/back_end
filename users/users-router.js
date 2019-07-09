const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../auth/restricted-middleware");
const checkRole = require("../auth/check-role-middleware");

router.get("/", restricted, checkRole("User"), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => res.send(error));
});

router.get("/:id", restricted, checkRole("User"), (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      res.json(user);
    })
    .catch(error => res.send(error));
});

// router.post("/", (req, res) => {
//   Users.add(req.body)
//     .then(user => {
//       res.status(201).json(user);
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json({ message: "server error adding user" });
//     });
// });

router.put("/:id", restricted, checkRole("User"), (req, res) => {
  const { id } = req.params;

  Users.update(id, req.body)
    .then(joke => {
      if (joke) {
        res.json(joke);
      } else {
        res.status(404).json({ message: "user not found, wrong id" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "server error updating user" });
    });
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
