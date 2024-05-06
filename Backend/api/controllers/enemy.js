const Enemy = require('../models/enemy');
const Enemy_event = require('../models/enemy_defeat_event')

async function getEnemyKillEvents(req, res) {
	try {
		const enemie_events = await Enemy_event.findAll();
		if (enemie_events) {
			return res.status(200).json(enemie_events)
		} else {
			return res.status(404).send('No enemy defeated records found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getEnemyKillEventsById(req, res) {
	try {
		const enemie_event = await Enemy_event.findByPk(req.params.id);
		if (enemie_event) {
			return res.status(200).json(enemie_event)
		} else {
			return res.status(404).send('No enemy defeated record found by id')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getEnemyKillsByType(req, res) {
	try {
		const enemies = await Enemy.findAll();
		const response = [];
		for (let i = 0; i < enemies.length; i++) {
			const enemy_kills = await Enemy_event.findAndCountAll({
				where: {
					enemyId: enemies[i].id
				}
			})
			response.push({
				enemy_name: enemies[i].name,
				enemy_kills: enemy_kills.count
			})
		}
		return res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

/*
{
	"enemy_id": "1",
	"character_id": "1"
}
*/
async function getEnemyKillsByTypeAndCharacter(req, res) {
	try {
		if (req.params.character_id && req.params.enemy_id) {
			const enemie_events = await Enemy_event.findAll({
				where: {
					enemyId: req.params.enemy_id,
					characterId: req.params.character_id
				}
			})
			if (enemie_events) {
				return res.status(200).json(enemie_events)
			} else {
				return res.status(404).send('No enemy defeated records found')
			}
		}
		else {
			return res.status(404).send('Please send both enemy_id and character_id parameters')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

/*
{
	"steam_id": "test-steam-id3",
	"quantity": "5",
	"enemyId": "1",
	"characterId": "1"
}
*/
async function createEnemyDefeatedRecord(req, res) {
	try {
		const enemy_event = await Enemy_event.create(req.body)
		return res.status(200).json({ message: 'Enemy Defeated Record Created', enemy_defeated_record: enemy_event })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

/*
{
	"steam_id": "test-steam-id34443",
	"quantity": "5",
	"enemyId": "1",
	"characterId": "1"
}
*/
async function modifyEnemyDefeatedRecord(req, res) {
	try {
		const [enemy_exists, enemy_event] = await Enemy_event.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
		if (enemy_exists !== 0) {
			return res.status(200).json({ message: 'Enemy Defeated Record Updated', enemy_defeated_record: enemy_event })
		} else {
			return res.status(404).send('Enemy Defeated Record not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

// Delete id
async function deleteEnemyDefeatedRegistry(req, res) {
	try {
		const enemy_event = await Enemy_event.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (enemy_event) {
			return res.status(200).json('Enemy deleted')
		} else {
			return res.status(404).send('Enemy not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getEnemyKillEvents,
	getEnemyKillEventsById,
	getEnemyKillsByType,
	getEnemyKillsByTypeAndCharacter,
	createEnemyDefeatedRecord,
	modifyEnemyDefeatedRecord,
	deleteEnemyDefeatedRegistry
}