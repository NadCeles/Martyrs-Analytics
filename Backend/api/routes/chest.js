const router = require('express').Router()
const { checkAuth, checkAdmin } = require('../middleware/index')

const { getOpenChestsByZone, getOpenedChestZoneCompletionPercentages, getOpenChests, getOpenChestsByCharacter, createOpenChestEvent, modifyOpenChestEvent, deleteOpenChestEvent } =  require('../controllers/chest')

router.get('/opened-chest-by-character/:character_id', checkAuth, getOpenChestsByCharacter);
router.get('/opened-chest-completion-percentages', getOpenedChestZoneCompletionPercentages)
router.get('/opened-chest-by-zone', getOpenChestsByZone);
router.get('/', checkAuth, checkAdmin, getOpenChests)
router.post('/', createOpenChestEvent);
router.patch('/:id', checkAuth,checkAdmin, modifyOpenChestEvent);
router.delete('/:id', checkAuth, checkAdmin, deleteOpenChestEvent);

module.exports = router