const User = require('../api/models/user')
const Character = require('../api/models/character')
const Chest = require('../api/models/chest')
const Item = require('../api/models/item')
const Zone = require('../api/models/zone')
const Enemy = require('../api/models/enemy')
const Chest_event = require('../api/models/chest_open_event')
const Enemy_event = require('../api/models/enemy_defeat_event')
const Milestone = require('../api/models/milestone')
const Milestone_event = require('../api/models/milestone_reached_event')

function addRelationsToModels() {
	try {
		//Enemy Event

       Character.hasMany(Enemy_event)
	   Enemy_event.belongsTo(Character)

	   Enemy.hasMany(Enemy_event)
	   Enemy_event.belongsTo(Enemy)

	   //Milestone Event

	   Character.hasMany(Milestone_event)
	   Milestone_event.belongsTo(Character)

	   Milestone.hasMany(Milestone_event)
	   Milestone_event.belongsTo(Milestone)

	   //Chest Event

	   Character.hasMany(Chest_event)
	   Chest_event.belongsTo(Character)

	   Chest.hasMany(Chest_event)
	   Chest_event.belongsTo(Chest)

	   Zone.hasMany(Chest_event)
	   Chest_event.belongsTo(Zone)

	   Item.hasMany(Chest_event)
	   Chest_event.belongsTo(Item)

	   //Chest

	   Zone.hasMany(Chest)
	   Chest.belongsTo(Zone)

	   Item.hasMany(Chest)
	   Chest.belongsTo(Item)

		console.log('Relations added to all models')
	} catch (error) {
		throw error
	}
}

module.exports = addRelationsToModels