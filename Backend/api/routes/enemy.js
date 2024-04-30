const router = require('express').Router()
const { checkAuth, checkAdmin } = require('../middleware/index')

const { getEnemyKillEvents, getEnemyKillEventsById, getEnemyKillsByType, getEnemyKillsByTypeAndCharacter, createEnemyDefeatedRecord, modifyEnemyDefeatedRecord, deleteEnemyDefeatedRegistry} = require('../controllers/enemy')

router.get('/kills-by-enemy', getEnemyKillsByType);
router.get('/kills-by-enemy-and-character', getEnemyKillsByTypeAndCharacter);
router.get('/', getEnemyKillEvents)
router.get('/:id', getEnemyKillEventsById)
router.post('/', createEnemyDefeatedRecord);
router.put('/:id', modifyEnemyDefeatedRecord);
router.delete('/:id', deleteEnemyDefeatedRegistry);

module.exports = router