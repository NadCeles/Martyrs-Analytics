const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Enemy_event = sequelize.define(
	'enemy_event',
	{
		steam_id: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date
		},
    },
    {updatedAt: false}
)

module.exports = Enemy_event