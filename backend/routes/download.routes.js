const { downloadMusic, getMusicInfo } = require('../controllers/download.controllers');
const express = require('express');
const router = express.Router();

router.post('/', downloadMusic);
router.get('/info', getMusicInfo);


module.exports = router;
