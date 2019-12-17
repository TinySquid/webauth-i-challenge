const router = require('express').Router();

const userDB = require('./usersModel');

const authenticator = require('../middleware/authenticator');

router.get("/", authenticator, (req, res) => {
  userDB.get()
    .then(users => {
      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: "No users found" })
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get users from database", error: error });
    })
})

module.exports = router;