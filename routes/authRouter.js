const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register', [
  check('username', 'Username should not be empty').not().isEmpty(),
  check('password', 'Password should be at least 4 symbols').isLength({ min: 4 }),
], userController.register);
router.post('/login', userController.login);
router.get('/users', authMiddleware, userController.getUsers);
router.post('/refresh-tokens', userController.refreshTokens);

module.exports = router;
