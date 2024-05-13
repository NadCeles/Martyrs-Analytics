const router = require('express').Router()
const { checkAuth, checkAdmin } = require('../middleware/index')

const { getAllMilestonesReached, getMilestonesReachedByUser, getMilestoneReachedById, getMilestonesReachedbyType, registerMilestoneReached, modifyMilestoneReached, deleteMilestoneReached } = require('../controllers/milestone')

router.get('/milestones-reached-percentage-by-type', getMilestonesReachedbyType)
router.get('/milestones-by-user/:character_id/:milestone_type', checkAuth, getMilestonesReachedByUser);
router.get('/', getAllMilestonesReached)
router.get('/:id', checkAuth, checkAdmin, getMilestoneReachedById)
router.post('/', registerMilestoneReached);
router.put('/:id', checkAuth, checkAdmin, modifyMilestoneReached);
router.delete('/:id', checkAuth, checkAdmin, deleteMilestoneReached);

module.exports = router