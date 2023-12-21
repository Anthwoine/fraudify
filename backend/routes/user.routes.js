const express = require('express');
const router = express.Router();

const { getAllUser, getUserByUsername, addUser, updateUser, deleteUser, login } = require('../controllers/user.controllers');

router.get('/', getAllUser);
router.get('/:username?', getUserByUsername);
router.post('/', addUser);
router.put('/:id?', updateUser);
router.delete('/:id?', deleteUser);
router.post('/login', login);


module.exports = router;