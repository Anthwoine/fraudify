const express = require('express');
const router = express.Router();

const { getMusicById, getAllMusic, deleteMusic, updateMusic, downloadMusic, getMusicInfo } = require('../controllers/music.controllers');

router.get('/', getAllMusic);
router.get('/:id?', getMusicById);
router.delete('/:id?', deleteMusic);
router.put('/:id?', updateMusic);
router.post('/download', downloadMusic);
router.post('/info', getMusicInfo)




module.exports = router;