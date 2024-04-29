const router = require('express').Router()

const { getAllMilestonesReached, getMilestonesReachedByUser, getMilestoneReachedById, registerMilestoneReached, modifyMilestoneReached, deleteMilestoneReached } = require('../controllers/milestone')

router.get('/milestones-by-user', getMilestonesReachedByUser);
router.get('/', getAllMilestonesReached)
router.get('/:id', getMilestoneReachedById)
router.post('/', registerMilestoneReached);
router.put('/:id', modifyMilestoneReached);
router.delete('/:id', deleteMilestoneReached);

module.exports = router