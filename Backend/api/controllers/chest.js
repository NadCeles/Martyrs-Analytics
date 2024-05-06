const Chest_event = require('../models/chest_open_event')
const Zone = require('../models/zone')
const { getChestCompletionPercentageAnalytics } = require('../utils/analytics')

async function getOpenChestsByZone(req, res) {
    try {
        const zones = await Zone.findAll();
        const response = [];
        for (let i = 0; i < zones.length; i++) {
            const chests_opened = await Chest_event.findAndCountAll({
                where: {
                    zoneId: zones[i].id
                }
            })
            response.push({
                zone_name: zones[i].name,
                opened_chests_count: chests_opened.count
            })
        }
        return res.status(200).json(response)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getOpenedChestZoneCompletionPercentages(req, res) {
    try {
        const response = await getChestCompletionPercentageAnalytics();
        return res.status(200).json(response);
    }
    catch (error) {
        res.status(500).send(error.message)
    }
}

async function getOpenChests(req, res) {
    try {
        const chest_events = await Chest_event.findAll()
        if (chest_events) {
            return res.status(200).json(chest_events)
        }
        else {
            return res.status(404).send('No chest event record was found')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function getOpenChestsByCharacter(req, res) {
    try {
        const chest_events = await Chest_event.findAll({
            where: {
                characterId: req.params.character_id
            }
        })
        if (chest_events) {
            return res.status(200).json(chest_events)
        }
        else {
            return res.status(404).send('No chest event record was found by character id')
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function createOpenChestEvent(req, res) {
    try {
        const chest_event = await Chest_event.create(req.body)
        return res.status(200).json({ message: 'Chest Opened Event Record Created', chest_opened_record: chest_event })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

async function modifyOpenChestEvent(req, res) {
    try {
        const [chest_exists, chest_event] = await Chest_event.update(req.body, {
            returning: true,
            where: {
                id: req.params.id,
            },
        })
        if (chest_exists !== 0) {
            return res.status(200).json({ message: 'Chest Opened Event Record Updated', chest_opened_record: chest_event })
        } else {
            return res.status(404).send('Chest Opened Event Record not found')
        }
    }
    catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteOpenChestEvent(req, res) {
    try {
        const chest_event = await Chest_event.destroy({
            where: {
                id: req.params.id,
            },
        })
        if (chest_event) {
            return res.status(200).json('Chest Opened Event Record Deleated')
        }
        else {
            return res.status(404).send('Chest Opened Event Record not found')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getOpenChestsByZone,
    getOpenChests,
    getOpenChestsByCharacter,
    getOpenedChestZoneCompletionPercentages,
    createOpenChestEvent,
    modifyOpenChestEvent,
    deleteOpenChestEvent
}