const express = require('express');
const router = express.Router();

const { getMusicById, getAllMusic, deleteMusic, updateMusic } = require('../controllers/music.controllers');

router.get('/', getAllMusic);

router.get('/:id', getMusicById);
router.delete('/:id', deleteMusic);
router.put('/:id', updateMusic);




module.exports = router;