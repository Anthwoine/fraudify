const express = require('express');
const router = express.Router();

const { getMusicById, getAllMusic, deleteMusic, updateMusic, downloadMusic, getMusicInfo, getMusicImg } = require('../controllers/music.controllers');

router.get('/', getAllMusic);
router.get('/:id?', getMusicById);
router.get('/img/:title?/:artist?', getMusicImg);
router.delete('/:id?', deleteMusic);
router.put('/:id?', updateMusic);
router.post('/download', downloadMusic);
router.post('/info', getMusicInfo)





module.exports = router;