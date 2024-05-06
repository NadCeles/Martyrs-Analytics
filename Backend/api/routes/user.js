const { getUserInfoByToken, updateUser } = require('../controllers/user')

const router = require('express').Router()

router.get('/', getUserInfoByToken);
router.patch('/', updateUser);

module.exports = router