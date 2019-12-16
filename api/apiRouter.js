const router = require('express').Router();

const authRouter = require('./auth/authRouter');

router.use('/', authRouter);

module.exports = router;