const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth-controller');

//Login
router.post('', authController.login);

module.exports = router;
