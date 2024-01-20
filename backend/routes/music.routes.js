const express = require('express');
const router = express.Router();

const { createInteraction, getInteraction, userListenedMusic, getUserLikedMusic, likeMusic, getMusicById, getAllMusic, deleteMusic, updateMusic, downloadMusic, getMusicInfo, getMusicImg } = require('../controllers/music.controllers');

router.get('/', getAllMusic);
router.get('/:id?', getMusicById);
router.get('/img/:title?/:artist?', getMusicImg);
router.get('/like/:userId?', getUserLikedMusic);
router.get('/interaction/:userId?/:musicId?', getInteraction);

router.delete('/:id?', deleteMusic);

router.put('/:id?', updateMusic);
router.put('/like', likeMusic);
router.put('/listen', userListenedMusic)

router.post('/download', downloadMusic);
router.post('/info', getMusicInfo)
router.post('/interaction', createInteraction);





module.exports = router;