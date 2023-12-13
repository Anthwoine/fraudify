const express = require('express');
const { signupUser } = require('../controllers/signup.controllers');
const router = express.Router();

router.post('/', signupUser);

module.exports = router;