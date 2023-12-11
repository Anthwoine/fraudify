const express = require('express');
const router = express.Router();

const { user, users, signup } = require('../controllers/user.controllers');

router.get('/', users);
router.get('/:id?', user);
router.post('/signup/', signup);
router.put('/:id?', user);
router.delete('/:id?', user);

module.exports = router;