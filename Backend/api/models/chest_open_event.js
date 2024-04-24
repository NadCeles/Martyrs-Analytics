const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Chest_event = sequelize.define(
	'chest_event',
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

module.exports = Chest_event