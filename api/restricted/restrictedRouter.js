const router = require('express').Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Hello logged in user!" })
})

router.get("/something", (req, res) => {
  res.status(200).json({ message: "Hello logged in user!" })
})

router.get("/other", (req, res) => {
  res.status(200).json({ message: "Hello logged in user!" })
})

router.get("/a", (req, res) => {
  res.status(200).json({ message: "Hello logged in user!" })
})

module.exports = router;