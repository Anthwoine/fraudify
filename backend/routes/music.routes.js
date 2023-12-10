const express = require('express');
const router = express.Router();

const { getMusicFromDBById, getAllMusicFromDB, deleteMusicFromDB, updateMusicFromDB } = require('../controllers/music.controllers');

router.get('/', getAllMusicFromDB);

router.get('/:id', getMusicFromDBById);
router.delete('/:id', deleteMusicFromDB);
router.put('/:id', updateMusicFromDB);




module.exports = router;