const router = require('express').Router();

const authenticator = require('./middleware/authenticator');

const authRouter = require('./auth/authRouter');
const usersRouter = require('./users/usersRouter');
const restrictedRouter = require('./restricted/restrictedRouter');

//Restrict any route based on the restricted path to allow only logged in users to access
router.use("/restricted", authenticator);

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/restricted', restrictedRouter);


module.exports = router;