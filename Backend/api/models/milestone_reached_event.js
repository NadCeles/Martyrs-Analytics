const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Milestone_event = sequelize.define(
	'milestone_event',
	{
		steam_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date
		},
    },
    {updatedAt: false}
)

module.exports = Milestone_event