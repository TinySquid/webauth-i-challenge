const router = require('express').Router();

const authRouter = require('./auth/authRouter');
const usersRouter = require('./users/usersRouter');

router.use('/auth', authRouter);
router.use('/users', usersRouter);

module.exports = router;