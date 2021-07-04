const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', [
  check('username', 'Username should not be empty').isEmpty(),
  check('password', 'Password should be at least 4 symbols').isLength({ min: 4 }),
], userController.register);
router.post('/login', userController.login);
router.get('/users', userController.getUsers);

module.exports = router;
