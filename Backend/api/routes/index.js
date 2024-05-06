const router = require('express').Router()

router.use('/milestone-event', require('./milestone'))
router.use('/enemy-event', require('./enemy'))
router.use('/user', require('./user'))
router.use('/character', require('./character'))
router.use('/chest-event', require('./chest'))
router.use('/auth', require('./auth'))

module.exports = router