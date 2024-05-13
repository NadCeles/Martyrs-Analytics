const Character = require("../models/character");
const Zone = require('../models/zone');
const Milestone = require("../models/milestone");
const Milestone_event = require("../models/milestone_reached_event")
const Chest_event = require('../models/chest_open_event')

async function getMilestoneAnalytics() {
    const characters = await Character.findAndCountAll();
    const milestones = await Milestone.findAll();
    const analytics = {
        zones: [],
        bosses: [],
        unique_items: []
    }

    for (let i = 0; i < milestones.length; i++) {
        const milestone_events_by_milestone = await Milestone_event.findAndCountAll({
            distinct: true,
            col: 'characterId',
            where: {
                milestoneId: milestones[i].id
            }
        })
        switch (milestones[i].type) {
            case 'Zone':
                analytics.zones.push({
                    'name': milestones[i].name,
                    'character_completion_percentage': (milestone_events_by_milestone.count / characters.count) * 100
                })
                break;
            case 'Boss':
                analytics.bosses.push({
                    'name': milestones[i].name,
                    'character_completion_percentage': (milestone_events_by_milestone.count / characters.count) * 100
                })
                break;
            case 'Unique Item':
                analytics.unique_items.push({
                    'name': milestones[i].name,
                    'character_completion_percentage': (milestone_events_by_milestone.count / characters.count) * 100
                })
                break;
        }
    }

    return analytics;
}

async function getChestCompletionPercentageAnalytics() {
    // get all characters
    // get all distinct characters that opened chest
    // calculate completion percentage by zone

    const characters = await Character.findAndCountAll();
    const zones = await Zone.findAll();
    const analytics = [];

    for (let i = 0; i < zones.length; i++) {
        const chest_events = await Chest_event.findAndCountAll({
            distinct: true,
            col: 'characterId',
            where: {
                zoneId: zones[i].id
            }
        })
        analytics.push({
            zone: zones[i].name,
            percentage: (chest_events.count / characters.count) * 100
        })
    }
    return analytics;
}

module.exports = {
    getMilestoneAnalytics,
    getChestCompletionPercentageAnalytics
}