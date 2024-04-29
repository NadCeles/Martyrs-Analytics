const router = require('express').Router()

const { getOpenChestsByZone, getOpenChestsByCharacter, createOpenChestEvent, modifyOpenChestEvent, deleteOpenChestEvent } =  require('../controllers/chest')

router.get('/opened_chest_by_zone', getOpenChestsByZone);
router.get('/opened_chest_by_character', getOpenChestsByCharacter);
router.post('/', createOpenChestEvent);
router.patch('/:id', modifyOpenChestEvent);
router.delete('/:id', deleteOpenChestEvent);

module.exports = router