const Milestone = require('../models/milestone');
const Milestone_event = require('../models/milestone_reached_event')
const User = require('../models/user');
const { getMilestoneAnalytics } = require('../utils/analytics');
const jwt = require("jsonwebtoken")

async function getAllMilestonesReached(req, res) {
	try {
		const milestone_events = await Milestone_event.findAll();
		if (milestone_events) {
			return res.status(200).json(milestone_events)
		} else {
			return res.status(404).send('No milestone reached records found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getMilestonesReachedbyType(req, res) {
	try {
		const milestoneAnalytics = await getMilestoneAnalytics();
		return res.status(200).json(milestoneAnalytics)
	}
	catch (error) {
		res.status(500).send(error.message);
	}
}

async function getMilestoneReachedById(req, res) {
	try {
		const milestone_event = await Milestone_event.findByPk(req.params.id);
		if (milestone_event) {
			return res.status(200).json(milestone_event)
		} else {
			return res.status(404).send('No milestone reached records found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getMilestonesReachedByUser(req, res) {
	try {
		jwt.verify(req.headers.authorization, process.env.SECRET, async (err, result) => {
			if (err) return res.send('Token not valid')

			const user = await User.findOne(req.body, {
				where: {
					email: result.email
				}
			})
			
			if (!user) return res.send('Token not valid')

			const milestone_events = await Milestone_event.findAll({
				where: {
					steam_id: user.steam_id,
					characterId: req.params.character_id
				}
			})

			if (milestone_events) {
				let milestone_events_array = milestone_events;
				let milestones_reached = []
				if(!Array.isArray(milestone_events)) {
					milestone_events_array = [milestone_events];
				}
				
				for(let i = milestone_events_array.length - 1;i >= 0; i-- ) {
					const milestone = await Milestone.findByPk(milestone_events_array[i].milestoneId);
					if(milestone.type != req.params.milestone_type) {
						milestones_reached.push({
							name: milestone.name,
							reached: true
						})
					}
					else {
						milestones_reached.push({
							name: milestone.name,
							reached: false
						})
					}
				}
				return res.status(200).json(milestones_reached)
			} else {
				return res.status(404).send('No milestone reached records found')
			}
		})
	} catch (error) {
		res.status(500).send(error.message)
	}
}

/*
{
	"steam_id": "test-steam-id-0",
	"type": "Zone",
	"name": "Hollow Belly of The Beast",
	"characterId": "1"
}
*/
async function registerMilestoneReached(req, res) {
	try {
		const milestone_event = await Milestone_event.create(req.body)
		return res.status(200).json({ message: 'Milestone Reached Record Created', milestone_event: milestone_event })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function modifyMilestoneReached(req, res) {
	try {
		const [milestone_exists, milestone_event] = await Milestone_event.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
		if (milestone_exists !== 0) {
			return res.status(200).json({ message: 'Milestone Reached Record Updated', milestone_event: milestone_event })
		} else {
			return res.status(404).send('Milestone Reached Record not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteMilestoneReached(req, res) {
	try {
		const milestone_event = await Milestone_event.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (milestone_event) {
			return res.status(200).json('Milestone deleted')
		} else {
			return res.status(404).send('Milestone not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getAllMilestonesReached,
	getMilestoneReachedById,
	getMilestonesReachedByUser,
	getMilestonesReachedbyType,
	registerMilestoneReached,
	modifyMilestoneReached,
	deleteMilestoneReached
}