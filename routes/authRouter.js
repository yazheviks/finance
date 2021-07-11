const express = require('express');
const { check } = require('express-validator');
const passport = require('passport');
const userController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', [
  check('username', 'Username should not be empty').not().isEmpty(),
  check('password', 'Password should be at least 4 symbols').isLength({ min: 4 }),
], userController.register);
router.post('/login', userController.login);
router.get('/users', passport.authenticate('jwt', { session: false }), userController.getUsers);
router.post('/refresh-tokens', passport.authenticate('refresh_token', { session: false }), userController.refreshTokens);

module.exports = router;
