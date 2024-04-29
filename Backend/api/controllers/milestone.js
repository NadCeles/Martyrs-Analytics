const Milestone_event = require('../models/milestone_reached_event')

// TODO Calculate the total percentage of characters created vs characters that reached the milestone
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
		const milestone_event = await Milestone_event.findAll({
            where: {
                steam_id: req.body.steam_id
            }
        })
		if (milestone_event) {
			return res.status(200).json(milestone_event)
		} else {
			return res.status(404).send('No milestone reached records found')
		}
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
    registerMilestoneReached,
    modifyMilestoneReached,
    deleteMilestoneReached
}