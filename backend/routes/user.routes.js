const express = require('express');
const router = express.Router();

const { getAllUser, getUserById, addUser, updateUser, deleteUser, login } = require('../controllers/user.controllers');

router.get('/', getAllUser);
router.get('/:username?', getUserById);
router.post('/', addUser);
router.put('/:id?', updateUser);
router.delete('/:id?', deleteUser);
router.post('/login', login);


module.exports = router;