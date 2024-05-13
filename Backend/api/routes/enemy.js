const router = require('express').Router()
const { checkAuth, checkAdmin } = require('../middleware/index')

const { getEnemyKillEvents, getEnemyKillEventsById, getEnemyKillsByType, getEnemyKillsByTypeAndCharacter, createEnemyDefeatedRecord, modifyEnemyDefeatedRecord, deleteEnemyDefeatedRegistry} = require('../controllers/enemy')

router.get('/kills-by-enemy', getEnemyKillsByType);
router.get('/kills-by-enemy-and-character/:enemy_id/:character_id', checkAuth, getEnemyKillsByTypeAndCharacter);
router.get('/', checkAuth, checkAdmin, getEnemyKillEvents)
router.get('/:id', checkAuth, checkAdmin, getEnemyKillEventsById)
router.post('/', createEnemyDefeatedRecord);
router.put('/:id', checkAuth, checkAdmin, modifyEnemyDefeatedRecord);
router.delete('/:id', checkAuth, checkAdmin, deleteEnemyDefeatedRegistry);

module.exports = router