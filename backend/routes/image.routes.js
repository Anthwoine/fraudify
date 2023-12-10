const express = require('express');
const router = express.Router();

const { getMusicImg } = require('../controllers/image.controllers');

router.post('/', getMusicImg);

module.exports = router;