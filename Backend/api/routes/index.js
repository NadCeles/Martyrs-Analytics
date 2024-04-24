const router = require('express').Router()

router.use('/user', require('./user'))
router.use('/character', require('./character'))

module.exports = router