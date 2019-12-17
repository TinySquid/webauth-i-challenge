const router = require('express').Router();

const userDB = require('./authModel');

const bcrypt = require('bcrypt');

//* POST /register - Adds new user to database
router.post("/register", validateUser, (req, res) => {
  const user = { username, password } = req.body;

  bcrypt.hash(user.password, 8)
    .then(hash => {
      userDB.insert({ ...user, password: hash })
        .then(newUser => {
          res.status(201).json(newUser);
        })
        .catch(error => {
          if (error.errno === 19) {
            res.status(403).json({ message: "Username already exists" });
          }
          res.status(500).json({ message: "Error adding new user to database", error: error });
        });
    })
    .catch(error => {
      res.status(500).json({ message: "Error generating hash" });
    });
});

//* POST /login - Authenticates user credentials
router.post("/login", validateUser, (req, res) => {
  const { username, password } = req.body;

  userDB.getByUsername(username)
    .then(user => {
      if (user) {
        bcrypt.compare(password, user[0].password)
          .then(authenticated => {
            if (authenticated) {
              req.session.userId = user[0].id;
              res.status(200).json({ message: "Logged in", userId: req.session.userId });
            } else {
              res.status(400).json({ message: "You shall not pass!" });
            }
          })
          .catch(error => {
            res.status(500).json({ message: "Could not authenticate user" });
          })
      } else {
        res.status(400).json({ message: "You shall not pass!" });
      }
    })
    .catch(error => {
      res.status(400).json({ message: "You shall not pass!", error: error });
    });
});

//MIDDLEWARE
function validateUser(req, res, next) {
  const { username, password } = req.body;

  if (username && password) {
    next();
  } else {
    res.status(400).json({ message: "Please provide username and password" });
  }
}

module.exports = router;