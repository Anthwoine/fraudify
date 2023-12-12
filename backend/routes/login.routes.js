const express = require('express');
const router = express.Router();

const { login } = require('../controllers/login.controllers');

router.post('/', login);

module.exports = router;