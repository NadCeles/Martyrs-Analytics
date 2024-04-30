const router = require('express').Router()
const { checkAuth, checkAdmin } = require('../middleware/index')

const { signup, login } = require('../controllers/auth')

router.post('/signup', signup);
router.post('/login', login)

module.exports = router