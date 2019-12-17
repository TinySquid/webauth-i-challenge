require('dotenv').config();
const express = require("express");
const session = require('express-session');
const helmet = require("helmet");
const cors = require("cors");

const apiRouter = require('./api/apiRouter');

const server = express();

server.use(express.json());

server.use(
  session({
    name: 'user-session',
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 60 * 60 * 1000,
      secure: false,
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
  })
);

server.use(helmet());

server.use(cors());

server.use('/api', apiRouter);

server.get("/", function (req, res) {
  res.send("API is online 👍");
});

//Route fallback (404)
server.use(function (req, res) {
  res.status(404).json({ message: "Not found" });
});

module.exports = server;
