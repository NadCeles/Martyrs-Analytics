const router = require('express').Router()

const { signup, login, getUserCharacters } = require('../controllers/auth')

router.post('/signup', signup);
router.post('/login', login);
router.get('/user-characters', getUserCharacters);

module.exports = router