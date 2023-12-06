const express = require('express');
const router = express.Router();

const { getMusicFromDBById, getMusicFromDBByArtist, getAllMusicFromDB, getMusicFromDBByTitle, getMusicFromDBByUrl } = require('../controllers/music.controllers');

router.get('/:id', getMusicFromDBById);
router.get('/url/:url', getMusicFromDBByUrl);
router.get('/title/:title', getMusicFromDBByTitle);
router.get('/artist/:artist', getMusicFromDBByArtist);
router.get('/', getAllMusicFromDB);

module.exports = router;